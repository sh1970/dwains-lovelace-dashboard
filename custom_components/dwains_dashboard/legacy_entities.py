"""Cleanup for entities retired by Dwains Dashboard."""

from __future__ import annotations

import logging

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_platform, entity_registry as er

from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

LATEST_VERSION_ENTITY_ID = "sensor.dwains_dashboard_latest_version"
LATEST_VERSION_UNIQUE_ID = "dwains-dashboard-latest-version"


async def async_remove_legacy_latest_version_sensor(
    hass: HomeAssistant,
) -> None:
    """Remove the obsolete active entity and its saved registry metadata."""
    active_entity_removed = False

    # Resolve the entity from HA's domain-wide runtime index first. The entity
    # can survive under a platform name other than the integration domain after
    # migrations/reloads, so looking only at async_get_platforms(DOMAIN) is not
    # sufficient.
    domain_entities = hass.data.get(entity_platform.DATA_DOMAIN_ENTITIES, {})
    active_entity = domain_entities.get("sensor", {}).get(
        LATEST_VERSION_ENTITY_ID
    )
    if active_entity is not None:
        entity_module = type(active_entity).__module__
        await active_entity.async_remove()
        active_entity_removed = True
        _LOGGER.info(
            "Removed active legacy version entity implemented by %s",
            entity_module,
        )

    # Retain a platform-level fallback for HA versions/runtime states where the
    # domain index is unavailable while the platform still owns the entity.
    if not active_entity_removed:
        platform_groups = hass.data.get(
            entity_platform.DATA_ENTITY_PLATFORM,
            {},
        )
        for platforms in list(platform_groups.values()):
            for platform in list(platforms):
                if LATEST_VERSION_ENTITY_ID not in platform.entities:
                    continue
                await platform.async_remove_entity(LATEST_VERSION_ENTITY_ID)
                active_entity_removed = True
                break
            if active_entity_removed:
                break

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

    if active_entity_removed or entity_ids:
        _LOGGER.info(
            "Removed obsolete Dwains Dashboard version sensor "
            "%s (active=%s, registry_entries=%d)",
            LATEST_VERSION_ENTITY_ID,
            active_entity_removed,
            len(entity_ids),
        )
