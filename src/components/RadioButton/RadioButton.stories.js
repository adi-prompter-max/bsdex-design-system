import './RadioButton.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Radio Button',
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: 'The value of the radio button' },
    disabled: { control: 'boolean', description: 'If true, the user cannot interact with the radio' },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'The color to use from the application color palette',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'fixed', 'stacked'],
      description: 'Where to place the label relative to the radio',
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

/**
 * Create a single ion-radio inside an ion-radio-group wrapped in an ion-item.
 */
function createRadio({ label = 'Option', value = 'option', disabled = false, color = 'primary', labelPlacement = 'end', checked = false }) {
  const group = document.createElement('ion-radio-group');
  if (checked) {
    group.value = value;
  }

  const item = document.createElement('ion-item');
  const radio = document.createElement('ion-radio');
  radio.value = value;
  radio.textContent = label;

  if (disabled) {
    radio.disabled = true;
  }
  if (color !== 'primary') {
    radio.setAttribute('color', color);
  }
  if (labelPlacement !== 'end') {
    radio.setAttribute('label-placement', labelPlacement);
  }

  item.appendChild(radio);
  group.appendChild(item);
  return group;
}

/**
 * Wrap element in an optional dark-mode container.
 */
function wrapWithMode(el, mode) {
  const container = document.createElement('div');
  if (mode === 'dark') {
    container.style.cssText = 'background: #191c1d; padding: 24px; border-radius: 8px;';
  }
  container.appendChild(el);
  return container;
}

/**
 * Build the Ionic markup string for code snippet display.
 */
function buildRadioCodeString({ label = 'Option', value = 'option', disabled = false, checked = false, color = 'primary', labelPlacement = 'end' }) {
  const radioAttrs = [`value="${value}"`];
  if (disabled) radioAttrs.push('disabled');
  if (color !== 'primary') radioAttrs.push(`color="${color}"`);
  if (labelPlacement !== 'end') radioAttrs.push(`label-placement="${labelPlacement}"`);
  const radioAttrStr = radioAttrs.join(' ');

  const groupValueAttr = checked ? ` value="${value}"` : '';

  return `<ion-radio-group${groupValueAttr}>
  <ion-item>
    <ion-radio ${radioAttrStr}>${label}</ion-radio>
  </ion-item>
</ion-radio-group>`;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Unchecked = {
  render: (args) => {
    const container = wrapWithMode(createRadio({ ...args, checked: false }), args.mode);
    container.appendChild(createCodeSnippet(buildRadioCodeString({ ...args, checked: false })));
    return container;
  },
  args: { label: 'Market order', value: 'market', disabled: false, color: 'primary', labelPlacement: 'end', mode: 'light' },
};

export const Checked = {
  render: (args) => {
    const container = wrapWithMode(createRadio({ ...args, checked: true }), args.mode);
    container.appendChild(createCodeSnippet(buildRadioCodeString({ ...args, checked: true })));
    return container;
  },
  args: { label: 'Market order', value: 'market', disabled: false, color: 'primary', labelPlacement: 'end', mode: 'light' },
};

export const Disabled = {
  render: (args) => {
    const container = wrapWithMode(createRadio({ ...args, checked: false }), args.mode);
    container.appendChild(createCodeSnippet(buildRadioCodeString({ ...args, checked: false })));
    return container;
  },
  args: { label: 'Market order', value: 'market', disabled: true, color: 'primary', labelPlacement: 'end', mode: 'light' },
};

export const Dark = {
  render: (args) => {
    const container = wrapWithMode(createRadio({ ...args, checked: true }), args.mode);
    container.appendChild(createCodeSnippet(buildRadioCodeString({ ...args, checked: true })));
    return container;
  },
  args: { label: 'Market order', value: 'market', disabled: false, color: 'primary', labelPlacement: 'end', mode: 'dark' },
};

export const RadioGroup = {
  render: () => {
    const container = document.createElement('div');

    const group = document.createElement('ion-radio-group');
    group.value = 'market';
    group.setAttribute('name', 'order-type');

    ['Market order', 'Limit order', 'Stop order'].forEach((label) => {
      const value = label.toLowerCase().replace(/\s+/g, '-');
      const item = document.createElement('ion-item');
      const radio = document.createElement('ion-radio');
      radio.value = value;
      radio.textContent = label;
      item.appendChild(radio);
      group.appendChild(item);
    });

    container.appendChild(group);

    const code = `<ion-radio-group value="market" name="order-type">
  <ion-item>
    <ion-radio value="market-order">Market order</ion-radio>
  </ion-item>
  <ion-item>
    <ion-radio value="limit-order">Limit order</ion-radio>
  </ion-item>
  <ion-item>
    <ion-radio value="stop-order">Stop order</ion-radio>
  </ion-item>
</ion-radio-group>`;
    container.appendChild(createCodeSnippet(code));

    return container;
  },
};

// ---------------------------------------------------------------------------
// API Documentation
// ---------------------------------------------------------------------------

export const API = {
  render: () => {
    const container = document.createElement('div');

    // ion-radio properties
    container.appendChild(createApiTable({
      properties: [
        { name: 'value', type: 'string', default: 'undefined', description: 'The value of the radio button.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the user cannot interact with the radio.' },
        { name: 'color', type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger'", default: "'primary'", description: 'The color to use from the application color palette.' },
        { name: 'labelPlacement', type: "'start' | 'end' | 'fixed' | 'stacked'", default: "'end'", description: 'Where to place the label relative to the radio.' },
      ],
      cssCustomProperties: [
        { name: '--color', description: 'Color of the radio when unchecked.' },
        { name: '--color-checked', description: 'Color of the radio when checked.' },
        { name: '--border-radius', description: 'Border radius of the outer radio container.' },
        { name: '--inner-border-radius', description: 'Border radius of the inner radio mark.' },
      ],
      shadowParts: [
        { name: 'container', description: 'The container for the radio mark.' },
        { name: 'mark', description: 'The checkmark or dot used to indicate the checked state.' },
      ],
    }));

    // ion-radio-group properties heading
    const heading = document.createElement('h2');
    heading.style.cssText = 'margin-top: 32px; font-size: 18px; font-weight: 600; color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';
    heading.textContent = 'ion-radio-group';
    container.appendChild(heading);

    container.appendChild(createApiTable({
      properties: [
        { name: 'value', type: 'string', default: 'undefined', description: 'The value of the selected radio button in the group.' },
        { name: 'allowEmptySelection', type: 'boolean', default: 'false', description: 'If true, the radios can be deselected.' },
        { name: 'name', type: 'string', default: 'undefined', description: 'The name of the form control, used when submitting a form.' },
      ],
    }));

    return container;
  },
};
