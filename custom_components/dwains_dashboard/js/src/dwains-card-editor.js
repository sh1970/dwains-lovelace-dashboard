import { LitElement, css, html } from "lit";
import translateEngine from "./translate-engine";
const { loadCardHelpers } = require("./card-helpers-loader");
const { defineDwainsElement } = require("./custom-element-registration");

const EMPTY_LOVELACE = Object.freeze({ views: Object.freeze([]) });

const SINGLE_ENTITY_CONTEXT_CARDS = new Set([
  "button",
  "entity",
  "gauge",
  "light",
  "media-control",
  "picture-entity",
  "sensor",
  "thermostat",
  "weather-forecast",
  "custom:button-card",
  "custom:mushroom-cover-card",
  "custom:mushroom-entity-card",
  "custom:mushroom-fan-card",
  "custom:mushroom-light-card",
]);
const ENTITY_LIST_CONTEXT_CARDS = new Set(["calendar", "history-graph"]);

function normalizeLovelace(value) {
  return !value || (Array.isArray(value.views) && value.views.length === 0)
    ? EMPTY_LOVELACE
    : value;
}

function deepestActiveElement(root) {
  let activeElement = root?.activeElement;
  while (activeElement?.shadowRoot?.activeElement) {
    activeElement = activeElement.shadowRoot.activeElement;
  }
  return activeElement;
}

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

function cloneCardConfig(config) {
  return config && typeof config === "object"
    ? structuredClone(config)
    : config;
}

