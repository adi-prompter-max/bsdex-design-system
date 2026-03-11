import './CryptoItem.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Crypto Item',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
    type: { control: 'select', options: ['invest', 'transaction'] },
    active: { control: 'boolean' },
    name: { control: 'text' },
    symbol: { control: 'text' },
    price: { control: 'text' },
    change: { control: 'text' },
    iconColor: { control: 'color' },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Create a single ion-item based Crypto Item.
 */
function createCryptoItem({ mode = 'light', name, symbol, price, change, iconColor }) {
  const isDark = mode === 'dark';
  const isPositive = !change.startsWith('-');
  const container = document.createElement('div');
  container.style.cssText = `width: 400px; ${isDark ? 'background: #191c1d; padding: 8px; border-radius: 8px;' : 'padding: 8px;'}`;

  const item = document.createElement('ion-item');
  item.setAttribute('button', '');
  item.setAttribute('lines', 'none');
  item.style.setProperty('--background', isDark ? 'transparent' : 'transparent');
  item.style.setProperty('--background-hover', isDark ? 'var(--bsdex-dark-tint)' : 'var(--bsdex-light-tint)');
  item.style.setProperty('--border-radius', 'var(--bsdex-radius-md, 8px)');
  item.style.setProperty('--padding-start', '12px');
  item.style.setProperty('--inner-padding-end', '12px');

  // Avatar (icon circle)
  const avatar = document.createElement('ion-avatar');
  avatar.setAttribute('slot', 'start');
  avatar.style.cssText = `
    background: ${iconColor};
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-weight: 700;
    font-size: 14px;
  `;
  const avatarText = document.createElement('div');
  avatarText.style.cssText = 'display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;';
  avatarText.textContent = symbol.substring(0, 1).toUpperCase();
  avatar.appendChild(avatarText);

  // Label (name + symbol)
  const label = document.createElement('ion-label');
  const nameEl = document.createElement('h2');
  nameEl.textContent = name;
  nameEl.style.cssText = `font-weight: 600; font-size: var(--bsdex-body-default-size); color: ${isDark ? '#ffffff' : 'var(--bsdex-dark-base)'};`;
  const symbolEl = document.createElement('p');
  symbolEl.textContent = symbol.toUpperCase();
  symbolEl.style.cssText = 'color: var(--bsdex-medium-base);';
  label.appendChild(nameEl);
  label.appendChild(symbolEl);

  // End slot: price + badge
  const endWrapper = document.createElement('div');
  endWrapper.setAttribute('slot', 'end');
  endWrapper.style.cssText = 'display: flex; flex-direction: column; align-items: flex-end; gap: 2px;';

  const priceNote = document.createElement('ion-note');
  priceNote.textContent = price;
  priceNote.style.cssText = `font-size: var(--bsdex-body-default-size); font-weight: 600; color: ${isDark ? '#ffffff' : 'var(--bsdex-dark-base)'};`;

  const badge = document.createElement('ion-badge');
  badge.setAttribute('color', isPositive ? 'success' : 'danger');
  badge.textContent = change;
  badge.style.cssText = 'font-size: var(--bsdex-body-small-size, 12px); font-weight: 600;';

  endWrapper.appendChild(priceNote);
  endWrapper.appendChild(badge);

  item.appendChild(avatar);
  item.appendChild(label);
  item.appendChild(endWrapper);
  container.appendChild(item);
  return container;
}

/**
 * Create a transaction-style crypto item.
 */
