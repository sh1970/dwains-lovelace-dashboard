import {
    lovelace_view,
    hass
} from "card-tools/src/hass";
import { popUp } from "./dwains-popup";
import { fireEvent } from "card-tools/src/event";
import {
    applyThemesOnElement,
    computeDomain
} from 'custom-card-helpers';
//Herschreven
function getLovelace() {
    let root = document.querySelector('home-assistant');
    root = root?.shadowRoot;
    root = root?.querySelector('home-assistant-main')?.shadowRoot;
    root = root?.querySelector('ha-drawer partial-panel-resolver')?.shadowRoot || root;
    root = root?.querySelector('ha-panel-lovelace')?.shadowRoot;
    root = root?.querySelector('hui-root');
    if (root) {
        const ll = root.lovelace;
        ll.current_view = root._curView ?? root.___curView ?? root.curView;
        return ll;
    }
    return null;
}

function getDwainsHass() {
    return (window.__dd_get_hass && window.__dd_get_hass()) || hass();
}

class DwainsDashboard {
    constructor() {
        this.startDwainsDashboard();

        const updater = this.locationChanged.bind(this);
        window.addEventListener("location-changed", updater);
        window.addEventListener("popstate", updater);

        this._subscribeReload();
    }

    _subscribeReload() {
        const ha = getDwainsHass();
        if (ha && ha.connection) {
            ha.connection.subscribeEvents(() => this.reload(), "dwains_dashboard_reload");
        } else if ((this.__ddSubscribeRetries = (this.__ddSubscribeRetries || 0) + 1) <= 30) {
            setTimeout(() => this._subscribeReload(), 200);
        }
    }

    async loadData() {
        this.configuration = await getDwainsHass().callWS({ type: 'dwains_dashboard/configuration/get' });
    }

    locationChanged() {
        let path = window.location.pathname;
        let navPath = path.substring(1, path.lastIndexOf('/'));

        if(navPath === "dwains-dashboard") {
            this.applyDwainsTheme();
            setTimeout(() => {this.buildDwainsNavigation();}, 500);
            document.querySelector("home-assistant").addEventListener("hass-more-info", this.popupCard.bind(this));
        }
    }

    popupCard(ev) {
        if(!ev.detail || !ev.detail.entityId || !this.configuration) return;

        const domain = computeDomain(ev.detail.entityId);

        if(this.configuration["entities_popup"] && this.configuration["entities_popup"][ev.detail.entityId]){
            //This specific entity has a own popup
            if(this.configuration['entities'][ev.detail.entityId] && !this.configuration['entities'][ev.detail.entityId]['custom_popup']){
                console.log('Please enable custom popup for this entity');
            } else {
                const friendlyName = this.configuration['entities'][ev.detail.entityId] && this.configuration['entities'][ev.detail.entityId]['friendly_name'] ?
                    this.configuration['entities'][ev.detail.entityId]['friendly_name']
                    :
                    (hass().states[ev.detail.entityId].attributes.friendly_name === undefined ? (ev.detail.entityId).replace(/_/g, " ") : hass().states[ev.detail.entityId].attributes.friendly_name);
                    ;


                window.setTimeout(() => {
                    fireEvent("hass-more-info", {entityId: ""}, document.querySelector("home-assistant"));
                    popUp(friendlyName, {input_entity: ev.detail.entityId,...this.configuration["entities_popup"][ev.detail.entityId]}, false, '');
                }, 10);
            }
        } else if(this.configuration["devices_popup"] && this.configuration["devices_popup"][domain]){
            //Look if the domain of this entity has a custom popup
            const friendlyName = this.configuration['entities'][ev.detail.entityId] && this.configuration['entities'][ev.detail.entityId]['friendly_name'] ?
                this.configuration['entities'][ev.detail.entityId]['friendly_name']
                :
                (hass().states[ev.detail.entityId].attributes.friendly_name === undefined ? (ev.detail.entityId).replace(/_/g, " ") : hass().states[ev.detail.entityId].attributes.friendly_name);
                ;


            window.setTimeout(() => {
                fireEvent("hass-more-info", {entityId: ""}, document.querySelector("home-assistant"));
                popUp(friendlyName, {input_entity: ev.detail.entityId,...this.configuration["devices_popup"][domain]}, false, '');
            }, 10);
        }
    }

