import './CryptoItem.css';

export default {
  title: 'Components/Crypto Item',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
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
