import './OpenOrder.css';

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

const createOpenOrder = ({ mode, pair, orderType, price, amount, date }) => {
  const container = document.createElement('div');
  container.style.cssText = `width: 360px; ${mode === 'dark' ? 'background: #191c1d; padding: 16px;' : 'padding: 16px;'}`;

  const order = document.createElement('div');
  order.className = `bsdex-open-order bsdex-open-order--${mode}`;
  order.innerHTML = `
    <div class="bsdex-open-order__header">
      <span class="bsdex-open-order__pair">${pair}</span>
      <span class="bsdex-open-order__type bsdex-open-order__type--${orderType}">${orderType.toUpperCase()}</span>
    </div>
    <div class="bsdex-open-order__row">
      <span class="bsdex-open-order__label">Price</span>
      <span class="bsdex-open-order__value">${price}</span>
    </div>
    <div class="bsdex-open-order__row">
      <span class="bsdex-open-order__label">Amount</span>
      <span class="bsdex-open-order__value">${amount}</span>
    </div>
    <div class="bsdex-open-order__row">
      <span class="bsdex-open-order__label">Date</span>
      <span class="bsdex-open-order__value">${date}</span>
    </div>
    <button class="bsdex-open-order__cancel">Cancel order</button>
  `;

  container.appendChild(order);
  return container;
};

export const BuyLight = {
  render: (args) => createOpenOrder(args),
  args: { mode: 'light', pair: 'BTC/EUR', orderType: 'buy', price: '€43,250.00', amount: '0.00234 BTC', date: '2024-01-15 14:30' },
};

export const SellLight = {
  render: (args) => createOpenOrder(args),
  args: { mode: 'light', pair: 'ETH/EUR', orderType: 'sell', price: '€2,150.00', amount: '1.5 ETH', date: '2024-01-15 14:30' },
};

export const BuyDark = {
  render: (args) => createOpenOrder(args),
  args: { mode: 'dark', pair: 'BTC/EUR', orderType: 'buy', price: '€43,250.00', amount: '0.00234 BTC', date: '2024-01-15 14:30' },
};
