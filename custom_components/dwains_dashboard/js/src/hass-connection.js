"use strict";

function hassConnectionIdentity(hass) {
  return hass?.connection ?? hass;
}

function hasHassConnectionChanged(previousHass, nextHass) {
  return Boolean(
    previousHass
    && hassConnectionIdentity(previousHass) !== hassConnectionIdentity(nextHass),
  );
}

module.exports = { hassConnectionIdentity, hasHassConnectionChanged };
