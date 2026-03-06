import './Divider.css';

export default {
  title: 'Components/Divider',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
  },
};

const createDivider = ({ mode }) => {
  const container = document.createElement('div');
  container.style.cssText = `padding: 24px; width: 100%; ${mode === 'dark' ? 'background: #191c1d;' : ''}`;
  const divider = document.createElement('hr');
  divider.className = `bsdex-divider bsdex-divider--${mode}`;
  container.appendChild(divider);
  return container;
};

export const Light = {
  render: (args) => createDivider(args),
  args: { mode: 'light' },
};

export const Dark = {
  render: (args) => createDivider(args),
  args: { mode: 'dark' },
};
