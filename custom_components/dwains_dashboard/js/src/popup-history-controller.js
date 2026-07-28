"use strict";

const { EventListenerOwner } = require("./event-listener-owner");

class PopupHistoryController {
  constructor({
    windowObject = typeof window !== "undefined" ? window : undefined,
    reportError = (message, error) => console.error(message, error),
  } = {}) {
    this._window = windowObject;
    this._history = windowObject?.history;
    this._reportError = reportError;
    this._listeners = new EventListenerOwner();
    this._popup = undefined;
    this._reopen = undefined;
    this._started = false;
    this._popstateHandler = (event) => this._handlePopstate(event);
  }

  connect(popup, reopen) {
    this._popup = popup;
    this._reopen = reopen;
    if (this._started || !this._window) return;
    this._listeners.listen("popstate", this._window, "popstate", this._popstateHandler);
    this._listeners.connect();
    this._started = true;
  }

  recordOpen(params) {
    const previousState = this._stateWith({ cardToolsPopup: false }, this._history?.state);
    const popupState = this._stateWith({ cardToolsPopup: true, params }, this._history?.state);
    try {
      this._history?.replaceState(previousState, "");
      this._history?.pushState(popupState, "");
    } catch (error) {
      this._reportError("Failed to record popup navigation state", error);
      throw error;
    }
  }

  markClosed() {
    if (!this._history?.state?.cardToolsPopup) return;
    try {
      this._history.replaceState(
        this._stateWith({ cardToolsPopup: false }, this._history.state),
        "",
      );
    } catch (error) {
      this._reportError("Failed to close popup navigation state", error);
    }
  }

  destroy() {
    if (this._started) {
      this._listeners.disconnect();
    }
    this._started = false;
    this._popup = undefined;
    this._reopen = undefined;
  }

  _stateWith(popupState, currentState) {
    const state = currentState && typeof currentState === "object"
      ? currentState
      : {};
    return { ...state, ...popupState };
  }

  _handlePopstate(event) {
    if (!event?.state || !("cardToolsPopup" in event.state)) return;
    if (!event.state.cardToolsPopup) {
      this._popup?.closeDialog();
      return;
    }

    Promise.resolve(this._reopen?.(event.state.params)).catch((error) => {
      this._reportError("Failed to restore popup navigation state", error);
    });
  }
}

const popupHistoryController = new PopupHistoryController();

module.exports = { PopupHistoryController, popupHistoryController };
