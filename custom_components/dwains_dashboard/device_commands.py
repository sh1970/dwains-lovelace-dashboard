"""Device configuration WebSocket commands."""

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


DEVICES_PATH = "dwains-dashboard/configs/devices.yaml"


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_device_button",
        vol.Optional("icon"): str,
        vol.Optional("device"): str,
        vol.Optional("showInNavbar"): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_device_button(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Handle saving a device button."""
    if msg["device"]:
        devices = await hass.async_add_executor_job(
            load_yaml_file_or_default,
            hass.config.path(DEVICES_PATH),
            OrderedDict(),
        )
        if not devices.get(msg["device"]):
            devices[msg["device"]] = OrderedDict()
        devices[msg["device"]].update(
            {"icon": msg["icon"], "show_in_navbar": msg["showInNavbar"]}
        )
        await hass.async_add_executor_job(
            dump_yaml_file,
            hass.config.path(DEVICES_PATH),
            devices,
        )

    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    hass.bus.async_fire("dwains_dashboard_navigation_card_reload")
    connection.send_result(msg["id"], {"succesfull": "Device button saved"})


async def _write_domain_card(hass, msg, directory):
    filecontent = json.loads(msg["cardData"])
    filename = hass.config.path(
        f'dwains-dashboard/configs/cards/{directory}/{msg["domain"]}.yaml'
    )
    return await hass.async_add_executor_job(
        dump_and_verify_json_normalized_yaml_file,
        filename,
        filecontent,
    )


async def _remove_domain_card(hass, msg, directory):
    filename = hass.config.path(
        f'dwains-dashboard/configs/cards/{directory}/{msg["domain"]}.yaml'
    )
    await hass.async_add_executor_job(remove_file_if_exists, filename)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_device_card",
        vol.Required("cardData"): str,
        vol.Required("domain"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_device_card(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Handle saving a device card."""
    persisted_card = await _write_domain_card(hass, msg, "devices_card")
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(
        msg["id"],
        {
            "succesfull": "Device card saved",
            "card": persisted_card,
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/remove_device_card",
        vol.Required("domain"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_remove_device_card(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Handle removing a device-domain card."""
    await _remove_domain_card(hass, msg, "devices_card")
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(
        msg["id"], {"succesfull": "Entity card removed succesfully"}
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_device_popup",
        vol.Required("cardData"): str,
        vol.Required("domain"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_device_popup(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Handle saving a device popup."""
    persisted_card = await _write_domain_card(hass, msg, "devices_popup")
    hass.bus.async_fire("dwains_dashboard_config_reload")
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(
        msg["id"],
        {
            "succesfull": "Device popup saved",
            "card": persisted_card,
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/remove_device_popup",
        vol.Required("domain"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_remove_device_popup(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Handle removing a device-domain popup."""
    await _remove_domain_card(hass, msg, "devices_popup")
    hass.bus.async_fire("dwains_dashboard_config_reload")
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(
        msg["id"], {"succesfull": "Device popup removed succesfully"}
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_device_bool_value",
        vol.Required("device"): str,
        vol.Optional("key"): str,
        vol.Optional("value"): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_device_bool_value(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Handle editing one device boolean value."""
    devices = await hass.async_add_executor_job(
        load_yaml_file_or_default,
        hass.config.path(DEVICES_PATH),
        OrderedDict(),
        True,
    )
    if not devices.get(msg["device"]):
        devices[msg["device"]] = OrderedDict()
    devices[msg["device"]].update({msg["key"]: msg["value"]})
    await hass.async_add_executor_job(
        dump_yaml_file,
        hass.config.path(DEVICES_PATH),
        devices,
    )
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(
        msg["id"], {"succesfull": "Device bool value set succesfully"}
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/sort_device_button",
        vol.Required("sortData"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_sort_device_button(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Handle sorting device buttons."""
    sort_data = json.loads(msg["sortData"])
    devices = await hass.async_add_executor_job(
        load_yaml_file_or_default,
        hass.config.path(DEVICES_PATH),
        OrderedDict(),
        True,
    )
    for number, device_id in enumerate(sort_data, start=1):
        if devices.get(device_id):
            devices[device_id].update({"sort_order": number})
        else:
            devices[device_id] = OrderedDict({"sort_order": number})
    await hass.async_add_executor_job(
        dump_yaml_file,
        hass.config.path(DEVICES_PATH),
        devices,
    )
    connection.send_result(
        msg["id"], {"succesfull": "Device buttons sorted succesfully"}
    )
