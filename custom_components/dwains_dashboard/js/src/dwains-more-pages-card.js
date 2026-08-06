import { hass } from "./hass-compat";
import {
  navigate
} from './frontend-helpers';
import { popUp } from "./dwains-popup";
import { fireEvent } from "./card-tools-compat";
import { mdiDotsVertical, mdiNotePlus, mdiCog, mdiPencil } from "@mdi/js";
import { css, html, LitElement } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import translateEngine from './translate-engine';
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';
import { subtleMorePagesStyles } from './styles/dwains-subtle-style';
const { EventSubscriptionOwner } = require('./event-subscription-owner');
const { TimerOwner } = require('./timer-owner');
const { PopupOpenScheduler } = require('./popup-open-scheduler');
const { ReloadableLoadOwner } = require('./reloadable-load-owner');
const { hassConnectionIdentity, hasHassConnectionChanged } = require('./hass-connection');
const { websocketReadStore } = require('./websocket-read-store');
const { closeParentDropdown } = require('./dropdown-controller');
const { defineDwainsElement } = require('./custom-element-registration');
const { dispatchMorePageMetadataChanged } = require('./more-page-events');
const morePagesEditModes = new WeakMap();

function morePagesEditModeScope(hassInstance) {
  const scope = hassInstance?.connection || hassInstance;
  return scope && (typeof scope === 'object' || typeof scope === 'function')
    ? scope
    : undefined;
}

class MorePagesCard extends LitElement {
        static get properties() {
          return {
            configuration: {},
            editMode: {},
            _loading: { state: true },
            _loadError: { state: true },
            _actionError: { state: true },
            _sortError: { state: true },
          };
        }

        /**
         * @param {any} hass
         */
        constructor() {
          super();
          this._subscriptions = new EventSubscriptionOwner();
          this._timers = new TimerOwner();
          this._popupOpens = new PopupOpenScheduler(this._timers);
          this._loads = new ReloadableLoadOwner((context) => this._loadConfiguration(context));
          this._startedHass = undefined;
          this._configReady = false;
          this._loading = true;
          this.editMode = false;
          this._sortGeneration = 0;
          this._gridRevision = 0;
          this._pendingSortOrder = undefined;
          this._dragActive = false;
          this._reloadAfterSort = false;
          this._confirmedVisibility = new Map();
        }

        set hass(hass) {
          const connectionChanged = hasHassConnectionChanged(this._hass, hass);
          this._hass = hass;
          const scope = morePagesEditModeScope(hass);
          this.editMode = scope ? (morePagesEditModes.get(scope) ?? false) : false;
          if (connectionChanged && this.isConnected) {
            this._subscriptions.disconnect();
            this._subscriptions.connect();
          }
          void this._startIfReady(connectionChanged);
        }

        setConfig(config) {
          if (!this._hass) this._hass = hass();
          const scope = morePagesEditModeScope(this._hass);
          this.editMode = scope ? (morePagesEditModes.get(scope) ?? false) : false;
          this._configReady = true;
          void this._startIfReady();
        }

        async connectedCallback(){
          //console.log('connectedCallBack');
          super.connectedCallback();
          this._subscriptions.connect();
          this._timers.connect();

          await this._startIfReady();
        }

        async _startIfReady(reload = false) {
          const connection = hassConnectionIdentity(this._hass);
          if (!this.isConnected || !this._hass || !this._configReady || this._startedHass === connection) return;
          const hass = this._hass;
          this._startedHass = connection;
          try {
            if (reload) await this._reloadCard();
            else await this._loadData();
            if (this.isConnected && hassConnectionIdentity(this._hass) === connection && this._startedHass === connection) {
              await this._subscribeReload();
            }
          } catch (error) {
            if (this._startedHass === connection) this._startedHass = undefined;
            this._loading = false;
            this._loadError = error;
            console.error('Error starting more pages card:', error);
          }
        }

        disconnectedCallback(){
          super.disconnectedCallback();
          this._subscriptions.disconnect();
          this._timers.disconnect();
          this._startedHass = undefined;
          this._sortGeneration += 1;
          this._pendingSortOrder = undefined;
          this._dragActive = false;
          this._reloadAfterSort = false;
          this._loads.invalidate();
          this._destroySortable();
        }

