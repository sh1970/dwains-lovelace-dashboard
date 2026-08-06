"use strict";

function closeParentDropdown(
  event,
  { reportError = (message, error) => console.error(message, error) } = {},
) {
  try {
    const path = typeof event?.composedPath === "function" ? event.composedPath() : [];
    let dropdown = Array.isArray(path)
      ? path.find((element) => element?.localName === "ha-dropdown")
      : undefined;
    if (!dropdown && typeof event?.currentTarget?.closest === "function") {
      dropdown = event.currentTarget.closest("ha-dropdown");
    }
    if (!dropdown && typeof event?.target?.closest === "function") {
      dropdown = event.target.closest("ha-dropdown");
    }
    if (!dropdown) return false;

    if (typeof dropdown.close === "function") dropdown.close();
    else if ("open" in dropdown) dropdown.open = false;
    else dropdown.removeAttribute("open");
    return true;
  } catch (error) {
    reportError("Failed to close the parent Home Assistant dropdown", error);
    return false;
  }
}

module.exports = { closeParentDropdown };
