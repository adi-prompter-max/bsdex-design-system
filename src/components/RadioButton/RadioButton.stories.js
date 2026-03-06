import './RadioButton.css';

export default {
  title: 'Components/Radio Button',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    mode: { control: 'select', options: ['light', 'dark'] },
  },
};

const createRadio = ({ label, checked, disabled, mode }) => {
  const el = document.createElement('label');
  el.className = `bsdex-radio bsdex-radio--${mode}${disabled ? ' bsdex-radio--disabled' : ''}`;
  el.innerHTML = `
    <input type="radio" class="bsdex-radio__input" name="demo" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} />
    <span class="bsdex-radio__circle"><span class="bsdex-radio__dot"></span></span>
    <span class="bsdex-radio__label--${mode}">${label}</span>
  `;
  return el;
};

export const Unchecked = {
  render: (args) => createRadio(args),
  args: { label: 'Option', checked: false, disabled: false, mode: 'light' },
};

export const Checked = {
  render: (args) => createRadio(args),
  args: { label: 'Option', checked: true, disabled: false, mode: 'light' },
};

export const Disabled = {
  render: (args) => createRadio(args),
  args: { label: 'Option', checked: false, disabled: true, mode: 'light' },
};

export const Dark = {
  render: (args) => createRadio(args),
  args: { label: 'Option', checked: true, disabled: false, mode: 'dark' },
};

export const RadioGroup = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 12px;';
    ['Market order', 'Limit order', 'Stop order'].forEach((label, i) => {
      container.appendChild(createRadio({ label, checked: i === 0, disabled: false, mode: 'light' }));
    });
    return container;
  },
};
