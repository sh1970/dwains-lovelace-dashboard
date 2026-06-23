import { hass } from "card-tools/src/hass";
import { css, html, LitElement } from 'lit-element';
import translateEngine from './translate-engine';
import { closePopup } from "./helpers";

const bases2 = [customElements.whenDefined('hui-masonry-view'), customElements.whenDefined('hc-lovelace')];
Promise.race(bases2).then(async () => {
  const cardHelpers = await (window.__dd_wait_card_helpers ? window.__dd_wait_card_helpers() : window.loadCardHelpers());


    class DwainsEditDeviceButtonCard extends LitElement {
      static get styles() {
        return [
          css`
        .edit-element {
          padding: 20px;
          max-width: 460px;
          margin-right: auto;
          margin-left: auto;
        }
        .edit-element ha-icon-picker, .edit-element ha-textfield, .edit-element ha-select, .edit-element ha-entity-picker {
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
          ha-formfield {
            padding: 16px 6px;
          }
          `
        ]
      }
      setConfig(config) {
        this.hass = hass();
        this.device = config.device;
        this.icon = config.icon ? config.icon : "";
        this.showInNavbar = config.showInNavbar ? config.showInNavbar : false;
      }
      async connectedCallback(){
        super.connectedCallback();

        //loadHaYamlEditor Start
          if (customElements.get("ha-yaml-editor")) return;

          // Load in ha-yaml-editor from developer-tools-service
          const ppResolver = document.createElement("partial-panel-resolver");
          const routes = (ppResolver).getRoutes([
            {
              component_name: "developer-tools",
              url_path: "a",
            },
          ]);
          await routes.routes.a.load();
          const devToolsRouter = document.createElement("developer-tools-router");
          await (devToolsRouter).routerOptions.routes.service.load();
        //loadHaYamlEditor End
      }
      _iconPickerChange(ev){
        this.icon = ev.detail['value'];
      }
      _showInMainNavbarValueChanged(ev) {
        this.showInNavbar = ev.target.checked;
      }
      _saveButton(ev){
        if(window.__dd_close_parent_dropdown) window.__dd_close_parent_dropdown(ev);
        ev.stopPropagation();

        if(this.showInNavbar && !this.icon){
          alert(translateEngine(this.hass, 'device.icon_required'));
          return;
        }

        this.hass.connection.sendMessagePromise({
          type: 'dwains_dashboard/edit_device_button',
          icon: this.icon,
          device: this.device,
          showInNavbar: this.showInNavbar,
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
              label=${translateEngine(this.hass, 'device.icon')}
              .value=${this.icon}
              @value-changed=${this._iconPickerChange}
            ></ha-icon-picker>

          <ha-formfield>
              <ha-switch
                @change=${this._showInMainNavbarValueChanged}
                .checked=${this.showInNavbar}
              ></ha-switch>
            <span slot="label">${translateEngine(this.hass,'device.show_in_navbar')}</span>
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
    customElements.define("dwains-edit-device-button-card", DwainsEditDeviceButtonCard);

});
