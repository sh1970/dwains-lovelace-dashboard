const subtleVariables = (css) => css`
  --dd-subtle-surface: var(--ha-card-background, var(--card-background-color, white));
  --dd-subtle-page-background: color-mix(in srgb, var(--primary-background-color) 82%, var(--dd-subtle-surface) 18%);
  --dd-subtle-muted: rgba(127, 127, 127, 0.055);
  --dd-subtle-muted-hover: rgba(127, 127, 127, 0.085);
  --dd-subtle-divider: rgba(127, 127, 127, 0.085);
  --dd-subtle-radius: 16px;
  --dd-subtle-radius-small: 12px;
  --dd-subtle-shadow: 0 3px 14px rgba(0, 0, 0, 0.052);
  --dd-subtle-shadow-hover: 0 7px 22px rgba(0, 0, 0, 0.078);
`;

export const subtleBackButtonStyles = (css) => css`
  .back-button,
  .dd-dashboard-style-refresh .back-button {
    margin-right: 1.25rem;
    margin-bottom: 4rem;
    display: inline-block;
    cursor: pointer;
  }

  .back-button .button,
  .dd-dashboard-style-refresh .back-button .button {
    box-sizing: border-box;
    width: 3.5rem;
    height: 3.5rem;
    min-width: 3.5rem;
    min-height: 3.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem !important;
    border-radius: 9999px !important;
    border: 0 !important;
    outline: 0 !important;
    background: var(--primary-color) !important;
    background-color: var(--primary-color) !important;
    color: var(--text-primary-color, #fff) !important;
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18) !important;
    transition: background-color 150ms ease, box-shadow 150ms ease;
    margin-bottom: env(safe-area-inset-bottom);
  }

  .back-button .button:hover,
  .dd-dashboard-style-refresh .back-button .button:hover {
    background: color-mix(in srgb, var(--primary-color) 88%, var(--primary-text-color) 12%) !important;
    background-color: color-mix(in srgb, var(--primary-color) 88%, var(--primary-text-color) 12%) !important;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.22) !important;
  }
`;

export const subtleNavigationStyles = (css) => css`
  :host {
    ${subtleVariables(css)}
    border: 0;
    box-shadow: 0 1px 14px rgba(0, 0, 0, 0.055);
    background: var(--dd-subtle-surface);
  }

  :host .mainNavItems div {
    padding: 0.52rem 0.78rem;
    border-radius: var(--dd-subtle-radius-small);
    color: var(--secondary-text-color);
    transition: background-color 150ms ease, color 150ms ease;
  }

  :host .mainNavItems div.active {
    color: var(--primary-color);
    background: var(--dd-subtle-muted);
    box-shadow: none;
  }

  :host .mainNavItems div:hover {
    background: var(--dd-subtle-muted-hover);
    color: var(--primary-text-color);
  }

  @media all and (max-width: 1024px), all and (max-width: 812px) and (orientation: landscape) {
    :host {
      box-shadow: 0 -1px 14px rgba(0, 0, 0, 0.065);
    }
  }
`;

export const subtleHouseInformationStyles = (css) => css`
  ha-card {
    ${subtleVariables(css)}
    border: 0;
    border-radius: var(--dd-subtle-radius);
    box-shadow: var(--dd-subtle-shadow);
    background: var(--dd-subtle-surface);
    color: var(--primary-text-color);
  }

  ha-card .dd-header-tabs {
    gap: 0.45rem;
    padding: 0.7rem;
  }

  ha-card .dd-header-tab {
    padding: 0;
    border-radius: var(--dd-subtle-radius-small);
  }

  ha-card .dd-header-tab:hover {
    background: transparent;
  }

  ha-card .dd-header-tab > div {
    box-sizing: border-box;
    padding: 0.35rem 0.55rem;
    border: 0;
    border-radius: var(--dd-subtle-radius-small);
    background: transparent;
    transition: background-color 150ms ease, color 150ms ease;
  }

  ha-card .dd-header-tab > div:hover {
    background: var(--dd-subtle-muted-hover);
  }

  ha-card .round-badge {
    background: transparent !important;
    background-color: transparent !important;
    box-shadow: none !important;
  }

  ha-card .badge-icon {
    color: var(--primary-color);
    filter: none;
  }

  ha-card .domain-badge-card h3,
  ha-card .dd-header-tab h3 {
    margin-top: 0.42rem;
    font-weight: 650;
    letter-spacing: -0.01em;
    color: var(--primary-text-color);
  }

  ha-card .dd-header-tabs span {
    color: var(--secondary-text-color);
    font-weight: 500;
  }

  ha-card img.rounded-full {
    box-shadow: none;
  }
`;

