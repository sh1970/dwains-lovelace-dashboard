"""Home Assistant instance-owned dashboard configuration runtime."""

from __future__ import annotations

import asyncio
import time
from functools import wraps
from typing import Any, Awaitable, Callable

from .runtime_data import get_domain_data


CONFIGURATION_CACHE_TTL = 30.0
CONFIGURATION_RUNTIME_KEY = "configuration_runtime"
CACHE_LISTENERS_REGISTERED_KEY = "configuration_cache_listeners_registered"
CACHE_INVALIDATION_EVENTS = (
    "dwains_dashboard_reload",
    "dwains_dashboard_config_reload",
    "dwains_dashboard_homepage_card_reload",
    "dwains_dashboard_devicespage_card_reload",
    "dwains_dashboard_navigation_card_reload",
)


class DashboardConfigurationRuntime:
    """Own configuration caching and mutation serialization for one HA instance."""

    def __init__(self) -> None:
        self._cached_configuration: Any = None
        self._cache_timestamp = 0.0
        self._cache_revision = 0
        self.mutation_lock = asyncio.Lock()

    def clear_cache(self, *_args: Any) -> None:
        """Invalidate the short-lived configuration snapshot."""
        self._cached_configuration = None
        self._cache_timestamp = 0.0
        self._cache_revision += 1

    def get_cached_configuration(self) -> Any:
        """Return a fresh cached snapshot, if one exists."""
        if self._cached_configuration is None:
            return None
        if time.monotonic() - self._cache_timestamp > CONFIGURATION_CACHE_TTL:
            return None
        return self._cached_configuration

    def set_cached_configuration(self, configuration: Any) -> None:
        """Store a snapshot using a monotonic expiration timestamp."""
        self._cached_configuration = configuration
        self._cache_timestamp = time.monotonic()

    async def async_get_cached_or_load(
        self,
        loader: Callable[[], Awaitable[Any]],
    ) -> Any:
        """Coalesce concurrent misses and never cache across an invalidation."""
        cached_configuration = self.get_cached_configuration()
        if cached_configuration is not None:
            return cached_configuration

        async with self.mutation_lock:
            cached_configuration = self.get_cached_configuration()
            if cached_configuration is not None:
                return cached_configuration

            cache_revision = self._cache_revision
            configuration = await loader()
            if cache_revision == self._cache_revision:
                self.set_cached_configuration(configuration)
            return configuration


def get_configuration_runtime(hass) -> DashboardConfigurationRuntime:
    """Return the runtime owned by one Home Assistant instance."""
    domain_data = get_domain_data(hass)
    runtime = domain_data.get(CONFIGURATION_RUNTIME_KEY)
    if runtime is None:
        runtime = domain_data[CONFIGURATION_RUNTIME_KEY] = (
            DashboardConfigurationRuntime()
        )
    return runtime


def register_configuration_cache_listeners(hass) -> None:
    """Register integration-scoped cache invalidation listeners once."""
    domain_data = get_domain_data(hass)
    if domain_data.get(CACHE_LISTENERS_REGISTERED_KEY):
        return
    runtime = get_configuration_runtime(hass)
    for event_type in CACHE_INVALIDATION_EVENTS:
        hass.bus.async_listen(event_type, runtime.clear_cache)
    domain_data[CACHE_LISTENERS_REGISTERED_KEY] = True


def serialize_configuration_mutation(handler):
    """Serialize a WebSocket mutation within one Home Assistant instance."""
    @wraps(handler)
    async def serialized(hass, connection, msg):
        runtime = get_configuration_runtime(hass)
        async with runtime.mutation_lock:
            # A mutation may fire a frontend reload event before its WebSocket
            # handler returns. Remove the old snapshot up front so a read
            # triggered by that event waits on this lock instead of returning
            # stale data which can subsequently overwrite the new file.
            runtime.clear_cache()
            try:
                return await handler(hass, connection, msg)
            finally:
                runtime.clear_cache()

    return serialized
