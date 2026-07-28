"use strict";

const { fireEvent } = require("./card-tools-compat");
const { findLovelaceRoot } = require("./lovelace-dom");

function hasView(lovelace, viewPath) {
  return lovelace?.config?.views?.some((view) => view?.path === viewPath) || false;
}

function wait(delay, setTimer = setTimeout) {
  return new Promise((resolve) => setTimer(resolve, delay));
}

async function refreshLovelaceConfig({
  documentObject = typeof document !== "undefined" ? document : undefined,
  viewPath,
  timeout = 10000,
  interval = 100,
  now = () => Date.now(),
  setTimer,
  resolveRoot = findLovelaceRoot,
  dispatchRefresh = (root) => fireEvent("config-refresh", {}, root),
} = {}) {
  const root = resolveRoot(documentObject);
  if (!root) {
    throw new Error("The Lovelace root is not available");
  }

  const previousConfig = root.lovelace?.config;
  dispatchRefresh(root);

  const deadline = now() + timeout;
  do {
    const currentLovelace = root.lovelace;
    const configChanged = currentLovelace?.config !== previousConfig;
    if (configChanged && (!viewPath || hasView(currentLovelace, viewPath))) {
      return currentLovelace;
    }
    await wait(interval, setTimer);
  } while (now() < deadline);

  throw new Error(
    viewPath
      ? `Lovelace did not load the new view "${viewPath}" in time`
      : "Lovelace did not refresh its configuration in time",
  );
}

module.exports = {
  hasView,
  refreshLovelaceConfig,
};
