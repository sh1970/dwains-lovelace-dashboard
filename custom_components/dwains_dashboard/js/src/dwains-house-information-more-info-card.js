import { css, html, LitElement } from 'lit-element';
import { closePopup } from "./helpers";
import translateEngine from './translate-engine';
import {
    STATES_OFF,
    UNAVAILABLE_STATES,
} from './variables'
import {
    computeDomain
} from 'custom-card-helpers';

class DwainsHouseInformationMoreInfoCard extends LitElement {
    static get styles() {
        return css`
        .p-20px {
            padding: 20px;
        }
        .flex {
            display: flex;
        }
        .grid-flow-row-dense {
            grid-auto-flow: row dense

        }
        .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr))
        }
        .grid {
            display: grid;
            gap: 1rem;
        }
        .cards.single-card-section > * {
            grid-column: 1 / -1;
        }
        @media (min-width: 1024px) {
            .lg-grid-cols-3 {
                grid-template-columns: repeat(3, minmax(0, 1fr))
            }
        }
        @media (min-width: 1536px) {
            .xl-col-span-4 {
                grid-column: span 4 / span 4
            }
        }
        .font-semibold {
            font-weight: 600;
        }
        h1, h2, h3, h4, h5, h6 {
            font-size: inherit;
        }
        h3 {
            font-size: 1.5rem;
            padding-bottom: 0.5rem;
        }
        blockquote, dd, dl, figure, h1, h2, h3, h4, h5, h6, hr, p, pre {
            margin: 0;
        }
        .p-2 {
            padding: 0.5rem;
        }
        .cursor-pointer {
            cursor: pointer;
        }
        .space-x-2>:not([hidden])~:not([hidden]) {
            --tw-space-x-reverse: 0;
            margin-right: calc(0.5rem * var(--tw-space-x-reverse));
            margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
        }
        .capitalize {
            text-transform: capitalize;
        }
        .icon ha-state-icon {
            display: inline-block;
            margin: auto;
            --mdc-icon-size: 100% !important;
            --iron-icon-width: 100% !important;
            --iron-icon-height: 100% !important;

            width: 1.5rem;
            height: 1.5rem;
        }
        .icon {
            padding: 0.75rem;
            background-color: var(--secondary-background-color);
            border-radius: 999px;
        }
        .information {
            line-height: 1.10;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .information .state {
            font-size: 0.9rem;
            line-height: 1.25rem;
            color: var(--paper-item-body-secondary-color, var(--secondary-text-color));
        }
        .handle-button {
            background-color: var(--secondary-background-color);
            border-radius: var(--ha-card-border-radius, 4px);
            color: var(--primary-text-color);
            display: block;
            text-align: center;
            padding: 0.75rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1rem;
        }
        .single-button {

        }
        .two-buttons {
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(2,minmax(0,1fr));
        }
        .mb-5 {
            margin-bottom: 1.5rem;
        }
        `;
    }

    static get properties() {
        return {
            _hass: {},
            configuration: {},
            areas: { type: Object },
        }
    }

    constructor() {
        super();
        this.areas = {};
        this._debounceTimer = null;

    }

    set hass(hass) {
        this._hass = hass;
        this._debounceLoadCards();
    }

    async _debounceLoadCards() {
        // Debounce periode in milliseconden
        const debouncePeriod = 100;

        // Reset bestaande timer
        if (this._debounceTimer) {
            clearTimeout(this._debounceTimer);
        }

        // Stel een nieuwe timer in
        this._debounceTimer = setTimeout(async () => {
            await this.loadCards();
            this.requestUpdate();
        }, debouncePeriod);
    }

    async setConfig(config) {
        if (!config.entities) {
            throw new Error("Specify entities list");
        }

        this._config = config;
        this.entities = config.entities;
        this.domain = config.domain;
        this.deviceClass = config.deviceClass;

        // Asynchroon kaarthelpers laden
        this.cardHelpers = await window.loadCardHelpers();
        //await this.loadCards();
    }

