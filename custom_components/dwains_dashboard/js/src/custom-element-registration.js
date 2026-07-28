"use strict";

const { getDwainsRuntimeState } = require("./runtime-state");

function isDwainsElementName(name) {
  if (typeof name !== "string") return false;
  const publicName = name.endsWith("-ddfix") ? name.slice(0, -6) : name;
  return (
    publicName.startsWith("dwains-")
    || publicName === "homepage-card"
    || publicName === "devices-card"
    || publicName === "more-page-card"
    || publicName === "more-pages-card"
    || publicName === "dwainsboard-navigation-card"
  );
}

function captureDwainsConstructor(name, constructor, windowObject, reportError) {
  try {
    const state = getDwainsRuntimeState(windowObject);
    (state.constructors ||= {})[name] = constructor;
    const originals = (state.originalConstructors ||= {});
    if (!originals[name]) originals[name] = constructor;
  } catch (error) {
    reportError("[dwains] failed to capture constructor:", name, error);
  }
}

function defineOwnedElement(
  name,
  constructor,
  {
    registry = typeof customElements === "undefined" ? undefined : customElements,
    reportError = (...args) => console.error(...args),
  } = {},
) {
  if (typeof name !== "string" || !name.includes("-")) {
    throw new TypeError(`Invalid custom-element name: ${name}`);
  }
  if (!registry || typeof registry.define !== "function") {
    throw new TypeError("A CustomElementRegistry is required");
  }

  if (registry.get(name)) return undefined;
  try {
    return registry.define(name, constructor);
  } catch (error) {
    reportError("[dwains] define failed:", name, error);
    return undefined;
  }
}

function defineDwainsElement(name, constructor, options = {}) {
  if (!isDwainsElementName(name)) {
    throw new TypeError(`Not a Dwains custom-element name: ${name}`);
  }
  const {
    windowObject = typeof window === "undefined" ? undefined : window,
    reportError = (...args) => console.error(...args),
  } = options;
  captureDwainsConstructor(name, constructor, windowObject, reportError);
  return defineOwnedElement(name, constructor, { ...options, reportError });
}

module.exports = {
  defineDwainsElement,
  defineOwnedElement,
  isDwainsElementName,
};
