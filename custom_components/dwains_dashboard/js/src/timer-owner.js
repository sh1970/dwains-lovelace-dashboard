"use strict";

class TimerOwner {
  constructor({
    setTimer = (callback, delay) => setTimeout(callback, delay),
    clearTimer = (timer) => clearTimeout(timer),
    reportError = (message, error) => console.error(message, error),
  } = {}) {
    this._setTimer = setTimer;
    this._clearTimer = clearTimer;
    this._reportError = reportError;
    this._connected = false;
    this._timers = new Map();
  }

  connect() {
    this._connected = true;
  }

  has(key) {
    return this._timers.has(key);
  }

  schedule(key, callback, delay, { replace = true } = {}) {
    if (!this._connected) return undefined;
    const current = this._timers.get(key);
    if (current && !replace) return current.timer;
    if (current) this.clear(key);

    const entry = {};
    entry.timer = this._setTimer(() => {
      if (this._timers.get(key) === entry) {
        this._timers.delete(key);
      }
      try {
        Promise.resolve(callback()).catch((error) => {
          this._reportError(`Timer ${key} failed`, error);
        });
      } catch (error) {
        this._reportError(`Timer ${key} failed`, error);
      }
    }, delay);
    this._timers.set(key, entry);
    return entry.timer;
  }

  delay(key, delay, { replace = true } = {}) {
    if (!this._connected) return Promise.resolve(false);
    const current = this._timers.get(key);
    if (current?.promise && !replace) return current.promise;
    if (current) this.clear(key);

    const entry = {};
    entry.promise = new Promise((resolve) => {
      entry.cancel = () => resolve(false);
      entry.timer = this._setTimer(() => {
        if (this._timers.get(key) === entry) {
          this._timers.delete(key);
        }
        entry.cancel = undefined;
        resolve(true);
      }, delay);
    });
    this._timers.set(key, entry);
    return entry.promise;
  }

  clear(key) {
    const entry = this._timers.get(key);
    if (!entry) return;
    this._timers.delete(key);
    try {
      this._clearTimer(entry.timer);
    } catch (error) {
      this._reportError(`Failed to clear timer ${key}`, error);
    } finally {
      entry.cancel?.();
    }
  }

  disconnect() {
    this._connected = false;
    for (const key of [...this._timers.keys()]) {
      this.clear(key);
    }
  }
}

module.exports = { TimerOwner };
