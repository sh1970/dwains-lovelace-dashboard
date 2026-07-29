"""Entity configuration WebSocket commands."""

from __future__ import annotations

import json
from collections import OrderedDict

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .configuration_runtime import serialize_configuration_mutation
from .mutation_files import remove_file_if_exists
from .yaml_files import (
    dump_and_verify_json_normalized_yaml_file,
    dump_yaml_file,
    load_yaml_file_or_default,
)


ENTITIES_PATH = "dwains-dashboard/configs/entities.yaml"


async def _load_entities(hass):
    return await hass.async_add_executor_job(
        load_yaml_file_or_default,
        hass.config.path(ENTITIES_PATH),
        OrderedDict(),
        True,
    )


async def _save_entities(hass, entities):
    await hass.async_add_executor_job(
        dump_yaml_file,
        hass.config.path(ENTITIES_PATH),
        entities,
    )


async def _write_entity_override(hass, msg, directory, flag):
    filename = hass.config.path(
        f'dwains-dashboard/configs/cards/{directory}/{msg["entityId"]}.yaml'
    )
    persisted_card = await hass.async_add_executor_job(
        dump_and_verify_json_normalized_yaml_file,
        filename,
        json.loads(msg["cardData"]),
    )
    entities = await _load_entities(hass)
    if not entities.get(msg["entityId"]):
        entities[msg["entityId"]] = OrderedDict()
    entities[msg["entityId"]].update({flag: True})
    await _save_entities(hass, entities)
    return persisted_card


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_entity",
        vol.Required("entity"): str,
        vol.Optional("friendlyName"): str,
        vol.Optional("disableEntity"): bool,
        vol.Optional("hideEntity"): bool,
        vol.Optional("excludeEntity"): bool,
        vol.Optional("rowSpan"): str,
        vol.Optional("colSpan"): str,
        vol.Optional("rowSpanLg"): str,
        vol.Optional("colSpanLg"): str,
        vol.Optional("rowSpanXl"): str,
        vol.Optional("colSpanXl"): str,
        vol.Optional("customCard"): bool,
        vol.Optional("customPopup"): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_entity(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Save entity display settings."""
    entities = await _load_entities(hass)
    if not entities.get(msg["entity"]):
        entities[msg["entity"]] = OrderedDict()
    entities[msg["entity"]].update(
        {
            "hidden": msg["hideEntity"],
            "excluded": msg["excludeEntity"],
            "disabled": msg["disableEntity"],
            "friendly_name": msg["friendlyName"],
            "col_span": msg["colSpan"],
            "row_span": msg["rowSpan"],
            "col_span_lg": msg["colSpanLg"],
            "row_span_lg": msg["rowSpanLg"],
            "col_span_xl": msg["colSpanXl"],
            "row_span_xl": msg["rowSpanXl"],
            "custom_card": msg["customCard"],
            "custom_popup": msg["customPopup"],
        }
    )
    await _save_entities(hass, entities)
    hass.bus.async_fire("dwains_dashboard_homepage_card_reload")
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(msg["id"], {"succesfull": "Entity saved"})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_entity_card",
        vol.Required("cardData"): str,
        vol.Required("entityId"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_entity_card(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Save an entity card override and enable it."""
    persisted_card = await _write_entity_override(
        hass, msg, "entities", "custom_card"
    )
    hass.bus.async_fire("dwains_dashboard_homepage_card_reload")
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(
        msg["id"],
        {
            "succesfull": "Card added succesfully",
            "card": persisted_card,
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_entity_popup",
        vol.Required("cardData"): str,
        vol.Required("entityId"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_entity_popup(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Save an entity popup override and enable it."""
    persisted_card = await _write_entity_override(
        hass, msg, "entities_popup", "custom_popup"
    )
    hass.bus.async_fire("dwains_dashboard_config_reload")
    hass.bus.async_fire("dwains_dashboard_homepage_card_reload")
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(
        msg["id"],
        {
            "succesfull": "Popup added succesfully",
            "card": persisted_card,
        },
    )


async def _remove_entity_card_file(hass, entity_id, directory):
    filename = hass.config.path(
        f"dwains-dashboard/configs/cards/{directory}/{entity_id}.yaml"
    )
    await hass.async_add_executor_job(remove_file_if_exists, filename)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/remove_entity_card",
        vol.Required("entityId"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_remove_entity_card(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Remove an entity card override."""
    await _remove_entity_card_file(hass, msg["entityId"], "entities")
    hass.bus.async_fire("dwains_dashboard_homepage_card_reload")
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(
        msg["id"], {"succesfull": "Entity card removed succesfully"}
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/remove_entity_popup",
        vol.Required("entityId"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_remove_entity_popup(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Remove an entity popup override."""
    await _remove_entity_card_file(hass, msg["entityId"], "entities_popup")
    hass.bus.async_fire("dwains_dashboard_config_reload")
    hass.bus.async_fire("dwains_dashboard_homepage_card_reload")
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(
        msg["id"], {"succesfull": "Entity card removed succesfully"}
    )


async def _set_entity_value(hass, entity_id, key, value):
    entities = await _load_entities(hass)
    if not entities.get(entity_id):
        entities[entity_id] = OrderedDict()
    entities[entity_id][key] = value
    await _save_entities(hass, entities)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_entity_favorite",
        vol.Required("entityId"): str,
        vol.Optional("favorite"): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_entity_favorite(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Set an entity's favorite state."""
    await _set_entity_value(hass, msg["entityId"], "favorite", msg["favorite"])
    hass.bus.async_fire("dwains_dashboard_homepage_card_reload")
    connection.send_result(msg["id"], {"succesfull": "Popup added succesfully"})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_entity_bool_value",
        vol.Required("entityId"): str,
        vol.Optional("key"): str,
        vol.Optional("value"): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_entity_bool_value(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Set a boolean entity option."""
    await _set_entity_value(hass, msg["entityId"], msg["key"], msg["value"])
    hass.bus.async_fire("dwains_dashboard_homepage_card_reload")
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(
        msg["id"], {"succesfull": "Entity bool value set succesfully"}
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_entities_bool_value",
        vol.Required("entities"): str,
        vol.Optional("key"): str,
        vol.Optional("value"): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_entities_bool_value(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Set a boolean option for multiple entities in one write."""
    entities = await _load_entities(hass)
    for entity_id in json.loads(msg["entities"]):
        if not entities.get(entity_id):
            entities[entity_id] = OrderedDict()
        entities[entity_id][msg["key"]] = msg["value"]
    await _save_entities(hass, entities)
    hass.bus.async_fire("dwains_dashboard_homepage_card_reload")
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(
        msg["id"], {"succesfull": "Entities bool value set succesfully"}
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/sort_entity",
        vol.Required("sortData"): str,
        vol.Required("sortType"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_sort_entity(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Save the requested entity order."""
    entities = await _load_entities(hass)
    sort_type = msg["sortType"]
    for position, entity_id in enumerate(json.loads(msg["sortData"]), start=1):
        if not entities.get(entity_id):
            entities[entity_id] = OrderedDict()
        entities[entity_id][sort_type] = position
    await _save_entities(hass, entities)
    connection.send_result(
        msg["id"], {"succesfull": "Entity cards sorted succesfully"}
    )
