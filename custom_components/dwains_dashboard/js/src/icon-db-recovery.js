"use strict";

const { EventListenerOwner } = require("./event-listener-owner");

class IconDbRecovery {
  constructor({
    windowObject = typeof window !== "undefined" ? window : undefined,
    reportError = (message, error) => console.error(message, error),
  } = {}) {
    this._window = windowObject;
    this._indexedDb = windowObject?.indexedDB;
    this._reportError = reportError;
    this._listeners = new EventListenerOwner();
    this._started = false;
    this._reset = false;
    this._rejectionHandler = (event) => this._handleRejection(event);
  }

  start() {
    if (this._started) return;
    this._started = true;
    try {
      if (this._window) {
        this._listeners.listen(
          "unhandledrejection",
          this._window,
          "unhandledrejection",
          this._rejectionHandler,
        );
        this._listeners.connect();
      }
    } catch (error) {
      this._reportError("Failed to install icon database recovery listener", error);
    }
    this._inspect().catch((error) => {
      this._reportError("Failed to inspect the Home Assistant icon database", error);
    });
  }

  stop() {
    if (!this._started) return;
    this._started = false;
    try {
      this._listeners.disconnect();
    } catch (error) {
      this._reportError("Failed to remove icon database recovery listener", error);
    }
  }

  _handleRejection(event) {
    try {
      const reason = event?.reason;
      const message = reason?.message || String(reason || "");
      if (message.includes("mdi-icon-store")) this._resetDatabase();
    } catch (error) {
      this._reportError("Failed to inspect an icon database rejection", error);
    }
  }

  _resetDatabase() {
    if (this._reset) return;
    this._reset = true;
    try {
      this._indexedDb?.deleteDatabase("hass-icon-db");
    } catch (error) {
      this._reportError("Failed to reset the Home Assistant icon database", error);
    }
  }

  async _inspect() {
    if (typeof this._indexedDb?.databases !== "function") return;
    const databases = await this._indexedDb.databases();
    if (!databases?.some((database) => database?.name === "hass-icon-db")) return;

    const request = this._indexedDb.open("hass-icon-db");
    request.onerror = () => {
      this._reportError(
        "Failed to open the Home Assistant icon database",
        request.error || new Error("IndexedDB open failed"),
      );
    };
    request.onsuccess = () => {
      try {
        const database = request.result;
        const broken = !database.objectStoreNames.contains("mdi-icon-store");
        database.close();
        if (broken) this._resetDatabase();
      } catch (error) {
        this._reportError("Failed to validate the Home Assistant icon database", error);
        this._resetDatabase();
      }
    };
  }
}

const iconDbRecovery = new IconDbRecovery();

module.exports = { IconDbRecovery, iconDbRecovery };