function createTransactionItem({ type, symbol, date, amount, status, isPositive, isDark = false }) {
  const container = document.createElement('div');
  container.style.cssText = `width: 400px; ${isDark ? 'background: #191c1d; padding: 8px; border-radius: 8px;' : 'padding: 8px;'}`;

  const item = document.createElement('ion-item');
  item.setAttribute('lines', 'none');
  item.style.setProperty('--background', 'transparent');
  item.style.setProperty('--padding-start', '12px');
  item.style.setProperty('--inner-padding-end', '12px');

  // Avatar (transaction icon)
  const avatar = document.createElement('ion-avatar');
  avatar.setAttribute('slot', 'start');
  avatar.style.cssText = `
    background: ${isPositive ? '#e8f5e9' : '#fce4ec'};
    width: 32px;
    height: 32px;
    border-radius: var(--bsdex-radius-sm, 4px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${isPositive ? '#23843e' : '#ce054d'};
    font-size: 12px;
    font-weight: 700;
  `;
  const avatarText = document.createElement('div');
  avatarText.style.cssText = 'display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;';
  avatarText.textContent = isPositive ? '\u2193' : '\u2191';
  avatar.appendChild(avatarText);

  // Label (type + symbol/date)
  const label = document.createElement('ion-label');
  const nameEl = document.createElement('h2');
  nameEl.textContent = type;
  nameEl.style.cssText = `font-weight: 600; font-size: var(--bsdex-body-default-size); color: ${isDark ? '#ffffff' : 'var(--bsdex-dark-base)'};`;
  const subEl = document.createElement('p');
  subEl.textContent = `${symbol} \u00b7 ${date}`;
  subEl.style.cssText = 'color: var(--bsdex-medium-base);';
  label.appendChild(nameEl);
  label.appendChild(subEl);

  // End slot: amount + status badge
  const endWrapper = document.createElement('div');
  endWrapper.setAttribute('slot', 'end');
  endWrapper.style.cssText = 'display: flex; flex-direction: column; align-items: flex-end; gap: 2px;';

  const amountNote = document.createElement('ion-note');
  amountNote.textContent = amount;
  amountNote.style.cssText = `font-size: var(--bsdex-body-default-size); font-weight: 600; color: var(--bsdex-${isPositive ? 'success' : 'danger'}-base);`;

  const badge = document.createElement('ion-badge');
  badge.setAttribute('color', status === 'completed' ? 'success' : 'warning');
  badge.textContent = status.charAt(0).toUpperCase() + status.slice(1);
  badge.style.cssText = 'font-size: var(--bsdex-body-tiny-size, 10px); font-weight: 600;';

  endWrapper.appendChild(amountNote);
  endWrapper.appendChild(badge);

  item.appendChild(avatar);
  item.appendChild(label);
  item.appendChild(endWrapper);
  container.appendChild(item);
  return container;
}

/**
 * Build the Ionic markup string for invest-type code snippets.
 */
function buildInvestCodeString({ name, symbol, price, change, iconColor }) {
  const isPositive = !change.startsWith('-');
  return `<ion-item button lines="none">
  <ion-avatar slot="start" style="background: ${iconColor}">
    <div>${symbol.substring(0, 1).toUpperCase()}</div>
  </ion-avatar>
  <ion-label>
    <h2>${name}</h2>
    <p>${symbol.toUpperCase()}</p>
  </ion-label>
  <div slot="end">
    <ion-note>${price}</ion-note>
    <ion-badge color="${isPositive ? 'success' : 'danger'}">${change}</ion-badge>
  </div>
</ion-item>`;
}

/**
 * Build the Ionic markup string for transaction-type code snippets.
 */
