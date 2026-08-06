"use strict";

const DWAINS_BLUEPRINT_CARD_TYPE = "custom:dwains-blueprint-card";

function isDwainsBlueprintCard(config) {
  // Older saved overrides may already expose the blueprint's inner card type,
  // but the blueprint id remains the stable ownership marker.
  return typeof config?.blueprint === "string"
    && config.blueprint.length > 0;
}

function blueprintSelection(config, blueprintResponse) {
  if (!isDwainsBlueprintCard(config)) return undefined;
  const id = config.blueprint;
  const definition = blueprintResponse?.blueprints?.[id];
  const metadata = definition?.blueprint || {};
  return {
    id,
    installed: Boolean(definition),
    name: metadata.name || id,
    description: metadata.description || "",
    version: metadata.version ?? "",
  };
}

function prepareEntityEditorCardConfig(config, entityId) {
  if (!config || typeof config !== "object") return "";
  const cardConfig = structuredClone(config);
  if (isDwainsBlueprintCard(cardConfig)) {
    // Entity context is runtime input for the blueprint preview/editor.
    cardConfig.input_entity = entityId;
  } else {
    delete cardConfig.input_entity;
    delete cardConfig.input_name;
  }
  return cardConfig;
}

function renderBlueprintSelection(html, translate, hass, config, blueprintResponse) {
  const selected = blueprintSelection(config, blueprintResponse);
  if (!selected) return "";
  const secondary = "color:var(--secondary-text-color);font-size:.85rem";
  return html`
    <section style="box-sizing:border-box;margin-bottom:16px;padding:14px 16px;border:1px solid var(--divider-color);border-radius:var(--ha-card-border-radius,12px);background:var(--card-background-color)">
      <div style=${secondary}>${translate(hass, "blueprint.title")}</div>
      <strong style="display:block;margin:3px 0;color:var(--primary-text-color);font-size:1rem">${selected.name}</strong>
      ${selected.version !== "" ? html`
        <div style=${secondary}>${translate(hass, "global.version")}: ${selected.version}</div>
      ` : ""}
      ${selected.description ? html`
        <div style="margin-top:6px;color:var(--primary-text-color)">${selected.description}</div>
      ` : ""}
      ${!selected.installed ? html`
        <div style=${secondary}>${translate(hass, "blueprint.not_installed")} (${selected.id})</div>
      ` : ""}
    </section>
  `;
}

module.exports = {
  DWAINS_BLUEPRINT_CARD_TYPE,
  blueprintSelection,
  isDwainsBlueprintCard,
  prepareEntityEditorCardConfig,
  renderBlueprintSelection,
};
