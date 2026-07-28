"use strict";

function reportRuntimeWindowError(
  event,
  { logError = (...args) => console.error(...args) } = {},
) {
  if (!event?.message?.includes("Illegal constructor")) return false;
  logError(
    "[dwains] Illegal constructor (NOT suppressed):",
    event.message,
    `${event.filename || ""}:${event.lineno || ""}`,
  );
  return true;
}

function reportUnhandledRejection(
  event,
  { logError = (...args) => console.error(...args) } = {},
) {
  try {
    const reason = event?.reason;
    const message = reason?.message || reason || "Unknown promise rejection";
    logError("[dwains] unhandledrejection (NOT suppressed):", message);
  } catch (error) {
    logError("[dwains] failed to inspect unhandled rejection:", error);
  }
}

module.exports = { reportRuntimeWindowError, reportUnhandledRejection };
