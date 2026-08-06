"use strict";

const { TimerOwner } = require("./timer-owner");

class LovelaceHeaderOwner {
  constructor({
    timers = new TimerOwner(),
    maxAttempts = 40,
    retryDelay = 100,
    MutationObserverClass = typeof MutationObserver !== "undefined" ? MutationObserver : undefined,
    reportError = (message, error) => console.error(message, error),
  } = {}) {
    this._timers = timers;
    this._maxAttempts = maxAttempts;
    this._retryDelay = retryDelay;
    this._MutationObserver = MutationObserverClass;
    this._reportError = reportError;
  }

  connect(owner) {
    this._owner = owner;
    this._attempts = 0;
    this._timers.connect();
    this._sync();
  }

  disconnect() {
    this._timers.disconnect();
    this._observer?.disconnect();
    this._observer = undefined;
    this._observedRoot = undefined;
    if (this._header?.style?.display === "none") {
      this._header.style.display = this._previousDisplay ?? "";
    }
    this._header = undefined;
    this._owner = undefined;
  }

  _findLovelaceRoot() {
    let current = this._owner;
    for (let depth = 0; current && depth < 40; depth += 1) {
      if (current.localName === "hui-root") return current;
      const root = current.getRootNode?.();
      current = current.parentNode || root?.host || null;
    }
    return undefined;
  }

  _sync() {
    try {
      const root = this._findLovelaceRoot();
      if (root?.shadowRoot && root !== this._observedRoot && this._MutationObserver) {
        this._observer?.disconnect();
        this._observer = new this._MutationObserver(() => this._sync());
        this._observer.observe(root.shadowRoot, { childList: true, subtree: true });
        this._observedRoot = root;
      }
      const header = root?.shadowRoot?.querySelector(".header");
      if (header) {
        if (header !== this._header) {
          this._header = header;
          this._previousDisplay = header.style.display;
        }
        const headerRect = header.getBoundingClientRect?.();
        const headerHeight = headerRect?.height || header.offsetHeight || 0;
        if (headerHeight > 0) {
          this._owner?.style?.setProperty?.(
            "--dd-lovelace-header-offset",
            `${headerHeight}px`,
          );
        }
        header.style.display = "none";
        this._attempts = 0;
        return;
      }
    } catch (error) {
      this._reportError("Failed to synchronize the Lovelace header", error);
    }

    this._attempts += 1;
    if (this._owner?.isConnected && this._attempts <= this._maxAttempts) {
      this._timers.schedule("lovelace-header", () => this._sync(), this._retryDelay);
    }
  }
}

module.exports = { LovelaceHeaderOwner };
