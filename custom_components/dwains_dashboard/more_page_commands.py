"""More-page WebSocket commands."""

from __future__ import annotations

import json
import shutil
from collections import OrderedDict
from datetime import datetime

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant
from homeassistant.util import slugify

from .configuration_runtime import serialize_configuration_mutation
from .mutation_files import file_has_content
from .more_page_files import (
    load_more_page_content,
    load_more_pages_metadata,
    validate_more_page_foldername,
)
from .process_yaml import get_yaml_processor, reload_configuration
from .yaml_files import (
    dump_json_normalized_yaml_file,
    dump_yaml_file,
    load_yaml_file_or_default,
)


MORE_PAGES_PATH = "dwains-dashboard/configs/more_pages"


@websocket_api.websocket_command(
    {vol.Required("type"): "dwains_dashboard/more_pages/get"}
)
@websocket_api.async_response
async def websocket_get_more_pages(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Return the small metadata snapshot used by the more-pages overview."""
    pages = await hass.async_add_executor_job(
        load_more_pages_metadata,
        hass.config.path("dwains-dashboard/configs"),
    )
    connection.send_result(msg["id"], {"more_pages": pages})


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/more_page/get",
        vol.Required("foldername"): str,
    }
)
@websocket_api.async_response
async def websocket_get_more_page(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Return one authoritative saved page and its metadata."""
    try:
        page = await hass.async_add_executor_job(
            load_more_page_content,
            hass.config.path("dwains-dashboard/configs"),
            msg["foldername"],
        )
    except ValueError as error:
        connection.send_error(msg["id"], "invalid_foldername", str(error))
        return
    if page is None:
        connection.send_error(msg["id"], "not_found", "More page not found")
        return
    connection.send_result(msg["id"], page)


def _more_page_path(hass, foldername, filename):
    validate_more_page_foldername(foldername)
    return hass.config.path(f"{MORE_PAGES_PATH}/{foldername}/{filename}")


async def _load_more_page_config(hass, foldername):
    return await hass.async_add_executor_job(
        load_yaml_file_or_default,
        _more_page_path(hass, foldername, "config.yaml"),
        OrderedDict(),
        True,
    )


async def _save_more_page_config(hass, foldername, config):
    await hass.async_add_executor_job(
        dump_yaml_file,
        _more_page_path(hass, foldername, "config.yaml"),
        config,
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_more_page_button",
        vol.Optional("more_page"): str,
        vol.Optional("name"): str,
        vol.Optional("icon"): str,
        vol.Optional("showInNavbar"): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_more_page_button(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Save the legacy more-page button settings."""
    if msg["more_page"]:
        config = await _load_more_page_config(hass, msg["more_page"])
        config.update(
            {
                "name": msg["name"],
                "icon": msg["icon"],
                "show_in_navbar": msg["showInNavbar"],
            }
        )
        await _save_more_page_config(hass, msg["more_page"], config)
        processor = get_yaml_processor(hass)
        page = processor.more_pages.get(msg["more_page"])
        if page is not None:
            page.update(
                {
                    "name": msg["name"],
                    "icon": msg["icon"],
                    "show_in_navbar": msg["showInNavbar"],
                }
            )
    hass.bus.async_fire("dwains_dashboard_homepage_card_reload")
    hass.bus.async_fire("dwains_dashboard_navigation_card_reload")
    hass.bus.async_fire("dwains_dashboard_more_pages_reload")
    connection.send_result(
        msg["id"],
        {
            "succesfull": "More page button saved",
            "foldername": msg.get("more_page"),
            "page": {
                "foldername": msg.get("more_page"),
                "name": msg.get("name"),
                "icon": msg.get("icon"),
                "show_in_navbar": msg.get("showInNavbar"),
            },
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/edit_more_page",
        vol.Optional("card_data"): str,
        vol.Optional("foldername"): str,
        vol.Optional("name"): str,
        vol.Optional("icon"): str,
        vol.Optional("showInNavbar"): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_edit_more_page(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Create or update a more page."""
    name = (msg.get("name") or "").strip()
    if not name:
        connection.send_error(msg["id"], "invalid_name", "More page name is required")
        return
    try:
        card_data = json.loads(msg.get("card_data") or "")
    except (TypeError, json.JSONDecodeError) as error:
        connection.send_error(msg["id"], "invalid_card", str(error))
        return
    if not isinstance(card_data, (dict, list)):
        connection.send_error(
            msg["id"], "invalid_card", "More page content must be a card or card list"
        )
        return

    existing_foldername = msg.get("foldername") or ""
    foldername = existing_foldername or slugify(name)
    if not foldername:
        connection.send_error(msg["id"], "invalid_name", "More page name has no URL-safe characters")
        return
    try:
        validate_more_page_foldername(foldername)
    except ValueError as error:
        connection.send_error(msg["id"], "invalid_foldername", str(error))
        return
    page_path = _more_page_path(hass, foldername, "page.yaml")
    if not existing_foldername and await hass.async_add_executor_job(
        file_has_content, page_path
    ):
        foldername += datetime.now().strftime("%Y%m%d%H%M%S%f")
        page_path = _more_page_path(hass, foldername, "page.yaml")

    await hass.async_add_executor_job(
        dump_json_normalized_yaml_file,
        page_path,
        card_data,
    )
    config = OrderedDict(
        (
            ("name", name),
            ("icon", msg["icon"]),
            ("show_in_navbar", msg["showInNavbar"]),
        )
    )
    await _save_more_page_config(hass, foldername, config)
    await reload_configuration(hass)
    hass.bus.async_fire("dwains_dashboard_navigation_card_reload")
    hass.bus.async_fire("dwains_dashboard_more_pages_reload")
    connection.send_result(
        msg["id"],
        {
            "succesfull": "More page saved succesfully",
            "foldername": foldername,
            "view_path": f"more_page_{foldername}",
            "page": await hass.async_add_executor_job(
                load_more_page_content,
                hass.config.path("dwains-dashboard/configs"),
                foldername,
            ),
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/remove_more_page",
        vol.Required("foldername"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_remove_more_page(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Remove a more page and refresh the generated navigation."""
    try:
        foldername = validate_more_page_foldername(msg["foldername"])
    except ValueError as error:
        connection.send_error(msg["id"], "invalid_foldername", str(error))
        return
    await hass.async_add_executor_job(
        shutil.rmtree,
        hass.config.path(f"{MORE_PAGES_PATH}/{foldername}"),
        True,
    )
    await reload_configuration(hass)
    hass.bus.async_fire("dwains_dashboard_navigation_card_reload")
    hass.bus.async_fire("dwains_dashboard_more_pages_reload")
    connection.send_result(
        msg["id"], {"succesfull": "More page removed succesfully"}
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/add_more_page_to_navbar",
        vol.Required("more_page"): str,
        vol.Optional("show_in_navbar", default=True): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_add_more_page_to_navbar(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Set whether an existing more page is shown in dashboard navigation."""
    try:
        foldername = validate_more_page_foldername(msg["more_page"])
    except ValueError as error:
        connection.send_error(msg["id"], "invalid_foldername", str(error))
        return
    config = await _load_more_page_config(hass, foldername)
    show_in_navbar = msg["show_in_navbar"]
    config["show_in_navbar"] = show_in_navbar
    await _save_more_page_config(hass, foldername, config)
    processor = get_yaml_processor(hass)
    page = processor.more_pages.get(foldername)
    if page is not None:
        page["show_in_navbar"] = show_in_navbar
    hass.bus.async_fire("dwains_dashboard_navigation_card_reload")
    hass.bus.async_fire("dwains_dashboard_more_pages_reload")
    connection.send_result(
        msg["id"],
        {
            "succesfull": (
                "More page added to navigation"
                if show_in_navbar
                else "More page removed from navigation"
            ),
            "foldername": foldername,
            "page": {
                "foldername": foldername,
                "name": config.get("name") or foldername,
                "icon": config.get("icon") or "mdi:puzzle",
                "show_in_navbar": show_in_navbar,
                "sort_order": config.get("sort_order", 99),
            },
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/sort_more_page",
        vol.Required("sortData"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
@serialize_configuration_mutation
async def ws_handle_sort_more_page(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> None:
    """Save the requested more-page order."""
    try:
        sort_data = json.loads(msg["sortData"])
    except (TypeError, json.JSONDecodeError) as error:
        connection.send_error(msg["id"], "invalid_sort_order", str(error))
        return
    if (
        not isinstance(sort_data, list)
        or not sort_data
        or any(not isinstance(foldername, str) for foldername in sort_data)
        or len(set(sort_data)) != len(sort_data)
    ):
        connection.send_error(
            msg["id"],
            "invalid_sort_order",
            "More-page order must be a non-empty list of unique folder names",
        )
        return
    try:
        sort_data = [
            validate_more_page_foldername(foldername) for foldername in sort_data
        ]
    except ValueError as error:
        connection.send_error(msg["id"], "invalid_foldername", str(error))
        return

    configs = []
    for foldername in sort_data:
        config = await _load_more_page_config(hass, foldername)
        configs.append((foldername, config))
    for position, (foldername, config) in enumerate(configs, start=1):
        config["sort_order"] = position
        await _save_more_page_config(hass, foldername, config)
    processor = get_yaml_processor(hass)
    for position, foldername in enumerate(sort_data, start=1):
        page = processor.more_pages.get(foldername)
        if page is not None:
            page["sort_order"] = position
    hass.bus.async_fire("dwains_dashboard_navigation_card_reload")
    hass.bus.async_fire("dwains_dashboard_more_pages_reload")
    connection.send_result(
        msg["id"],
        {
            "succesfull": "More pages sorted succesfully",
            "order": sort_data,
        },
    )