function buildTransactionCodeString({ type, symbol, date, amount, status, isPositive }) {
  return `<ion-item lines="none">
  <ion-avatar slot="start" style="background: ${isPositive ? '#e8f5e9' : '#fce4ec'}">
    <div>${isPositive ? '\u2193' : '\u2191'}</div>
  </ion-avatar>
  <ion-label>
    <h2>${type}</h2>
    <p>${symbol} \u00b7 ${date}</p>
  </ion-label>
  <div slot="end">
    <ion-note style="color: var(--bsdex-${isPositive ? 'success' : 'danger'}-base)">${amount}</ion-note>
    <ion-badge color="${status === 'completed' ? 'success' : 'warning'}">${status.charAt(0).toUpperCase() + status.slice(1)}</ion-badge>
  </div>
</ion-item>`;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default = {
  render: (args) => {
    const container = createCryptoItem(args);
    container.appendChild(createCodeSnippet(buildInvestCodeString(args)));
    return container;
  },
  args: { mode: 'light', name: 'Bitcoin', symbol: 'BTC', price: '\u20ac43,250.00', change: '+2.34%', iconColor: '#f7931a' },
};

export const Negative = {
  render: (args) => {
    const container = createCryptoItem(args);
    container.appendChild(createCodeSnippet(buildInvestCodeString(args)));
    return container;
  },
  args: { mode: 'light', name: 'Ethereum', symbol: 'ETH', price: '\u20ac2,150.00', change: '-1.12%', iconColor: '#627eea' },
};

export const Dark = {
  render: (args) => {
    const container = createCryptoItem(args);
    container.appendChild(createCodeSnippet(buildInvestCodeString(args)));
    return container;
  },
  args: { mode: 'dark', name: 'Bitcoin', symbol: 'BTC', price: '\u20ac43,250.00', change: '+2.34%', iconColor: '#f7931a' },
};

export const ActiveState = {
  render: (args) => {
    const container = createCryptoItem(args);
    // Highlight the item to show active state
    const item = container.querySelector('ion-item');
    if (item) {
      item.style.setProperty('--background', 'var(--bsdex-light-tint)');
    }
    container.appendChild(createCodeSnippet(buildInvestCodeString(args)));
    return container;
  },
  args: { mode: 'light', name: 'Bitcoin', symbol: 'BTC', price: '\u20ac43,250.00', change: '+2.34%', iconColor: '#f7931a' },
};

export const TransactionDeposit = {
  render: () => {
    const txData = { type: 'Deposit', symbol: 'BTC', date: '15 Jan 2024', amount: '+0.00234 BTC', status: 'completed', isPositive: true };
    const container = createTransactionItem(txData);
    container.appendChild(createCodeSnippet(buildTransactionCodeString(txData)));
    return container;
  },
};

export const TransactionWithdraw = {
  render: () => {
    const txData = { type: 'Withdrawal', symbol: 'ETH', date: '14 Jan 2024', amount: '-1.5 ETH', status: 'pending', isPositive: false };
    const container = createTransactionItem(txData);
    container.appendChild(createCodeSnippet(buildTransactionCodeString(txData)));
    return container;
  },
};

export const TransactionHistory = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'width: 400px; padding: 8px;';

    const txs = [
      { type: 'Deposit', symbol: 'BTC', date: '15 Jan 2024', amount: '+0.00234 BTC', status: 'completed', isPositive: true },
      { type: 'Buy', symbol: 'ETH', date: '14 Jan 2024', amount: '+1.5 ETH', status: 'completed', isPositive: true },
      { type: 'Withdrawal', symbol: 'BTC', date: '13 Jan 2024', amount: '-0.001 BTC', status: 'pending', isPositive: false },
      { type: 'Sell', symbol: 'SOL', date: '12 Jan 2024', amount: '-10 SOL', status: 'completed', isPositive: false },
    ];

    const list = document.createElement('ion-list');
    list.style.setProperty('--background', 'transparent');
    list.style.setProperty('background', 'transparent');

    txs.forEach(tx => {
      const item = document.createElement('ion-item');
      item.setAttribute('lines', 'full');
      item.style.setProperty('--background', 'transparent');
      item.style.setProperty('--padding-start', '12px');
      item.style.setProperty('--inner-padding-end', '12px');

      const avatar = document.createElement('ion-avatar');
      avatar.setAttribute('slot', 'start');
      avatar.style.cssText = `
        background: ${tx.isPositive ? '#e8f5e9' : '#fce4ec'};
        width: 32px; height: 32px;
        border-radius: var(--bsdex-radius-sm, 4px);
        display: flex; align-items: center; justify-content: center;
        color: ${tx.isPositive ? '#23843e' : '#ce054d'}; font-size: 12px; font-weight: 700;
      `;
      const avatarText = document.createElement('div');
      avatarText.style.cssText = 'display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;';
      avatarText.textContent = tx.isPositive ? '\u2193' : '\u2191';
      avatar.appendChild(avatarText);

      const label = document.createElement('ion-label');
      const nameEl = document.createElement('h2');
      nameEl.textContent = tx.type;
      nameEl.style.cssText = 'font-weight: 600; color: var(--bsdex-dark-base);';
      const subEl = document.createElement('p');
      subEl.textContent = `${tx.symbol} \u00b7 ${tx.date}`;
      subEl.style.cssText = 'color: var(--bsdex-medium-base);';
      label.appendChild(nameEl);
      label.appendChild(subEl);

      const endWrapper = document.createElement('div');
      endWrapper.setAttribute('slot', 'end');
      endWrapper.style.cssText = 'display: flex; flex-direction: column; align-items: flex-end; gap: 2px;';

      const amountNote = document.createElement('ion-note');
      amountNote.textContent = tx.amount;
      amountNote.style.cssText = `font-size: var(--bsdex-body-default-size); font-weight: 600; color: var(--bsdex-${tx.isPositive ? 'success' : 'danger'}-base);`;

      const badge = document.createElement('ion-badge');
      badge.setAttribute('color', tx.status === 'completed' ? 'success' : 'warning');
      badge.textContent = tx.status.charAt(0).toUpperCase() + tx.status.slice(1);
      badge.style.cssText = 'font-size: var(--bsdex-body-tiny-size, 10px); font-weight: 600;';

      endWrapper.appendChild(amountNote);
      endWrapper.appendChild(badge);

      item.appendChild(avatar);
      item.appendChild(label);
      item.appendChild(endWrapper);
      list.appendChild(item);
    });

    container.appendChild(list);

    const code = `<ion-list>
${txs.map(tx => buildTransactionCodeString(tx)).join('\n\n')}
</ion-list>`;
    container.appendChild(createCodeSnippet(code));

    return container;
  },
};

