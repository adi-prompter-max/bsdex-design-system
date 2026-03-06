import './Input.css';

export default {
  title: 'Components/Input',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    state: { control: 'select', options: ['enabled', 'focused', 'filled', 'error'] },
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

export const AllStates = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 24px; flex-wrap: wrap;';
    [
      { label: 'Enabled', state: 'enabled', placeholder: 'Placeholder', value: '' },
      { label: 'Focused', state: 'focused', placeholder: 'Placeholder', value: '' },
      { label: 'Filled', state: 'filled', placeholder: '', value: '0.00234 BTC' },
      { label: 'Error', state: 'error', placeholder: '', value: 'Invalid', helperText: 'Error message' },
    ].forEach(s => container.appendChild(createInput({ ...s, mode: 'light' })));
    return container;
  },
};
