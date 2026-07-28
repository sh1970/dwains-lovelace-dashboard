"use strict";

class EventListenerOwner {
  constructor() {
    this._connected = false;
    this._entries = new Map();
  }

  listen(key, target, type, listener, options) {
    if (!key) throw new TypeError("An event-listener key is required");
    if (!target || typeof target.addEventListener !== "function"
      || typeof target.removeEventListener !== "function") {
      throw new TypeError("An EventTarget-compatible listener host is required");
    }
    if (typeof listener !== "function") {
      throw new TypeError("An event-listener callback is required");
    }

    const current = this._entries.get(key);
    if (current
      && current.target === target
      && current.type === type
      && current.listener === listener
      && current.options === options) return false;

    if (current?.attached) this._detach(current);
    const entry = { target, type, listener, options, attached: false };
    if (this._connected) this._attach(entry);
    this._entries.set(key, entry);
    return true;
  }

  connect() {
    if (this._connected) return;
    const attached = [];
    try {
      for (const entry of this._entries.values()) {
        this._attach(entry);
        attached.push(entry);
      }
    } catch (error) {
      const failures = [error];
      for (const entry of attached.reverse()) {
        try {
          this._detach(entry);
        } catch (cleanupError) {
          failures.push(cleanupError);
        }
      }
      if (failures.length > 1) {
        throw new AggregateError(failures, "Failed to attach event listeners");
      }
      throw error;
    }
    this._connected = true;
  }

  disconnect() {
    if (!this._connected) return;
    const failures = [];
    for (const entry of this._entries.values()) {
      try {
        this._detach(entry);
      } catch (error) {
        failures.push(error);
      }
    }
    this._connected = false;
    if (failures.length === 1) throw failures[0];
    if (failures.length > 1) {
      throw new AggregateError(failures, "Failed to detach event listeners");
    }
  }

  _attach(entry) {
    if (entry.attached) return;
    entry.target.addEventListener(entry.type, entry.listener, entry.options);
    entry.attached = true;
  }

  _detach(entry) {
    if (!entry.attached) return;
    entry.target.removeEventListener(entry.type, entry.listener, entry.options);
    entry.attached = false;
  }
}

module.exports = { EventListenerOwner };
