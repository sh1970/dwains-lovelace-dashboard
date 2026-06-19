import { hass } from "card-tools/src/hass";
import { css, html, LitElement } from 'lit-element';
import translateEngine from './translate-engine';
import { closePopup } from "./helpers";

const bases2 = [customElements.whenDefined('hui-masonry-view'), customElements.whenDefined('hc-lovelace')];
Promise.race(bases2).then(async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const cardHelpers = await window.loadCardHelpers();



  class DwainsEditHomepageHeaderCard extends LitElement {

	    static get styles() {
	      return [
	        css`
	        :host {
	          display: block;
	          color: var(--primary-text-color);
	        }
	        .w-full {
	          width: 100%;
	        }
	        .edit-element {
	          padding: 20px;
	          box-sizing: border-box;
	        }
	        .tabs {
	          display: inline-flex;
	          gap: 4px;
	          padding: 4px;
	          margin-bottom: 18px;
	          border-radius: 10px;
	          background: var(--secondary-background-color);
	        }
	        .tab {
	          border: 0;
	          border-radius: 8px;
	          padding: 9px 14px;
	          font: inherit;
	          font-weight: 600;
	          color: var(--secondary-text-color);
	          background: transparent;
	          cursor: pointer;
	        }
	        .tab.active {
	          color: var(--text-primary-color);
	          background: var(--primary-color);
	        }
	        .setting-list {
	          display: grid;
	          gap: 10px;
	          margin-bottom: 18px;
	        }
	        .setting-row {
	          display: flex;
	          align-items: center;
	          gap: 12px;
	          min-height: 36px;
	          font-size: 14px;
	          cursor: pointer;
	        }
	        .setting-row input {
	          width: 18px;
	          height: 18px;
	          margin: 0;
	          accent-color: var(--primary-color);
	        }
	        .field-stack {
	          display: grid;
	          gap: 14px;
	        }
	        ha-entity-picker {
	          display: block;
	          width: 100%;
	        }
	        .info-panel {
	          line-height: 1.5;
	          font-size: 14px;
	        }
	        .card-footer {
	          display: flex;
	          justify-content: flex-end;
	          gap: 8px;
	          padding-top: 18px;
	          margin-top: 22px;
	          border-top: 1px solid var(--divider-color);
	        }
	        .block {
	          display: block;
	        }
        .hidden {
          display: none;
        }
        `
      ]
    }
    static get properties() {
      return {
        configuration: {},
      }
    }
    setConfig(config) {
      this.hass = hass();
      this.disableClock = config.disableClock ? config.disableClock : false;
      this.amPmClock = config.amPmClock ? config.amPmClock : false;
      this.disableWelcomeMessage = config.disableWelcomeMessage ? config.disableWelcomeMessage : false;
      this.v2Mode = config.v2Mode ? config.v2Mode : false;
      this.weatherEntity = config.weatherEntity ? config.weatherEntity : "";
      this.alarmEntity = config.alarmEntity ? config.alarmEntity : "";
      this.disableSensorGraph = config.disableSensorGraph ? config.disableSensorGraph : false;
      this.selectedTab = 1;
      this.invertCover = config.invertCover ? config.invertCover : false;
    }
    async connectedCallback(){
      //console.log('connectedCallBack');
      super.connectedCallback();

      // First we get an entities card element
      const cardHelpers = await window.loadCardHelpers();
      const entitiesCard = await cardHelpers.createCardElement({type: "entities", entities: []}); // A valid config avoids errors

      // Then we make it load its editor through the static getConfigElement method
      entitiesCard.constructor.getConfigElement();


      await this._loadConfiguration();
    }
    async _loadConfiguration(){
      //Load configuration
      this.configuration = await this.hass.callWS({
        type: 'dwains_dashboard/configuration/get'
      });
    }

    _disableClockValueChanged(ev) {
      this.disableClock = ev.target.checked;
    }
    _amPmClockValueChanged(ev) {
      this.amPmClock = ev.target.checked;
    }
    _disableWelcomeMessageValueChanged(ev) {
      this.disableWelcomeMessage = ev.target.checked;
    }
    _v2ModeValueChanged(ev) {
      this.v2Mode = ev.target.checked;
    }
    _weatherEntityPicked(ev){
      this.weatherEntity = ev.detail.value;
    }
    _alarmEntityPicked(ev){
      this.alarmEntity = ev.detail.value;
    }
    _disableSensorGraphValueChanged(ev){
      this.disableSensorGraph = ev.target.checked;
    }
    _invertCoverValueChanged(ev) {
      this.invertCover = ev.target.checked;
    }

    _saveButton(ev){
      ev.stopPropagation();
      this.hass.connection.sendMessagePromise({
        type: 'dwains_dashboard/edit_homepage_header',
        disableClock: this.disableClock,
        amPmClock: this.amPmClock,
        disableWelcomeMessage: this.disableWelcomeMessage,
        v2Mode: this.v2Mode,
        disableSensorGraph: this.disableSensorGraph,
        weatherEntity: this.weatherEntity ? this.weatherEntity : "",
        alarmEntity: this.alarmEntity ? this.alarmEntity : "",
        invertCover: this.invertCover,
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
	    _handleTabClick(ev){
	      const page = ev.currentTarget.page;
	      this.selectedTab = page;

	      this.requestUpdate();
	    }

	    _renderSettingCheckbox(label, checked, handler) {
	      return html`
	        <label class="setting-row">
	          <input
	            type="checkbox"
	            .checked=${Boolean(checked)}
	            @change=${handler}
	          >
	          <span>${label}</span>
	        </label>
	      `;
	    }

	    render() {
	      if(!this.configuration || this.configuration.length === 0){
	        return html``;
	      }
	      return html`
	      <div class="edit-element">
	        <div class="tabs" role="tablist">
	          <button
	            class="tab ${this.selectedTab == 1 ? 'active' : ''}"
	            type="button"
	            .page=${"1"}
	            @click=${this._handleTabClick}
	          >
	            ${translateEngine(this.hass, 'global.settings')}
	          </button>
	          <button
	            class="tab ${this.selectedTab == 2 ? 'active' : ''}"
	            type="button"
	            .page=${"2"}
	            @click=${this._handleTabClick}
	          >
	            ${translateEngine(this.hass, 'global.dashboard_information')}
	          </button>
	        </div>
	        <div class=${this.selectedTab == 1 ? 'block' : "hidden"}>
	          <div class="setting-list">
	            ${this._renderSettingCheckbox(translateEngine(this.hass, 'global.disable_clock'), this.disableClock, this._disableClockValueChanged)}
	            ${this._renderSettingCheckbox(translateEngine(this.hass, 'global.am_pm_clock'), this.amPmClock, this._amPmClockValueChanged)}
	            ${this._renderSettingCheckbox(translateEngine(this.hass, 'global.disable_welcome_message'), this.disableWelcomeMessage, this._disableWelcomeMessageValueChanged)}
	            ${this._renderSettingCheckbox(translateEngine(this.hass, 'global.v2_mode'), this.v2Mode, this._v2ModeValueChanged)}
	            ${this._renderSettingCheckbox(translateEngine(this.hass, 'global.disable_sensor_graph'), this.disableSensorGraph, this._disableSensorGraphValueChanged)}
	            ${this._renderSettingCheckbox(translateEngine(this.hass, 'global.invert_cover'), this.invertCover, this._invertCoverValueChanged)}
	          </div>
	          <div class="field-stack">
	            <ha-entity-picker
	              .hass=${this.hass}
	              .label=${translateEngine(this.hass, 'global.weather_entity')}
	              .value=${this.weatherEntity}
	              .includeDomains=${["weather"]}
	              @value-changed=${this._weatherEntityPicked}
	            ></ha-entity-picker>
	            <ha-entity-picker
	              .hass=${this.hass}
	              .label=${translateEngine(this.hass, 'global.alarm_entity')}
	              .includeDomains=${["alarm_control_panel"]}
	              .value=${this.alarmEntity}
	              @value-changed=${this._alarmEntityPicked}
	            ></ha-entity-picker>
	          </div>
	        </div>
	        <div class="info-panel ${this.selectedTab == 2 ? 'block' : "hidden"}">
	          <strong>Dwains Dashboard</strong><br>
	          Created by Dwain Scheeren<br>
	          Version ${this.configuration.installed_version}
        </div>
        <div class="card-footer">
          <ha-button slot="secondaryAction" @click=${(e) => closePopup()}>
            ${this.hass.localize("ui.common.cancel")}
          </ha-button>
          <ha-button slot="primaryAction" @click=${this._saveButton}>
            ${this.hass.localize("ui.common.submit")}
          </ha-button>
        </div>
      </div>
      `;
    }
  }
  customElements.define("dwains-edit-homepage-header-card", DwainsEditHomepageHeaderCard);
});
