"use strict";

const { websocketReadStore } = require("./websocket-read-store");
const { buildRegistryIndexes } = require("./registry-indexes");
const { READ_MESSAGES } = require("./websocket-read-messages");

async function loadDashboardCoreSnapshot(
  hass,
  { optionalRegistries = false, readStore = websocketReadStore } = {},
) {
  const readRegistry = optionalRegistries
    ? (message) => readStore.readOptional(hass, message, [])
    : (message) => readStore.read(hass, message);
  const [devices, entities, configuration] = await Promise.all([
    readRegistry(READ_MESSAGES.devices),
    readRegistry(READ_MESSAGES.entities),
    readStore.read(hass, READ_MESSAGES.configuration),
  ]);
  return {
    devices,
    entities,
    configuration,
    ...buildRegistryIndexes(devices, entities),
  };
}

async function loadDashboardRegistrySnapshot(
  hass,
  { includeFloors = false, readStore = websocketReadStore } = {},
) {
  const reads = [
    readStore.read(hass, READ_MESSAGES.areas),
    loadDashboardCoreSnapshot(hass, { readStore }),
  ];
  if (includeFloors) {
    reads.push(readStore.readOptional(hass, READ_MESSAGES.floors, []));
  }

  const [areas, core, floors] = await Promise.all(reads);
  return {
    areas,
    ...core,
    ...(includeFloors ? {
      floors,
      floorsById: new Map((floors || []).map((floor) => [floor.floor_id, floor])),
    } : {}),
  };
}

module.exports = { loadDashboardCoreSnapshot, loadDashboardRegistrySnapshot };
