import { popUp } from "./dwains-popup";
import { fireEvent } from "./card-tools-compat";
import { mdiDotsVertical, mdiPencil } from "@mdi/js";
import { navigate } from "./frontend-helpers";
import { css, html, LitElement } from 'lit';
import { createCardElementSafe } from './helpers';
import translateEngine from './translate-engine';
import { subtleBackButtonStyles, subtleDetailViewStyles } from './styles/dwains-subtle-style';
const { EventSubscriptionOwner } = require('./event-subscription-owner');
const { EventListenerOwner } = require('./event-listener-owner');
const { TimerOwner } = require('./timer-owner');
const { PopupOpenScheduler } = require('./popup-open-scheduler');
const { ReloadableLoadOwner } = require('./reloadable-load-owner');
const { hassConnectionIdentity, hasHassConnectionChanged } = require('./hass-connection');
const { websocketReadStore } = require('./websocket-read-store');
const { loadCardHelpers } = require('./card-helpers-loader');
const { defineDwainsElement } = require('./custom-element-registration');
const { MORE_PAGE_SAVED_EVENT } = require('./more-page-events');
const { closeParentDropdown } = require('./dropdown-controller');
//Herschreven
class MorePageCard extends LitElement {

    static get styles() {
        return [css`
        #more-page {
          padding: 1rem;
        }
        .justify-between {
          justify-content: space-between;
        }
        .flex {
            display: flex;
        }
        .mb-2 {
            margin-bottom: 0.5rem;
        }
        .font-semibold {
          font-weight: 600;
        }
        .text-lg {
            font-size: 1.125rem;
            line-height: 1.75rem;
        }
        .capitalize {
          text-transform: capitalize;
        }
        .sticky {
          position: sticky;
        }
        .z-30 {
          z-index: 30;
        }
        .bottom-0 {
          bottom: 0;
        }
        .text-right {
          text-align: right;
        }
        .h-8 {
          height: 2rem;
        }
        .w-8 {
          width: 2rem;
        }
        .page-actions {
          display: flex;
          align-items: center;
        }
        .page-state {
          display: flex;
          min-height: 8rem;
          align-items: center;
          justify-content: center;
          color: var(--secondary-text-color);
        }
        .page-error {
          color: var(--error-color);
        }
      `, subtleBackButtonStyles(css), subtleDetailViewStyles(css)]
    }

    static get properties() {
        return {
            card: {},
            _hass: {},
            configuration: {},
            _cardLoading: { state: true },
            _cardError: { state: true },
            _configurationError: { state: true },
        };
    }

    async loadHelpers() {
        this.cardHelpers = await loadCardHelpers();
        return this.cardHelpers;
    }


    /**
     * @param {any} hass
     */
    constructor() {
        super();
        this._subscriptions = new EventSubscriptionOwner();
        this._listeners = new EventListenerOwner();
        this._timers = new TimerOwner();
        this._popupOpens = new PopupOpenScheduler(this._timers);
        this._loads = new ReloadableLoadOwner((context) => this._loadConfiguration(context));
        this._configReady = false;
        this._forcePageRead = false;
        this._savedPageChanged = (event) => {
            const page = event.detail?.page;
            if (!page || page.foldername !== this.foldername) return;
            this._pendingPage = page;
            this._loads.reload().catch((error) => {
                console.error("Failed to render the saved More Page:", error);
            });
        };
    }

    set hass(hass) {
        const connectionChanged = hasHassConnectionChanged(this._hass, hass);
        this._hass = hass;
        if (this.card != null && this.card.length !== 0) this.card.hass = hass;
        if (connectionChanged && this.isConnected) {
            this._subscriptions.disconnect();
            this._subscriptions.connect();
            this._startedHass = undefined;
        }
        void this._startIfReady(connectionChanged);
    }

    setConfig(config) {
        this.name = config.name;
        this.foldername = config.foldername;
        this.icon = config.icon;
        this.showInNavbar = config.show_in_navbar ?? config.showInNavbar;
        this.cardConfig = config.card;
        this.card = undefined;
        this._cardError = undefined;
        this._cardLoading = true;
        this._configReady = true;
        void this._startIfReady();
    }

    async connectedCallback() {
        super.connectedCallback();
        this._subscriptions.connect();
        this._listeners.listen(
            "saved-more-page",
            window,
            MORE_PAGE_SAVED_EVENT,
            this._savedPageChanged,
        );
        this._listeners.connect();
        this._timers.connect();

        await this._startIfReady();
    }

