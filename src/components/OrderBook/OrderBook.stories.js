import './OrderBook.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Order Book',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Toggle dark mode background wrapper',
    },
  },
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const asks = [
  { price: '43,280.50', amount: '0.0523', total: '2,263.45' },
  { price: '43,275.00', amount: '0.1200', total: '5,193.00' },
  { price: '43,270.00', amount: '0.0890', total: '3,851.03' },
  { price: '43,265.50', amount: '0.2100', total: '9,085.76' },
  { price: '43,260.00', amount: '0.0340', total: '1,470.84' },
];

const bids = [
  { price: '43,245.00', amount: '0.1500', total: '6,486.75' },
  { price: '43,240.00', amount: '0.0780', total: '3,372.72' },
  { price: '43,235.50', amount: '0.2300', total: '9,944.17' },
  { price: '43,230.00', amount: '0.0450', total: '1,945.35' },
  { price: '43,225.00', amount: '0.1100', total: '4,754.75' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createOrderRow({ price, amount, total, type, depth }) {
  const item = document.createElement('ion-item');
  item.setAttribute('lines', 'none');
  item.classList.add(`orderbook-row`, `orderbook-row--${type}`);
  item.style.setProperty('--depth', `${depth}%`);

  item.innerHTML = `
    <ion-grid>
      <ion-row>
        <ion-col size="4"><ion-label color="${type === 'ask' ? 'danger' : 'success'}">${price}</ion-label></ion-col>
        <ion-col size="4"><ion-label>${amount}</ion-label></ion-col>
        <ion-col size="4" class="ion-text-end"><ion-label>${total}</ion-label></ion-col>
      </ion-row>
    </ion-grid>
  `;

  return item;
}

function createOrderBook({ mode = 'light' }) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = `width: 400px; ${mode === 'dark' ? 'background: #191c1d; padding: 16px; border-radius: 8px;' : 'padding: 16px;'}`;

  const card = document.createElement('ion-card');
  card.classList.add('orderbook-card', `orderbook-card--${mode}`);
  card.style.margin = '0';

  const cardContent = document.createElement('ion-card-content');
  cardContent.style.padding = '0';

  const list = document.createElement('ion-list');
  list.style.padding = '0';

  // Header row
  const header = document.createElement('ion-item');
  header.setAttribute('lines', 'none');
  header.classList.add('orderbook-header');
  header.innerHTML = `
    <ion-grid>
      <ion-row>
        <ion-col size="4"><ion-label class="orderbook-header__label">Price (EUR)</ion-label></ion-col>
        <ion-col size="4"><ion-label class="orderbook-header__label">Amount (BTC)</ion-label></ion-col>
        <ion-col size="4" class="ion-text-end"><ion-label class="orderbook-header__label">Total</ion-label></ion-col>
      </ion-row>
    </ion-grid>
  `;
  list.appendChild(header);

  // Ask rows (reversed so highest ask is at top)
  [...asks].reverse().forEach((row, i) => {
    const depth = 20 + (i * 15);
    list.appendChild(createOrderRow({ ...row, type: 'ask', depth }));
  });

  // Spread row
  const spread = document.createElement('ion-item');
  spread.setAttribute('lines', 'none');
  spread.classList.add('orderbook-spread');
  spread.innerHTML = `
    <ion-label class="ion-text-center orderbook-spread__label">Spread: \u20AC15.00 (0.03%)</ion-label>
  `;
  list.appendChild(spread);

  // Bid rows
  bids.forEach((row, i) => {
    const depth = 40 - (i * 8);
    list.appendChild(createOrderRow({ ...row, type: 'bid', depth }));
  });

  cardContent.appendChild(list);
  card.appendChild(cardContent);
  wrapper.appendChild(card);
  return wrapper;
}

function buildCodeString({ mode = 'light' }) {
  const askRows = [...asks].reverse().map((row, i) => {
    const depth = 20 + (i * 15);
    return `  <ion-item lines="none" class="orderbook-row orderbook-row--ask" style="--depth: ${depth}%">
    <ion-grid>
      <ion-row>
        <ion-col size="4"><ion-label color="danger">${row.price}</ion-label></ion-col>
        <ion-col size="4"><ion-label>${row.amount}</ion-label></ion-col>
        <ion-col size="4" class="ion-text-end"><ion-label>${row.total}</ion-label></ion-col>
      </ion-row>
    </ion-grid>
  </ion-item>`;
  }).join('\n');

  const bidRows = bids.map((row, i) => {
    const depth = 40 - (i * 8);
    return `  <ion-item lines="none" class="orderbook-row orderbook-row--bid" style="--depth: ${depth}%">
    <ion-grid>
      <ion-row>
        <ion-col size="4"><ion-label color="success">${row.price}</ion-label></ion-col>
        <ion-col size="4"><ion-label>${row.amount}</ion-label></ion-col>
        <ion-col size="4" class="ion-text-end"><ion-label>${row.total}</ion-label></ion-col>
      </ion-row>
    </ion-grid>
  </ion-item>`;
  }).join('\n');

  return `<ion-card class="orderbook-card orderbook-card--${mode}">
  <ion-card-content style="padding: 0">
    <ion-list style="padding: 0">
      <!-- Header -->
      <ion-item lines="none" class="orderbook-header">
        <ion-grid>
          <ion-row>
            <ion-col size="4"><ion-label class="orderbook-header__label">Price (EUR)</ion-label></ion-col>
            <ion-col size="4"><ion-label class="orderbook-header__label">Amount (BTC)</ion-label></ion-col>
            <ion-col size="4" class="ion-text-end"><ion-label class="orderbook-header__label">Total</ion-label></ion-col>
          </ion-row>
        </ion-grid>
      </ion-item>

      <!-- Ask rows -->
${askRows}

      <!-- Spread -->
      <ion-item lines="none" class="orderbook-spread">
        <ion-label class="ion-text-center orderbook-spread__label">Spread: \u20AC15.00 (0.03%)</ion-label>
      </ion-item>

      <!-- Bid rows -->
${bidRows}
    </ion-list>
  </ion-card-content>
</ion-card>`;
}

// ---------------------------------------------------------------------------
// Default args
// ---------------------------------------------------------------------------

const defaultArgs = {
  mode: 'light',
};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Light = {
  render: (args) => {
    const container = document.createElement('div');
    container.appendChild(createOrderBook(args));
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs, mode: 'light' },
};

export const Dark = {
  render: (args) => {
    const container = document.createElement('div');
    container.appendChild(createOrderBook(args));
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs, mode: 'dark' },
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
          type: "'light' | 'dark'",
          default: "'light'",
          description: 'Visual mode for the order book (light or dark theme).',
        },
        {
          name: '--depth',
          type: 'CSS custom property',
          default: '-',
          description:
            'Set on each ion-item row to control the width of the depth visualization background. Value is a percentage (e.g. "40%").',
        },
      ],
      cssCustomProperties: [
        {
          name: '--depth',
          description:
            'Controls the percentage width of the colored depth bar behind each row. Applied via inline style on each ion-item.',
        },
        {
          name: '--orderbook-ask-bg',
          description: 'Background color for ask (sell) depth bars. Default: rgba(234, 6, 88, 0.08).',
        },
        {
          name: '--orderbook-bid-bg',
          description: 'Background color for bid (buy) depth bars. Default: rgba(40, 150, 70, 0.08).',
        },
        {
          name: '--orderbook-header-color',
          description: 'Text color for header labels.',
        },
        {
          name: '--orderbook-spread-border',
          description: 'Border color for the spread separator row.',
        },
      ],
    });
  },
};
