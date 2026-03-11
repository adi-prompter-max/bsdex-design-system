import './Trade.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Trade',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Toggle dark mode background wrapper',
    },
    side: {
      control: 'select',
      options: ['buy', 'sell'],
      description: 'Active trade side (buy or sell)',
    },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Creates a trade form using Ionic web components.
 */
const createTrade = ({ mode, side }) => {
  const isDark = mode === 'dark';

  // Outer wrapper
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `width: 380px; ${isDark ? 'background: #191c1d; padding: 16px; border-radius: 8px;' : 'padding: 16px;'}`;

  // ion-card
  const card = document.createElement('ion-card');
  card.className = 'bsdex-trade-card';
  card.style.setProperty('--background', isDark ? 'var(--bsdex-dark-tint)' : 'var(--bsdex-surface)');
  card.style.setProperty('margin', '0');
  card.style.setProperty('box-shadow', isDark ? 'none' : '0 1px 3px rgba(0,0,0,0.08)');
  if (!isDark) {
    card.style.setProperty('border', '1px solid var(--bsdex-light-base)');
  }

  // ion-card-content
  const cardContent = document.createElement('ion-card-content');
  cardContent.className = 'bsdex-trade-card__content';

  // --- Segment (Buy / Sell toggle) ---
  const segment = document.createElement('ion-segment');
  segment.setAttribute('value', side);
  segment.className = `bsdex-trade-segment bsdex-trade-segment--${side}`;
  if (isDark) {
    segment.style.setProperty('--background', 'var(--bsdex-dark-base)');
  }

  const buyBtn = document.createElement('ion-segment-button');
  buyBtn.setAttribute('value', 'buy');
  buyBtn.innerHTML = '<ion-label>Buy</ion-label>';

  const sellBtn = document.createElement('ion-segment-button');
  sellBtn.setAttribute('value', 'sell');
  sellBtn.innerHTML = '<ion-label>Sell</ion-label>';

  segment.appendChild(buyBtn);
  segment.appendChild(sellBtn);

  // Make segment functional: toggle buy/sell and update button
  segment.addEventListener('ionChange', (e) => {
    const newSide = e.detail.value;
    segment.className = `bsdex-trade-segment bsdex-trade-segment--${newSide}`;
    const submitBtn = card.querySelector('ion-button.bsdex-trade-submit');
    if (submitBtn) {
      submitBtn.setAttribute('color', newSide === 'buy' ? 'success' : 'danger');
      submitBtn.textContent = newSide === 'buy' ? 'Buy BTC' : 'Sell BTC';
    }
  });

  cardContent.appendChild(segment);

  // --- Input Fields ---
  const fields = [
    { label: 'Amount (BTC)', value: '0.00234', readonly: false },
    { label: 'Price (EUR)', value: '43,250.00', readonly: false },
    { label: 'Total', value: '\u20AC101.21', readonly: true },
  ];

  fields.forEach(({ label, value, readonly }) => {
    const item = document.createElement('ion-item');
    item.setAttribute('lines', 'none');
    item.style.setProperty('--background', 'transparent');
    item.style.setProperty('--padding-start', '0');
    item.style.setProperty('--padding-end', '0');
    item.style.setProperty('--inner-padding-end', '0');

    const input = document.createElement('ion-input');
    input.setAttribute('label', label);
    input.setAttribute('label-placement', 'stacked');
    input.setAttribute('fill', 'outline');
    input.setAttribute('value', value);
    if (readonly) {
      input.setAttribute('readonly', 'true');
    }

    if (isDark) {
      input.style.setProperty('--background', 'var(--bsdex-dark-base)');
      input.style.setProperty('--color', 'var(--bsdex-light-tint)');
      input.style.setProperty('--placeholder-color', 'var(--bsdex-medium-shade)');
      input.style.setProperty('--border-color', 'var(--bsdex-medium-shade)');
      input.style.setProperty('--highlight-color-focused', 'var(--bsdex-primary-tint)');
    }

    item.appendChild(input);
    cardContent.appendChild(item);
  });

  // --- Submit Button ---
  const submitBtn = document.createElement('ion-button');
  submitBtn.className = 'bsdex-trade-submit';
  submitBtn.setAttribute('expand', 'block');
  submitBtn.setAttribute('color', side === 'buy' ? 'success' : 'danger');
  submitBtn.textContent = side === 'buy' ? 'Buy BTC' : 'Sell BTC';
  submitBtn.style.setProperty('--border-radius', 'var(--bsdex-radius-full)');
  submitBtn.style.setProperty('margin-top', '8px');
  submitBtn.setAttribute('strong', 'true');

  cardContent.appendChild(submitBtn);
  card.appendChild(cardContent);
  wrapper.appendChild(card);
  return wrapper;
};

