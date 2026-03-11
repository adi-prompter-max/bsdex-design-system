import './Button.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    fill: {
      control: 'select',
      options: ['solid', 'outline'],
      description: 'Set the fill style of the button',
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger'],
      description: 'The color to use from the application color palette',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Set the button size',
    },
    icon: {
      control: 'select',
      options: ['none', 'left', 'right'],
      description: 'Show an icon on the left or right side',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the user cannot interact with the button',
    },
    mode: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Toggle dark mode background wrapper',
    },
    loading: {
      control: 'boolean',
      description: 'If true, show a loading spinner inside the button',
    },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Apply BSDEX design token overrides via CSS custom properties on an ion-button.
 */
function applyBsdexTokens(btn, fill, isDark) {
  if (fill === 'solid') {
    btn.style.setProperty('--background', 'var(--bsdex-primary-base)');
    btn.style.setProperty('--background-hover', 'var(--bsdex-primary-tint)');
    btn.style.setProperty('--background-activated', 'var(--bsdex-primary-shade)');
    btn.style.setProperty('--color', '#ffffff');
    btn.style.setProperty('--border-radius', 'var(--bsdex-radius-full)');

    if (isDark) {
      btn.style.setProperty('--background', 'var(--bsdex-primary-tint)');
      btn.style.setProperty('--background-hover', 'var(--bsdex-primary-base)');
    }
  } else if (fill === 'outline') {
    btn.style.setProperty('--border-color', 'var(--bsdex-primary-base)');
    btn.style.setProperty('--color', 'var(--bsdex-primary-base)');
    btn.style.setProperty('--border-radius', 'var(--bsdex-radius-full)');
    btn.style.setProperty('--border-width', '1.5px');
    btn.style.setProperty('--background', 'transparent');
    btn.style.setProperty('--background-hover', 'transparent');

    if (isDark) {
      btn.style.setProperty('--border-color', 'var(--bsdex-medium-shade)');
      btn.style.setProperty('--color', '#ffffff');
    }
  }
}

/**
 * Create a single ion-button element from the provided args.
 */
function createIonButton({
  label = 'Button',
  fill = 'solid',
  color = 'primary',
  size = 'default',
  icon = 'none',
  disabled = false,
  loading = false,
  mode = 'light',
}) {
  const btn = document.createElement('ion-button');
  btn.setAttribute('fill', fill);
  btn.setAttribute('color', color);

  if (size !== 'default') {
    btn.setAttribute('size', size);
  }
  if (disabled) {
    btn.setAttribute('disabled', '');
  }

  // Apply BSDEX token overrides when using the default primary color
  if (color === 'primary') {
    applyBsdexTokens(btn, fill, mode === 'dark');
  }

  // Icon on the left
  if (icon === 'left') {
    const ionIcon = document.createElement('ion-icon');
    ionIcon.setAttribute('slot', 'start');
    ionIcon.setAttribute('name', 'download-outline');
    btn.appendChild(ionIcon);
  }

  // Loading state: show spinner, hide label
  if (loading) {
    const spinner = document.createElement('ion-spinner');
    spinner.setAttribute('name', 'crescent');
    if (fill === 'solid') {
      spinner.style.setProperty('--color', '#ffffff');
    }
    btn.appendChild(spinner);
  } else {
    btn.appendChild(document.createTextNode(label));
  }

  // Icon on the right
  if (icon === 'right') {
    const ionIcon = document.createElement('ion-icon');
    ionIcon.setAttribute('slot', 'end');
    ionIcon.setAttribute('name', 'download-outline');
    btn.appendChild(ionIcon);
  }

  return btn;
}

/**
 * Wrap a button in an optional dark-mode container.
 */
function wrapWithMode(btn, mode) {
  const container = document.createElement('div');
  if (mode === 'dark') {
    container.style.cssText =
      'background: #191c1d; padding: 24px; border-radius: 8px;';
  }
  container.appendChild(btn);
  return container;
}

/**
 * Build the Ionic markup string for code snippet display.
 */
