import { hass } from "card-tools/src/hass";
import { css, html, LitElement } from 'lit-element';
import translateEngine from './translate-engine';
import { closePopup } from "./helpers";

const bases2 = [customElements.whenDefined('hui-masonry-view'), customElements.whenDefined('hc-lovelace')];
Promise.race(bases2).then(async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  const cardHelpers = await window.loadCardHelpers();





  class DwainsEditAreaButtonCard extends LitElement {
    static get styles() {
      return [
        css`
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
        `
      ]
    }
    setConfig(config) {
      this.hass = hass();
      this.areaId = config.areaId;
      this.icon = config.icon ? config.icon : "";
      this.floor = config.floor ? config.floor : "";
      this.disableArea = config.disableArea ? config.disableArea : false;
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
    _floorChanged(ev){
      this.floor = ev.target.value;
    }
    _disableValueChanged(ev) {
      this.disableArea = ev.target.checked;
    }
    _saveButton(ev){
      ev.stopPropagation();
      this.hass.connection.sendMessagePromise({
        type: 'dwains_dashboard/edit_area_button',
        icon: this.icon,
        areaId: this.areaId,
        floor: this.floor,
        disableArea: this.disableArea,
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
            .label=${translateEngine(this.hass, 'area.icon')}
            .value=${this.icon}
            .name=${translateEngine(this.hass, 'area.icon')}
            @value-changed=${this._iconPickerChange}
          ></ha-icon-picker>
          <ha-textfield
            .label=${translateEngine(this.hass, 'area.floor')}
            .name=${translateEngine(this.hass, 'area.floor')}
            .value=${this.floor}
            .style=${"width: 100%"}
            @input=${this._floorChanged}
          ></ha-textfield>
          <mwc-formfield .label=${translateEngine(this.hass, 'area.disable')}>
            <ha-checkbox
              @change=${this._disableValueChanged}
              .checked=${this.disableArea}
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
  customElements.define("dwains-edit-area-button-card", DwainsEditAreaButtonCard);
});