export function hass() {
  try {
    if (window.__dd_get_hass) {
      const value = window.__dd_get_hass();
      if (value) return value;
    }
    const hcMain = document.querySelector("hc-main");
    if (hcMain && hcMain.hass) return hcMain.hass;
    const homeAssistant = document.querySelector("home-assistant");
    return homeAssistant && (homeAssistant.hass || homeAssistant.__hass);
  } catch (_) {
    return undefined;
  }
}

export function provideHass(element) {
  const hcMain = document.querySelector("hc-main");
  const homeAssistant = document.querySelector("home-assistant");
  const root = hcMain || homeAssistant;
  if (root && typeof root.provideHass === "function") {
    return root.provideHass(element);
  }
  const value = hass();
  if (element && value) element.hass = value;
  return element;
}

export function lovelace_view() {
  let root = document.querySelector("hc-main");
  if (root) {
    root = root.shadowRoot?.querySelector("hc-lovelace")?.shadowRoot;
    return root?.querySelector("hui-view") || root?.querySelector("hui-panel-view") || null;
  }

  root = document.querySelector("home-assistant")?.shadowRoot
    ?.querySelector("home-assistant-main")?.shadowRoot;
  const resolver = root?.querySelector("ha-drawer partial-panel-resolver")
    || root?.querySelector("app-drawer-layout partial-panel-resolver");
  root = resolver?.shadowRoot || root;
  root = root?.querySelector("ha-panel-lovelace")?.shadowRoot;
  root = root?.querySelector("hui-root")?.shadowRoot;
  root = root?.querySelector("ha-app-layout") || root;
  root = root?.querySelector("#view") || root;
  return root?.querySelector("hui-view")
    || root?.querySelector("hui-panel-view")
    || root?.querySelector("hui-unused-entities")
    || root?.firstElementChild
    || null;
}

export async function load_lovelace() {
  if (customElements.get("hui-view")) return true;

  try {
    if (window.__dd_wait_card_helpers) await window.__dd_wait_card_helpers();
    else if (window.loadCardHelpers) await window.loadCardHelpers();
  } catch (_) {}
  if (customElements.get("hui-view")) return true;

  await customElements.whenDefined("partial-panel-resolver");
  const resolver = document.createElement("partial-panel-resolver");
  resolver.hass = { panels: [{ url_path: "tmp", component_name: "lovelace" }] };
  try {
    if (typeof resolver._updateRoutes === "function") resolver._updateRoutes();
    else {
      resolver.route = { prefix: "", path: "/tmp" };
      await resolver.updateComplete;
    }
  } catch (_) {}
  try {
    await resolver.routerOptions?.routes?.tmp?.load?.();
  } catch (_) {}

  if (!customElements.get("ha-panel-lovelace")) return false;
  const panel = document.createElement("ha-panel-lovelace");
  panel.hass = hass();
  if (!panel.hass) {
    await new Promise((resolve) => window.addEventListener("connection-status", resolve, { once: true }));
    panel.hass = hass();
  }
  panel.panel = { config: { mode: null } };
  if (typeof panel._fetchConfig === "function") panel._fetchConfig();
  return true;
}
