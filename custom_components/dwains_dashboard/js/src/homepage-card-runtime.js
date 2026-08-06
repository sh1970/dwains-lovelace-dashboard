"use strict";

const HOMEPAGE_CARD_KEYS = [
  "card",
  "badgesCard",
  "roomsCard",
  "favoritesCard",
  "personsCard",
  "houseInfoCard",
  "devicesCard",
  "areasCard",
  "headerCard",
  "footerCard",
  "header",
  "bodyCard",
  "servicesCard",
  "shortcutsCard",
  "chipsCard",
];

function setChildHass(target, hass, reportError) {
  if (!target) return;
  try {
    target.hass = hass;
  } catch (error) {
    reportError("Failed to propagate Home Assistant to a homepage child", error);
  }
}

function propagateHomepageHass(
  homepage,
  hass,
  { reportError = (message, error) => console.error(message, error) } = {},
) {
  const visited = new Set();
  const propagate = (target) => {
    if (!target || visited.has(target)) return;
    visited.add(target);
    setChildHass(target, hass, reportError);
  };

  for (const key of HOMEPAGE_CARD_KEYS) {
    const value = homepage[key];
    if (Array.isArray(value)) value.forEach(propagate);
    else propagate(value);
  }
  for (const value of Object.values(homepage)) {
    const entries = Array.isArray(value) ? value : [value];
    for (const item of entries) {
      if (!item || typeof item !== "object") continue;
      if ("hass" in item) propagate(item);
      propagate(item.card);
      propagate(item.badgesCard);
    }
  }
}

function fallbackCardConfig(config) {
  if (config?.entity) return { type: "entities", entities: [config.entity] };
  if (Array.isArray(config?.entities) && config.entities.length) {
    return { type: "entities", entities: config.entities };
  }
  if (config?.card?.entity) {
    return { type: "entities", entities: [config.card.entity] };
  }
  if (Array.isArray(config?.card?.entities) && config.card.entities.length) {
    return { type: "entities", entities: config.card.entities };
  }
  return { type: "entities", entities: [] };
}

async function createHomepageCardElement({
  helpers,
  config,
  hass,
  createCardElement,
  reportError = (message, error) => console.error(message, error),
}) {
  let card;
  try {
    card = await createCardElement(helpers, config, hass);
  } catch (error) {
    reportError("Failed to create homepage card; using entities fallback", error);
    card = await createCardElement(helpers, fallbackCardConfig(config), hass);
  }
  if (hass) setChildHass(card, hass, reportError);
  return card;
}

module.exports = {
  HOMEPAGE_CARD_KEYS,
  createHomepageCardElement,
  fallbackCardConfig,
  propagateHomepageHass,
};
