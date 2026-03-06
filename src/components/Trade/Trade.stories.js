import './Trade.css';

export default {
  title: 'Components/Trade',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
    side: { control: 'select', options: ['buy', 'sell'] },
  },
};

const createTrade = ({ mode, side }) => {
  const container = document.createElement('div');
  container.style.cssText = `width: 360px; ${mode === 'dark' ? 'background: #191c1d; padding: 16px;' : 'padding: 16px;'}`;

  const trade = document.createElement('div');
  trade.className = `bsdex-trade bsdex-trade--${mode}`;

  trade.innerHTML = `
    <div class="bsdex-trade__segment">
      <button class="bsdex-trade__segment-btn ${side === 'buy' ? 'bsdex-trade__segment-btn--active-buy' : 'bsdex-trade__segment-btn--inactive'}">Buy</button>
      <button class="bsdex-trade__segment-btn ${side === 'sell' ? 'bsdex-trade__segment-btn--active-sell' : 'bsdex-trade__segment-btn--inactive'}">Sell</button>
    </div>
    <div class="bsdex-trade__field">
      <label class="bsdex-trade__field-label">Amount (BTC)</label>
      <input class="bsdex-trade__field-input" type="text" value="0.00234" />
    </div>
    <div class="bsdex-trade__field">
      <label class="bsdex-trade__field-label">Price (EUR)</label>
      <input class="bsdex-trade__field-input" type="text" value="43,250.00" />
    </div>
    <div class="bsdex-trade__field">
      <label class="bsdex-trade__field-label">Total</label>
      <input class="bsdex-trade__field-input" type="text" value="€101.21" readonly />
    </div>
    <button class="bsdex-trade__submit bsdex-trade__submit--${side}">${side === 'buy' ? 'Buy BTC' : 'Sell BTC'}</button>
  `;

  container.appendChild(trade);
  return container;
};

export const BuyLight = {
  render: (args) => createTrade(args),
  args: { mode: 'light', side: 'buy' },
};

export const SellLight = {
  render: (args) => createTrade(args),
  args: { mode: 'light', side: 'sell' },
};

export const BuyDark = {
  render: (args) => createTrade(args),
  args: { mode: 'dark', side: 'buy' },
};

export const SellDark = {
  render: (args) => createTrade(args),
  args: { mode: 'dark', side: 'sell' },
};