    async _startIfReady(reload = false) {
        const connection = hassConnectionIdentity(this._hass);
        if (!this.isConnected || !this._hass || !this._configReady || !this.foldername || this._startedHass === connection) return;
        const hass = this._hass;
        this._startedHass = connection;
        try {
            if (reload) await this._loads.reload();
            else await this._loadData();
            if (this.isConnected && hassConnectionIdentity(this._hass) === connection) {
                await this._subscribeReload();
            }
        } catch (error) {
            this._configurationError = error;
            this._cardError = error;
            this._cardLoading = false;
            this.requestUpdate();
            console.error('Error starting more page card:', error);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._startedHass = undefined;
        this._loads.invalidate();
        this._subscriptions.disconnect();
        this._listeners.disconnect();
        this._timers.disconnect();
    }

    _subscribeReload() {
        return this._subscriptions.subscribeEvent(
            'more-page',
            this._hass,
            "dwains_dashboard_more_pages_reload",
            () => {
                websocketReadStore.invalidate(this._hass, {
                    type: 'dwains_dashboard/configuration/get',
                });
                websocketReadStore.invalidate(this._hass, {
                    type: 'dwains_dashboard/more_page/get',
                    foldername: this.foldername,
                });
                this._reloadCard().catch((error) => {
                    console.error('Error reloading more page card:', error);
                });
            },
        );
    }

    async _reloadCard() {
        this._forcePageRead = true;
        try {
            await this._loads.reload();
            this.requestUpdate();
        } finally {
            this._forcePageRead = false;
        }
    }

    _loadData() {
        return this._loads.load();
    }

    async _loadConfiguration({ isCurrent = () => true } = {}) {
        const pendingPage = this._pendingPage;
        // The embedded Lovelace config is only a bootstrap value and may still
        // represent an older dashboard cache after a browser hard reload.
        // Always hydrate the page from its authoritative disk-backed endpoint.
        const page = pendingPage || await websocketReadStore.readPreferred(
            this._hass,
            { type: 'dwains_dashboard/more_page/get', foldername: this.foldername },
            { type: 'dwains_dashboard/configuration/get' },
            {
              capability: "dashboard-read-slices",
              selectFallback: (configuration) => configuration?.more_pages?.[this.foldername],
            },
        );
        if (!page) {
          throw new Error(`More page "${this.foldername}" has no card configuration`);
        }
        if (!isCurrent()) return;
        this.cardHelpers = await this.loadHelpers();
        if (!isCurrent()) return;
        const cardConfig = Array.isArray(page.card)
          ? { type: "vertical-stack", cards: page.card }
          : page.card;
        const card = await this.createCardElement2(cardConfig);
        if (!isCurrent()) return;
        this.name = page.name;
        this.icon = page.icon;
        this.showInNavbar = page.show_in_navbar;
        this.cardConfig = page.card;
        this.configuration = { more_pages: { [page.foldername]: page } };
        this.card = card;
        this._cardError = undefined;
        this._configurationError = undefined;
        this._cardLoading = false;
        if (this._pendingPage === pendingPage) this._pendingPage = undefined;

    }

    async createCardElement2(config) {
        const element = await createCardElementSafe(this.cardHelpers, config, this._hass);
        element.hass = this._hass; // Zorg ervoor dat `this._hass` correct is geïnitialiseerd
        return element;
    }

    _handleEditMorePageClicked(ev) {
        closeParentDropdown(ev);
        const more_page = this.foldername;
        const pageConfiguration = this.configuration?.more_pages?.[more_page] || {};
        const name = pageConfiguration.name || this.name || "";
        const icon = pageConfiguration.icon || this.icon || "";
        const showInNavbar = pageConfiguration.show_in_navbar ?? !!this.showInNavbar;
        this._popupOpens.schedule(() => {
            fireEvent("hass-more-info", { entityId: "" }, this);
            popUp(this._hass.localize("ui.components.entity.entity-picker.edit"), {
                type: "custom:dwains-edit-more-page-card",
                more_page: more_page,
                name: name,
                icon: icon,
                showInNavbar: showInNavbar,
                foldername: more_page,
                mode: "editor-element",
                cardConfig: this.cardConfig,
            }, true, '');
        });
    }

    _backButtonClick() {
        navigate(window, "/dwains-dashboard/more_page");
    }

    render() {
        return html`
          <div id="more-page" class="dd-dashboard-style-refresh">
            <div class="dd-detail-view-header flex justify-between">
              <div class="dd-detail-view-title">
                <h2 class="font-semibold text-lg capitalize">
                  ${this.name}
                </h2>
                <span class="text-gray">
                  ${translateEngine(this._hass, 'more.title_plural')}
                </span>
              </div>
              <div class="page-actions">
                ${this._hass?.user?.is_admin ? html`
                <ha-dropdown
                  class="ha-icon-overflow-menu-overflow"
                  corner="BOTTOM_END"
                  absolute
                >
                  <ha-icon-button
                    label=${this._hass.localize("ui.common.overflow_menu")}
                    .path=${mdiDotsVertical}
                    slot="trigger"
                  ></ha-icon-button>
                  <ha-list-item
                    graphic="icon"
                    @click=${this._handleEditMorePageClicked}
                  >
                    <div slot="graphic">
                      <ha-svg-icon .path=${mdiPencil}></ha-svg-icon>
                    </div>
                    ${this._hass.localize("ui.components.entity.entity-picker.edit")}
                  </ha-list-item>
                </ha-dropdown>
                `: ""}
              </div>
            </div>

            ${this._cardLoading ? html`
              <div class="page-state"><ha-circular-progress active></ha-circular-progress></div>
            ` : this._cardError ? html`
              <div class="page-state page-error">${this._cardError.message || this._cardError}</div>
            ` : this.card || html`
              <div class="page-state">No page content is configured.</div>
            `}

            <div class="sticky z-30 bottom-0 text-right">
              <div @click=${this._backButtonClick} class="back-button">
                <div class="button">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        `;
    }
}
defineDwainsElement("more-page-card", MorePageCard);
