import './Segment.css';

export default {
  title: 'Components/Segment',
  tags: ['autodocs'],
  argTypes: {
    activeIndex: { control: { type: 'number', min: 0, max: 1 } },
    mode: { control: 'select', options: ['light', 'dark'] },
    labels: { control: 'object' },
  },
};

const createSegment = ({ activeIndex, mode, labels }) => {
  const container = document.createElement('div');
  container.style.cssText = mode === 'dark' ? 'padding: 16px; background: #191c1d;' : 'padding: 16px;';

  const segment = document.createElement('div');
  segment.className = `bsdex-segment bsdex-segment--${mode}`;

  labels.forEach((label, i) => {
    const btn = document.createElement('button');
    btn.className = `bsdex-segment__item${i === activeIndex ? ' bsdex-segment__item--active' : ''}`;
    btn.textContent = label;
    segment.appendChild(btn);
  });

  container.appendChild(segment);
  return container;
};

export const Light = {
  render: (args) => createSegment(args),
  args: { activeIndex: 0, mode: 'light', labels: ['Buy', 'Sell'] },
};

export const Dark = {
  render: (args) => createSegment(args),
  args: { activeIndex: 0, mode: 'dark', labels: ['Buy', 'Sell'] },
};