function buildCodeString({
  label = 'Button',
  fill = 'solid',
  color = 'primary',
  size = 'default',
  icon = 'none',
  disabled = false,
  loading = false,
}) {
  const attrs = [`fill="${fill}"`];
  if (color !== 'primary') attrs.push(`color="${color}"`);
  if (size !== 'default') attrs.push(`size="${size}"`);
  if (disabled) attrs.push('disabled');

  const attrStr = attrs.join(' ');

  let inner = '';
  if (icon === 'left') {
    inner += `\n  <ion-icon slot="start" name="download-outline"></ion-icon>\n`;
  }
  if (loading) {
    inner += inner ? '  <ion-spinner name="crescent"></ion-spinner>\n' : '\n  <ion-spinner name="crescent"></ion-spinner>\n';
  } else {
    inner += inner ? `  ${label}\n` : label;
  }
  if (icon === 'right') {
    inner += inner.endsWith('\n') ? '  <ion-icon slot="end" name="download-outline"></ion-icon>\n' : `\n  <ion-icon slot="end" name="download-outline"></ion-icon>\n`;
  }

  // Keep it on one line if simple, multiline if it has children elements
  if (icon === 'none' && !loading) {
    return `<ion-button ${attrStr}>${label}</ion-button>`;
  }
  return `<ion-button ${attrStr}>${inner}</ion-button>`;
}

// ---------------------------------------------------------------------------
// Default args shared across stories
// ---------------------------------------------------------------------------

const defaultArgs = {
  label: 'Button',
  fill: 'solid',
  color: 'primary',
  size: 'default',
  icon: 'none',
  disabled: false,
  mode: 'light',
  loading: false,
};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Solid = {
  render: (args) => {
    const container = wrapWithMode(createIonButton(args), args.mode);

    const code = buildCodeString(args);
    container.appendChild(createCodeSnippet(code));

    return container;
  },
  args: { ...defaultArgs },
};

export const Outline = {
  render: (args) => {
    const container = wrapWithMode(createIonButton(args), args.mode);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs, fill: 'outline' },
};

export const Large = {
  render: (args) => {
    const container = wrapWithMode(createIonButton(args), args.mode);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs, size: 'large' },
};

export const Small = {
  render: (args) => {
    const container = wrapWithMode(createIonButton(args), args.mode);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { ...defaultArgs, size: 'small' },
};

export const WithIcon = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';

    // Icon left
    const leftArgs = { ...args, icon: 'left' };
    const leftBtn = createIonButton(leftArgs);
    container.appendChild(leftBtn);
    container.appendChild(createCodeSnippet(buildCodeString(leftArgs)));

    // Icon right
    const rightArgs = { ...args, icon: 'right' };
    const rightBtn = createIonButton(rightArgs);
    container.appendChild(rightBtn);
    container.appendChild(createCodeSnippet(buildCodeString(rightArgs)));

    return container;
  },
  args: { ...defaultArgs, label: 'Download' },
};

export const Disabled = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 16px; align-items: center; flex-wrap: wrap;';

    // Disabled solid
    const solidBtn = createIonButton({ ...args, fill: 'solid' });
    container.appendChild(solidBtn);

    // Disabled outline
    const outlineBtn = createIonButton({ ...args, fill: 'outline' });
    container.appendChild(outlineBtn);

    const code = `<ion-button fill="solid" disabled>Button</ion-button>\n<ion-button fill="outline" disabled>Button</ion-button>`;
    container.appendChild(createCodeSnippet(code));

    return container;
  },
  args: { ...defaultArgs, disabled: true },
};

export const Loading = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; gap: 16px; align-items: center; flex-wrap: wrap;';

    // Loading solid
    const solidBtn = createIonButton({ ...args, fill: 'solid' });
    container.appendChild(solidBtn);

    // Loading outline
    const outlineBtn = createIonButton({ ...args, fill: 'outline' });
    container.appendChild(outlineBtn);

    const code = `<!-- Solid loading -->\n<ion-button fill="solid">\n  <ion-spinner name="crescent"></ion-spinner>\n</ion-button>\n\n<!-- Outline loading -->\n<ion-button fill="outline">\n  <ion-spinner name="crescent"></ion-spinner>\n</ion-button>`;
    container.appendChild(createCodeSnippet(code));

    return container;
  },
  args: { ...defaultArgs, loading: true },
};

