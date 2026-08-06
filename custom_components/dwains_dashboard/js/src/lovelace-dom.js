"use strict";

function resolveDom(label, resolve, {
  reportError = (message, error) => console.error(message, error),
  rethrow = false,
} = {}) {
  try {
    return resolve();
  } catch (error) {
    if (rethrow) throw error;
    reportError(`Failed to resolve ${label}`, error);
    return null;
  }
}

function _findHomeAssistantHost(documentObject) {
  return documentObject?.querySelector("home-assistant") || null;
}

function findHomeAssistantHost(
  documentObject = typeof document !== "undefined" ? document : undefined,
  options,
) {
  return resolveDom(
    "the Home Assistant host",
    () => _findHomeAssistantHost(documentObject),
    options,
  );
}

function _findHomeAssistantMain(documentObject) {
  return _findHomeAssistantHost(documentObject)
    ?.shadowRoot?.querySelector("home-assistant-main")
    || null;
}

function findHomeAssistantMain(
  documentObject = typeof document !== "undefined" ? document : undefined,
  options,
) {
  return resolveDom(
    "Home Assistant main",
    () => _findHomeAssistantMain(documentObject),
    options,
  );
}

function _findHcMain(documentObject) {
  return documentObject?.querySelector("hc-main") || null;
}

function findHcMain(
  documentObject = typeof document !== "undefined" ? document : undefined,
  options,
) {
  return resolveDom("hc-main", () => _findHcMain(documentObject), options);
}

const LOVELACE_PANEL_PATHS = [
  ["ha-drawer partial-panel-resolver", "ha-drawer"],
  ["app-drawer-layout partial-panel-resolver", "app-drawer-layout"],
  ["partial-panel-resolver", "direct-resolver"],
  ["ha-panel-lovelace", "direct-panel"],
];

function _findLovelaceRootDetails(documentObject) {
  const mainRoot = _findHomeAssistantMain(documentObject)?.shadowRoot;
  if (!mainRoot) return { root: null, variant: "unresolved" };

  for (const [selector, variant] of LOVELACE_PANEL_PATHS) {
    const candidate = mainRoot.querySelector(selector);
    if (!candidate) continue;
    const panel = selector === "ha-panel-lovelace"
      ? candidate
      : (candidate.shadowRoot || candidate).querySelector("ha-panel-lovelace");
    const panelRoot = panel?.shadowRoot || panel;
    const root = panelRoot?.querySelector("hui-root") || null;
    if (root) return { root, variant };
  }
  return { root: null, variant: "unresolved" };
}

function _findLovelaceRoot(documentObject) {
  return _findLovelaceRootDetails(documentObject).root;
}

function findLovelaceRootDetails(
  documentObject = typeof document !== "undefined" ? document : undefined,
  options,
) {
  return resolveDom(
    "the Lovelace root details",
    () => _findLovelaceRootDetails(documentObject),
    options,
  );
}

function findLovelaceRoot(
  documentObject = typeof document !== "undefined" ? document : undefined,
  options,
) {
  return resolveDom("the Lovelace root", () => _findLovelaceRoot(documentObject), options);
}

function findLovelaceConfig(documentObject, options) {
  return resolveDom(
    "the Lovelace configuration",
    () => _findLovelaceRoot(documentObject)?.lovelace || null,
    options,
  );
}

function findLovelaceShell(
  lovelaceRoot,
  { reportError = (message, error) => console.error(message, error) } = {},
) {
  try {
    const container = lovelaceRoot?.shadowRoot;
    if (!container) return undefined;
    return {
      header: container.querySelector(".header"),
      view: container.querySelector("#view"),
    };
  } catch (error) {
    reportError("Failed to resolve the Lovelace shell", error);
    return undefined;
  }
}

function findLovelaceView(
  documentObject = typeof document !== "undefined" ? document : undefined,
  options,
) {
  return resolveDom("the Lovelace view", () => {
    const hcMain = _findHcMain(documentObject);
    if (hcMain) {
      const legacyRoot = hcMain.shadowRoot?.querySelector("hc-lovelace")?.shadowRoot;
      return legacyRoot?.querySelector("hui-view")
        || legacyRoot?.querySelector("hui-panel-view")
        || null;
    }

    const huiRoot = _findLovelaceRoot(documentObject);
    let root = huiRoot?.shadowRoot;
    root = root?.querySelector("ha-app-layout") || root;
    root = root?.querySelector("#view") || root;
    return root?.querySelector("hui-view")
      || root?.querySelector("hui-panel-view")
      || root?.querySelector("hui-unused-entities")
      || root?.firstElementChild
      || null;
  }, options);
}

module.exports = {
  findHomeAssistantHost,
  findHomeAssistantMain,
  findHcMain,
  findLovelaceConfig,
  findLovelaceRoot,
  findLovelaceRootDetails,
  findLovelaceShell,
  findLovelaceView,
};
