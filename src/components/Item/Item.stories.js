import './Item.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Item',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Toggle dark mode background wrapper',
    },
    type: {
      control: 'select',
      options: ['double', 'single'],
      description: 'Item layout type: double (start + end) or single (label only)',
    },
    startLabel: {
      control: 'text',
      description: 'Label displayed on the start side',
    },
    endLabel: {
      control: 'text',
      description: 'Label or value displayed on the end side',
    },
    showStartIcon: {
      control: 'boolean',
      description: 'Show an icon before the start label',
    },
    showEndIcon: {
      control: 'boolean',
      description: 'Show a chevron icon after the end label',
    },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Apply BSDEX design token overrides on an ion-item.
 */
function applyBsdexTokens(item, mode) {
  item.style.setProperty('--background', 'transparent');
  item.style.setProperty('--padding-start', '0');
  item.style.setProperty('--padding-end', '0');
  item.style.setProperty('--inner-padding-end', '0');
  item.style.setProperty('--min-height', '40px');

  if (mode === 'dark') {
    item.style.setProperty('--color', '#ffffff');
  }
}

/**
 * Create a single ion-item element from the provided args.
 */
function createIonItem({
  mode = 'light',
  type = 'double',
  startLabel = 'Label start',
  endLabel = 'Label end',
  showStartIcon = false,
  showEndIcon = false,
}) {
  const item = document.createElement('ion-item');
  item.setAttribute('lines', 'none');
  applyBsdexTokens(item, mode);

  if (type === 'single') {
    item.style.setProperty('--color', mode === 'dark' ? '#ffffff' : 'var(--bsdex-dark-shade)');
  }

  // Start icon
  if (showStartIcon) {
    const icon = document.createElement('ion-icon');
    icon.setAttribute('slot', 'start');
    icon.setAttribute('name', 'information-circle-outline');
    icon.style.cssText = 'color: var(--bsdex-primary-base); margin-inline-end: 8px; font-size: 24px;';
    item.appendChild(icon);
  }

  // Label
  const label = document.createElement('ion-label');
  label.textContent = startLabel;
  label.style.cssText = `font-family: var(--bsdex-font-family); font-size: var(--bsdex-body-default-size); line-height: 27px;`;
  if (type === 'double') {
    label.style.color = mode === 'dark' ? 'var(--bsdex-light-shade)' : 'var(--bsdex-medium-shade)';
  } else {
    label.style.fontWeight = '600';
  }
  item.appendChild(label);

  // End value
  if (type === 'double') {
    const note = document.createElement('ion-note');
    note.setAttribute('slot', 'end');
    note.textContent = endLabel;
    note.style.cssText = `font-family: var(--bsdex-font-family); font-size: var(--bsdex-body-default-size); line-height: 27px; color: ${mode === 'dark' ? '#ffffff' : 'var(--bsdex-dark-shade)'};`;
    item.appendChild(note);
  }

  // End icon (chevron)
  if (showEndIcon) {
    const icon = document.createElement('ion-icon');
    icon.setAttribute('slot', 'end');
    icon.setAttribute('name', 'chevron-forward');
    icon.style.cssText = 'color: var(--bsdex-primary-base); font-size: 16px; margin-inline-start: 4px;';
    item.appendChild(icon);
  }

  return item;
}

/**
 * Wrap content in an optional dark-mode container.
 */
function wrapWithMode(content, mode) {
  const container = document.createElement('div');
  container.style.cssText = `padding: 16px; width: 400px; ${mode === 'dark' ? 'background: #191c1d; border-radius: 8px;' : 'background: #ffffff;'}`;
  container.appendChild(content);
  return container;
}

/**
 * Build the Ionic markup string for code snippet display.
 */
function buildCodeString({
  startLabel = 'Label start',
  endLabel = 'Label end',
  showStartIcon = false,
  showEndIcon = false,
  type = 'double',
}) {
  let inner = '';

  if (showStartIcon) {
    inner += '\n  <ion-icon slot="start" name="information-circle-outline"></ion-icon>';
  }

  inner += `\n  <ion-label>${startLabel}</ion-label>`;

  if (type === 'double') {
    inner += `\n  <ion-note slot="end">${endLabel}</ion-note>`;
  }

  if (showEndIcon) {
    inner += '\n  <ion-icon slot="end" name="chevron-forward"></ion-icon>';
  }

  return `<ion-item lines="none">${inner}\n</ion-item>`;
}

