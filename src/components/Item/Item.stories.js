import './Item.css';

export default {
  title: 'Components/Item',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
    type: { control: 'select', options: ['double', 'single'] },
    startLabel: { control: 'text' },
    endLabel: { control: 'text' },
    showStartIcon: { control: 'boolean' },
    showEndIcon: { control: 'boolean' },
  },
};

const chevronIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const infoIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/><path d="M12 11v5M12 8h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`;

const createItem = ({ mode, type, startLabel, endLabel, showStartIcon, showEndIcon }) => {
  const container = document.createElement('div');
  container.style.cssText = `padding: 16px; width: 400px; ${mode === 'dark' ? 'background: #191c1d;' : 'background: #ffffff;'}`;

  const item = document.createElement('div');
  item.className = `bsdex-item bsdex-item--${mode} bsdex-item--${type}`;

  item.innerHTML = `
    <div class="bsdex-item__start">
      ${showStartIcon ? `<span class="bsdex-item__icon">${infoIcon}</span>` : ''}
      <span class="bsdex-item__label bsdex-item__label--start">${startLabel}</span>
    </div>
    <div class="bsdex-item__end">
      <span class="bsdex-item__label bsdex-item__label--end">${endLabel}</span>
      ${showEndIcon ? `<span class="bsdex-item__icon">${chevronIcon}</span>` : ''}
    </div>
  `;

  container.appendChild(item);
  return container;
};

export const LightDouble = {
  render: (args) => createItem(args),
  args: { mode: 'light', type: 'double', startLabel: 'Label start', endLabel: 'Label end', showStartIcon: false, showEndIcon: true },
};

export const DarkDouble = {
  render: (args) => createItem(args),
  args: { mode: 'dark', type: 'double', startLabel: 'Label start', endLabel: 'Label end', showStartIcon: false, showEndIcon: true },
};

export const WithStartIcon = {
  render: (args) => createItem(args),
  args: { mode: 'light', type: 'double', startLabel: 'Label start', endLabel: 'Label end', showStartIcon: true, showEndIcon: true },
};

export const ItemList = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'width: 400px; padding: 16px; background: #ffffff;';
    const items = [
      { start: 'Order type', end: 'Market' },
      { start: 'Amount', end: '0.00234 BTC' },
      { start: 'Price', end: '€43,250.00' },
      { start: 'Fee', end: '€1.25' },
      { start: 'Total', end: '€102.50' },
    ];
    items.forEach((item, i) => {
      const row = document.createElement('div');
      row.className = 'bsdex-item bsdex-item--light bsdex-item--double';
      row.innerHTML = `
        <div class="bsdex-item__start"><span class="bsdex-item__label bsdex-item__label--start">${item.start}</span></div>
        <div class="bsdex-item__end"><span class="bsdex-item__label bsdex-item__label--end">${item.end}</span></div>
      `;
      container.appendChild(row);
      if (i < items.length - 1) {
        const divider = document.createElement('hr');
        divider.style.cssText = 'border: none; height: 1px; background: #e0e3e3; margin: 0;';
        container.appendChild(divider);
      }
    });
    return container;
  },
};
