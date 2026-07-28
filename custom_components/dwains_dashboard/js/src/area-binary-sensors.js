"use strict";

const AREA_BINARY_SENSOR_SUMMARY_KEYS = Object.freeze({
  cold: "cold",
  door: "door",
  garage_door: "garage_door",
  lock: "lock",
  moisture: "moisture",
  motion: "motion",
  safety: "safety",
  smoke: "smoke",
  sound: "sound",
  vibration: "vibration",
  window: "window",
});

function summaryTranslationKey(deviceClass, activeCount) {
  const knownClass = AREA_BINARY_SENSOR_SUMMARY_KEYS[deviceClass];
  const quantity = activeCount === 0 ? "zero" : activeCount === 1 ? "one" : "many";
  return knownClass
    ? `area_binary_sensor.summary.${knownClass}.${quantity}`
    : `area_binary_sensor.summary.fallback.${quantity}`;
}

function entityBelongsToArea(entityId, areaId, {
  entitiesById,
  entities = [],
  devicesById,
}) {
  const entity = entitiesById?.get(entityId)
    || entities.find((entry) => entry.entity_id === entityId);
  if (!entity) return false;
  if (entity.area_id) return entity.area_id === areaId;
  if (!entity.device_id) return false;
  return devicesById?.get(entity.device_id)?.area_id === areaId;
}

function collectAreaBinarySensorValues({
  areaId,
  areaEntityIds,
  states,
  deviceClasses,
  explicitEntityIds,
  unavailableStates,
  offStates,
  belongsToArea,
  summary,
  displayName,
  stateLabel,
}) {
  const binarySensors = areaEntityIds
    .map((entityId) => states[entityId])
    .filter((entity) => entity?.entity_id?.startsWith("binary_sensor."));
  const values = [];

  for (const deviceClass of deviceClasses) {
    const matchingSensors = binarySensors.filter((entity) => (
      entity.attributes.device_class === deviceClass
      && !unavailableStates.includes(entity.state)
    ));
    if (!matchingSensors.length) continue;
    const activeCount = matchingSensors.filter(
      (entity) => !offStates.includes(entity.state),
    ).length;
    values.push(summary(deviceClass, activeCount));
  }

  for (const entityId of explicitEntityIds) {
    if (!belongsToArea(entityId, areaId)) continue;
    const entity = states[entityId];
    if (!entity || unavailableStates.includes(entity.state)) continue;
    values.push(`${displayName(entityId)}: ${stateLabel(entity)}`);
  }
  return values;
}

module.exports = {
  collectAreaBinarySensorValues,
  entityBelongsToArea,
  summaryTranslationKey,
};
