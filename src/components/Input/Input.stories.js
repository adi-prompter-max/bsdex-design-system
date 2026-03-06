import './Input.css';

export default {
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    state: { control: 'select', options: ['enabled', 'focused', 'filled', 'error', 'disabled', 'filled-disabled'] },
    mode: { control: 'select', options: ['light', 'dark'] },
    helperText: { control: 'text' },
  },
};

const createInput = ({ label, placeholder, value, state, mode, helperText }) => {
  const wrapper = document.createElement('div');
  wrapper.className = `bsdex-input-wrapper bsdex-input--${state} bsdex-input--${mode}`;
  wrapper.style.width = '320px';

  wrapper.innerHTML = `
    ${label ? `<label class="bsdex-input__label">${label}</label>` : ''}
    <input class="bsdex-input" type="text" placeholder="${placeholder || ''}" value="${value || ''}" />
    ${helperText ? `<span class="bsdex-input__helper">${helperText}</span>` : ''}
  `;

  return wrapper;
};

export const Default = {
  render: (args) => createInput(args),
  args: { label: 'Label', placeholder: 'Placeholder', value: '', state: 'enabled', mode: 'light', helperText: '' },
};

export const Focused = {
  render: (args) => createInput(args),
  args: { label: 'Label', placeholder: 'Placeholder', value: '', state: 'focused', mode: 'light', helperText: '' },
};

export const Filled = {
  render: (args) => createInput(args),
  args: { label: 'Label', placeholder: '', value: '0.00234 BTC', state: 'filled', mode: 'light', helperText: '' },
};

export const Error = {
  render: (args) => createInput(args),
  args: { label: 'Label', placeholder: '', value: 'Invalid', state: 'error', mode: 'light', helperText: 'This field has an error' },
};

export const Disabled = {
  render: (args) => createInput(args),
  args: { label: 'Label', placeholder: 'Placeholder', value: '', state: 'disabled', mode: 'light', helperText: '' },
};

export const FilledDisabled = {
  render: (args) => createInput(args),
  args: { label: 'Label', placeholder: '', value: '0.00234 BTC', state: 'filled-disabled', mode: 'light', helperText: '' },
};

export const DarkEnabled = {
  render: (args) => createInput(args),
  args: { label: 'Label', placeholder: 'Placeholder', value: '', state: 'enabled', mode: 'dark', helperText: '' },
};

export const DarkFocused = {
  render: (args) => createInput(args),
  args: { label: 'Label', placeholder: 'Placeholder', value: '', state: 'focused', mode: 'dark', helperText: '' },
};

export const DarkFilled = {
  render: (args) => createInput(args),
  args: { label: 'Label', placeholder: '', value: '0.00234 BTC', state: 'filled', mode: 'dark', helperText: '' },
};

export const DarkError = {
  render: (args) => createInput(args),
  args: { label: 'Label', placeholder: '', value: 'Invalid', state: 'error', mode: 'dark', helperText: 'This field has an error' },
};

export const AllStatesLight = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 24px; flex-wrap: wrap;';
    [
      { label: 'Enabled', state: 'enabled', placeholder: 'Placeholder', value: '' },
      { label: 'Focused', state: 'focused', placeholder: 'Placeholder', value: '' },
      { label: 'Filled', state: 'filled', placeholder: '', value: '0.00234 BTC' },
      { label: 'Error', state: 'error', placeholder: '', value: 'Invalid', helperText: 'Error message' },
      { label: 'Disabled', state: 'disabled', placeholder: 'Placeholder', value: '' },
      { label: 'Filled Disabled', state: 'filled-disabled', placeholder: '', value: '0.00234 BTC' },
    ].forEach(s => container.appendChild(createInput({ ...s, mode: 'light' })));
    return container;
  },
};

export const AllStatesDark = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 24px; flex-wrap: wrap; background: #191c1d; padding: 24px; border-radius: 8px;';
    [
      { label: 'Enabled', state: 'enabled', placeholder: 'Placeholder', value: '' },
      { label: 'Focused', state: 'focused', placeholder: 'Placeholder', value: '' },
      { label: 'Filled', state: 'filled', placeholder: '', value: '0.00234 BTC' },
      { label: 'Error', state: 'error', placeholder: '', value: 'Invalid', helperText: 'Error message' },
      { label: 'Disabled', state: 'disabled', placeholder: 'Placeholder', value: '' },
      { label: 'Filled Disabled', state: 'filled-disabled', placeholder: '', value: '0.00234 BTC' },
    ].forEach(s => container.appendChild(createInput({ ...s, mode: 'dark' })));
    return container;
  },
};
