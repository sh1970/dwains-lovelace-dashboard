import fnmatch
import logging
import yaml
import os
import json
import io
from collections.abc import Iterator
from collections import OrderedDict
import jinja2

#from homeassistant.util.yaml import Secrets, loader
from annotatedyaml import loader
from annotatedyaml.objects import NodeDictClass, NodeListClass, NodeStrClass

from homeassistant.exceptions import HomeAssistantError
from homeassistant.core import HomeAssistant

from .const import DOMAIN
from .more_page_files import load_more_page_navigation
from .runtime_data import find_domain_data, get_domain_data

_LOGGER = logging.getLogger(__name__)

def fromjson(value):
    return json.loads(value)

_YAML_PROCESSOR_KEY = "yaml_processor"
_RELOAD_SERVICE_REGISTERED_KEY = "reload_service_registered"


def _find_yaml_files(directory: str) -> Iterator[str]:
    """Yield visible YAML files recursively in deterministic order."""
    for root, directories, files in os.walk(directory, topdown=True):
        directories[:] = [name for name in directories if not name.startswith(".")]
        for basename in sorted(files):
            if not basename.startswith(".") and fnmatch.fnmatch(basename, "*.yaml"):
                yield os.path.join(root, basename)


def _add_node_reference(obj, yaml_loader, node) -> None:
    """Attach the AnnotatedYAML source location contract locally."""
    obj.__config_file__ = yaml_loader.get_name
    if (start_mark := node.start_mark) is not None:
        obj.__line__ = start_mark.line + 1


def _add_reference(obj, yaml_loader, node):
    """Wrap supported values and attach their source location."""
    if isinstance(obj, list):
        obj = NodeListClass(obj)
    elif isinstance(obj, str):
        obj = NodeStrClass(obj)
    elif isinstance(obj, dict):
        obj = NodeDictClass(obj)
    else:
        return obj
    _add_node_reference(obj, yaml_loader, node)
    return obj


class _DwainsDashboardLoader(loader.PythonSafeLoader):
    """Private loader for legacy templates and duplicate anchors."""

    def __init__(self, stream, secrets, processor):
        self.processor = processor
        super().__init__(stream, secrets)

    def compose_node(self, parent, index):
        if self.check_event(yaml.events.AliasEvent):
            event = self.get_event()
            anchor = event.anchor
            if anchor not in self.anchors:
                raise yaml.composer.ComposerError(
                    None,
                    None,
                    "found undefined alias %r" % anchor,
                    event.start_mark,
                )
            return self.anchors[anchor]
        event = self.peek_event()
        anchor = event.anchor
        self.descend_resolver(parent, index)
        if self.check_event(yaml.events.ScalarEvent):
            node = self.compose_scalar_node(anchor)
        elif self.check_event(yaml.events.SequenceStartEvent):
            node = self.compose_sequence_node(anchor)
        elif self.check_event(yaml.events.MappingStartEvent):
            node = self.compose_mapping_node(anchor)
        self.ascend_resolver()
        return node


class DashboardYamlProcessor:
    """Own template state and YAML loading for one Home Assistant instance."""

    def __init__(self):
        self.jinja = jinja2.Environment(loader=jinja2.FileSystemLoader("/"))
        self.jinja.filters["fromjson"] = fromjson
        self.more_pages = {}
        self.global_config = {}

    def load_yaml(self, fname, secrets=None, args=None):
        return load_yamll(self, fname, secrets, args)


def get_yaml_processor(hass: HomeAssistant) -> DashboardYamlProcessor:
    """Return the YAML processor owned by one Home Assistant instance."""
    domain_data = get_domain_data(hass)
    processor = domain_data.get(_YAML_PROCESSOR_KEY)
    if processor is None:
        processor = domain_data[_YAML_PROCESSOR_KEY] = DashboardYamlProcessor()
    return processor


def register_reload_service(hass: HomeAssistant) -> None:
    """Register the dashboard reload service once per HA instance."""
    domain_data = get_domain_data(hass)
    if domain_data.get(_RELOAD_SERVICE_REGISTERED_KEY):
        return

    async def handle_reload(call):
        _LOGGER.warning("Reload Dwains Dashboard Configuration")
        await reload_configuration(hass)

    hass.services.async_register(DOMAIN, "reload", handle_reload)
    domain_data[_RELOAD_SERVICE_REGISTERED_KEY] = True


def remove_yaml_runtime(hass: HomeAssistant) -> None:
    """Remove the service and processor owned by one HA instance."""
    domain_data = find_domain_data(hass)
    if domain_data is None:
        return
    if domain_data.pop(_RELOAD_SERVICE_REGISTERED_KEY, False):
        hass.services.async_remove(DOMAIN, "reload")
    domain_data.pop(_YAML_PROCESSOR_KEY, None)


def _load_hki_configuration(processor, config_path):
    configuration = {}
    if not os.path.exists(config_path):
        return configuration
    for filename in _find_yaml_files(config_path):
        loaded_yaml = processor.load_yaml(filename)
        if isinstance(loaded_yaml, dict):
            configuration.update(loaded_yaml)
    return configuration

