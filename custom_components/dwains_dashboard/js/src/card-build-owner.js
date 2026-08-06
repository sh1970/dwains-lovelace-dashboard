"use strict";

class CardBuildOwner {
  constructor({
    loadHelpers,
    createCard,
    reportError = (message, error) => console.error(message, error),
  }) {
    if (typeof loadHelpers !== "function" || typeof createCard !== "function") {
      throw new TypeError("CardBuildOwner requires helper and card factories");
    }
    this._loadHelpers = loadHelpers;
    this._createCard = createCard;
    this._reportError = reportError;
    this._generation = 0;
  }

  async build(config, hass) {
    const generation = ++this._generation;
    try {
      const helpers = await this._loadHelpers();
      const card = await this._createCard(helpers, config, hass);
      if (generation !== this._generation) return undefined;
      if (card) card.hass = hass;
      return card;
    } catch (error) {
      this._reportError("Failed to create popup card", error);
      return undefined;
    }
  }

  invalidate() {
    this._generation += 1;
  }
}

module.exports = { CardBuildOwner };
