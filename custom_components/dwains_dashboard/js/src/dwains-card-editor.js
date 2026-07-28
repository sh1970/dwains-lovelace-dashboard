import { LitElement, css, html } from "lit";
const { loadCardHelpers } = require("./card-helpers-loader");
const { defineDwainsElement } = require("./custom-element-registration");

const BUILT_IN_CARDS = Object.freeze([
  ["alarm-panel", "Alarm panel"],
  ["area", "Area"],
  ["button", "Button"],
  ["calendar", "Calendar"],
  ["conditional", "Conditional"],
  ["entities", "Entities"],
  ["entity", "Entity"],
  ["entity-filter", "Entity filter"],
  ["gauge", "Gauge"],
  ["glance", "Glance"],
  ["grid", "Grid"],
  ["heading", "Heading"],
  ["history-graph", "History graph"],
  ["horizontal-stack", "Horizontal stack"],
  ["humidifier", "Humidifier"],
  ["iframe", "Web page"],
  ["light", "Light"],
  ["logbook", "Logbook"],
  ["map", "Map"],
  ["markdown", "Markdown"],
  ["media-control", "Media control"],
  ["picture", "Picture"],
  ["picture-elements", "Picture elements"],
  ["picture-entity", "Picture entity"],
  ["plant-status", "Plant status"],
  ["sensor", "Sensor"],
  ["shopping-list", "Shopping list"],
  ["statistic", "Statistic"],
  ["statistics-graph", "Statistics graph"],
  ["thermostat", "Thermostat"],
  ["tile", "Tile"],
  ["todo-list", "To-do list"],
  ["vertical-stack", "Vertical stack"],
  ["weather-forecast", "Weather forecast"],
]);

function fireConfigChanged(target, config) {
  target.dispatchEvent(new CustomEvent("config-changed", {
    detail: { config },
    bubbles: true,
    composed: true,
  }));
}

function registeredCustomCards(windowObject = window) {
  const cards = Array.isArray(windowObject.customCards) ? windowObject.customCards : [];
  const seen = new Set();
  return cards
    .map((card) => {
      const rawType = typeof card?.type === "string" ? card.type.trim() : "";
      if (!rawType) return undefined;
      const type = rawType.startsWith("custom:") ? rawType : `custom:${rawType}`;
      if (seen.has(type)) return undefined;
      seen.add(type);
      return [type, card.name || rawType];
    })
    .filter(Boolean)
    .sort((left, right) => left[1].localeCompare(right[1]));
}

function cardTagName(type) {
  return type.startsWith("custom:") ? type.slice(7) : `hui-${type}-card`;
}

function cardConstructor(type, card, registry = customElements) {
  const registered = registry?.get?.(cardTagName(type));
  return registered || card?.constructor;
}

async function createInitialCardConfig(hass, type) {
  const config = { type };
  const helpers = await loadCardHelpers();
  let card;
  try {
    card = await helpers.createCardElement(config);
  } catch (error) {
    console.warn(`Unable to instantiate ${type} while loading its defaults`, error);
  }
  const constructor = cardConstructor(type, card);
  const getStubConfig = constructor?.getStubConfig;
  if (typeof getStubConfig !== "function") return config;

  try {
    const entities = Object.keys(hass?.states || {});
    const stub = await getStubConfig.call(constructor, hass, entities, []);
    return stub && typeof stub === "object" ? { type, ...stub } : config;
  } catch (error) {
    console.warn(`Unable to create a default configuration for ${type}`, error);
    return config;
  }
}

class DwainsCardPicker extends LitElement {
  static properties = {
    hass: { attribute: false },
    _filter: { state: true },
    _manualType: { state: true },
    _selecting: { state: true },
    _error: { state: true },
  };

  constructor() {
    super();
    this._filter = "";
    this._manualType = "";
    this._selecting = false;
  }

  _cards() {
    return [...BUILT_IN_CARDS, ...registeredCustomCards()];
  }

  async _selectType(type) {
    if (this._selecting || !type) return;
    this._selecting = true;
    this._error = undefined;
    try {
      fireConfigChanged(this, await createInitialCardConfig(this.hass, type));
    } catch (error) {
      this._error = error instanceof Error ? error.message : String(error);
      console.error(`Unable to select Lovelace card ${type}`, error);
    } finally {
      this._selecting = false;
    }
  }

