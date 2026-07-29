"""Dwains Dashboard update information."""

from __future__ import annotations

import asyncio
from datetime import timedelta
import logging
from typing import Any

import aiohttp
from homeassistant.components.update import UpdateEntity
from homeassistant.helpers.aiohttp_client import async_get_clientsession

from .const import VERSION

_LOGGER = logging.getLogger(__name__)

SCAN_INTERVAL = timedelta(hours=12)
VERSION_RESOURCE = (
    f"https://dwains-dashboard.dwainscheeren.nl/version?v={VERSION}"
)


async def async_setup_entry(hass, config_entry, async_add_entities) -> None:
    """Set up the dashboard update entity."""
    async_add_entities([DwainsDashboardUpdateEntity()], update_before_add=True)


class DwainsDashboardUpdateEntity(UpdateEntity):
    """Represent available Dwains Dashboard versions without sensor coercion."""

    _attr_has_entity_name = True
    _attr_name = "Update"
    _attr_unique_id = "dwains-dashboard-update"
    _attr_installed_version = VERSION
    _attr_latest_version = VERSION
    _attr_release_url = (
        "https://github.com/dwainscheeren/"
        "dwains-lovelace-dashboard/releases"
    )

    async def async_update(self) -> None:
        """Fetch the latest published dashboard version."""
        session = async_get_clientsession(self.hass)
        try:
            async with asyncio.timeout(10):
                response = await session.get(VERSION_RESOURCE)
                async with response:
                    response.raise_for_status()
                    payload: Any = await response.json(content_type=None)
        except (asyncio.TimeoutError, aiohttp.ClientError, ValueError) as error:
            # Keep the last valid version and let the regular HA polling cycle
            # retry. A failed optional update check must not break the dashboard.
            _LOGGER.warning(
                "Unable to check the latest Dwains Dashboard version: %s",
                error,
            )
            return

        latest_version = (
            payload.get("latest_version") if isinstance(payload, dict) else None
        )
        if isinstance(latest_version, str) and latest_version.strip():
            self._attr_latest_version = latest_version.strip()
        else:
            _LOGGER.warning(
                "Dwains Dashboard version endpoint returned no valid version"
            )