export const Colors = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 24px;';

    const colors = ['primary', 'success', 'warning', 'danger'];

    // Solid row
    const solidSection = document.createElement('div');
    solidSection.innerHTML =
      '<h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #7c7c7c; text-transform: uppercase; letter-spacing: 1px;">Solid</h3>';
    const solidRow = document.createElement('div');
    solidRow.style.cssText = 'display: flex; gap: 12px; align-items: center; flex-wrap: wrap;';
    colors.forEach((color) => {
      const btn = createIonButton({ label: color, fill: 'solid', color });
      solidRow.appendChild(btn);
    });
    solidSection.appendChild(solidRow);
    container.appendChild(solidSection);

    // Outline row
    const outlineSection = document.createElement('div');
    outlineSection.innerHTML =
      '<h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #7c7c7c; text-transform: uppercase; letter-spacing: 1px;">Outline</h3>';
    const outlineRow = document.createElement('div');
    outlineRow.style.cssText = 'display: flex; gap: 12px; align-items: center; flex-wrap: wrap;';
    colors.forEach((color) => {
      const btn = createIonButton({ label: color, fill: 'outline', color });
      outlineRow.appendChild(btn);
    });
    outlineSection.appendChild(outlineRow);
    container.appendChild(outlineSection);

    // Code snippet
    const code = colors
      .map(
        (c) =>
          `<ion-button fill="solid" color="${c}">${c}</ion-button>\n<ion-button fill="outline" color="${c}">${c}</ion-button>`
      )
      .join('\n\n');
    container.appendChild(createCodeSnippet(code));

    return container;
  },
};

export const DarkMode = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText =
      'background: #191c1d; padding: 24px; border-radius: 8px; display: flex; flex-direction: column; gap: 16px;';

    const row = document.createElement('div');
    row.style.cssText = 'display: flex; gap: 12px; align-items: center; flex-wrap: wrap;';

    // Solid
    row.appendChild(createIonButton({ label: 'Solid', fill: 'solid', mode: 'dark' }));
    // Outline
    row.appendChild(createIonButton({ label: 'Outline', fill: 'outline', mode: 'dark' }));
    // Loading
    row.appendChild(createIonButton({ fill: 'solid', mode: 'dark', loading: true }));
    // Disabled
    row.appendChild(createIonButton({ label: 'Disabled', fill: 'solid', mode: 'dark', disabled: true }));

    container.appendChild(row);

    const code = `<!-- Dark mode: wrap in a dark-themed container or use Ionic dark mode -->
<ion-button fill="solid">Solid</ion-button>
<ion-button fill="outline">Outline</ion-button>
<ion-button fill="solid" disabled>Disabled</ion-button>`;
    container.appendChild(createCodeSnippet(code));

    return container;
  },
};

