import './Input.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Label text displayed above the input' },
    placeholder: { control: 'text', description: 'Placeholder text when empty' },
    value: { control: 'text', description: 'The value of the input' },
    state: {
      control: 'select',
      options: ['enabled', 'focused', 'filled', 'error', 'disabled'],
      description: 'Visual state of the input',
    },
    mode: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Toggle dark mode background wrapper',
    },
    helperText: { control: 'text', description: 'Helper or error text below the input' },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Creates an ion-input inside an ion-item with BSDEX styling.
 */
const createInput = ({ label, placeholder, value, state, mode, helperText }) => {
  const isDark = mode === 'dark';

  // Outer wrapper for dark mode background & sizing
  const wrapper = document.createElement('div');
  wrapper.style.width = '320px';
  if (isDark) {
    wrapper.style.cssText += 'background: #191c1d; padding: 16px; border-radius: 8px;';
  }

  // ion-item host
  const item = document.createElement('ion-item');
  item.setAttribute('lines', 'none');
  item.style.setProperty('--background', 'transparent');
  item.style.setProperty('--padding-start', '0');
  item.style.setProperty('--padding-end', '0');
  item.style.setProperty('--inner-padding-end', '0');

  // ion-input
  const input = document.createElement('ion-input');
  if (label) input.setAttribute('label', label);
  input.setAttribute('label-placement', 'stacked');
  input.setAttribute('fill', 'outline');
  if (placeholder) input.setAttribute('placeholder', placeholder);
  if (value) input.setAttribute('value', value);

  // Helper text
  if (helperText && state !== 'error') {
    input.setAttribute('helper-text', helperText);
  }

  // State mapping
  switch (state) {
    case 'error':
      input.className = 'ion-invalid ion-touched';
      input.setAttribute('error-text', helperText || 'Invalid input');
      break;
    case 'disabled':
      input.setAttribute('disabled', 'true');
      break;
    case 'focused':
      input.className = 'has-focus';
      break;
    default:
      break;
  }

  // Dark mode token overrides
  if (isDark) {
    input.style.setProperty('--background', 'var(--bsdex-dark-tint)');
    input.style.setProperty('--color', 'var(--bsdex-light-tint)');
    input.style.setProperty('--placeholder-color', 'var(--bsdex-medium-shade)');
    input.style.setProperty('--border-color', 'var(--bsdex-medium-shade)');
    input.style.setProperty('--highlight-color-focused', 'var(--bsdex-primary-tint)');
    input.style.setProperty('--highlight-color-invalid', 'var(--bsdex-danger-tint)');
  }

  item.appendChild(input);
  wrapper.appendChild(item);
  return wrapper;
};

/**
 * Generates a code snippet string for the given input configuration.
 */
function getCodeSnippet({ label, placeholder, value, state, helperText }) {
  const attrs = [];
  if (label) attrs.push(`label="${label}"`);
  attrs.push('label-placement="stacked"');
  attrs.push('fill="outline"');
  if (placeholder) attrs.push(`placeholder="${placeholder}"`);
  if (value) attrs.push(`value="${value}"`);

  switch (state) {
    case 'error':
      attrs.push('class="ion-invalid ion-touched"');
      attrs.push(`error-text="${helperText || 'Invalid input'}"`);
      break;
    case 'disabled':
      attrs.push('disabled="true"');
      break;
    case 'focused':
      attrs.push('class="has-focus"');
      break;
    default:
      break;
  }

  if (helperText && state !== 'error') {
    attrs.push(`helper-text="${helperText}"`);
  }

  const attrStr = attrs.map(a => `\n  ${a}`).join('');

  return `<ion-item lines="none">\n  <ion-input${attrStr}>\n  </ion-input>\n</ion-item>`;
}

/**
 * Wraps a rendered input and its code snippet together.
 */
