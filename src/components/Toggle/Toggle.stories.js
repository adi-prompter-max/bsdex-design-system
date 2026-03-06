import './Toggle.css';

export default {
  title: 'Components/Toggle',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

const createToggle = ({ checked, disabled }) => {
  const label = document.createElement('label');
  label.className = `bsdex-toggle${disabled ? ' bsdex-toggle--disabled' : ''}`;

  label.innerHTML = `
    <input type="checkbox" class="bsdex-toggle__input" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} />
    <span class="bsdex-toggle__track">
      <span class="bsdex-toggle__thumb"></span>
    </span>
  `;

  return label;
};

export const Off = {
  render: (args) => createToggle(args),
  args: { checked: false, disabled: false },
};

export const On = {
  render: (args) => createToggle(args),
  args: { checked: true, disabled: false },
};

export const DisabledOff = {
  render: (args) => createToggle(args),
  args: { checked: false, disabled: true },
};

export const DisabledOn = {
  render: (args) => createToggle(args),
  args: { checked: true, disabled: true },
};

export const AllStates = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 24px; align-items: center;';
    [
      { checked: false, disabled: false },
      { checked: true, disabled: false },
      { checked: false, disabled: true },
      { checked: true, disabled: true },
    ].forEach(args => container.appendChild(createToggle(args)));
    return container;
  },
};
