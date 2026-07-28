"""Typed access to data owned by one Home Assistant instance."""

from __future__ import annotations

from collections.abc import MutableMapping
from typing import TYPE_CHECKING, Any, TypedDict, cast

if TYPE_CHECKING:
    from homeassistant.core import HomeAssistant

from .const import DOMAIN


class DashboardDomainData(TypedDict, total=False):
    """Runtime values stored below ``hass.data[DOMAIN]``."""

    notifications: MutableMapping[str, MutableMapping[str, Any]]
    commands: MutableMapping[str, Any]
    latest_version: str
    configuration_runtime: Any
    configuration_cache_listeners_registered: bool
    dashboard_registration: Any
    dashboard_websocket_commands_registered: bool
    frontend_plugins_registered: bool
    frontend_static_path_registered: bool
    notification_services_registered: bool
    notification_websocket_registered: bool
    reload_service_registered: bool
    translation_cache: MutableMapping[tuple[str, ...], Any]
    yaml_processor: Any


def get_domain_data(hass: HomeAssistant) -> DashboardDomainData:
    """Return integration data, creating the per-instance container if needed."""
    return cast(DashboardDomainData, hass.data.setdefault(DOMAIN, {}))


def find_domain_data(hass: HomeAssistant) -> DashboardDomainData | None:
    """Return existing integration data without extending instance state."""
    return cast(DashboardDomainData | None, hass.data.get(DOMAIN))
