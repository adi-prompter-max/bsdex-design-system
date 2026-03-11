import './OpenOrder.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Open Order',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
    pair: { control: 'text' },
    orderType: { control: 'select', options: ['buy', 'sell'] },
    price: { control: 'text' },
    amount: { control: 'text' },
    date: { control: 'text' },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Create an ion-card based Open Order component.
 */
function createOpenOrder({ mode = 'light', pair, orderType, price, amount, date }) {
  const isDark = mode === 'dark';
  const isBuy = orderType === 'buy';

  const container = document.createElement('div');
  container.style.cssText = `width: 360px; ${isDark ? 'background: #191c1d; padding: 16px; border-radius: 8px;' : 'padding: 16px;'}`;

  // ion-card
  const card = document.createElement('ion-card');
  card.style.setProperty('--background', isDark ? 'var(--bsdex-dark-tint)' : 'var(--bsdex-surface, #ffffff)');
  card.style.setProperty('margin', '0');
  if (isDark) {
    card.style.setProperty('box-shadow', 'none');
    card.style.setProperty('--border-color', 'var(--bsdex-dark-tint)');
  }

  // Card header with title + badge
  const cardHeader = document.createElement('ion-card-header');
  cardHeader.style.cssText = 'display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 16px;';

  const cardTitle = document.createElement('ion-card-title');
  cardTitle.textContent = pair;
  cardTitle.style.cssText = `font-size: var(--bsdex-body-default-size, 16px); font-weight: 600; color: ${isDark ? '#ffffff' : 'var(--bsdex-dark-base)'};`;

  const badge = document.createElement('ion-badge');
  badge.setAttribute('color', isBuy ? 'success' : 'danger');
  badge.textContent = orderType.toUpperCase();
  badge.style.cssText = 'font-size: var(--bsdex-body-small-size, 12px); font-weight: 600; border-radius: var(--bsdex-radius-full, 999px); padding: 2px 8px;';

  cardHeader.appendChild(cardTitle);
  cardHeader.appendChild(badge);
  card.appendChild(cardHeader);

  // Card content: info rows using ion-item
  const cardContent = document.createElement('ion-card-content');
  cardContent.style.setProperty('padding', '0');

  const list = document.createElement('ion-list');
  list.style.setProperty('--background', 'transparent');
  list.style.setProperty('background', 'transparent');
  list.style.setProperty('padding', '0');

  const rows = [
    { label: 'Price', value: price },
    { label: 'Amount', value: amount },
    { label: 'Date', value: date },
  ];

  rows.forEach(row => {
    const item = document.createElement('ion-item');
    item.setAttribute('lines', 'full');
    item.style.setProperty('--background', 'transparent');
    item.style.setProperty('--padding-start', '16px');
    item.style.setProperty('--inner-padding-end', '16px');
    item.style.setProperty('--min-height', '40px');

    const label = document.createElement('ion-label');
    label.textContent = row.label;
    label.style.cssText = 'font-size: var(--bsdex-body-small-size, 13px); color: var(--bsdex-medium-base);';

    const note = document.createElement('ion-note');
    note.setAttribute('slot', 'end');
    note.textContent = row.value;
    note.style.cssText = `font-size: var(--bsdex-body-small-size, 13px); font-weight: 600; color: ${isDark ? '#ffffff' : 'var(--bsdex-dark-base)'};`;

    item.appendChild(label);
    item.appendChild(note);
    list.appendChild(item);
  });

  cardContent.appendChild(list);
  card.appendChild(cardContent);

  // Cancel button
  const cancelBtn = document.createElement('ion-button');
  cancelBtn.setAttribute('fill', 'clear');
  cancelBtn.setAttribute('color', 'danger');
  cancelBtn.setAttribute('expand', 'block');
  cancelBtn.textContent = 'Cancel order';
  cancelBtn.style.setProperty('--padding-start', '16px');
  cancelBtn.style.setProperty('--padding-end', '16px');
  cancelBtn.style.setProperty('margin', '8px 16px 16px 16px');
  cancelBtn.style.setProperty('font-size', 'var(--bsdex-body-small-size, 13px)');
  cancelBtn.style.setProperty('font-weight', '600');
  cancelBtn.style.setProperty('text-align', 'left');

  card.appendChild(cancelBtn);
  container.appendChild(card);
  return container;
}

