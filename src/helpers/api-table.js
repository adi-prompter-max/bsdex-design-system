/**
 * API Table Helper
 *
 * Renders clean HTML tables for component API documentation including
 * properties, CSS custom properties, and shadow parts.
 */

const styles = `
  .api-table-section {
    margin-top: 32px;
  }

  .api-table-section__title {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0 0 12px 0;
    padding-bottom: 8px;
    border-bottom: 2px solid #e2e8f0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .api-table {
    width: 100%;
    border-collapse: collapse;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    margin-bottom: 24px;
  }

  .api-table th {
    text-align: left;
    padding: 10px 16px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #718096;
    background: #f7fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .api-table td {
    padding: 10px 16px;
    border-bottom: 1px solid #edf2f7;
    color: #2d3748;
    vertical-align: top;
  }

  .api-table tr:last-child td {
    border-bottom: none;
  }

  .api-table tr:hover td {
    background: #f7fafc;
  }

  .api-table__name {
    font-family: 'SF Mono', 'Fira Code', Menlo, Consolas, monospace;
    font-size: 13px;
    color: #805ad5;
    font-weight: 500;
    white-space: nowrap;
  }

  .api-table__type {
    font-family: 'SF Mono', 'Fira Code', Menlo, Consolas, monospace;
    font-size: 12px;
    color: #d69e2e;
    background: #fffff0;
    padding: 2px 6px;
    border-radius: 3px;
    white-space: nowrap;
  }

  .api-table__default {
    font-family: 'SF Mono', 'Fira Code', Menlo, Consolas, monospace;
    font-size: 12px;
    color: #38a169;
    background: #f0fff4;
    padding: 2px 6px;
    border-radius: 3px;
  }

  .api-table__description {
    color: #4a5568;
    line-height: 1.5;
  }

  .api-table__empty {
    padding: 24px 16px;
    text-align: center;
    color: #a0aec0;
    font-style: italic;
  }
`;

let stylesInjected = false;

function injectStyles() {
  if (stylesInjected) return;
  const styleEl = document.createElement('style');
  styleEl.setAttribute('data-api-table', '');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
  stylesInjected = true;
}

/**
 * Escapes HTML entities.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Builds an HTML table for properties.
 * @param {Array<{name: string, type: string, default: string, description: string}>} properties
 * @returns {string}
 */
function buildPropertiesTable(properties) {
  if (!properties || properties.length === 0) return '';

  const rows = properties.map(prop => `
    <tr>
      <td><span class="api-table__name">${escapeHtml(prop.name)}</span></td>
      <td><span class="api-table__type">${escapeHtml(prop.type)}</span></td>
      <td><span class="api-table__default">${escapeHtml(prop.default || '-')}</span></td>
      <td><span class="api-table__description">${escapeHtml(prop.description)}</span></td>
    </tr>
  `).join('');

  return `
    <div class="api-table-section">
      <h3 class="api-table-section__title">Properties</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

/**
 * Builds an HTML table for CSS custom properties.
 * @param {Array<{name: string, description: string}>} cssCustomProperties
 * @returns {string}
 */
function buildCssCustomPropertiesTable(cssCustomProperties) {
  if (!cssCustomProperties || cssCustomProperties.length === 0) return '';

  const rows = cssCustomProperties.map(prop => `
    <tr>
      <td><span class="api-table__name">${escapeHtml(prop.name)}</span></td>
      <td><span class="api-table__description">${escapeHtml(prop.description)}</span></td>
    </tr>
  `).join('');

  return `
    <div class="api-table-section">
      <h3 class="api-table-section__title">CSS Custom Properties</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

/**
 * Builds an HTML table for shadow parts.
 * @param {Array<{name: string, description: string}>} shadowParts
 * @returns {string}
 */
function buildShadowPartsTable(shadowParts) {
  if (!shadowParts || shadowParts.length === 0) return '';

  const rows = shadowParts.map(part => `
    <tr>
      <td><span class="api-table__name">${escapeHtml(part.name)}</span></td>
      <td><span class="api-table__description">${escapeHtml(part.description)}</span></td>
    </tr>
  `).join('');

  return `
    <div class="api-table-section">
      <h3 class="api-table-section__title">Shadow Parts</h3>
      <table class="api-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

/**
 * Creates an API documentation section with tables for properties,
 * CSS custom properties, and shadow parts.
 *
 * @param {object} api
 * @param {Array<{name: string, type: string, default: string, description: string}>} [api.properties]
 * @param {Array<{name: string, description: string}>} [api.cssCustomProperties]
 * @param {Array<{name: string, description: string}>} [api.shadowParts]
 * @returns {HTMLElement}
 */
export function createApiTable({ properties, cssCustomProperties, shadowParts } = {}) {
  injectStyles();

  const container = document.createElement('div');

  const hasContent = (properties && properties.length > 0) ||
    (cssCustomProperties && cssCustomProperties.length > 0) ||
    (shadowParts && shadowParts.length > 0);

  if (!hasContent) {
    container.innerHTML = '<div class="api-table__empty">No API documentation available.</div>';
    return container;
  }

  container.innerHTML = [
    buildPropertiesTable(properties),
    buildCssCustomPropertiesTable(cssCustomProperties),
    buildShadowPartsTable(shadowParts),
  ].join('');

  return container;
}
