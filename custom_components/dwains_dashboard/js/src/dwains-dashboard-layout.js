import { LitElement, html, css } from "lit";
const { defineDwainsElement } = require('./custom-element-registration');
const { LovelaceHeaderOwner } = require('./lovelace-header-owner');
const VERSION = "3.10.1";
//Herschreven
class DwainsDashboardLayout extends LitElement {
  constructor() {
    super();
    this._headerOwner = new LovelaceHeaderOwner();
  }

  connectedCallback() {
    super.connectedCallback();
    this._headerOwner.connect(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._headerOwner.disconnect();
  }

  setConfig(_config) {}

  static get properties() {
    return {
      hass: { attribute: false },
      cards: { type: Array },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        --dd-mobile-navigation-height: 2.75rem;
        --dd-mobile-navigation-content-gap: 0.5rem;
        margin-top: calc(-1 * var(--dd-lovelace-header-offset, 0px));
      }
      #dwains_dashboard {
        margin: 0 auto;
        font-family: "Open Sans", sans-serif;
        padding-top: 10px;
        padding-bottom: 50px;
      }
      #dwains_navigation {
        position: sticky;
        top: 0;
        z-index: 8;
      }

      :host([mobile-navigation]) #dwains_dashboard {
        padding-top: 1px;
        padding-bottom: calc(
          var(--dd-mobile-navigation-height) +
          var(--dd-mobile-navigation-content-gap) +
          env(safe-area-inset-bottom)
        );
      }
      :host([mobile-navigation]) #dwains_navigation {
        position: fixed;
        left: 0;
        right: 0;
        top: auto;
        bottom: 0;
        z-index: 30;
      }
    `;
  }

  render() {
    return html`
      <div id="dwains_navigation">
        <dwainsboard-navigation-card .hass=${this.hass}></dwainsboard-navigation-card>
      </div>
      <div id="dwains_dashboard">
        ${this.cards ? this.cards.map((card) => html`${card}`) : ''}
      </div>
    `;
  }
}

if (!customElements.get("dwains-dashboard-layout")) {
  defineDwainsElement("dwains-dashboard-layout", DwainsDashboardLayout);
  console.info(
    `%c DWAINS-DASHBOARD-JS \n%c Version ${VERSION}`,
    "color: #2fbae5; font-weight: bold; background: black",
    "color: white; font-weight: bold; background: dimgray"
  );
}
