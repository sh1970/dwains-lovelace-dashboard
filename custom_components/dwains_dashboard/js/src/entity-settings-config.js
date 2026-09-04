"use strict";

function entitySettingsFromConfiguration(configuration, entity) {
  const configured = configuration?.entities?.[entity] || {};

  return {
    entity,
    friendlyName: configured.friendly_name || "",
    hideEntity: configured.hidden === true,
    hideEntityInArea: configured.hidden_in_area === true,
    disableEntity: configured.disabled === true,
    excludeEntity: configured.excluded === true,
    rowSpan: configured.row_span || "1",
    colSpan: configured.col_span || "1",
    rowSpanLg: configured.row_span_lg || "1",
    colSpanLg: configured.col_span_lg || "1",
    rowSpanXl: configured.row_span_xl || "1",
    colSpanXl: configured.col_span_xl || "1",
    customCard: Boolean(configured.custom_card),
    customPopup: Boolean(configured.custom_popup),
  };
}

function entityRecoveryActions(configuration, entity, category) {
  const settings = entitySettingsFromConfiguration(configuration, entity);
  const actions = [];

  if (category === "hidden" || settings.hideEntity) {
    actions.push({ key: "hidden", translationKey: "entity.unhide" });
  }
  if (settings.hideEntityInArea) {
    actions.push({
      key: "hidden_in_area",
      translationKey: "entity.unhide_in_area",
    });
  }
  if (category === "disabled" || settings.disableEntity) {
    actions.push({ key: "disabled", translationKey: "entity.enable" });
  }

  return actions;
}

module.exports = {
  entityRecoveryActions,
  entitySettingsFromConfiguration,
};
