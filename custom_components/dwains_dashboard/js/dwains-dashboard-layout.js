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
  if (!window.customElements) return;

  // Capture EVERY dwains element's class at the registry prototype level, before
  // the big bundle runs. HA's scoped-custom-element-registry means the bundle may
  // define elements on a registry that HA's createCardElement / hui-view doesn't
  // read ("Custom element doesn't exist" / "setConfig is not a function"). The
  // prototype.define is shared by all registry instances, so patching it here
  // records the real class no matter which registry the bundle targets -- giving
  // the self-heal below the class it needs to (re)define on the live registry.
  try {
    var REG = window.CustomElementRegistry && window.CustomElementRegistry.prototype;
    if (REG && REG.define && !REG.__dd_capture) {
      var _origDefine = REG.define;
      REG.define = function (name, ctor, opts) {
        try {
          if (typeof name === "string" &&
              (name.indexOf("dwains") === 0 || name === "homepage-card" ||
               name === "devices-card" || name === "more-page-card" || name === "more-pages-card")) {
            (window.__dd_ctors = window.__dd_ctors || {})[name] = ctor;
          }
        } catch (e) {}
        return _origDefine.call(this, name, ctor, opts);
      };
      REG.__dd_capture = true;
    }
  } catch (e) {}

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
        '#dwains_dashboard{margin:0 auto;font-family:"Open Sans",sans-serif;padding-top:10px;padding-bottom:50px}' +
        "@media only screen and (max-width:768px),only screen and (max-width:1800px) and (hover:none){" +
        "#dwains_dashboard{padding-top:1px;margin-top:-55px}}";
      sr.appendChild(style);
      this._wrap = document.createElement("div");
      this._wrap.id = "dwains_dashboard";
      sr.appendChild(this._wrap);
    }
    // Lovelace view-layout contract:
    setConfig(config) {
      this._config = config;
    }
    set hass(h) {
      this._hass = h;
      if (this._cards) {
        for (const c of this._cards) {
          if (c && "hass" in c) {
            try { c.hass = h; } catch (e) {}
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
    }
  }
  try {
    customElements.define("dwains-dashboard-layout", DwainsDashboardLayout);
    console.info("[dwains-preload] dwains-dashboard-layout defined");
  } catch (e) {}

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
  // We watch for hui-error-card on /dwains-dashboard and, when found, (1) fire
  // the same `ll-rebuild` event HA uses internally for card recovery, and (2)
  // force hui-root to re-create the active view via `_selectView(idx, true)`.
  // Both are no-ops if there's nothing to fix. Throttled, time-boxed, no reload.
  (function selfHeal() {
    function deep(root, tag, out, depth) {
      if (!root || depth > 14) return out;
      var nodes;
      try { nodes = root.querySelectorAll("*"); } catch (e) { return out; }
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (n.localName === tag) out.push(n);
        if (n.shadowRoot) deep(n.shadowRoot, tag, out, depth + 1);
      }
      return out;
    }
    function huiRoot() {
      try {
        var e = document.querySelector("home-assistant");
        e = e && e.shadowRoot && e.shadowRoot.querySelector("home-assistant-main");
        e = e && e.shadowRoot;
        var ppr = e && e.querySelector("ha-drawer partial-panel-resolver");
        e = (ppr && ppr.shadowRoot) || e;
        e = e && e.querySelector("ha-panel-lovelace");
        e = e && e.shadowRoot && e.shadowRoot.querySelector("hui-root");
        return e || null;
      } catch (e) { return null; }
    }
    function onDwains() {
      try { return location.pathname.lastIndexOf("/dwains-dashboard", 0) === 0; }
      catch (e) { return false; }
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
      } catch (e) {}
    }
    // Same registry problem, for the cards: the big bundle defines homepage-card /
    // devices-card / etc. but can land on a stale registry ("Custom element doesn't
    // exist: homepage-card"). It stashes every dwains class in window.__dd_ctors;
    // here we (re)define any that are missing on the LIVE registry. A constructor
    // can't be reused across registries, so define a throwaway subclass. Once
    // homepage-card exists on the live registry HA's own whenDefined->ll-rebuild
    // recovers the card automatically (the rebuild below is just a backstop).
    function ensureCardsDefined() {
      var ctors = window.__dd_ctors, n = 0;
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
    // its card was created against the stale registry ("setConfig is not a function")
    // -> re-make it now that the class exists on the live registry. card-tools-popup
    // builds its card in _makeCard() (also bound to the dialog's @ll-rebuild).
    function rebuildOpenPopups() {
      var pops = deep(document, "card-tools-popup", [], 0);
      for (var i = 0; i < pops.length; i++) {
        try {
          // Once per popup instance -> never re-make in a loop.
          if (pops[i].open && !pops[i].__dd_remade && typeof pops[i]._makeCard === "function") {
            pops[i].__dd_remade = true;
            pops[i]._makeCard();
            console.warn("[dwains-preload] re-made open popup card on live registry");
          }
        } catch (e) {}
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
    // placeholders inside third-party cards, and NOT cards inside a popup/dialog
    // (the settings/edit popup has a known unfixable scoped-registry error; healing
    // it just spams and triggers @ll-rebuild loops). hui-error-card config can be
    // {error: ...} OR {message: ...} ("Custom element doesn't exist: ..."), both.
    function realErrorCards() {
      var all = deep(document, "hui-error-card", [], 0), out = [];
      for (var i = 0; i < all.length; i++) {
        var ec = all[i], cfg = ec._config || {};
        if (ec.isConnected && (cfg.error || cfg.message || cfg.origConfig || (ec.textContent || "").trim()) && !inDialog(ec)) out.push(ec);
      }
      return out;
    }
    var tries = 0, lastAction = 0, healActions = 0;
    function tick() {
      tries++;
      ensureLayoutDefined();
      if (ensureCardsDefined() > 0) {
        rebuildOpenPopups();
        // Late definitions (especially dwains-blueprint-card) can arrive after
        // the capped startup heal. Rebuild once when a definition was restored.
        var newlyRecoverable = realErrorCards();
        for (var recovered = 0; recovered < newlyRecoverable.length; recovered++) {
          try { newlyRecoverable[recovered].dispatchEvent(new Event("ll-rebuild", { bubbles: true, composed: true })); } catch (e) {}
        }
      }
      // The view-level config-error self-heal is only needed shortly after load;
      // the registry ensure above must run forever (settings/popup cards can be
      // defined lazily long after load, when their dialog is first opened).
      // HARD CAP on rebuild actions so a card that can't be recovered (e.g. a
      // popup error card) never turns into an infinite rebuild loop.
      if (healActions < 6 && tries < 120 && onDwains()) {
        var errs = realErrorCards();
        if (errs.length && Date.now() - lastAction > 1500) {
          lastAction = Date.now();
          healActions++;
          console.warn("[dwains-preload] heal #" + healActions + ": real errors=", errs.length,
            "| layout=", !!customElements.get("dwains-dashboard-layout"),
            "| homepage-card=", !!customElements.get("homepage-card"),
            "| editCard=", !!customElements.get("dwains-edit-homepage-header-card"),
            "| firstError=", (errs[0]._config && (errs[0]._config.message || errs[0]._config.error)));
          for (var i = 0; i < errs.length; i++) {
            try { errs[i].dispatchEvent(new Event("ll-rebuild", { bubbles: true, composed: true })); } catch (e) {}
          }
          try {
            var hr = huiRoot();
            if (hr && typeof hr._selectView === "function") {
              var idx = hr._curView != null ? hr._curView : (hr.___curView != null ? hr.___curView : 0);
              hr._selectView(idx, true);
            }
          } catch (e) {}
        }
      }
      // Heartbeat forever: fast burst at first, then a cheap steady poll so a
      // lazily-defined settings/popup card still gets moved to the live registry.
      setTimeout(tick, tries < 15 ? 200 : (tries < 120 ? 600 : 1500));
    }
    tick();
  })();
})();
