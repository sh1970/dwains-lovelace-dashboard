// Tiny preload script for Dwains Dashboard.
//
// It defines ONLY the `dwains-dashboard-layout` VIEW LAYOUT element, as a
// standalone custom element with no dependencies, so it loads/executes almost
// instantly. The main ~600KB bundle loads async; if HA renders the dwains view
// before that bundle is ready, the view's layout element would be undefined and
// HA shows "Configuration error" for the whole view (HA auto-recovers undefined
// *cards* via whenDefined, but NOT view layouts). By defining the layout here in
// a tiny file that wins the load race, the view always has a valid layout, and
// `homepage-card`/`devices-card` (ordinary cards in the big bundle) auto-recover
// if they're briefly late.
//
// The big bundle's own define is guarded by `if(!customElements.get(...))`, so
// it becomes a no-op once this script has defined the element.
(function () {
  "use strict";
  function clearObsoleteRouteRestore() {
    try {
      window.localStorage.removeItem("dwains_dashboard_restore_until");
      window.localStorage.removeItem("dwains_dashboard_last_url");
      window.sessionStorage.removeItem("dwains_dashboard_last_url");
    } catch (error) {
      console.warn("[dwains-preload] failed to clear obsolete route restore state", error);
    }
  }
  clearObsoleteRouteRestore();
  window.addEventListener("location-changed", clearObsoleteRouteRestore);
  window.addEventListener("popstate", clearObsoleteRouteRestore);
  if (!window.customElements) return;

  var reportedErrors = Object.create(null);
  var runtimeStateKey = Symbol.for("dwains-dashboard.runtime");
  var runtimeState = (window[runtimeStateKey] ||= {});
  var rebuiltPopups = new WeakSet();
  function reportPreloadError(context, error) {
    if (reportedErrors[context]) return;
    reportedErrors[context] = true;
    console.warn("[dwains-preload] " + context, error);
  }

  if (customElements.get("dwains-dashboard-layout")) {
    // Layout already defined on this registry; the self-heal loop still needs to
    // run (cards/popups), so fall through rather than returning.
  }
  class DwainsDashboardLayout extends HTMLElement {
    constructor() {
      super();
      const sr = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent =
        ':host{display:block;margin-top:calc(-1 * var(--dd-lovelace-header-offset,0px))}' +
        '#dwains_navigation{position:sticky;top:0;z-index:8}' +
        '#dwains_dashboard{margin:0 auto;font-family:"Open Sans",sans-serif;padding-top:10px;padding-bottom:50px}' +
        "@media only screen and (max-width:871px){" +
        "#dwains_navigation{position:fixed;left:0;right:0;top:auto;bottom:0;z-index:30}" +
        ":host{display:block}" +
        "#dwains_dashboard{padding-top:1px;padding-bottom:calc(5rem + env(safe-area-inset-bottom))}}";
      sr.appendChild(style);
      this._navigationHost = document.createElement("div");
      this._navigationHost.id = "dwains_navigation";
      sr.appendChild(this._navigationHost);
      this._wrap = document.createElement("div");
      this._wrap.id = "dwains_dashboard";
      sr.appendChild(this._wrap);
      this._runtimeReady = this._ensureNavigation.bind(this);
      this._headerChanged = this._syncHeader.bind(this);
      this._headerRetries = 0;
    }
    connectedCallback() {
      window.addEventListener("dwains-dashboard-runtime-ready", this._runtimeReady);
      this._ensureNavigation();
      this._syncHeader();
    }
    disconnectedCallback() {
      window.removeEventListener("dwains-dashboard-runtime-ready", this._runtimeReady);
      clearTimeout(this._headerTimer);
      if (this._headerObserver) this._headerObserver.disconnect();
      this._headerObserver = undefined;
      this._observedLovelaceRoot = undefined;
      if (this._hiddenHeader && this._hiddenHeader.style.display === "none") {
        this._hiddenHeader.style.display = this._previousHeaderDisplay ?? "";
      }
      this._hiddenHeader = undefined;
    }
    _findLovelaceRoot() {
      var current = this;
      for (var i = 0; i < 40 && current; i++) {
        if (current.localName === "hui-root") return current;
        var root = current.getRootNode && current.getRootNode();
        current = current.parentNode || (root && root.host) || null;
      }
      return null;
    }
    _syncHeader() {
      var lovelaceRoot = this._findLovelaceRoot();
      if (lovelaceRoot && lovelaceRoot.shadowRoot &&
          lovelaceRoot !== this._observedLovelaceRoot && window.MutationObserver) {
        if (this._headerObserver) this._headerObserver.disconnect();
        this._headerObserver = new window.MutationObserver(this._headerChanged);
        this._headerObserver.observe(lovelaceRoot.shadowRoot, { childList: true, subtree: true });
        this._observedLovelaceRoot = lovelaceRoot;
      }
      var header = lovelaceRoot && lovelaceRoot.shadowRoot && lovelaceRoot.shadowRoot.querySelector(".header");
      if (header) {
        if (header !== this._hiddenHeader) {
          this._hiddenHeader = header;
          this._previousHeaderDisplay = header.style.display;
        }
        var headerRect = header.getBoundingClientRect && header.getBoundingClientRect();
        var headerHeight = headerRect && headerRect.height || header.offsetHeight || 0;
        if (headerHeight > 0) {
          this.style.setProperty("--dd-lovelace-header-offset", headerHeight + "px");
        }
        header.style.display = "none";
        this._headerRetries = 0;
        return;
      }
      if (this.isConnected && ++this._headerRetries <= 40) {
        clearTimeout(this._headerTimer);
        this._headerTimer = setTimeout(() => this._syncHeader(), 100);
      }
    }
    _ensureNavigation() {
      if (!this.isConnected || this._navigation || !customElements.get("dwainsboard-navigation-card")) return;
      var navigation = document.createElement("dwainsboard-navigation-card");
      if (this._hass) navigation.hass = this._hass;
      this._navigationHost.replaceChildren(navigation);
      this._navigation = navigation;
    }
    // Lovelace view-layout contract:
    setConfig(config) {
      this.config = config;
    }
    set hass(h) {
      this._hass = h;
      this._ensureNavigation();
      if (this._navigation) this._navigation.hass = h;
      if (this._cards) {
        for (const c of this._cards) {
          if (c && "hass" in c) {
            try { c.hass = h; } catch (e) { reportPreloadError("failed to update a child card", e); }
          }
        }
      }
    }
    get hass() { return this._hass; }
    set narrow(n) { this._narrow = n; }
    get narrow() { return this._narrow; }
    set cards(cards) {
      this._cards = cards;
      this._render();
    }
    get cards() { return this._cards; }
    // No-ops in case HA calls LitElement-style APIs on the layout:
    requestUpdate() {}
    get updateComplete() { return Promise.resolve(true); }
    _render() {
      if (!this._wrap) return;
      this._wrap.textContent = "";
      if (this._cards) {
        for (const c of this._cards) {
          if (c) this._wrap.appendChild(c);
        }
      }
      this._ensureNavigation();
      this._syncHeader();
    }
  }
  try {
    customElements.define("dwains-dashboard-layout", DwainsDashboardLayout);
    console.info("[dwains-preload] dwains-dashboard-layout defined");
  } catch (e) {
    reportPreloadError("failed to define the initial layout", e);
  }

  // --- Self-heal errored dwains views ---------------------------------------
  // HA renders a view's custom *layout* element exactly once. The big bundle
  // (and even this preload) load asynchronously via add_extra_js_url, so on a
  // warm hard-reload HA often renders the dwains view BEFORE the layout element
  // is defined -> the whole view becomes a permanent "Configuration error". HA
  // retries undefined *cards* (whenDefined -> ll-rebuild) but NOT undefined view
  // *layouts*, so the error sticks even though the layout IS defined moments
  // later. The backend config is fine (verified: lovelace/config returns OK), so
  // all we need is to make HA rebuild the view now that the layout exists.
  //
  // We watch for hui-error-card on /dwains-dashboard and, when found, fire the
  // same `ll-rebuild` event HA uses for card recovery plus the established
  // location-changed routing event. Both are no-ops if there's nothing to fix.
  // Throttled, time-boxed, no reload.
  (function selfHeal() {
    function deep(root, tag, out, depth) {
      if (!root || depth > 14) return out;
      var nodes;
      try { nodes = root.querySelectorAll("*"); } catch (e) {
        reportPreloadError("failed to inspect a shadow root", e);
        return out;
      }
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n.localName === tag) out.push(n);
        if (n.shadowRoot) deep(n.shadowRoot, tag, out, depth + 1);
      }
      return out;
    }
    function onDwains() {
      try { return location.pathname.lastIndexOf("/dwains-dashboard", 0) === 0; }
      catch (e) {
        reportPreloadError("failed to inspect the current route", e);
        return false;
      }
    }
    // ROOT CAUSE: HA swaps window.customElements (scoped-custom-element-registry)
    // AFTER this preload's initial define, so our layout ends up on a registry HA
    // doesn't read -> diagnostic showed `customElements.get(...) === false` even
    // though we defined it. So keep (re)defining it on whatever registry is live
    // right now. A constructor can't be reused across registries, so each time we
    // define a fresh throwaway subclass (identical behaviour).
    function ensureLayoutDefined() {
      try {
        if (!customElements.get("dwains-dashboard-layout")) {
          customElements.define("dwains-dashboard-layout", class extends DwainsDashboardLayout {});
          console.warn("[dwains-preload] (re)defined layout on live registry");
        }
      } catch (e) {
        reportPreloadError("failed to define the layout on the live registry", e);
      }
    }
    // Same registry problem, for the cards: every big-bundle definition goes
    // through defineDwainsElement, which explicitly publishes its constructor in
    // the shared symbol-keyed runtime state regardless of the target registry. Here we (re)define any
    // missing class on the LIVE registry. A constructor can't be reused across
    // registries, so define a throwaway subclass. Once
    // homepage-card exists on the live registry HA's own whenDefined->ll-rebuild
    // recovers the card automatically (the rebuild below is just a backstop).
    function ensureCardsDefined() {
      var ctors = runtimeState.constructors, n = 0;
      if (!ctors) return 0;
      for (var name in ctors) {
        if (!ctors[name] || customElements.get(name)) continue;
        try {
          customElements.define(name, class extends ctors[name] {});
          if (customElements.get(name)) {
            console.warn("[dwains-preload] (re)defined " + name + " on live registry");
            n++;
          } else {
            console.warn("[dwains-preload] define did NOT stick for " + name);
          }
        } catch (e) {
          console.warn("[dwains-preload] define threw for " + name + ": " + (e && e.message));
        }
      }
      return n;
    }
    // When we just (re)defined a card while a dwains popup/settings dialog is open,
    // ask the popup to rebuild through the same composed event used by Lovelace.
    function rebuildOpenPopups() {
      var pops = deep(document, "card-tools-popup", [], 0);
      for (var i = 0; i < pops.length; i++) {
        try {
          // Once per popup instance -> never re-make in a loop.
          if (pops[i].open && !rebuiltPopups.has(pops[i])) {
            rebuiltPopups.add(pops[i]);
            pops[i].dispatchEvent(new Event("ll-rebuild", { bubbles: true, composed: true }));
            console.warn("[dwains-preload] re-made open popup card on live registry");
          }
        } catch (e) {
          reportPreloadError("failed to rebuild an open popup", e);
        }
      }
    }
    // Is this element inside a dialog/popup? (walk up through shadow boundaries)
    function inDialog(el) {
      var n = el;
      for (var i = 0; i < 40 && n; i++) {
        var ln = n.localName || "";
        if (ln === "ha-dialog" || ln === "card-tools-popup") return true;
        n = n.parentNode || (n.getRootNode && n.getRootNode() && n.getRootNode().host) || null;
      }
      return false;
    }
    // Only real, configured, connected error cards in the VIEW -- not the empty
    // placeholders inside third-party cards, and NOT cards inside a popup/dialog.
    function errorText(errorCard) {
      return (
        (errorCard.textContent || "")
        + " "
        + ((errorCard.shadowRoot && errorCard.shadowRoot.textContent) || "")
      ).trim();
    }
    function realErrorCards() {
      var all = deep(document, "hui-error-card", [], 0), out = [];
      for (var i = 0; i < all.length; i++) {
        var ec = all[i];
        if (ec.isConnected && errorText(ec) && !inDialog(ec)) out.push(ec);
      }
      return out;
    }
    var tries = 0, lastAction = 0, healActions = 0;
    function tick() {
      tries++;
      var active = onDwains() && !document.hidden;
      if (active) ensureLayoutDefined();
      if (active && ensureCardsDefined() > 0) {
        rebuildOpenPopups();
        // Late definitions (especially dwains-blueprint-card) can arrive after
        // the capped startup heal. Rebuild once when a definition was restored.
        var newlyRecoverable = realErrorCards();
        for (var recovered = 0; recovered < newlyRecoverable.length; recovered++) {
          try { newlyRecoverable[recovered].dispatchEvent(new Event("ll-rebuild", { bubbles: true, composed: true })); } catch (e) {
            reportPreloadError("failed to rebuild a newly recoverable card", e);
          }
        }
      }
      // Run only during the short startup hand-off. Later route changes and app
      // resumes trigger one event-driven registry pass without a DOM polling loop.
      if (active && healActions < 2 && tries < 6) {
        var errs = realErrorCards();
        if (errs.length && Date.now() - lastAction > 1500) {
          lastAction = Date.now();
          healActions++;
          console.warn("[dwains-preload] heal #" + healActions + ": real errors=", errs.length,
            "| layout=", !!customElements.get("dwains-dashboard-layout"),
            "| homepage-card=", !!customElements.get("homepage-card"),
            "| firstError=", errorText(errs[0]));
          for (var i = 0; i < errs.length; i++) {
            try { errs[i].dispatchEvent(new Event("ll-rebuild", { bubbles: true, composed: true })); } catch (e) {
              reportPreloadError("failed to rebuild a view error card", e);
            }
          }
          try {
            window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: true } }));
          } catch (e) {
            console.warn("[dwains-preload] route refresh failed", e);
          }
        }
      }
      // Scoped-registry replacement only occurs during HA startup. Six short,
      // bounded passes cover that hand-off without repeatedly walking HA's DOM.
      if (tries < 6) setTimeout(tick, 200);
    }
    function wake() {
      setTimeout(tick, 0);
    }
    window.addEventListener("location-changed", wake);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) wake();
    });
    tick();
  })();
})();
