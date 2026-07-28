"use strict";

function isDwainsRoute(path) {
  return path === "/dwains-dashboard" || path?.startsWith("/dwains-dashboard/");
}

class DashboardRouteState {
  constructor({
    windowObject = typeof window !== "undefined" ? window : undefined,
    reportError = (message, error) => console.error(message, error),
    createLocationChangedEvent = (replace = true) => new CustomEvent(
      "location-changed",
      { detail: { replace } },
    ),
  } = {}) {
    this._window = windowObject;
    this._reportError = reportError;
    this._createLocationChangedEvent = createLocationChangedEvent;
  }

  navigate(value, { replace = false } = {}) {
    const targetUrl = this._validDwainsUrl(value);
    if (!targetUrl) return false;

    try {
      const targetPath = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
      const location = this._window.location;
      const currentPath = `${location.pathname}${location.search}${location.hash}`;
      if (currentPath !== targetPath) {
        if (replace) {
          this._window.history.replaceState(
            this._window.history.state || null,
            "",
            targetPath,
          );
        } else {
          this._window.history.pushState(null, "", targetPath);
        }
        this._window.dispatchEvent(this._createLocationChangedEvent(replace));
      }
      return true;
    } catch (error) {
      this._reportError("Failed to navigate within Dwains Dashboard", error);
      return false;
    }
  }

  navigateToDevices(domain) {
    const path = this._window?.location?.pathname;
    if (!path) return false;
    const basePath = path.substring(0, path.lastIndexOf("/"));
    return this.navigate(`${basePath}/devices#${domain}`);
  }

  _validDwainsUrl(value) {
    if (!value) return undefined;
    try {
      const url = new URL(value, this._window.location.origin);
      return url.origin === this._window.location.origin && isDwainsRoute(url.pathname)
        ? url
        : undefined;
    } catch (error) {
      this._reportError("Failed to validate a Dwains Dashboard route", error);
      return undefined;
    }
  }
}

const dashboardRouteState = new DashboardRouteState();

module.exports = {
  DashboardRouteState,
  dashboardRouteState,
  isDwainsRoute,
};
