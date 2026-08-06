"""Central registration for dashboard WebSocket commands."""

from homeassistant.components import websocket_api

from .area_commands import (
    ws_handle_edit_area_bool_value,
    ws_handle_edit_area_button,
    ws_handle_edit_homepage_header,
    ws_handle_sort_area_button,
)
from .blueprint_commands import (
    websocket_get_blueprints,
    ws_handle_delete_blueprint,
    ws_handle_install_blueprint,
)
from .card_commands import ws_handle_add_card, ws_handle_remove_card
from .configuration_commands import (
    websocket_get_configuration,
    websocket_get_navigation,
)
from .device_commands import (
    ws_handle_edit_device_bool_value,
    ws_handle_edit_device_button,
    ws_handle_edit_device_card,
    ws_handle_edit_device_popup,
    ws_handle_remove_device_card,
    ws_handle_remove_device_popup,
    ws_handle_sort_device_button,
)
from .entity_commands import (
    ws_handle_edit_entities_bool_value,
    ws_handle_edit_entity,
    ws_handle_edit_entity_bool_value,
    ws_handle_edit_entity_card,
    ws_handle_edit_entity_favorite,
    ws_handle_edit_entity_popup,
    ws_handle_remove_entity_card,
    ws_handle_remove_entity_popup,
    ws_handle_sort_entity,
)
from .more_page_commands import (
    websocket_get_more_page,
    websocket_get_more_pages,
    ws_handle_add_more_page_to_navbar,
    ws_handle_edit_more_page,
    ws_handle_edit_more_page_button,
    ws_handle_remove_more_page,
    ws_handle_sort_more_page,
)
from .runtime_data import get_domain_data


WEBSOCKET_COMMANDS_REGISTERED_KEY = "dashboard_websocket_commands_registered"


DASHBOARD_WEBSOCKET_COMMANDS = (
    websocket_get_configuration,
    websocket_get_navigation,
    websocket_get_more_pages,
    websocket_get_more_page,
    websocket_get_blueprints,
    ws_handle_install_blueprint,
    ws_handle_delete_blueprint,
    ws_handle_add_card,
    ws_handle_remove_card,
    ws_handle_edit_entity,
    ws_handle_edit_entity_card,
    ws_handle_edit_entity_popup,
    ws_handle_edit_entity_favorite,
    ws_handle_edit_entity_bool_value,
    ws_handle_edit_entities_bool_value,
    ws_handle_edit_device_button,
    ws_handle_edit_device_card,
    ws_handle_edit_device_popup,
    ws_handle_edit_device_bool_value,
    ws_handle_remove_device_card,
    ws_handle_remove_device_popup,
    ws_handle_remove_entity_card,
    ws_handle_remove_entity_popup,
    ws_handle_edit_area_button,
    ws_handle_edit_area_bool_value,
    ws_handle_edit_homepage_header,
    ws_handle_edit_more_page_button,
    ws_handle_edit_more_page,
    ws_handle_remove_more_page,
    ws_handle_add_more_page_to_navbar,
    ws_handle_sort_area_button,
    ws_handle_sort_device_button,
    ws_handle_sort_entity,
    ws_handle_sort_more_page,
)


def register_dashboard_websocket_commands(hass):
    """Register all integration-scoped dashboard commands."""
    domain_data = get_domain_data(hass)
    if domain_data.get(WEBSOCKET_COMMANDS_REGISTERED_KEY):
        return
    for command in DASHBOARD_WEBSOCKET_COMMANDS:
        websocket_api.async_register_command(hass, command)
    domain_data[WEBSOCKET_COMMANDS_REGISTERED_KEY] = True
