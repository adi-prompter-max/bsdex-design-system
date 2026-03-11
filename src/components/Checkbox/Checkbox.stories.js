import './Checkbox.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'The label text for the checkbox' },
    checked: { control: 'boolean', description: 'If true, the checkbox is selected' },
    disabled: { control: 'boolean', description: 'If true, the user cannot interact with the checkbox' },
    indeterminate: { control: 'boolean', description: 'If true, the checkbox displays an indeterminate state' },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'The color to use from the application color palette',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end', 'fixed', 'stacked'],
      description: 'Where to place the label relative to the checkbox',
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
 * Create an ion-checkbox element from the provided args.
 */
function createCheckbox({ label = 'I agree to the terms', checked = false, disabled = false, indeterminate = false, color = 'primary', labelPlacement = 'end', value = '' }) {
  const checkbox = document.createElement('ion-checkbox');
  checkbox.checked = checked;
  checkbox.textContent = label;

  if (disabled) {
    checkbox.disabled = true;
  }
  if (indeterminate) {
    checkbox.indeterminate = true;
  }
  if (color !== 'primary') {
    checkbox.setAttribute('color', color);
  }
  if (labelPlacement !== 'end') {
    checkbox.setAttribute('label-placement', labelPlacement);
  }
  if (value) {
    checkbox.value = value;
  }

  return checkbox;
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
function buildCheckboxCodeString({ label = 'I agree to the terms', checked = false, disabled = false, indeterminate = false, color = 'primary', labelPlacement = 'end' }) {
  const attrs = [];
  if (checked) attrs.push('checked');
  if (disabled) attrs.push('disabled');
  if (indeterminate) attrs.push('indeterminate');
  if (color !== 'primary') attrs.push(`color="${color}"`);
  if (labelPlacement !== 'end') attrs.push(`label-placement="${labelPlacement}"`);

  const attrStr = attrs.length > 0 ? ' ' + attrs.join(' ') : '';
  return `<ion-checkbox${attrStr}>${label}</ion-checkbox>`;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Unchecked = {
  render: (args) => {
    const container = wrapWithMode(createCheckbox(args), args.mode);
    container.appendChild(createCodeSnippet(buildCheckboxCodeString(args)));
    return container;
  },
  args: { label: 'I agree to the terms', checked: false, disabled: false, indeterminate: false, color: 'primary', labelPlacement: 'end', mode: 'light' },
};

export const Checked = {
  render: (args) => {
    const container = wrapWithMode(createCheckbox(args), args.mode);
    container.appendChild(createCodeSnippet(buildCheckboxCodeString(args)));
    return container;
  },
  args: { label: 'I agree to the terms', checked: true, disabled: false, indeterminate: false, color: 'primary', labelPlacement: 'end', mode: 'light' },
};

export const Disabled = {
  render: (args) => {
    const container = wrapWithMode(createCheckbox(args), args.mode);
    container.appendChild(createCodeSnippet(buildCheckboxCodeString(args)));
    return container;
  },
  args: { label: 'Unavailable option', checked: false, disabled: true, indeterminate: false, color: 'primary', labelPlacement: 'end', mode: 'light' },
};

export const DarkUnchecked = {
  render: (args) => {
    const container = wrapWithMode(createCheckbox(args), args.mode);
    container.appendChild(createCodeSnippet(buildCheckboxCodeString(args)));
    return container;
  },
  args: { label: 'I agree to the terms', checked: false, disabled: false, indeterminate: false, color: 'primary', labelPlacement: 'end', mode: 'dark' },
};

export const DarkChecked = {
  render: (args) => {
    const container = wrapWithMode(createCheckbox(args), args.mode);
    container.appendChild(createCodeSnippet(buildCheckboxCodeString(args)));
    return container;
  },
  args: { label: 'I agree to the terms', checked: true, disabled: false, indeterminate: false, color: 'primary', labelPlacement: 'end', mode: 'dark' },
};

export const CheckboxGroup = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';

    const items = [
      { label: 'Email notifications', checked: true },
      { label: 'Push notifications', checked: true },
      { label: 'SMS notifications', checked: false },
    ];

    items.forEach((item) => {
      container.appendChild(createCheckbox({ label: item.label, checked: item.checked }));
    });

    const code = `<ion-checkbox checked>Email notifications</ion-checkbox>
<ion-checkbox checked>Push notifications</ion-checkbox>
<ion-checkbox>SMS notifications</ion-checkbox>`;
    container.appendChild(createCodeSnippet(code));

    return container;
  },
};

// ---------------------------------------------------------------------------
// API Documentation
// ---------------------------------------------------------------------------

export const API = {
  render: () => {
    return createApiTable({
      properties: [
        { name: 'checked', type: 'boolean', default: 'false', description: 'If true, the checkbox is selected.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the user cannot interact with the checkbox.' },
        { name: 'indeterminate', type: 'boolean', default: 'false', description: 'If true, the checkbox will visually appear as indeterminate.' },
        { name: 'color', type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger'", default: "'primary'", description: 'The color to use from the application color palette.' },
        { name: 'labelPlacement', type: "'start' | 'end' | 'fixed' | 'stacked'", default: "'end'", description: 'Where to place the label relative to the checkbox.' },
        { name: 'value', type: 'string', default: "'on'", description: 'The value of the checkbox, used when submitting a form.' },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background of the checkbox when unchecked.' },
        { name: '--background-checked', description: 'Background of the checkbox when checked.' },
        { name: '--border-color', description: 'Border color of the checkbox when unchecked.' },
        { name: '--border-color-checked', description: 'Border color of the checkbox when checked.' },
        { name: '--checkmark-color', description: 'Color of the checkmark inside the checkbox.' },
        { name: '--checkbox-background-checked', description: 'Background of the checkbox icon when checked.' },
        { name: '--size', description: 'Size of the checkbox icon.' },
      ],
      shadowParts: [
        { name: 'container', description: 'The container for the checkbox mark.' },
        { name: 'mark', description: 'The checkmark used to indicate the checked state.' },
        { name: 'label', description: 'The label text associated with the checkbox.' },
      ],
    });
  },
};
