import './CryptoAuszahlen.css';

export default {
  title: 'Components/Auszahlen (Withdraw)',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
    currency: { control: 'text' },
    balance: { control: 'text' },
    showInfo: { control: 'boolean' },
  },
};

const createWithdraw = ({ mode, currency, balance, showInfo }) => {
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
    <button class="bsdex-withdraw__submit">Withdraw ${currency}</button>
  `;

  container.appendChild(withdraw);
  return container;
};

export const BTCLight = {
  render: (args) => createWithdraw(args),
  args: { mode: 'light', currency: 'BTC', balance: '0.05234', showInfo: true },
};

export const BTCDark = {
  render: (args) => createWithdraw(args),
  args: { mode: 'dark', currency: 'BTC', balance: '0.05234', showInfo: true },
};

export const ETHLight = {
  render: (args) => createWithdraw(args),
  args: { mode: 'light', currency: 'ETH', balance: '2.5000', showInfo: false },
};
