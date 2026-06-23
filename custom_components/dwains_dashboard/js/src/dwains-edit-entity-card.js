import { hass } from "card-tools/src/hass";
import { css, html, LitElement } from 'lit-element';
import translateEngine from './translate-engine';
import { closePopup } from "./helpers";

const bases2 = [customElements.whenDefined('hui-masonry-view'), customElements.whenDefined('hc-lovelace')];
Promise.race(bases2).then(async () => {
  const cardHelpers = await (window.__dd_wait_card_helpers ? window.__dd_wait_card_helpers() : window.loadCardHelpers());



  class DwainsEditEntityCard extends LitElement {
    static get styles() {
      return [
        css`
        h2 {
          margin: 0;
          font-size: 1rem;
        }
        .edit-element {
          padding: 20px;
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
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 1rem;
        }
        ha-select, select, ha-input, ha-formfield {
          width: 100%;
        }
        select {
          min-height: 56px;
          padding: 0 40px 0 14px;
          color: var(--primary-text-color);
          background: var(--ha-color-surface-high, var(--ha-color-form-background, var(--ha-color-surface-default, var(--card-background-color))));
          border: 1px solid var(--divider-color);
          border-radius: var(--ha-card-border-radius, 12px);
        }
        select:focus, select:focus-visible {
          outline: none;
          border-color: var(--accent-color);
        }
        `
      ]
    }
    setConfig(config) {
      this.hass = hass();
      this.entity = config.entity;
      this.friendlyName = config.friendlyName ? config.friendlyName : "";

      this.hideEntity = config.hideEntity ? config.hideEntity : false;
      this.disableEntity = config.disableEntity ? config.disableEntity : false;
      this.excludeEntity = config.excludeEntity ? config.excludeEntity : false;

      this.rowSpan = config.rowSpan ? config.rowSpan : "1";
      this.colSpan = config.colSpan ? config.colSpan : "1";

      this.rowSpanLg = config.rowSpanLg ? config.rowSpanLg : "1";
      this.colSpanLg = config.colSpanLg ? config.colSpanLg : "1";

      this.rowSpanXl = config.rowSpanXl ? config.rowSpanXl : "1";
      this.colSpanXl = config.colSpanXl ? config.colSpanXl : "1";

      this.customCard = config.customCard ? config.customCard : false;
      this.customPopup = config.customPopup ? config.customPopup : false;
    }
    _saveButton(ev){
      if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
      ev.stopPropagation();
      this.hass.connection.sendMessagePromise({
        type: 'dwains_dashboard/edit_entity',
        entity: this.entity,
        friendlyName: this.friendlyName,

        disableEntity: this.disableEntity,
        hideEntity: this.hideEntity,
        excludeEntity: this.excludeEntity,

        rowSpan: this.rowSpan,
        colSpan: this.colSpan,
        rowSpanLg: this.rowSpanLg,
        colSpanLg: this.colSpanLg,
        rowSpanXl: this.rowSpanXl,
        colSpanXl: this.colSpanXl,

        customCard: this.customCard,
        customPopup: this.customPopup,
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
    _friendlyNameChanged(e) {
      this.friendlyName = e.target.value;
    }
    _disableValueChanged(ev) {
      this.disableEntity = ev.target.checked;
    }
    _hideValueChanged(ev) {
      this.hideEntity = ev.target.checked;
    }
    _excludeValueChanged(ev) {
      this.excludeEntity = ev.target.checked;
    }
    _customCardValueChanged(ev) {
      this.customCard = ev.target.checked;
    }
    _customPopupValueChanged(ev) {
      this.customPopup = ev.target.checked;
    }
    _haSelectChanged(ev) {
      if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
      ev.stopPropagation();
      const target = ev.currentTarget || ev.target;
      const type = target.name || target.type || target.getAttribute?.("type");
      const value = ev.detail?.value ?? ev.detail?.item?.value ?? target.selectedItem?.value ?? target.value;
      if(type && value !== undefined) this[type] = value;
      this.requestUpdate();
    }
    _stopPropagation(ev){
      ev.stopPropagation();
    }
    render() {
      return html`
        <div class="edit-element">
            <h1 style="font-size: 15px; font-weight: bold;">${translateEngine(this.hass, 'entity.edit_entity')} "${this.entity}"</h1>

            <ha-input
              label=${translateEngine(this.hass, 'entity.friendly_name')}
              .value=${this.friendlyName}
              @input=${this._friendlyNameChanged}
            ></ha-input>

            <h2>${translateEngine(this.hass, 'editor.default_col_row')}</h2>
            <div class="grid-2">
              <select name="rowSpan" .value=${this.rowSpan} @change=${this._haSelectChanged} @click=${this._stopPropagation}>
                <option value="1">1 ${translateEngine(this.hass, 'editor.row')}</option>
                <option value="2">2 ${translateEngine(this.hass, 'editor.rows')}</option>
              </select>
              <select name="colSpan" .value=${this.colSpan} @change=${this._haSelectChanged} @click=${this._stopPropagation}>
                <option value="1">1 ${translateEngine(this.hass, 'editor.column')}</option>
                <option value="2">2 ${translateEngine(this.hass, 'editor.columns')}</option>
              </select>
            </div>

            <h2>${translateEngine(this.hass, 'editor.large_col_row')}</h2>
            <div class="grid-2">
              <select name="rowSpanLg" .value=${this.rowSpanLg} @change=${this._haSelectChanged} @click=${this._stopPropagation}>
                <option value="1">1 ${translateEngine(this.hass, 'editor.row')}</option>
                <option value="2">2 ${translateEngine(this.hass, 'editor.rows')}</option>
                <option value="3">3 ${translateEngine(this.hass, 'editor.rows')}</option>
              </select>
              <select name="colSpanLg" .value=${this.colSpanLg} @change=${this._haSelectChanged} @click=${this._stopPropagation}>
                <option value="1">1 ${translateEngine(this.hass, 'editor.column')}</option>
                <option value="2">2 ${translateEngine(this.hass, 'editor.columns')}</option>
                <option value="3">3 ${translateEngine(this.hass, 'editor.columns')}</option>
              </select>
            </div>

            <h2>${translateEngine(this.hass, 'editor.extra_large_col_row')}</h2>
            <div class="grid-2">
              <select name="rowSpanXl" .value=${this.rowSpanXl} @change=${this._haSelectChanged} @click=${this._stopPropagation}>
                <option value="1">1 ${translateEngine(this.hass, 'editor.row')}</option>
                <option value="2">2 ${translateEngine(this.hass, 'editor.rows')}</option>
                <option value="3">3 ${translateEngine(this.hass, 'editor.rows')}</option>
                <option value="4">4 ${translateEngine(this.hass, 'editor.rows')}</option>
              </select>
              <select name="colSpanXl" .value=${this.colSpanXl} @change=${this._haSelectChanged} @click=${this._stopPropagation}>
                <option value="1">1 ${translateEngine(this.hass, 'editor.column')}</option>
                <option value="2">2 ${translateEngine(this.hass, 'editor.columns')}</option>
                <option value="3">3 ${translateEngine(this.hass, 'editor.columns')}</option>
                <option value="4">4 ${translateEngine(this.hass, 'editor.columns')}</option>
              </select>
            </div>

            <ha-formfield label=${translateEngine(this.hass, 'entity.disable')}>
              <ha-checkbox
                @change=${this._disableValueChanged}
                .checked=${this.disableEntity}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield label=${translateEngine(this.hass, 'entity.hide')}>
              <ha-checkbox
                @change=${this._hideValueChanged}
                .checked=${this.hideEntity}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield label=${translateEngine(this.hass, 'entity.exclude')}>
              <ha-checkbox
                @change=${this._excludeValueChanged}
                .checked=${this.excludeEntity}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield label=${translateEngine(this.hass, 'entity.use_entity_card')}>
              <ha-checkbox
                @change=${this._customCardValueChanged}
                .checked=${this.customCard}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield label=${translateEngine(this.hass, 'entity.use_popup_card')}>
              <ha-checkbox
                @change=${this._customPopupValueChanged}
                .checked=${this.customPopup}
              ></ha-checkbox>
            </ha-formfield>

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
  customElements.define("dwains-edit-entity-card", DwainsEditEntityCard);
});
