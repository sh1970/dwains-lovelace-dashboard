"""Area and homepage-settings WebSocket commands."""

from __future__ import annotations

import json
from collections import OrderedDict

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant

from .configuration_runtime import serialize_configuration_mutation
from .yaml_files import dump_yaml_file, load_yaml_file_or_default


AREAS_PATH = "dwains-dashboard/configs/areas.yaml"
SETTINGS_PATH = "dwains-dashboard/configs/settings.yaml"


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_area_button",
        vol.Optional("icon"): str,
        vol.Optional("areaId"): str,
        vol.Optional("floor"): str,
        vol.Optional("disableArea"): bool,
        vol.Optional("hideIcon"): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_area_button(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Handle saving an area button."""
    if msg["areaId"]:
        areas = await hass.async_add_executor_job(
            load_yaml_file_or_default,
            hass.config.path(AREAS_PATH),
            OrderedDict(),
        )
        if not areas.get(msg["areaId"]):
            areas[msg["areaId"]] = OrderedDict()

        area = areas[msg["areaId"]]
        area["disabled"] = msg.get("disableArea", False)
        if msg.get("hideIcon", False):
            area["hide_icon"] = True
        else:
            area.pop("hide_icon", None)
        icon = msg.get("icon", "")
        if icon:
            area["icon"] = icon
        else:
            area.pop("icon", None)
        area.pop("floor", None)

        await hass.async_add_executor_job(
            dump_yaml_file,
            hass.config.path(AREAS_PATH),
            areas,
        )

    hass.bus.async_fire("dwains_dashboard_homepage_card_reload")
    connection.send_result(msg["id"], {"succesfull": "Area button saved"})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_area_bool_value",
        vol.Required("areaId"): str,
        vol.Optional("key"): str,
        vol.Optional("value"): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_area_bool_value(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Handle editing one area boolean value."""
    areas = await hass.async_add_executor_job(
        load_yaml_file_or_default,
        hass.config.path(AREAS_PATH),
        OrderedDict(),
    )
    if not areas.get(msg["areaId"]):
        areas[msg["areaId"]] = OrderedDict()
    areas[msg["areaId"]].update({msg["key"]: msg["value"]})

    await hass.async_add_executor_job(
        dump_yaml_file,
        hass.config.path(AREAS_PATH),
        areas,
    )
    hass.bus.async_fire("dwains_dashboard_homepage_card_reload")
    hass.bus.async_fire("dwains_dashboard_devicespage_card_reload")
    connection.send_result(
        msg["id"], {"succesfull": "Area bool value set succesfully"}
    )


def _normalize_area_sensor_device_classes(value):
    if value is None:
        return ["temperature", "humidity"]
    if isinstance(value, str):
        return [item.strip() for item in value.split(",") if item.strip()]
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    return []


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_homepage_header",
        vol.Optional("disableClock"): bool,
        vol.Optional("amPmClock"): bool,
        vol.Optional("disableWelcomeMessage"): bool,
        vol.Optional("v2Mode"): bool,
        vol.Optional("disableSensorGraph"): bool,
        vol.Optional("weatherEntity"): str,
        vol.Optional("invertCover"): bool,
        vol.Optional("alarmEntity"): str,
        vol.Optional("hideUnavailableEntities"): bool,
        vol.Optional("areaSensorDeviceClasses"): vol.Any([str], str),
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_homepage_header(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Handle saving homepage settings."""
    homepage_header = await hass.async_add_executor_job(
        load_yaml_file_or_default,
        hass.config.path(SETTINGS_PATH),
        OrderedDict(),
    )
    hide_unavailable = msg.get(
        "hideUnavailableEntities",
        homepage_header.get("hide_unavailable_entities", False),
    )
    if isinstance(hide_unavailable, str):
        hide_unavailable = hide_unavailable.strip().lower() == "true"
    area_sensor_device_classes = _normalize_area_sensor_device_classes(
        msg.get(
            "areaSensorDeviceClasses",
            homepage_header.get(
                "area_sensor_device_classes", ["temperature", "humidity"]
            ),
        )
    )

    homepage_header.update(
        {
            "disable_clock": msg["disableClock"],
            "am_pm_clock": msg["amPmClock"],
            "disable_welcome_message": msg["disableWelcomeMessage"],
            "v2_mode": msg["v2Mode"],
            "disable_sensor_graph": msg["disableSensorGraph"],
            "invert_cover": msg["invertCover"],
            "weather_entity": msg["weatherEntity"],
            "alarm_entity": msg["alarmEntity"],
            "hide_unavailable_entities": hide_unavailable,
            "area_sensor_device_classes": area_sensor_device_classes,
        }
    )
    await hass.async_add_executor_job(
        dump_yaml_file,
        hass.config.path(SETTINGS_PATH),
        homepage_header,
    )
    hass.bus.async_fire("dwains_dashboard_homepage_card_reload")
    connection.send_result(msg["id"], {"succesfull": "Homepage header saved"})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/sort_area_button",
        vol.Required("sortData"): str,
        vol.Required("sortType"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_sort_area_button(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Handle sorting area buttons."""
    sort_data = json.loads(msg["sortData"])
    sort_type = msg["sortType"]
    areas = await hass.async_add_executor_job(
        load_yaml_file_or_default,
        hass.config.path(AREAS_PATH),
        OrderedDict(),
        True,
    )
    for number, area_id in enumerate(sort_data, start=1):
        if areas.get(area_id):
            areas[area_id].update({sort_type: number})
        else:
            areas[area_id] = OrderedDict({sort_type: number})

    await hass.async_add_executor_job(
        dump_yaml_file,
        hass.config.path(AREAS_PATH),
        areas,
    )
    connection.send_result(
        msg["id"], {"succesfull": "Area buttons sorted succesfully"}
    )
