"""Blueprint WebSocket commands for Dwains Dashboard."""

from __future__ import annotations

import logging
from typing import Any, Mapping

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.util import slugify

from .blueprint_files import load_blueprint_files
from .configuration_runtime import serialize_configuration_mutation
from .mutation_files import remove_file_if_exists
from .yaml_files import dump_yaml_file, parse_yaml_text


_LOGGER = logging.getLogger(__name__)


@websocket_api.async_response
@websocket_api.websocket_command({vol.Required("type"): "dwains_dashboard/get_blueprints"})
async def websocket_get_blueprints(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: Mapping[str, Any],
) -> None:
    """Return a list of installed blueprints asynchronously."""
    blueprints, failures = await hass.async_add_executor_job(
        load_blueprint_files,
        hass.config.path("dwains-dashboard/blueprints"),
    )
    for filename, error in failures:
        _LOGGER.error("Error loading blueprint %s: %s", filename, error)

    connection.send_result(msg["id"], {"blueprints": blueprints})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/install_blueprint",
        vol.Required("yamlCode"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_install_blueprint(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Install a blueprint while preserving the legacy response contract."""
    filecontent = await hass.async_add_executor_job(parse_yaml_text, msg["yamlCode"])

    if not filecontent.get("blueprint"):
        _LOGGER.warning("no blueprint data")
        connection.send_result(msg["id"], {"error": "Blueprint has invalid data"})
        return
    if not filecontent.get("card"):
        _LOGGER.warning("no card")
        connection.send_result(msg["id"], {"error": "Blueprint has no card"})
        return

    filename = f'{slugify(filecontent["blueprint"]["name"])}.yaml'
    if filecontent.get("button_card_templates"):
        await hass.async_add_executor_job(
            dump_yaml_file,
            hass.config.path(
                f"dwains-dashboard/button_card_templates/blueprints/{filename}"
            ),
            filecontent.get("button_card_templates"),
        )
        filecontent.pop("button_card_templates")

    if filecontent.get("apexcharts_card_templates"):
        await hass.async_add_executor_job(
            dump_yaml_file,
            hass.config.path(
                f"dwains-dashboard/apexcharts_card_templates/blueprints/{filename}"
            ),
            filecontent.get("apexcharts_card_templates"),
        )
        filecontent.pop("apexcharts_card_templates")

    await hass.async_add_executor_job(
        dump_yaml_file,
        hass.config.path(f"dwains-dashboard/blueprints/{filename}"),
        filecontent,
    )
    connection.send_result(msg["id"], {"succesfull": filename})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/delete_blueprint",
        vol.Required("blueprint"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_delete_blueprint(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Delete a blueprint while preserving the legacy response contract."""
    filename = hass.config.path(
        f'dwains-dashboard/blueprints/{msg["blueprint"]}'
    )
    await hass.async_add_executor_job(remove_file_if_exists, filename)
    connection.send_result(
        msg["id"], {"succesfull": "Blueprint deleted succesfull"}
    )
