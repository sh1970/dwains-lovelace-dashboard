"""Retired sensor platform.

This module intentionally registers no entities. It remains in the package so
an upgrade also overwrites sensor.py from older Dwains Dashboard installations.
"""


async def async_setup_platform(
    hass,
    config,
    async_add_entities,
    discovery_info=None,
):
    """Keep legacy YAML platform loading harmless."""


async def async_setup_entry(hass, config_entry, async_add_entities):
    """Keep legacy config-entry forwarding harmless."""
