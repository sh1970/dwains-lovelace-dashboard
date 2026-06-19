import { LitElement, html, css } from "lit";
//Herschreven
class DwainsDashboardLayout extends LitElement {
  setConfig(_config) {}

  static get properties() {
    return {
      cards: { type: Array },
    };
  }

  static get styles() {
    return css`
      #dwains_dashboard {
        margin: 0 auto;
        font-family: "Open Sans", sans-serif;
        padding-top: 10px;
        padding-bottom: 50px;
      }

      @media only screen and (max-width: 768px),
             only screen and (max-width: 1800px) and (hover: none) {
        #dwains_dashboard {
          padding-top: 1px;
          margin-top: -55px;
        }
      }
    `;
  }

  render() {
    return html`
      <div id="dwains_dashboard">
        ${this.cards ? this.cards.map((card) => html`${card}`) : ''}
      </div>
    `;
  }
}

customElements.whenDefined("hui-masonry-view").then(() => {
  if (!customElements.get("dwains-dashboard-layout")) {
    customElements.define("dwains-dashboard-layout", DwainsDashboardLayout);
    const pjson = require('../package.json');
    console.info(
      `%c DWAINS-DASHBOARD-JS \n%c Version ${pjson.version}`,
      "color: #2fbae5; font-weight: bold; background: black",
      "color: white; font-weight: bold; background: dimgray"
    );
  }
});