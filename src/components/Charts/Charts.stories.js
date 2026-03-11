import './Charts.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Charts',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Toggle dark mode background wrapper',
    },
    chartType: {
      control: 'select',
      options: ['line', 'candlestick'],
      description: 'The type of chart to render',
    },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

/**
 * Apply BSDEX design-token overrides to the ion-card.
 */
function applyCardTokens(card, isDark) {
  card.style.setProperty('--background', isDark ? 'var(--bsdex-dark-base)' : 'var(--bsdex-surface)');
  card.style.setProperty('--color', isDark ? '#ffffff' : 'var(--bsdex-dark-base)');
  card.style.setProperty('border-radius', 'var(--bsdex-radius-md)');
  card.style.setProperty('box-shadow', 'none');
  card.style.setProperty('margin', '0');
}

/**
 * Apply BSDEX tokens to the ion-segment for chart type selector.
 */
function applySegmentTokens(segment, isDark) {
  segment.style.setProperty('--background', isDark ? 'var(--bsdex-dark-shade)' : 'var(--bsdex-light-base)');
  segment.style.width = 'auto';
}

/**
 * Build the chart using Ionic web components.
 */
const createChart = ({ mode = 'light', chartType = 'line' }) => {
  const isDark = mode === 'dark';

  const wrapper = document.createElement('div');
  wrapper.style.cssText = `width: 480px; padding: 16px; ${isDark ? 'background: #191c1d;' : ''}`;

  // -- ion-card --
  const card = document.createElement('ion-card');
  applyCardTokens(card, isDark);

  // -- ion-card-header --
  const cardHeader = document.createElement('ion-card-header');
  cardHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; padding: 16px;';

  // Price block
  const priceBlock = document.createElement('div');

  const cardTitle = document.createElement('ion-card-title');
  cardTitle.textContent = '\u20AC43,250.00';
  cardTitle.className = 'bsdex-chart__price';
  cardTitle.style.setProperty('--color', isDark ? '#ffffff' : 'var(--bsdex-dark-base)');
  cardTitle.style.fontSize = 'var(--bsdex-h2-size)';
  cardTitle.style.fontWeight = '600';

  const cardSubtitle = document.createElement('ion-card-subtitle');
  cardSubtitle.textContent = '+2.34% (\u20AC990.50)';
  cardSubtitle.className = 'bsdex-chart__change--positive';
  cardSubtitle.style.setProperty('--color', 'var(--bsdex-success-base)');
  cardSubtitle.style.fontSize = 'var(--bsdex-body-small-size)';
  cardSubtitle.style.fontWeight = '600';

  priceBlock.appendChild(cardTitle);
  priceBlock.appendChild(cardSubtitle);

  // -- ion-segment (chart type selector) --
  const segment = document.createElement('ion-segment');
  segment.value = chartType;
  applySegmentTokens(segment, isDark);

  const lineBtn = document.createElement('ion-segment-button');
  lineBtn.value = 'line';
  lineBtn.innerHTML = '<ion-label>Line</ion-label>';

  const candleBtn = document.createElement('ion-segment-button');
  candleBtn.value = 'candlestick';
  candleBtn.innerHTML = '<ion-label>Candle</ion-label>';

  segment.appendChild(lineBtn);
  segment.appendChild(candleBtn);

  cardHeader.appendChild(priceBlock);
  cardHeader.appendChild(segment);

  // -- ion-card-content (chart area) --
  const cardContent = document.createElement('ion-card-content');
  cardContent.style.padding = '0 16px 16px';

  const chartArea = document.createElement('div');
  chartArea.className = 'bsdex-chart__area';

  if (chartType === 'line') {
    chartArea.innerHTML = createLineChart();
  } else {
    chartArea.innerHTML = `<div class="bsdex-chart__candle-container">${createCandlesticks()}</div>`;
  }

  cardContent.appendChild(chartArea);

  // Wire up segment change to swap chart type
  segment.addEventListener('ionChange', (ev) => {
    const newType = ev.detail.value;
    if (newType === 'line') {
      chartArea.innerHTML = createLineChart();
    } else {
      chartArea.innerHTML = `<div class="bsdex-chart__candle-container">${createCandlesticks()}</div>`;
    }
  });

  // Assemble card
  card.appendChild(cardHeader);
  card.appendChild(cardContent);
  wrapper.appendChild(card);

  return wrapper;
};

// ---------------------------------------------------------------------------
// Code snippet text
// ---------------------------------------------------------------------------

