"use strict";

function createLazyCardClass({
  HTMLElementBase,
  IntersectionObserverClass,
  reportError = (message, error) => console.error(message, error),
}) {
  return class DDLazyCard extends HTMLElementBase {
    set eager(value) {
      this.__eager = Boolean(value);
      if (this.__eager && this.isConnected) this._mount();
    }

    get eager() {
      return Boolean(this.__eager);
    }

    set hass(value) {
      this.__latestHass = value;
      if (!this.__c) return;
      try {
        this.__c.hass = value;
      } catch (error) {
        reportError("Failed to update the mounted lazy card", error);
      }
    }

    get hass() {
      return this.__latestHass;
    }

    set cardFactory(factory) {
      const nextFactory = typeof factory === "function" ? factory : undefined;
      if (this.__cardFactory === nextFactory) return;
      this.__cardFactory = nextFactory;
      // Lit may reuse this wrapper for a different list item whose `.card`
      // expression is also undefined. In that case the card setter is not
      // invoked, so a factory-owned card must be invalidated explicitly.
      this.__cardCreation = undefined;
      if (this.__cardFromFactory) {
        this._setCard(undefined, false);
      }
      if (this.__mounted && !this.__c) void this._createCard();
    }

    get cardFactory() {
      return this.__cardFactory;
    }

    set card(card) {
      this._setCard(card, false);
    }

    _setCard(card, fromFactory) {
      if (this.__c === card) return;
      this.__c = card;
      this.__cardFromFactory = Boolean(card && fromFactory);
      if (card && this.__latestHass !== undefined) {
        try {
          card.hass = this.__latestHass;
        } catch (error) {
          reportError("Failed to initialize the mounted lazy card", error);
        }
      }
      if (!this.__mounted || !this.isConnected) return;
      this._replaceCard(card);
    }

    _replaceCard(card) {
      try {
        while (this.firstChild) this.removeChild(this.firstChild);
      } catch (error) {
        reportError("Failed to remove the previous mounted lazy card", error);
      }
      if (card) {
        try {
          this.appendChild(card);
        } catch (error) {
          reportError("Failed to append the replacement lazy card", error);
        }
      }
    }

    get card() {
      return this.__c;
    }

    connectedCallback() {
      this.style.display = "block";
      if (this.__mounted) {
        if (this.__c) this._replaceCard(this.__c);
        else void this._createCard();
        return;
      }
      if (this.__eager || this.hasAttribute("eager")) {
        this._mount();
        return;
      }
      if (!this.style.minHeight) this.style.minHeight = "48px";
      if (!this.__io && IntersectionObserverClass) {
        this.__io = new IntersectionObserverClass((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) this._mount();
        }, {
          rootMargin: "400px 0px",
        });
      }
      if (this.__io) this.__io.observe(this);
      else this._mount();
    }

    disconnectedCallback() {
      this.__io?.disconnect();
    }

    _mount() {
      if (this.__mounted) return;
      this.__mounted = true;
      this.__io?.disconnect();
      this.style.minHeight = "";
      if (this.__c) this._replaceCard(this.__c);
      else void this._createCard();
    }

    async _createCard() {
      if (this.__c || this.__cardCreation || !this.__cardFactory) return;
      let creation;
      try {
        creation = Promise.resolve(this.__cardFactory());
      } catch (error) {
        reportError("Failed to create lazy card", error);
        return;
      }
      this.__cardCreation = creation;
      try {
        const card = await creation;
        if (this.__cardCreation !== creation) return;
        this.__cardCreation = undefined;
        if (this.__c) return;
        this._setCard(card, true);
      } catch (error) {
        if (this.__cardCreation === creation) this.__cardCreation = undefined;
        reportError("Failed to create lazy card", error);
      }
    }
  };
}

function registerLazyCard({
  registry = typeof customElements !== "undefined" ? customElements : undefined,
  HTMLElementBase = typeof HTMLElement !== "undefined" ? HTMLElement : undefined,
  IntersectionObserverClass = typeof IntersectionObserver !== "undefined"
    ? IntersectionObserver
    : undefined,
  reportError = (message, error) => console.error(message, error),
} = {}) {
  if (!registry || !HTMLElementBase || registry.get("dd-lazy-card")) return undefined;
  const LazyCard = createLazyCardClass({
    HTMLElementBase,
    IntersectionObserverClass,
    reportError,
  });
  try {
    registry.define("dd-lazy-card", LazyCard);
    return LazyCard;
  } catch (error) {
    reportError("Failed to register dd-lazy-card", error);
    return undefined;
  }
}

module.exports = { createLazyCardClass, registerLazyCard };