export const subtleHomepageStyles = (css) => css`
  .dd-dashboard-style-refresh {
    ${subtleVariables(css)}
    --ha-card-border-radius: var(--dd-subtle-radius);
    --ha-card-box-shadow: var(--dd-subtle-shadow);
    background: var(--dd-subtle-page-background);
    color: var(--primary-text-color);
    min-height: 100%;
  }

  .dd-dashboard-style-refresh .dd-homepage-greeting {
    align-items: center;
    gap: 0.75rem;
    padding: 0.25rem 0 0.4rem;
  }

  .dd-dashboard-style-refresh .dd-homepage-greeting h1,
  .dd-dashboard-style-refresh h2,
  .dd-dashboard-style-refresh h3 {
    letter-spacing: -0.015em;
  }

  .dd-dashboard-style-refresh .dd-homepage-greeting #clock {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.7rem;
    border-radius: var(--dd-subtle-radius-small);
    background: var(--dd-subtle-surface);
    box-shadow: var(--dd-subtle-shadow);
    border: 0;
    color: var(--primary-text-color);
    font-weight: 650;
    line-height: 1.18;
    letter-spacing: -0.01em;
    text-shadow: none;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }

  .dd-dashboard-style-refresh #badges,
  .dd-dashboard-style-refresh .area-button {
    background: var(--dd-subtle-surface);
    border: 0;
    border-radius: var(--dd-subtle-radius);
    box-shadow: var(--dd-subtle-shadow);
    color: var(--primary-text-color);
  }

.dd-dashboard-style-refresh .area-button {
  overflow: hidden;
  transition: box-shadow 150ms ease, background-color 150ms ease;
}

.dd-dashboard-style-refresh .area-button.h-44:hover {
  box-shadow: var(--dd-subtle-shadow), 0 0 0 1px var(--dd-subtle-divider), 0 5px 18px rgba(0, 0, 0, 0.058);
}

  .dd-dashboard-style-refresh .area-button h3 {
    font-weight: 720;
    line-height: 1.16;
  }

  .dd-dashboard-style-refresh .area-button .sensors {
    display: block;
    color: var(--secondary-text-color);
    font-weight: 500;
    line-height: 1.28;
    max-height: 2.7em;
    overflow: hidden;
  }

  .dd-dashboard-style-refresh .area-button .sensor-separator {
    display: inline;
    color: var(--secondary-text-color);
    opacity: 0.55;
  }

  .dd-dashboard-style-refresh .area-button .sensor-chip {
    display: inline;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--secondary-text-color);
    white-space: normal;
  }

  .dd-dashboard-style-refresh .area-button.current {
    box-shadow: var(--dd-subtle-shadow-hover);
  }

  ${subtleBackButtonStyles(css)}

  .dd-dashboard-style-refresh .dd-area-view-header {
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 0.9rem 1rem;
    background: var(--dd-subtle-surface);
    border: 0;
    border-radius: var(--dd-subtle-radius);
    box-shadow: var(--dd-subtle-shadow);
  }

  .dd-dashboard-style-refresh .dd-area-view-title h1,
  .dd-dashboard-style-refresh .dd-area-view-title h2,
  .dd-dashboard-style-refresh .dd-area-view-title h3 {
    font-weight: 760;
    letter-spacing: -0.02em;
  }

  .dd-dashboard-style-refresh .dd-area-view > h3,
  .dd-dashboard-style-refresh .dd-area-view .font-semibold.capitalize {
    margin: 1.1rem 0 0.55rem;
    color: var(--secondary-text-color);
    font-size: 0.92rem;
    font-weight: 720;
    letter-spacing: 0.005em;
  }

  .dd-dashboard-style-refresh .text-gray,
  .dd-dashboard-style-refresh .text-gray-500,
  .dd-dashboard-style-refresh .text-gray-600,
  .dd-dashboard-style-refresh .text-gray-700 {
    color: var(--secondary-text-color);
  }

  .dd-dashboard-style-refresh .relative > ha-card,
  .dd-dashboard-style-refresh .dd-masonry > div > div,
  .dd-dashboard-style-refresh .area-view-entity-sortable > div > div {
    border-radius: var(--dd-subtle-radius);
    overflow: hidden;
  }

  .dd-dashboard-style-refresh hui-card,
  .dd-dashboard-style-refresh ha-card {
    --ha-card-border-radius: var(--dd-subtle-radius);
    --ha-card-box-shadow: var(--dd-subtle-shadow);
    --ha-card-border-width: 0;
    --ha-card-border-color: transparent;
  }

  .dd-dashboard-style-refresh .card-actions-centered,
  .dd-dashboard-style-refresh .card-actions-multiple {
    border-top: 1px solid var(--dd-subtle-divider);
    background: var(--dd-subtle-surface);
    border-radius: 0 0 var(--dd-subtle-radius) var(--dd-subtle-radius);
    padding: 0.45rem 0.55rem;
  }

  .dd-dashboard-style-refresh button.border-dashed {
    border-color: var(--dd-subtle-divider);
    background: var(--dd-subtle-muted);
    border-radius: var(--dd-subtle-radius);
  }

  .dd-dashboard-style-refresh .sortable-move {
    color: var(--secondary-text-color);
    background: transparent;
    border-radius: 10px;
    padding: 0.35rem;
  }

  .dd-dashboard-style-refresh .sortable-move:hover {
    color: var(--primary-text-color);
    background: var(--dd-subtle-muted);
  }
`;

