import { hass } from "card-tools/src/hass";
import {
  navigate
} from 'custom-card-helpers';
import { popUp } from "./dwains-popup";
import { fireEvent } from "card-tools/src/event";
import { mdiDotsVertical, mdiNotePlus, mdiCog } from "@mdi/js";
import { css, html, LitElement } from 'lit-element';
import translateEngine from './translate-engine';
import Sortable from 'sortablejs/modular/sortable.complete.esm.js';

const bases2 = [customElements.whenDefined('hui-masonry-view'), customElements.whenDefined('hc-lovelace')];
Promise.race(bases2).then(async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const cardHelpers = await window.loadCardHelpers();

    class MorePagesCard extends LitElement {
        static get properties() {
          return {
            configuration: {},
            editMode: {},
          };
        }

        /**
         * @param {any} hass
         */
        set hass(hass) {
          if(this.data == null || this.data.length === 0) return;
          Object.values(this.data).map((data) => {
            data.cards.forEach((item) => {
              item.card.hass = hass;
            });
            data.customCardsTop.forEach((item) => {
              item.card.hass = hass;
            });
            data.customCardsBottom.forEach((item) => {
              item.card.hass = hass;
            });
          });
          this._hass = hass;
          this.requestUpdate();
        }

        setConfig(config) {
          this._hass = hass();
          this.editMode = false;
        }

        async connectedCallback(){
          //console.log('connectedCallBack');
          super.connectedCallback();

          await this._loadData(); //Load areas

          await this._hass.connection.subscribeEvents(() => this._reloadCard(), "dwains_dashboard_more_pages_reload");
        }

        async _reloadCard(){
          await this._loadData();
          this.requestUpdate();
        }

        async _loadData(){
          //Load configuration
          this.configuration = await this._hass.callWS({
            type: 'dwains_dashboard/configuration/get'
          });

          if(this.configuration == null || this.configuration.length === 0
          ){
          } else {

            //for the ha-icon-picker?
            const loader = document.createElement("hui-masonry-view");
            loader.lovelace = { editMode: true };
            loader.willUpdate(new Map());
            //end for the ha-icon-picker
          }
        }

        _handleMorePageClick(ev){
          const path = ev.currentTarget.path;
          navigate(window, "/dwains-dashboard/more_page_"+path);
          this.requestUpdate();
        }

        // _handleMorePageEditClick(ev) {
        //   ev.stopPropagation();

        //   const more_page = ev.currentTarget.more_page;
        //   const name = ev.currentTarget.name;
        //   const icon = ev.currentTarget.more_page_icon;
        //   const showInNavbar = ev.currentTarget.showInNavbar;
        //   window.setTimeout(() => {
        //     fireEvent("hass-more-info", {entityId: ""}, document.querySelector("home-assistant"));
        //     popUp(translateEngine(this._hass, 'more.edit'), {
        //       type: "custom:dwains-edit-more-page-card",
        //       more_page: more_page,
        //       name: name,
        //       icon: icon,
        //       showInNavbar: showInNavbar,
        //     }, false, '');
        //   }, 50);
        // }
        _handleCreateMorePageClicked(ev){
          ev.stopPropagation();
          window.setTimeout(() => {
            fireEvent("hass-more-info", {entityId: ""}, document.querySelector("home-assistant"));
            popUp(translateEngine(this._hass, 'more.create'), {
              type: "custom:dwains-edit-more-page-card",
            }, true, '');
          }, 50);

        }
        _handleRemoveMorePageClicked(ev){
          this._hass.connection.sendMessagePromise({
            type: 'dwains_dashboard/remove_more_page',
            foldername: ev.currentTarget.more_page,
          }).then(
              (resp) => {
                  console.log(resp);
              },
              (err) => {
                  console.error('Message failed!', err);
              }
          );
        }
        _handleAddToNavbarClick(ev){
          const morePage = ev.currentTarget.more_page;
          this._hass.connection.sendMessagePromise({
            type: 'dwains_dashboard/remove_more_page',
            foldername: ev.currentTarget.more_page,
          }).then(
              (resp) => {
                  console.log(resp);
              },
              (err) => {
                  console.error('Message failed!', err);
              }
          );
        }

        _handleEditModeClicked(ev){
          ev.stopPropagation();
          const value = ev.currentTarget.value;

          if(value){
            this._sortable = [];
            const sortableElements = this.shadowRoot.querySelectorAll('.sortable');
            for(var i=0; i<sortableElements.length; i++){
              this._sortable[i] = new Sortable(sortableElements[i], {
                  forceFallback: true,
                  animation: 150,
                  dataIdAttr: "data-more_page",
                  handle: '.sortable-move',
                  onEnd: function(event){
                    console.log(event);
                    hass().connection.sendMessagePromise({
                        type: 'dwains_dashboard/sort_more_page',
                        sortData: JSON.stringify(this.toArray()),
                      }).then(
                          (resp) => {
                              console.log(resp);
                          },
                          (err) => {
                              console.error('Message failed!', err);
                          }
                      );
                  }
              });
            }
          } else {
            this._sortable.forEach(sortElement => sortElement.destroy());
            this._sortable = undefined;
          }
          this.editMode = value;
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
                      .label=${this._hass.localize("ui.common.overflow_menu")}
                      .path=${mdiDotsVertical}
                      slot="trigger"
                    ></ha-icon-button>
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
                      ${!data.show_in_navbar == 9 ? html `
                        <ha-list-item
                          graphic="icon"
                          .more_page="${key}"
                          @click="${this._handleAddToNavbarClick}"
                        >
                          <div slot="graphic">
                            <ha-icon .icon=${"mdi:tag-plus"}></ha-icon>
                          </div>
                          ${translateEngine(this._hass, 'more.add_navbar')}
                        </ha-list-item>` : ""
                      }
                  </ha-dropdown>
                </div>
              </ha-card>` : ""}
            </div>
          `;
        }

        render() {
          if(this.configuration == null || this.configuration.length === 0){
            return html``;
          } else {
            const more_pages = Object.entries(this.configuration['more_pages']).sort(function (x, y) {
              let a = x[1].sort_order,
                  b = y[1].sort_order;
              return a == b ? 0 : a > b ? 1 : -1;
            });

            //console.log(1,this.configuration['more_pages']);
            return html`
                <div id="more_pages" class="p-4">
                    <div class="flex justify-between mb-2">
                    <div>
                        <h2 class="font-semibold text-lg capitalize">
                        ${translateEngine(this._hass, 'more.title_plural')}
                        </h2>
                        <span class="text-gray-700">
                        ${Object.keys(this.configuration['more_pages']).length} ${translateEngine(this._hass, 'more.pages')}
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
                              .label=${this._hass.localize("ui.common.overflow_menu")}
                              .path=${mdiDotsVertical}
                              slot="trigger"
                          ></ha-icon-button>
                            <ha-list-item
                                graphic="icon"
                                @click="${this._handleCreateMorePageClicked}"
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

                    <div class="grid grid-cols-2 md-grid-cols-3 xl-grid-cols-4 gap-4 sortable">
                      ${Object.entries(more_pages).map(([k,v]) => this._renderPageButton(v[0],v[1]))}
                    </div>
                </div>
            `;
            //  ${Object.entries(this.configuration['more_pages']).map(([k,v]) => this._renderPageButton(k,v))}
          }
        }

        static get styles() {
          return css`
            .sortable-move {
              cursor: -webkit-grabbing;
              cursor: grab;
              margin: auto 0;
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
          `
        }


      }
      customElements.define("more-pages-card", MorePagesCard);
});