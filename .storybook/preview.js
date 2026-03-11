/* Ionic CSS — import selectively to avoid aggressive global resets
   (ionic.bundle.css includes structure.css which sets body to position:fixed) */
import '@ionic/core/css/core.css';
import '@ionic/core/css/normalize.css';
import '@ionic/core/css/typography.css';
import '@ionic/core/css/padding.css';
import '@ionic/core/css/text-alignment.css';
import '@ionic/core/css/display.css';
import '@ionic/core/css/flex-utils.css';
import '@ionic/core/css/float-elements.css';

/* BSDEX tokens + overrides */
import '../src/tokens/tokens.css';
import '../src/helpers/ionic-overrides.css';
import '../src/helpers/device-frame.css';

import { defineCustomElements } from '@ionic/core/loader';
import { wrapInDeviceFrame } from '../src/helpers/device-frame.js';

// Register all Ionic web components
defineCustomElements(window);

/**
 * Device frame decorator — wraps stories in a mobile simulator when
 * the user picks 'ios' or 'md' from the platform toolbar.
 */
const withDeviceFrame = (storyFn, context) => {
  const platform = context.globals.platform || 'none';
  const story = storyFn();

  if (platform === 'none') {
    return story;
  }

  // Set Ionic mode on the root element so components render in the right style
  document.documentElement.setAttribute('mode', platform);

  return wrapInDeviceFrame(story, platform);
};

/** @type { import('@storybook/html').Preview } */
const preview = {
  decorators: [withDeviceFrame],
  globalTypes: {
    platform: {
      name: 'Platform',
      description: 'Switch between iOS, Android (Material), or no device frame',
      toolbar: {
        icon: 'mobile',
        items: [
          { value: 'none', title: 'No Frame', icon: 'browser' },
          { value: 'ios', title: 'iOS', icon: 'apple' },
          { value: 'md', title: 'Android', icon: 'android' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    platform: 'none',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Introduction', 'Foundation', ['Colors', 'Typography', 'Spacing', 'Icons'], 'Components'],
      },
    },
  },
};

export default preview;
