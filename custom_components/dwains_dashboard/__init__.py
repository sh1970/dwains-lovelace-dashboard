import logging

from .load_plugins import (
    load_plugins,
    register_frontend_plugins,
    remove_frontend_plugins,
)
from .load_dashboard import load_dashboard, unload_dashboard
from .const import BACKEND_BUILD_REVISION, DOMAIN
from .process_yaml import (
    process_yaml,
    register_reload_service,
    remove_yaml_runtime,
)
from .notifications import (
    notifications,
    register_notifications_websocket,
    remove_notifications,
)
from .websocket_commands import register_dashboard_websocket_commands
from .configuration_runtime import (
    get_configuration_runtime,
    register_configuration_cache_listeners,
)
from .runtime_data import get_domain_data
from .legacy_entities import async_remove_legacy_latest_version_sensor

from homeassistant.core import HomeAssistant
from homeassistant.config import ConfigType
from homeassistant.const import EVENT_HOMEASSISTANT_STARTED
from homeassistant.helpers import issue_registry as ir

_LOGGER = logging.getLogger(__name__)

async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    #_LOGGER.warning("async_setup")

    #_LOGGER.warning(config)
    #_LOGGER.warning(hass.data[DOMAIN])

    # if not config.get(DOMAIN):
    #     _LOGGER.warning("no config")

    _LOGGER.info(
        "Dwains Dashboard backend build %s loaded from %s",
        BACKEND_BUILD_REVISION,
        __file__,
    )

    domain_data = get_domain_data(hass)
    domain_data.setdefault("notifications", {})
    domain_data.setdefault("commands", {})
    await async_remove_legacy_latest_version_sensor(hass)
    if not hass.is_running:
        async def remove_legacy_sensor_after_start(_event) -> None:
            await async_remove_legacy_latest_version_sensor(hass)

        hass.bus.async_listen_once(
            EVENT_HOMEASSISTANT_STARTED,
            remove_legacy_sensor_after_start,
        )
    configuration_runtime = get_configuration_runtime(hass)
    configuration_runtime.clear_cache()

    register_dashboard_websocket_commands(hass)
    register_configuration_cache_listeners(hass)

    await load_plugins(hass, DOMAIN)

    register_notifications_websocket(hass)

    return True

async def async_setup_entry(hass, config_entry):
    # Clear any leftover "restart required" banner from a previous disable: we're
    # being (re-)enabled, so it no longer applies.
    ir.async_delete_issue(hass, DOMAIN, "restart_required")
    await async_remove_legacy_latest_version_sensor(hass)

    try:
        await process_yaml(hass, config_entry)
        register_reload_service(hass)
        register_frontend_plugins(hass)
        load_dashboard(hass, config_entry)
        notifications(hass, DOMAIN)
        await hass.config_entries.async_forward_entry_setups(config_entry, ["update"])
    except Exception:
        await _rollback_entry_setup(hass, config_entry)
        raise

    config_entry.async_on_unload(lambda: remove_yaml_runtime(hass))
    config_entry.async_on_unload(lambda: remove_frontend_plugins(hass))
    config_entry.async_on_unload(lambda: unload_dashboard(hass))
    config_entry.async_on_unload(lambda: remove_notifications(hass))
    config_entry.async_on_unload(config_entry.add_update_listener(_update_listener))

    return True


async def _rollback_entry_setup(hass, config_entry) -> None:
    """Best-effort rollback that preserves the original setup exception."""
    try:
        await hass.config_entries.async_unload_platforms(config_entry, ["update"])
    except Exception:
        _LOGGER.exception("Failed to roll back the Dwains Dashboard update platform")

    for cleanup in (
        remove_notifications,
        unload_dashboard,
        remove_frontend_plugins,
        remove_yaml_runtime,
    ):
        try:
            cleanup(hass)
        except Exception:
            _LOGGER.exception(
                "Failed to roll back Dwains Dashboard via %s", cleanup.__name__
            )

async def async_unload_entry(hass, config_entry):
    """Unload the entry.

    We can cleanly unload the per-entry update entity and sidebar panel. The
    per-entry frontend URLs are removable, while the static path and
    websocket commands registered in async_setup remain integration-scoped.
    Therefore a real disable still raises the Settings "Restart required"
    repair banner to fully clear that remaining footprint.

    The banner is only raised on a real disable, not on a normal HA shutdown
    (where config_entry.disabled_by is None and async_setup_entry will run again
    on next start anyway).
    """
    unload_ok = await hass.config_entries.async_unload_platforms(
        config_entry,
        ["update"],
    )

    if config_entry.disabled_by is not None:
        ir.async_create_issue(
            hass,
            DOMAIN,
            "restart_required",
            is_fixable=True,
            severity=ir.IssueSeverity.WARNING,
            translation_key="restart_required",
        )

    return unload_ok

async def async_remove_entry(hass, config_entry):
    _LOGGER.info("Dwains Dashboard is now uninstalled")

    ir.async_delete_issue(hass, DOMAIN, "restart_required")

    unload_dashboard(hass)
    remove_frontend_plugins(hass)
    remove_yaml_runtime(hass)
    remove_notifications(hass)

async def _update_listener(hass, config_entry):
    _LOGGER.info("Dwains Dashboard options changed; reloading configuration")

    await process_yaml(hass, config_entry)

    hass.bus.async_fire("dwains_dashboard_reload")

    return True
