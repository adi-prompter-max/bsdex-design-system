import './CryptoItem.css';

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

const createCryptoItem = ({ mode, name, symbol, price, change, iconColor }) => {
  const isPositive = !change.startsWith('-');
  const container = document.createElement('div');
  container.style.cssText = `width: 400px; ${mode === 'dark' ? 'background: #191c1d; padding: 8px;' : 'padding: 8px;'}`;

  const item = document.createElement('div');
  item.className = `bsdex-crypto-item bsdex-crypto-item--${mode}`;
  item.innerHTML = `
    <div class="bsdex-crypto-item__icon" style="background: ${iconColor}">${symbol.substring(0, 1).toUpperCase()}</div>
    <div class="bsdex-crypto-item__info">
      <span class="bsdex-crypto-item__name">${name}</span>
      <span class="bsdex-crypto-item__symbol">${symbol.toUpperCase()}</span>
    </div>
    <div class="bsdex-crypto-item__price-info">
      <span class="bsdex-crypto-item__price">${price}</span>
      <span class="bsdex-crypto-item__change bsdex-crypto-item__change--${isPositive ? 'positive' : 'negative'}">${change}</span>
    </div>
  `;

  container.appendChild(item);
  return container;
};

export const Default = {
  render: (args) => createCryptoItem(args),
  args: { mode: 'light', name: 'Bitcoin', symbol: 'BTC', price: '€43,250.00', change: '+2.34%', iconColor: '#f7931a' },
};

export const Negative = {
  render: (args) => createCryptoItem(args),
  args: { mode: 'light', name: 'Ethereum', symbol: 'ETH', price: '€2,150.00', change: '-1.12%', iconColor: '#627eea' },
};

export const Dark = {
  render: (args) => createCryptoItem(args),
  args: { mode: 'dark', name: 'Bitcoin', symbol: 'BTC', price: '€43,250.00', change: '+2.34%', iconColor: '#f7931a' },
};

export const ActiveState = {
  render: (args) => createCryptoItem(args),
  args: { mode: 'light', name: 'Bitcoin', symbol: 'BTC', price: '€43,250.00', change: '+2.34%', iconColor: '#f7931a' },
};

export const TransactionDeposit = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'width: 400px; padding: 8px;';
    const item = document.createElement('div');
    item.className = 'bsdex-crypto-item bsdex-crypto-item--light bsdex-crypto-item--transaction';
    item.innerHTML = `
      <div class="bsdex-crypto-item__icon" style="background: #e8f5e9; color: #23843e;">↓</div>
      <div class="bsdex-crypto-item__info">
        <span class="bsdex-crypto-item__name">Deposit</span>
        <span class="bsdex-crypto-item__tx-type">BTC · 15 Jan 2024</span>
      </div>
      <div class="bsdex-crypto-item__price-info">
        <span class="bsdex-crypto-item__price" style="color: var(--bsdex-success-base);">+0.00234 BTC</span>
        <span class="bsdex-crypto-item__tx-status bsdex-crypto-item__tx-status--completed">Completed</span>
      </div>
    `;
    container.appendChild(item);
    return container;
  },
};

export const TransactionWithdraw = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'width: 400px; padding: 8px;';
    const item = document.createElement('div');
    item.className = 'bsdex-crypto-item bsdex-crypto-item--light bsdex-crypto-item--transaction';
    item.innerHTML = `
      <div class="bsdex-crypto-item__icon" style="background: #fce4ec; color: #ce054d;">↑</div>
      <div class="bsdex-crypto-item__info">
        <span class="bsdex-crypto-item__name">Withdrawal</span>
        <span class="bsdex-crypto-item__tx-type">ETH · 14 Jan 2024</span>
      </div>
      <div class="bsdex-crypto-item__price-info">
        <span class="bsdex-crypto-item__price" style="color: var(--bsdex-danger-base);">-1.5 ETH</span>
        <span class="bsdex-crypto-item__tx-status bsdex-crypto-item__tx-status--pending">Pending</span>
      </div>
    `;
    container.appendChild(item);
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
    txs.forEach(tx => {
      const item = document.createElement('div');
      item.className = 'bsdex-crypto-item bsdex-crypto-item--light bsdex-crypto-item--transaction';
      item.innerHTML = `
        <div class="bsdex-crypto-item__icon" style="background: ${tx.isPositive ? '#e8f5e9; color: #23843e' : '#fce4ec; color: #ce054d'}">${tx.isPositive ? '↓' : '↑'}</div>
        <div class="bsdex-crypto-item__info">
          <span class="bsdex-crypto-item__name">${tx.type}</span>
          <span class="bsdex-crypto-item__tx-type">${tx.symbol} · ${tx.date}</span>
        </div>
        <div class="bsdex-crypto-item__price-info">
          <span class="bsdex-crypto-item__price" style="color: var(--bsdex-${tx.isPositive ? 'success' : 'danger'}-base);">${tx.amount}</span>
          <span class="bsdex-crypto-item__tx-status bsdex-crypto-item__tx-status--${tx.status}">${tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}</span>
        </div>
      `;
      container.appendChild(item);
    });
    return container;
  },
};

export const CryptoList = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'width: 400px; padding: 8px;';
    const cryptos = [
      { name: 'Bitcoin', symbol: 'BTC', price: '€43,250.00', change: '+2.34%', color: '#f7931a' },
      { name: 'Ethereum', symbol: 'ETH', price: '€2,150.00', change: '-1.12%', color: '#627eea' },
      { name: 'Solana', symbol: 'SOL', price: '€98.50', change: '+5.67%', color: '#9945ff' },
      { name: 'Cardano', symbol: 'ADA', price: '€0.52', change: '+0.89%', color: '#0033ad' },
      { name: 'Ripple', symbol: 'XRP', price: '€0.61', change: '-0.34%', color: '#00aae4' },
      { name: 'Polkadot', symbol: 'DOT', price: '€7.25', change: '+3.21%', color: '#e6007a' },
    ];
    cryptos.forEach(c => {
      const isPositive = !c.change.startsWith('-');
      const item = document.createElement('div');
      item.className = 'bsdex-crypto-item bsdex-crypto-item--light';
      item.innerHTML = `
        <div class="bsdex-crypto-item__icon" style="background: ${c.color}">${c.symbol[0]}</div>
        <div class="bsdex-crypto-item__info">
          <span class="bsdex-crypto-item__name">${c.name}</span>
          <span class="bsdex-crypto-item__symbol">${c.symbol}</span>
        </div>
        <div class="bsdex-crypto-item__price-info">
          <span class="bsdex-crypto-item__price">${c.price}</span>
          <span class="bsdex-crypto-item__change bsdex-crypto-item__change--${isPositive ? 'positive' : 'negative'}">${c.change}</span>
        </div>
      `;
      container.appendChild(item);
    });
    return container;
  },
};
