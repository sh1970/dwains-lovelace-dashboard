import logging

from homeassistant.components import frontend
from homeassistant.components.lovelace.const import (
    DOMAIN as LOVELACE_DOMAIN,
    LOVELACE_DATA,
)

from .lovelace_yaml import DwainsDashboardLovelaceYAML
from .runtime_data import find_domain_data, get_domain_data
from .process_yaml import get_yaml_processor

_LOGGER = logging.getLogger(__name__)
DASHBOARD_URL = "dwains-dashboard"
DASHBOARD_REGISTRATION_KEY = "dashboard_registration"

def load_dashboard(hass, config_entry):

    #_LOGGER.warning(config_entry.options)
    #_LOGGER.warning(config_entry.options["sidepanel_title"])

    sidepanel_title = "Dwains Dashboard"
    sidepanel_icon = "mdi:alpha-d-box"

    if("sidepanel_title" in config_entry.options):
        sidepanel_title = config_entry.options["sidepanel_title"]

    if("sidepanel_icon" in config_entry.options):
        sidepanel_icon = config_entry.options["sidepanel_icon"]

    dashboard_config = {
        "mode": "yaml",
        "icon": sidepanel_icon,
        "title": sidepanel_title,
        "filename": "custom_components/dwains_dashboard/lovelace/ui-lovelace.yaml",
        "show_in_sidebar": True,
        "require_admin": False,
    }

    lovelace_data = hass.data.get(LOVELACE_DATA)
    if lovelace_data is None or not hasattr(lovelace_data, "dashboards"):
        raise RuntimeError("Lovelace dashboard storage is unavailable")

    domain_data = get_domain_data(hass)
    owned_dashboard = domain_data.get(DASHBOARD_REGISTRATION_KEY)
    existing_dashboard = lovelace_data.dashboards.get(DASHBOARD_URL)
    if (
        owned_dashboard is not None
        and existing_dashboard is owned_dashboard
        and frontend.async_panel_exists(hass, DASHBOARD_URL)
    ):
        return
    if existing_dashboard is not None or frontend.async_panel_exists(
        hass, DASHBOARD_URL
    ):
        raise RuntimeError(
            f"Lovelace dashboard or panel '{DASHBOARD_URL}' is already registered"
        )

    dashboard = DwainsDashboardLovelaceYAML(
        hass,
        DASHBOARD_URL,
        dashboard_config,
        get_yaml_processor(hass),
    )
    lovelace_data.dashboards[DASHBOARD_URL] = dashboard
    try:
        frontend.async_register_built_in_panel(
            hass,
            LOVELACE_DOMAIN,
            frontend_url_path=DASHBOARD_URL,
            require_admin=dashboard_config["require_admin"],
            show_in_sidebar=dashboard_config["show_in_sidebar"],
            sidebar_title=dashboard_config["title"],
            sidebar_icon=dashboard_config["icon"],
            config={"mode": "yaml"},
            update=False,
        )
    except Exception:
        if lovelace_data.dashboards.get(DASHBOARD_URL) is dashboard:
            lovelace_data.dashboards.pop(DASHBOARD_URL, None)
        raise

    domain_data[DASHBOARD_REGISTRATION_KEY] = dashboard


def unload_dashboard(hass) -> None:
    """Remove the owned panel and Lovelace dashboard idempotently."""
    domain_data = find_domain_data(hass) or {}
    dashboard = domain_data.pop(DASHBOARD_REGISTRATION_KEY, None)
    if dashboard is None:
        return

    if frontend.async_panel_exists(hass, DASHBOARD_URL):
        frontend.async_remove_panel(hass, DASHBOARD_URL)

    lovelace_data = hass.data.get(LOVELACE_DATA)
    if (
        lovelace_data is not None
        and lovelace_data.dashboards.get(DASHBOARD_URL) is dashboard
    ):
        lovelace_data.dashboards.pop(DASHBOARD_URL, None)