export const AllVariants = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 32px;';

    // --- Solid section ---
    const solidSection = document.createElement('div');
    solidSection.innerHTML =
      '<h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #7c7c7c; text-transform: uppercase; letter-spacing: 1px;">Solid</h3>';
    const solidRow = document.createElement('div');
    solidRow.style.cssText = 'display: flex; gap: 12px; align-items: center; flex-wrap: wrap;';

    ['small', 'default', 'large'].forEach((size) => {
      solidRow.appendChild(createIonButton({ label: size, fill: 'solid', size }));
    });
    solidRow.appendChild(createIonButton({ label: 'Disabled', fill: 'solid', disabled: true }));
    solidRow.appendChild(createIonButton({ label: 'Icon Left', fill: 'solid', icon: 'left' }));
    solidRow.appendChild(createIonButton({ label: 'Icon Right', fill: 'solid', icon: 'right' }));
    solidRow.appendChild(createIonButton({ fill: 'solid', loading: true }));

    solidSection.appendChild(solidRow);
    container.appendChild(solidSection);

    // --- Outline section ---
    const outlineSection = document.createElement('div');
    outlineSection.innerHTML =
      '<h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #7c7c7c; text-transform: uppercase; letter-spacing: 1px;">Outline</h3>';
    const outlineRow = document.createElement('div');
    outlineRow.style.cssText = 'display: flex; gap: 12px; align-items: center; flex-wrap: wrap;';

    ['small', 'default', 'large'].forEach((size) => {
      outlineRow.appendChild(createIonButton({ label: size, fill: 'outline', size }));
    });
    outlineRow.appendChild(createIonButton({ label: 'Disabled', fill: 'outline', disabled: true }));
    outlineRow.appendChild(createIonButton({ label: 'Icon Left', fill: 'outline', icon: 'left' }));
    outlineRow.appendChild(createIonButton({ fill: 'outline', loading: true }));

    outlineSection.appendChild(outlineRow);
    container.appendChild(outlineSection);

    // --- Colors section ---
    const colorsSection = document.createElement('div');
    colorsSection.innerHTML =
      '<h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #7c7c7c; text-transform: uppercase; letter-spacing: 1px;">Colors</h3>';
    const colorsRow = document.createElement('div');
    colorsRow.style.cssText = 'display: flex; gap: 12px; align-items: center; flex-wrap: wrap;';

    ['primary', 'success', 'warning', 'danger'].forEach((color) => {
      colorsRow.appendChild(createIonButton({ label: color, fill: 'solid', color }));
    });
    ['primary', 'success', 'warning', 'danger'].forEach((color) => {
      colorsRow.appendChild(createIonButton({ label: color, fill: 'outline', color }));
    });

    colorsSection.appendChild(colorsRow);
    container.appendChild(colorsSection);

    // --- Dark mode section ---
    const darkSection = document.createElement('div');
    darkSection.style.cssText =
      'background: #191c1d; padding: 24px; border-radius: 8px;';
    darkSection.innerHTML =
      '<h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #7c7c7c; text-transform: uppercase; letter-spacing: 1px;">Dark Mode</h3>';
    const darkRow = document.createElement('div');
    darkRow.style.cssText = 'display: flex; gap: 12px; align-items: center; flex-wrap: wrap;';

    darkRow.appendChild(createIonButton({ label: 'Solid', fill: 'solid', mode: 'dark' }));
    darkRow.appendChild(createIonButton({ label: 'Outline', fill: 'outline', mode: 'dark' }));
    darkRow.appendChild(createIonButton({ fill: 'solid', mode: 'dark', loading: true }));
    darkRow.appendChild(createIonButton({ label: 'Disabled', fill: 'solid', mode: 'dark', disabled: true }));

    darkSection.appendChild(darkRow);
    container.appendChild(darkSection);

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
          name: 'fill',
          type: "'solid' | 'outline' | 'clear'",
          default: "'solid'",
          description: 'Set the fill style of the button.',
        },
        {
          name: 'color',
          type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger'",
          default: "'primary'",
          description: 'The color to use from the application color palette.',
        },
        {
          name: 'size',
          type: "'small' | 'default' | 'large'",
          default: "'default'",
          description: 'Set the button size.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'If true, the user cannot interact with the button.',
        },
        {
          name: 'expand',
          type: "'block' | 'full'",
          default: 'undefined',
          description: 'Set to "block" for a full-width button or "full" for a full-width button without border radius.',
        },
        {
          name: 'shape',
          type: "'round'",
          default: 'undefined',
          description: 'Set to "round" for a button with more rounded corners.',
        },
        {
          name: 'type',
          type: "'submit' | 'reset' | 'button'",
          default: "'button'",
          description: 'The type of the native HTML button element.',
        },
        {
          name: 'href',
          type: 'string',
          default: 'undefined',
          description: 'Contains a URL or URL fragment. If set, an anchor tag is rendered instead of a button.',
        },
        {
          name: 'download',
          type: 'string',
          default: 'undefined',
          description: 'Prompts the user to save the linked URL. Only applies when href is set.',
        },
        {
          name: 'target',
          type: "'_blank' | '_self' | '_parent' | '_top'",
          default: 'undefined',
          description: 'Specifies where to display the linked URL. Only applies when href is set.',
        },
        {
          name: 'mode',
          type: "'ios' | 'md'",
          default: 'undefined',
          description: 'The Ionic rendering mode (iOS or Material Design).',
        },
        {
          name: 'strong',
          type: 'boolean',
          default: 'false',
          description: 'If true, uses a heavier font weight.',
        },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background of the button.' },
        { name: '--background-hover', description: 'Background of the button on hover.' },
        { name: '--background-activated', description: 'Background of the button when pressed.' },
        { name: '--background-focused', description: 'Background of the button when focused via keyboard.' },
        { name: '--color', description: 'Text color of the button.' },
        { name: '--color-hover', description: 'Text color of the button on hover.' },
        { name: '--color-activated', description: 'Text color of the button when pressed.' },
        { name: '--color-focused', description: 'Text color of the button when focused via keyboard.' },
        { name: '--border-radius', description: 'Border radius of the button.' },
        { name: '--border-width', description: 'Border width of the button.' },
        { name: '--border-style', description: 'Border style of the button.' },
        { name: '--border-color', description: 'Border color of the button.' },
        { name: '--padding-top', description: 'Top padding of the button.' },
        { name: '--padding-end', description: 'Right padding of the button (LTR), left in RTL.' },
        { name: '--padding-bottom', description: 'Bottom padding of the button.' },
        { name: '--padding-start', description: 'Left padding of the button (LTR), right in RTL.' },
        { name: '--box-shadow', description: 'Box shadow of the button.' },
        { name: '--opacity', description: 'Opacity of the button.' },
        { name: '--ripple-color', description: 'Color of the ripple effect (MD mode).' },
        { name: '--overflow', description: 'Overflow of the button.' },
      ],
      shadowParts: [
        { name: 'native', description: 'The native HTML button or anchor element that wraps the content.' },
      ],
    });
  },
};
