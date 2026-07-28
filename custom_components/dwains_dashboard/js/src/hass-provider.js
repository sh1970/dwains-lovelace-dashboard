"use strict";
const { findHcMain, findHomeAssistantHost } = require('./lovelace-dom');

function resolveHass({
  windowObject = window,
  documentObject = document,
  reportError = (message, error) => console.error(message, error),
} = {}) {
  try {
    const resolverOptions = { rethrow: true };
    const homeAssistant = findHomeAssistantHost(documentObject, resolverOptions);
    if (homeAssistant?.hass) return homeAssistant.hass;

    const hcMain = findHcMain(documentObject, resolverOptions);
    if (hcMain?.hass) return hcMain.hass;
    return homeAssistant?.__hass || /** @type {any} */ (windowObject).hass;
  } catch (error) {
    reportError("Failed to resolve the Home Assistant client", error);
    return undefined;
  }
}

module.exports = { resolveHass };
