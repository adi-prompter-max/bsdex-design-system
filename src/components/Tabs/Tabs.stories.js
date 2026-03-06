import './Tabs.css';

export default {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  argTypes: {
    activeIndex: { control: { type: 'number', min: 0, max: 3 } },
    mode: { control: 'select', options: ['light', 'dark'] },
  },
};

const tabIcons = [
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="1.5"/></svg>`,
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5"/></svg>`,
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M2 9h20" stroke="currentColor" stroke-width="1.5"/></svg>`,
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="currentColor" stroke-width="1.5"/></svg>`,
];

const createTabs = ({ activeIndex, mode }) => {
  const labels = ['Invest', 'Wallet', 'Orders', 'Profile'];
  const container = document.createElement('div');
  container.style.cssText = mode === 'dark' ? 'background: #191c1d; padding: 0;' : '';

  const nav = document.createElement('nav');
  nav.className = `bsdex-tabs bsdex-tabs--${mode}`;

  labels.forEach((label, i) => {
    const tab = document.createElement('button');
    tab.className = `bsdex-tabs__item${i === activeIndex ? ' bsdex-tabs__item--active' : ''}`;
    tab.innerHTML = `<span class="bsdex-tabs__icon">${tabIcons[i]}</span><span class="bsdex-tabs__label">${label}</span>`;
    nav.appendChild(tab);
  });

  container.appendChild(nav);
  return container;
};

export const Light = {
  render: (args) => createTabs(args),
  args: { activeIndex: 0, mode: 'light' },
};

export const Dark = {
  render: (args) => createTabs(args),
  args: { activeIndex: 0, mode: 'dark' },
};
