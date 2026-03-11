import './Chip.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Chip',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The text content of the chip',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'The color to use from the application color palette',
    },
    outline: {
      control: 'boolean',
      description: 'If true, display an outline style chip',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the user cannot interact with the chip',
    },
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

function createIonChip({ label = '1H', color = 'primary', outline = false, disabled = false }) {
  const chip = document.createElement('ion-chip');
  chip.setAttribute('color', color);

  if (outline) {
    chip.setAttribute('outline', '');
  }
  if (disabled) {
    chip.setAttribute('disabled', '');
  }

  chip.innerHTML = `<ion-label>${label}</ion-label>`;
  return chip;
}

function buildCodeString({ label = '1H', color = 'primary', outline = false, disabled = false }) {
  const attrs = [`color="${color}"`];
  if (outline) attrs.push('outline');
  if (disabled) attrs.push('disabled');

  return `<ion-chip ${attrs.join(' ')}>\n  <ion-label>${label}</ion-label>\n</ion-chip>`;
}

// ---------------------------------------------------------------------------
// Default args
// ---------------------------------------------------------------------------

const defaultArgs = {
  label: '1H',
  color: 'primary',
  outline: false,
  disabled: false,
  mode: 'light',
};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = 'padding: 16px;';
    container.appendChild(createIonChip(args));
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs },
};

export const Active = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = 'padding: 16px;';
    const chip = createIonChip(args);
    chip.style.setProperty('--background', 'var(--ion-color-primary, #3880ff)');
    chip.style.setProperty('--color', '#ffffff');
    container.appendChild(chip);

    const code = `<!-- Active chip with custom styling -->\n<ion-chip color="${args.color}" style="--background: var(--ion-color-primary); --color: #fff;">\n  <ion-label>${args.label}</ion-label>\n</ion-chip>`;
    container.appendChild(createCodeSnippet(code));
    return container;
  },
  args: { ...defaultArgs },
};

export const ChipGroupLight = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 8px; padding: 16px;';

    const labels = ['1H', '24H', '1W', '1M', '1Y', 'ALL'];
    labels.forEach((label, i) => {
      const chip = createIonChip({ label, color: 'primary' });
      if (i === 1) {
        chip.style.setProperty('--background', 'var(--ion-color-primary, #3880ff)');
        chip.style.setProperty('--color', '#ffffff');
      }
      container.appendChild(chip);
    });

    const code = labels.map((label, i) => {
      if (i === 1) {
        return `<ion-chip color="primary" style="--background: var(--ion-color-primary); --color: #fff;">\n  <ion-label>${label}</ion-label>\n</ion-chip>`;
      }
      return `<ion-chip color="primary">\n  <ion-label>${label}</ion-label>\n</ion-chip>`;
    }).join('\n');
    container.appendChild(createCodeSnippet(code));

    return container;
  },
};

export const ChipGroupDark = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 8px; flex-wrap: wrap; background: #191c1d; padding: 16px; border-radius: 8px;';

    const labels = ['1H', '24H', '1W', '1M', '1Y', 'ALL'];
    labels.forEach((label, i) => {
      const chip = createIonChip({ label, color: 'primary' });
      if (i === 1) {
        chip.style.setProperty('--background', 'var(--ion-color-primary, #3880ff)');
        chip.style.setProperty('--color', '#ffffff');
      }
      container.appendChild(chip);
    });

    const code = `<!-- Dark mode chip group -->\n${labels.map((label) =>
      `<ion-chip color="primary">\n  <ion-label>${label}</ion-label>\n</ion-chip>`
    ).join('\n')}`;
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
          type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger'",
          default: "'primary'",
          description: 'The color to use from the application color palette.',
        },
        {
          name: 'outline',
          type: 'boolean',
          default: 'false',
          description: 'If true, display an outline style chip.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'If true, the user cannot interact with the chip.',
        },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background of the chip.' },
        { name: '--color', description: 'Text color of the chip.' },
        { name: '--border-radius', description: 'Border radius of the chip.' },
      ],
    });
  },
};
