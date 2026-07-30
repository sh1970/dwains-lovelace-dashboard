import { LitElement, html, css } from 'lit';
import { navigate } from './frontend-helpers';
import { fireEvent } from './card-tools-compat';
import translateEngine from './translate-engine';
import { subtleNavigationStyles } from './styles/dwains-subtle-style';
const { EventSubscriptionOwner } = require('./event-subscription-owner');
const { EventListenerOwner } = require('./event-listener-owner');
const { ReloadableLoadOwner } = require('./reloadable-load-owner');
const { hassConnectionIdentity, hasHassConnectionChanged } = require('./hass-connection');
const { websocketReadStore } = require('./websocket-read-store');
const { defineDwainsElement } = require('./custom-element-registration');
const {
  createNavigationActiveState,
  morePageRoutePath,
  navigationLocationPath,
} = require('./navigation-active-state');
const {
  MORE_PAGE_METADATA_CHANGED_EVENT,
  MORE_PAGE_SAVED_EVENT,
} = require('./more-page-events');
const navigationConfigurationCache = new WeakMap();
const navigationVisibilityOverrides = new WeakMap();

function navigationCacheScope(hass) {
  const scope = hass?.connection || hass;
  return scope && (typeof scope === 'object' || typeof scope === 'function')
    ? scope
    : undefined;
}
//Herschreven
class DwainsNavigationCard extends LitElement {
    static get styles() {
        return [css`
        :host {
            width: -webkit-fill-available;
            display: flex;
            flex-direction: column;
            background-color: var( --ha-card-background, var(--card-background-color, white) );
            height: auto;
            top: 0;
            z-index: 8;
            position: sticky;
        }
        .mainNavItems {
            flex-grow: 1;
            display: flex;
            align-items: stretch;
            padding: 0.25rem;
            justify-content: space-between;
            overflow-x: scroll;
            scrollbar-width: none;
        }
        .mainNavItems::-webkit-scrollbar {
            height: 0px;
        }
        .mainNavItems::before, .mainNavItems::after {
            content: ''; /* Insert space before the first item and after the last one */
        }
        .mainNavItems div {
            padding: 0.5rem;
            color: var(--primary-text-color);
            position: relative;
            text-align: center;
            display: grid;
            cursor: pointer;
        }
        .mainNavItems div span {
            text-transform: capitalize;
        }
        .mainNavItems div.active {
            color: var(--sidebar-selected-icon-color);
        }

        .dwains-dashboard-nav {
            display: flex;
        }
        .toggle-sidebar {
            padding: 1.35rem;
            background: var(--secondary-background-color);
            display: none;
            cursor: pointer;
        }
        .sidebar-always_hidden {
            /* User has the sidebar hidden so always show the button */
            display: block !important;
        }
        @media only screen and (max-width: 768px) {
            :host {
                position: relative;
                bottom: auto;
                top: auto;
                padding: 0 env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
            }
        }
        @media (max-width: 871px) {
            .mainNavItems div span {
                display: none;
            }
            .toggle-sidebar {
                display: block;
                padding: 0.75rem;
            }
        }
        `, subtleNavigationStyles(css)];
      }

    static get properties() {
        return {
          _hass: { type: Object },
          config: { type: Object },
          currentPath: { type: String },
          configuration: { type: Object },
          isLoading: { type: Boolean },
        };
      }

      set hass(hass) {
        const connectionChanged = hasHassConnectionChanged(this._hass, hass);
        this._hass = hass;
        const cached = navigationConfigurationCache.get(navigationCacheScope(hass));
        if (cached) {
          this.configuration = cached;
          this.isLoading = false;
        }
        if (connectionChanged && this.isConnected) {
          this._subscriptions.disconnect();
          this._subscriptions.connect();
          this.isLoading = true;
        }
        if (this.isConnected && (this.isLoading || connectionChanged)) {
          this._startNavigation(connectionChanged);
        }
      }