/**
 * Generates code snippet markup for the trade form.
 */
function getCodeSnippet({ side }) {
  const color = side === 'buy' ? 'success' : 'danger';
  const label = side === 'buy' ? 'Buy BTC' : 'Sell BTC';

  return `<ion-card>
  <ion-card-content>
    <!-- Buy / Sell Segment -->
    <ion-segment value="${side}">
      <ion-segment-button value="buy">
        <ion-label>Buy</ion-label>
      </ion-segment-button>
      <ion-segment-button value="sell">
        <ion-label>Sell</ion-label>
      </ion-segment-button>
    </ion-segment>

    <!-- Amount -->
    <ion-item lines="none">
      <ion-input
        label="Amount (BTC)"
        label-placement="stacked"
        fill="outline"
        value="0.00234">
      </ion-input>
    </ion-item>

    <!-- Price -->
    <ion-item lines="none">
      <ion-input
        label="Price (EUR)"
        label-placement="stacked"
        fill="outline"
        value="43,250.00">
      </ion-input>
    </ion-item>

    <!-- Total (readonly) -->
    <ion-item lines="none">
      <ion-input
        label="Total"
        label-placement="stacked"
        fill="outline"
        value="\u20AC101.21"
        readonly="true">
      </ion-input>
    </ion-item>

    <!-- Submit -->
    <ion-button
      expand="block"
      color="${color}"
      strong="true">
      ${label}
    </ion-button>
  </ion-card-content>
</ion-card>`;
}

/**
 * Wraps a rendered trade form and its code snippet together.
 */
function renderStory(args) {
  const container = document.createElement('div');
  container.appendChild(createTrade(args));
  container.appendChild(createCodeSnippet(getCodeSnippet(args), { label: 'Ionic Markup' }));
  return container;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const BuyLight = {
  render: (args) => renderStory(args),
  args: { mode: 'light', side: 'buy' },
};

export const SellLight = {
  render: (args) => renderStory(args),
  args: { mode: 'light', side: 'sell' },
};

export const BuyDark = {
  render: (args) => renderStory(args),
  args: { mode: 'dark', side: 'buy' },
};

export const SellDark = {
  render: (args) => renderStory(args),
  args: { mode: 'dark', side: 'sell' },
};

// ---------------------------------------------------------------------------
// API Reference
// ---------------------------------------------------------------------------

export const API = {
  render: () => {
    const container = document.createElement('div');

    container.appendChild(createApiTable({
      properties: [
        { name: 'value (ion-segment)', type: "'buy' | 'sell'", default: "'buy'", description: 'The currently selected trade side' },
        { name: 'label (ion-input)', type: 'string', default: '-', description: 'Label text displayed above the input (e.g. Amount, Price, Total)' },
        { name: 'label-placement', type: "'stacked' | 'floating'", default: "'stacked'", description: 'Position of the label relative to the input' },
        { name: 'fill (ion-input)', type: "'solid' | 'outline'", default: "'outline'", description: 'The fill style of the input field' },
        { name: 'value (ion-input)', type: 'string', default: '-', description: 'Current value of the input field' },
        { name: 'readonly', type: 'boolean', default: 'false', description: 'If true, the input value cannot be modified (e.g. Total field)' },
        { name: 'expand (ion-button)', type: "'block' | 'full'", default: "'block'", description: 'Set to block for a full-width submit button' },
        { name: 'color (ion-button)', type: "'success' | 'danger'", default: "'success'", description: 'Button color: success for buy, danger for sell' },
        { name: 'strong (ion-button)', type: 'boolean', default: 'true', description: 'If true, uses a bolder font weight for the button text' },
      ],
      cssCustomProperties: [
        { name: '--background (ion-card)', description: 'Background color of the trade card' },
        { name: '--background (ion-input)', description: 'Background color of input fields' },
        { name: '--color (ion-input)', description: 'Text color of input values' },
        { name: '--border-color (ion-input)', description: 'Border color of input fields' },
        { name: '--highlight-color-focused', description: 'Border color when an input is focused' },
        { name: '--border-radius (ion-button)', description: 'Border radius of the submit button' },
        { name: '--background (ion-segment)', description: 'Background color of the segment control' },
      ],
      shadowParts: [
        { name: 'container (ion-segment)', description: 'The outer container of the segment' },
        { name: 'indicator (ion-segment)', description: 'The active segment indicator' },
        { name: 'label (ion-input)', description: 'The label element of each input field' },
        { name: 'input (ion-input)', description: 'The native HTML input element' },
        { name: 'native (ion-button)', description: 'The native button element inside ion-button' },
      ],
    }));

    return container;
  },
};
