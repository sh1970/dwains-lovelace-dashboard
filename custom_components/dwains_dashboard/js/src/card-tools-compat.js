"use strict";

const {
  findHcMain,
  findHomeAssistantHost,
} = require("./lovelace-dom");

function fireEvent(type, detail, target) {
  /** @type {Event & {detail: any}} */
  const event = /** @type {Event & {detail: any}} */ (new Event(type, {
    bubbles: true,
    cancelable: false,
    composed: true,
  }));
  event.detail = detail || {};

  const recipient = target || findHcMain() || findHomeAssistantHost();
  recipient?.dispatchEvent(event);
  return event;
}

async function selectTreePath(root, path, all) {
  const parts = typeof path === "string" ? path.split(/(\$| )/) : [...path];
  if (parts.at(-1) === "") parts.pop();

  let element = root;
  for (const [index, part] of parts.entries()) {
    if (!part.trim()) continue;
    if (!element) return null;
    if (element.localName?.includes("-")) {
      await customElements.whenDefined(element.localName);
    }
    if (element.updateComplete) await element.updateComplete;

    if (part === "$") {
      element = all && index === parts.length - 1
        ? [element.shadowRoot]
        : element.shadowRoot;
    } else {
      element = all && index === parts.length - 1
        ? element.querySelectorAll(part)
        : element.querySelector(part);
    }
  }
  return element;
}

async function selectTree(root, path, all = false, timeout = 10000) {
  let timer;
  const timeoutResult = Symbol("select-tree-timeout");
  try {
    const result = await Promise.race([
      selectTreePath(root, path, all),
      new Promise((resolve) => {
        timer = setTimeout(() => resolve(timeoutResult), timeout);
      }),
    ]);
    return result === timeoutResult ? null : result;
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}

async function moreInfo(entity, large = false) {
  const root = findHcMain() || findHomeAssistantHost();
  if (!root) return null;
  fireEvent("hass-more-info", { entityId: entity }, root);
  const dialog = await selectTree(root, "$ ha-more-info-dialog");
  if (dialog) dialog.large = large;
  return dialog;
}

module.exports = {
  fireEvent,
  moreInfo,
  selectTree,
};
