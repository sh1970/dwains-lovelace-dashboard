"use strict";

class PopupOpenScheduler {
  constructor(timerOwner, { delay = 50, keyPrefix = "popup-open" } = {}) {
    if (!timerOwner?.schedule) {
      throw new Error("PopupOpenScheduler requires a TimerOwner");
    }
    this._timers = timerOwner;
    this._delay = delay;
    this._keyPrefix = keyPrefix;
    this._sequence = 0;
  }

  schedule(callback) {
    if (typeof callback !== "function") {
      throw new TypeError("PopupOpenScheduler callback must be a function");
    }
    const key = `${this._keyPrefix}-${++this._sequence}`;
    return this._timers.schedule(key, callback, this._delay);
  }
}

module.exports = { PopupOpenScheduler };
