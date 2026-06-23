import { lovelace_view } from "card-tools/src/hass";
import { fireEvent } from "card-tools/src/event";
import { css, html, LitElement } from 'lit-element';
import translateEngine from './translate-engine';
import { closePopup } from "./helpers";

class DwainsEditMorePageCard extends LitElement {
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
        `
    ]
    }
    static get properties() {
    return {
        mode: {},
        blueprints: {},
        _hass: {},
    }
    }

    set hass(hass) {
    this._hass = hass;
    }

    setConfig(config) {
    console.log('DwainsEditMorePageCard...');
    this.mode = config.mode ? config.mode : 'pre-select'; //Set default mode to hui-card-picker
    this.foldername = config.foldername ? config.foldername : "";
    if(config.cardConfig){
        const cardConfig = config.cardConfig;
        delete cardConfig["input_entity"];
        delete cardConfig["input_name"];
        this.cardConfig = cardConfig;
    } else {
        this.cardConfig = "";
    }

    this.name = config.name ? config.name : "";
    this.icon = config.icon ? config.icon : "";
    this.showInNavbar = config.showInNavbar ? config.showInNavbar : false;

    const loader = document.createElement("hui-masonry-view");
    loader.lovelace = { editMode: true };
    loader.willUpdate(new Map());
    }
    async connectedCallback(){
    super.connectedCallback();

    await this._loadBlueprints();

    const ch = await window.loadCardHelpers();
    const c = await ch.createCardElement({ type: "button" });
    await c.constructor.getConfigElement();
    }

    async _loadBlueprints(){
    //Load blueprints
    this.blueprints = await this._hass.callWS({
        type: 'dwains_dashboard/get_blueprints'
    });
    }
    magicStuff(ev) {
    //console.log(ev.detail.config);
    this.cardConfig = ev.detail.config;
    this.mode = 'editor-element';
    this.requestUpdate();
    }
    magicStuffSecond(ev){
    //console.log(ev);
    }
    _sendCard(){
    const cardData = JSON.stringify(this.cardConfig);

    if(!this.name){
        alert(translateEngine(this._hass, 'more.name_required'));
        return;
    }

    if(this.showInNavbar && !this.icon){
        alert(translateEngine(this._hass, 'more.icon_required'));
        return;
    }

    //console.log(cardData);
    this._hass.connection.sendMessagePromise({
        type: 'dwains_dashboard/edit_more_page',
        card_data: cardData,
        foldername: this.foldername,
        name: this.name,
        icon: this.icon,
        showInNavbar: this.showInNavbar,
    }).then(
        (resp) => {
            console.log(resp);
            const ll = lovelace_view();
            if (ll)
                fireEvent("config-refresh", {}, ll);
                let path = window.location.pathname;
                let nav_path = path.substring(1, path.lastIndexOf('/'));

                //Location check if user is in dwains dashboard
                if(nav_path == "dwains-dashboard"){
                setTimeout(function() {
                    document.location.reload()
                }, 1000);
            }
            closePopup();
        },
        (err) => {
            console.error('Message failed!', err);
        }
    );
    }
    _switchMode(ev){
    const mode = ev.currentTarget.mode;
    this.mode = mode;
    this.requestUpdate();
    }

    //More page settings
    _iconPickerChange(ev){
    this.icon = ev.detail['value'];
    }
    _showInMainNavbarValueChanged(ev) {
    this.showInNavbar = ev.target.checked;
    }
    _nameChanged(e) {
    this.name = e.target.value;
    }
    //End more page settings

    _removeMorePage(ev){
    this._hass.connection.sendMessagePromise({
        type: 'dwains_dashboard/remove_more_page',
        foldername: this.foldername,
    }).then(
        (resp) => {
            console.log(resp);
            closePopup();
            document.location = 'more_page';
        },
        (err) => {
            console.error('Message failed!', err);
        }
    );
    }
    _handleDeleteBlueprintClicked(ev){
    const blueprint = ev.currentTarget.blueprint;
    this._hass.connection.sendMessagePromise({
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

    //this.mode = 'dwains-dashboard-blueprint-selected';
    this.mode = 'editor-element';
    this.name = this.blueprints["blueprints"][blueprint]["blueprint"]["name"];
    this.cardConfig = {
        "type": "custom:dwains-blueprint-card",
        "blueprint": blueprint,
        "card": this.blueprints["blueprints"][blueprint]['card']
    };
    }
    _installBlueprintYamlChanged(e) {
    this.installBlueprintYaml = e.target.value;
    }
    _handleInstallBlueprintClicked(ev) {
    if(!this.installBlueprintYaml){
        alert(translateEngine(this._hass, 'blueprint.yaml_required'));
    }
    this._hass.connection.sendMessagePromise({
        type: 'dwains_dashboard/install_blueprint',
        yamlCode: JSON.stringify(this.installBlueprintYaml),
    }).then(
        (resp) => {
            console.log(resp);
            if(resp["succesfull"]){
            alert(this._hass.localize("ui.common.successfully_saved"));
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
        ${cardInstalled ? html`(${translateEngine(this._hass, 'blueprint.installed')})` : html`(${translateEngine(this._hass, 'blueprint.not_installed')})`}
        </div>
    `;
    }

    render() {
    if(this.blueprints == null || this.blueprints.length === 0 ){
        return html``;
    }

    if(this.mode == 'pre-select') {
        return html`
        <ha-md-list>
            <ha-list-item twoline .mode=${"hui-card-picker"} @click=${this._switchMode}>
            ${translateEngine(this._hass, 'editor.lovelace_card')}
            <span slot="secondary">
                ${translateEngine(this._hass, 'editor.create_lovelace_card')}
            </span>
            </ha-list-item>
            <li divider role="separator"></li>
            <ha-list-item hasmeta twoline .mode=${"dwains-dashboard-blueprint-select"} @click=${this._switchMode}>
            ${translateEngine(this._hass, 'editor.dwains_dashboard_blueprint')}
            <span slot="secondary">
                ${translateEngine(this._hass, 'editor.use_dwains_dashboard_blueprint')}
            </span>
            <ha-icon-next slot="meta"></ha-icon-next
            ></ha-list-item>
        </ha-md-list>
        `;
    }
    if(this.mode == 'dwains-dashboard-blueprint-select'){
        const blueprintsSorted = Object.entries(this.blueprints['blueprints']).sort(function (x, y) {
        let a = x[1].blueprint.type,
            b = y[1].blueprint.type;
        return a == b ? 0 : a > b ? 1 : -1;
        });
        return html`
        <div class="edit-element">

        <div style="margin-bottom: 20px;">
            <ha-button .mode=${"pre-select"} @click=${this._switchMode}>< ${this._hass.localize("ui.common.previous")}</ha-button>
        </div>

        <strong>${translateEngine(this._hass, 'blueprint.installed_blueprints')}:</strong>
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${translateEngine(this._hass, 'blueprint.title')}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${translateEngine(this._hass, 'global.version')}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${translateEngine(this._hass, 'blueprint.type')}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${translateEngine(this._hass, 'blueprint.used_custom_cards')}</th>
                <th scope="col" class="relative px-6 py-3">
                </th>
            </tr>
            </thead>
            <tbody>
            ${Object.values(this.blueprints['blueprints']).length == 0 ? html `
                <tr>
                <td  class="px-6 py-4" colspan="5">${translateEngine(this._hass, 'blueprint.no_blueprints_installed')}</td>
                </tr>` : html`
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
                            ${v[1]["blueprint"]["type"] == "page" ? html`
                            <ha-button .blueprint=${v[0]} @click=${this._handleUseBlueprintClicked} unelevated>
                                ${translateEngine(this._hass, 'blueprint.use')}
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
                `
            }
            </tbody>
        </table>
        <div class="seperator"></div>
        <strong>${translateEngine(this._hass, 'blueprint.install')}</strong>
        <p>${translateEngine(this._hass, 'blueprint.instruction')}</p>
        <a href="https://github.com/dwainscheeren/dwains-dashboard-blueprints" target="_blank">Dwains Dashboard Blueprints Github</a>
        <ha-yaml-editor
            label=${translateEngine(this._hass, 'blueprint.yaml_code')}
            name="description"
            @value-changed=${this._installBlueprintYamlChanged}
        ><ha-code-editor mode="yaml" autocomplete-entities="" autocomplete-icons="" dir="ltr"></ha-code-editor></ha-yaml-editor>
        <div style="margin-top: 15px; margin-bottom: 20px;">
            <ha-button @click=${this._handleInstallBlueprintClicked} unelevated>
            ${translateEngine(this._hass, 'blueprint.install')}
            </ha-button>
        </div>
        </div>`;
    }
    if(this.mode == 'hui-card-picker'){
        return html`
        <div class="edit-element">
            <h1 style="font-size: 17px; font-weight: bold;"></h1>
            <hui-card-picker
            @config-changed=${this.magicStuff}
            .hass=${this._hass}
            .lovelace=${{views: []}}
            ></hui-card-picker>
        </div>
        `;
    }
    if(this.mode == 'editor-element') {

        return html`
        <div class="edit-element">
            <div class="more-page-settings">
            <ha-textfield
                label=${translateEngine(this._hass, 'more.name')}
                .name=${translateEngine(this._hass, 'more.name')}
                .value=${this.name}
                .style=${"width: 100%"}
                @input=${this._nameChanged}
            ></ha-textfield>
            <ha-icon-picker
                label=${translateEngine(this._hass,'more.icon')}
                .value=${this.icon}
                @value-changed=${this._iconPickerChange}
            ></ha-icon-picker>
            <ha-formfield>
                <ha-checkbox
                @change=${this._showInMainNavbarValueChanged}
                .checked=${this.showInNavbar}
                ></ha-checkbox>
              <span slot="label">${translateEngine(this._hass,'more.add_navbar')}</span>
            </ha-formfield>
            </div>

            <hui-card-element-editor
            @save-config=${this.magicStuffSecond}
            @config-changed=${this.magicStuff}
            .value=${this.cardConfig}
            .hass=${this._hass}
            .lovelace=${{views: []}}
            ></hui-card-element-editor>
            <hui-card-preview
            .hass=${this._hass}
            .config=${this.cardConfig}
            ></hui-card-preview>
            <div class="card-footer">
            ${this.foldername ? html `<ha-button @click=${this._removeMorePage}>${this._hass.localize("ui.common.remove")}</ha-button>` : ""}
            <ha-button @click=${this._sendCard}>${this._hass.localize("ui.common.submit")}</ha-button>
            </div>
        </div>
        `;
    }
    }
}
customElements.define("dwains-edit-more-page-card", DwainsEditMorePageCard);
