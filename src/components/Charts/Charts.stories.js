import './Charts.css';

export default {
  title: 'Components/Charts',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
    chartType: { control: 'select', options: ['line', 'candlestick'] },
  },
};

const createLineChart = () => {
  const points = [40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 70, 90, 85, 95, 80, 100, 92, 88, 95, 105, 98, 110, 105, 115, 108];
  const max = Math.max(...points);
  const min = Math.min(...points);
  const w = 100;
  const h = 100;
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / (max - min)) * h;
    return `${x},${y}`;
  });
  const polyline = coords.join(' ');
  const areaCoords = `0,${h} ${polyline} ${w},${h}`;
  return `<svg class="bsdex-chart__line-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
    <defs><linearGradient id="grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#6432fa" stop-opacity="0.2"/><stop offset="100%" stop-color="#6432fa" stop-opacity="0"/></linearGradient></defs>
    <polygon points="${areaCoords}" fill="url(#grad)"/>
    <polyline points="${polyline}" fill="none" stroke="#6432fa" stroke-width="1.5"/>
  </svg>`;
};

const createCandlesticks = () => {
  const candles = [];
  for (let i = 0; i < 20; i++) {
    const open = 40 + Math.random() * 60;
    const close = open + (Math.random() - 0.45) * 20;
    const high = Math.max(open, close) + Math.random() * 10;
    const low = Math.min(open, close) - Math.random() * 10;
    candles.push({ open, close, high, low, up: close >= open });
  }
  const maxH = Math.max(...candles.map(c => c.high));
  const minL = Math.min(...candles.map(c => c.low));
  const range = maxH - minL;

  return candles.map(c => {
    const bodyTop = ((maxH - Math.max(c.open, c.close)) / range) * 180;
    const bodyHeight = Math.max(4, (Math.abs(c.close - c.open) / range) * 180);
    const wickTop = ((maxH - c.high) / range) * 180;
    const wickHeight = ((c.high - c.low) / range) * 180;
    return `<div class="bsdex-chart__candle">
      <div class="bsdex-chart__candle-wick" style="height:${wickHeight}px; margin-top:${wickTop}px; position:absolute; top:0;"></div>
      <div class="bsdex-chart__candle-body bsdex-chart__candle-body--${c.up ? 'up' : 'down'}" style="height:${bodyHeight}px; margin-top:${bodyTop}px; position:absolute; top:0; width:60%;"></div>
    </div>`;
  }).join('');
};

const createChart = ({ mode, chartType }) => {
  const container = document.createElement('div');
  container.style.cssText = `width: 480px; ${mode === 'dark' ? 'background: #191c1d; padding: 16px;' : 'padding: 16px;'}`;

  const chart = document.createElement('div');
  chart.className = `bsdex-chart bsdex-chart--${mode}`;

  chart.innerHTML = `
    <div class="bsdex-chart__header">
      <div>
        <div class="bsdex-chart__price">€43,250.00</div>
        <span class="bsdex-chart__change--positive">+2.34% (€990.50)</span>
      </div>
      <div class="bsdex-chart__type-tabs">
        <button class="bsdex-chart__type-tab ${chartType === 'line' ? 'bsdex-chart__type-tab--active' : ''}">Line</button>
        <button class="bsdex-chart__type-tab ${chartType === 'candlestick' ? 'bsdex-chart__type-tab--active' : ''}">Candle</button>
      </div>
    </div>
    <div class="bsdex-chart__area">
      ${chartType === 'line' ? createLineChart() : `<div class="bsdex-chart__candle-container">${createCandlesticks()}</div>`}
    </div>
  `;

  container.appendChild(chart);
  return container;
};

export const LineLight = {
  render: (args) => createChart(args),
  args: { mode: 'light', chartType: 'line' },
};

export const CandlestickLight = {
  render: (args) => createChart(args),
  args: { mode: 'light', chartType: 'candlestick' },
};

export const LineDark = {
  render: (args) => createChart(args),
  args: { mode: 'dark', chartType: 'line' },
};

export const CandlestickDark = {
  render: (args) => createChart(args),
  args: { mode: 'dark', chartType: 'candlestick' },
};