// ---------------------------------------------------------------------------
// Default args
// ---------------------------------------------------------------------------

const defaultArgs = {
  mode: 'light',
  type: 'double',
  startLabel: 'Label start',
  endLabel: 'Label end',
  showStartIcon: false,
  showEndIcon: true,
};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const LightDouble = {
  render: (args) => {
    const container = wrapWithMode(createIonItem(args), args.mode);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs },
};

export const DarkDouble = {
  render: (args) => {
    const container = wrapWithMode(createIonItem(args), args.mode);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs, mode: 'dark' },
};

export const WithStartIcon = {
  render: (args) => {
    const container = wrapWithMode(createIonItem(args), args.mode);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs, showStartIcon: true, showEndIcon: true },
};

export const ItemList = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'width: 400px; padding: 16px; background: #ffffff;';

    const list = document.createElement('ion-list');
    list.style.setProperty('--ion-item-background', 'transparent');

    const items = [
      { start: 'Order type', end: 'Market' },
      { start: 'Amount', end: '0.00234 BTC' },
      { start: 'Price', end: '€43,250.00' },
      { start: 'Fee', end: '€1.25' },
      { start: 'Total', end: '€102.50' },
    ];

    items.forEach((itemData) => {
      const item = createIonItem({
        mode: 'light',
        type: 'double',
        startLabel: itemData.start,
        endLabel: itemData.end,
        showStartIcon: false,
        showEndIcon: false,
      });
      item.setAttribute('lines', 'full');
      list.appendChild(item);
    });

    container.appendChild(list);

    const code = `<ion-list>
  <ion-item lines="full">
    <ion-label>Order type</ion-label>
    <ion-note slot="end">Market</ion-note>
  </ion-item>
  <ion-item lines="full">
    <ion-label>Amount</ion-label>
    <ion-note slot="end">0.00234 BTC</ion-note>
  </ion-item>
  <ion-item lines="full">
    <ion-label>Price</ion-label>
    <ion-note slot="end">€43,250.00</ion-note>
  </ion-item>
  <ion-item lines="full">
    <ion-label>Fee</ion-label>
    <ion-note slot="end">€1.25</ion-note>
  </ion-item>
  <ion-item lines="full">
    <ion-label>Total</ion-label>
    <ion-note slot="end">€102.50</ion-note>
  </ion-item>
</ion-list>`;
    container.appendChild(createCodeSnippet(code));

    return container;
  },
};

// ---------------------------------------------------------------------------
// API Documentation
// ---------------------------------------------------------------------------

export const API = {
  render: () => {
    return createApiTable({
      properties: [
        {
          name: 'lines',
          type: "'full' | 'inset' | 'none'",
          default: 'undefined',
          description: 'How the bottom border should be displayed on the item.',
        },
        {
          name: 'button',
          type: 'boolean',
          default: 'false',
          description: 'If true, a button tag will be rendered and the item will be tappable.',
        },
        {
          name: 'detail',
          type: 'boolean',
          default: 'false',
          description: 'If true, a detail arrow will appear on the item (chevron-forward icon).',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'If true, the user cannot interact with the item.',
        },
        {
          name: 'href',
          type: 'string',
          default: 'undefined',
          description: 'Contains a URL. If set, an anchor tag is rendered instead of a div.',
        },
        {
          name: 'color',
          type: 'string',
          default: 'undefined',
          description: 'The color to use from the application color palette.',
        },
        {
          name: 'mode',
          type: "'ios' | 'md'",
          default: 'undefined',
          description: 'The Ionic rendering mode (iOS or Material Design).',
        },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background of the item.' },
        { name: '--background-activated', description: 'Background of the item when pressed.' },
        { name: '--background-focused', description: 'Background of the item when focused.' },
        { name: '--background-hover', description: 'Background of the item on hover.' },
        { name: '--color', description: 'Color of the item text.' },
        { name: '--padding-start', description: 'Start padding of the item.' },
        { name: '--padding-end', description: 'End padding of the item.' },
        { name: '--inner-padding-end', description: 'End padding of the inner item content.' },
        { name: '--min-height', description: 'Minimum height of the item.' },
        { name: '--border-color', description: 'Color of the item bottom border.' },
        { name: '--border-width', description: 'Width of the item bottom border.' },
      ],
      shadowParts: [
        { name: 'native', description: 'The native HTML element wrapping the item content.' },
        { name: 'detail-icon', description: 'The chevron icon shown when detail is true.' },
      ],
    });
  },
};
