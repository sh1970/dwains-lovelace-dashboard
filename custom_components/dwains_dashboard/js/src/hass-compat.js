const { resolveHass } = require('./hass-provider');
const { ensureLovelaceLoaded } = require('./lovelace-loader');
const {
  findHcMain,
  findHomeAssistantHost,
  findLovelaceView,
} = require('./lovelace-dom');

export function hass() {
  return resolveHass();
}

export function provideHass(element) {
  const hcMain = findHcMain();
  const homeAssistant = findHomeAssistantHost();
  const root = hcMain || homeAssistant;
  if (root && typeof root.provideHass === "function") {
    return root.provideHass(element);
  }
  const value = hass();
  if (element && value) element.hass = value;
  return element;
}

export function lovelace_view() {
  return findLovelaceView();
}

export async function load_lovelace() {
  return ensureLovelaceLoaded();
}
