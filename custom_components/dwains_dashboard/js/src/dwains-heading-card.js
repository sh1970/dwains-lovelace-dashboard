import { LitElement, html, css } from 'lit';
const { defineDwainsElement } = require('./custom-element-registration');
//Herschreven
class DwainsHeadingCard extends LitElement {
  static get properties() {
    return {
      _config: {},
    };
  }

  static styles = css`
    ha-card {
      box-shadow: none;
      background: none;
      padding: 0 16px 0 0;
      font-weight: bold;
      font-size: 14px;
    }
  `;

  setConfig(config) {
    if (!config || !config.title) {
      throw new Error('Title configuration required');
    }
    this._config = { ...config };
  }

  render() {
    return html`
      <ha-card>
        ${this._config.title}
      </ha-card>
    `;
  }

  getCardSize() {
    return 1;
  }
}

if (!customElements.get('dwains-heading-card')) {
  defineDwainsElement('dwains-heading-card', DwainsHeadingCard);
}