    async startDwainsDashboard() {
        console.log('Starting Dwains Dashboard');
        const lovelace = await this.getLovelace();
        if (lovelace.config.dwains_dashboard) {
            await this.loadData();
            document.querySelector("home-assistant").addEventListener("hass-more-info", this.popupCard.bind(this));
            console.log('Dwains Dashboard Started');
            setTimeout(() => {this.buildDwainsNavigation();}, 500);
            this.applyDwainsTheme();
        }
    }

    applyDwainsTheme(isRetry) {
        if (!isRetry) this.__ddThemeRetries = 0;
        const root = this.getRoot();
        if (!root || !root.shadowRoot) {
            if ((this.__ddThemeRetries = (this.__ddThemeRetries || 0) + 1) <= 20) {
                setTimeout(() => this.applyDwainsTheme(true), 150);
            }
            return;
        }
        this.__ddThemeRetries = 0;
        applyThemesOnElement(root.shadowRoot.querySelector('#view'), {
            themes: {
                "dwains-theme": { "ha-card-border-radius": "0.75rem"}
            }
        }, "dwains-theme", true);
    }

    async buildDwainsNavigation() {
        if (this.__ddNavBuilding) return;
        this.__ddNavBuilding = true;
        const root = this.getRoot();
        if (!root || !root.shadowRoot) {
            if ((this.__ddNavRetries = (this.__ddNavRetries || 0) + 1) <= 40) {
                setTimeout(() => {
                    this.__ddNavBuilding = false;
                    this.buildDwainsNavigation();
                }, 150);
            } else {
                this.__ddNavBuilding = false;
            }
            return;
        }
        this.__ddNavRetries = 0;
        console.log('Building Dwains Dashboard Navigation');
        const header = root.shadowRoot.querySelector('.header');
        if (header) header.style.display = 'none';
        try {
            await this._buildDwainsNavigation(root);
        } finally {
            this.__ddNavBuilding = false;
        }
    }

    reload() {
        const ll = lovelace_view();
        if (ll) fireEvent("config-refresh", {}, ll);
        let path = window.location.pathname;
        let navPath = path.substring(1, path.lastIndexOf('/'));
        if (navPath === "dwains-dashboard") {
            setTimeout(() => document.location.reload(), 1000);
        }
    }

    async getLovelace() {
        let lovelace;
        while (!lovelace) {
            lovelace = getLovelace();
            if (!lovelace) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        return lovelace;
    }

    getRoot() {
        let root = document.querySelector('home-assistant');
        root = root?.shadowRoot;
        root = root?.querySelector('home-assistant-main')?.shadowRoot;
        root = root?.querySelector('ha-drawer partial-panel-resolver')?.shadowRoot || root;
        root = root?.querySelector('ha-panel-lovelace')?.shadowRoot;
        root = root?.querySelector('hui-root');
        return root;
    }

    async _buildDwainsNavigation(root){
        if(!root.shadowRoot.querySelector('dwainsboard-navigation-card')){
            const dwainsDashboardNavigationCard = document.createElement('dwainsboard-navigation-card');
            dwainsDashboardNavigationCard.hass = getDwainsHass();
            root.shadowRoot.appendChild(dwainsDashboardNavigationCard);
        }
    }

}

// Initiate the class when the necessary components are defined
const bases = [customElements.whenDefined('hui-masonry-view'), customElements.whenDefined('hc-lovelace')];
Promise.race(bases).then(() => {
    if (window.dwains_dashboard) return;
    const startDwainsDashboard = () => {
        const ha = document.querySelector("home-assistant");
        const main = ha && ha.shadowRoot && ha.shadowRoot.querySelector("home-assistant-main");
        if (!main || !main.shadowRoot) {
            setTimeout(startDwainsDashboard, 150);
            return;
        }
        window.dwains_dashboard = new DwainsDashboard();
    };
    startDwainsDashboard();
});