      constructor() {
        super();
        this.currentPath = navigationLocationPath(document.location);
        this.isLoading = true; // Start met laden aangeven
        this._subscriptions = new EventSubscriptionOwner();
        this._listeners = new EventListenerOwner();
        this._loads = new ReloadableLoadOwner((context) => this._loadConfiguration(context));
        this._navigationGeneration = 0;
        this._morePageMetadataChanged = (event) => {
          const page = event.detail?.page;
          if (!page?.foldername) return;
          const cacheScope = navigationCacheScope(this._hass);
          if (cacheScope && typeof page.show_in_navbar === 'boolean') {
            let overrides = navigationVisibilityOverrides.get(cacheScope);
            if (!overrides) {
              overrides = new Map();
              navigationVisibilityOverrides.set(cacheScope, overrides);
            }
            overrides.set(page.foldername, page.show_in_navbar);
          }
          const configuration = this.configuration || { devices: {}, more_pages: {} };
          this.configuration = {
            ...configuration,
            more_pages: {
              ...(configuration.more_pages || {}),
              [page.foldername]: {
                ...(configuration.more_pages?.[page.foldername] || {}),
                ...page,
              },
            },
          };
          if (cacheScope) {
            navigationConfigurationCache.set(cacheScope, this.configuration);
          }
          this.isLoading = false;
          this.requestUpdate();
        };
        this._routeChanged = () => {
          this.currentPath = navigationLocationPath(
            document.location,
            this.currentPath,
          );
          this.requestUpdate();
        };
      }

      connectedCallback() {
        super.connectedCallback();
        this._subscriptions.connect();
        this._listeners.listen('location-changed', window, 'location-changed', this._routeChanged);
        this._listeners.listen('popstate', window, 'popstate', this._routeChanged);
        this._listeners.listen(
          'more-page-metadata',
          window,
          MORE_PAGE_METADATA_CHANGED_EVENT,
          this._morePageMetadataChanged,
        );
        this._listeners.listen(
          'more-page-saved',
          window,
          MORE_PAGE_SAVED_EVENT,
          this._morePageMetadataChanged,
        );
        this._listeners.connect();
        if (this._hass) {
          this._startNavigation();
        }
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        this._subscriptions.disconnect();
        this._listeners.disconnect();
        this._navigationGeneration += 1;
        this._loads.invalidate();
        this._navigationPromise = undefined;
        this._navigationConnection = undefined;
        this.isLoading = true;
      }

      _startNavigation(reload = false) {
        const connection = hassConnectionIdentity(this._hass);
        if (this._navigationConnection === connection && this._navigationPromise) {
          return this._navigationPromise;
        }
        const generation = ++this._navigationGeneration;
        this._navigationConnection = connection;
        const load = reload ? this._loads.reload() : this.loadConfig();
        const pending = load
          .then(() => {
            if (!this.isConnected
              || generation !== this._navigationGeneration
              || hassConnectionIdentity(this._hass) !== connection) return undefined;
            return this._subscribeNavigation();
          })
          .catch((error) => {
            console.error('Error loading navigation:', error);
            if (generation === this._navigationGeneration) this.isLoading = false;
          })
          .finally(() => {
            if (this._navigationPromise === pending) this._navigationPromise = undefined;
          });
        this._navigationPromise = pending;
        return pending;
      }

      loadConfig() {
        return this._loads.load();
      }

      async _loadConfiguration({ isCurrent = () => true } = {}) {
        const hass = this._hass;
        const connection = hassConnectionIdentity(hass);
        const loadedConfiguration = await websocketReadStore.readPreferred(
          hass,
          { type: 'dwains_dashboard/navigation/get' },
          { type: 'dwains_dashboard/configuration/get' },
          { capability: "dashboard-read-slices" },
        );
        if (!isCurrent() || hassConnectionIdentity(this._hass) !== connection) return;
        let configuration = loadedConfiguration;
        const cacheScope = navigationCacheScope(hass);
        const overrides = cacheScope && navigationVisibilityOverrides.get(cacheScope);
        for (const [foldername, visible] of overrides || []) {
          const page = configuration.more_pages?.[foldername] || {};
          if (page.show_in_navbar === visible) {
            overrides.delete(foldername);
          } else {
            configuration = {
              ...configuration,
              more_pages: {
                ...(configuration.more_pages || {}),
                [foldername]: { ...page, foldername, show_in_navbar: visible },
              },
            };
          }
        }
        if (overrides && !overrides.size) navigationVisibilityOverrides.delete(cacheScope);
        this.configuration = configuration;
        if (cacheScope) navigationConfigurationCache.set(cacheScope, configuration);
        this.isLoading = false; // Configuratie is geladen
        this.requestUpdate(); // Vraag een update van de render-functie aan
      }

