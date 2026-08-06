"use strict";

function isInvalidDwainsCardElement(element, isDwainsCard) {
  return Boolean(isDwainsCard && (
    !element
    || typeof element.setConfig !== "function"
    || element.localName === "hui-error-card"
  ));
}

module.exports = { isInvalidDwainsCardElement };
