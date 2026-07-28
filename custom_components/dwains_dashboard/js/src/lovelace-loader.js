"use strict";

const { loadCardHelpers } = require("./card-helpers-loader");

async function ensureLovelaceLoaded({
  registry = typeof customElements !== "undefined" ? customElements : undefined,
  helperLoader = loadCardHelpers,
  reportError = (message, error) => console.error(message, error),
} = {}) {
  if (registry?.get("hui-view")) return true;

  try {
    await helperLoader();
    return true;
  } catch (error) {
    reportError("Failed to load the supported Home Assistant card helpers", error);
    return false;
  }
}

module.exports = { ensureLovelaceLoaded };
