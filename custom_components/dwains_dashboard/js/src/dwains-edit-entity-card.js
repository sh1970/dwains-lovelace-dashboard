import { hass } from "card-tools/src/hass";
import { css, html, LitElement } from 'lit-element';
import translateEngine from './translate-engine';
import { closePopup } from "./helpers";

const bases2 = [customElements.whenDefined('hui-masonry-view'), customElements.whenDefined('hc-lovelace')];
Promise.race(bases2).then(async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const cardHelpers = await window.loadCardHelpers();



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
          padding: 8px;
          border-top: 1px solid var(--divider-color);
        }
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 1rem;
        }
        ha-select, ha-textfield, mwc-formfield {
          width: 100%;
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
      ev.stopPropagation();
      const type = ev.target.type;
      this[type] = ev.target.value;
    }
    _stopPropagation(ev){
      ev.stopPropagation();
    }
    render() {
      return html`
        <div class="edit-element">
            <h1 style="font-size: 15px; font-weight: bold;">${translateEngine(this.hass, 'entity.edit_entity')} "${this.entity}"</h1>

            <ha-textfield
              .label=${translateEngine(this.hass, 'entity.friendly_name')}
              .value=${this.friendlyName}
              @input=${this._friendlyNameChanged}
            ></ha-textfield>

            <h2>${translateEngine(this.hass, 'editor.default_col_row')}</h2>
            <div class="grid-2">
              <ha-select
                .label=${translateEngine(this.hass, 'editor.row_span')}
                .value=${this.rowSpan}
                .type=${"rowSpan"}
                name="rowSpan"
                @selected=${this._haSelectChanged}
                @closed=${this._stopPropagation}
              >
                <ha-list-item value="1">1 ${translateEngine(this.hass, 'editor.row')}</ha-list-item>
                <ha-list-item value="2">2 ${translateEngine(this.hass, 'editor.rows')}</ha-list-item>
              </ha-select>
              <ha-select
                .label=${translateEngine(this.hass, 'editor.col_span')}
                .value=${this.colSpan}
                .type=${"colSpan"}
                name="colSpan"
                @selected=${this._haSelectChanged}
                @closed=${this._stopPropagation}
              >
                <ha-list-item value="1">1 ${translateEngine(this.hass, 'editor.column')}</ha-list-item>
                <ha-list-item value="2">2 ${translateEngine(this.hass, 'editor.columns')}</ha-list-item>
              </ha-select>
            </div>

            <h2>${translateEngine(this.hass, 'editor.large_col_row')}</h2>
            <div class="grid-2">
              <ha-select
                .label=${translateEngine(this.hass, 'editor.row_span')}
                .value=${this.rowSpanLg}
                .type=${"rowSpanLg"}
                name="rowSpanLg"
                @selected=${this._haSelectChanged}
                @closed=${this._stopPropagation}
              >
                <ha-list-item value="1">1 ${translateEngine(this.hass, 'editor.row')}</ha-list-item>
                <ha-list-item value="2">2 ${translateEngine(this.hass, 'editor.rows')}</ha-list-item>
                <ha-list-item value="3">3 ${translateEngine(this.hass, 'editor.rows')}</ha-list-item>
              </ha-select>
              <ha-select
                .label=${translateEngine(this.hass, 'editor.col_span')}
                .value=${this.colSpanLg}
                .type=${"colSpanLg"}
                name="colSpanLg"
                @selected=${this._haSelectChanged}
                @closed=${this._stopPropagation}
              >
                <ha-list-item value="1">1 ${translateEngine(this.hass, 'editor.column')}</ha-list-item>
                <ha-list-item value="2">2 ${translateEngine(this.hass, 'editor.columns')}</ha-list-item>
                <ha-list-item value="3">3 ${translateEngine(this.hass, 'editor.columns')}</ha-list-item>
              </ha-select>
            </div>

            <h2>${translateEngine(this.hass, 'editor.extra_large_col_row')}</h2>
            <div class="grid-2">
              <ha-select
                .label=${translateEngine(this.hass, 'editor.row_span')}
                .value=${this.rowSpanXl}
                .type=${translateEngine(this.hass, 'editor.row_span')}
                name="rowSpanXl"
                @selected=${this._haSelectChanged}
                @closed=${this._stopPropagation}
              >
                <ha-list-item value="1">1 ${translateEngine(this.hass, 'editor.row')}</ha-list-item>
                <ha-list-item value="2">2 ${translateEngine(this.hass, 'editor.rows')}</ha-list-item>
                <ha-list-item value="4">3 ${translateEngine(this.hass, 'editor.rows')}</ha-list-item>
                <ha-list-item value="4">4 ${translateEngine(this.hass, 'editor.rows')}</ha-list-item>
              </ha-select>
              <ha-select
                .label=${translateEngine(this.hass, 'editor.col_span')}
                .value=${this.colSpanXl}
                .type=${"colSpanXl"}
                name="colSpanXl"
                @selected=${this._haSelectChanged}
                @closed=${this._stopPropagation}
              >
                <ha-list-item value="1">1 ${translateEngine(this.hass, 'editor.column')}</ha-list-item>
                <ha-list-item value="2">2 ${translateEngine(this.hass, 'editor.columns')}</ha-list-item>
                <ha-list-item value="3">3 ${translateEngine(this.hass, 'editor.columns')}</ha-list-item>
                <ha-list-item value="4">4 ${translateEngine(this.hass, 'editor.columns')}</ha-list-item>
              </ha-select>
            </div>

            <mwc-formfield .label=${translateEngine(this.hass, 'entity.disable')}>
              <ha-checkbox
                @change=${this._disableValueChanged}
                .checked=${this.disableEntity}
              ></ha-checkbox>
            </mwc-formfield>
            <mwc-formfield .label=${translateEngine(this.hass, 'entity.hide')}>
              <ha-checkbox
                @change=${this._hideValueChanged}
                .checked=${this.hideEntity}
              ></ha-checkbox>
            </mwc-formfield>
            <mwc-formfield .label=${translateEngine(this.hass, 'entity.exclude')}>
              <ha-checkbox
                @change=${this._excludeValueChanged}
                .checked=${this.excludeEntity}
              ></ha-checkbox>
            </mwc-formfield>
            <mwc-formfield .label=${translateEngine(this.hass, 'entity.use_entity_card')}>
              <ha-checkbox
                @change=${this._customCardValueChanged}
                .checked=${this.customCard}
              ></ha-checkbox>
            </mwc-formfield>
            <mwc-formfield .label=${translateEngine(this.hass, 'entity.use_popup_card')}>
              <ha-checkbox
                @change=${this._customPopupValueChanged}
                .checked=${this.customPopup}
              ></ha-checkbox>
            </mwc-formfield>

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