"use strict";

class ReloadableLoadOwner {
  constructor(load) {
    if (typeof load !== "function") {
      throw new TypeError("ReloadableLoadOwner requires a load function");
    }
    this._load = load;
    this._generation = 0;
    this._abortController = undefined;
  }

  load() {
    if (this._current) return this._current;

    let result;
    const generation = ++this._generation;
    const abortController = new AbortController();
    this._abortController = abortController;
    try {
      result = this._load({
        isCurrent: () => this._generation === generation,
        signal: abortController.signal,
      });
    } catch (error) {
      result = Promise.reject(error);
    }

    let current;
    current = Promise.resolve(result)
      .then(
        (value) => {
          if (this._current === current) this._current = undefined;
          if (this._abortController === abortController) {
            this._abortController = undefined;
          }
          return value;
        },
        (error) => {
          if (this._current === current) this._current = undefined;
          if (this._abortController === abortController) {
            this._abortController = undefined;
          }
          throw error;
        },
      );
    this._current = current;
    return current;
  }

  reload() {
    if (!this._current) return this.load();
    if (this._queued) return this._queued;

    this._generation += 1;
    this._abortController?.abort("reload");
    const current = this._current;
    let queued;
    queued = current
      .then(
        () => {
          if (this._queued !== queued) return undefined;
          this._queued = undefined;
          return this.load();
        },
        () => {
          if (this._queued !== queued) return undefined;
          this._queued = undefined;
          return this.load();
        },
      );
    this._queued = queued;
    return queued;
  }

  invalidate() {
    this._generation += 1;
    this._abortController?.abort("invalidate");
    this._abortController = undefined;
    this._current = undefined;
    this._queued = undefined;
  }
}

module.exports = { ReloadableLoadOwner };
