"use strict";

class CardHelpersLoader {
  constructor({
    windowObject = typeof window !== "undefined" ? window : undefined,
    delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration)),
  } = {}) {
    this._window = windowObject;
    this._delay = delay;
    this._helpers = undefined;
    this._pending = undefined;
    this._configElementLoads = new Map();
  }

  preloadConfigElement(type = "button") {
    if (typeof type !== "string" || type.length === 0) {
      return Promise.reject(new TypeError("Card type must be a non-empty string"));
    }

    const existing = this._configElementLoads.get(type);
    if (existing) return existing;

    const pending = this.load().then(async (helpers) => {
      const card = await helpers.createCardElement({ type });
      const getConfigElement = card?.constructor?.getConfigElement;
      if (typeof getConfigElement !== "function") {
        throw new TypeError(`Card type ${type} does not provide getConfigElement()`);
      }
      await getConfigElement.call(card.constructor);
    });
    this._configElementLoads.set(type, pending);
    pending.then(undefined, (error) => {
      if (this._configElementLoads.get(type) === pending) {
        this._configElementLoads.delete(type);
      }
      return error;
    });
    return pending;
  }

  load(maxTries = 20) {
    if (this._helpers?.createCardElement) return Promise.resolve(this._helpers);
    if (this._pending) return this._pending;

    this._pending = this._load(maxTries).then(
      (helpers) => {
        this._helpers = helpers;
        this._pending = undefined;
        return helpers;
      },
      (error) => {
        this._pending = undefined;
        throw error;
      },
    );
    return this._pending;
  }

  async _load(maxTries) {
    let lastError;
    for (let attempt = 0; attempt < maxTries; attempt += 1) {
      try {
        const loader = this._window?.loadCardHelpers;
        if (typeof loader === "function") {
          const helpers = await loader.call(this._window);
          if (helpers?.createCardElement) return helpers;
          lastError = new TypeError("loadCardHelpers returned an invalid helper object");
        } else {
          lastError = new TypeError("window.loadCardHelpers is not available");
        }
      } catch (error) {
        lastError = error;
      }
      await this._delay(attempt < 5 ? 100 : 300);
    }

    const error = new Error(`Card helpers not loaded after ${maxTries} attempts`);
    error.cause = lastError;
    throw error;
  }
}

const cardHelpersLoader = new CardHelpersLoader();
const loadCardHelpers = (maxTries) => cardHelpersLoader.load(maxTries);
const preloadCardConfigElement = (type) => cardHelpersLoader.preloadConfigElement(type);

module.exports = {
  CardHelpersLoader,
  cardHelpersLoader,
  loadCardHelpers,
  preloadCardConfigElement,
};
