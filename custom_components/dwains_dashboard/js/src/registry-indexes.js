"use strict";

function appendIndexValue(index, key, value) {
  if (key == null) return;
  const values = index.get(key);
  if (values) values.push(value);
  else index.set(key, [value]);
}

function buildRegistryIndexes(devices, entities) {
  const devicesById = new Map();
  const entitiesById = new Map();
  const entityOrderById = new Map();
  const devicesByAreaId = new Map();
  const deviceAreaIdsById = new Map();
  const entitiesByAreaId = new Map();

  for (const device of devices || []) {
    devicesById.set(device.id, device);
    appendIndexValue(devicesByAreaId, device.area_id, device);
    if (device.area_id != null) {
      const areaIds = deviceAreaIdsById.get(device.id);
      if (areaIds) areaIds.add(device.area_id);
      else deviceAreaIdsById.set(device.id, new Set([device.area_id]));
    }
  }
  for (const [entityOrder, entity] of (entities || []).entries()) {
    entitiesById.set(entity.entity_id, entity);
    entityOrderById.set(entity.entity_id, entityOrder);
    if (entity.area_id) {
      appendIndexValue(entitiesByAreaId, entity.area_id, entity);
      continue;
    }
    for (const areaId of deviceAreaIdsById.get(entity.device_id) || []) {
      appendIndexValue(entitiesByAreaId, areaId, entity);
    }
  }

  return {
    devicesById,
    entitiesById,
    devicesByAreaId,
    entitiesByAreaId,
    entityOrderById,
  };
}

function registryOrderedEntityUnion(entityGroups, entityOrderById) {
  const entitiesById = new Map();
  for (const entities of entityGroups || []) {
    for (const entity of entities || []) {
      if (!entitiesById.has(entity.entity_id)) entitiesById.set(entity.entity_id, entity);
    }
  }
  return [...entitiesById.values()].sort((left, right) => (
    (entityOrderById?.get(left.entity_id) ?? Number.MAX_SAFE_INTEGER)
    - (entityOrderById?.get(right.entity_id) ?? Number.MAX_SAFE_INTEGER)
  ));
}

module.exports = { buildRegistryIndexes, registryOrderedEntityUnion };
