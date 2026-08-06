"use strict";

const RUNTIME_STATE_KEY = Symbol.for("dwains-dashboard.runtime");

function getDwainsRuntimeState(
  windowObject = typeof window === "undefined" ? undefined : window,
) {
  if (!windowObject) {
    throw new TypeError("A Window object is required for Dwains runtime state");
  }
  return (windowObject[RUNTIME_STATE_KEY] ||= {});
}

module.exports = { getDwainsRuntimeState, RUNTIME_STATE_KEY };
