import './TooltipIndicator.css';

export default {
  title: 'Components/Tooltip Indicator',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
    price: { control: 'text' },
    date: { control: 'text' },
  },
};

const createTooltip = ({ mode, price, date }) => {
  const container = document.createElement('div');
  container.style.cssText = `padding: 32px; ${mode === 'dark' ? 'background: #191c1d;' : ''}`;

  const tooltip = document.createElement('div');
  tooltip.className = 'bsdex-tooltip';
  tooltip.innerHTML = `
    <div class="bsdex-tooltip__card bsdex-tooltip__card--${mode}">
      <div class="bsdex-tooltip__price">${price}</div>
      <div class="bsdex-tooltip__date">${date}</div>
    </div>
    <div class="bsdex-tooltip__line"></div>
    <div class="bsdex-tooltip__dot"></div>
  `;

  container.appendChild(tooltip);
  return container;
};

export const Light = {
  render: (args) => createTooltip(args),
  args: { mode: 'light', price: '€43,250.00', date: '15 Jan 2024, 14:30' },
};

export const Dark = {
  render: (args) => createTooltip(args),
  args: { mode: 'dark', price: '€43,250.00', date: '15 Jan 2024, 14:30' },
};
