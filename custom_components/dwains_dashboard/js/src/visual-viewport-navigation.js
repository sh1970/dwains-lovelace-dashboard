"use strict";

const { EventListenerOwner } = require("./event-listener-owner");

const MOBILE_NAVIGATION_WIDTH = 768;
const COMPACT_NAVIGATION_WIDTH = 871;
const MINIMUM_COMPENSATED_SCALE = 0.5;
const SCALE_EPSILON = 0.001;

function finiteNumber(value, fallback = 0) {
  return Number.isFinite(value) ? value : fallback;
}

function createNavigationViewportState(windowRef, documentRef) {
  const viewport = windowRef?.visualViewport;
  const reportedScale = finiteNumber(viewport?.scale, 1);
  const scale = reportedScale > 0 ? reportedScale : 1;
  const viewportWidth = finiteNumber(viewport?.width, windowRef?.innerWidth || 0);
  const physicalWidth = viewport ? viewportWidth * scale : viewportWidth;
  const mobile = physicalWidth <= MOBILE_NAVIGATION_WIDTH;
  const compact = physicalWidth <= COMPACT_NAVIGATION_WIDTH;
  const compensate = mobile && scale < 1 - SCALE_EPSILON;
  const compensatedScale = compensate
    ? Math.max(scale, MINIMUM_COMPENSATED_SCALE)
    : 1;

  if (!compensate) {
    return Object.freeze({ mobile, compact, compensate: false });
  }

  const documentHeight = finiteNumber(
    documentRef?.documentElement?.clientHeight,
    windowRef?.innerHeight || 0,
  );
  const viewportHeight = finiteNumber(viewport?.height, documentHeight);
  const offsetLeft = finiteNumber(viewport?.offsetLeft, 0);
  const offsetTop = finiteNumber(viewport?.offsetTop, 0)
    + viewportHeight
    - documentHeight;

  return Object.freeze({
    mobile,
    compact,
    compensate: true,
    width: viewportWidth * compensatedScale,
    inverseScale: 1 / compensatedScale,
    offsetLeft,
    offsetTop,
  });
}

function setBooleanAttribute(element, name, enabled) {
  if (!element?.toggleAttribute) return;
  element.toggleAttribute(name, enabled);
}

function clearCompensation(wrapper) {
  if (!wrapper?.style) return;
  for (const property of ["width", "right", "transform", "transform-origin"]) {
    wrapper.style.removeProperty(property);
  }
}

function applyNavigationViewportState(target, state) {
  setBooleanAttribute(target, "mobile-navigation", state.mobile);
  setBooleanAttribute(target, "compact-navigation", state.compact);

  const root = target?.getRootNode?.();
  const layout = root?.host?.localName === "dwains-dashboard-layout"
    ? root.host
    : undefined;
  const wrapper = target?.parentElement?.id === "dwains_navigation"
    ? target.parentElement
    : root?.querySelector?.("#dwains_navigation");

  setBooleanAttribute(layout, "mobile-navigation", state.mobile);
  if (!state.compensate || !wrapper?.style) {
    clearCompensation(wrapper);
    return;
  }

  wrapper.style.setProperty("width", `${state.width}px`);
  wrapper.style.setProperty("right", "auto");
  wrapper.style.setProperty("transform-origin", "left bottom");
  wrapper.style.setProperty(
    "transform",
    `translate(${state.offsetLeft}px, ${state.offsetTop}px) scale(${state.inverseScale})`,
  );
}

class VisualViewportNavigationOwner {
  constructor({ windowRef = window, documentRef = document } = {}) {
    this._window = windowRef;
    this._document = documentRef;
    this._listeners = new EventListenerOwner();
    this._scheduleRefresh = this._scheduleRefresh.bind(this);
  }

  connect(target) {
    this.disconnect();
    this._target = target;
    const viewport = this._window?.visualViewport;
    if (viewport) {
      this._listeners.listen("viewport-resize", viewport, "resize", this._scheduleRefresh);
      this._listeners.listen("viewport-scroll", viewport, "scroll", this._scheduleRefresh);
    }
    this._listeners.listen("window-resize", this._window, "resize", this._scheduleRefresh);
    this._listeners.connect();
    this.refresh();
  }

  refresh() {
    if (!this._target) return;
    applyNavigationViewportState(
      this._target,
      createNavigationViewportState(this._window, this._document),
    );
  }

  _scheduleRefresh() {
    if (!this._target || this._frame !== undefined) return;
    this._frame = this._window.requestAnimationFrame(() => {
      this._frame = undefined;
      this.refresh();
    });
  }

  disconnect() {
    if (this._frame !== undefined) {
      this._window.cancelAnimationFrame(this._frame);
      this._frame = undefined;
    }
    this._listeners.disconnect();
    if (this._target) {
      applyNavigationViewportState(
        this._target,
        { mobile: false, compact: false, compensate: false },
      );
    }
    this._target = undefined;
  }
}

module.exports = {
  COMPACT_NAVIGATION_WIDTH,
  MOBILE_NAVIGATION_WIDTH,
  VisualViewportNavigationOwner,
  applyNavigationViewportState,
  createNavigationViewportState,
};
