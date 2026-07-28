import logging
from homeassistant.components.frontend import add_extra_js_url, remove_extra_js_url
from homeassistant.components.http import StaticPathConfig

_LOGGER = logging.getLogger(__name__)

from .const import DOMAIN, FRONTEND_RESOURCE_REVISION, VERSION
from .runtime_data import get_domain_data

FRONTEND_PLUGIN_URLS = (
    f"/dwains_dashboard/js/dwains-dashboard-layout.js?version={VERSION}-{FRONTEND_RESOURCE_REVISION}",
    f"/dwains_dashboard/js/dwains-dashboard-loader.js?version={VERSION}-{FRONTEND_RESOURCE_REVISION}",
)
LEGACY_FRONTEND_PLUGIN_URLS = tuple(
    f"/dwains_dashboard/js/{artifact}?version={version}"
    for artifact in ("dwains-dashboard-layout.js", "dwains-dashboard-loader.js")
    for version in (
        VERSION,
        f"{VERSION}-3de7a027",
        f"{VERSION}-ba0829e0",
        f"{VERSION}-925fc26e",
        f"{VERSION}-53dd580c",
        f"{VERSION}-7b255ad5",
        f"{VERSION}-7b255ad5-r2",
        f"{VERSION}-2f2fb3cb",
        f"{VERSION}-2f2fb3cb-r1",
        f"{VERSION}-3667dc53",
        f"{VERSION}-3667dc53-r1",
        f"{VERSION}-212f8fbf",
        f"{VERSION}-212f8fbf-r1",
        f"{VERSION}-c109cd23",
        f"{VERSION}-c109cd23-r1",
        f"{VERSION}-eff23191",
        f"{VERSION}-eff23191-r1",
        f"{VERSION}-6ebb20e7",
        f"{VERSION}-6ebb20e7-r1",
        f"{VERSION}-6b927744",
        f"{VERSION}-6b927744-r1",
        f"{VERSION}-53e2d623",
        f"{VERSION}-53e2d623-r1",
        f"{VERSION}-12875f58",
        f"{VERSION}-12875f58-r1",
        f"{VERSION}-8c1b1aff",
        f"{VERSION}-8c1b1aff-r1",
        f"{VERSION}-41f5422c",
        f"{VERSION}-41f5422c-r1",
        f"{VERSION}-82e4ef5e",
        f"{VERSION}-82e4ef5e-r1",
        f"{VERSION}-bc804189",
        f"{VERSION}-bc804189-r1",
        f"{VERSION}-71a77fc8",
        f"{VERSION}-71a77fc8-r1",
        f"{VERSION}-f9fc795a",
        f"{VERSION}-f9fc795a-r1",
        f"{VERSION}-3fb68884",
        f"{VERSION}-3fb68884-r1",
        f"{VERSION}-1eb531d2",
        f"{VERSION}-1eb531d2-r1",
    )
)
FRONTEND_PLUGINS_REGISTERED_KEY = "frontend_plugins_registered"
STATIC_PATH_REGISTERED_KEY = "frontend_static_path_registered"


def register_frontend_plugins(hass) -> None:
    """Register the owned frontend module URLs idempotently."""
    domain_data = get_domain_data(hass)
    if domain_data.get(FRONTEND_PLUGINS_REGISTERED_KEY):
        return
    for plugin_url in LEGACY_FRONTEND_PLUGIN_URLS:
        remove_extra_js_url(hass, plugin_url)
    for plugin_url in FRONTEND_PLUGIN_URLS:
        add_extra_js_url(hass, plugin_url)
    domain_data[FRONTEND_PLUGINS_REGISTERED_KEY] = True


def remove_frontend_plugins(hass) -> None:
    """Remove the owned frontend module URLs idempotently."""
    domain_data = get_domain_data(hass)
    if not domain_data.pop(FRONTEND_PLUGINS_REGISTERED_KEY, False):
        return
    for plugin_url in FRONTEND_PLUGIN_URLS:
        remove_extra_js_url(hass, plugin_url)


async def load_plugins(hass, name):
    #_LOGGER.warning(f"load_plugins() version: {VERSION}")

    # Load the tiny layout preload FIRST so the custom view layout element is
    # defined before HA renders the dashboard view (the big bundle loads async
    # and otherwise loses the race -> "Configuration error" on the whole view).
    register_frontend_plugins(hass)

    domain_data = get_domain_data(hass)
    if domain_data.get(STATIC_PATH_REGISTERED_KEY):
        return
    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                "/dwains_dashboard/js",
                hass.config.path(f"custom_components/{name}/js"),
                True,
            )
        ]
    )
    domain_data[STATIC_PATH_REGISTERED_KEY] = True
