import './Tabs.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  argTypes: {
    selectedTab: {
      control: 'select',
      options: ['invest', 'wallet', 'orders', 'transactions', 'profile'],
      description: 'The currently selected tab',
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

const tabDefinitions = [
  { tab: 'invest', label: 'Invest', icon: 'trending-up' },
  { tab: 'wallet', label: 'Wallet', icon: 'wallet' },
  { tab: 'orders', label: 'Orders', icon: 'receipt' },
  { tab: 'transactions', label: 'Transactions', icon: 'swap-horizontal' },
  { tab: 'profile', label: 'Profile', icon: 'person' },
];

/**
 * Create an ion-tab-bar with ion-tab-button children.
 */
function createTabBar({ selectedTab = 'invest', tabs = tabDefinitions }) {
  const tabBar = document.createElement('ion-tab-bar');

  tabs.forEach((def) => {
    const tabButton = document.createElement('ion-tab-button');
    tabButton.setAttribute('tab', def.tab);
    if (def.tab === selectedTab) {
      tabButton.setAttribute('selected', '');
    }

    const icon = document.createElement('ion-icon');
    icon.setAttribute('name', def.icon);
    const label = document.createElement('ion-label');
    label.textContent = def.label;

    tabButton.appendChild(icon);
    tabButton.appendChild(label);
    tabBar.appendChild(tabButton);
  });

  return tabBar;
}

/**
 * Wrap element in an optional dark-mode container.
 */
function wrapWithMode(el, mode) {
  const container = document.createElement('div');
  if (mode === 'dark') {
    container.style.cssText = 'background: #191c1d; padding: 0; border-radius: 8px;';
  }
  container.appendChild(el);
  return container;
}

/**
 * Build the Ionic markup string for code snippet display.
 */
function buildTabBarCodeString({ selectedTab = 'invest', tabs = tabDefinitions }) {
  const tabLines = tabs.map((def) => {
    const selectedAttr = def.tab === selectedTab ? ' selected' : '';
    return `  <ion-tab-button tab="${def.tab}"${selectedAttr}>
    <ion-icon name="${def.icon}"></ion-icon>
    <ion-label>${def.label}</ion-label>
  </ion-tab-button>`;
  }).join('\n');

  return `<ion-tab-bar>\n${tabLines}\n</ion-tab-bar>`;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Light = {
  render: (args) => {
    const container = wrapWithMode(createTabBar(args), args.mode);
    container.appendChild(createCodeSnippet(buildTabBarCodeString(args)));
    return container;
  },
  args: { selectedTab: 'invest', mode: 'light' },
};

export const Dark = {
  render: (args) => {
    const container = wrapWithMode(createTabBar(args), args.mode);
    container.appendChild(createCodeSnippet(buildTabBarCodeString(args)));
    return container;
  },
  args: { selectedTab: 'invest', mode: 'dark' },
};

export const Wallet = {
  render: (args) => {
    const container = wrapWithMode(createTabBar(args), args.mode);
    container.appendChild(createCodeSnippet(buildTabBarCodeString(args)));
    return container;
  },
  args: { selectedTab: 'wallet', mode: 'light' },
};

export const Transactions = {
  render: (args) => {
    const container = wrapWithMode(createTabBar(args), args.mode);
    container.appendChild(createCodeSnippet(buildTabBarCodeString(args)));
    return container;
  },
  args: { selectedTab: 'transactions', mode: 'light' },
};

// ---------------------------------------------------------------------------
// API Documentation
// ---------------------------------------------------------------------------

export const API = {
  render: () => {
    const container = document.createElement('div');

    // ion-tab-bar heading
    const tabBarHeading = document.createElement('h2');
    tabBarHeading.style.cssText = 'margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';
    tabBarHeading.textContent = 'ion-tab-bar';
    container.appendChild(tabBarHeading);

    container.appendChild(createApiTable({
      properties: [
        { name: 'color', type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger'", default: 'undefined', description: 'The color to use from the application color palette.' },
        { name: 'selectedTab', type: 'string', default: 'undefined', description: 'The selected tab in the tab bar.' },
        { name: 'translucent', type: 'boolean', default: 'false', description: 'If true, the tab bar will be translucent. Only applies when mode is "ios".' },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background of the tab bar.' },
        { name: '--color', description: 'Color of the unselected tab buttons.' },
        { name: '--color-selected', description: 'Color of the selected tab button.' },
      ],
    }));

    // ion-tab-button heading
    const tabBtnHeading = document.createElement('h2');
    tabBtnHeading.style.cssText = 'margin: 32px 0 16px 0; font-size: 18px; font-weight: 600; color: #1a1a1a; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;';
    tabBtnHeading.textContent = 'ion-tab-button';
    container.appendChild(tabBtnHeading);

    container.appendChild(createApiTable({
      properties: [
        { name: 'tab', type: 'string', default: 'undefined', description: 'A tab identifier string that matches the tab to display when this button is clicked.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'If true, the user cannot interact with the tab button.' },
        { name: 'selected', type: 'boolean', default: 'false', description: 'If true, the tab button is currently selected.' },
      ],
    }));

    return container;
  },
};
