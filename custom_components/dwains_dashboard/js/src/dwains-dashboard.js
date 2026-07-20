import {
    hass
} from "card-tools/src/hass";
import { popUp } from "./dwains-popup";
import { fireEvent } from "card-tools/src/event";
import {
    applyThemesOnElement,
    computeDomain
} from 'custom-card-helpers';
import { resolveEntityName } from './helpers';
//Herschreven
function getLovelaceRoot() {
    let root = document.querySelector('home-assistant');
    root = root?.shadowRoot;
    root = root?.querySelector('home-assistant-main')?.shadowRoot;
    const resolver = root?.querySelector('ha-drawer partial-panel-resolver')
        || root?.querySelector('partial-panel-resolver');
    root = resolver?.shadowRoot || root;
    root = root?.querySelector('ha-panel-lovelace')?.shadowRoot;
    root = root?.querySelector('hui-root');
    return root || null;
}

function getLovelace() {
    const root = getLovelaceRoot();
    if (root) {
        const ll = root.lovelace;
        if (!ll) return null;
        ll.current_view = root._curView ?? root.___curView ?? root.curView;
        return ll;
    }
    return null;
}

function getDwainsHass() {
    return (window.__dd_get_hass && window.__dd_get_hass()) || hass();
}

function isDwainsRoute(path = window.location.pathname) {
    return path === "/dwains-dashboard" || path.startsWith("/dwains-dashboard/");
}

function currentDwainsUrl() {
    return `${window.location.origin}${window.location.pathname}${window.location.search}${window.location.hash}`;
}

const DWAINS_LAST_URL_KEY = "dwains_dashboard_last_url";
const DWAINS_RESTORE_UNTIL_KEY = "dwains_dashboard_restore_until";
const DWAINS_RESUME_PENDING_KEY = "dwains_dashboard_resume_pending";
const DWAINS_RESTORE_TTL = 30000;

