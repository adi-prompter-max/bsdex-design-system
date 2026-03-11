import './Toggle.css';
import { createCodeSnippet } from '../../helpers/code-snippet.js';
import { createApiTable } from '../../helpers/api-table.js';

export default {
  title: 'Components/Toggle',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    mode: { control: 'select', options: ['light', 'dark'] },
  },
};

const createToggle = ({ checked = false, disabled = false, mode = 'light' }) => {
  const wrapper = document.createElement('div');
  if (mode === 'dark') {
    wrapper.style.cssText = 'padding: 12px; background: #191c1d; display: inline-block; border-radius: 8px;';
  } else {
    wrapper.style.cssText = 'display: inline-block;';
  }

  const toggle = document.createElement('ion-toggle');
  toggle.checked = checked;
  toggle.disabled = disabled;
  toggle.setAttribute('color', 'primary');

  wrapper.appendChild(toggle);
  return wrapper;
};

const getCodeSnippet = ({ checked, disabled }) => {
  const attrs = [];
  if (checked) attrs.push('checked');
  if (disabled) attrs.push('disabled');
  const attrStr = attrs.length ? ' ' + attrs.join(' ') : '';
  return `<ion-toggle color="primary"${attrStr}></ion-toggle>`;
};

const createStory = (args) => {
  const container = document.createElement('div');
  container.appendChild(createToggle(args));
  container.appendChild(createCodeSnippet(getCodeSnippet(args)));
  return container;
};

export const Off = {
  render: (args) => createStory(args),
  args: { checked: false, disabled: false, mode: 'light' },
};

export const On = {
  render: (args) => createStory(args),
  args: { checked: true, disabled: false, mode: 'light' },
};

export const DisabledOff = {
  render: (args) => createStory(args),
  args: { checked: false, disabled: true, mode: 'light' },
};

export const DisabledOn = {
  render: (args) => createStory(args),
  args: { checked: true, disabled: true, mode: 'light' },
};

export const DarkOff = {
  render: (args) => createStory(args),
  args: { checked: false, disabled: false, mode: 'dark' },
};

export const DarkOn = {
  render: (args) => createStory(args),
  args: { checked: true, disabled: false, mode: 'dark' },
};

export const AllStatesLight = {
  render: () => {
    const container = document.createElement('div');
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; gap: 24px; align-items: center;';
    [
      { checked: false, disabled: false, mode: 'light' },
      { checked: true, disabled: false, mode: 'light' },
      { checked: false, disabled: true, mode: 'light' },
      { checked: true, disabled: true, mode: 'light' },
    ].forEach(args => row.appendChild(createToggle(args)));
    container.appendChild(row);
    container.appendChild(createCodeSnippet(
`<ion-toggle color="primary"></ion-toggle>
<ion-toggle color="primary" checked></ion-toggle>
<ion-toggle color="primary" disabled></ion-toggle>
<ion-toggle color="primary" checked disabled></ion-toggle>`
    ));
    return container;
  },
};

export const AllStatesDark = {
  render: () => {
    const container = document.createElement('div');
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; gap: 24px; align-items: center; background: #191c1d; padding: 16px; border-radius: 8px;';
    [
      { checked: false, disabled: false, mode: 'dark' },
      { checked: true, disabled: false, mode: 'dark' },
      { checked: false, disabled: true, mode: 'dark' },
      { checked: true, disabled: true, mode: 'dark' },
    ].forEach(args => row.appendChild(createToggle(args)));
    container.appendChild(row);
    container.appendChild(createCodeSnippet(
`<ion-toggle color="primary"></ion-toggle>
<ion-toggle color="primary" checked></ion-toggle>
<ion-toggle color="primary" disabled></ion-toggle>
<ion-toggle color="primary" checked disabled></ion-toggle>`
    ));
    return container;
  },
};

export const API = {
  render: () => createApiTable({
    properties: [
      { name: 'checked', type: 'boolean', default: 'false', description: 'If true, the toggle is selected.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the user cannot interact with the toggle.' },
      { name: 'color', type: 'string', default: '-', description: 'The color to use from your application\'s color palette (e.g. "primary", "secondary").' },
      { name: 'name', type: 'string', default: '-', description: 'The name of the control, which is submitted with the form data.' },
      { name: 'value', type: 'string', default: 'on', description: 'The value of the toggle when checked.' },
      { name: 'enableOnOffLabels', type: 'boolean', default: 'false', description: 'Enables on/off accessibility labels for the toggle.' },
    ],
    cssCustomProperties: [
      { name: '--background', description: 'Background of the toggle track when unchecked.' },
      { name: '--background-checked', description: 'Background of the toggle track when checked.' },
      { name: '--handle-background', description: 'Background of the toggle handle when unchecked.' },
      { name: '--handle-background-checked', description: 'Background of the toggle handle when checked.' },
      { name: '--handle-width', description: 'Width of the toggle handle.' },
      { name: '--handle-height', description: 'Height of the toggle handle.' },
      { name: '--handle-spacing', description: 'Spacing around the toggle handle.' },
      { name: '--track-background', description: 'Background of the toggle track when unchecked.' },
      { name: '--track-background-checked', description: 'Background of the toggle track when checked.' },
    ],
    shadowParts: [
      { name: 'track', description: 'The background track of the toggle.' },
      { name: 'handle', description: 'The toggle handle (knob) that slides.' },
      { name: 'label', description: 'The label text associated with the toggle.' },
    ],
  }),
};