    async loadCards() {
        this.configuration = await this._hass.callWS({
            type: 'dwains_dashboard/configuration/get'
        });

        // Reset areas elke keer als kaarten geladen worden om enkel actieve gebieden te tonen
        this.areas = {};

        for (const entityConfig of this.entities) {
            const stateObj = this._hass.states[entityConfig.entity_id];
            let isOn = false;

            if (stateObj) {
                if (stateObj.entity_id.startsWith("cover.")) {
                    if ( !UNAVAILABLE_STATES.includes(stateObj.state) && !STATES_OFF.includes(stateObj.state) && !this.configuration['homepage_header']['invert_cover']) {
                        isOn = true;
                    }
                    else if ( !UNAVAILABLE_STATES.includes(stateObj.state) && STATES_OFF.includes(stateObj.state) && this.configuration['homepage_header']['invert_cover']) {
                        isOn = true;
                    }
                }

                //console.log('Debugging'+entityConfig.entity_id, stateObj.attributes.device_class, this.deviceClass)
                if (!UNAVAILABLE_STATES.includes(stateObj.state) && !STATES_OFF.includes(stateObj.state) && !stateObj.entity_id.startsWith("cover.")) {
                    // Basiscontrole voor de meeste domeinen
                    isOn = true;
                }

                // Do not gate climate cards on hvac_action: an enabled unit may
                // legitimately be idle and must still be visible in the popup.

                // if (isOn) {
                //     const card = await this.createEntityCard(entityConfig.entity_id, entityConfig.friendlyName);
                //     if (card) {
                //         const areaId = entityConfig.area.area_id || 'default';
                //         const areaName = entityConfig.area.name || 'Default';
                //         if (!this.areas[areaId]) {
                //             this.areas[areaId] = { cards: [], name: areaName }; // Voeg naam toe voor vriendelijke weergave
                //         }
                //         this.areas[areaId].cards.push(card);
                //     }
                // }

                // Check voor deviceClass overeenkomst als deviceClass is opgegeven
                const deviceClassMatches = !this.deviceClass || (stateObj.attributes.device_class === this.deviceClass);

                if (isOn && deviceClassMatches) {
                    const card = await this.createEntityCard(entityConfig.entity_id, entityConfig.friendlyName);
                    if (card) {
                        const areaId = entityConfig.area.area_id || 'default';
                        const areaName = entityConfig.area.name || 'Default';

                        if (!this.areas[areaId]) {
                            this.areas[areaId] = { cards: [], name: areaName }; // Voeg naam toe voor vriendelijke weergave
                        }
                        this.areas[areaId].cards.push(card);
                    }
                }
            }
        }
    }


    async createEntityCard(entityId, friendlyName) {
        const stateObj = this._hass.states[entityId];
        const domain = entityId.substr(0, entityId.indexOf("."));
        if (!stateObj) return null;

        // Configuratie op basis van stateObj of entityId
        let cardConfig = {
        };
        switch(domain) {
            default:
                // cardConfig = {
                //   type: "custom:dwains-button-card",
                //   friendly_name: friendlyName
                // };
                cardConfig = {
                type: "tile",
                name: friendlyName,
                }
                break;
            case "camera":
                cardConfig = {
                type: "picture-entity",
                camera_view: "auto"
                };
                rowSpan = "2";
                colSpan = "2";
                rowSpanLg = "2";
                colSpanLg = "2";
                rowSpanXl = "2";
                colSpanXl = "2";
                break;
            case "climate":
                // cardConfig = {
                //   type: "custom:dwains-thermostat-card",
                //   friendly_name: friendlyName
                // };
                cardConfig = {
                type: "thermostat",
                name: friendlyName,
                features: [
                    {
                    type: "climate-fan-modes",
                    fan_modes: ["quiet","low","medium","high"],
                    },
                    {
                    type: "climate-hvac-modes",
                    hvac_modes: ["heat_cool","heat","dry","fan_only","cool","off"]
                    }
                ]
                }
                break;
            case "cover":
                // cardConfig = {
                //   type: "custom:dwains-cover-card",
                //   friendly_name: friendlyName
                // };
                cardConfig = {
                type: "tile",
                name: friendlyName,
                features: [
                    {
                    type: "cover-open-close"
                    },
                    {
                    type: "cover-position"
                    }
                ]
                }
                break;
            case "light":
                // cardConfig = {
                //   type: "custom:dwains-light-card",
                //   friendly_name: friendlyName
                // };
                cardConfig = {
                type: "tile",
                name: friendlyName,
                features: [
                    {
                    type: "light-brightness",
                    }
                ]
                };
            break;
        }

        cardConfig = {entity: entityId,...cardConfig};

        const element = await this.cardHelpers.createCardElement(cardConfig);
        element.hass = this._hass;
        return element;
    }

