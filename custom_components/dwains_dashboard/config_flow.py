import logging
import os

import voluptuous as vol
import yaml

from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers import selector

_LOGGER = logging.getLogger(__name__)

# Sidebar (stored in the config entry options)
SIDEPANEL_TITLE = "sidepanel_title"
SIDEPANEL_ICON = "sidepanel_icon"

# Dashboard settings -- these are the SAME values the in-dashboard settings popup
# (dwains-edit-homepage-header-card) edits, stored in
# dwains-dashboard/configs/settings.yaml. We surface them here in the native HA
# Options flow so they can be changed reliably even when the in-dashboard popup
# can't render (HA scoped-custom-element-registry vs. the old bundle). This flow
# is plain Python + HA's form renderer, so it never hits that problem.
SETTINGS_BOOLS = (
    "disable_clock",
    "am_pm_clock",
    "disable_welcome_message",
    "v2_mode",
    "disable_sensor_graph",
    "invert_cover",
    "hide_unavailable_entities",
    "home_redirect_enabled",
)
SETTINGS_FILE = "dwains-dashboard/configs/settings.yaml"


def _read_settings(path):
    if os.path.exists(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                return yaml.safe_load(f) or {}
        except Exception:  # corrupt/empty file -> treat as no settings
            return {}
    return {}


def _write_settings(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        yaml.dump(data, f, default_flow_style=False, sort_keys=False)


@config_entries.HANDLERS.register("dwains_dashboard")
class DwainsDashboardConfigFlow(config_entries.ConfigFlow):
    async def async_step_user(self, user_input=None):
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")
        return self.async_create_entry(title="", data={})

    @staticmethod
    @callback
    def async_get_options_flow(config_entry):
        return DwainsDashboardEditFlow()


class DwainsDashboardEditFlow(config_entries.OptionsFlow):
    # NOTE: Do NOT set self.config_entry here. In modern Home Assistant
    # OptionsFlow.config_entry is a read-only property that HA populates
    # automatically; assigning it raises AttributeError.
    async def async_step_init(self, user_input=None):
        path = self.hass.config.path(SETTINGS_FILE)

        if user_input is not None:
            # Persist the dashboard settings to the same settings.yaml the popup
            # used, then fire the reload event so the open dashboard refreshes.
            header = {key: bool(user_input.get(key, False)) for key in SETTINGS_BOOLS}
            header["weather_entity"] = user_input.get("weather_entity", "") or ""
            header["alarm_entity"] = user_input.get("alarm_entity", "") or ""
            target = (user_input.get("home_redirect_target", "/dwains-dashboard/home") or "/dwains-dashboard/home").strip()
            if not target.startswith("/"):
                target = f"/{target}"
            header["home_redirect_target"] = target
            await self.hass.async_add_executor_job(_write_settings, path, header)
            self.hass.bus.async_fire("dwains_dashboard_homepage_card_reload")

            # Sidebar title/icon live in the entry options.
            return self.async_create_entry(
                title="",
                data={
                    SIDEPANEL_TITLE: user_input.get(SIDEPANEL_TITLE, "Dwains Dashboard"),
                    SIDEPANEL_ICON: user_input.get(SIDEPANEL_ICON, "mdi:alpha-d-box"),
                },
            )

        cur = await self.hass.async_add_executor_job(_read_settings, path)
        opts = self.config_entry.options

        def entity_default(key):
            val = cur.get(key)
            return val if val else vol.UNDEFINED

        schema = {
            vol.Optional(SIDEPANEL_TITLE, default=opts.get("sidepanel_title", "Dwains Dashboard")): str,
            vol.Optional(SIDEPANEL_ICON, default=opts.get("sidepanel_icon", "mdi:alpha-d-box")): str,
            vol.Optional("disable_clock", default=bool(cur.get("disable_clock", False))): selector.BooleanSelector(),
            vol.Optional("am_pm_clock", default=bool(cur.get("am_pm_clock", False))): selector.BooleanSelector(),
            vol.Optional("disable_welcome_message", default=bool(cur.get("disable_welcome_message", False))): selector.BooleanSelector(),
            vol.Optional("v2_mode", default=bool(cur.get("v2_mode", False))): selector.BooleanSelector(),
            vol.Optional("disable_sensor_graph", default=bool(cur.get("disable_sensor_graph", False))): selector.BooleanSelector(),
            vol.Optional("invert_cover", default=bool(cur.get("invert_cover", False))): selector.BooleanSelector(),
            vol.Optional("hide_unavailable_entities", default=bool(cur.get("hide_unavailable_entities", False))): selector.BooleanSelector(),
            vol.Optional("home_redirect_enabled", default=bool(cur.get("home_redirect_enabled", False))): selector.BooleanSelector(),
            vol.Optional("home_redirect_target", default=(cur.get("home_redirect_target", "/dwains-dashboard/home") or "/dwains-dashboard/home")): str,
            vol.Optional("weather_entity", default=entity_default("weather_entity")): selector.EntitySelector(
                selector.EntitySelectorConfig(domain="weather")
            ),
            vol.Optional("alarm_entity", default=entity_default("alarm_entity")): selector.EntitySelector(
                selector.EntitySelectorConfig(domain="alarm_control_panel")
            ),
        }

        return self.async_show_form(step_id="init", data_schema=vol.Schema(schema))
