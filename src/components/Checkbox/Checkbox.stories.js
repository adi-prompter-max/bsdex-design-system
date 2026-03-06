import './Checkbox.css';

export default {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    mode: { control: 'select', options: ['light', 'dark'] },
  },
};

const checkSvg = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const createCheckbox = ({ label, checked, disabled, mode }) => {
  const el = document.createElement('label');
  el.className = `bsdex-checkbox bsdex-checkbox--${mode}${disabled ? ' bsdex-checkbox--disabled' : ''}`;
  el.innerHTML = `
    <input type="checkbox" class="bsdex-checkbox__input" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} />
    <span class="bsdex-checkbox__box"><span class="bsdex-checkbox__check">${checkSvg}</span></span>
    <span class="bsdex-checkbox__label--${mode}">${label}</span>
  `;
  return el;
};

export const Unchecked = {
  render: (args) => createCheckbox(args),
  args: { label: 'I agree to the terms', checked: false, disabled: false, mode: 'light' },
};

export const Checked = {
  render: (args) => createCheckbox(args),
  args: { label: 'I agree to the terms', checked: true, disabled: false, mode: 'light' },
};

export const Disabled = {
  render: (args) => createCheckbox(args),
  args: { label: 'Unavailable option', checked: false, disabled: true, mode: 'light' },
};

export const DarkUnchecked = {
  render: (args) => createCheckbox(args),
  args: { label: 'I agree to the terms', checked: false, disabled: false, mode: 'dark' },
};

export const DarkChecked = {
  render: (args) => createCheckbox(args),
  args: { label: 'I agree to the terms', checked: true, disabled: false, mode: 'dark' },
};

export const CheckboxGroup = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';
    [
      { label: 'Email notifications', checked: true },
      { label: 'Push notifications', checked: true },
      { label: 'SMS notifications', checked: false },
    ].forEach(item => {
      container.appendChild(createCheckbox({ ...item, disabled: false, mode: 'light' }));
    });
    return container;
  },
};
