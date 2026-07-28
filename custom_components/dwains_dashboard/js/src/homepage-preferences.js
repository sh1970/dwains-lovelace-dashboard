"use strict";

const GROUPING_MODES = new Set(["client", "enabled", "disabled"]);

function homepageHeader(configuration) {
  return configuration?.homepage_header || {};
}

function readBooleanCookie(cookies, key, fallback = false) {
  const value = cookies.get(key);
  if (value === undefined) return fallback;
  return value !== "false";
}

function groupingMode(configuration, key) {
  const mode = homepageHeader(configuration)[key] || "client";
  return GROUPING_MODES.has(mode) ? mode : "client";
}

function resolveGroupingPreference(configuration, key, clientValue) {
  const mode = groupingMode(configuration, key);
  if (mode === "enabled") return true;
  if (mode === "disabled") return false;
  return clientValue;
}

function normalizeStringList(value, fallback = []) {
  if (value === undefined) return [...fallback];
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

function areaSensorDeviceClasses(configuration) {
  const header = homepageHeader(configuration);
  if (Object.prototype.hasOwnProperty.call(header, "area_sensor_device_classes")) {
    return Array.isArray(header.area_sensor_device_classes)
      ? header.area_sensor_device_classes
      : [];
  }
  return ["temperature", "humidity"];
}

function areaBinarySensorDeviceClasses(configuration) {
  return normalizeStringList(
    homepageHeader(configuration).area_binary_sensor_device_classes,
  );
}

function areaBinarySensorEntities(configuration) {
  return normalizeStringList(
    homepageHeader(configuration).area_binary_sensor_entities,
  );
}

module.exports = {
  areaBinarySensorDeviceClasses,
  areaBinarySensorEntities,
  areaSensorDeviceClasses,
  groupingMode,
  normalizeStringList,
  readBooleanCookie,
  resolveGroupingPreference,
};
