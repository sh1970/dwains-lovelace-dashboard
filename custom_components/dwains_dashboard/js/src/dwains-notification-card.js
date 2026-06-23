import { LitElement, html, css } from 'lit';
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
    this._hass = hass;
    this.requestUpdate();
  }

  constructor() {
    super();
    this.notifications = [];
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this._unsub) {
      this._subscribeNotifications();
      this._notificationsUpdated();
    }
  }

  async _subscribeNotifications() {
    if (!this._unsub) {
      this._unsub = await this._hass.connection.subscribeEvents(() => this._notificationsUpdated(), 'dwains_dashboard_notifications_updated');
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._unsub) {
      Promise.resolve(this._unsub()).catch(() => {});
      this._unsub = undefined;
    }
  }

  async _notificationsUpdated() {
    this.notifications = await this._hass.callWS({
      type: 'dwains_dashboard_notification/get'
    }) || [];
    this.requestUpdate();
  }

  _handleDismiss(notificationId) {
    this._hass.callService('dwains_dashboard', 'notification_dismiss', {
      notification_id: notificationId
    });
    this._notificationsUpdated();
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

customElements.define('dwains-notification-card', DwainsNotificationCard);
