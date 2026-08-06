import { LitElement, html, css } from 'lit';
const { EventSubscriptionOwner } = require('./event-subscription-owner');
const { ReloadableLoadOwner } = require('./reloadable-load-owner');
const { hassConnectionIdentity, hasHassConnectionChanged } = require('./hass-connection');
const { defineDwainsElement } = require('./custom-element-registration');
const { websocketReadStore } = require('./websocket-read-store');
const NOTIFICATION_MESSAGE = Object.freeze({
  type: 'dwains_dashboard_notification/get',
});
//Herschreven
class DwainsNotificationCard extends LitElement {
  static styles = css`
    ha-card {
      box-shadow: none;
      background: transparent;
      color: var(--primary-text-color);
    }
    .notification-button ha-icon {
      display: inline-block;
      margin: auto;
      --mdc-icon-size: 100% !important;
      --iron-icon-width: 100% !important;
      --iron-icon-height: 100% !important;
      cursor: pointer;
      opacity: 0.8;
    }
    .notification-button ha-icon:hover {
      opacity: 1.0;
    }
    .w-6 {
      width: 1.5rem;
    }
    .h-6 {
      height: 1.5rem;
    }
    .notification-button {
      background: var(--ha-card-background, var(--card-background-color, white));
      border-radius: var(--ha-card-border-radius, 4px);
      box-shadow: var(--ha-card-box-shadow, 0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12));
      color: var(--primary-text-color);
      padding: 1rem;
      line-height: 1.25rem;
      margin: 0.25rem 0;
    }
    .sub {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .text {
      font-size: 0.875rem;
      line-height: 1.25rem;
      flex: 1 1 0%;
      width: 0px;
      font-weight: 500;
      text-transform: capitalize;
    }
    .close {
      flex-shrink: 0;
    }
  `;

  static get properties() {
    return {
      _hass: {},
      _config: {},
      notifications: { type: Array },
    };
  }

  setConfig(config) {
    this.config = config;
  }

  set hass(hass) {
    const connectionChanged = hasHassConnectionChanged(this._hass, hass);
    this._hass = hass;
    this.requestUpdate();
    if (connectionChanged && this.isConnected) {
      this._subscriptions.disconnect();
      this._subscriptions.connect();
      this._notificationHass = undefined;
    }
    this._startNotifications(connectionChanged);
  }

  constructor() {
    super();
    this.notifications = [];
    this._subscriptions = new EventSubscriptionOwner();
    this._loads = new ReloadableLoadOwner((context) => this._loadNotifications(context));
  }

  connectedCallback() {
    super.connectedCallback();
    this._subscriptions.connect();
    this._startNotifications();
  }

  _startNotifications(reload = false) {
    const connection = hassConnectionIdentity(this._hass);
    if (!this.isConnected || !this._hass || this._notificationHass === connection) return;
    const hass = this._hass;
    this._notificationHass = connection;
    this._subscribeNotifications().catch((error) => {
      if (this._notificationHass === connection) this._notificationHass = undefined;
      console.error('Failed to subscribe to notification updates', error);
    });
    const load = reload ? this._loads.reload() : this._loads.load();
    load.catch((error) => {
      console.error('Failed to load notifications', error);
    });
  }

  async _subscribeNotifications() {
    await this._subscriptions.subscribeEvent(
      'notifications',
      this._hass,
      'dwains_dashboard_notifications_updated',
      () => {
        this._notificationsUpdated().catch((error) => {
          console.error('Failed to refresh notifications', error);
        });
      },
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._notificationHass = undefined;
    websocketReadStore.invalidate(this._hass, NOTIFICATION_MESSAGE);
    this._loads.invalidate();
    this._subscriptions.disconnect();
  }

  _notificationsUpdated() {
    websocketReadStore.invalidate(this._hass, NOTIFICATION_MESSAGE);
    return this._loads.reload();
  }

  async _loadNotifications({ isCurrent = () => true } = {}) {
    const hass = this._hass;
    const connection = hassConnectionIdentity(hass);
    const notifications = await websocketReadStore.read(hass, NOTIFICATION_MESSAGE) || [];
    if (!isCurrent()
      || !this.isConnected
      || hassConnectionIdentity(this._hass) !== connection) return;
    this.notifications = notifications;
    this.requestUpdate();
  }

  _handleDismiss(notificationId) {
    const dismiss = this._hass.callService('dwains_dashboard', 'notification_dismiss', {
      notification_id: notificationId
    });
    Promise.resolve(dismiss).catch((error) => {
      console.error('Failed to dismiss Dwains Dashboard notification', error);
    });
    this._notificationsUpdated().catch((error) => {
      console.error('Failed to refresh notifications after dismiss', error);
    });
  }

  _renderNotification(notification) {
    return html`
      <div class="notification-button">
        <div class="sub">
          <div class="text">${notification.message}</div>
          <ha-icon
            class="h-6 w-6 close"
            icon="mdi:close"
            @click=${() => this._handleDismiss(notification.notification_id)}>
          </ha-icon>
        </div>
      </div>
    `;
  }

  render() {
    if (!this.notifications.length) {
      return html``;
    }
    return html`
      <ha-card>
        <div id="notifications">
          ${this.notifications.map(notification => this._renderNotification(notification))}
        </div>
      </ha-card>
    `;
  }
}

defineDwainsElement('dwains-notification-card', DwainsNotificationCard);