function cardConfigSignature(config) {
  // Lovelace card configurations are JSON data. Every parent echo is cloned
  // from the emitted value, so serialization preserves its key order while
  // avoiding the incorrect object-identity comparison used previously.
  return JSON.stringify(config);
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

function applyEntityContext(config, type, entityId) {
  if (!config || typeof config !== "object" || !entityId) return config;
  const contextualConfig = cloneCardConfig(config);
  if (
    SINGLE_ENTITY_CONTEXT_CARDS.has(type)
    || (type.startsWith("custom:") && Object.hasOwn(contextualConfig, "entity"))
  ) {
    contextualConfig.entity = entityId;
  } else if (ENTITY_LIST_CONTEXT_CARDS.has(type)) {
    contextualConfig.entities = [entityId];
  }
  return contextualConfig;
}

function firstEntity(hass, domains, predicate = () => true) {
  const accepted = new Set(Array.isArray(domains) ? domains : [domains]);
  return Object.entries(hass?.states || {}).find(([entityId, stateObj]) =>
    accepted.has(entityId.split(".", 1)[0]) && predicate(stateObj))?.[0];
}

function createPreviewConfig(hass, type) {
  const anyEntity = Object.keys(hass?.states || {})[0];
  const entity = (domains, predicate) => firstEntity(hass, domains, predicate);
  const numeric = (stateObj) =>
    stateObj && Number.isFinite(Number.parseFloat(stateObj.state));
  const button = { type: "button", name: "Button" };
  const configurations = {
    "alarm-panel": () => {
      const entityId = entity("alarm_control_panel");
      return entityId && { type, entity: entityId };
    },
    button: () => button,
    calendar: () => {
      const entityId = entity("calendar");
      return entityId && { type, entities: [entityId] };
    },
    entities: () => anyEntity && { type, entities: [anyEntity] },
    entity: () => anyEntity && { type, entity: anyEntity },
    "entity-filter": () => anyEntity && {
      type,
      entities: [anyEntity],
      state_filter: ["on"],
    },
    gauge: () => {
      const entityId = entity(["sensor", "number", "input_number"], numeric);
      return entityId && { type, entity: entityId };
    },
    glance: () => anyEntity && { type, entities: [anyEntity] },
    grid: () => ({ type, cards: [button] }),
    heading: () => ({ type, heading: "Heading" }),
    "history-graph": () => anyEntity && { type, entities: [anyEntity] },
    "horizontal-stack": () => ({ type, cards: [button] }),
    humidifier: () => {
      const entityId = entity("humidifier");
      return entityId && { type, entity: entityId };
    },
    light: () => {
      const entityId = entity("light");
      return entityId && { type, entity: entityId };
    },
    logbook: () => anyEntity && { type, entities: [anyEntity] },
    map: () => {
      const entityId = entity(["device_tracker", "person"]);
      return entityId && { type, entities: [entityId] };
    },
    markdown: () => ({ type, content: "**Markdown**" }),
    "media-control": () => {
      const entityId = entity("media_player");
      return entityId && { type, entity: entityId };
    },
    "picture-entity": () => anyEntity && { type, entity: anyEntity },
    "plant-status": () => {
      const entityId = entity("plant");
      return entityId && { type, entity: entityId };
    },
    sensor: () => {
      const entityId = entity("sensor");
      return entityId && { type, entity: entityId };
    },
    statistic: () => {
      const entityId = entity("sensor", numeric);
      return entityId && { type, entity: entityId };
    },
    "statistics-graph": () => {
      const entityId = entity("sensor", numeric);
      return entityId && { type, entities: [entityId] };
    },
    thermostat: () => {
      const entityId = entity("climate");
      return entityId && { type, entity: entityId };
    },
    tile: () => anyEntity && { type, entity: anyEntity },
    "todo-list": () => {
      const entityId = entity("todo");
      return entityId && { type, entity: entityId };
    },
    "vertical-stack": () => ({ type, cards: [button] }),
    "weather-forecast": () => {
      const entityId = entity("weather");
      return entityId && { type, entity: entityId };
    },
  };
  return configurations[type]?.();
}

async function createInitialCardConfig(hass, type, entityId) {
  const config = { type };
  const helpers = await loadCardHelpers();
  let card;
  try {
    card = await helpers.createCardElement(cloneCardConfig(config));
  } catch (error) {
    console.warn(`Unable to instantiate ${type} while loading its defaults`, error);
  }
  const constructor = cardConstructor(type, card);
  const getStubConfig = constructor?.getStubConfig;
  if (typeof getStubConfig !== "function") {
    return applyEntityContext(config, type, entityId);
  }

  try {
    const availableEntities = Object.keys(hass?.states || {});
    const entities = entityId && availableEntities.includes(entityId)
      ? [entityId, ...availableEntities.filter((entry) => entry !== entityId)]
      : availableEntities;
    const stub = await getStubConfig.call(constructor, hass, entities, []);
    const initialConfig = stub && typeof stub === "object" ? { type, ...stub } : config;
    return applyEntityContext(initialConfig, type, entityId);
  } catch (error) {
    console.warn(`Unable to create a default configuration for ${type}`, error);
    return applyEntityContext(config, type, entityId);
  }
}

class DwainsCardPicker extends LitElement {
  static properties = {
    hass: { attribute: false },
    lovelace: { attribute: false },
    entityId: { attribute: false },
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
    this._previewGeneration = 0;
    this._previewConfigs = new Map();
    this._selectionConfigs = new Map();
    this._previewObserver = undefined;
    this._pointerStart = undefined;
    this._pointerMoved = false;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._previewGeneration += 1;
    this._previewObserver?.disconnect();
    this._previewObserver = undefined;
  }

  shouldUpdate(changed) {
    if (changed.size !== 1 || !changed.has("hass")) return true;
    const previousHass = changed.get("hass");
    if (!previousHass) return true;
    const language = (hass) =>
      hass?.selectedLanguage || hass?.language || hass?.locale?.language;
    if (language(previousHass) !== language(this.hass)) return true;

    // HA replaces the hass object for state updates. Forward the new object to
    // the already rendered previews without rebuilding the picker or losing
    // its scroll position.
    this.renderRoot?.querySelectorAll?.("[data-card-preview] > *")
      .forEach((card) => {
        if ("hass" in card) card.hass = this.hass;
      });
    return false;
  }

  firstUpdated() {
    this._observePreviews();
  }

  updated(changed) {
    if (changed.has("_filter") || changed.has("hass")) this._observePreviews();
  }

  _localizedCardName(type, fallback) {
    if (type.startsWith("custom:")) return fallback;
    return this.hass?.localize?.(
      `ui.panel.lovelace.editor.card.${type}.name`,
    ) || fallback;
  }

  _localizedCardDescription(type) {
    if (type.startsWith("custom:")) {
      const registeredType = type.slice(7);
      const card = (window.customCards || []).find((entry) =>
        entry?.type === registeredType || entry?.type === type);
      return card?.description || type;
    }
    return this.hass?.localize?.(
      `ui.panel.lovelace.editor.card.${type}.description`,
    ) || type;
  }

  _observePreviews() {
    this._previewObserver?.disconnect();
    const previews = this.renderRoot?.querySelectorAll?.("[data-card-preview]");
    if (!previews?.length) return;

    const load = (element) => {
      const type = element.dataset.cardPreview;
      if (type) this._loadPreview(type, element);
    };
    if (typeof IntersectionObserver !== "function") {
      previews.forEach(load);
      return;
    }
    this._previewObserver = new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        load(entry.target);
      }
    }, { rootMargin: "160px" });
    previews.forEach((element) => this._previewObserver.observe(element));
  }

  _showPreviewDescription(type, container) {
    const description = document.createElement("span");
    description.className = "preview-description";
    description.textContent = this._localizedCardDescription(type);
    container.replaceChildren(description);
  }

  async _loadPreview(type, container) {
    if (container.dataset.previewLoading === "true") return;
    container.dataset.previewLoading = "true";
    const generation = this._previewGeneration;
    try {
      const customCard = type.startsWith("custom:")
        ? (window.customCards || []).find((entry) =>
          entry?.type === type || entry?.type === type.slice(7))
        : undefined;
      const config = this._previewConfigs.get(type)
        || (customCard?.preview
          ? await createInitialCardConfig(this.hass, type)
          : createPreviewConfig(this.hass, type));
      if (!config) {
        if (this.isConnected && container.isConnected) {
          this._showPreviewDescription(type, container);
        }
        return;
      }
      this._previewConfigs.set(type, config);
      const helpers = await loadCardHelpers();
      const card = await helpers.createCardElement(cloneCardConfig(config));
      if (card?.tagName === "HUI-ERROR-CARD") {
        throw new Error(`Home Assistant rejected the preview for ${type}`);
      }
      if (
        !this.isConnected
        || generation !== this._previewGeneration
        || !container.isConnected
      ) return;
      card.hass = this.hass;
      card.tabIndex = -1;
      container.replaceChildren(card);
    } catch (error) {
      if (
        !this.isConnected
        || generation !== this._previewGeneration
        || !container.isConnected
      ) return;
      this._showPreviewDescription(type, container);
      console.warn(`Unable to preview Lovelace card ${type}`, error);
    }
  }

  _cards() {
    return [...BUILT_IN_CARDS, ...registeredCustomCards()];
  }

  async _selectType(type) {
    if (this._selecting || !type) return;
    this._selecting = true;
    this._error = undefined;
    try {
      const selectionKey = `${this.entityId || ""}\u0000${type}`;
      const config = this._selectionConfigs.get(selectionKey)
        || await createInitialCardConfig(this.hass, type, this.entityId);
      this._selectionConfigs.set(selectionKey, config);
      fireConfigChanged(this, config);
    } catch (error) {
      this._error = error instanceof Error ? error.message : String(error);
      console.error(`Unable to select Lovelace card ${type}`, error);
    } finally {
      this._selecting = false;
    }
  }

  _cardClicked(event) {
    if (this._selecting) return;
    if (this._pointerMoved) {
      event.preventDefault();
      event.stopPropagation();
      this._pointerMoved = false;
      return;
    }
    this._selectType(event.currentTarget.dataset.type);
  }

  _cardKeyDown(event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    this._cardClicked(event);
  }

  _cardPointerDown(event) {
    this._pointerStart = { x: event.clientX, y: event.clientY };
    this._pointerMoved = false;
  }

  _cardPointerMove(event) {
    if (!this._pointerStart || this._pointerMoved) return;
    const x = Math.abs(event.clientX - this._pointerStart.x);
    const y = Math.abs(event.clientY - this._pointerStart.y);
    if (x > 8 || y > 8) this._pointerMoved = true;
  }

  _cardPointerCancel() {
    this._pointerStart = undefined;
    this._pointerMoved = false;
  }

  _stopPreviewEvent(event) {
    event.stopPropagation();
  }

  _manualSubmit() {
    let type = this._manualType.trim();
    if (type && !type.includes(":")) type = `custom:${type}`;
    this._selectType(type);
  }

  render() {
    const filter = this._filter.trim().toLowerCase();
    const cards = this._cards()
      .map(([type, fallbackName]) => ({
        type,
        name: this._localizedCardName(type, fallbackName),
      }))
      .filter(({ type, name }) =>
        !filter
        || type.toLowerCase().includes(filter)
        || name.toLowerCase().includes(filter));
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
        ${cards.map(({ type, name }) => html`
          <div
            class="card-option"
            data-type=${type}
            role="button"
            tabindex="0"
            aria-disabled=${this._selecting ? "true" : "false"}
            @pointerdown=${this._cardPointerDown}
            @pointermove=${this._cardPointerMove}
            @pointercancel=${this._cardPointerCancel}
            @click=${this._cardClicked}
            @keydown=${this._cardKeyDown}
          >
            <strong>${name}</strong>
            <div
              class="preview"
              data-card-preview=${type}
              @config-changed=${this._stopPreviewEvent}
            >
              <ha-circular-progress active></ha-circular-progress>
            </div>
            <small>${type}</small>
          </div>
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
      ${this._selecting ? html`<p class="status">${translateEngine(this.hass, "editor.loading_card_editor")}</p>` : ""}
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
    .cards {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 12px; margin-top: 12px;
    }
    .card-option {
      box-sizing: border-box; min-width: 0; height: 200px; padding: 12px;
      border: 1px solid var(--divider-color); border-radius: var(--ha-card-border-radius, 12px);
      color: var(--primary-text-color); background: var(--card-background-color);
      text-align: center; cursor: pointer; overflow: hidden;
      display: grid; grid-template-rows: minmax(20px, auto) 1fr auto;
      touch-action: pan-y;
    }
    .card-option:hover, .card-option:focus-visible {
      border-color: var(--primary-color); outline: none;
    }
    .card-option[aria-disabled="true"] { opacity: 0.6; pointer-events: none; }
    .card-option strong, .card-option small { display: block; overflow-wrap: anywhere; }
    .card-option strong { font-size: 16px; }
    .card-option small { margin-top: 4px; color: var(--secondary-text-color); }
    .preview {
      box-sizing: border-box; display: flex; height: 130px; min-height: 0;
      margin: 8px 0; overflow: hidden; contain: layout paint;
      align-items: center; justify-content: center; pointer-events: none;
    }
    .preview > * { width: 100%; max-height: 130px; overflow: hidden; }
    .preview ha-circular-progress { width: auto; }
    .preview-description {
      color: var(--secondary-text-color); line-height: 1.4;
    }
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
    this._lastEmittedSignature = undefined;
    this._currentValue = undefined;
    this._currentSignature = undefined;
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
      const lovelace = normalizeLovelace(this.lovelace);
      if (this._editor.lovelace !== lovelace) this._editor.lovelace = lovelace;
    }
    // State updates replace the hass object frequently. Forwarding hass is
    // sufficient; setConfig() must only run for an actual config change or the
    // native HA editor loses focus and scroll position on every state update.
    if (!changed.has("value")) return;
    const nextValue = cloneCardConfig(this.value);
    const nextSignature = cardConfigSignature(nextValue);
    if (
      nextSignature === this._lastEmittedSignature
      || nextSignature === this._currentSignature
    ) {
      this._lastEmittedSignature = undefined;
      return;
    }
    this._currentValue = nextValue;
    this._currentSignature = nextSignature;
    if (this._editor && this._loadedType === this.value?.type) {
      this._editor.setConfig(cloneCardConfig(nextValue));
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
        card = await helpers.createCardElement(cloneCardConfig(this.value));
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
      editor.lovelace = normalizeLovelace(this.lovelace);
      editor.setConfig(cloneCardConfig(this.value));
      editor.addEventListener("config-changed", (event) => {
        event.stopPropagation();
        if (event.detail?.config) {
          const nextConfig = cloneCardConfig(event.detail.config);
          const nextSignature = cardConfigSignature(nextConfig);
          this._currentValue = nextConfig;
          this._currentSignature = nextSignature;
          this._lastEmittedSignature = nextSignature;
          fireConfigChanged(this, cloneCardConfig(nextConfig));
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
      this._currentValue = cloneCardConfig(config);
      this._currentSignature = cardConfigSignature(config);
      this._lastEmittedSignature = this._currentSignature;
      fireConfigChanged(this, cloneCardConfig(config));
    } catch (error) {
      this._error = error instanceof Error ? error.message : String(error);
    }
  }

  getConfig() {
    const config = this._currentValue ?? this.value;
    return config && typeof config === "object" ? structuredClone(config) : config;
  }

  async commitConfig() {
    // Some HA/custom editors only publish their final field value on blur.
    // Commit the focused shadow-DOM input before the popup serializes config.
    deepestActiveElement(this.renderRoot)?.blur?.();
    await Promise.resolve();
    if (this._editor?.updateComplete) {
      await this._editor.updateComplete;
    }
    await Promise.resolve();
    await this.updateComplete;
    return this.getConfig();
  }

  render() {
    return html`
      <div id="editor"></div>
      ${this._loading ? html`<p class="status">${translateEngine(this.hass, "editor.loading_card_editor")}</p>` : ""}
      ${this._fallbackText !== undefined ? html`
        <p>${translateEngine(this.hass, "editor.no_visual_editor")}</p>
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
    this._card = undefined;
    this._loadedType = undefined;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._generation += 1;
    this._card = undefined;
    this._loadedType = undefined;
  }

  updated(changed) {
    if (changed.has("hass") && this._card) this._card.hass = this.hass;
    if (changed.has("config") || (changed.has("hass") && !this._card)) {
      this._loadPreview();
    }
  }

  async _loadPreview() {
    if (!this.isConnected || !this.hass || !this.config?.type) return;
    const generation = ++this._generation;
    this._error = undefined;
    if (
      this._card
      && this._loadedType === this.config.type
      && typeof this._card.setConfig === "function"
    ) {
      try {
        await this._card.setConfig(cloneCardConfig(this.config));
        if (!this.isConnected || generation !== this._generation) return;
        this._card.hass = this.hass;
        return;
      } catch (error) {
        // A card may reject an in-place update even though it supports an
        // initial setConfig. Keep the old card visible while replacing it.
        console.warn(`Unable to update preview ${this.config.type} in place`, error);
      }
    }
    try {
      const helpers = await loadCardHelpers();
      const card = await helpers.createCardElement(cloneCardConfig(this.config));
      if (!this.isConnected || generation !== this._generation) return;
      await this.updateComplete;
      if (!this.isConnected || generation !== this._generation) return;
      card.hass = this.hass;
      this.renderRoot.querySelector("#preview")?.replaceChildren(card);
      this._card = card;
      this._loadedType = this.config.type;
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
  cardConfigSignature,
  cardTagName,
  cloneCardConfig,
  applyEntityContext,
  createInitialCardConfig,
  createPreviewConfig,
  deepestActiveElement,
  normalizeLovelace,
  registeredCustomCards,
};
