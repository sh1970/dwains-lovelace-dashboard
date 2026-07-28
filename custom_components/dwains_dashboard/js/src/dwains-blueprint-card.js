import { hass } from "./hass-compat";
import { css, html, LitElement } from 'lit';
import { createCardElementSafe, resolveEntityName } from './helpers';
const { loadCardHelpers } = require('./card-helpers-loader');
const { websocketReadStore } = require('./websocket-read-store');
const { defineDwainsElement } = require('./custom-element-registration');

const cardHelpers = loadCardHelpers();

class DwainsBlueprintCard extends LitElement {
        static get properties() {
          return {
            card: {},
            _hass: {},
          };
        }

        static getConfigElement() {
            return document.createElement("dwains-blueprint-card-editor");
        }

         /**
         * @param {any} hass
         */
        set hass(hass) {
          this._hass = hass;
          if(this.card == null || this.card.length === 0) return;
          this.card.hass = hass;
        }

        async setConfig(config) {
          const generation = (this._configGeneration || 0) + 1;
          this._configGeneration = generation;
          if (!this._hass) this._hass = hass();

          const data = config.data;
          const input_entity = config.input_entity ? config.input_entity : "Error";
          let input_name;
          if(config.input_entity){
            input_name = config.input_name || resolveEntityName(
              this._hass,
              undefined,
              config.input_entity,
            );
          }

          this.cardConfig = config.card;

          const cardJson = JSON.stringify(config.card);
          const regex = /\$([0-9]|[aA-zZ])*\$/g;

          const cardParsed = cardJson.replace(regex, function($1,$2) {
            const search = $1.slice(1, -1);
            if(search == 'replace_with_input_entity'){
              return input_entity;
            } else if(search == 'replace_with_input_name'){
              return input_name;
            } else {
              if(config.data){
                return data[search];
              }
            }
          });
          const cardParsedWithBooleans = cardParsed.replaceAll('"false"', 'false').replaceAll('"true"', 'true');

          const card = await this.createCardElement2(JSON.parse(cardParsedWithBooleans));
          if (generation !== this._configGeneration) return;
          this.card = card;
        }

        disconnectedCallback() {
          super.disconnectedCallback();
          this._configGeneration = (this._configGeneration || 0) + 1;
        }

        async createCardElement2(config){
          const cardHelper = await cardHelpers;
          return createCardElementSafe(cardHelper, config, this._hass);
        }

        render() {
          return html`
              ${this.card}
            `;
        }

        static get styles() {
          return css`
          `
        }
      }
      defineDwainsElement("dwains-blueprint-card", DwainsBlueprintCard);

      class DwainsBlueprintCardEditor extends LitElement {
        static get styles() {
          return [
            css`
            ha-formfield, ha-textfield,.formfield {
              width: 100%;
            }
            .formfield {
              margin-bottom: 10px;
            }
            `
          ]
        }
        static get properties() {
          return {
            inputs: {},
            blueprint: {},
          }
        }

        connectedCallback(){
          super.connectedCallback();
          this._loadBlueprintsIfReady();
        }
        _loadBlueprintsIfReady(){
          if (!this.isConnected || !this.hass || !this._config) return;
          this._loadBlueprints().catch((error) => {
            console.error("Failed to load blueprint editor data", error);
          });
        }
        async _loadBlueprints(){
          //Load blueprints
          this.blueprints = await websocketReadStore.read(this.hass, {
            type: 'dwains_dashboard/get_blueprints'
          });
          const blueprint = this.blueprints?.blueprints?.[this._config.blueprint];
          if(blueprint){
              this.blueprint = blueprint;
              if(blueprint.blueprint?.input){
                this.inputs = blueprint.blueprint.input;
                if(!this._config.data || this._config.data.length === 0){
                  const data = {};
                  Object.entries(this.inputs).map(([k,v]) => data[k] = k)
                  this._config.data = data;
                }
              }

              this._config.card = blueprint["card"];

              const event = new Event("config-changed", {
                bubbles: true,
                composed: true
              });
              event.detail = {config: this._config};
              this.dispatchEvent(event);
          }
        }

        setConfig(config) {
          this._config = config;
          if (!this.hass) this.hass = hass();
          this._loadBlueprintsIfReady();
        }

        _inputChanged(ev) {
          const key = ev.target.key;
          const value = ev.target.value;

          const newConfig = this._config;

          newConfig["data"][key] = value;

          const event = new Event("config-changed", {
            bubbles: true,
            composed: true
          });
          event.detail = {config: newConfig};
          this.dispatchEvent(event);
        }

        _checkboxChanged(ev) {
          const key = ev.target.key;
          const value = ev.target.checked;

          const newConfig = this._config;

          newConfig["data"][key] = value;

          const event = new Event("config-changed", {
            bubbles: true,
            composed: true
          });
          event.detail = {config: newConfig};
          this.dispatchEvent(event);
        }

        _renderInput(k,v){
          let value = "";
          if(this._config.data && this._config.data[k]) {
            if(this._config.data[k] != k){
              value = this._config.data[k];
            }
          }
          let card;
          if(v["type"] && v["type"] == 'entity-picker'){
            card = html`
            <ha-entity-picker
                label=${v["name"]}
                .value=${value}
                .key=${k}
                .hass=${this.hass}
                @value-changed=${this._inputChanged}
            ></ha-entity-picker>`;
          } else if(v["type"] && v["type"] == 'icon-picker'){
            card = html`
            <ha-icon-picker
              label=${v["name"]}
              .value=${value}
              .key=${k}
              .name=${v["name"]}
              @value-changed=${this._inputChanged}
            ></ha-icon-picker>
            `;
          } else if(v["type"] && v["type"] == 'checkbox'){
            if(!value && v["default_value"]){
              value = v["default_value"];
            } else {
              value = false;
            }
            card = html`
            <ha-formfield
                  style="display: block;"
                  label=${v["name"]}
                >
                <ha-checkbox
                    @change=${this._checkboxChanged}
                    .checked=${value}
                    .key=${k}
                    .name=${v["name"]}
                  ></ha-checkbox>
            </ha-formfield>
            `;
          } else {
            card = html`
            <ha-textfield
                label=${v["name"]}
                .value=${value}
                .key=${k}
                @input=${this._inputChanged}
            ></ha-textfield>
            `;
          }
          return html`
          <div class="formfield">
            <strong>${v["description"]}</strong>
            ${card}
          </div>
          `;
        }

        render() {
          if(this.blueprints == null || this.blueprints.length === 0 ){
            return html``;
          }

          if(!this.blueprint){
            return html`Blueprint not found!`;
          }
          if(!this.inputs || this.inputs.length === 0){
            return html``;
          }
          return html`
            ${Object.entries(this.inputs).map(([k,v]) => html`${this._renderInput(k,v)}`)}
          `;
        }
      }

defineDwainsElement("dwains-blueprint-card-editor", DwainsBlueprintCardEditor);
      // window.customCards = window.customCards || [];
      // window.customCards.push({
      //   type: "dwains-blueprint-card",
      //   name: "Dwains Blueprint Card",
      //   preview: false, // Optional - defaults to false
      //   description: "Wrapper card for Dwains Dashboard Blueprint." // Optional
      // });
