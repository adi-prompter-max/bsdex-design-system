import './Toggle.css';

export default {
  title: 'Components/Toggle',
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    mode: { control: 'select', options: ['light', 'dark'] },
  },
};

const createToggle = ({ checked, disabled, mode = 'light' }) => {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = mode === 'dark' ? 'padding: 12px; background: #191c1d; display: inline-block; border-radius: 8px;' : 'display: inline-block;';

  const label = document.createElement('label');
  label.className = `bsdex-toggle bsdex-toggle--${mode}${disabled ? ' bsdex-toggle--disabled' : ''}`;

  label.innerHTML = `
    <input type="checkbox" class="bsdex-toggle__input" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''} />
    <span class="bsdex-toggle__track">
      <span class="bsdex-toggle__thumb"></span>
    </span>
  `;

  wrapper.appendChild(label);
  return wrapper;
};

export const Off = {
  render: (args) => createToggle(args),
  args: { checked: false, disabled: false, mode: 'light' },
};

export const On = {
  render: (args) => createToggle(args),
  args: { checked: true, disabled: false, mode: 'light' },
};

export const DisabledOff = {
  render: (args) => createToggle(args),
  args: { checked: false, disabled: true, mode: 'light' },
};

export const DisabledOn = {
  render: (args) => createToggle(args),
  args: { checked: true, disabled: true, mode: 'light' },
};

export const DarkOff = {
  render: (args) => createToggle(args),
  args: { checked: false, disabled: false, mode: 'dark' },
};

export const DarkOn = {
  render: (args) => createToggle(args),
  args: { checked: true, disabled: false, mode: 'dark' },
};

export const AllStatesLight = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 24px; align-items: center;';
    [
      { checked: false, disabled: false, mode: 'light' },
      { checked: true, disabled: false, mode: 'light' },
      { checked: false, disabled: true, mode: 'light' },
      { checked: true, disabled: true, mode: 'light' },
    ].forEach(args => container.appendChild(createToggle(args)));
    return container;
  },
};

export const AllStatesDark = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 24px; align-items: center; background: #191c1d; padding: 16px; border-radius: 8px;';
    [
      { checked: false, disabled: false, mode: 'dark' },
      { checked: true, disabled: false, mode: 'dark' },
      { checked: false, disabled: true, mode: 'dark' },
      { checked: true, disabled: true, mode: 'dark' },
    ].forEach(args => container.appendChild(createToggle(args)));
    return container;
  },
};
