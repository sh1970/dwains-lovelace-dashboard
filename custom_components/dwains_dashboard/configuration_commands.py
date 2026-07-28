"""Read-only configuration WebSocket command for Dwains Dashboard."""

from __future__ import annotations

import asyncio
import os
from typing import Any, Mapping

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .configuration_files import load_configuration_files
from .configuration_runtime import get_configuration_runtime
from .const import VERSION
from .more_page_files import load_more_pages_metadata
from .yaml_files import load_yaml_file_or_default


@websocket_api.async_response
@websocket_api.websocket_command(
    {vol.Required("type"): "dwains_dashboard/configuration/get"}
)
async def websocket_get_configuration(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: Mapping[str, Any],
) -> None:
    """Return the cached dashboard configuration filesystem snapshot."""
    configuration_runtime = get_configuration_runtime(hass)

    async def load_configuration():
        snapshot = await hass.async_add_executor_job(
            load_configuration_files,
            hass.config.path("dwains-dashboard/configs"),
        )
        return {
            "areas": snapshot["areas"],
            "area_cards": snapshot["area_cards"],
            "device_cards": snapshot["device_cards"],
            "entity_cards": snapshot["entity_cards"],
            "entities_popup": snapshot["entities_popup"],
            "entities": snapshot["entities"],
            "devices": snapshot["devices"],
            "homepage_header": snapshot["homepage_header"],
            "more_pages": snapshot["more_pages"],
            "installed_version": VERSION,
            "devices_card": snapshot["devices_card"],
            "devices_popup": snapshot["devices_popup"],
        }

    configuration = await configuration_runtime.async_get_cached_or_load(
        load_configuration
    )
    connection.send_result(msg["id"], configuration)


@websocket_api.async_response
@websocket_api.websocket_command(
    {vol.Required("type"): "dwains_dashboard/navigation/get"}
)
async def websocket_get_navigation(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: Mapping[str, Any],
) -> None:
    """Return only the data required by the persistent dashboard navigation."""
    configs_path = hass.config.path("dwains-dashboard/configs")
    devices, more_pages = await asyncio.gather(
        hass.async_add_executor_job(
            load_yaml_file_or_default,
            os.path.join(configs_path, "devices.yaml"),
            {},
        ),
        hass.async_add_executor_job(load_more_pages_metadata, configs_path),
    )
    connection.send_result(
        msg["id"],
        {
            "devices": devices if isinstance(devices, dict) else {},
            "more_pages": more_pages,
        },
    )