const lineChartSnippet = `<ion-card>
  <ion-card-header>
    <ion-card-title>\u20AC43,250.00</ion-card-title>
    <ion-card-subtitle>+2.34% (\u20AC990.50)</ion-card-subtitle>
    <ion-segment value="line">
      <ion-segment-button value="line">
        <ion-label>Line</ion-label>
      </ion-segment-button>
      <ion-segment-button value="candlestick">
        <ion-label>Candle</ion-label>
      </ion-segment-button>
    </ion-segment>
  </ion-card-header>
  <ion-card-content>
    <svg class="bsdex-chart__line-svg" viewBox="0 0 100 100">
      <!-- line chart data -->
    </svg>
  </ion-card-content>
</ion-card>`;

const candlestickSnippet = `<ion-card>
  <ion-card-header>
    <ion-card-title>\u20AC43,250.00</ion-card-title>
    <ion-card-subtitle>+2.34% (\u20AC990.50)</ion-card-subtitle>
    <ion-segment value="candlestick">
      <ion-segment-button value="line">
        <ion-label>Line</ion-label>
      </ion-segment-button>
      <ion-segment-button value="candlestick">
        <ion-label>Candle</ion-label>
      </ion-segment-button>
    </ion-segment>
  </ion-card-header>
  <ion-card-content>
    <div class="bsdex-chart__candle-container">
      <!-- candlestick divs -->
    </div>
  </ion-card-content>
</ion-card>`;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const LineLight = {
  render: (args) => {
    const container = document.createElement('div');
    container.appendChild(createChart(args));
    container.appendChild(createCodeSnippet(lineChartSnippet, { label: 'Ionic Line Chart' }));
    return container;
  },
  args: { mode: 'light', chartType: 'line' },
};

export const CandlestickLight = {
  render: (args) => {
    const container = document.createElement('div');
    container.appendChild(createChart(args));
    container.appendChild(createCodeSnippet(candlestickSnippet, { label: 'Ionic Candlestick Chart' }));
    return container;
  },
  args: { mode: 'light', chartType: 'candlestick' },
};

export const LineDark = {
  render: (args) => {
    const container = document.createElement('div');
    container.appendChild(createChart(args));
    container.appendChild(createCodeSnippet(lineChartSnippet, { label: 'Ionic Line Chart (Dark)' }));
    return container;
  },
  args: { mode: 'dark', chartType: 'line' },
};

export const CandlestickDark = {
  render: (args) => {
    const container = document.createElement('div');
    container.appendChild(createChart(args));
    container.appendChild(createCodeSnippet(candlestickSnippet, { label: 'Ionic Candlestick Chart (Dark)' }));
    return container;
  },
  args: { mode: 'dark', chartType: 'candlestick' },
};

// ---------------------------------------------------------------------------
// API Reference
// ---------------------------------------------------------------------------

export const API = {
  render: () => {
    const container = document.createElement('div');
    container.style.padding = '24px';

    const heading = document.createElement('h2');
    heading.textContent = 'Charts API';
    heading.style.cssText = 'font-family: var(--bsdex-font-family); font-size: 20px; font-weight: 600; margin: 0 0 16px;';
    container.appendChild(heading);

    const desc = document.createElement('p');
    desc.textContent = 'Charts use ion-card as the container, ion-segment for chart type selection, and retain the original SVG/div rendering for chart visuals.';
    desc.style.cssText = 'font-family: var(--bsdex-font-family); font-size: 14px; color: #4a5568; margin: 0 0 24px;';
    container.appendChild(desc);

    container.appendChild(createApiTable({
      properties: [
        { name: 'mode', type: "'light' | 'dark'", default: "'light'", description: 'Color mode for the chart card' },
        { name: 'chartType', type: "'line' | 'candlestick'", default: "'line'", description: 'The type of chart visualization to render' },
      ],
      cssCustomProperties: [
        { name: '--bsdex-surface', description: 'Card background in light mode' },
        { name: '--bsdex-dark-base', description: 'Card background in dark mode' },
        { name: '--bsdex-primary-base', description: 'Line chart stroke and gradient color' },
        { name: '--bsdex-success-base', description: 'Color for positive change text and up candles' },
        { name: '--bsdex-danger-base', description: 'Color for negative change text and down candles' },
        { name: '--bsdex-medium-base', description: 'Candlestick wick color' },
        { name: '--bsdex-h2-size', description: 'Font size for the price title' },
        { name: '--bsdex-body-small-size', description: 'Font size for the change subtitle' },
        { name: '--bsdex-radius-md', description: 'Border radius for the card' },
      ],
      shadowParts: [
        { name: 'ion-card', description: 'The outer card container wrapping the chart' },
        { name: 'ion-card-header', description: 'Header area containing price and chart type selector' },
        { name: 'ion-card-content', description: 'Content area containing the SVG or candlestick rendering' },
        { name: 'ion-segment', description: 'Segmented control for switching between Line and Candle views' },
      ],
    }));

    container.appendChild(createCodeSnippet(lineChartSnippet, { label: 'Basic Usage' }));

    return container;
  },
};
