import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const bsdexTheme = create({
  base: 'light',
  brandTitle: 'BSDEX Design System',
  brandUrl: 'https://www.bsdex.de',
  colorPrimary: '#6432fa',
  colorSecondary: '#6432fa',
  appBg: '#f8f8f8',
  appContentBg: '#ffffff',
  appBorderColor: '#e0e3e3',
  textColor: '#191c1d',
  barTextColor: '#191c1d',
  barSelectedColor: '#6432fa',
});

addons.setConfig({
  theme: bsdexTheme,
});
