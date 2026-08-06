import { popUp } from "./dwains-popup";
import { fireEvent } from "./card-tools-compat";
import {
    applyThemesOnElement,
    computeDomain
} from './frontend-helpers';
import { resolveEntityName } from './helpers';
const { EventSubscriptionOwner } = require('./event-subscription-owner');
const { EventListenerOwner } = require('./event-listener-owner');
const { TimerOwner } = require('./timer-owner');
const { DashboardBootstrapOwner } = require('./dashboard-bootstrap-owner');
const { PopupOpenScheduler } = require('./popup-open-scheduler');
const { ReloadableLoadOwner } = require('./reloadable-load-owner');
const { websocketReadStore } = require('./websocket-read-store');
const { resolveHass } = require('./hass-provider');
const { hassConnectionIdentity } = require('./hass-connection');
const { loadDashboardCoreSnapshot } = require('./dashboard-registry-snapshot');
const { isDwainsRoute } = require('./dashboard-route-state');
const {
    findHomeAssistantHost,
    findHomeAssistantMain,
    findLovelaceConfig,
    findLovelaceRoot,
    findLovelaceShell,
} = require('./lovelace-dom');
//Herschreven
function getDwainsHass() {
    return resolveHass();
}

class DwainsDashboard {
    constructor() {
        this._subscriptions = new EventSubscriptionOwner();
        this._subscriptions.connect();
        this._listeners = new EventListenerOwner();
        this._timers = new TimerOwner();
        this._timers.connect();
        this._popupOpens = new PopupOpenScheduler(this._timers, { delay: 10 });
        this._loads = new ReloadableLoadOwner((context) => this._loadData(context));
        this._destroyed = false;
        this._locationUpdater = this.locationChanged.bind(this);
        this._visibilityChangeHandler = () => {
            if (document.visibilityState === "visible") {
                this.locationChanged();
                this._subscribeReload();
            }
        };
        this._popupCardHandler = this.popupCard.bind(this);

        this.startDwainsDashboard().catch((error) => {
            console.error("Failed to start Dwains Dashboard", error);
        });
        this._listeners.listen('location-changed', window, 'location-changed', this._locationUpdater);
        this._listeners.listen('popstate', window, 'popstate', this._locationUpdater);
        this._listeners.listen(
            'visibilitychange',
            document,
            'visibilitychange',
            this._visibilityChangeHandler,
        );
        this._listeners.connect();

        this._subscribeReload();
    }

    _subscribeReload() {
        if (this._destroyed) return;
        const ha = getDwainsHass();
        if (ha && ha.connection) {
            const connection = hassConnectionIdentity(ha);
            const connectionChanged = Boolean(
                this._subscriptionConnection
                && this._subscriptionConnection !== connection,
            );
            if (connectionChanged) {
                this._subscriptions.disconnect();
                this._subscriptions.connect();
                this.reloadData().catch((error) => {
                    console.error("Failed to refresh Dwains Dashboard after reconnect", error);
                });
            }
            this._subscriptionConnection = connection;
            this._clearSubscriptionRetry();
            Promise.all([
                this._subscriptions.subscribeEvent(
                    'dashboard-reload',
                    ha,
                    "dwains_dashboard_reload",
                    () => {
                        websocketReadStore.invalidate(ha);
                        this.reload().catch((error) => {
                            console.error("Failed to process Dwains Dashboard reload", error);
                        });
                    },
                ),
                this._subscriptions.subscribeEvent(
                    'dashboard-config-reload',
                    ha,
                    "dwains_dashboard_config_reload",
                    () => {
                        websocketReadStore.invalidate(ha);
                        this.reloadData().catch((error) => {
                            console.error("Failed to reload Dwains Dashboard configuration", error);
                        });
                    },
                ),
            ]).then(() => {
                this.__ddSubscribeRetries = 0;
                this.__ddSubscribeRetryExhausted = false;
            }).catch((error) => {
                console.error("Failed to subscribe to Dwains Dashboard reload events", error);
                this._scheduleSubscriptionRetry();
            });
        } else {
            this._scheduleSubscriptionRetry();
        }
    }

    _scheduleSubscriptionRetry() {
        if (this._destroyed || this._timers.has('subscription-retry')) return;
        const retry = (this.__ddSubscribeRetries || 0) + 1;
        if (retry > 30) {
            if (!this.__ddSubscribeRetryExhausted) {
                console.error("Unable to subscribe to Dwains Dashboard reload events after 30 retries");
                this.__ddSubscribeRetryExhausted = true;
            }
            return;
        }
        this.__ddSubscribeRetries = retry;
        this._timers.schedule('subscription-retry', () => {
            this._subscribeReload();
        }, 200, { replace: false });
    }

    _clearSubscriptionRetry() {
        this._timers.clear('subscription-retry');
    }

