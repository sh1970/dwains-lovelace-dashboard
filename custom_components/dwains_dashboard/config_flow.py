import logging
import json
import os

import voluptuous as vol
import yaml

from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers import selector
try:
    from homeassistant.components.sensor import SensorDeviceClass
except ImportError:  # pragma: no cover - Home Assistant provides this at runtime
    SensorDeviceClass = None
try:
    from homeassistant.components.binary_sensor import BinarySensorDeviceClass
except ImportError:  # pragma: no cover - Home Assistant provides this at runtime
    BinarySensorDeviceClass = None

_LOGGER = logging.getLogger(__name__)

# Sidebar (stored in the config entry options)
SIDEPANEL_TITLE = "sidepanel_title"
SIDEPANEL_ICON = "sidepanel_icon"

# Dashboard settings are stored in dwains-dashboard/configs/settings.yaml and
# exposed through Home Assistant's native integration options flow.
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
DEFAULT_AREA_SENSOR_DEVICE_CLASSES = ["temperature", "humidity"]
DEFAULT_AREA_BINARY_SENSOR_DEVICE_CLASSES = []
AREA_VIEW_GROUPING_MODE_CLIENT = "client"
AREA_VIEW_GROUPING_MODE_ENABLED = "enabled"
AREA_VIEW_GROUPING_MODE_DISABLED = "disabled"
AREA_VIEW_GROUPING_MODES = (
    AREA_VIEW_GROUPING_MODE_CLIENT,
    AREA_VIEW_GROUPING_MODE_ENABLED,
    AREA_VIEW_GROUPING_MODE_DISABLED,
)
FALLBACK_SENSOR_DEVICE_CLASSES = [
    "apparent_power",
    "aqi",
    "atmospheric_pressure",
    "battery",
    "carbon_dioxide",
    "carbon_monoxide",
    "current",
    "data_rate",
    "data_size",
    "date",
    "distance",
    "duration",
    "energy",
    "energy_storage",
    "enum",
    "frequency",
    "gas",
    "humidity",
    "illuminance",
    "irradiance",
    "moisture",
    "monetary",
    "nitrogen_dioxide",
    "nitrogen_monoxide",
    "nitrous_oxide",
    "ozone",
    "pm1",
    "pm10",
    "pm25",
    "power",
    "power_factor",
    "precipitation",
    "precipitation_intensity",
    "pressure",
    "reactive_power",
    "signal_strength",
    "sound_pressure",
    "speed",
    "sulphur_dioxide",
    "temperature",
    "timestamp",
    "volatile_organic_compounds",
    "volatile_organic_compounds_parts",
    "voltage",
    "volume",
    "volume_flow_rate",
    "volume_storage",
    "water",
    "weight",
    "wind_speed",
]
FALLBACK_BINARY_SENSOR_DEVICE_CLASSES = [
    "battery",
    "battery_charging",
    "carbon_monoxide",
    "cold",
    "connectivity",
    "door",
    "garage_door",
    "gas",
    "heat",
    "light",
    "lock",
    "moisture",
    "motion",
    "moving",
    "occupancy",
    "opening",
    "plug",
    "power",
    "presence",
    "problem",
    "running",
    "safety",
    "smoke",
    "sound",
    "tamper",
    "update",
    "vibration",
    "window",
]


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


def _nested_value(data, path):
    value = data
    for part in path.split("."):
        if not isinstance(value, dict):
            return None
        value = value.get(part)
    return value


def _translation_language_codes(hass):
    lang = getattr(getattr(hass, "config", None), "language", None) or "en"
    base_lang = lang.split("-")[0]
    codes = [lang, base_lang, "en"]
    return list(dict.fromkeys(codes))


def _translation(hass, path, fallback):
    translation_dir = os.path.join(os.path.dirname(__file__), "translations")
    for language_code in _translation_language_codes(hass):
        translation_path = os.path.join(translation_dir, f"{language_code}.json")
        if not os.path.exists(translation_path):
            continue
        try:
            with open(translation_path, "r", encoding="utf-8") as f:
                value = _nested_value(json.load(f), path)
        except Exception:
            continue
        if isinstance(value, str):
            return value
    return fallback


def _sensor_device_classes_from_input(value):
    if value is None:
        return list(DEFAULT_AREA_SENSOR_DEVICE_CLASSES)
    if isinstance(value, str):
        return [item.strip() for item in value.split(",") if item.strip()]
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    return []


def _sensor_device_classes_to_input(settings):
    if "area_sensor_device_classes" not in settings:
        return list(DEFAULT_AREA_SENSOR_DEVICE_CLASSES)
    return settings.get("area_sensor_device_classes") or []


def _binary_sensor_device_classes_from_input(value):
    if value is None:
        return list(DEFAULT_AREA_BINARY_SENSOR_DEVICE_CLASSES)
    if isinstance(value, str):
        return [item.strip() for item in value.split(",") if item.strip()]
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    return []


def _binary_sensor_device_classes_to_input(settings):
    if "area_binary_sensor_device_classes" not in settings:
        return list(DEFAULT_AREA_BINARY_SENSOR_DEVICE_CLASSES)
    return settings.get("area_binary_sensor_device_classes") or []


def _area_binary_sensor_entities_from_input(value):
    if value is None:
        return []
    if isinstance(value, str):
        return [value] if value else []
    if isinstance(value, list):
        return [str(item).strip() for item in value if str(item).strip()]
    return []