        updated(changedProperties) {
          if (
            changedProperties.has('editMode')
            || (this.editMode && changedProperties.has('configuration'))
          ) {
            this._syncSortable();
          }
        }

        _subscribeReload(){
          return this._subscriptions.subscribeEvent(
            'more-pages',
            this._hass,
            "dwains_dashboard_more_pages_reload",
            () => {
              websocketReadStore.invalidate(this._hass, {
                type: 'dwains_dashboard/configuration/get',
              });
              websocketReadStore.invalidate(this._hass, {
                type: 'dwains_dashboard/more_pages/get',
              });
              if (this._dragActive || this._pendingSortOrder) {
                this._reloadAfterSort = true;
                return;
              }
              this._reloadCard().catch((error) => {
                console.error('Error reloading more pages card:', error);
              });
            },
          );
        }

        async _reloadCard(){
          await this._loads.reload();
          this.requestUpdate();
        }

        _loadData(){
          return this._loads.load();
        }

        async _loadConfiguration({ isCurrent = () => true } = {}){
          let configuration = await websocketReadStore.readPreferred(
            this._hass,
            { type: 'dwains_dashboard/more_pages/get' },
            { type: 'dwains_dashboard/configuration/get' },
            { capability: "dashboard-read-slices" },
          );
          if (!isCurrent()) return;
          for (const [foldername, visible] of this._confirmedVisibility) {
            const page = configuration.more_pages?.[foldername] || {};
            if (page.show_in_navbar === visible) {
              this._confirmedVisibility.delete(foldername);
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
          if (this._pendingSortOrder) {
            configuration = this._configurationWithMorePageOrder(
              configuration,
              this._pendingSortOrder,
            );
          }
          this.configuration = configuration;
          this._loading = false;
          this._loadError = undefined;

        }

        _handleMorePageClick(ev){
          const path = ev.currentTarget.path;
          navigate(window, "/dwains-dashboard/more_page_"+path);
          this.requestUpdate();
        }

        _handleCreateMorePageClicked(ev){
          closeParentDropdown(ev);
          ev.stopPropagation();
          this._popupOpens.schedule(() => {
            fireEvent("hass-more-info", {entityId: ""}, this);
            popUp(translateEngine(this._hass, 'more.create'), {
              type: "custom:dwains-edit-more-page-card",
            }, true, '');
          });

        }
        _handleRemoveMorePageClicked(ev){
          closeParentDropdown(ev);
          ev.stopPropagation();
          const morePage = ev.currentTarget.more_page;
          this._hass.callWS({
            type: 'dwains_dashboard/remove_more_page',
            foldername: morePage,
          }).then(
              async (resp) => {
                  console.log(resp);
                  if(this.configuration && this.configuration.more_pages && this.configuration.more_pages[morePage]){
                    const morePages = {...this.configuration.more_pages};
                    delete morePages[morePage];
                    this.configuration = {...this.configuration, more_pages: morePages};
                    this.requestUpdate();
                  }
                  websocketReadStore.invalidate(this._hass, {
                    type: 'dwains_dashboard/configuration/get',
                  });
                  websocketReadStore.invalidate(this._hass, {
                    type: 'dwains_dashboard/more_pages/get',
                  });
                  await this._reloadCard();
              },
              (err) => {
                  console.error('Message failed!', err);
              }
          );
        }
        async _handleNavbarVisibilityClick(ev){
          closeParentDropdown(ev);
          ev.stopPropagation();
          const morePage = ev.currentTarget.more_page;
          const showInNavbar = Boolean(ev.currentTarget.show_in_navbar);
          const existingPage = this.configuration?.more_pages?.[morePage] || {};
          this._actionError = undefined;
          try {
            // Keep this compatible with an HA backend that is still running the
            // previous command schema while frontend resources are refreshed.
            // The legacy add command accepts no visibility argument; the
            // established edit command already supports removing the entry.
            const response = await this._hass.callWS(
              showInNavbar
                ? {
                    type: 'dwains_dashboard/add_more_page_to_navbar',
                    more_page: morePage,
                  }
                : {
                    type: 'dwains_dashboard/edit_more_page_button',
                    more_page: morePage,
                    name: existingPage.name || morePage,
                    icon: existingPage.icon || 'mdi:puzzle',
                    showInNavbar: false,
                  },
            );
            const page = {
              ...existingPage,
              ...(response?.page || {}),
              foldername: response?.foldername || morePage,
              show_in_navbar: showInNavbar,
            };
            this.configuration = {
              ...this.configuration,
              more_pages: {
                ...(this.configuration?.more_pages || {}),
                [morePage]: page,
              },
            };
            this._confirmedVisibility.set(morePage, showInNavbar);
            dispatchMorePageMetadataChanged(window, page);
            websocketReadStore.invalidate(this._hass, {
              type: 'dwains_dashboard/configuration/get',
            });
            websocketReadStore.invalidate(this._hass, {
              type: 'dwains_dashboard/more_pages/get',
            });
            this._actionError = undefined;
            this.requestUpdate();
          } catch (error) {
            this._actionError = error;
            console.error('Failed to change More Page navigation visibility:', error);
          }
        }

        async _handleEditMorePageClicked(ev){
          closeParentDropdown(ev);
          ev.stopPropagation();
          const morePage = ev.currentTarget.more_page;
          try {
            const page = await websocketReadStore.readPreferred(
              this._hass,
              { type: 'dwains_dashboard/more_page/get', foldername: morePage },
              { type: 'dwains_dashboard/configuration/get' },
              {
                capability: "dashboard-read-slices",
                selectFallback: (configuration) => configuration?.more_pages?.[morePage],
              },
            );
            if (!page?.card) {
              throw new Error(`More page "${morePage}" has no card configuration`);
            }
            const confirmedVisibility = this._confirmedVisibility.get(morePage);
            this._popupOpens.schedule(() => {
              fireEvent("hass-more-info", {entityId: ""}, this);
              popUp(translateEngine(this._hass, 'more.edit'), {
                type: "custom:dwains-edit-more-page-card",
                foldername: page.foldername || morePage,
                name: page.name,
                icon: page.icon,
                showInNavbar:
                  confirmedVisibility ?? page.show_in_navbar,
                cardConfig: page.card,
                mode: "editor-element",
              }, true, '');
            });
          } catch (error) {
            console.error('Failed to load more page for editing:', error);
            this._loadError = error;
          }
        }

        _handleEditModeClicked(ev){
          closeParentDropdown(ev);
          ev.stopPropagation();
          const value = ev.currentTarget.value === true;
          this.editMode = value;
          const scope = morePagesEditModeScope(this._hass);
          if (scope) morePagesEditModes.set(scope, value);
        }

        _syncSortable() {
          this._destroySortable();
          if (!this.editMode || !this.isConnected) return;
          const sortableElement = this.shadowRoot?.querySelector('.sortable');
          if (!sortableElement) return;
          const card = this;
          this._sortable = [new Sortable(sortableElement, {
            forceFallback: true,
            animation: 150,
            dataIdAttr: "data-more_page",
            handle: '.sortable-move',
            onStart() {
              card._dragActive = true;
            },
            onEnd() {
              const order = this.toArray();
              card._dragActive = false;
              card._reloadAfterSort = false;
              void card._saveMorePageOrder(order);
            },
          })];
        }

        _configurationWithMorePageOrder(configuration, order) {
          const pages = configuration?.more_pages || {};
          const morePages = { ...pages };
          order.forEach((foldername, index) => {
            if (morePages[foldername]) {
              morePages[foldername] = {
                ...morePages[foldername],
                sort_order: index + 1,
              };
            }
          });
          return { ...(configuration || {}), more_pages: morePages };
        }

        async _saveMorePageOrder(order) {
          if (!Array.isArray(order) || order.length === 0) return;
          const generation = ++this._sortGeneration;
          this._pendingSortOrder = [...order];
          this._gridRevision += 1;
          this._sortError = undefined;
          this.configuration = this._configurationWithMorePageOrder(
            this.configuration,
            order,
          );
          this.requestUpdate();
          try {
            const response = await this._hass.callWS({
              type: 'dwains_dashboard/sort_more_page',
              sortData: JSON.stringify(order),
            });
            if (generation !== this._sortGeneration) return;
            const confirmedOrder = Array.isArray(response?.order)
              ? response.order
              : order;
            this._pendingSortOrder = [...confirmedOrder];
            this.configuration = this._configurationWithMorePageOrder(
              this.configuration,
              confirmedOrder,
            );
            websocketReadStore.invalidate(this._hass, {
              type: 'dwains_dashboard/configuration/get',
            });
            websocketReadStore.invalidate(this._hass, {
              type: 'dwains_dashboard/more_pages/get',
            });
            this._reloadAfterSort = false;
            await this._reloadCard();
            if (generation !== this._sortGeneration) return;
            this._pendingSortOrder = undefined;
            this._reloadAfterSort = false;
            this.requestUpdate();
          } catch (error) {
            if (generation !== this._sortGeneration) return;
            this._pendingSortOrder = undefined;
            this._reloadAfterSort = false;
            this._sortError = error;
            console.error('Failed to save More Page order:', error);
            websocketReadStore.invalidate(this._hass, {
              type: 'dwains_dashboard/configuration/get',
            });
            websocketReadStore.invalidate(this._hass, {
              type: 'dwains_dashboard/more_pages/get',
            });
            await this._reloadCard().catch((reloadError) => {
              console.error('Failed to restore More Page order:', reloadError);
            });
          }
        }

        _destroySortable(){
          this._sortable?.forEach((sortElement) => sortElement.destroy());
          this._sortable = undefined;
        }


        _renderPageButton(key, data){
          if(!data.name){
            return html``;
          }

          return html`
            <div class="relative" data-more_page="${key}">
              <div class="flex justify-between h-44 p-3 more-page-button" .path=${key} @click=${this._handleMorePageClick}>
                <div class="h-full flex flex-wrap content-between">
                  <div class="w-full ha-icon">
                    ${this.configuration['more_pages'][key] && this.configuration['more_pages'][key]['icon'] ? html`
                      <ha-icon
                        class="h-14 w-14"
                        style="color: var(--primary-color);"
                        .icon=${this.configuration['more_pages'][key]['icon']}
                      ></ha-icon>`
                      : ""
                    }
                  </div>
                  <div class="w-full">
                    <h3 class="font-semibold text-lg capitalize">${data.name.replace(/_/g, " ")}</h3>
                  </div>
                </div>
              </div>
            ${this.editMode ? html`
              <ha-card>
                <div class="card-actions-multiple">
                  <div class="sortable-move">
                    <ha-icon
                      .icon=${"mdi:cursor-move"}
                    >
                    </ha-icon>
                  </div>
                  <ha-dropdown
                    class="ha-icon-overflow-menu-overflow"
                    corner="BOTTOM_START"
                    absolute
                  >
                    <ha-icon-button
                      label=${this._hass.localize("ui.common.overflow_menu")}
                      .path=${mdiDotsVertical}
                      slot="trigger"
                    ></ha-icon-button>
                      <ha-list-item
                        graphic="icon"
                        .more_page=${key}
                        @click=${this._handleEditMorePageClicked}
                      >
                        <div slot="graphic">
                          <ha-svg-icon .path=${mdiPencil}></ha-svg-icon>
                        </div>
                        ${this._hass.localize("ui.components.entity.entity-picker.edit")}
                      </ha-list-item>
                      <ha-list-item
                        graphic="icon"
                        .more_page=${key}
                        @click=${this._handleRemoveMorePageClicked}
                      >
                        <div slot="graphic">
                          <ha-icon .icon=${"mdi:trash-can"}></ha-icon>
                        </div>
                        ${this._hass.localize("ui.common.remove")}
                      </ha-list-item>
                      <ha-list-item
                        graphic="icon"
                        .more_page=${key}
                        .show_in_navbar=${!data.show_in_navbar}
                        @click=${this._handleNavbarVisibilityClick}
                      >
                        <div slot="graphic">
                          <ha-icon .icon=${data.show_in_navbar ? "mdi:tag-minus" : "mdi:tag-plus"}></ha-icon>
                        </div>
                        ${translateEngine(
                          this._hass,
                          data.show_in_navbar
                            ? 'more.remove_navbar'
                            : 'more.add_navbar',
                        )}
                      </ha-list-item>
                  </ha-dropdown>
                </div>
              </ha-card>` : ""}
            </div>
          `;
        }

        render() {
          if(this._loading){
            return html`<div class="overview-state"><ha-circular-progress active></ha-circular-progress></div>`;
          }
          if(this._loadError){
            return html`<div class="overview-state overview-error">${this._loadError.message || this._loadError}</div>`;
          }
          const pages = this.configuration?.more_pages || {};
          const morePages = Object.entries(pages).sort(function (x, y) {
              let a = x[1].sort_order ?? 99,
                  b = y[1].sort_order ?? 99;
              return a == b ? 0 : a > b ? 1 : -1;
            });

            //console.log(1,this.configuration['more_pages']);
            return html`
                <div id="more_pages" class="p-4 dd-dashboard-style-refresh">
                    ${this._actionError ? html`
                      <div class="overview-state overview-error">
                        ${this._actionError.message || this._actionError}
                      </div>
                    ` : ""}
                    <div class="flex justify-between mb-2">
                    <div>
                        <h2 class="font-semibold text-lg capitalize">
                        ${translateEngine(this._hass, 'more.title_plural')}
                        </h2>
                        <span class="text-gray-700">
                        ${morePages.length} ${translateEngine(this._hass, 'more.pages')}
                        </span>
                    </div>
                    <div>
                      ${this._hass.user.is_admin ? html`
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
                                @click=${this._handleCreateMorePageClicked}
                            >
                                <div slot="graphic">
                                  <ha-svg-icon .path=${mdiNotePlus}></ha-svg-icon>
                                </div>
                                ${translateEngine(this._hass, 'more.create')}
                            </ha-list-item>
                            ${this.editMode ? html `
                            <ha-list-item
                              graphic="icon"
                              .value=${false}
                              @click=${this._handleEditModeClicked}
                            >
                              <div slot="graphic">
                                <ha-svg-icon .path=${mdiCog}></ha-svg-icon>
                              </div>
                              ${translateEngine(this._hass, 'global.disable_edit_mode')}
                            </ha-list-item>` : html `
                            <ha-list-item
                              graphic="icon"
                              .value=${true}
                              @click=${this._handleEditModeClicked}
                            >
                              <div slot="graphic">
                                <ha-svg-icon .path=${mdiCog}></ha-svg-icon>
                              </div>
                              ${translateEngine(this._hass, 'global.enable_edit_mode')}
                            </ha-list-item>
                            `
                          }
                        </ha-dropdown>
                        `: ""}
                    </div>
                    </div>

                    ${this._sortError ? html`
                      <div class="sort-error" role="alert">
                        ${this._sortError.message || this._sortError}
                      </div>
                    ` : ""}
                    ${keyed(this._gridRevision, html`
                      <div class="grid grid-cols-2 dd-overview-grid md-grid-cols-3 xl-grid-cols-4 gap-4 sortable">
                        ${morePages.map(([key, data]) => this._renderPageButton(key, data))}
                      </div>
                    `)}
                </div>
            `;
        }

        static get styles() {
          return [css`
            :host {
              display: block;
              box-sizing: border-box;
              width: 100%;
              min-width: 0;
              max-width: 100%;
            }
            .dd-overview-grid {
              box-sizing: border-box;
              width: 100%;
              min-width: 0;
              max-width: 100%;
            }
            .sort-error {
              margin: 0 0 1rem;
              padding: .75rem;
              border-radius: .25rem;
              color: var(--error-color);
              background: color-mix(in srgb, var(--error-color) 10%, transparent);
            }
            @media (max-width: 599px) {
              #more_pages {
                box-sizing: border-box;
                max-width: 100%;
              }
              .grid.dd-overview-grid > * {
                min-width: 0;
                max-width: 100%;
              }
            }
            .sortable-move {
              cursor: -webkit-grabbing;
              cursor: grab;
              margin: auto 0;
            }
            .overview-state {
              display: flex;
              min-height: 10rem;
              align-items: center;
              justify-content: center;
              color: var(--secondary-text-color);
            }
            .overview-error {
              color: var(--error-color);
            }
            .card-actions-multiple {
              display: flex;
              justify-content: space-between;
              padding: 0.25rem 0.5rem;
            }
            .more-page-button .info ha-icon, .ha-icon ha-icon {
              display: inline-block;
              margin: auto;
              --mdc-icon-size: 100% !important;
              --iron-icon-width: 100% !important;
              --iron-icon-height: 100% !important;
            }
            #badges {
              cursor: pointer;
              background: var( --ha-card-background, var(--card-background-color, white) );
              box-shadow: var( --ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) );
              color: var(--primary-text-color);
            }
            .more-page-button {
              cursor: pointer;
              background: var( --ha-card-background, var(--card-background-color, white) );
              border-radius: var(--ha-card-border-radius, 4px);
              box-shadow: var( --ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) );
              color: var(--test-primary-text-color, var(--primary-text-color));
            }
            .info-badge {
              /*background-color: var(--sidebar-icon-color);
              color: var( --ha-card-background, var(--card-background-color, white) );*/
              background-color: var(--secondary-background-color);
            }
            /*styling tailwind dwains version*/
            *, ::after, ::before {
              box-sizing: border-box;
            }
            h1,h2,h3 {
              margin: 0;
            }
            h3 {
              font-size: 1em;
            }
            .absolute {
              position: absolute
            }
            .break-words {
              overflow-wrap: break-word;
            }
            .relative {
                position: relative
            }
            .sticky {
                position: -webkit-sticky;
                position: sticky
            }
            .top-0 {
                top: 0px
            }
            .bottom-0 {
                bottom: 0px
            }
            .z-30 {
                z-index: 30
            }
            .col-span-1 {
                grid-column: span 1 / span 1
            }
            .col-span-2 {
                grid-column: span 2 / span 2
            }
            .row-span-1 {
                grid-row: span 1 / span 1
            }
            .row-span-2 {
                grid-row: span 2 / span 2
            }
            .my-4 {
                margin-top: 1rem;
                margin-bottom: 1rem
            }
            .mx-auto {
              margin-left: auto;
              margin-right: auto
            }
            .mb-2 {
                margin-bottom: 0.5rem
            }
            .mb-4 {
                margin-bottom: 1rem
            }
            .mt-4 {
                margin-top: 1rem
            }
            .mr-0\.5 {
                margin-right: 0.125rem
            }
            .mr-0 {
                margin-right: 0px
            }
            .mb-12 {
                margin-bottom: 3rem
            }
            .mb-5 {
                margin-bottom: 1.25rem
            }
            .mb-16 {
                margin-bottom: 4rem
            }
            .ml-4 {
                margin-left: 1rem
            }
            .block {
                display: block
            }
            .inline-block {
                display: inline-block
            }
            .flex {
                display: flex
            }
            .inline-flex {
                display: inline-flex
            }
            .grid {
                display: grid
            }
            .hidden {
                display: none
            }
            .h-6 {
                height: 1.5rem
            }
            .h-44 {
                height: 11rem
            }
            .h-full {
                height: 100%
            }
            .h-14 {
                height: 3.5rem
            }
            .h-8 {
                height: 2rem
            }
            .w-full {
                width: 100%
            }
            .w-6 {
                width: 1.5rem
            }
            .w-14 {
                width: 3.5rem
            }
            .w-8 {
                width: 2rem
            }
            .w-12 {
              width: 3rem
            }
            .cursor-pointer {
                cursor: pointer
            }
            .grid-flow-row-dense {
                grid-auto-flow: row dense
            }
            .grid-cols-1 {
                grid-template-columns: repeat(1, minmax(0, 1fr))
            }
            .grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr))
            }
            .flex-wrap {
                flex-wrap: wrap
            }
            .content-between {
                align-content: space-between
            }
            .items-center {
                align-items: center
            }
            .justify-between {
                justify-content: space-between
            }
            .gap-4 {
                gap: 1rem
            }
            .space-y-0.5 > :not([hidden]) ~ :not([hidden]) {
                --tw-space-y-reverse: 0;
                margin-top: calc(0.125rem * calc(1 - var(--tw-space-y-reverse)));
                margin-bottom: calc(0.125rem * var(--tw-space-y-reverse))
            }
            .space-y-0 > :not([hidden]) ~ :not([hidden]) {
                --tw-space-y-reverse: 0;
                margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
                margin-bottom: calc(0px * var(--tw-space-y-reverse))
            }
            .rounded {
                border-radius: 0.25rem
            }
            .rounded-md {
                border-radius: 0.375rem
            }
            .bg-gray-800 {
                --tw-bg-opacity: 1;
                background-color: rgb(31 41 55 / var(--tw-bg-opacity))
            }
            .rounded-lg {
              border-radius: 0.5rem
            }
            .border-2 {
                border-width: 2px
            }
            .border-dashed {
                border-style: dashed
            }
            .border-gray-300 {
                --tw-border-opacity: 1;
                border-color: rgb(209 213 219 / var(--tw-border-opacity))
            }
            .bg-gray-800 {
                --tw-bg-opacity: 1;
                background-color: rgb(31 41 55 / var(--tw-bg-opacity))
            }
            .bg-opacity-50 {
                --tw-bg-opacity: 0.5
            }
            .p-2 {
              padding: 0.5rem;
            }
            .p-4 {
                padding: 1rem
            }
            .p-1 {
                padding: 0.25rem
            }
            .p-3 {
                padding: 0.75rem
            }
            .px-1 {
                padding-left: 0.25rem;
                padding-right: 0.25rem
            }
            .p-12 {
              padding: 3rem
            }
            .py-0\.5 {
                padding-top: 0.125rem;
                padding-bottom: 0.125rem
            }
            .py-0 {
                padding-top: 0px;
                padding-bottom: 0px
            }
            .py-1 {
              padding-top: 0.25rem;
              padding-bottom: 0.25rem
            }
            .px-2 {
              padding-left: 0.5rem;
              padding-right: 0.5rem
            }
            .text-center {
              text-align: center
            }
            .text-right {
                text-align: right
            }
            .text-xl {
                font-size: 1.5rem;
                line-height: 2rem
            }
            .text-lg {
                font-size: 1.125rem;
                line-height: 1.75rem
            }
            .text-sm {
                font-size: 0.875rem;
                line-height: 1.25rem
            }
            .text-xs {
                font-size: 0.75rem;
                line-height: 1rem
            }
            .font-semibold {
                font-weight: 600
            }
            .font-medium {
                font-weight: 500
            }
            .capitalize {
                text-transform: capitalize
            }
            .text-gray {
                color: var(--paper-item-body-secondary-color, var(--secondary-text-color));
            }
            .text-white {
                --tw-text-opacity: 1;
                color: rgb(255 255 255 / var(--tw-text-opacity))
            }
            @media (min-width: 768px) {
                .md-grid-cols-3 {
                    grid-template-columns: repeat(3, minmax(0, 1fr))
                }
            }
            @media (min-width: 1024px) {
                .lg-col-span-1 {
                    grid-column: span 1 / span 1
                }
                .lg-col-span-3 {
                    grid-column: span 3 / span 3
                }
                .lg-col-span-2 {
                    grid-column: span 2 / span 2
                }
                .lg-row-span-1 {
                    grid-row: span 1 / span 1
                }
                .lg-row-span-3 {
                    grid-row: span 3 / span 3
                }
                .lg-row-span-2 {
                    grid-row: span 2 / span 2
                }
                .lg-block {
                    display: block
                }
                .lg-hidden {
                    display: none
                }
                .lg-w-1-2 {
                    width: 50%
                }
                .lg-grid-cols-2 {
                    grid-template-columns: repeat(2, minmax(0, 1fr))
                }
                .lg-grid-cols-3 {
                    grid-template-columns: repeat(3, minmax(0, 1fr))
                }
            }
            @media (min-width: 1536px) {
              .xl-col-span-1 {
                  grid-column: span 1 / span 1
              }
              .xl-col-span-4 {
                  grid-column: span 4 / span 4
              }
              .xl-col-span-2 {
                  grid-column: span 2 / span 2
              }
              .xl-row-span-1 {
                  grid-row: span 1 / span 1
              }
              .xl-row-span-4 {
                  grid-row: span 4 / span 4
              }
              .xl-row-span-2 {
                  grid-row: span 2 / span 2
              }
              .xl-w-1-3 {
                  width: 33.333333%
              }
              .xl-w-2-3 {
                  width: 66.666667%
              }
              .xl-grid-cols-4 {
                  grid-template-columns: repeat(4, minmax(0, 1fr))
              }
          }
          `, subtleMorePagesStyles(css)]
        }


}
defineDwainsElement("more-pages-card", MorePagesCard);
