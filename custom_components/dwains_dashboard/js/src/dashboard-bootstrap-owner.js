"use strict";

const { TimerOwner } = require("./timer-owner");

class DashboardBootstrapOwner {
  constructor({
    target,
    findMain,
    createDashboard,
    retryDelay = 150,
    timers = new TimerOwner(),
    reportError = (message, error) => console.error(message, error),
  }) {
    this._target = target;
    this._findMain = findMain;
    this._createDashboard = createDashboard;
    this._retryDelay = retryDelay;
    this._timers = timers;
    this._reportError = reportError;
    this._start = this._start.bind(this);
  }

  connect() {
    this._timers.connect();
    return this._start();
  }

  disconnect() {
    this._timers.disconnect();
  }

  _start() {
    if (this._target.dwains_dashboard) {
      this.disconnect();
      return this._target.dwains_dashboard;
    }

    let main;
    try {
      main = this._findMain();
    } catch (error) {
      this.disconnect();
      this._reportError("Failed to initialize Dwains Dashboard", error);
      return undefined;
    }

    if (!main || !main.shadowRoot) {
      this._timers.schedule(
        "dashboard-bootstrap",
        this._start,
        this._retryDelay,
        { replace: false },
      );
      return undefined;
    }

    this.disconnect();
    try {
      const dashboard = this._createDashboard();
      this._target.dwains_dashboard = dashboard;
      return dashboard;
    } catch (error) {
      this._reportError("Failed to initialize Dwains Dashboard", error);
      return undefined;
    }
  }
}

module.exports = { DashboardBootstrapOwner };
