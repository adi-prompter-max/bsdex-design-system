import './Chip.css';

export default {
  title: 'Components/Chip',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    active: { control: 'boolean' },
    mode: { control: 'select', options: ['light', 'dark'] },
  },
};

const createChip = ({ label, active, mode = 'light' }) => {
  const chip = document.createElement('button');
  chip.className = `bsdex-chip${active ? ' bsdex-chip--active' : ''}${mode === 'dark' ? ' bsdex-chip--dark' : ''}`;
  chip.textContent = label;
  return chip;
};

export const Default = {
  render: (args) => createChip(args),
  args: { label: '1H', active: false, mode: 'light' },
};

export const Active = {
  render: (args) => createChip(args),
  args: { label: '1H', active: true, mode: 'light' },
};

export const ChipGroupLight = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 8px;';
    ['1H', '24H', '1W', '1M', '1Y', 'ALL'].forEach((label, i) => {
      container.appendChild(createChip({ label, active: i === 1, mode: 'light' }));
    });
    return container;
  },
};

export const ChipGroupDark = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 8px; background: #191c1d; padding: 16px; border-radius: 8px;';
    ['1H', '24H', '1W', '1M', '1Y', 'ALL'].forEach((label, i) => {
      container.appendChild(createChip({ label, active: i === 1, mode: 'dark' }));
    });
    return container;
  },
};
