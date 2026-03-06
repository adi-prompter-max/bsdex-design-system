import './CryptoAuszahlen.css';

export default {
  title: 'Components/Auszahlen (Withdraw)',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
    currency: { control: 'text' },
    balance: { control: 'text' },
    showInfo: { control: 'boolean' },
    confirmed: { control: 'boolean' },
  },
};

const checkSvg = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const createWithdraw = ({ mode, currency, balance, showInfo, confirmed = false }) => {
  const container = document.createElement('div');
  container.style.cssText = `width: 380px; ${mode === 'dark' ? 'background: #191c1d; padding: 16px;' : 'padding: 16px;'}`;

  const withdraw = document.createElement('div');
  withdraw.className = `bsdex-withdraw bsdex-withdraw--${mode}`;
  withdraw.innerHTML = `
    <div class="bsdex-withdraw__title">Withdraw ${currency}</div>
    <div class="bsdex-withdraw__balance">
      <span class="bsdex-withdraw__balance-label">Available balance</span>
      <span class="bsdex-withdraw__balance-value">${balance} ${currency}</span>
    </div>
    <div class="bsdex-withdraw__field">
      <label class="bsdex-withdraw__field-label">Wallet address</label>
      <input class="bsdex-withdraw__field-input" type="text" placeholder="Enter ${currency} address" />
    </div>
    <div class="bsdex-withdraw__field">
      <label class="bsdex-withdraw__field-label">Amount</label>
      <input class="bsdex-withdraw__field-input" type="text" placeholder="0.00" />
      <button class="bsdex-withdraw__max">Use max</button>
    </div>
    ${showInfo ? `<div class="bsdex-withdraw__info">Network fee: 0.0001 ${currency}. Withdrawals are processed within 30 minutes.</div>` : ''}
    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
      <span style="width:24px;height:24px;border-radius:4px;border:2px solid ${confirmed ? 'var(--bsdex-primary-base)' : 'var(--bsdex-light-shade)'};display:flex;align-items:center;justify-content:center;background:${confirmed ? 'var(--bsdex-primary-base)' : 'transparent'};flex-shrink:0;">
        ${confirmed ? `<span style="color:#fff;">${checkSvg}</span>` : ''}
      </span>
      <span style="font-size:12px;color:var(--bsdex-medium-base);">I confirm this withdrawal address is correct</span>
    </label>
    <button class="bsdex-withdraw__submit" ${!confirmed ? 'style="opacity:0.5;cursor:not-allowed;"' : ''}>Withdraw ${currency}</button>
  `;

  container.appendChild(withdraw);
  return container;
};

export const BTCLight = {
  render: (args) => createWithdraw(args),
  args: { mode: 'light', currency: 'BTC', balance: '0.05234', showInfo: true, confirmed: false },
};

export const BTCLightConfirmed = {
  render: (args) => createWithdraw(args),
  args: { mode: 'light', currency: 'BTC', balance: '0.05234', showInfo: true, confirmed: true },
};

export const BTCDark = {
  render: (args) => createWithdraw(args),
  args: { mode: 'dark', currency: 'BTC', balance: '0.05234', showInfo: true, confirmed: false },
};

export const BTCDarkConfirmed = {
  render: (args) => createWithdraw(args),
  args: { mode: 'dark', currency: 'BTC', balance: '0.05234', showInfo: true, confirmed: true },
};

export const ETHLight = {
  render: (args) => createWithdraw(args),
  args: { mode: 'light', currency: 'ETH', balance: '2.5000', showInfo: false, confirmed: false },
};