    _ensurePopupListener() {
        if (this._destroyed) return;
        const host = findHomeAssistantHost();
        if (!host || host === this._popupHost) return;
        this._listeners.listen('hass-more-info', host, 'hass-more-info', this._popupCardHandler);
        this._popupHost = host;
    }

    destroy() {
        if (this._destroyed) return;
        this._destroyed = true;
        this._loads.invalidate();
        this._clearSubscriptionRetry();
        this._timers.disconnect();
        this._subscriptions.disconnect();
        this._listeners.disconnect();
        this._subscriptionConnection = undefined;
        this._popupHost = undefined;
    }

    loadData() {
        return this._loads.load();
    }

    reloadData() {
        return this._loads.reload();
    }

    async _loadData({ isCurrent = () => true } = {}) {
        const ha = getDwainsHass();
        const connection = hassConnectionIdentity(ha);
        const snapshot = await loadDashboardCoreSnapshot(ha, {
            optionalRegistries: true,
        });
        if (!isCurrent()
            || this._destroyed
            || hassConnectionIdentity(getDwainsHass()) !== connection) return;
        Object.assign(this, snapshot);
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
        if (this._destroyed) return;
        let path = window.location.pathname;

        if(isDwainsRoute(path)) {
            this.applyDwainsTheme();
            this._ensurePopupListener();
        }
    }

    popupCard(ev) {
        if(!ev.detail || !ev.detail.entityId || !this.configuration) return;

        const domain = computeDomain(ev.detail.entityId);
        const popupHost = ev.currentTarget || this._popupHost;

        if(this.configuration["entities_popup"] && this.configuration["entities_popup"][ev.detail.entityId]){
            //This specific entity has a own popup
            if(this.configuration['entities'][ev.detail.entityId] && !this.configuration['entities'][ev.detail.entityId]['custom_popup']){
                console.log('Please enable custom popup for this entity');
            } else {
                const friendlyName = this._entityDisplayName(ev.detail.entityId);


                this._popupOpens.schedule(() => {
                    this._closeMoreInfo(popupHost);
                    popUp(friendlyName, {input_entity: ev.detail.entityId,...this.configuration["entities_popup"][ev.detail.entityId]}, false, '');
                });
            }
        } else if(this.configuration["devices_popup"] && this.configuration["devices_popup"][domain]){
            //Look if the domain of this entity has a custom popup
            const friendlyName = this._entityDisplayName(ev.detail.entityId);


            this._popupOpens.schedule(() => {
                this._closeMoreInfo(popupHost);
                popUp(friendlyName, {input_entity: ev.detail.entityId,...this.configuration["devices_popup"][domain]}, false, '');
            });
        }
    }

    _closeMoreInfo(host) {
        if (!host) {
            console.error("Unable to close Home Assistant more-info: host is unavailable");
            return false;
        }
        fireEvent("hass-more-info", { entityId: "" }, host);
        return true;
    }

    async startDwainsDashboard() {
        console.log('Starting Dwains Dashboard');
        const lovelace = await this.getLovelace();
        if (this._destroyed || !lovelace) return;
        if (lovelace.config.dwains_dashboard) {
            await this.loadData();
            if (this._destroyed) return;
            this._ensurePopupListener();
            console.log('Dwains Dashboard Started');
            this.applyDwainsTheme();
        }
    }

    applyDwainsTheme(isRetry) {
        if (!isRetry) this.__ddThemeRetries = 0;
        const root = this.getRoot();
        const shell = findLovelaceShell(root);
        if (!shell) {
            if ((this.__ddThemeRetries = (this.__ddThemeRetries || 0) + 1) <= 20) {
                this._timers.schedule('apply-theme', () => this.applyDwainsTheme(true), 150);
            }
            return;
        }
        this.__ddThemeRetries = 0;
        applyThemesOnElement(shell.view, {
            themes: {
                "dwains-theme": { "ha-card-border-radius": "0.75rem"}
            }
        }, "dwains-theme", true);
    }

    async reload() {
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
        try {
            await this.reloadData();
        } catch (err) {
            console.error("Failed to reload Dwains Dashboard data", err);
        }
        this.applyDwainsTheme();
    }

    async getLovelace() {
        let lovelace;
        while (!lovelace && !this._destroyed) {
            lovelace = findLovelaceConfig();
            if (!lovelace) {
                const elapsed = await this._timers.delay('lovelace-poll', 500);
                if (!elapsed) return undefined;
            }
        }
        return lovelace;
    }

    getRoot() {
        return findLovelaceRoot();
    }

}

// Initiate the class when Home Assistant's main shadow root is ready.
const dashboardBootstrap = new DashboardBootstrapOwner({
    target: window,
    findMain: findHomeAssistantMain,
    createDashboard: () => new DwainsDashboard(),
});
dashboardBootstrap.connect();
