import './Segment.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Segment',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'select',
      options: ['buy', 'sell'],
      description: 'The value of the selected segment button',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the user cannot interact with the segment',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'The color to use from the application color palette',
    },
    scrollable: {
      control: 'boolean',
      description: 'If true, the segment buttons can be scrolled horizontally',
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

function createIonSegment({ value = 'buy', disabled = false, color = 'primary', scrollable = false, labels = ['Buy', 'Sell'], mode = 'light' }) {
  const segment = document.createElement('ion-segment');
  segment.value = value;

  if (disabled) {
    segment.setAttribute('disabled', '');
  }
  if (color !== 'primary') {
    segment.setAttribute('color', color);
  }
  if (scrollable) {
    segment.setAttribute('scrollable', '');
  }

  labels.forEach((label) => {
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

function buildCodeString({ value = 'buy', disabled = false, color = 'primary', scrollable = false, labels = ['Buy', 'Sell'] }) {
  const attrs = [`value="${value}"`];
  if (color !== 'primary') attrs.push(`color="${color}"`);
  if (disabled) attrs.push('disabled');
  if (scrollable) attrs.push('scrollable');

  const attrStr = attrs.join(' ');
  const children = labels.map((label) =>
    `  <ion-segment-button value="${label.toLowerCase()}">\n    <ion-label>${label}</ion-label>\n  </ion-segment-button>`
  ).join('\n');

  return `<ion-segment ${attrStr}>\n${children}\n</ion-segment>`;
}

// ---------------------------------------------------------------------------
// Default args
// ---------------------------------------------------------------------------

const defaultArgs = {
  value: 'buy',
  disabled: false,
  color: 'primary',
  scrollable: false,
  mode: 'light',
};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Light = {
  render: (args) => {
    const labels = ['Buy', 'Sell'];
    const container = wrapWithMode(createIonSegment({ ...args, labels }), 'light');
    container.appendChild(createCodeSnippet(buildCodeString({ ...args, labels })));
    return container;
  },
  args: { ...defaultArgs, mode: 'light' },
};

export const Dark = {
  render: (args) => {
    const labels = ['Buy', 'Sell'];
    const container = wrapWithMode(createIonSegment({ ...args, labels }), 'dark');
    container.appendChild(createCodeSnippet(buildCodeString({ ...args, labels })));
    return container;
  },
  args: { ...defaultArgs, mode: 'dark' },
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
          default: 'undefined',
          description: 'The value of the currently selected segment button.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'If true, the user cannot interact with the segment.',
        },
        {
          name: 'color',
          type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger'",
          default: "'primary'",
          description: 'The color to use from the application color palette.',
        },
        {
          name: 'scrollable',
          type: 'boolean',
          default: 'false',
          description: 'If true, the segment buttons can be scrolled horizontally when they overflow.',
        },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background of the segment.' },
        { name: '--background-checked', description: 'Background of the checked segment button.' },
        { name: '--color', description: 'Text color of the segment buttons.' },
        { name: '--color-checked', description: 'Text color of the checked segment button.' },
        { name: '--indicator-color', description: 'Color of the indicator under the selected segment button.' },
      ],
    });
  },
};