def load_yamll(processor, fname, secrets=None, args=None):
    try:
        template_args = {} if args is None else args
        process_yaml = False
        with open(fname, encoding="utf-8") as f:
            if f.readline().lower().startswith(("# dwains_dashboard", "# dwains_theme", "# lovelace_gen", "#dwains_dashboard")):
                process_yaml = True

        #_LOGGER.debug(f"load_yamll() Loading YAML: {fname}, process_yaml={process_yaml}")

        if process_yaml:
            stream = io.StringIO(processor.jinja.get_template(fname).render({
                **template_args,
                "_dd_more_pages": processor.more_pages,
                "_global": processor.global_config,
                }))
            stream.name = fname
            return yaml.load(
                stream,
                Loader=lambda _stream: _DwainsDashboardLoader(
                    _stream,
                    secrets,
                    processor,
                ),
            ) or OrderedDict()
        else:
            with open(fname, encoding="utf-8") as config_file:
                data = yaml.load(
                    config_file,
                    Loader=lambda stream: _DwainsDashboardLoader(
                        stream,
                        secrets,
                        processor,
                    ),
                ) or OrderedDict()
                #_LOGGER.warning(f"load_yamll() DATA: {data}")
                return data

    except yaml.YAMLError as exc:
        _LOGGER.error(f"YAMLError: {str(exc)}")
        raise HomeAssistantError(exc)
    except UnicodeDecodeError as exc:
        _LOGGER.error("Unicode Error :: Unable to read file %s: %s", fname, exc)
        raise HomeAssistantError(exc)


def _include_yaml(ldr, node):
    args = {}
    if isinstance(node.value, str):
        fn = node.value
    else:
        fn, args, *_ = ldr.construct_sequence(node)
    fname = os.path.abspath(os.path.join(os.path.dirname(ldr.name), fn))
    try:
        return _add_reference(
            ldr.processor.load_yaml(fname, ldr.secrets, args=args),
            ldr,
            node,
        )
    except FileNotFoundError as exc:
        _LOGGER.error("Unable to include file %s: %s", fname, exc)
        raise HomeAssistantError(exc)


def _include_dir_named_yaml(ldr, node):
    mapping = NodeDictClass()
    directory = os.path.join(os.path.dirname(ldr.name), node.value)
    for fname in _find_yaml_files(directory):
        if os.path.basename(fname) == "secrets.yaml":
            continue
        filename = os.path.splitext(os.path.basename(fname))[0]
        mapping[filename] = ldr.processor.load_yaml(fname, ldr.secrets)
    _add_node_reference(mapping, ldr, node)
    return mapping


def _include_dir_merge_named_yaml(ldr, node):
    mapping = NodeDictClass()
    directory = os.path.join(os.path.dirname(ldr.name), node.value)
    for fname in _find_yaml_files(directory):
        if os.path.basename(fname) == "secrets.yaml":
            continue
        loaded_yaml = ldr.processor.load_yaml(fname, ldr.secrets)
        if isinstance(loaded_yaml, dict):
            mapping.update(loaded_yaml)
    _add_node_reference(mapping, ldr, node)
    return mapping


def _include_dir_list_yaml(ldr, node):
    directory = os.path.join(os.path.dirname(ldr.name), node.value)
    return [
        loaded_yaml
        for fname in _find_yaml_files(directory)
        if os.path.basename(fname) != "secrets.yaml"
        and (loaded_yaml := ldr.processor.load_yaml(fname, ldr.secrets)) is not None
    ]


def _include_dir_merge_list_yaml(ldr, node):
    merged_list = []
    directory = os.path.join(os.path.dirname(ldr.name), node.value)
    for fname in _find_yaml_files(directory):
        if os.path.basename(fname) == "secrets.yaml":
            continue
        loaded_yaml = ldr.processor.load_yaml(fname, ldr.secrets)
        if isinstance(loaded_yaml, list):
            merged_list.extend(loaded_yaml)
    return _add_reference(merged_list, ldr, node)


_DwainsDashboardLoader.add_constructor("!include", _include_yaml)
_DwainsDashboardLoader.add_constructor(
    "!include_dir_named",
    _include_dir_named_yaml,
)
_DwainsDashboardLoader.add_constructor(
    "!include_dir_merge_named",
    _include_dir_merge_named_yaml,
)
_DwainsDashboardLoader.add_constructor(
    "!include_dir_list",
    _include_dir_list_yaml,
)
_DwainsDashboardLoader.add_constructor(
    "!include_dir_merge_list",
    _include_dir_merge_list_yaml,
)


async def process_yaml(hass: HomeAssistant, config_entry):
    """Process all YAML files for Dwains Dashboard."""
    #_LOGGER.warning('Start of function to process all yaml files!')

    processor = get_yaml_processor(hass)
    processor.more_pages.clear()

    hki_configuration = await hass.async_add_executor_job(
        _load_hki_configuration,
        processor,
        hass.config.path("hki-user/config"),
    )
    processor.global_config.update(hki_configuration)

    configs_exist, pages, warnings, failures = await hass.async_add_executor_job(
        load_more_page_navigation,
        hass.config.path("dwains-dashboard/configs"),
        False,
    )
    processor.more_pages.update(pages)
    for subdirectory in warnings:
        _LOGGER.warning(
            "Invalid config.yaml in %s: Missing 'name' or 'icon'",
            subdirectory,
        )
    for subdirectory, error in failures:
        _LOGGER.error("Failed to read config.yaml in %s: %s", subdirectory, error)

    if configs_exist:
        hass.bus.async_fire("dwains_dashboard_reload")

async def reload_configuration(hass):
    _LOGGER.warning('Reload YAML configuration files...!')

    processor = get_yaml_processor(hass)
    processor.more_pages.clear()

    _, pages, _, _ = await hass.async_add_executor_job(
        load_more_page_navigation,
        hass.config.path("dwains-dashboard/configs"),
        True,
    )
    processor.more_pages.update(pages)

    hass.bus.async_fire("dwains_dashboard_reload")
