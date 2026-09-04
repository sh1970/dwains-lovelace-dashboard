"""Permission-safe WebSocket subscriptions for dashboard-owned events."""

from typing import Any, Mapping

import voluptuous as vol

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback


DASHBOARD_EVENT_TYPES = frozenset(
    {
        "dwains_dashboard_config_reload",
        "dwains_dashboard_devicespage_card_reload",
        "dwains_dashboard_homepage_card_reload",
        "dwains_dashboard_more_pages_reload",
        "dwains_dashboard_navigation_card_reload",
        "dwains_dashboard_notifications_updated",
        "dwains_dashboard_reload",
    }
)


@callback
@websocket_api.websocket_command(
    {
        vol.Required("type"): "dwains_dashboard/event/subscribe",
        vol.Required("event_type"): vol.In(DASHBOARD_EVENT_TYPES),
    }
)
def websocket_subscribe_dashboard_event(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: Mapping[str, Any],
) -> None:
    """Subscribe an authenticated user to one explicitly safe dashboard event."""

    @callback
    def forward_event(event) -> None:
        connection.send_event(msg["id"], event.data)

    connection.subscriptions[msg["id"]] = hass.bus.async_listen(
        msg["event_type"], forward_event
    )
    connection.send_result(msg["id"])
