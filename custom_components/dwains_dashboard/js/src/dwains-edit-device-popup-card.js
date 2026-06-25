import { hass } from "card-tools/src/hass";
import { css, html, LitElement } from 'lit-element';
import translateEngine from './translate-engine';
import { closePopup } from "./helpers";

const bases2 = [customElements.whenDefined('hui-masonry-view'), customElements.whenDefined('hc-lovelace')];
Promise.race(bases2).then(async () => {
  const cardHelpers = await (window.__dd_wait_card_helpers ? window.__dd_wait_card_helpers() : window.loadCardHelpers());


    class DwainsEditDevicePopupCard extends LitElement {
      static get styles() {
        return [
          css`
          .edit-element {
            padding: 20px;
          }
          h1, h2, h3, h4, h5, h6 {
            font-size: inherit;
          }
          blockquote, dd, dl, figure, h1, h2, h3, h4, h5, h6, hr, p, pre {
            margin: 0;
          }
          .add-button {
            font-size: 16px;
            border: 2px solid #4591B8;
            padding: 5px;
            margin-bottom: 50px;
            background: #459CEE;
            border-radius: 20px;
            color: white;
          }
        .card-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: .75rem;
            padding: 8px;
            border-top: 1px solid var(--divider-color);
          }
          .grid {
            display: grid;
            gap: 2rem;
          }
          @media (min-width: 768px){
            .grid-cols-2 {
              grid-template-columns: repeat(2,minmax(0,1fr));
            }
          }
          .pre-select {
            padding: 2.5rem;
          }
          .pre-select-option {
            padding: 2.5rem;
            border: 1px solid #4591B8;
            text-align: center;
            cursor: pointer;
          }
          .pre-selected-option:hover {
            border: 2px solid #4591B8;
          }
          .more-page-settings {
            padding: 0.75rem;
            border: 2px solid grey;
          }
          .seperator {
            background-color: var(--secondary-background-color);
            width: 100%;
            height: 3px;
            margin-top: 15px;
            margin-bottom: 15px;
        }
        /*Start blueprint table*/
        /* Blueprint table responsive fix */
        table.min-w-full {
          width: 100%;
          table-layout: fixed;
        }
        table.min-w-full th,
        table.min-w-full td {
          overflow-wrap: anywhere;
          word-break: break-word;
          vertical-align: top;
        }
        table.min-w-full .px-6 {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        table.min-w-full .whitespace-nowrap {
          white-space: normal;
        }
        table.min-w-full th:last-child,
        table.min-w-full td:last-child {
          width: 6.5rem;
          min-width: 6.5rem;
        }
        table.min-w-full td:last-child ha-button {
          display: block;
          margin: 0.125rem 0;
        }
        @media (max-width: 640px) {
          table.min-w-full .px-6 {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
          }
          table.min-w-full .py-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          table.min-w-full th,
          table.min-w-full td {
            font-size: 0.75rem;
            line-height: 1rem;
          }
          table.min-w-full th:last-child,
          table.min-w-full td:last-child {
            width: 5.75rem;
            min-width: 5.75rem;
          }
        }
        .min-w-full {
          min-width: 100%;
        }
          table {
              text-indent: 0;
              border-color: inherit;
              border-collapse: collapse;
          }
          .bg-gray-50 {
            background-color: var(--secondary-background-color);
          }
          .tracking-wider {
              letter-spacing: .05em;
          }
          .text-sm {
            font-size: .875rem;
            line-height: 1.25rem;
          }
          .py-4 {
              padding-top: 1rem;
              padding-bottom: 1rem;
          }
          .uppercase {
              text-transform: uppercase;
          }
          .font-medium {
              font-weight: 500;
          }
          .text-xs {
              font-size: .75rem;
              line-height: 1rem;
          }
          .text-left {
              text-align: left;
          }
          .px-6 {
              padding-left: 1.5rem;
              padding-right: 1.5rem;
          }
          .py-3 {
              padding-top: 0.75rem;
              padding-bottom: 0.75rem;
          }
          .card-footer-multiple {
            display: flex;
            justify-content: space-between;
            padding: 8px;
            border-top: 1px solid var(--divider-color);
          }
          `
        ]
      }
      static get properties() {
        return {
          mode: {},
          blueprints: {},
        }
      }
      setConfig(config) {
        this.hass = hass();
        this.mode = config.mode ? config.mode : 'dwains-dashboard-blueprint-select'; //Set default mode to hui-card-picker
        this.domain = config.domain;
        if(config.cardConfig){
          const cardConfig = config.cardConfig;
          delete cardConfig["input_entity"];
          delete cardConfig["input_name"];
          this.cardConfig = cardConfig;
        } else {
          this.cardConfig = "";
        }
        this.existingCardEdit = config.existingCardEdit ? config.existingCardEdit : false;
      }
      async connectedCallback(){
        super.connectedCallback();

        await this._loadBlueprints();
      }

      async _loadBlueprints(){
        //Load blueprints
        this.blueprints = await this.hass.callWS({
          type: 'dwains_dashboard/get_blueprints'
        });

        const ch = await window.loadCardHelpers();
        const c = await ch.createCardElement({ type: "button" });
        await c.constructor.getConfigElement();
      }
      _switchMode(ev){
        const mode = ev.currentTarget.mode;
        this.mode = mode;
        this.requestUpdate();
      }
      _removeCard(){
        this.hass.connection.sendMessagePromise({
          type: 'dwains_dashboard/remove_device_popup',
          domain: this.domain,
        }).then(
            (resp) => {
                console.log(resp);
                closePopup();
            },
            (err) => {
                console.error('Message failed!', err);
            }
        );
      }
      _handleDeleteBlueprintClicked(ev){
        const blueprint = ev.currentTarget.blueprint;
        this.hass.connection.sendMessagePromise({
          type: 'dwains_dashboard/delete_blueprint',
          blueprint: blueprint
        }).then(
            (resp) => {
              console.log(resp);
              this._loadBlueprints();
              this.requestUpdate();
            },
            (err) => {
                console.error('Message failed!', err);
            }
        );
      }
      _handleUseBlueprintClicked(ev){
        const blueprint = ev.currentTarget.blueprint;

        const cardData = JSON.stringify({
            "type": "custom:dwains-blueprint-card",
            "blueprint": blueprint,
            "card": this.blueprints["blueprints"][blueprint]['card'],
        });
        //console.log(cardData);
        //Here parse it with websocket to my integration?
        this.hass.connection.sendMessagePromise({
          type: 'dwains_dashboard/edit_device_popup',
          cardData: cardData,
          domain: this.domain,
        }).then(
            (resp) => {
                console.log(resp);
                closePopup();
            },
            (err) => {
                console.error('Message failed!', err);
            }
        );
      }
      _installBlueprintYamlChanged(e) {
        this.installBlueprintYaml = e.target.value;
      }
      _handleInstallBlueprintClicked(ev) {
        this.hass.connection.sendMessagePromise({
          type: 'dwains_dashboard/install_blueprint',
          yamlCode: JSON.stringify(this.installBlueprintYaml),
        }).then(
            (resp) => {
              console.log(resp);
              if(resp["succesfull"]){
                alert(this.hass.localize("ui.common.successfully_saved"));
                this._loadBlueprints();
                this.requestUpdate();
              } else {
                alert(resp["error"]);
              }
            },
            (err) => {
                console.error('Message failed!', err);
            }
        );
      }

      _checkCustomCard(card) {
        const cardInstalled = customElements.get(card);
        return html`
          <div>
            ${cardInstalled ? html`
              <ha-icon
                style="color: green;"
                .icon=${"mdi:check-bold"}
              ></ha-icon>` :
              html`
              <ha-icon
                style="color: red;"
                .icon=${"mdi:close-thick"}
              ></ha-icon>
              `
            }
            ${card}
            ${cardInstalled ? html`(${translateEngine(this.hass, 'blueprint.installed')})` : html`(${translateEngine(this.hass, 'blueprint.not_installed')})`}
          </div>
        `;
      }

      render() {
        if(this.mode == 'dwains-dashboard-blueprint-select'){
          const blueprintsSorted = Object.entries(this.blueprints['blueprints']).sort(function (x, y) {
            let a = x[1].blueprint.type,
                b = y[1].blueprint.type;
            return a == b ? 0 : a > b ? 1 : -1;
          });
          return html`
          <div class="edit-element">
            <strong>${translateEngine(this.hass, 'blueprint.installed_blueprints')}:</strong>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${translateEngine(this.hass, 'blueprint.title')}</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${translateEngine(this.hass, 'global.version')}</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${translateEngine(this.hass, 'blueprint.type')}</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${translateEngine(this.hass, 'blueprint.used_custom_cards')}</th>
                  <th scope="col" class="relative px-6 py-3">
                  </th>
                </tr>
              </thead>
              <tbody>
              ${
                Object.entries(blueprintsSorted).map(([k,v]) =>
                    html`
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <h3>${v[1]["blueprint"]["name"]}</h3>
                          ${v[1]["blueprint"]["description"]}
                        </td>
                        <td class="px-6 py-4">
                          ${v[1]["blueprint"]["version"]}
                        </td>
                        <td class="px-6 py-4">
                          ${v[1]["blueprint"]["type"]}
                        </td>
                        <td class="px-6 py-4">
                          ${!v[1]["blueprint"]["custom_cards"] || v[1]["blueprint"]["custom_cards"].length === 0 ? `None` :
                            html`
                              ${v[1]["blueprint"]["custom_cards"].map(i => this._checkCustomCard(i))}
                            `
                          }
                        </td>
                        <td>
                          ${v[1]["blueprint"]["type"] == "replace-card" ? html`
                            <ha-button .blueprint=${v[0]} @click=${this._handleUseBlueprintClicked} unelevated>
                              ${translateEngine(this.hass, 'blueprint.use')}
                            </ha-button>
                          `: ""}
                          <ha-button .blueprint=${v[0]} @click=${this._handleDeleteBlueprintClicked} unelevated>
                            <ha-icon
                              .icon=${"mdi:delete"}
                            ></ha-icon>
                          </ha-button>
                        </td>
                      </tr>
                    `
                )
              }
              </tbody>
            </table>
            <div class="seperator"></div>
            <strong>${translateEngine(this.hass, 'blueprint.install')}</strong>
            <p>${translateEngine(this.hass, 'blueprint.instruction')}</p>
            <a href="https://github.com/dwainscheeren/dwains-dashboard-blueprints" target="_blank">Dwains Dashboard Blueprints Github</a>
            <ha-yaml-editor
              label=${translateEngine(this.hass, 'blueprint.yaml_code')}
              name="description"
              @value-changed=${this._installBlueprintYamlChanged}
            ><ha-code-editor mode="yaml" autocomplete-entities="" autocomplete-icons="" dir="ltr"></ha-code-editor></ha-yaml-editor>
            <div style="margin-top: 15px; margin-bottom: 20px;">
              <ha-button @click=${this._handleInstallBlueprintClicked} unelevated>
                ${translateEngine(this.hass, 'blueprint.install')}
              </ha-button>
            </div>
          </div>`;
        } else if(this.mode == 'current-selected-blueprint'){
          return html`
            <div class="edit-element">
              <p>
                ${translateEngine(this.hass,'device.current_blueprint_popup')} ${translateEngine(this.hass,'device.'+this.domain)}:<br>
                <strong>${this.blueprints['blueprints'][this.cardConfig.blueprint]["blueprint"]["name"]}</strong><br>
                ${this.blueprints['blueprints'][this.cardConfig.blueprint]["blueprint"]["description"]}
              </p>
              <div class="card-footer-multiple">
                ${
                  this.existingCardEdit ? html `
                    <div>
                      <ha-button class="warning" @click=${this._removeCard}>${this.hass.localize("ui.common.remove")}</ha-button>
                      <ha-button class="warning" @click=${(e) => this.mode = 'dwains-dashboard-blueprint-select'}}>${this.hass.localize("ui.common.previous")}</ha-button>
                    </div>
                  ` : html`<div></div>`
                }
                <div>
                  <ha-button slot="secondaryAction" @click=${(e) => closePopup()}>
                    ${this.hass.localize("ui.common.cancel")}
                  </ha-button>
                  <ha-button slot="primaryAction" .blueprint=${this.cardConfig.blueprint} @click=${this._handleUseBlueprintClicked}>
                    ${this.hass.localize("ui.common.submit")}
                  </ha-button>
                </div>
              </div>
            </div>
          `;
        }
      }
    }
    customElements.define("dwains-edit-device-popup-card", DwainsEditDevicePopupCard);

});
