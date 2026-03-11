import './Subnavigation.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Subnavigation',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Toggle dark mode background wrapper',
    },
    activeIndex: {
      control: { type: 'number', min: 0, max: 3 },
      description: 'Index of the currently active segment button',
    },
    items: {
      control: 'object',
      description: 'Array of label strings for segment buttons',
    },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Create an ion-segment element with ion-segment-button children.
 */
function createSubnav({ mode = 'light', activeIndex = 0, items = [] }) {
  const container = document.createElement('div');
  if (mode === 'dark') {
    container.style.cssText = 'padding: 16px; background: #191c1d; border-radius: 8px;';
  } else {
    container.style.cssText = 'padding: 16px;';
  }

  const segment = document.createElement('ion-segment');
  segment.setAttribute('value', items[activeIndex] || items[0] || '');

  // Apply BSDEX styling overrides
  segment.style.setProperty('--background', 'transparent');

  items.forEach((label) => {
    const btn = document.createElement('ion-segment-button');
    btn.setAttribute('value', label);

    const ionLabel = document.createElement('ion-label');
    ionLabel.textContent = label;
    btn.appendChild(ionLabel);

    segment.appendChild(btn);
  });

  container.appendChild(segment);
  return container;
}

/**
 * Build the Ionic markup string for code snippet display.
 */
function buildCodeString({ activeIndex = 0, items = [] }) {
  const activeValue = items[activeIndex] || items[0] || '';
  let code = `<ion-segment value="${activeValue}">`;
  items.forEach((label) => {
    code += `\n  <ion-segment-button value="${label}">`;
    code += `\n    <ion-label>${label}</ion-label>`;
    code += `\n  </ion-segment-button>`;
  });
  code += `\n</ion-segment>`;
  return code;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Light = {
  render: (args) => {
    const container = createSubnav(args);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { mode: 'light', activeIndex: 0, items: ['Overview', 'Orders', 'History'] },
};

export const Dark = {
  render: (args) => {
    const container = createSubnav(args);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { mode: 'dark', activeIndex: 0, items: ['Overview', 'Orders', 'History'] },
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
          name: 'scrollable',
          type: 'boolean',
          default: 'false',
          description: 'If true, the segment buttons will overflow and can be scrolled horizontally.',
        },
        {
          name: 'mode',
          type: "'ios' | 'md'",
          default: 'undefined',
          description: 'The Ionic rendering mode (iOS or Material Design).',
        },
        {
          name: 'color',
          type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger'",
          default: "'primary'",
          description: 'The color to use from the application color palette.',
        },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background of the segment.' },
      ],
      shadowParts: [
        { name: 'native', description: 'The native element wrapping the segment button content.' },
      ],
    });
  },
};