      _subscribeNavigation() {
        return this._subscriptions.subscribeEvent(
          'navigation',
          this._hass,
          "dwains_dashboard_navigation_card_reload",
          () => {
              websocketReadStore.invalidate(this._hass, {
                type: 'dwains_dashboard/configuration/get',
              });
              websocketReadStore.invalidate(this._hass, {
                type: 'dwains_dashboard/navigation/get',
              });
            this._reloadCard().catch((error) => {
              console.error('Error reloading navigation:', error);
            });
          },
        );
      }

      async _reloadCard(){
        console.log('Reloading navigation card');

        await this._loads.reload();
        this.requestUpdate();
      }

      _menuClick(ev){
        const path = ev.currentTarget.path;
        if (navigate(window, path)) {
          this.currentPath = navigationLocationPath(document.location, path);
        }
        this.requestUpdate();
    }

      _toggleSidebarClick() {
        fireEvent('hass-toggle-menu', { open: true }, this);
      }

      render() {
        const configuration = this.configuration || { devices: {}, more_pages: {} };
        const more_pages = Object.entries(configuration.more_pages || {}).sort(function (x, y) {
            let a = x[1] && x[1].sort_order ? x[1].sort_order : 99,
                b = y[1] && y[1].sort_order ? y[1].sort_order : 99;
            return a == b ? 0 : a > b ? 1 : -1;
          });
        const activeState = createNavigationActiveState({
          currentPath: navigationLocationPath(document.location, this.currentPath),
          fallbackHash: window.location.hash,
          devices: configuration.devices,
          morePages: configuration.more_pages,
        });

        return html`
            <div class="dwains-dashboard-nav">
                <div
                    @click=${this._toggleSidebarClick}
                    class="toggle-sidebar sidebar-${this._hass.dockedSidebar}"
                >
                    <ha-icon icon="${"mdi:menu"}"></ha-icon>
                </div>
                <div class="mainNavItems">
                    <div
                        class="${activeState.home ? 'active' : ''}"
                        @click=${this._menuClick}
                        .path=${"/dwains-dashboard/home"}
                    >
                        <ha-icon icon="${"mdi:home"}"></ha-icon>
                        <span>${translateEngine(this._hass, 'home.title')}</span>
                    </div>
                    <div
                        class="${activeState.devices ? 'active' : ''}"
                        @click=${this._menuClick}
                        .path=${"/dwains-dashboard/devices"}
                    >
                        <ha-icon icon="${"mdi:format-list-bulleted-type"}"></ha-icon>
                        <span>${translateEngine(this._hass, 'device.title_plural')}</span>
                    </div>
                    ${Object.entries(configuration.devices || {}).map(([k,v]) =>
                        //, v["icon"]);
                        // k = path
                        html`
                            ${v["show_in_navbar"] ? html`
                                <div
                                    class="${activeState.device(k) ? 'active' : ''}"
                                    @click=${this._menuClick}
                                    .path=${"/dwains-dashboard/devices#"+k}
                                >
                                    <ha-icon icon="${v["icon"]}"></ha-icon>
                                    <span>${translateEngine(this._hass,'device.'+k)}</span>
                                </div>`: ""}
                        `
                    )}
                    ${more_pages.map(([key, page]) =>
                        html`
                            ${page["show_in_navbar"] ? html`
                                <div
                                    class="${activeState.morePage(key) ? 'active' : ''}"
                                    @click=${this._menuClick}
                                    .path=${morePageRoutePath(key)}
                                >
                                    <ha-icon icon="${page["icon"]}"></ha-icon>
                                    <span>${page["name"]}</span>
                                </div>`: ""}
                        `
                    )}
                    <div
                        class="${activeState.morePages ? 'active' : ''}"
                        @click=${this._menuClick}
                        .path=${"/dwains-dashboard/more_page"}
                    >
                        <ha-icon icon="${"mdi:view-grid-outline"}"></ha-icon>
                        <span>${translateEngine(this._hass, 'more.title')}</span>
                    </div>
                </div>
            </div>
        `;
      }
}

defineDwainsElement('dwainsboard-navigation-card', DwainsNavigationCard);
window.dispatchEvent(new CustomEvent("dwains-dashboard-runtime-ready"));