function renderStory(args) {
  const container = document.createElement('div');
  container.appendChild(createInput(args));
  container.appendChild(createCodeSnippet(getCodeSnippet(args)));
  return container;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default = {
  render: (args) => renderStory(args),
  args: { label: 'Label', placeholder: 'Placeholder', value: '', state: 'enabled', mode: 'light', helperText: '' },
};

export const Focused = {
  render: (args) => renderStory(args),
  args: { label: 'Label', placeholder: 'Placeholder', value: '', state: 'focused', mode: 'light', helperText: '' },
};

export const Filled = {
  render: (args) => renderStory(args),
  args: { label: 'Label', placeholder: '', value: '0.00234 BTC', state: 'enabled', mode: 'light', helperText: '' },
};

export const Error = {
  render: (args) => renderStory(args),
  args: { label: 'Label', placeholder: '', value: 'Invalid', state: 'error', mode: 'light', helperText: 'This field has an error' },
};

export const Disabled = {
  render: (args) => renderStory(args),
  args: { label: 'Label', placeholder: 'Placeholder', value: '', state: 'disabled', mode: 'light', helperText: '' },
};

export const DarkEnabled = {
  render: (args) => renderStory(args),
  args: { label: 'Label', placeholder: 'Placeholder', value: '', state: 'enabled', mode: 'dark', helperText: '' },
};

export const AllStatesLight = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 24px; flex-wrap: wrap;';
    [
      { label: 'Enabled', state: 'enabled', placeholder: 'Placeholder', value: '', helperText: '' },
      { label: 'Focused', state: 'focused', placeholder: 'Placeholder', value: '', helperText: '' },
      { label: 'Filled', state: 'enabled', placeholder: '', value: '0.00234 BTC', helperText: '' },
      { label: 'Error', state: 'error', placeholder: '', value: 'Invalid', helperText: 'Error message' },
      { label: 'Disabled', state: 'disabled', placeholder: 'Placeholder', value: '', helperText: '' },
    ].forEach(s => container.appendChild(createInput({ ...s, mode: 'light' })));
    return container;
  },
};

export const AllStatesDark = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 24px; flex-wrap: wrap; background: #191c1d; padding: 24px; border-radius: 8px;';
    [
      { label: 'Enabled', state: 'enabled', placeholder: 'Placeholder', value: '', helperText: '' },
      { label: 'Focused', state: 'focused', placeholder: 'Placeholder', value: '', helperText: '' },
      { label: 'Filled', state: 'enabled', placeholder: '', value: '0.00234 BTC', helperText: '' },
      { label: 'Error', state: 'error', placeholder: '', value: 'Invalid', helperText: 'Error message' },
      { label: 'Disabled', state: 'disabled', placeholder: 'Placeholder', value: '', helperText: '' },
    ].forEach(s => container.appendChild(createInput({ ...s, mode: 'dark' })));
    return container;
  },
};

// ---------------------------------------------------------------------------
// API Reference
// ---------------------------------------------------------------------------

export const API = {
  render: () => {
    const container = document.createElement('div');

    container.appendChild(createApiTable({
      properties: [
        { name: 'label', type: 'string', default: '-', description: 'Label text displayed above or beside the input' },
        { name: 'placeholder', type: 'string', default: '-', description: 'Instructional text that shows before the input has a value' },
        { name: 'value', type: 'string', default: "''", description: 'The value of the input' },
        { name: 'type', type: 'string', default: "'text'", description: 'The type of control to display (text, password, email, number, etc.)' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the user cannot interact with the input' },
        { name: 'readonly', type: 'boolean', default: 'false', description: 'If true, the user cannot modify the value' },
        { name: 'clearInput', type: 'boolean', default: 'false', description: 'If true, a clear icon will appear when the input has a value' },
        { name: 'helperText', type: 'string', default: '-', description: 'Helper text displayed below the input' },
        { name: 'errorText', type: 'string', default: '-', description: 'Error text displayed below the input when it has the ion-invalid class' },
        { name: 'fill', type: "'solid' | 'outline'", default: '-', description: 'The fill style of the input. BSDEX default is outline' },
        { name: 'labelPlacement', type: "'stacked' | 'floating' | 'start' | 'end'", default: "'start'", description: 'Where to place the label relative to the input. BSDEX default is stacked' },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background color of the input' },
        { name: '--color', description: 'Text color of the input value' },
        { name: '--placeholder-color', description: 'Color of the placeholder text' },
        { name: '--padding-start', description: 'Left padding of the input content' },
        { name: '--padding-end', description: 'Right padding of the input content' },
        { name: '--border-color', description: 'Color of the input border' },
        { name: '--highlight-color-focused', description: 'Border/highlight color when the input is focused' },
        { name: '--highlight-color-invalid', description: 'Border/highlight color when the input is invalid' },
      ],
      shadowParts: [
        { name: 'label', description: 'The label element' },
        { name: 'input', description: 'The native HTML input element' },
        { name: 'helper-text', description: 'The helper text element below the input' },
        { name: 'error-text', description: 'The error text element below the input' },
      ],
    }));

    return container;
  },
};