  _cardClicked(event) {
    this._selectType(event.currentTarget.dataset.type);
  }

  _manualSubmit() {
    let type = this._manualType.trim();
    if (type && !type.includes(":")) type = `custom:${type}`;
    this._selectType(type);
  }

  render() {
    const filter = this._filter.trim().toLowerCase();
    const cards = this._cards().filter(([type, name]) =>
      !filter || type.toLowerCase().includes(filter) || name.toLowerCase().includes(filter));
    return html`
      <div class="controls">
        <input
          type="search"
          placeholder="${this.hass?.localize?.("ui.common.search") || "Search"}"
          .value=${this._filter}
          @input=${(event) => { this._filter = event.target.value; }}
        />
      </div>
      <div class="cards">
        ${cards.map(([type, name]) => html`
          <button data-type=${type} @click=${this._cardClicked} ?disabled=${this._selecting}>
            <span>${name}</span><small>${type}</small>
          </button>
        `)}
      </div>
      <div class="manual">
        <input
          placeholder="custom:my-card"
          .value=${this._manualType}
          @input=${(event) => { this._manualType = event.target.value; }}
          @keydown=${(event) => { if (event.key === "Enter") this._manualSubmit(); }}
        />
        <ha-button @click=${this._manualSubmit} ?disabled=${this._selecting || !this._manualType.trim()}>
          ${this.hass?.localize?.("ui.common.add") || "Add"}
        </ha-button>
      </div>
      ${this._selecting ? html`<p class="status">Loading card editor…</p>` : ""}
      ${this._error ? html`<p class="error">${this._error}</p>` : ""}
    `;
  }

  static styles = css`
    :host { display: block; color: var(--primary-text-color); }
    input {
      box-sizing: border-box; width: 100%; min-height: 44px; padding: 10px 12px;
      border: 1px solid var(--divider-color); border-radius: 8px;
      color: var(--primary-text-color); background: var(--card-background-color);
      font: inherit;
    }
    .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(145px, 1fr)); gap: 8px; margin-top: 12px; }
    button {
      min-height: 62px; padding: 10px; border: 1px solid var(--divider-color); border-radius: 10px;
      color: var(--primary-text-color); background: var(--card-background-color); text-align: left; cursor: pointer;
    }
    button:hover { border-color: var(--primary-color); }
    button span, button small { display: block; overflow-wrap: anywhere; }
    button small { margin-top: 4px; color: var(--secondary-text-color); }
    .manual { display: grid; grid-template-columns: 1fr auto; gap: 8px; margin-top: 16px; }
    .status { color: var(--secondary-text-color); }
    .error { color: var(--error-color); overflow-wrap: anywhere; }
  `;
}

class DwainsCardConfigEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    lovelace: { attribute: false },
    value: { attribute: false },
    _fallbackText: { state: true },
    _error: { state: true },
    _loading: { state: true },
  };

  constructor() {
    super();
    this._generation = 0;
    this._loading = false;
    this._editor = undefined;
    this._loadedType = undefined;
    this._lastEmittedValue = undefined;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._generation += 1;
    this._editor = undefined;
    this._loadedType = undefined;
  }

  updated(changed) {
    if (changed.has("hass") && this._editor) this._editor.hass = this.hass;
    if (changed.has("lovelace") && this._editor) {
      this._editor.lovelace = this.lovelace || { views: [] };
    }
    if (!changed.has("value") && !changed.has("hass")) return;
    if (this.value === this._lastEmittedValue) {
      this._lastEmittedValue = undefined;
      return;
    }
    if (this._editor && this._loadedType === this.value?.type) {
      this._editor.setConfig(this.value);
      return;
    }
    this._loadEditor();
  }

  async _loadEditor() {
    if (!this.isConnected || !this.hass || !this.value?.type) return;
    const generation = ++this._generation;
    this._loading = true;
    this._error = undefined;
    this._fallbackText = undefined;
    try {
      const helpers = await loadCardHelpers();
      let card;
      let creationError;
      try {
        card = await helpers.createCardElement(this.value);
      } catch (error) {
        creationError = error;
      }
      const constructor = cardConstructor(this.value.type, card);
      if (!constructor && creationError) throw creationError;
      const getConfigElement = constructor?.getConfigElement;
      const editor = typeof getConfigElement === "function"
        ? await getConfigElement.call(constructor)
        : undefined;
      if (!this.isConnected || generation !== this._generation) return;
      if (!editor || typeof editor.setConfig !== "function") {
        this._fallbackText = JSON.stringify(this.value, null, 2);
        return;
      }
      await this.updateComplete;
      if (!this.isConnected || generation !== this._generation) return;
      editor.hass = this.hass;
      editor.lovelace = this.lovelace || { views: [] };
      editor.setConfig(this.value);
      editor.addEventListener("config-changed", (event) => {
        event.stopPropagation();
        if (event.detail?.config) {
          this._lastEmittedValue = event.detail.config;
          fireConfigChanged(this, event.detail.config);
        }
      });
      this.renderRoot.querySelector("#editor")?.replaceChildren(editor);
      this._editor = editor;
      this._loadedType = this.value.type;
    } catch (error) {
      if (!this.isConnected || generation !== this._generation) return;
      this._error = error instanceof Error ? error.message : String(error);
      this._fallbackText = JSON.stringify(this.value, null, 2);
      console.error(`Unable to load the editor for ${this.value.type}`, error);
    } finally {
      if (generation === this._generation) this._loading = false;
    }
  }

  _fallbackChanged(event) {
    this._fallbackText = event.target.value;
    try {
      const config = JSON.parse(this._fallbackText);
      this._error = undefined;
      this._lastEmittedValue = config;
      fireConfigChanged(this, config);
    } catch (error) {
      this._error = error instanceof Error ? error.message : String(error);
    }
  }

  render() {
    return html`
      <div id="editor"></div>
      ${this._loading ? html`<p class="status">Loading card editor…</p>` : ""}
      ${this._fallbackText !== undefined ? html`
        <p>This card has no visual editor. Edit its JSON configuration:</p>
        <textarea .value=${this._fallbackText} @input=${this._fallbackChanged}></textarea>
      ` : ""}
      ${this._error ? html`<p class="error">${this._error}</p>` : ""}
    `;
  }

  static styles = css`
    :host, #editor { display: block; width: 100%; }
    textarea {
      box-sizing: border-box; width: 100%; min-height: 220px; padding: 12px;
      border: 1px solid var(--divider-color); border-radius: 8px;
      color: var(--primary-text-color); background: var(--card-background-color);
      font: 13px/1.45 monospace; resize: vertical;
    }
    .status { color: var(--secondary-text-color); }
    .error { color: var(--error-color); overflow-wrap: anywhere; }
  `;
}

class DwainsCardPreview extends LitElement {
  static properties = {
    hass: { attribute: false },
    config: { attribute: false },
    _error: { state: true },
  };

  constructor() {
    super();
    this._generation = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateComplete.then(() => this._loadPreview());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._generation += 1;
  }

  updated(changed) {
    if (changed.has("hass") || changed.has("config")) this._loadPreview();
  }

  async _loadPreview() {
    if (!this.isConnected || !this.hass || !this.config?.type) return;
    const generation = ++this._generation;
    this._error = undefined;
    try {
      const helpers = await loadCardHelpers();
      const card = await helpers.createCardElement(this.config);
      if (!this.isConnected || generation !== this._generation) return;
      await this.updateComplete;
      if (!this.isConnected || generation !== this._generation) return;
      card.hass = this.hass;
      this.renderRoot.querySelector("#preview")?.replaceChildren(card);
    } catch (error) {
      if (!this.isConnected || generation !== this._generation) return;
      this._error = error instanceof Error ? error.message : String(error);
      console.error(`Unable to preview ${this.config.type}`, error);
    }
  }

  render() {
    return html`<div id="preview"></div>${this._error ? html`<p>${this._error}</p>` : ""}`;
  }

  static styles = css`
    :host { display: block; width: 100%; margin-top: 16px; }
    p { color: var(--error-color); overflow-wrap: anywhere; }
  `;
}

defineDwainsElement("dwains-card-picker", DwainsCardPicker);
defineDwainsElement("dwains-card-config-editor", DwainsCardConfigEditor);
defineDwainsElement("dwains-card-preview", DwainsCardPreview);

export {
  BUILT_IN_CARDS,
  DwainsCardConfigEditor,
  DwainsCardPicker,
  DwainsCardPreview,
  cardConstructor,
  cardTagName,
  createInitialCardConfig,
  registeredCustomCards,
};
