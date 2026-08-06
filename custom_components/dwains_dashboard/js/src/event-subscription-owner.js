"use strict";

class EventSubscriptionOwner {
  constructor(reportError = (message, error) => console.error(message, error)) {
    this._reportError = reportError;
    this._connected = false;
    this._entries = new Map();
  }

  connect() {
    this._connected = true;
  }

  subscribe(key, createSubscription) {
    const current = this._entries.get(key);
    if (current) {
      return current.ready;
    }

    const entry = {};
    entry.ready = Promise.resolve()
      .then(() => createSubscription())
      .then((unsubscribe) => {
        if (typeof unsubscribe !== "function") {
          throw new TypeError(`Subscription ${key} did not return an unsubscribe function`);
        }

        if (!this._connected || this._entries.get(key) !== entry) {
          return this._unsubscribe(key, unsubscribe).then(() => undefined);
        }

        entry.unsubscribe = unsubscribe;
        return unsubscribe;
      })
      .catch((error) => {
        if (this._entries.get(key) === entry) {
          this._entries.delete(key);
        }
        throw error;
      });

    this._entries.set(key, entry);
    return entry.ready;
  }

  subscribeEvent(key, hass, eventType, listener) {
    return this.subscribe(key, () => {
      const subscribeEvents = hass?.connection?.subscribeEvents;
      if (typeof subscribeEvents !== "function") {
        throw new TypeError(`Subscription ${key} requires a Home Assistant event connection`);
      }
      if (typeof listener !== "function") {
        throw new TypeError(`Subscription ${key} requires an event listener`);
      }
      return subscribeEvents.call(hass.connection, listener, eventType);
    });
  }

  disconnect() {
    this._connected = false;
    const entries = [...this._entries.entries()];
    this._entries.clear();

    for (const [key, entry] of entries) {
      if (entry.unsubscribe) {
        void this._unsubscribe(key, entry.unsubscribe);
      }
    }
  }

  _unsubscribe(key, unsubscribe) {
    return Promise.resolve()
      .then(() => unsubscribe())
      .catch((error) => {
        this._reportError(`Failed to unsubscribe ${key}`, error);
      });
  }
}

module.exports = { EventSubscriptionOwner };