export const subtlePopupStyles = (css) => css`
  :host {
    ${subtleVariables(css)}
  }

  :host ha-dialog {
    --mdc-shape-medium: 18px;
    --ha-card-border-radius: var(--dd-subtle-radius);
    --ha-card-box-shadow: var(--dd-subtle-shadow);
  }

  :host app-toolbar {
    border-bottom: 1px solid var(--dd-subtle-divider);
    background: var(--dd-subtle-surface);
  }

  :host .main-title {
    font-weight: 700;
    letter-spacing: -0.015em;
  }
`;

export const subtleMorePagesStyles = (css) => css`
  .dd-dashboard-style-refresh {
    ${subtleVariables(css)}
    --ha-card-border-radius: var(--dd-subtle-radius);
    --ha-card-box-shadow: var(--dd-subtle-shadow);
    background: var(--dd-subtle-page-background);
    min-height: 100%;
  }

  .dd-dashboard-style-refresh > .flex:first-child {
    padding: 0.9rem 1rem;
    background: var(--dd-subtle-surface);
    border-radius: var(--dd-subtle-radius);
    box-shadow: var(--dd-subtle-shadow);
  }

  .dd-dashboard-style-refresh .more-page-button {
    border: 0;
    border-radius: var(--dd-subtle-radius);
    box-shadow: var(--dd-subtle-shadow);
    background: var(--dd-subtle-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1rem;
    transition: box-shadow 150ms ease, background-color 150ms ease;
  }

  .dd-dashboard-style-refresh .more-page-button:hover {
    box-shadow: var(--dd-subtle-shadow), 0 0 0 1px var(--dd-subtle-divider), 0 5px 18px rgba(0, 0, 0, 0.058);
  }

  .dd-dashboard-style-refresh .more-page-button .ha-icon {
    width: 3.25rem;
    height: 3.25rem;
    display: grid;
    place-items: center;
    border-radius: 0;
    background: transparent;
    margin: 0 auto;
  }

  .dd-dashboard-style-refresh .more-page-button .ha-icon ha-icon {
    width: 2.15rem !important;
    height: 2.15rem !important;
    color: var(--primary-color) !important;
    filter: none;
  }

  .dd-dashboard-style-refresh .more-page-button > div:first-child {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    gap: 0.85rem;
  }

  .dd-dashboard-style-refresh .more-page-button > div:first-child > .w-full {
    display: flex;
    justify-content: center;
  }

  .dd-dashboard-style-refresh .more-page-button h3 {
    width: 100%;
    text-align: center;
    font-weight: 720;
    letter-spacing: -0.01em;
    line-height: 1.15;
  }
`;

export const subtleDevicesPageStyles = (css) => css`
  .dd-dashboard-style-refresh {
    ${subtleVariables(css)}
    --ha-card-border-radius: var(--dd-subtle-radius);
    --ha-card-box-shadow: var(--dd-subtle-shadow);
    background: var(--dd-subtle-page-background);
    min-height: 100%;
  }

  .dd-dashboard-style-refresh #devices > .flex:first-child {
    padding: 0.9rem 1rem;
    background: var(--dd-subtle-surface);
    border-radius: var(--dd-subtle-radius);
    box-shadow: var(--dd-subtle-shadow);
  }

.dd-dashboard-style-refresh .device-button {
    border: 0;
    border-radius: var(--dd-subtle-radius);
    box-shadow: var(--dd-subtle-shadow);
    background: var(--dd-subtle-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1rem;
  transition: box-shadow 150ms ease, background-color 150ms ease;
}

.dd-dashboard-style-refresh .device-button:hover {
  box-shadow: var(--dd-subtle-shadow), 0 0 0 1px var(--dd-subtle-divider), 0 5px 18px rgba(0, 0, 0, 0.058);
}

.dd-dashboard-style-refresh .device-button .ha-icon {
  width: 3.25rem;
  height: 3.25rem;
  display: grid;
  place-items: center;
  border-radius: 0;
  background: transparent;
  margin: 0 auto;
}

  .dd-dashboard-style-refresh .device-button .ha-icon ha-icon {
    width: 2.15rem !important;
    height: 2.15rem !important;
    color: var(--primary-color) !important;
    filter: none;
  }

  .dd-dashboard-style-refresh .device-button > div:first-child {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    gap: 0.85rem;
  }

  .dd-dashboard-style-refresh .device-button > div:first-child > .w-full {
    display: flex;
    justify-content: center;
  }

  .dd-dashboard-style-refresh .device-button h3 {
    width: 100%;
    text-align: center;
    font-weight: 720;
    letter-spacing: -0.01em;
    line-height: 1.15;
  }

  .dd-dashboard-style-refresh hui-card,
  .dd-dashboard-style-refresh ha-card {
    --ha-card-border-radius: var(--dd-subtle-radius);
    --ha-card-box-shadow: var(--dd-subtle-shadow);
    --ha-card-border-width: 0;
    --ha-card-border-color: transparent;
  }
`;
