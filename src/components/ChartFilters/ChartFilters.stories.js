import './ChartFilters.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Chart Filters',
  tags: ['autodocs'],
  argTypes: {
    activeFilter: {
      control: 'select',
      options: ['1h', '24h', '1w', '1m', '1y', 'all'],
      description: 'The currently active time-range filter',
    },
    scrollable: {
      control: 'boolean',
      description: 'If true, filter buttons scroll horizontally when they overflow',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the user cannot interact with the filters',
    },
    mode: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Toggle dark mode background wrapper',
    },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const FILTERS = ['1H', '24H', '1W', '1M', '1Y', 'ALL'];

function createChartFilters({ activeFilter = '24h', scrollable = true, disabled = false }) {
  const segment = document.createElement('ion-segment');
  segment.value = activeFilter;
  segment.setAttribute('scrollable', '');
  segment.classList.add('bsdex-chart-filters');

  if (scrollable) {
    segment.setAttribute('scrollable', '');
  }
  if (disabled) {
    segment.setAttribute('disabled', '');
  }

  FILTERS.forEach((label) => {
    const btn = document.createElement('ion-segment-button');
    btn.value = label.toLowerCase();
    btn.innerHTML = `<ion-label>${label}</ion-label>`;
    segment.appendChild(btn);
  });

  return segment;
}

function wrapWithMode(el, mode) {
  const container = document.createElement('div');
  container.style.cssText = mode === 'dark'
    ? 'padding: 24px; background: #191c1d; border-radius: 8px;'
    : 'padding: 24px;';
  container.appendChild(el);
  return container;
}

function buildCodeString({ activeFilter = '24h', scrollable = true, disabled = false }) {
  const attrs = [`value="${activeFilter}"`, 'scrollable'];
  if (disabled) attrs.push('disabled');

  const attrStr = attrs.join(' ');
  const children = FILTERS.map((label) =>
    `  <ion-segment-button value="${label.toLowerCase()}">\n    <ion-label>${label}</ion-label>\n  </ion-segment-button>`
  ).join('\n');

  return `<ion-segment ${attrStr}>\n${children}\n</ion-segment>`;
}

// ---------------------------------------------------------------------------
// Default args
// ---------------------------------------------------------------------------

const defaultArgs = {
  activeFilter: '24h',
  scrollable: true,
  disabled: false,
  mode: 'light',
};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Light = {
  render: (args) => {
    const container = wrapWithMode(createChartFilters(args), 'light');
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs, mode: 'light' },
};

export const Dark = {
  render: (args) => {
    const container = wrapWithMode(createChartFilters(args), 'dark');
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs, mode: 'dark' },
};

export const Disabled = {
  render: (args) => {
    const container = wrapWithMode(createChartFilters(args), args.mode);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs, disabled: true },
};

export const CustomActive = {
  render: (args) => {
    const container = wrapWithMode(createChartFilters(args), args.mode);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs, activeFilter: '1y' },
};

// ---------------------------------------------------------------------------
// API Documentation
// ---------------------------------------------------------------------------

export const API = {
  render: () => {
    return createApiTable({
      properties: [
        {
          name: 'value',
          type: 'string',
          default: "'24h'",
          description: 'The value of the currently selected time-range filter (maps to ion-segment value).',
        },
        {
          name: 'scrollable',
          type: 'boolean',
          default: 'true',
          description: 'If true, filter buttons scroll horizontally when they overflow the container.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'If true, the user cannot interact with any filter button.',
        },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background of the segment filter bar.' },
        { name: '--background-checked', description: 'Background of the active filter button.' },
        { name: '--color', description: 'Text color of inactive filter buttons.' },
        { name: '--color-checked', description: 'Text color of the active filter button.' },
        { name: '--indicator-color', description: 'Color of the indicator under the active filter.' },
      ],
    });
  },
};
