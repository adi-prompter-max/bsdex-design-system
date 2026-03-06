import './Button.css';

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    type: { control: 'select', options: ['solid', 'outline'] },
    size: { control: 'select', options: ['small', 'default', 'large'] },
    icon: { control: 'select', options: ['none', 'left', 'right'] },
    disabled: { control: 'boolean' },
    mode: { control: 'select', options: ['light', 'dark'] },
    loading: { control: 'boolean' },
  },
};

const iconSvg = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 1v10M4 7l4 4 4-4M2 14h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const createButton = ({ label, type, size, icon, disabled, mode = 'light', loading = false }) => {
  const btn = document.createElement('button');
  let className = `bsdex-button bsdex-button--${type} bsdex-button--${size}`;
  if (mode === 'dark') className += ' bsdex-button--dark';
  if (loading) className += ' bsdex-button--loading';
  btn.className = className;
  if (disabled) btn.disabled = true;

  const content = [];
  if (icon === 'left') content.push(`<span class="bsdex-button__icon">${iconSvg}</span>`);
  content.push(`<span class="bsdex-button__label">${label}</span>`);
  if (icon === 'right') content.push(`<span class="bsdex-button__icon">${iconSvg}</span>`);
  btn.innerHTML = content.join('');

  const container = document.createElement('div');
  if (mode === 'dark') {
    container.style.cssText = 'background: #191c1d; padding: 16px; border-radius: 8px;';
  }
  container.appendChild(btn);

  return container;
};

export const Solid = {
  render: (args) => createButton(args),
  args: { label: 'Button', type: 'solid', size: 'default', icon: 'none', disabled: false, mode: 'light', loading: false },
};

export const Outline = {
  render: (args) => createButton(args),
  args: { label: 'Button', type: 'outline', size: 'default', icon: 'none', disabled: false, mode: 'light', loading: false },
};

export const Large = {
  render: (args) => createButton(args),
  args: { label: 'Button', type: 'solid', size: 'large', icon: 'none', disabled: false, mode: 'light', loading: false },
};

export const Small = {
  render: (args) => createButton(args),
  args: { label: 'Button', type: 'solid', size: 'small', icon: 'none', disabled: false, mode: 'light', loading: false },
};

export const WithIconRight = {
  render: (args) => createButton(args),
  args: { label: 'Button', type: 'solid', size: 'default', icon: 'right', disabled: false, mode: 'light', loading: false },
};

export const WithIconLeft = {
  render: (args) => createButton(args),
  args: { label: 'Button', type: 'solid', size: 'default', icon: 'left', disabled: false, mode: 'light', loading: false },
};

export const Disabled = {
  render: (args) => createButton(args),
  args: { label: 'Button', type: 'solid', size: 'default', icon: 'none', disabled: true, mode: 'light', loading: false },
};

export const Loading = {
  render: (args) => createButton(args),
  args: { label: 'Loading...', type: 'solid', size: 'default', icon: 'none', disabled: false, mode: 'light', loading: true },
};

export const LoadingOutline = {
  render: (args) => createButton(args),
  args: { label: 'Loading...', type: 'outline', size: 'default', icon: 'none', disabled: false, mode: 'light', loading: true },
};

export const DarkSolid = {
  render: (args) => createButton(args),
  args: { label: 'Button', type: 'solid', size: 'default', icon: 'none', disabled: false, mode: 'dark', loading: false },
};

export const DarkOutline = {
  render: (args) => createButton(args),
  args: { label: 'Button', type: 'outline', size: 'default', icon: 'none', disabled: false, mode: 'dark', loading: false },
};

export const DarkLoading = {
  render: (args) => createButton(args),
  args: { label: 'Loading...', type: 'solid', size: 'default', icon: 'none', disabled: false, mode: 'dark', loading: true },
};

export const AllVariants = {
  render: () => {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '24px';

    ['solid', 'outline'].forEach(type => {
      const section = document.createElement('div');
      section.innerHTML = `<h3 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #7c7c7c; text-transform: uppercase; letter-spacing: 1px;">${type}</h3>`;
      const row = document.createElement('div');
      row.style.cssText = 'display: flex; gap: 16px; align-items: center; flex-wrap: wrap;';

      ['small', 'default', 'large'].forEach(size => {
        [false, true].forEach(disabled => {
          row.appendChild(createButton({ label: size, type, size, icon: 'none', disabled, mode: 'light', loading: false }));
        });
      });
      row.appendChild(createButton({ label: 'Icon L', type, size: 'default', icon: 'left', disabled: false, mode: 'light', loading: false }));
      row.appendChild(createButton({ label: 'Icon R', type, size: 'default', icon: 'right', disabled: false, mode: 'light', loading: false }));

      section.appendChild(row);
      container.appendChild(section);
    });

    // Dark variants section
    const darkSection = document.createElement('div');
    darkSection.style.cssText = 'background: #191c1d; padding: 16px; border-radius: 8px; margin-top: 8px;';
    darkSection.innerHTML = '<h3 style="margin-bottom: 12px; font-size: 14px; font-weight: 600; color: #7c7c7c; text-transform: uppercase; letter-spacing: 1px;">Dark Mode</h3>';
    const darkRow = document.createElement('div');
    darkRow.style.cssText = 'display: flex; gap: 16px; align-items: center; flex-wrap: wrap;';
    ['solid', 'outline'].forEach(type => {
      const b = createButton({ label: type, type, size: 'default', icon: 'none', disabled: false, mode: 'dark', loading: false });
      darkRow.appendChild(b.querySelector('.bsdex-button') || b);
    });
    const loadingBtn = createButton({ label: 'Loading', type: 'solid', size: 'default', icon: 'none', disabled: false, mode: 'dark', loading: true });
    darkRow.appendChild(loadingBtn.querySelector('.bsdex-button') || loadingBtn);
    darkSection.appendChild(darkRow);
    container.appendChild(darkSection);

    return container;
  },
};