def _sensor_device_class_options(hass):
    values = []
    if SensorDeviceClass is not None:
        values = [device_class.value for device_class in SensorDeviceClass]
    for device_class in FALLBACK_SENSOR_DEVICE_CLASSES:
        if device_class not in values:
            values.append(device_class)
    return [
        {
            "value": device_class,
            "label": _translation(
                hass,
                f"selector.area_sensor_device_class.options.{device_class}",
                device_class.replace("_", " ").title(),
            ),
        }
        for device_class in values
    ]


def _binary_sensor_device_class_options(hass):
    values = []
    if BinarySensorDeviceClass is not None:
        values = [device_class.value for device_class in BinarySensorDeviceClass]
    for device_class in FALLBACK_BINARY_SENSOR_DEVICE_CLASSES:
        if device_class not in values:
            values.append(device_class)
    return [
        {
            "value": device_class,
            "label": _translation(
                hass,
                f"selector.area_binary_sensor_device_class.options.{device_class}",
                device_class.replace("_", " ").title(),
            ),
        }
        for device_class in values
    ]


def _area_view_grouping_mode(value):
    return value if value in AREA_VIEW_GROUPING_MODES else AREA_VIEW_GROUPING_MODE_CLIENT


def _area_view_grouping_mode_options(hass):
    return [
        {
            "value": AREA_VIEW_GROUPING_MODE_CLIENT,
            "label": _translation(
                hass,
                "selector.area_grouping_mode.options.client",
                AREA_VIEW_GROUPING_MODE_CLIENT,
            ),
        },
        {
            "value": AREA_VIEW_GROUPING_MODE_ENABLED,
            "label": _translation(
                hass,
                "selector.area_grouping_mode.options.enabled",
                AREA_VIEW_GROUPING_MODE_ENABLED,
            ),
        },
        {
            "value": AREA_VIEW_GROUPING_MODE_DISABLED,
            "label": _translation(
                hass,
                "selector.area_grouping_mode.options.disabled",
                AREA_VIEW_GROUPING_MODE_DISABLED,
            ),
        },
    ]


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
            header["area_sensor_device_classes"] = _sensor_device_classes_from_input(
                user_input.get("area_sensor_device_classes", ", ".join(DEFAULT_AREA_SENSOR_DEVICE_CLASSES))
            )
            header["area_binary_sensor_device_classes"] = _binary_sensor_device_classes_from_input(
                user_input.get("area_binary_sensor_device_classes", DEFAULT_AREA_BINARY_SENSOR_DEVICE_CLASSES)
            )
            header["area_binary_sensor_entities"] = _area_binary_sensor_entities_from_input(
                user_input.get("area_binary_sensor_entities", [])
            )
            header["area_view_grouping_mode"] = _area_view_grouping_mode(
                user_input.get("area_view_grouping_mode", AREA_VIEW_GROUPING_MODE_CLIENT)
            )
            header["area_floor_grouping_mode"] = _area_view_grouping_mode(
                user_input.get("area_floor_grouping_mode", AREA_VIEW_GROUPING_MODE_CLIENT)
            )
            target = (user_input.get("home_redirect_target", "/dwains-dashboard/home") or "/dwains-dashboard/home").strip()
            if not target.startswith("/"):
                target = f"/{target}"
            header["home_redirect_enabled"] = bool(user_input.get("home_redirect_enabled", False))
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
            vol.Optional("area_sensor_device_classes", default=_sensor_device_classes_to_input(cur)): selector.SelectSelector(
                selector.SelectSelectorConfig(
                    options=_sensor_device_class_options(self.hass),
                    multiple=True,
                    mode=selector.SelectSelectorMode.DROPDOWN,
                )
            ),
            vol.Optional("area_binary_sensor_device_classes", default=_binary_sensor_device_classes_to_input(cur)): selector.SelectSelector(
                selector.SelectSelectorConfig(
                    options=_binary_sensor_device_class_options(self.hass),
                    multiple=True,
                    mode=selector.SelectSelectorMode.DROPDOWN,
                )
            ),
            vol.Optional("area_binary_sensor_entities", default=cur.get("area_binary_sensor_entities") or []): selector.EntitySelector(
                selector.EntitySelectorConfig(domain="binary_sensor", multiple=True)
            ),
            vol.Optional("area_view_grouping_mode", default=_area_view_grouping_mode(cur.get("area_view_grouping_mode"))): selector.SelectSelector(
                selector.SelectSelectorConfig(
                    options=_area_view_grouping_mode_options(self.hass),
                    mode=selector.SelectSelectorMode.DROPDOWN,
                )
            ),
            vol.Optional("area_floor_grouping_mode", default=_area_view_grouping_mode(cur.get("area_floor_grouping_mode"))): selector.SelectSelector(
                selector.SelectSelectorConfig(
                    options=_area_view_grouping_mode_options(self.hass),
                    mode=selector.SelectSelectorMode.DROPDOWN,
                )
            ),
            vol.Optional("weather_entity", default=entity_default("weather_entity")): selector.EntitySelector(
                selector.EntitySelectorConfig(domain="weather")
            ),
            vol.Optional("alarm_entity", default=entity_default("alarm_entity")): selector.EntitySelector(
                selector.EntitySelectorConfig(domain="alarm_control_panel")
            ),
        }

        return self.async_show_form(step_id="init", data_schema=vol.Schema(schema))