export const CryptoList = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'width: 400px; padding: 8px;';

    const cryptos = [
      { name: 'Bitcoin', symbol: 'BTC', price: '\u20ac43,250.00', change: '+2.34%', color: '#f7931a' },
      { name: 'Ethereum', symbol: 'ETH', price: '\u20ac2,150.00', change: '-1.12%', color: '#627eea' },
      { name: 'Solana', symbol: 'SOL', price: '\u20ac98.50', change: '+5.67%', color: '#9945ff' },
      { name: 'Cardano', symbol: 'ADA', price: '\u20ac0.52', change: '+0.89%', color: '#0033ad' },
      { name: 'Ripple', symbol: 'XRP', price: '\u20ac0.61', change: '-0.34%', color: '#00aae4' },
      { name: 'Polkadot', symbol: 'DOT', price: '\u20ac7.25', change: '+3.21%', color: '#e6007a' },
    ];

    const list = document.createElement('ion-list');
    list.style.setProperty('--background', 'transparent');
    list.style.setProperty('background', 'transparent');

    cryptos.forEach(c => {
      const isPositive = !c.change.startsWith('-');

      const item = document.createElement('ion-item');
      item.setAttribute('button', '');
      item.setAttribute('lines', 'full');
      item.style.setProperty('--background', 'transparent');
      item.style.setProperty('--background-hover', 'var(--bsdex-light-tint)');
      item.style.setProperty('--border-radius', 'var(--bsdex-radius-md, 8px)');
      item.style.setProperty('--padding-start', '12px');
      item.style.setProperty('--inner-padding-end', '12px');

      const avatar = document.createElement('ion-avatar');
      avatar.setAttribute('slot', 'start');
      avatar.style.cssText = `
        background: ${c.color};
        width: 40px; height: 40px;
        display: flex; align-items: center; justify-content: center;
        color: #ffffff; font-weight: 700; font-size: 14px;
      `;
      const avatarText = document.createElement('div');
      avatarText.style.cssText = 'display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;';
      avatarText.textContent = c.symbol[0];
      avatar.appendChild(avatarText);

      const label = document.createElement('ion-label');
      const nameEl = document.createElement('h2');
      nameEl.textContent = c.name;
      nameEl.style.cssText = 'font-weight: 600; color: var(--bsdex-dark-base);';
      const symbolEl = document.createElement('p');
      symbolEl.textContent = c.symbol;
      symbolEl.style.cssText = 'color: var(--bsdex-medium-base);';
      label.appendChild(nameEl);
      label.appendChild(symbolEl);

      const endWrapper = document.createElement('div');
      endWrapper.setAttribute('slot', 'end');
      endWrapper.style.cssText = 'display: flex; flex-direction: column; align-items: flex-end; gap: 2px;';

      const priceNote = document.createElement('ion-note');
      priceNote.textContent = c.price;
      priceNote.style.cssText = 'font-size: var(--bsdex-body-default-size); font-weight: 600; color: var(--bsdex-dark-base);';

      const badge = document.createElement('ion-badge');
      badge.setAttribute('color', isPositive ? 'success' : 'danger');
      badge.textContent = c.change;
      badge.style.cssText = 'font-size: var(--bsdex-body-small-size, 12px); font-weight: 600;';

      endWrapper.appendChild(priceNote);
      endWrapper.appendChild(badge);

      item.appendChild(avatar);
      item.appendChild(label);
      item.appendChild(endWrapper);
      list.appendChild(item);
    });

    container.appendChild(list);

    const code = `<ion-list>
${cryptos.map(c => buildInvestCodeString({ name: c.name, symbol: c.symbol, price: c.price, change: c.change, iconColor: c.color })).join('\n\n')}
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
          name: 'ion-item [button]',
          type: 'component',
          default: '-',
          description: 'Clickable row container. Use the button attribute for tap/hover feedback.',
        },
        {
          name: 'ion-avatar (slot="start")',
          type: 'component',
          default: '-',
          description: 'Circular icon showing the crypto symbol initial or transaction arrow.',
        },
        {
          name: 'ion-label',
          type: 'component',
          default: '-',
          description: 'Contains crypto name (<h2>) and symbol or transaction details (<p>).',
        },
        {
          name: 'ion-note (slot="end")',
          type: 'component',
          default: '-',
          description: 'Displays the price or transaction amount aligned to the end.',
        },
        {
          name: 'ion-badge',
          type: 'component',
          default: '-',
          description: 'Shows percentage change (color="success"|"danger") or transaction status (color="success"|"warning").',
        },
        {
          name: 'color (ion-badge)',
          type: "'success' | 'danger' | 'warning'",
          default: '-',
          description: 'Badge color: success for positive changes/completed, danger for negative, warning for pending.',
        },
        {
          name: 'lines',
          type: "'none' | 'full' | 'inset'",
          default: "'none'",
          description: 'Controls the bottom border of the ion-item.',
        },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background of the ion-item row.' },
        { name: '--background-hover', description: 'Background of the ion-item on hover.' },
        { name: '--border-radius', description: 'Border radius of the ion-item.' },
        { name: '--padding-start', description: 'Start padding inside the ion-item.' },
        { name: '--inner-padding-end', description: 'End padding inside the ion-item inner wrapper.' },
      ],
    });
  },
};
