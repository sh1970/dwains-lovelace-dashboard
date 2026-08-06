"use strict";

class ConnectedLoadOwner {
  /**
   * @param {Function} load
   * @param {{reportError?: Function, errorMessage?: string}} [options]
   */
  constructor(load, {
    reportError,
    errorMessage = "Connected load failed",
  } = {}) {
    if (typeof load !== "function") {
      throw new TypeError("ConnectedLoadOwner requires a load function");
    }
    this._load = load;
    this._reportError = reportError;
    this._errorMessage = errorMessage;
    this._connected = false;
    this._ready = false;
    this._loaded = false;
    this._pending = undefined;
    this._generation = 0;
    this._abortController = undefined;
  }

  connect() {
    this._connected = true;
    return this._start();
  }

  ready() {
    this._ready = true;
    return this._start();
  }

  reload() {
    this._abortController?.abort("reload");
    this._abortController = undefined;
    this._loaded = false;
    this._pending = undefined;
    this._generation += 1;
    return this._start();
  }

  disconnect() {
    this._abortController?.abort("disconnect");
    this._abortController = undefined;
    this._connected = false;
    this._loaded = false;
    this._pending = undefined;
    this._generation += 1;
  }

  _start() {
    if (!this._connected || !this._ready || this._loaded) return undefined;
    if (this._pending) return this._pending;

    const generation = ++this._generation;
    const abortController = new AbortController();
    this._abortController = abortController;
    const isCurrent = () => this._connected && generation === this._generation;
    const pending = Promise.resolve()
      .then(() => this._load({ isCurrent, signal: abortController.signal }))
      .then(
        (result) => {
          if (isCurrent()) this._loaded = true;
          return result;
        },
        (error) => {
          throw error;
        },
      )
      .finally(() => {
        if (this._pending === pending) this._pending = undefined;
        if (this._abortController === abortController) {
          this._abortController = undefined;
        }
      });
    this._pending = pending;
    if (typeof this._reportError === "function") {
      pending.catch((error) => this._reportError(this._errorMessage, error));
    }
    return pending;
  }
}

module.exports = { ConnectedLoadOwner };
