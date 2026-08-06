"use strict";
const { findHomeAssistantHost } = require("./lovelace-dom");

function findPopupRoot({
  documentObject = typeof document === "undefined" ? undefined : document,
  reportError = (message, error) => console.error(message, error),
} = {}) {
  try {
    return findHomeAssistantHost(documentObject, { rethrow: true })
      || documentObject?.querySelector("hc-root")
      || undefined;
  } catch (error) {
    reportError("Failed to resolve the Home Assistant popup root", error);
    return undefined;
  }
}

async function findCardToolsPopup({
  root,
  documentObject,
  selectTree,
  reportError = (message, error) => console.error(message, error),
} = {}) {
  const popupRoot = root || findPopupRoot({ documentObject, reportError });
  if (!popupRoot) return undefined;
  if (typeof selectTree !== "function") {
    reportError(
      "Failed to resolve card-tools-popup",
      new TypeError("A selectTree function is required"),
    );
    return undefined;
  }
  try {
    return await selectTree(popupRoot, "$ card-tools-popup");
  } catch (error) {
    reportError("Failed to resolve card-tools-popup", error);
    return undefined;
  }
}

async function closeCardToolsPopup({
  reportError = (message, error) => console.error(message, error),
  ...options
} = {}) {
  const popup = await findCardToolsPopup({ ...options, reportError });
  if (!popup) return false;
  if (typeof popup.closeDialog !== "function") {
    reportError(
      "Failed to close card-tools-popup",
      new TypeError("card-tools-popup.closeDialog is not available"),
    );
    return false;
  }
  try {
    popup.closeDialog();
    return true;
  } catch (error) {
    reportError("Failed to close card-tools-popup", error);
    return false;
  }
}

function mountCardToolsPopup({
  root,
  popup,
  provideHass,
  reportError = (message, error) => console.error(message, error),
} = {}) {
  const container = root?.shadowRoot;
  if (!container || !popup) {
    reportError(
      "Failed to mount card-tools-popup",
      new TypeError("A popup and Home Assistant shadow root are required"),
    );
    return false;
  }
  try {
    const moreInfoDialog = container.querySelector("ha-more-info-dialog");
    if (moreInfoDialog) container.insertBefore(popup, moreInfoDialog);
    else container.appendChild(popup);
    provideHass?.(popup);
    return true;
  } catch (error) {
    reportError("Failed to mount card-tools-popup", error);
    return false;
  }
}

module.exports = {
  closeCardToolsPopup,
  findCardToolsPopup,
  findPopupRoot,
  mountCardToolsPopup,
};
