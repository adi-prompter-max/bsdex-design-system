import './OrderBook.css';

export default {
  title: 'Components/Order Book',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
  },
};

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

const createOrderBook = ({ mode }) => {
  const container = document.createElement('div');
  container.style.cssText = `width: 360px; ${mode === 'dark' ? 'background: #191c1d; padding: 16px;' : 'padding: 16px;'}`;

  const book = document.createElement('div');
  book.className = `bsdex-orderbook bsdex-orderbook--${mode}`;

  let html = `<div class="bsdex-orderbook__header"><span>Price (EUR)</span><span>Amount (BTC)</span><span>Total</span></div>`;

  asks.reverse().forEach((row, i) => {
    const width = 20 + (i * 15);
    html += `<div class="bsdex-orderbook__row bsdex-orderbook__row--ask" style="--depth: ${width}%"><span>${row.price}</span><span>${row.amount}</span><span>${row.total}</span></div>`;
  });

  html += `<div class="bsdex-orderbook__spread">Spread: €15.00 (0.03%)</div>`;

  bids.forEach((row, i) => {
    const width = 40 - (i * 8);
    html += `<div class="bsdex-orderbook__row bsdex-orderbook__row--bid" style="--depth: ${width}%"><span>${row.price}</span><span>${row.amount}</span><span>${row.total}</span></div>`;
  });

  book.innerHTML = html;
  container.appendChild(book);
  return container;
};

export const Light = {
  render: (args) => createOrderBook(args),
  args: { mode: 'light' },
};

export const Dark = {
  render: (args) => createOrderBook(args),
  args: { mode: 'dark' },
};
