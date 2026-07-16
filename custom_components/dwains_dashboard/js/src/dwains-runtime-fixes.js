import { createCardElementSafe } from './helpers';

(function() {
  'use strict';
  // === Dwains reliability patches (v20) ===
  if (window.__dd_loaded_bundle__) {
    console.info('Dwains bundle already loaded; skipping second init');
  } else window.__dd_loaded_bundle__ = true;

  // --- Recover from broken HA icon cache (IndexedDB) ---
  // Known HA bug: "IDBDatabase.transaction: 'mdi-icon-store' is not a known
  // object store name" leaves hass-icon-db without its object store, which blocks
  // ALL mdi icons (area icons render blank, and a flood of these rejections can
  // stall boot). Delete the broken DB so HA recreates it. NEVER create it if it's
  // absent (an empty DB would itself trigger the bug).
  (function() {
    function resetIconDb() {
      if (window.__dd_iconDbReset) return;
      window.__dd_iconDbReset = true;
      try {
        indexedDB.deleteDatabase('hass-icon-db');
      } catch (_) {}
    }
    // Reactive: if the rejection fires anyway, clear the DB for the next load.
    try {
      window.addEventListener('unhandledrejection', function(ev) {
        try {
          var m = ev && ev.reason && (ev.reason.message || ('' + ev.reason));
          if (m && m.indexOf('mdi-icon-store') !== -1) resetIconDb();
        } catch (_) {}
      });
    } catch (_) {}
    // Proactive: at boot, if hass-icon-db exists but is missing its store, reset it.
    try {
      if (window.indexedDB && indexedDB.databases) {
        indexedDB.databases().then(function(list) {
          if (!list || !list.some(function(d) {
              return d && d.name === 'hass-icon-db';
            })) return;
          var req = indexedDB.open('hass-icon-db');
          req.onsuccess = function() {
            var broken = false;
            try {
              var db = req.result;
              broken = !db.objectStoreNames.contains('mdi-icon-store');
              db.close();
            } catch (_) {
              broken = true;
            }
            if (broken) resetIconDb();
          };
        }).catch(function() {});
      }
    } catch (_) {}
  })();

  // --- Lazy-mount wrapper: only attaches a (pre-created) card element once it
  // scrolls near the viewport, so chart-heavy areas don't fetch 20-30 histories
  // at once. Once mounted it stays mounted (pairs with sticky areas: no re-fetch). ---
  if (window.customElements && !customElements.get('dd-lazy-card')) {
    class DDLazyCard extends HTMLElement {
      set card(c) {
        if (this.__c === c) return;
        this.__c = c;
        // If already mounted (e.g. _loadData rebuilt the cards on a disable/hide/sort
        // reload and re-bound a NEW card element), swap the child in place. Otherwise
        // it will mount when scrolled into view.
        if (this.__mounted) {
          try {
            while (this.firstChild) this.removeChild(this.firstChild);
          } catch (e) {}
          if (c) this.appendChild(c);
        }
      }
      get card() {
        return this.__c;
      }
      connectedCallback() {
        if (this.__mounted) return;
        this.style.display = 'block';
        if (!this.style.minHeight) this.style.minHeight = '48px';
        if (!this.__io && 'IntersectionObserver' in window) {
          this.__io = new IntersectionObserver((entries) => {
            for (const en of entries) {
              if (en.isIntersecting) {
                this._mount();
                break;
              }
            }
          }, {
            rootMargin: '400px 0px'
          });
        }
        if (this.__io) this.__io.observe(this);
        else this._mount();
      }
      disconnectedCallback() {
        if (this.__io) this.__io.disconnect();
      }
      _mount() {
        if (this.__mounted || !this.__c) return;
        this.__mounted = true;
        if (this.__io) this.__io.disconnect();
        this.style.minHeight = '';
        this.appendChild(this.__c);
      }
    }
    try {
      customElements.define('dd-lazy-card', DDLazyCard);
    } catch (e) {}
  }

  // Robust hass getter to avoid a.mo() race
  window.__dd_get_hass = function() {
    try {
      const h = (function() {
          var el = document.querySelector('home-assistant');
          return el && el.hass ? el.hass : undefined;
        })() ||
        (function() {
          var el = document.querySelector('hc-main');
          return el && el.hass ? el.hass : undefined;
        })() ||
        (function() {
          var el = document.querySelector('home-assistant');
          return el && el.__hass ? el.__hass : undefined;
        })() ||
        window.hass ||
        undefined;
      if (h && window.__dd_patch_hass_call_ws) window.__dd_patch_hass_call_ws(h);
      return h;
    } catch (_) {
      return undefined;
    }
  };

  // Deduplicate expensive read-only websocket calls during dashboard startup.
  // HA can connect/mount DD3 cards more than once while Lovelace is still
  // settling. Without this guard, homepage/navigation/devices cards may all ask
  // for the same registries/configuration in parallel, which can delay
  // "Dwains Dashboard Started" by several seconds on larger installs.
  if (!window.__dd_patch_hass_call_ws) {
    window.__dd_ws_read_cache = window.__dd_ws_read_cache || new Map();
    window.__dd_ws_read_inflight = window.__dd_ws_read_inflight || new Map();
    window.__dd_clear_ws_read_cache = function() {
      try {
        window.__dd_ws_read_cache.clear();
        window.__dd_ws_read_inflight.clear();
      } catch (_) {}
    };
    const READ_CACHE_TTL = 3000;
    const READ_TYPES = new Set([
      'dwains_dashboard/configuration/get',
      'config/area_registry/list',
      'config/device_registry/list',
      'config/entity_registry/list',
      'config/floor_registry/list',
    ]);
    const keyForMessage = function(msg) {
      if (!msg || !READ_TYPES.has(msg.type)) return undefined;
      try {
        return JSON.stringify(msg);
      } catch (_) {
        return msg.type;
      }
    };
    window.__dd_patch_hass_call_ws = function(h) {
      try {
        if (!h || typeof h.callWS !== 'function' || h.__dd_call_ws_patched) return h;
        const originalCallWS = h.callWS.bind(h);
        h.callWS = function(msg) {
          const key = keyForMessage(msg);
          if (!key) {
            if (msg && typeof msg.type === 'string' && msg.type.startsWith('dwains_dashboard/')) {
              window.__dd_clear_ws_read_cache();
            }
            return originalCallWS(msg);
          }
          const now = Date.now();
          const cached = window.__dd_ws_read_cache.get(key);
          if (cached && now - cached.ts < READ_CACHE_TTL) return Promise.resolve(cached.value);
          const pending = window.__dd_ws_read_inflight.get(key);
          if (pending) return pending;
          const promise = originalCallWS(msg).then((result) => {
            window.__dd_ws_read_cache.set(key, { ts: Date.now(), value: result });
            return result;
          }).finally(() => {
            window.__dd_ws_read_inflight.delete(key);
          });
          window.__dd_ws_read_inflight.set(key, promise);
          return promise;
        };
        h.__dd_call_ws_patched = true;
      } catch (_) {}
      return h;
    };
  }
  try {
    window.__dd_patch_hass_call_ws(window.__dd_get_hass && window.__dd_get_hass());
  } catch (_) {}

  // Reliable loader for card helpers with retries/backoff
  if (!window.__dd_wait_card_helpers) window.__dd_wait_card_helpers = async function(maxTries = 20) {
    for (let i = 0; i < maxTries; i++) {
      try {
        if (window.loadCardHelpers) {
          const h = await window.loadCardHelpers();
          if (h && typeof h.createCardElement === 'function') return h;
        }
      } catch (_) {}
      await new Promise(r => setTimeout(r, i < 5 ? 100 : 300));
    }
    throw new Error('Card helpers not loaded');
  };

  // Close parent ha-dropdown (HA 2026 menu behavior)
  if (!window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown = function(ev) {
    try {
      let dd = null;
      const p = ev && typeof ev.composedPath === 'function' ? ev.composedPath() : [];
      if (Array.isArray(p)) dd = p.find((el) => el && el.localName === 'ha-dropdown') || null;
      if (!dd && ev && ev.currentTarget && ev.currentTarget.closest) dd = ev.currentTarget.closest('ha-dropdown');
      if (!dd && ev && ev.target && ev.target.closest) dd = ev.target.closest('ha-dropdown');
      if (dd) {
        if (typeof dd.close === 'function') dd.close();
        else if ('open' in dd) dd.open = false;
        else dd.removeAttribute('open');
      }
    } catch (_) {}
  };

  // Intercept element registration to patch dwains-homepage-card at define-time

  // Adapt card-mod applyToElement API across versions without touching call sites
  try {
    customElements.whenDefined('card-mod').then(function() {
      try {
        var cm = window.cardMod;
        if (cm && typeof cm.applyToElement === 'function') {
          var orig = cm.applyToElement;
          if (!cm.__dd_wrapped) {
            cm.applyToElement = function() {
              if (orig.length <= 3) {
                // New API: (el, style, options)
                var el = arguments[0],
                  style = arguments[1],
                  opts = arguments[2] || {};
                return orig.call(cm, el, style, opts);
              } else {
                // Old API: (el, tag, style, options, path, recursive)
                return orig.apply(cm, arguments);
              }
            };
            cm.__dd_wrapped = true;
          }
        }
      } catch (e) {}
    });
  } catch (e) {}

  (function() {
    const __orig_define__ = customElements.define.bind(customElements);
    customElements.define = function(name, ctor, opts) {
      if ((name === 'dwains-homepage-card' || name === 'homepage-card') && ctor && ctor.prototype && !ctor.prototype.__dd_defined_patched) {
        try {
          const P = ctor.prototype;

          const __dd_set_hass_safe = (target, h) => {
            try {
              if (target) target.hass = h;
            } catch (_) {}
          };
          const __dd_propagate = (self, h) => {
            try {
              const kids = ['card', 'badgesCard', 'roomsCard', 'favoritesCard', 'personsCard', 'houseInfoCard', 'devicesCard', 'areasCard', 'headerCard', 'footerCard', 'header', 'bodyCard', 'servicesCard', 'shortcutsCard', 'chipsCard'];
              for (const k of kids) {
                const v = self[k];
                if (!v) continue;
                if (Array.isArray(v)) {
                  for (const c of v) {
                    __dd_set_hass_safe(c, h);
                  }
                } else {
                  __dd_set_hass_safe(v, h);
                }
              }
              // Sweep any arrays/objects on instance for {hass} or nested .card/.badgesCard
              for (const key of Object.keys(self)) {
                const val = self[key];
                if (Array.isArray(val)) {
                  for (const item of val) {
                    if (!item) continue;
                    if ('hass' in item) __dd_set_hass_safe(item, h);
                    if (item.card) __dd_set_hass_safe(item.card, h);
                    if (item.badgesCard) __dd_set_hass_safe(item.badgesCard, h);
                  }
                } else if (val && typeof val === 'object') {
                  if ('hass' in val) __dd_set_hass_safe(val, h);
                  if (val.card) __dd_set_hass_safe(val.card, h);
                  if (val.badgesCard) __dd_set_hass_safe(val.badgesCard, h);
                }
              }
            } catch (_) {}
          };

          // Safe hass setter
          const desc = Object.getOwnPropertyDescriptor(P, 'hass');
          const oldSet = desc && desc.set;
          Object.defineProperty(P, 'hass', {
            configurable: true,
            enumerable: true,
            set(h) {
              try {
                this._hass = h;
              } catch (_) {}
              try {
                __dd_propagate(this, h);
              } catch (_) {}
              try {
                oldSet && oldSet.call(this, h);
              } catch (_) {}
            }
          });

          // Safe _update_hass
          const oldUpd = P._update_hass;
          P._update_hass = function(h) {
            try {
              this._hass = h;
            } catch (_) {}
            try {
              __dd_propagate(this, h);
            } catch (_) {}
            try {
              oldUpd && oldUpd.call(this, h);
            } catch (_) {}
          };

          // Safe createCardElement2 waiting for helpers
          const oldC2 = P.createCardElement2;
          P.createCardElement2 = async function(cfg) {
            const helpers = await (window.__dd_wait_card_helpers ? window.__dd_wait_card_helpers() : window.loadCardHelpers());
            let card;
            try {
              card = await createCardElementSafe(helpers, cfg, this._hass || (window.__dd_get_hass && window.__dd_get_hass()));
            } catch (err) {
              let fb = null;
              if (cfg) {
                if (cfg.entity) fb = {
                  type: 'entities',
                  entities: [cfg.entity]
                };
                else if (Array.isArray(cfg.entities) && cfg.entities.length) fb = {
                  type: 'entities',
                  entities: cfg.entities
                };
                else if (cfg.card && (cfg.card.entity || (Array.isArray(cfg.card.entities) && cfg.card.entities.length)))
                  fb = {
                    type: 'entities',
                    entities: cfg.card.entities ? cfg.card.entities : [cfg.card.entity]
                  };
              }
              card = await createCardElementSafe(helpers, fb || {
                 type: 'entities',
                 entities: []
              }, this._hass || (window.__dd_get_hass && window.__dd_get_hass()));
            }
            const ha = this._hass || (window.__dd_get_hass && window.__dd_get_hass());
            if (ha) try {
              card.hass = ha;
            } catch (_) {}
            return card;
          };

          ctor.prototype.__dd_defined_patched = true;
        } catch (e) {
          console.warn('dwains-homepage-card define-time patch failed', e);
        }
      }
      return __orig_define__(name, ctor, opts);
    };
  })();

  if (typeof customElements !== 'undefined') {
    const originalDefine = customElements.define;
    // IMPORTANT: only guard Dwains' OWN elements against double-definition.
    // HA core and every other element must pass straight through to the native
    // define, untouched (no skip, no swallowed errors). HA's boot awaits
    // customElements.whenDefined() on core elements, so if this shim ever drops
    // or hides one of those registrations the app hangs forever on the logo.
    customElements.define = function(name, constructor, options) {
      var isDwains = (typeof name === 'string') && (name.indexOf('dwains-') === 0 || name === 'homepage-card' || name === 'devices-card' || name === 'more-page-card' || name === 'more-pages-card');
      if (isDwains) {
        // Stash the class so the preload can (re)define it on whatever
        // customElements registry HA ends up using. HA swaps window.customElements
        // (scoped-custom-element-registry) and the bundle's define can land on a
        // stale registry -> "Custom element doesn't exist: homepage-card".
        try { (window.__dd_ctors = window.__dd_ctors || {})[name] = constructor; } catch (e) {}
        // ALSO keep the RAW constructor (first write wins) in a separate map the
        // preload's prototype-level capture never overwrites. The prototype patch
        // sees the polyfill's WRAPPER class (no setConfig on its own prototype),
        // which can't be subclassed into an upgradeable element. This instance-level
        // override sees the real class first.
        try { var O = (window.__dd_orig = window.__dd_orig || {}); if (!O[name]) O[name] = constructor; } catch (e) {}
        if (customElements.get(name)) return;
        try {
          return originalDefine.call(this, name, constructor, options);
        } catch (e) {
          console.error('[dwains] define failed:', name, e);
        }
        return;
      }
      return originalDefine.call(this, name, constructor, options);
    };
  }

  // Error handler: LOG everything, suppress NOTHING (diagnostics).
  window.addEventListener('error', function(e) {
    if (e.message && e.message.includes('Illegal constructor')) {
      console.error('[dwains] Illegal constructor (NOT suppressed):', e.message, (e.filename || '') + ':' + (e.lineno || ''));
    }
  }, true);
  window.addEventListener('unhandledrejection', function(e) {
    try {
      var __m = (e.reason && (e.reason.message || e.reason)) || '';
      // Benign HA websocket teardown/reconnect noise ("Subscription not found"):
      // swallow it so it isn't an "Uncaught (in promise)" error. The dwains source
      // (notification card unsubscribe) is already guarded; this covers reconnects
      // and any other card that triggers the same harmless rejection.
      // NOTE: 'invalid state' is intentionally checked together with HA-specific
      // strings to avoid suppressing unrelated errors from other custom cards.
      var __isHaWebsocketNoise = (
        __m.indexOf('Subscription not found') !== -1 ||
        __m.indexOf('Transition was aborted') !== -1
      );
      var __isInvalidState = (
        __m.indexOf('invalid state') !== -1 &&
        (e.reason && e.reason.stack && (
          e.reason.stack.indexOf('home-assistant') !== -1 ||
          e.reason.stack.indexOf('hass') !== -1 ||
          e.reason.stack.indexOf('connection') !== -1
        ) || __isHaWebsocketNoise)
      );
      if (typeof __m === 'string' && (__isHaWebsocketNoise || __isInvalidState)) {
        e.preventDefault();
        return;
      }
      console.error('[dwains] unhandledrejection:', __m || e);
    } catch (_) {}
  });

  console.log('Custom elements workaround loaded');
})();
