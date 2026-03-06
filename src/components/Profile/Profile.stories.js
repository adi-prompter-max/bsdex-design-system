import './Profile.css';

export default {
  title: 'Components/Profile',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
    name: { control: 'text' },
    email: { control: 'text' },
  },
};

const chevron = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const createProfile = ({ mode, name, email }) => {
  const container = document.createElement('div');
  container.style.cssText = `width: 400px; ${mode === 'dark' ? 'background: #191c1d; padding: 16px;' : 'padding: 16px;'}`;

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  const profile = document.createElement('div');
  profile.className = `bsdex-profile bsdex-profile--${mode}`;
  profile.innerHTML = `
    <div class="bsdex-profile__header">
      <div class="bsdex-profile__avatar">${initials}</div>
      <div class="bsdex-profile__info">
        <span class="bsdex-profile__name">${name}</span>
        <span class="bsdex-profile__email">${email}</span>
      </div>
    </div>
    <div class="bsdex-profile__menu">
      ${['Personal details', 'Security', 'Payment methods', 'Notifications', 'Dark mode', 'Help & Support', 'Legal'].map(item =>
        `<button class="bsdex-profile__menu-item"><span>${item}</span><span class="bsdex-profile__menu-arrow">${chevron}</span></button>`
      ).join('')}
    </div>
  `;

  container.appendChild(profile);
  return container;
};

export const Light = {
  render: (args) => createProfile(args),
  args: { mode: 'light', name: 'Max Mustermann', email: 'max@example.com' },
};

export const Dark = {
  render: (args) => createProfile(args),
  args: { mode: 'dark', name: 'Max Mustermann', email: 'max@example.com' },
};
