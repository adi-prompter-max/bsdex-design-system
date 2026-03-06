import '../src/tokens/tokens.css';

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Foundation', ['Colors', 'Typography'], 'Components'],
      },
    },
  },
};

export default preview;
