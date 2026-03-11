import './Toast.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Toast',
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'The message to display in the toast',
    },
    color: {
      control: 'select',
      options: ['success', 'primary', 'warning', 'danger'],
      description: 'The color to use from the application color palette',
    },
    position: {
      control: 'select',
      options: ['top', 'middle', 'bottom'],
      description: 'The position of the toast on the screen',
    },
    duration: {
      control: 'number',
      description: 'Number of milliseconds the toast will show before auto-dismissing',
    },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Color map for the visual toast representation.
 */
const colorMap = {
  success: { bg: '#2dd36f', text: '#ffffff', label: 'Success' },
  primary: { bg: '#3880ff', text: '#ffffff', label: 'Info' },
  warning: { bg: '#ffc409', text: '#000000', label: 'Warning' },
  danger:  { bg: '#eb445a', text: '#ffffff', label: 'Danger' },
};

const icons = {
  success: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.2"/><path d="M6 10l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  primary: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.2"/><path d="M10 9v4M10 7h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  warning: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.2"/><path d="M10 7v4M10 13h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  danger: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.2"/><path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

/**
 * Create a visual representation of an ion-toast.
 * Since ion-toast is an overlay that requires a controller to present,
 * we render a styled div that mimics its appearance.
 */
function createToastPreview({ message = 'Toast message', color = 'success', position = 'bottom' }) {
  const colors = colorMap[color] || colorMap.success;

  const toast = document.createElement('div');
  toast.style.cssText = `
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 20px;
    border-radius: 8px;
    background: ${colors.bg};
    color: ${colors.text};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    font-weight: 500;
    max-width: 400px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  `;

  const icon = icons[color] || icons.success;
  toast.innerHTML = `
    <span style="flex-shrink: 0; display: flex;">${icon}</span>
    <span style="flex: 1;">${message}</span>
  `;

  return toast;
}

function buildCodeString({ message = 'Toast message', color = 'success', position = 'bottom', duration = 3000 }) {
  return `// Programmatic usage with toastController
const toast = await toastController.create({
  message: '${message}',
  duration: ${duration},
  color: '${color}',
  position: '${position}'
});
await toast.present();`;
}

function buildHtmlCodeString({ message = 'Toast message', color = 'success', position = 'bottom', duration = 3000 }) {
  const attrs = [
    `message="${message}"`,
    `duration="${duration}"`,
    `color="${color}"`,
    `position="${position}"`,
  ];
  return `<!-- Declarative usage -->\n<ion-toast ${attrs.join(' ')}></ion-toast>`;
}

// ---------------------------------------------------------------------------
// Default args
// ---------------------------------------------------------------------------

const defaultArgs = {
  message: 'Transaction completed',
  color: 'success',
  position: 'bottom',
  duration: 3000,
};

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Success = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
    container.appendChild(createToastPreview(args));
    container.appendChild(createCodeSnippet(buildCodeString(args), { label: 'Controller' }));
    container.appendChild(createCodeSnippet(buildHtmlCodeString(args), { label: 'HTML' }));
    return container;
  },
  args: { ...defaultArgs, message: 'Transaction completed successfully', color: 'success' },
};

export const Info = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
    container.appendChild(createToastPreview(args));
    container.appendChild(createCodeSnippet(buildCodeString(args), { label: 'Controller' }));
    container.appendChild(createCodeSnippet(buildHtmlCodeString(args), { label: 'HTML' }));
    return container;
  },
  args: { ...defaultArgs, message: 'Your order has been placed', color: 'primary' },
};

export const Warning = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
    container.appendChild(createToastPreview(args));
    container.appendChild(createCodeSnippet(buildCodeString(args), { label: 'Controller' }));
    container.appendChild(createCodeSnippet(buildHtmlCodeString(args), { label: 'HTML' }));
    return container;
  },
  args: { ...defaultArgs, message: 'Network connection is unstable', color: 'warning' },
};

export const Danger = {
  render: (args) => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';
    container.appendChild(createToastPreview(args));
    container.appendChild(createCodeSnippet(buildCodeString(args), { label: 'Controller' }));
    container.appendChild(createCodeSnippet(buildHtmlCodeString(args), { label: 'HTML' }));
    return container;
  },
  args: { ...defaultArgs, message: 'Failed to process transaction', color: 'danger' },
};

export const AllTypes = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 12px; max-width: 400px;';

    const types = [
      { color: 'success', message: 'This is a success toast message' },
      { color: 'primary', message: 'This is an info toast message' },
      { color: 'warning', message: 'This is a warning toast message' },
      { color: 'danger', message: 'This is a danger toast message' },
    ];

    types.forEach(({ color, message }) => {
      container.appendChild(createToastPreview({ message, color }));
    });

    const code = types.map(({ color, message }) =>
      `const ${color}Toast = await toastController.create({\n  message: '${message}',\n  duration: 3000,\n  color: '${color}',\n  position: 'bottom'\n});\nawait ${color}Toast.present();`
    ).join('\n\n');
    container.appendChild(createCodeSnippet(code, { label: 'Controller' }));

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
          name: 'message',
          type: 'string',
          default: 'undefined',
          description: 'The message to display in the toast.',
        },
        {
          name: 'duration',
          type: 'number',
          default: '0',
          description: 'Number of milliseconds the toast will show before auto-dismissing. Set to 0 to disable auto-dismiss.',
        },
        {
          name: 'color',
          type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger'",
          default: 'undefined',
          description: 'The color to use from the application color palette.',
        },
        {
          name: 'position',
          type: "'top' | 'middle' | 'bottom'",
          default: "'bottom'",
          description: 'The position of the toast on the screen.',
        },
        {
          name: 'icon',
          type: 'string',
          default: 'undefined',
          description: 'The name of the icon to display in the toast.',
        },
        {
          name: 'buttons',
          type: '(string | ToastButton)[]',
          default: 'undefined',
          description: 'An array of buttons to display in the toast.',
        },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background of the toast.' },
        { name: '--color', description: 'Text color of the toast.' },
        { name: '--border-radius', description: 'Border radius of the toast.' },
        { name: '--button-color', description: 'Color of the toast action buttons.' },
      ],
    });
  },
};
