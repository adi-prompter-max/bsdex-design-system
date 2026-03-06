import './ChartFilters.css';

export default {
  title: 'Components/Chart Filters',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
    activeIndex: { control: { type: 'number', min: 0, max: 5 } },
    filters: { control: 'object' },
  },
};

const createChartFilters = ({ mode, activeIndex, filters }) => {
  const container = document.createElement('div');
  container.style.cssText = mode === 'dark' ? 'padding: 16px; background: #191c1d;' : 'padding: 16px;';

  const bar = document.createElement('div');
  bar.className = `bsdex-chart-filters bsdex-chart-filters--${mode}`;

  filters.forEach((label, i) => {
    const btn = document.createElement('button');
    btn.className = `bsdex-chart-filter${i === activeIndex ? ' bsdex-chart-filter--active' : ''}`;
    btn.textContent = label;
    bar.appendChild(btn);
  });

  container.appendChild(bar);
  return container;
};

export const Light = {
  render: (args) => createChartFilters(args),
  args: { mode: 'light', activeIndex: 1, filters: ['1H', '24H', '1W', '1M', '1Y', 'ALL'] },
};

export const Dark = {
  render: (args) => createChartFilters(args),
  args: { mode: 'dark', activeIndex: 1, filters: ['1H', '24H', '1W', '1M', '1Y', 'ALL'] },
};
