/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  async viteFinal(config) {
    return {
      ...config,
      optimizeDeps: {
        ...config.optimizeDeps,
        // Pre-bundle Ionic core so custom elements register correctly
        include: [
          ...(config.optimizeDeps?.include || []),
          '@ionic/core/loader',
          '@ionic/core',
        ],
      },
      // Ensure Ionic's ESM files and CSS are resolved properly
      resolve: {
        ...config.resolve,
        dedupe: [
          ...(config.resolve?.dedupe || []),
          '@ionic/core',
        ],
      },
    };
  },
};

export default config;
