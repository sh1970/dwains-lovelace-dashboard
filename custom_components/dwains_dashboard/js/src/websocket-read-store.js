"use strict";
const { READ_TYPES } = require("./websocket-read-messages");

const CACHEABLE_READ_TYPES = new Set(Object.values(READ_TYPES));

class WebSocketReadStore {
  constructor({
    ttl = 3000,
    now = () => Date.now(),
    reportError = (message, error) => console.error(message, error),
    reportCompatibility = (message) => console.info(message),
  } = {}) {
    this._ttl = ttl;
    this._now = now;
    this._reportError = reportError;
    this._reportCompatibility = reportCompatibility;
    this._connections = new WeakMap();
    this._unsupportedCapabilities = new WeakMap();
  }

  readPreferred(
    hass,
    preferredMessage,
    fallbackMessage,
    {
      capability = preferredMessage?.type,
      selectFallback = (value) => value,
    } = {},
  ) {
    const scope = hass?.connection || hass;
    if ((typeof scope !== "object" && typeof scope !== "function") || scope === null) {
      return Promise.reject(new TypeError("A stable Home Assistant connection is required"));
    }
    let unsupported = this._unsupportedCapabilities.get(scope);
    if (!unsupported) {
      unsupported = new Set();
      this._unsupportedCapabilities.set(scope, unsupported);
    }
    const fallback = () => this.read(hass, fallbackMessage).then(selectFallback);
    if (unsupported.has(capability)) return fallback();

    return this.read(hass, preferredMessage).catch((error) => {
      if (error?.code !== "unknown_command") throw error;
      unsupported.add(capability);
      this._reportCompatibility(
        `Home Assistant does not expose ${preferredMessage.type}; using the compatible configuration read.`,
      );
      return fallback();
    });
  }

  read(hass, message) {
    if (!hass || typeof hass.callWS !== "function") {
      return Promise.reject(new TypeError("A Home Assistant callWS client is required"));
    }
    if (!message || !CACHEABLE_READ_TYPES.has(message.type)) {
      return Promise.reject(new TypeError("Only registered read-only messages may be cached"));
    }

    const scope = hass.connection || hass;
    if ((typeof scope !== "object" && typeof scope !== "function") || scope === null) {
      return Promise.reject(new TypeError("A stable Home Assistant connection is required"));
    }
    let state = this._connections.get(scope);
    if (!state) {
      state = {
        cache: new Map(),
        inflight: new Map(),
        generations: new Map(),
        invalidated: false,
      };
      this._connections.set(scope, state);
    }

    let key;
    try {
      key = JSON.stringify(message);
    } catch (error) {
      return Promise.reject(error);
    }
    const generation = state.generations.get(key) || 0;
    const cached = state.cache.get(key);
    if (cached && this._now() - cached.storedAt < this._ttl) {
      return Promise.resolve(cached.value);
    }
    const current = state.inflight.get(key);
    if (current && current.generation === generation) return current.promise;

    let pending;
    pending = Promise.resolve()
      // Home Assistant's WebSocket client adds its request id directly to the
      // message object. Keep canonical/cache-key messages immutable, but always
      // hand the transport a fresh extensible request.
      .then(() => hass.callWS({ ...message }))
      .then(
        (value) => {
          if (state.inflight.get(key)?.promise === pending) state.inflight.delete(key);
          if (state.invalidated || (state.generations.get(key) || 0) !== generation) {
            return this.read(hass, message);
          }
          state.cache.set(key, { storedAt: this._now(), value });
          return value;
        },
        (error) => {
          if (state.inflight.get(key)?.promise === pending) state.inflight.delete(key);
          if (state.invalidated || (state.generations.get(key) || 0) !== generation) {
            return this.read(hass, message);
          }
          throw error;
        },
      );
    state.inflight.set(key, { generation, promise: pending });
    return pending;
  }

  readOptional(hass, message, fallback) {
    return this.read(hass, message).catch((error) => {
      this._reportError(`Optional WebSocket read failed: ${message?.type || "unknown"}`, error);
      return fallback;
    });
  }

  invalidate(hass, message) {
    if (!hass) return;
    const scope = hass.connection || hass;
    if ((typeof scope === "object" || typeof scope === "function") && scope !== null) {
      const state = this._connections.get(scope);
      if (!state) return;
      if (message) {
        let key;
        try {
          key = JSON.stringify(message);
        } catch (error) {
          this._reportError("Unable to invalidate WebSocket read", error);
          return;
        }
        state.generations.set(key, (state.generations.get(key) || 0) + 1);
        state.cache.delete(key);
        state.inflight.delete(key);
        return;
      }
      state.invalidated = true;
      this._connections.delete(scope);
    }
  }
}

const websocketReadStore = new WebSocketReadStore();

module.exports = { CACHEABLE_READ_TYPES, WebSocketReadStore, websocketReadStore };
