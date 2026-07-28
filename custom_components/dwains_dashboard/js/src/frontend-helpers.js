"use strict";

const { dashboardRouteState } = require("./dashboard-route-state");

const appliedThemeVariables = new WeakMap();

function computeDomain(entityId) {
  const separator = entityId.indexOf(".");
  return separator === -1 ? "" : entityId.slice(0, separator);
}

function navigate(_node, path, replace = false) {
  return dashboardRouteState.navigate(path, { replace });
}

function applyThemesOnElement(element, themes, localTheme, updateMeta = false) {
  if (!element?.style || !themes?.themes) return false;

  let themeName = themes.default_theme;
  if (localTheme === "default" || (localTheme && themes.themes[localTheme])) {
    themeName = localTheme;
  }
  const theme = themeName === "default" ? {} : themes.themes[themeName] || {};
  const previousVariables = appliedThemeVariables.get(element) || new Set();
  const nextVariables = new Set();

  for (const key of Object.keys(theme)) {
    const variable = key.startsWith("--") ? key : `--${key}`;
    element.style.setProperty(variable, theme[key]);
    nextVariables.add(variable);
  }
  for (const variable of previousVariables) {
    if (!nextVariables.has(variable)) element.style.removeProperty(variable);
  }
  appliedThemeVariables.set(element, nextVariables);

  if (updateMeta && typeof document !== "undefined") {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      if (!meta.hasAttribute("default-content")) {
        meta.setAttribute("default-content", meta.getAttribute("content"));
      }
      const themeColor = theme["primary-color"]
        || theme["--primary-color"]
        || meta.getAttribute("default-content");
      if (themeColor) meta.setAttribute("content", themeColor);
    }
  }
  return true;
}

module.exports = {
  applyThemesOnElement,
  computeDomain,
  navigate,
};