class DwainsDashboard {
    constructor() {
        this._popupCardHandler = this.popupCard.bind(this);
        this._restoreDwainsUrlAfterAppReload();
        this.startDwainsDashboard();
        this._rememberDwainsUrl();

        const updater = this.locationChanged.bind(this);
        window.addEventListener("location-changed", updater);
        window.addEventListener("popstate", updater);
        window.addEventListener("pagehide", () => this._markDwainsUrlRestore());
        window.addEventListener("beforeunload", () => this._markDwainsUrlRestore());
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "hidden") this._markDwainsUrlRestore();
            else if (document.visibilityState === "visible") this.resume();
        });
        window.addEventListener("freeze", () => this._markDwainsUrlRestore());
        window.addEventListener("pageshow", () => this.resume());
        window.addEventListener("online", () => this.resume());

        this._subscribeReload();
    }

    async _subscribeReload() {
        const ha = getDwainsHass();
        if (!ha || !ha.connection) {
            if ((this.__ddSubscribeRetries = (this.__ddSubscribeRetries || 0) + 1) <= 30) {
                setTimeout(() => this._subscribeReload(), 200);
            }
            return;
        }
        const connection = ha.connection;
        if (
            this.__ddReloadSubscriptionConnection === connection
            && this.__ddReloadUnsubs?.length
        ) return;
        if (this.__ddReloadSubscribePromise) return this.__ddReloadSubscribePromise;

        for (const unsubscribe of this.__ddReloadUnsubs || []) {
            Promise.resolve(unsubscribe()).catch(() => {});
        }
        this.__ddReloadUnsubs = [];
        this.__ddReloadSubscriptionConnection = connection;
        this.__ddSubscribeRetries = 0;
        this.__ddReloadSubscribePromise = Promise.all([
            connection.subscribeEvents(() => this.reload(), "dwains_dashboard_reload"),
            connection.subscribeEvents(() => this.loadData(), "dwains_dashboard_config_reload"),
        ]).then((unsubscribers) => {
            if (this.__ddReloadSubscriptionConnection !== connection) {
                for (const unsubscribe of unsubscribers) {
                    Promise.resolve(unsubscribe()).catch(() => {});
                }
                return;
            }
            this.__ddReloadUnsubs = unsubscribers;
        }).catch(() => {
            if (this.__ddReloadSubscriptionConnection === connection) {
                this.__ddReloadSubscriptionConnection = undefined;
            }
            setTimeout(() => this._subscribeReload(), 200);
        }).finally(() => {
            this.__ddReloadSubscribePromise = undefined;
        });
        return this.__ddReloadSubscribePromise;
    }

    _rememberDwainsUrl() {
        if (!isDwainsRoute()) return;
        const url = currentDwainsUrl();
        window.__ddLastDwainsUrl = url;
        try {
            sessionStorage.setItem(DWAINS_LAST_URL_KEY, url);
        } catch (_) {}
        try {
            localStorage.setItem(DWAINS_LAST_URL_KEY, url);
        } catch (_) {}
    }

    _markDwainsUrlRestore() {
        if (!isDwainsRoute()) return;
        this._rememberDwainsUrl();
        try {
            localStorage.setItem(DWAINS_RESTORE_UNTIL_KEY, String(Date.now() + DWAINS_RESTORE_TTL));
            localStorage.setItem(DWAINS_RESUME_PENDING_KEY, "1");
        } catch (_) {}
    }

    _clearDwainsUrlRestore() {
        try {
            localStorage.removeItem(DWAINS_RESTORE_UNTIL_KEY);
            localStorage.removeItem(DWAINS_RESUME_PENDING_KEY);
        } catch (_) {}
    }

    _restoreDwainsUrlAfterAppReload() {
        if (isDwainsRoute()) return false;
        try {
            const resumePending = localStorage.getItem(DWAINS_RESUME_PENDING_KEY) === "1";
            const restoreUntil = Number(localStorage.getItem(DWAINS_RESTORE_UNTIL_KEY));
            const legacyRestorePending = Boolean(restoreUntil && Date.now() <= restoreUntil);
            if (!resumePending && !legacyRestorePending) return false;
            const stored = localStorage.getItem(DWAINS_LAST_URL_KEY);
            if (!stored) return false;
            const targetUrl = new URL(stored, window.location.origin);
            if (targetUrl.origin !== window.location.origin || !isDwainsRoute(targetUrl.pathname)) return false;
            const targetPath = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
            history.replaceState(history.state || null, "", targetPath);
            window.__ddLastDwainsUrl = targetUrl.href;
            window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: true } }));
            return true;
        } catch (_) {
            return false;
        }
    }

    _lastDwainsUrl() {
        try {
            if (window.__ddReloadReturnUrl && isDwainsRoute(new URL(window.__ddReloadReturnUrl, window.location.origin).pathname)) {
                return window.__ddReloadReturnUrl;
            }
        } catch (_) {}
        if (isDwainsRoute()) return currentDwainsUrl();
        if (window.__ddLastDwainsUrl) return window.__ddLastDwainsUrl;
        try {
            const stored = sessionStorage.getItem(DWAINS_LAST_URL_KEY);
            if (stored && isDwainsRoute(new URL(stored, window.location.origin).pathname)) return stored;
        } catch (_) {}
        try {
            const stored = localStorage.getItem(DWAINS_LAST_URL_KEY);
            if (stored && isDwainsRoute(new URL(stored, window.location.origin).pathname)) return stored;
        } catch (_) {}
        return undefined;
    }

    async loadData() {
        const ha = await this._waitForHass();
        if (!ha) throw new Error("Home Assistant connection is not available");
        const [configuration, entities, devices] = await Promise.all([
            ha.callWS({ type: 'dwains_dashboard/configuration/get' }),
            ha.callWS({ type: 'config/entity_registry/list' }).catch(() => []),
            ha.callWS({ type: 'config/device_registry/list' }).catch(() => []),
        ]);
        this.configuration = configuration;
        this.entitiesById = new Map((entities || []).map((entity) => [entity.entity_id, entity]));
        this.devicesById = new Map((devices || []).map((device) => [device.id, device]));
    }

    _entityDisplayName(entityId) {
        const entityEntry = this.entitiesById?.get(entityId);
        const deviceEntry = entityEntry?.device_id
            ? this.devicesById?.get(entityEntry.device_id)
            : undefined;
        return resolveEntityName(
            getDwainsHass(),
            this.configuration,
            entityId,
            entityEntry,
            deviceEntry,
        );
    }

    locationChanged() {
        let path = window.location.pathname;

        if(isDwainsRoute(path)) {
            this._rememberDwainsUrl();
            this.resume();
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
                const friendlyName = this._entityDisplayName(ev.detail.entityId);


                window.setTimeout(() => {
                    fireEvent("hass-more-info", {entityId: ""}, document.querySelector("home-assistant"));
                    popUp(friendlyName, {input_entity: ev.detail.entityId,...this.configuration["entities_popup"][ev.detail.entityId]}, false, '');
                }, 10);
            }
        } else if(this.configuration["devices_popup"] && this.configuration["devices_popup"][domain]){
            //Look if the domain of this entity has a custom popup
            const friendlyName = this._entityDisplayName(ev.detail.entityId);


            window.setTimeout(() => {
                fireEvent("hass-more-info", {entityId: ""}, document.querySelector("home-assistant"));
                popUp(friendlyName, {input_entity: ev.detail.entityId,...this.configuration["devices_popup"][domain]}, false, '');
            }, 10);
        }
    }

    async startDwainsDashboard() {
        console.log('Starting Dwains Dashboard');
        await this.resume(true);
    }

    async resume(forceDataReload = false) {
        this._restoreDwainsUrlAfterAppReload();
        if (!isDwainsRoute()) return false;
        if (this.__ddResumePromise) return this.__ddResumePromise;

        this.__ddResumePromise = (async () => {
            const root = await this._waitForDwainsRoot();
            if (!root || !isDwainsRoute()) return false;

            const ha = await this._waitForHass();
            if (!ha || !isDwainsRoute()) return false;
            const connectionChanged = this.__ddActiveConnection !== ha.connection;
            this.__ddActiveConnection = ha.connection;

            if (forceDataReload || connectionChanged || !this.configuration) {
                let loaded = false;
                for (let attempt = 0; attempt < 20 && isDwainsRoute(); attempt++) {
                    try {
                        await this.loadData();
                        loaded = true;
                        break;
                    } catch (_) {
                        await new Promise(resolve => setTimeout(resolve, attempt < 5 ? 150 : 300));
                    }
                }
                if (!loaded && !this.configuration) return false;
            }

            if (!isDwainsRoute() || this.getDwainsRoot() !== root) return false;
            const homeAssistant = document.querySelector("home-assistant");
            if (homeAssistant) {
                homeAssistant.addEventListener("hass-more-info", this._popupCardHandler);
            }
            await this.buildDwainsNavigation(root);
            if (!isDwainsRoute() || this.getDwainsRoot() !== root) return false;
            this.applyDwainsTheme();
            this._rememberDwainsUrl();
            this._clearDwainsUrlRestore();
            this._subscribeReload();
            console.log('Dwains Dashboard Started');
            return true;
        })().finally(() => {
            this.__ddResumePromise = undefined;
        });

        return this.__ddResumePromise;
    }

    applyDwainsTheme(isRetry) {
        if (!isRetry) this.__ddThemeRetries = 0;
        if (!isDwainsRoute()) return;
        const root = this.getDwainsRoot();
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

    async buildDwainsNavigation(root = this.getDwainsRoot()) {
        if (!isDwainsRoute()) return;
        if (this.__ddNavBuilding) return;
        this.__ddNavBuilding = true;
        if (!root || !root.shadowRoot) {
            if ((this.__ddNavRetries = (this.__ddNavRetries || 0) + 1) <= 40) {
                setTimeout(() => {
                    this.__ddNavBuilding = false;
                    this.buildDwainsNavigation(this.getDwainsRoot());
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

    async reload() {
        this._markDwainsUrlRestore();
        if (this.__ddReloading) {
            this.__ddReloadAgain = true;
            return;
        }
        this.__ddReloading = true;
        try {
            do {
                this.__ddReloadAgain = false;
                await this._softReload();
            } while (this.__ddReloadAgain);
        } finally {
            this.__ddReloading = false;
        }
    }

    async _softReload() {
        const reloadUrl = this._lastDwainsUrl();
        window.__ddReloadReturnUrl = undefined;
        if (reloadUrl) {
            try {
                const targetUrl = new URL(reloadUrl, window.location.origin);
                const targetPath = `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
                const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
                if (currentPath !== targetPath) {
                    history.replaceState(history.state || null, "", targetPath);
                    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: true } }));
                }
                this._rememberDwainsUrl();
            } catch (_) {}
        }

        try {
            await this.loadData();
        } catch (err) {
            console.error("Failed to reload Dwains Dashboard data", err);
        }
        this.applyDwainsTheme();
        setTimeout(() => {this.buildDwainsNavigation();}, 50);
    }

    async getLovelace() {
        let lovelace;
        while (!lovelace && isDwainsRoute()) {
            lovelace = getLovelace();
            if (!lovelace?.config?.dwains_dashboard) {
                lovelace = null;
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
        return lovelace;
    }

    getRoot() {
        return getLovelaceRoot();
    }

    getDwainsRoot() {
        const root = this.getRoot();
        return root?.lovelace?.config?.dwains_dashboard ? root : null;
    }

    async _waitForDwainsRoot() {
        let root = this.getDwainsRoot();
        while (!root && isDwainsRoute()) {
            await new Promise(resolve => setTimeout(resolve, 150));
            root = this.getDwainsRoot();
        }
        return root;
    }

    async _waitForHass() {
        let ha = getDwainsHass();
        while ((!ha || !ha.connection || typeof ha.callWS !== "function") && isDwainsRoute()) {
            await new Promise(resolve => setTimeout(resolve, 150));
            ha = getDwainsHass();
        }
        return ha;
    }

    async _buildDwainsNavigation(root){
        let dwainsDashboardNavigationCard = root.shadowRoot.querySelector('dwainsboard-navigation-card');
        if(!dwainsDashboardNavigationCard){
            dwainsDashboardNavigationCard = document.createElement('dwainsboard-navigation-card');
            dwainsDashboardNavigationCard.hass = getDwainsHass();
            root.shadowRoot.appendChild(dwainsDashboardNavigationCard);
        } else {
            dwainsDashboardNavigationCard.hass = getDwainsHass();
            if (typeof dwainsDashboardNavigationCard.ensureReady === "function") {
                await dwainsDashboardNavigationCard.ensureReady();
            }
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
