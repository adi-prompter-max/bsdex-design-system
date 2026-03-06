import './CryptoEinzahlen.css';

export default {
  title: 'Components/Einzahlen (Deposit)',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
    currency: { control: 'text' },
    address: { control: 'text' },
    showInfo: { control: 'boolean' },
  },
};

const copyIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" stroke-width="1.5"/><path d="M11 3H4a1 1 0 00-1 1v7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

const createDeposit = ({ mode, currency, address, showInfo }) => {
  const container = document.createElement('div');
  container.style.cssText = `width: 380px; ${mode === 'dark' ? 'background: #191c1d; padding: 16px;' : 'padding: 16px;'}`;

  const deposit = document.createElement('div');
  deposit.className = `bsdex-deposit bsdex-deposit--${mode}`;
  deposit.innerHTML = `
    <div class="bsdex-deposit__title">Deposit ${currency}</div>
    <div class="bsdex-deposit__qr">QR Code</div>
    <div class="bsdex-deposit__address">
      <span>${address}</span>
      <button class="bsdex-deposit__copy">${copyIcon}</button>
    </div>
    ${showInfo ? `<div class="bsdex-deposit__info">Only send ${currency} to this address. Sending other assets may result in permanent loss.</div>` : ''}
  `;

  container.appendChild(deposit);
  return container;
};

export const BTCLight = {
  render: (args) => createDeposit(args),
  args: { mode: 'light', currency: 'BTC', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', showInfo: true },
};

export const BTCDark = {
  render: (args) => createDeposit(args),
  args: { mode: 'dark', currency: 'BTC', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', showInfo: true },
};

export const ETHLight = {
  render: (args) => createDeposit(args),
  args: { mode: 'light', currency: 'ETH', address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', showInfo: false },
};
