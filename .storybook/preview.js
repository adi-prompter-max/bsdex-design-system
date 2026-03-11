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

/* Initialize Ionic runtime (needed for color system, mode detection, etc.) */
import { initialize } from '@ionic/core/components';
initialize();

/* Register Ionic web components individually (standalone custom elements).
   The lazy loader (defineCustomElements from @ionic/core/loader) doesn't work
   in static Storybook builds because chunk paths break. */
import { defineCustomElement as defineIonButton } from '@ionic/core/components/ion-button';
import { defineCustomElement as defineIonIcon } from '@ionic/core/components/ion-icon';
import { defineCustomElement as defineIonSpinner } from '@ionic/core/components/ion-spinner';
import { defineCustomElement as defineIonInput } from '@ionic/core/components/ion-input';
import { defineCustomElement as defineIonItem } from '@ionic/core/components/ion-item';
import { defineCustomElement as defineIonLabel } from '@ionic/core/components/ion-label';
import { defineCustomElement as defineIonNote } from '@ionic/core/components/ion-note';
import { defineCustomElement as defineIonList } from '@ionic/core/components/ion-list';
import { defineCustomElement as defineIonToggle } from '@ionic/core/components/ion-toggle';
import { defineCustomElement as defineIonCheckbox } from '@ionic/core/components/ion-checkbox';
import { defineCustomElement as defineIonRadio } from '@ionic/core/components/ion-radio';
import { defineCustomElement as defineIonRadioGroup } from '@ionic/core/components/ion-radio-group';
import { defineCustomElement as defineIonChip } from '@ionic/core/components/ion-chip';
import { defineCustomElement as defineIonSegment } from '@ionic/core/components/ion-segment';
import { defineCustomElement as defineIonSegmentButton } from '@ionic/core/components/ion-segment-button';
import { defineCustomElement as defineIonCard } from '@ionic/core/components/ion-card';
import { defineCustomElement as defineIonCardContent } from '@ionic/core/components/ion-card-content';
import { defineCustomElement as defineIonCardHeader } from '@ionic/core/components/ion-card-header';
import { defineCustomElement as defineIonCardTitle } from '@ionic/core/components/ion-card-title';
import { defineCustomElement as defineIonCardSubtitle } from '@ionic/core/components/ion-card-subtitle';
import { defineCustomElement as defineIonTabBar } from '@ionic/core/components/ion-tab-bar';
import { defineCustomElement as defineIonTabButton } from '@ionic/core/components/ion-tab-button';
import { defineCustomElement as defineIonAvatar } from '@ionic/core/components/ion-avatar';
import { defineCustomElement as defineIonBadge } from '@ionic/core/components/ion-badge';
import { defineCustomElement as defineIonGrid } from '@ionic/core/components/ion-grid';
import { defineCustomElement as defineIonRow } from '@ionic/core/components/ion-row';
import { defineCustomElement as defineIonCol } from '@ionic/core/components/ion-col';
import { defineCustomElement as defineIonItemDivider } from '@ionic/core/components/ion-item-divider';
import { defineCustomElement as defineIonText } from '@ionic/core/components/ion-text';
import { defineCustomElement as defineIonRippleEffect } from '@ionic/core/components/ion-ripple-effect';

defineIonButton();
defineIonIcon();
defineIonSpinner();
defineIonInput();
defineIonItem();
defineIonLabel();
defineIonNote();
defineIonList();
defineIonToggle();
defineIonCheckbox();
defineIonRadio();
defineIonRadioGroup();
defineIonChip();
defineIonSegment();
defineIonSegmentButton();
defineIonCard();
defineIonCardContent();
defineIonCardHeader();
defineIonCardTitle();
defineIonCardSubtitle();
defineIonTabBar();
defineIonTabButton();
defineIonAvatar();
defineIonBadge();
defineIonGrid();
defineIonRow();
defineIonCol();
defineIonItemDivider();
defineIonText();
defineIonRippleEffect();

import { wrapInDeviceFrame } from '../src/helpers/device-frame.js';

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
