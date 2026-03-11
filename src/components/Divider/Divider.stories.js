import './Divider.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Divider',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Toggle dark mode background wrapper',
    },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Create an ion-item-divider styled as a simple horizontal rule.
 */
function createIonDivider({ mode = 'light' }) {
  const divider = document.createElement('ion-item-divider');
  divider.style.setProperty('--background', 'transparent');
  divider.style.setProperty('--padding-start', '0');
  divider.style.setProperty('--padding-end', '0');
  divider.style.setProperty('--inner-padding-end', '0');
  divider.style.setProperty('min-height', '1px');
  divider.style.setProperty('--color', 'transparent');

  // Use a border-bottom to simulate the divider line
  if (mode === 'dark') {
    divider.style.setProperty('border-bottom', '1px solid var(--bsdex-dark-tint)');
  } else {
    divider.style.setProperty('border-bottom', '1px solid var(--bsdex-light-base)');
  }

  return divider;
}

/**
 * Wrap content in an optional dark-mode container.
 */
function wrapWithMode(content, mode) {
  const container = document.createElement('div');
  container.style.cssText = `padding: 24px; width: 100%; ${mode === 'dark' ? 'background: #191c1d; border-radius: 8px;' : ''}`;
  container.appendChild(content);
  return container;
}

/**
 * Build the Ionic markup string for code snippet display.
 */
function buildCodeString() {
  return `<ion-item-divider>\n</ion-item-divider>`;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Light = {
  render: (args) => {
    const container = wrapWithMode(createIonDivider(args), args.mode);
    container.appendChild(createCodeSnippet(buildCodeString()));
    return container;
  },
  args: { mode: 'light' },
};

export const Dark = {
  render: (args) => {
    const container = wrapWithMode(createIonDivider(args), args.mode);
    container.appendChild(createCodeSnippet(buildCodeString()));
    return container;
  },
  args: { mode: 'dark' },
};

export const InList = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'width: 400px; padding: 16px; background: #ffffff;';

    const list = document.createElement('ion-list');

    // Item above
    const item1 = document.createElement('ion-item');
    item1.setAttribute('lines', 'none');
    const label1 = document.createElement('ion-label');
    label1.textContent = 'Item above divider';
    item1.appendChild(label1);
    list.appendChild(item1);

    // Divider
    list.appendChild(createIonDivider({ mode: 'light' }));

    // Item below
    const item2 = document.createElement('ion-item');
    item2.setAttribute('lines', 'none');
    const label2 = document.createElement('ion-label');
    label2.textContent = 'Item below divider';
    item2.appendChild(label2);
    list.appendChild(item2);

    container.appendChild(list);

    const code = `<ion-list>
  <ion-item lines="none">
    <ion-label>Item above divider</ion-label>
  </ion-item>

  <ion-item-divider></ion-item-divider>

  <ion-item lines="none">
    <ion-label>Item below divider</ion-label>
  </ion-item>
</ion-list>`;
    container.appendChild(createCodeSnippet(code));

    return container;
  },
};

// ---------------------------------------------------------------------------
// API Documentation
// ---------------------------------------------------------------------------

export const API = {
  render: () => {
    return createApiTable({
      properties: [
        {
          name: 'color',
          type: 'string',
          default: 'undefined',
          description: 'The color to use from the application color palette.',
        },
        {
          name: 'sticky',
          type: 'boolean',
          default: 'false',
          description: 'If true, the divider will be sticky (position: sticky) when scrolling.',
        },
        {
          name: 'mode',
          type: "'ios' | 'md'",
          default: 'undefined',
          description: 'The Ionic rendering mode (iOS or Material Design).',
        },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background of the divider.' },
        { name: '--color', description: 'Color of the divider text content.' },
        { name: '--padding-start', description: 'Start padding of the divider.' },
        { name: '--padding-end', description: 'End padding of the divider.' },
        { name: '--inner-padding-start', description: 'Start padding of the inner divider content.' },
        { name: '--inner-padding-end', description: 'End padding of the inner divider content.' },
      ],
    });
  },
};
