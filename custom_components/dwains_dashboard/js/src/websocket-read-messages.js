"use strict";

const READ_TYPES = Object.freeze({
  configuration: "dwains_dashboard/configuration/get",
  navigation: "dwains_dashboard/navigation/get",
  morePages: "dwains_dashboard/more_pages/get",
  morePage: "dwains_dashboard/more_page/get",
  blueprints: "dwains_dashboard/get_blueprints",
  notifications: "dwains_dashboard_notification/get",
  areas: "config/area_registry/list",
  devices: "config/device_registry/list",
  entities: "config/entity_registry/list",
  floors: "config/floor_registry/list",
});

const READ_MESSAGES = Object.freeze(
  Object.fromEntries(
    Object.entries(READ_TYPES).map(([key, type]) => [key, Object.freeze({ type })]),
  ),
);

module.exports = { READ_MESSAGES, READ_TYPES };
