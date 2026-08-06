"""Local Lovelace YAML adapter for Dwains Dashboard templates."""

from __future__ import annotations

import os
import time
from pathlib import Path
from typing import override

from annotatedyaml.exceptions import YamlTypeError
from annotatedyaml.loader import Secrets
from homeassistant.components.lovelace.const import ConfigNotFound
from homeassistant.components.lovelace.dashboard import LovelaceYAML
from homeassistant.helpers.json import json_bytes, json_fragment

from .process_yaml import DashboardYamlProcessor


class DwainsDashboardLovelaceYAML(LovelaceYAML):
    """Load only this dashboard through the private template-aware loader."""

    def __init__(self, hass, url_path, config, processor: DashboardYamlProcessor):
        super().__init__(hass, url_path, config)
        self._processor = processor

    def invalidate_cache(self, *_args) -> None:
        """Invalidate includes which Lovelace cannot track through the root mtime."""
        self._cache = None

    @override
    def _load_config(self, force: bool) -> tuple[bool, dict, json_fragment]:
        if not force and self._cache is not None:
            config, last_update, json = self._cache
            modtime = os.path.getmtime(self.path)
            if config and last_update > modtime:
                return False, config, json

        is_updated = self._cache is not None
        try:
            config = self._processor.load_yaml(
                self.path,
                Secrets(Path(self.hass.config.config_dir)),
            )
        except FileNotFoundError:
            raise ConfigNotFound from None
        if not isinstance(config, dict):
            raise YamlTypeError(f"YAML file {self.path} does not contain a dict")

        json = json_fragment(json_bytes(config))
        self._cache = (config, time.time(), json)
        return is_updated, config, json
