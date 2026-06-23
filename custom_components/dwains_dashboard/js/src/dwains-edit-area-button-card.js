import { hass } from "card-tools/src/hass";
import { css, html, LitElement } from 'lit-element';
import translateEngine from './translate-engine';
import { closePopup } from "./helpers";

const bases2 = [customElements.whenDefined('hui-masonry-view'), customElements.whenDefined('hc-lovelace')];
Promise.race(bases2).then(async () => {
  const cardHelpers = await (window.__dd_wait_card_helpers ? window.__dd_wait_card_helpers() : window.loadCardHelpers());





  class DwainsEditAreaButtonCard extends LitElement {
    static get styles() {
      return [
        css`
        .edit-element {
          padding: 20px;
          max-width: 460px;
          margin-right: auto;
          margin-left: auto;
        }
        .edit-element ha-icon-picker, .edit-element ha-select, .edit-element ha-entity-picker {
          display: block;
          margin: .8rem 0;
        }
        .edit-element ha-formfield {
          display: flex;
          align-items: center;
          gap: .6rem;
          margin: .9rem 0;
          padding-inline-start: .25rem;
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
        `
      ]
    }
    setConfig(config) {
      this.hass = hass();
      this.areaId = config.areaId;
      this.icon = config.icon ? config.icon : "";
      this.disableArea = config.disableArea ? config.disableArea : false;
      this.hideIcon = config.hideIcon ? config.hideIcon : false;
    }
    async connectedCallback(){
      //console.log('connectedCallBack');
      super.connectedCallback();

      // //loadHaYamlEditor Start
      //   if (customElements.get("ha-yaml-editor")) return;

      //   // Load in ha-yaml-editor from developer-tools-service
      //   const ppResolver = document.createElement("partial-panel-resolver");
      //   const routes = (ppResolver).getRoutes([
      //     {
      //       component_name: "developer-tools",
      //       url_path: "a",
      //     },
      //   ]);
      //   await routes.routes.a.load();
      //   const devToolsRouter = document.createElement("developer-tools-router");
      //   await (devToolsRouter).routerOptions.routes.service.load();
      // //loadHaYamlEditor End
      const ch = await window.loadCardHelpers();
      const c = await ch.createCardElement({ type: "button" });
      await c.constructor.getConfigElement();
    }
    _iconPickerChange(ev){
      this.icon = ev.detail['value'];
    }
    _disableValueChanged(ev) {
      this.disableArea = ev.target.checked;
    }
    _hideIconValueChanged(ev) {
      this.hideIcon = ev.target.checked;
      this.requestUpdate();
    }
    _saveButton(ev){
      if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
      ev.stopPropagation();
      this.hass.connection.sendMessagePromise({
        type: 'dwains_dashboard/edit_area_button',
        icon: this.icon,
        areaId: this.areaId,
        disableArea: this.disableArea,
        hideIcon: this.hideIcon,
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
    render() {
      return html`
      <div class="edit-element">
          <ha-icon-picker
            label=${translateEngine(this.hass, 'area.icon')}
            .value=${this.icon}
            .name=${translateEngine(this.hass, 'area.icon')}
            .disabled=${this.hideIcon}
            @value-changed=${this._iconPickerChange}
          ></ha-icon-picker>
          <ha-formfield>
            <ha-checkbox
              @change=${this._hideIconValueChanged}
              .checked=${this.hideIcon}
            ></ha-checkbox>
            <span slot="label">${translateEngine(this.hass, 'area.hide_icon')}</span>
          </ha-formfield>
          <ha-formfield>
            <ha-checkbox
              @change=${this._disableValueChanged}
              .checked=${this.disableArea}
            ></ha-checkbox>
            <span slot="label">${translateEngine(this.hass, 'area.disable')}</span>
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
  customElements.define("dwains-edit-area-button-card", DwainsEditAreaButtonCard);
});