/**
 * Build the Ionic markup string for code snippet display.
 */
function buildCodeString({ pair, orderType, price, amount, date }) {
  const isBuy = orderType === 'buy';
  return `<ion-card>
  <ion-card-header>
    <ion-card-title>${pair}</ion-card-title>
    <ion-badge color="${isBuy ? 'success' : 'danger'}">${orderType.toUpperCase()}</ion-badge>
  </ion-card-header>

  <ion-card-content>
    <ion-list>
      <ion-item lines="full">
        <ion-label>Price</ion-label>
        <ion-note slot="end">${price}</ion-note>
      </ion-item>
      <ion-item lines="full">
        <ion-label>Amount</ion-label>
        <ion-note slot="end">${amount}</ion-note>
      </ion-item>
      <ion-item lines="full">
        <ion-label>Date</ion-label>
        <ion-note slot="end">${date}</ion-note>
      </ion-item>
    </ion-list>
  </ion-card-content>

  <ion-button fill="clear" color="danger" expand="block">
    Cancel order
  </ion-button>
</ion-card>`;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const BuyLight = {
  render: (args) => {
    const container = createOpenOrder(args);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { mode: 'light', pair: 'BTC/EUR', orderType: 'buy', price: '\u20ac43,250.00', amount: '0.00234 BTC', date: '2024-01-15 14:30' },
};

export const SellLight = {
  render: (args) => {
    const container = createOpenOrder(args);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { mode: 'light', pair: 'ETH/EUR', orderType: 'sell', price: '\u20ac2,150.00', amount: '1.5 ETH', date: '2024-01-15 14:30' },
};

export const BuyDark = {
  render: (args) => {
    const container = createOpenOrder(args);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { mode: 'dark', pair: 'BTC/EUR', orderType: 'buy', price: '\u20ac43,250.00', amount: '0.00234 BTC', date: '2024-01-15 14:30' },
};

// ---------------------------------------------------------------------------
// API Documentation
// ---------------------------------------------------------------------------

export const API = {
  render: () => {
    return createApiTable({
      properties: [
        {
          name: 'ion-card',
          type: 'component',
          default: '-',
          description: 'Container card wrapping the entire open order.',
        },
        {
          name: 'ion-card-header',
          type: 'component',
          default: '-',
          description: 'Header section containing the trading pair and order type badge.',
        },
        {
          name: 'ion-card-title',
          type: 'component',
          default: '-',
          description: 'Displays the trading pair (e.g. BTC/EUR).',
        },
        {
          name: 'ion-badge',
          type: 'component',
          default: '-',
          description: 'Shows the order type (BUY/SELL) with color="success" or color="danger".',
        },
        {
          name: 'ion-item + ion-note',
          type: 'component',
          default: '-',
          description: 'Each info row uses ion-item with ion-label for the key and ion-note (slot="end") for the value.',
        },
        {
          name: 'ion-button [cancel]',
          type: 'component',
          default: '-',
          description: 'Cancel button using fill="clear" color="danger" expand="block".',
        },
        {
          name: 'color (ion-badge)',
          type: "'success' | 'danger'",
          default: '-',
          description: 'Badge color: success for buy orders, danger for sell orders.',
        },
        {
          name: 'fill (ion-button)',
          type: "'clear'",
          default: "'clear'",
          description: 'The cancel button uses clear fill for a text-only appearance.',
        },
        {
          name: 'expand (ion-button)',
          type: "'block'",
          default: "'block'",
          description: 'The cancel button expands to full width of the card.',
        },
      ],
      cssCustomProperties: [
        { name: '--background (ion-card)', description: 'Background of the order card container.' },
        { name: '--background (ion-item)', description: 'Background of each info row.' },
        { name: '--min-height (ion-item)', description: 'Minimum height of each info row.' },
        { name: '--padding-start', description: 'Start padding inside ion-item rows.' },
        { name: '--inner-padding-end', description: 'End padding inside the ion-item inner wrapper.' },
      ],
    });
  },
};
