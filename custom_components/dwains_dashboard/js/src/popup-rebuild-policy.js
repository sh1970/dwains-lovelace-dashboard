"use strict";

function isTransientDwainsEditor(cardConfig) {
  const type = typeof cardConfig?.type === "string"
    ? cardConfig.type.replace(/^custom:/, "")
    : "";
  return type.startsWith("dwains-edit-") || type.startsWith("dwains-create-");
}

function handlePopupCardRebuild(cardConfig, event, rebuild) {
  if (isTransientDwainsEditor(cardConfig)) {
    // Lovelace editors emit ll-rebuild when their nested card changes. Rebuilding
    // the popup's top-level editor would destroy its unsaved session state.
    event?.stopPropagation?.();
    return false;
  }
  rebuild();
  return true;
}

module.exports = { handlePopupCardRebuild, isTransientDwainsEditor };
