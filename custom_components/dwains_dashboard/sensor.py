from datetime import timedelta
from homeassistant.components.sensor import SensorEntity
from homeassistant.util import Throttle

from .const import VERSION
from .runtime_data import get_domain_data

import logging

import asyncio
import aiohttp
import json
from homeassistant.helpers.aiohttp_client import async_get_clientsession

_LOGGER = logging.getLogger(__name__)
_RESOURCE = "https://dwains-dashboard.dwainscheeren.nl/version?v="+VERSION

MIN_TIME_BETWEEN_UPDATES = timedelta(minutes=800)

async def async_setup_platform(hass, config, async_add_entities, discovery_info=None):
    """Setup sensor platform."""
    #_LOGGER.error("async_setup_platform called")
    async_add_entities([LatestVersionSensor(LatestVersion(hass))])


async def async_setup_entry(hass, config_entry, async_add_devices):
    """Setup sensor platform."""
    #_LOGGER.error("async_setup_entry called")

    data = LatestVersion(hass)
    async_add_devices([LatestVersionSensor(data)])


class LatestVersionSensor(SensorEntity):
    """Latest version sensor."""

    _attr_icon = "mdi:alpha-d-box"
    _attr_name = "Dwains Dashboard Latest version"
    _attr_unique_id = "dwains-dashboard-latest-version"

    def __init__(self, data):
        """Initialize the sensor."""
        self.data = data

    async def async_update(self):
        await self.data.update()
        self._attr_native_value = (
            get_domain_data(self.hass).get("latest_version") or None
        )

class LatestVersion:

    def __init__(self, hass):
        self._hass = hass

    @Throttle(MIN_TIME_BETWEEN_UPDATES)
    async def update(self):

        session = async_get_clientsession(self._hass)

        try:
            async with asyncio.timeout(10):
                async with session.get(_RESOURCE) as response:
                    response.raise_for_status()
                    data = json.loads(await response.read())
            if not isinstance(data, dict):
                raise TypeError("version response is not an object")
            if "latest_version" in data:
                get_domain_data(self._hass)["latest_version"] = data["latest_version"]
        except (ValueError, TypeError) as err:
            _LOGGER.error("Dwains Dashboard version check failed: %s", err)
        except (asyncio.TimeoutError, aiohttp.ClientError) as err:
            _LOGGER.error("Dwains Dashboard version check failed: %r", err)
