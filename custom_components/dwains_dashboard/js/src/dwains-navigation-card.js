import { LitElement, html, css } from 'lit';
import { navigate } from 'custom-card-helpers';
import translateEngine from './translate-engine';
import { subtleNavigationStyles } from './styles/dwains-subtle-style';
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
            position: fixed;
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
        /* bottom: 0; */
        /* padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left); */
        @media only screen and (max-width: 768px) {
            :host {
                position: sticky;
                bottom: 0;
                top: auto;
                padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
            }
        }
        @media only screen and (max-width: 1800px) and (hover: none) {
            :host {
                position: sticky;
                bottom: 0;
                top: auto;
                padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
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
        const connectionChanged = this._hass?.connection !== hass?.connection;
        this._hass = hass;
        if (connectionChanged) {
          this._unsubscribe();
        }
        if (this.isConnected && (this.isLoading || connectionChanged)) {
          this.loadConfig(true);
        }
      }

      constructor() {
        super();
        this.currentPath = document.location.pathname;
        this.isLoading = true; // Start met laden aangeven
      }

      connectedCallback() {
        super.connectedCallback();
        this.currentPath = document.location.pathname;
        if (this._hass) {
          this.loadConfig(!this.configuration);
        }
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        this._unsubscribe();
        this.isLoading = !this.configuration;
      }

      _unsubscribe() {
        if(this._unsub){
          Promise.resolve(this._unsub()).catch(() => {});
          this._unsub = undefined;
        }
        this._subscriptionConnection = undefined;
      }

      async loadConfig(force = false) {
        if (!this._hass || !this._hass.connection) return false;
        if (this._loadConfigPromise) return this._loadConfigPromise;
        if (!force && this.configuration && this._subscriptionConnection === this._hass.connection) {
          this.isLoading = false;
          return true;
        }

        const hass = this._hass;
        const connection = hass.connection;
        if (this._subscriptionConnection !== connection) {
          this._unsubscribe();
        }
        this.isLoading = !this.configuration;
        this._loadConfigPromise = (async () => {
          try {
            const configuration = await hass.callWS({
              type: 'dwains_dashboard/configuration/get'
            });
            if (this._hass?.connection !== connection) return false;
            this.configuration = configuration;
            this.isLoading = false; // Configuratie is geladen
            this.requestUpdate(); // Vraag een update van de render-functie aan
            if(!this._unsub && this.isConnected){
              const unsubscribe = await connection.subscribeEvents(
                () => this._reloadCard(),
                "dwains_dashboard_navigation_card_reload"
              );
              if (this._hass?.connection === connection && this.isConnected) {
                this._unsub = unsubscribe;
                this._subscriptionConnection = connection;
              } else {
                Promise.resolve(unsubscribe()).catch(() => {});
              }
            }
            this._loadRetries = 0;
            return true;
          } catch (error) {
            console.error('Error loading configuration:', error);
            this.isLoading = !this.configuration;
            if (this.isConnected && (this._loadRetries = (this._loadRetries || 0) + 1) <= 20) {
              setTimeout(() => this.loadConfig(true), this._loadRetries <= 5 ? 150 : 300);
            }
            return false;
          }
        })().finally(() => {
          this._loadConfigPromise = undefined;
        });
        return this._loadConfigPromise;
      }

      async ensureReady() {
        this.currentPath = document.location.pathname;
        return this.loadConfig(true);
      }

      async _reloadCard(){
        console.log('Reloading navigation card');

        await this.loadConfig(true);
        this.requestUpdate();
      }

      _menuClick(ev){
        const path = ev.currentTarget.path;
        navigate(window, path);
        this.currentPath = path;
    }

      _toggleSidebarClick() {
        document.querySelector('body > home-assistant').shadowRoot.querySelector('home-assistant-main').dispatchEvent(new CustomEvent('hass-toggle-menu', {detail: {open: true}}));
      }

      render() {
        // Controleer of we nog aan het laden zijn of als er geen configuratie is
        if (this.isLoading || !this.configuration) {
            return html``; // Laadindicator of een alternatieve tekst
        }
        const more_pages = Object.entries(this.configuration['more_pages']).sort(function (x, y) {
            let a = x[1] && x[1].sort_order ? x[1].sort_order : 99,
                b = y[1] && y[1].sort_order ? y[1].sort_order : 99;
            return a == b ? 0 : a > b ? 1 : -1;
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
                        class="${document.location.pathname == '/dwains-dashboard/home' ? 'active' : ''}"
                        @click=${this._menuClick}
                        .path=${"/dwains-dashboard/home"}
                    >
                        <ha-icon icon="${"mdi:home"}"></ha-icon>
                        <span>${translateEngine(this._hass, 'home.title')}</span>
                    </div>
                    <div
                        class="${document.location.pathname == '/dwains-dashboard/devices' && !window.location.hash ? 'active' : ''}"
                        @click=${this._menuClick}
                        .path=${"/dwains-dashboard/devices"}
                    >
                        <ha-icon icon="${"mdi:format-list-bulleted-type"}"></ha-icon>
                        <span>${translateEngine(this._hass, 'device.title_plural')}</span>
                    </div>
                    ${Object.entries(this.configuration['devices']).map(([k,v]) =>
                        //, v["icon"]);
                        // k = path
                        html`
                            ${v["show_in_navbar"] ? html`
                                <div
                                    class="${document.location.pathname == '/dwains-dashboard/devices' && window.location.hash == '#'+k ? 'active' : ''}"
                                    @click=${this._menuClick}
                                    .path=${"/dwains-dashboard/devices#"+k}
                                >
                                    <ha-icon icon="${v["icon"]}"></ha-icon>
                                    <span>${translateEngine(this._hass,'device.'+k)}</span>
                                </div>`: ""}
                        `
                    )}
                    ${Object.entries(more_pages).map(([k,v]) =>
                        //, v["icon"]);
                        // k = path
                        html`
                            ${v[1]["show_in_navbar"] ? html`
                                <div
                                    class="${document.location.pathname == '/dwains-dashboard/more_page_'+v[0].toLowerCase().replace("'", "_").replace(" ", "_") ? 'active' : ''}"
                                    @click=${this._menuClick}
                                    .path=${"/dwains-dashboard/more_page_"+v[0].toLowerCase().replace("'", "_").replace(" ", "_")}
                                >
                                    <ha-icon icon="${v[1]["icon"]}"></ha-icon>
                                    <span>${v[1]["name"]}</span>
                                </div>`: ""}
                        `
                    )}
                    <div
                        class="${document.location.pathname == '/dwains-dashboard/more_page' ? 'active' : ''}"
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

customElements.define('dwainsboard-navigation-card', DwainsNavigationCard);
