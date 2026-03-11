import './Profile.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Profile',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'] },
    name: { control: 'text' },
    email: { control: 'text' },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const menuItems = [
  'Personal details',
  'Security',
  'Payment methods',
  'Notifications',
  'Dark mode',
  'Help & Support',
  'Legal',
];

/**
 * Create an ion-card based Profile component.
 */
function createProfile({ mode = 'light', name = 'Max Mustermann', email = 'max@example.com' }) {
  const isDark = mode === 'dark';
  const container = document.createElement('div');
  container.style.cssText = `width: 400px; ${isDark ? 'background: #191c1d; padding: 16px; border-radius: 8px;' : 'padding: 16px;'}`;

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  // ion-card
  const card = document.createElement('ion-card');
  card.style.setProperty('--background', isDark ? 'var(--bsdex-dark-tint)' : 'var(--bsdex-surface, #ffffff)');
  card.style.setProperty('margin', '0');
  card.style.setProperty('box-shadow', isDark ? 'none' : '');

  // Header item with avatar
  const headerItem = document.createElement('ion-item');
  headerItem.setAttribute('lines', 'none');
  headerItem.style.setProperty('--background', 'transparent');
  headerItem.style.setProperty('--padding-start', '16px');
  headerItem.style.setProperty('--padding-top', '16px');
  headerItem.style.setProperty('--inner-padding-end', '16px');

  const avatar = document.createElement('ion-avatar');
  avatar.setAttribute('slot', 'start');
  avatar.style.cssText = `
    background: var(--bsdex-primary-base);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
    width: 56px;
    height: 56px;
  `;
  const avatarText = document.createElement('div');
  avatarText.style.cssText = 'display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;';
  avatarText.textContent = initials;
  avatar.appendChild(avatarText);

  const headerLabel = document.createElement('ion-label');
  const nameEl = document.createElement('h2');
  nameEl.textContent = name;
  nameEl.style.cssText = `font-weight: 600; color: ${isDark ? '#ffffff' : 'var(--bsdex-dark-base)'};`;
  const emailEl = document.createElement('p');
  emailEl.textContent = email;
  emailEl.style.cssText = 'color: var(--bsdex-medium-base);';
  headerLabel.appendChild(nameEl);
  headerLabel.appendChild(emailEl);

  headerItem.appendChild(avatar);
  headerItem.appendChild(headerLabel);
  card.appendChild(headerItem);

  // Menu list
  const list = document.createElement('ion-list');
  list.style.setProperty('--background', 'transparent');
  list.style.setProperty('background', 'transparent');

  menuItems.forEach(label => {
    const item = document.createElement('ion-item');
    item.setAttribute('button', '');
    item.setAttribute('detail', '');
    item.setAttribute('detail-icon', 'chevron-forward');
    item.style.setProperty('--background', 'transparent');
    item.style.setProperty('--color', isDark ? '#ffffff' : 'var(--bsdex-dark-base)');
    item.style.setProperty('--detail-icon-color', 'var(--bsdex-medium-base)');
    item.style.setProperty('--border-color', isDark ? 'var(--bsdex-dark-tint)' : 'var(--bsdex-light-base)');
    item.style.setProperty('cursor', 'pointer');

    const itemLabel = document.createElement('ion-label');
    itemLabel.textContent = label;
    item.appendChild(itemLabel);
    list.appendChild(item);
  });

  card.appendChild(list);
  container.appendChild(card);
  return container;
}

/**
 * Build the Ionic markup string for code snippet display.
 */
function buildCodeString({ name = 'Max Mustermann', email = 'max@example.com' }) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  const items = menuItems.map(label =>
    `    <ion-item button detail detail-icon="chevron-forward">\n      <ion-label>${label}</ion-label>\n    </ion-item>`
  ).join('\n');

  return `<ion-card>
  <ion-item lines="none">
    <ion-avatar slot="start">
      <div>${initials}</div>
    </ion-avatar>
    <ion-label>
      <h2>${name}</h2>
      <p>${email}</p>
    </ion-label>
  </ion-item>

  <ion-list>
${items}
  </ion-list>
</ion-card>`;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Light = {
  render: (args) => {
    const container = createProfile(args);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { mode: 'light', name: 'Max Mustermann', email: 'max@example.com' },
};

export const Dark = {
  render: (args) => {
    const container = createProfile(args);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { mode: 'dark', name: 'Max Mustermann', email: 'max@example.com' },
};

// ---------------------------------------------------------------------------
// API Documentation
// ---------------------------------------------------------------------------

export const API = {
  render: () => {
    return createApiTable({
      properties: [
        {
          name: 'ion-card',
          type: 'component',
          default: '-',
          description: 'Container card wrapping the entire profile section.',
        },
        {
          name: 'ion-avatar (slot="start")',
          type: 'component',
          default: '-',
          description: 'Displays the user initials or profile image in the header.',
        },
        {
          name: 'ion-label (header)',
          type: 'component',
          default: '-',
          description: 'Contains the user name (<h2>) and email (<p>).',
        },
        {
          name: 'ion-list',
          type: 'component',
          default: '-',
          description: 'Container for the menu navigation items.',
        },
        {
          name: 'ion-item [button]',
          type: 'component',
          default: '-',
          description: 'Clickable menu row. Use the button attribute to enable tap feedback.',
        },
        {
          name: 'detail',
          type: 'boolean',
          default: 'true',
          description: 'Shows a chevron-forward icon at the end of each menu item.',
        },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background of the ion-card container.' },
        { name: '--color', description: 'Text color of ion-item elements.' },
        { name: '--detail-icon-color', description: 'Color of the chevron detail icon.' },
        { name: '--border-color', description: 'Border color between menu items.' },
      ],
    });
  },
};