    _navigateToDevices(ev) {
        const domain = ev.currentTarget.domain;

        closePopup();

        let e;
        let path = window.location.pathname;
        let nav_path = path.substring(0, path.lastIndexOf('/')) + "/devices#" + domain;
        window.history.pushState(null, '', nav_path);
        e = new Event('location-changed', { composed: true });
        e.detail = { replace: false };
        window.dispatchEvent(e);
    }

    _currentOn() {
        const entitiesStates = [];
        const deviceClass = this.deviceClass;

        for (const entity of this.entities) {
            const stateObj = this._hass.states[entity.entity_id];

            if (!stateObj) {
                continue;
            }

            entitiesStates.push({
                area: entity.area,
                stateObj: stateObj
            });
        }

        if (!entitiesStates) {
            return undefined;
        }

        if (this.domain == 'climate') {
            const climateStates = [];
            for (const climate of entitiesStates) {
                if (climate.stateObj.attributes['hvac_action'] && climate.stateObj.attributes['hvac_action'] != 'idle') {
                    if (!UNAVAILABLE_STATES.includes(climate.stateObj.attributes['hvac_action']) && !STATES_OFF.includes(climate.stateObj.attributes['hvac_action'])) {
                        climateStates.push({
                            area: climate.area,
                            stateObj: climate.stateObj
                        });
                    }
                } else if (!climate.stateObj.attributes['hvac_action']) {
                    if (!UNAVAILABLE_STATES.includes(climate.stateObj.state) && !STATES_OFF.includes(climate.stateObj.state)) {
                        climateStates.push({
                            area: climate.area,
                            stateObj: climate.stateObj
                        });
                    }
                }
            }
            return climateStates;
        } else {

            return ((
                deviceClass
                    ? entitiesStates.filter(
                        (entity) => entity.stateObj.attributes.device_class === deviceClass
                    )
                    : entitiesStates
            ).filter(
                (entity) =>
                    !UNAVAILABLE_STATES.includes(entity.stateObj.state) &&
                    !STATES_OFF.includes(entity.stateObj.state)
            ));
        }
    }

    _handleTurnAllOffClicked(ev) {
        const currentOn = this._currentOn();
        if (currentOn.length == 0) {
            closePopup();
        }
        currentOn.map((entity) => {
            const entityId = entity.stateObj.entity_id;
            const stateDomain = computeDomain(entityId);
            const serviceDomain = stateDomain === "group" ? "homeassistant" : stateDomain;
            let service;
            switch (stateDomain) {
                case "lock":
                    service = "lock";
                    break;
                case "cover":
                    service = "close_cover";
                    break;
                default:
                    service = "turn_off";
            }

            this._hass.callService(serviceDomain, service, { entity_id: entityId });
        });
    }

    render() {
        if (!this._hass || !this._config || Object.keys(this.areas).length === 0) {
            return html``; // Niets te renderen
        }

        let turnAllOff = false;
        if (this.domain == 'light' || this.domain == 'switch' || this.domain == 'cover') {
            turnAllOff = true;
        }

        return html`
            <div class="p-20px">
                ${Object.entries(this.areas).map(([areaId, area]) => html`
                    <div class="area mb-5" id="area-${areaId}">
                        <h3 class="font-semibold capitalize text-gray">${area.name}</h3>
                        <div class="cards grid grid-flow-row-dense grid-cols-2 ${area.cards.length === 1 ? 'single-card-section' : ''} gap-4">
                            ${area.cards.map(card => html`${card}`)}
                        </div>
                    </div>
                `)}
                <div class="${turnAllOff ? 'two-buttons' : 'single-button'}">
                    ${turnAllOff ? html`
                    <div class="handle-button" @click=${this._handleTurnAllOffClicked}>
                        ${translateEngine(this._hass, 'device.turn_all_off')}
                    </div>
                    ` : ""}
                    <div class="handle-button" @click=${this._navigateToDevices} .domain=${this.domain}>
                        ${translateEngine(this._hass, 'device.see_all')}
                        <ha-icon
                        .icon=${"mdi:chevron-right"}
                        ></ha-icon>
                    </div>
                </div>
            </div>
        `;
    }


    // Helper functies zoals _handleMoreInfo, etc.
}

customElements.define("dwains-house-information-more-info-card", DwainsHouseInformationMoreInfoCard);
