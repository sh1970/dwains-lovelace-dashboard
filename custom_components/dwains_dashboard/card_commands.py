"""Area and device custom-card WebSocket commands."""

from __future__ import annotations

import json
from datetime import datetime

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .configuration_runtime import serialize_configuration_mutation
from .mutation_files import file_has_content, remove_file_if_exists
from .yaml_files import dump_and_verify_json_normalized_yaml_file


def _card_directory(msg, *, page_driven=False):
    if page_driven:
        if msg["page"] == "areas":
            return f'dwains-dashboard/configs/cards/areas/{msg["area_id"]}'
        if msg["page"] == "devices":
            return f'dwains-dashboard/configs/cards/devices/{msg["domain"]}'
        raise ValueError(f'Unsupported dashboard page: {msg["page"]}')
    if msg.get("domain"):
        return f'dwains-dashboard/configs/cards/devices/{msg["domain"]}'
    return f'dwains-dashboard/configs/cards/areas/{msg["area_id"]}'


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/add_card",
        vol.Optional("card_data"): str,
        vol.Optional("area_id"): str,
        vol.Optional("domain"): str,
        vol.Optional("position"): str,
        vol.Optional("filename"): str,
        vol.Optional("page"): str,
        vol.Optional("rowSpan"): str,
        vol.Optional("colSpan"): str,
        vol.Optional("rowSpanLg"): str,
        vol.Optional("colSpanLg"): str,
        vol.Optional("rowSpanXl"): str,
        vol.Optional("colSpanXl"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_add_card(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Add an area or device custom card."""
    card = json.loads(msg["card_data"])
    card_type = msg["filename"] or card["type"]
    if not card_type:
        return
    card.update(
        {
            "col_span": msg["colSpan"],
            "row_span": msg["rowSpan"],
            "col_span_lg": msg["colSpanLg"],
            "row_span_lg": msg["rowSpanLg"],
            "col_span_xl": msg["colSpanXl"],
            "row_span_xl": msg["rowSpanXl"],
            "position": msg["position"],
        }
    )
    directory = _card_directory(msg, page_driven=True)
    filename = hass.config.path(f"{directory}/{card_type}.yaml")
    if not msg["filename"] and await hass.async_add_executor_job(
        file_has_content, filename
    ):
        suffix = datetime.now().strftime("%Y%m%d%H%M%S")
        filename = hass.config.path(f"{directory}/{card_type}{suffix}.yaml")
    persisted_card = await hass.async_add_executor_job(
        dump_and_verify_json_normalized_yaml_file,
        filename,
        card,
    )
    hass.bus.async_fire("dwains_dashboard_homepage_card_reload")
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(
        msg["id"],
        {
            "succesfull": "card added succesfully",
            "card": persisted_card,
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/remove_card",
        vol.Optional("area_id"): str,
        vol.Optional("domain"): str,
        vol.Optional("filename"): str,
        vol.Optional("page"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_remove_card(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Remove an area or device custom card."""
    filename = hass.config.path(f'{_card_directory(msg)}/{msg["filename"]}.yaml')
    await hass.async_add_executor_job(remove_file_if_exists, filename)
    hass.bus.async_fire("dwains_dashboard_homepage_card_reload")
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(msg["id"], {"succesfull": "card removed succesfully"})
