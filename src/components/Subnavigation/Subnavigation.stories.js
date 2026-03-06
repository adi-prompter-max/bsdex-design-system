import './Subnavigation.css';

export default {
  title: 'Components/Subnavigation',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
    activeIndex: { control: { type: 'number', min: 0, max: 3 } },
    items: { control: 'object' },
  },
};

const createSubnav = ({ mode, activeIndex, items }) => {
  const container = document.createElement('div');
  container.style.cssText = mode === 'dark' ? 'padding: 16px; background: #191c1d;' : 'padding: 16px;';

  const nav = document.createElement('nav');
  nav.className = `bsdex-subnav bsdex-subnav--${mode}`;

  items.forEach((label, i) => {
    const btn = document.createElement('button');
    btn.className = `bsdex-subnav__item${i === activeIndex ? ' bsdex-subnav__item--active' : ''}`;
    btn.textContent = label;
    nav.appendChild(btn);
  });

  container.appendChild(nav);
  return container;
};

export const Light = {
  render: (args) => createSubnav(args),
  args: { mode: 'light', activeIndex: 0, items: ['Overview', 'Orders', 'History'] },
};

export const Dark = {
  render: (args) => createSubnav(args),
  args: { mode: 'dark', activeIndex: 0, items: ['Overview', 'Orders', 'History'] },
};
