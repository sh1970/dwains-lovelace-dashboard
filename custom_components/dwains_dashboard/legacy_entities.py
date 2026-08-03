"""Cleanup for entities retired by Dwains Dashboard."""

from __future__ import annotations

import logging

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

LATEST_VERSION_ENTITY_ID = "sensor.dwains_dashboard_latest_version"
LATEST_VERSION_UNIQUE_ID = "dwains-dashboard-latest-version"


async def async_remove_legacy_latest_version_sensor(
    hass: HomeAssistant,
) -> None:
    """Remove the obsolete sensor registry metadata and residual state."""

    registry = er.async_get(hass)
    entity_ids = {
        entry.entity_id
        for entry in list(registry.entities.values())
        if entry.domain == "sensor"
        and entry.unique_id == LATEST_VERSION_UNIQUE_ID
        and entry.platform == DOMAIN
    }

    configured_entry = registry.async_get(LATEST_VERSION_ENTITY_ID)
    if configured_entry is not None and (
        configured_entry.platform == DOMAIN
        or configured_entry.unique_id == LATEST_VERSION_UNIQUE_ID
    ):
        entity_ids.add(configured_entry.entity_id)

    for entity_id in entity_ids:
        registry.async_remove(entity_id)
        hass.states.async_remove(entity_id)

    # Also clear a state left behind by an older loaded platform. It is safe to
    # do this independently of the registry because this entity id belongs to
    # the retired Dwains Dashboard sensor.
    hass.states.async_remove(LATEST_VERSION_ENTITY_ID)

    if entity_ids:
        _LOGGER.info(
            "Removed obsolete Dwains Dashboard version sensor "
            "%s (registry_entries=%d)",
            LATEST_VERSION_ENTITY_ID,
            len(entity_ids),
        )
