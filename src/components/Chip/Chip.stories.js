import './Chip.css';

export default {
  title: 'Components/Chip',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    active: { control: 'boolean' },
  },
};

const createChip = ({ label, active }) => {
  const chip = document.createElement('button');
  chip.className = `bsdex-chip${active ? ' bsdex-chip--active' : ''}`;
  chip.textContent = label;
  return chip;
};

export const Default = {
  render: (args) => createChip(args),
  args: { label: '1H', active: false },
};

export const Active = {
  render: (args) => createChip(args),
  args: { label: '1H', active: true },
};

export const ChipGroup = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 8px;';
    ['1H', '24H', '1W', '1M', '1Y', 'ALL'].forEach((label, i) => {
      container.appendChild(createChip({ label, active: i === 1 }));
    });
    return container;
  },
};
