import './CryptoEinzahlen.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Einzahlen (Deposit)',
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Toggle dark mode background wrapper',
    },
    currency: {
      control: 'text',
      description: 'The cryptocurrency symbol (e.g. BTC, ETH)',
    },
    address: {
      control: 'text',
      description: 'The wallet address to display',
    },
    showInfo: {
      control: 'boolean',
      description: 'Show the warning note below the address',
    },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createDepositCard({ mode = 'light', currency = 'BTC', address = '', showInfo = true }) {
  const card = document.createElement('ion-card');
  card.style.cssText = 'max-width: 380px; margin: 0;';

  if (mode === 'dark') {
    card.style.setProperty('--background', 'var(--bsdex-dark-tint, #2a2d2e)');
    card.style.setProperty('color', '#ffffff');
  }

  // Header
  const header = document.createElement('ion-card-header');
  const title = document.createElement('ion-card-title');
  title.textContent = `Deposit ${currency}`;
  if (mode === 'dark') {
    title.style.color = '#ffffff';
  }
  header.appendChild(title);
  card.appendChild(header);

  // Content
  const content = document.createElement('ion-card-content');

  // QR code area
  const qrDiv = document.createElement('div');
  qrDiv.className = 'bsdex-deposit__qr';
  qrDiv.textContent = 'QR Code';
  content.appendChild(qrDiv);

  // Address row
  const item = document.createElement('ion-item');
  item.setAttribute('lines', 'none');
  item.style.cssText = 'font-family: monospace; --padding-start: 12px; --inner-padding-end: 4px; margin-top: 16px; --background: var(--bsdex-light-tint, #f5f5f5); border-radius: 8px; overflow: hidden;';

  if (mode === 'dark') {
    item.style.setProperty('--background', 'var(--bsdex-dark-base, #191c1d)');
    item.style.setProperty('--color', '#ffffff');
  }

  const label = document.createElement('ion-label');
  label.style.cssText = 'font-size: 13px; word-break: break-all; white-space: normal;';
  label.textContent = address;
  item.appendChild(label);

  const copyBtn = document.createElement('ion-button');
  copyBtn.setAttribute('slot', 'end');
  copyBtn.setAttribute('fill', 'clear');
  copyBtn.setAttribute('size', 'small');
  copyBtn.setAttribute('color', 'primary');
  copyBtn.innerHTML = '<ion-icon name="copy-outline"></ion-icon>';
  item.appendChild(copyBtn);

  content.appendChild(item);

  // Info note
  if (showInfo) {
    const note = document.createElement('ion-note');
    note.style.cssText = 'display: block; margin-top: 16px; font-size: 13px; line-height: 1.5;';
    note.textContent = `Only send ${currency} to this address. Sending other assets may result in permanent loss.`;
    content.appendChild(note);
  }

  card.appendChild(content);
  return card;
}

function buildCodeString({ mode = 'light', currency = 'BTC', address = '', showInfo = true }) {
  const darkStyle = mode === 'dark'
    ? ' style="--background: var(--bsdex-dark-tint);" color="dark"'
    : '';

  const darkItemBg = mode === 'dark'
    ? '\n      style="--background: var(--bsdex-dark-base); --color: #fff;"'
    : '';

  const infoBlock = showInfo
    ? `\n  <ion-note style="display: block; margin-top: 16px; font-size: 13px;">\n    Only send ${currency} to this address. Sending other assets may result in permanent loss.\n  </ion-note>`
    : '';

  return `<ion-card${darkStyle}>
  <ion-card-header>
    <ion-card-title>Deposit ${currency}</ion-card-title>
  </ion-card-header>

  <ion-card-content>
    <div class="bsdex-deposit__qr">QR Code</div>

    <ion-item lines="none"${darkItemBg}>
      <ion-label style="font-family: monospace; font-size: 13px; word-break: break-all; white-space: normal;">
        ${address}
      </ion-label>
      <ion-button slot="end" fill="clear" size="small">
        <ion-icon name="copy-outline"></ion-icon>
      </ion-button>
    </ion-item>${infoBlock}
  </ion-card-content>
</ion-card>`;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const BTCLight = {
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding: 16px;';
    wrapper.appendChild(createDepositCard(args));
    wrapper.appendChild(createCodeSnippet(buildCodeString(args)));
    return wrapper;
  },
  args: {
    mode: 'light',
    currency: 'BTC',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    showInfo: true,
  },
};

export const BTCDark = {
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding: 16px; background: #191c1d; border-radius: 8px;';
    wrapper.appendChild(createDepositCard(args));
    wrapper.appendChild(createCodeSnippet(buildCodeString(args)));
    return wrapper;
  },
  args: {
    mode: 'dark',
    currency: 'BTC',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    showInfo: true,
  },
};

export const ETHLight = {
  render: (args) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'padding: 16px;';
    wrapper.appendChild(createDepositCard(args));
    wrapper.appendChild(createCodeSnippet(buildCodeString(args)));
    return wrapper;
  },
  args: {
    mode: 'light',
    currency: 'ETH',
    address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
    showInfo: false,
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
          name: 'currency',
          type: 'string',
          default: "'BTC'",
          description: 'The cryptocurrency symbol displayed in the title and info note.',
        },
        {
          name: 'address',
          type: 'string',
          default: '-',
          description: 'The wallet address shown in the deposit card.',
        },
        {
          name: 'showInfo',
          type: 'boolean',
          default: 'true',
          description: 'Whether to display the warning note below the address.',
        },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background color of the ion-card. Override for dark mode.' },
        { name: '--color', description: 'Text color inside the card.' },
        { name: '--ion-item-background', description: 'Background of the address ion-item row.' },
      ],
    });
  },
};
