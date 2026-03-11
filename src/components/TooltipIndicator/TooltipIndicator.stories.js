import './TooltipIndicator.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Tooltip Indicator',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Toggle dark mode background wrapper',
    },
    price: {
      control: 'text',
      description: 'Price value displayed in the tooltip card',
    },
    date: {
      control: 'text',
      description: 'Date string displayed below the price',
    },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Create the tooltip indicator using an ion-card for the tooltip card,
 * with custom styled line and dot elements.
 */
function createTooltipIndicator({ mode = 'light', price = '€43,250.00', date = '15 Jan 2024, 14:30' }) {
  const tooltip = document.createElement('div');
  tooltip.className = 'bsdex-tooltip';

  // Tooltip card using ion-card
  const card = document.createElement('ion-card');
  card.style.setProperty('--background', mode === 'dark' ? 'var(--bsdex-dark-tint)' : 'var(--bsdex-surface)');
  card.style.cssText += `
    margin: 0;
    padding: 8px 12px;
    border-radius: var(--bsdex-radius-sm);
    font-family: var(--bsdex-font-family);
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    display: inline-block;
    border: 1px solid ${mode === 'dark' ? 'var(--bsdex-dark-tint)' : 'var(--bsdex-light-base)'};
  `;

  const priceEl = document.createElement('div');
  priceEl.className = 'bsdex-tooltip__price';
  priceEl.textContent = price;
  priceEl.style.color = mode === 'dark' ? '#ffffff' : 'var(--bsdex-dark-base)';

  const dateEl = document.createElement('div');
  dateEl.className = 'bsdex-tooltip__date';
  dateEl.textContent = date;

  card.appendChild(priceEl);
  card.appendChild(dateEl);

  // Vertical line
  const line = document.createElement('div');
  line.className = 'bsdex-tooltip__line';

  // Dot
  const dot = document.createElement('div');
  dot.className = 'bsdex-tooltip__dot';

  tooltip.appendChild(card);
  tooltip.appendChild(line);
  tooltip.appendChild(dot);

  return tooltip;
}

/**
 * Wrap content in an optional dark-mode container.
 */
function wrapWithMode(content, mode) {
  const container = document.createElement('div');
  container.style.cssText = `padding: 32px; ${mode === 'dark' ? 'background: #191c1d; border-radius: 8px;' : ''}`;
  container.appendChild(content);
  return container;
}

/**
 * Build the Ionic markup string for code snippet display.
 */
function buildCodeString({ price = '€43,250.00', date = '15 Jan 2024, 14:30' }) {
  return `<div class="bsdex-tooltip">
  <ion-card style="margin: 0; padding: 8px 12px;">
    <div class="bsdex-tooltip__price">${price}</div>
    <div class="bsdex-tooltip__date">${date}</div>
  </ion-card>
  <div class="bsdex-tooltip__line"></div>
  <div class="bsdex-tooltip__dot"></div>
</div>`;
}

// ---------------------------------------------------------------------------
// Default args
// ---------------------------------------------------------------------------

const defaultArgs = {
  mode: 'light',
  price: '€43,250.00',
  date: '15 Jan 2024, 14:30',
};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Light = {
  render: (args) => {
    const container = wrapWithMode(createTooltipIndicator(args), args.mode);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs },
};

export const Dark = {
  render: (args) => {
    const container = wrapWithMode(createTooltipIndicator(args), args.mode);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs, mode: 'dark' },
};

export const CustomValues = {
  render: (args) => {
    const container = wrapWithMode(createTooltipIndicator(args), args.mode);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs, price: '€1,234.56', date: '28 Feb 2024, 09:15' },
};

// ---------------------------------------------------------------------------
// API Documentation
// ---------------------------------------------------------------------------

export const API = {
  render: () => {
    return createApiTable({
      properties: [
        {
          name: 'mode',
          type: "'ios' | 'md'",
          default: 'undefined',
          description: 'The Ionic rendering mode for the ion-card wrapper.',
        },
        {
          name: 'color',
          type: 'string',
          default: 'undefined',
          description: 'The color to use from the application color palette for the ion-card.',
        },
        {
          name: 'button',
          type: 'boolean',
          default: 'false',
          description: 'If true, the ion-card becomes tappable with a click handler.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'If true, the user cannot interact with the card.',
        },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background of the ion-card tooltip.' },
        { name: '--color', description: 'Text color of the ion-card tooltip.' },
        { name: '.bsdex-tooltip__line', description: 'Custom class for the vertical indicator line (height, width, background).' },
        { name: '.bsdex-tooltip__dot', description: 'Custom class for the indicator dot (size, color, border).' },
        { name: '.bsdex-tooltip__price', description: 'Custom class for the price text (font-size, font-weight).' },
        { name: '.bsdex-tooltip__date', description: 'Custom class for the date text (font-size, color).' },
      ],
    });
  },
};
