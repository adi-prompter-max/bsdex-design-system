import './CryptoAuszahlen.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Auszahlen (Withdraw)',
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'select', options: ['light', 'dark'], description: 'Light or dark theme' },
    currency: { control: 'text', description: 'The cryptocurrency symbol (e.g. BTC, ETH)' },
    balance: { control: 'text', description: 'Available balance to display' },
    showInfo: { control: 'boolean', description: 'Show network fee info note' },
    confirmed: { control: 'boolean', description: 'Whether the confirmation checkbox is checked' },
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Build the withdraw card using Ionic web components.
 */
function createWithdraw({ mode, currency, balance, showInfo, confirmed = false }) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'width: 420px;';

  // -- ion-card --
  const card = document.createElement('ion-card');
  card.className = `withdraw-card withdraw-card--${mode}`;
  if (mode === 'dark') {
    card.style.cssText = '--background: var(--bsdex-dark-tint, #1e2224); --color: #ffffff;';
  } else {
    card.style.cssText = '--background: var(--bsdex-surface, #ffffff); --color: var(--bsdex-dark-base, #1a1a1a);';
  }

  // -- ion-card-header with title --
  const header = document.createElement('ion-card-header');
  const title = document.createElement('ion-card-title');
  title.textContent = `Withdraw ${currency}`;
  if (mode === 'dark') {
    title.style.color = '#ffffff';
  }
  header.appendChild(title);
  card.appendChild(header);

  // -- ion-card-content --
  const content = document.createElement('ion-card-content');
  content.style.cssText = 'display: flex; flex-direction: column; gap: 16px;';

  // Balance row
  const balanceItem = document.createElement('ion-item');
  balanceItem.setAttribute('lines', 'none');
  balanceItem.style.cssText = '--background: transparent; --padding-start: 0; --inner-padding-end: 0;';

  const balanceLabel = document.createElement('ion-label');
  balanceLabel.textContent = 'Available balance';
  balanceLabel.style.cssText = 'font-size: 14px; color: var(--bsdex-medium-base, #6b7280);';
  balanceItem.appendChild(balanceLabel);

  const balanceNote = document.createElement('ion-note');
  balanceNote.slot = 'end';
  balanceNote.textContent = `${balance} ${currency}`;
  balanceNote.style.cssText = `font-size: 15px; font-weight: 600; color: ${mode === 'dark' ? '#ffffff' : 'var(--bsdex-dark-base, #1a1a1a)'};`;
  balanceItem.appendChild(balanceNote);
  content.appendChild(balanceItem);

  // Wallet address input
  const addressInput = document.createElement('ion-input');
  addressInput.setAttribute('fill', 'outline');
  addressInput.setAttribute('label-placement', 'stacked');
  addressInput.setAttribute('label', 'Wallet address');
  addressInput.setAttribute('placeholder', `Enter ${currency} address`);
  if (mode === 'dark') {
    addressInput.style.cssText = '--background: var(--bsdex-dark-base, #191c1d); --color: #ffffff; --border-color: var(--bsdex-medium-shade, #4a5568); --highlight-color-focused: var(--bsdex-primary-base);';
  }
  content.appendChild(addressInput);

  // Amount input + Use max button
  const amountGroup = document.createElement('div');
  amountGroup.style.cssText = 'display: flex; flex-direction: column; gap: 4px;';

  const amountInput = document.createElement('ion-input');
  amountInput.setAttribute('fill', 'outline');
  amountInput.setAttribute('label-placement', 'stacked');
  amountInput.setAttribute('label', 'Amount');
  amountInput.setAttribute('placeholder', '0.00');
  amountInput.setAttribute('type', 'number');
  if (mode === 'dark') {
    amountInput.style.cssText = '--background: var(--bsdex-dark-base, #191c1d); --color: #ffffff; --border-color: var(--bsdex-medium-shade, #4a5568); --highlight-color-focused: var(--bsdex-primary-base);';
  }
  amountGroup.appendChild(amountInput);

  const maxBtn = document.createElement('ion-button');
  maxBtn.setAttribute('fill', 'clear');
  maxBtn.setAttribute('size', 'small');
  maxBtn.textContent = 'Use max';
  maxBtn.style.cssText = 'align-self: flex-end; --color: var(--bsdex-primary-base); font-weight: 600; text-transform: none;';
  amountGroup.appendChild(maxBtn);

  content.appendChild(amountGroup);

  // Info note
  if (showInfo) {
    const infoNote = document.createElement('ion-note');
    infoNote.textContent = `Network fee: 0.0001 ${currency}. Withdrawals are processed within 30 minutes.`;
    infoNote.style.cssText = 'font-size: 13px; color: var(--bsdex-medium-base, #6b7280); line-height: 1.5; display: block;';
    content.appendChild(infoNote);
  }

  // Confirmation checkbox
  const checkbox = document.createElement('ion-checkbox');
  checkbox.checked = confirmed;
  checkbox.setAttribute('label-placement', 'end');
  checkbox.textContent = 'I confirm this withdrawal address is correct';
  checkbox.style.cssText = '--size: 20px; font-size: 13px;';
  if (mode === 'dark') {
    checkbox.style.cssText += ' color: var(--bsdex-medium-base, #9ca3af);';
  }
  content.appendChild(checkbox);

  // Submit button
  const submitBtn = document.createElement('ion-button');
  submitBtn.setAttribute('expand', 'block');
  submitBtn.setAttribute('fill', 'solid');
  submitBtn.setAttribute('color', 'primary');
  submitBtn.textContent = `Withdraw ${currency}`;
  submitBtn.style.cssText = '--border-radius: 999px; font-weight: 600; text-transform: none;';
  if (!confirmed) {
    submitBtn.disabled = true;
    submitBtn.style.cssText += ' opacity: 0.5;';
  }
  content.appendChild(submitBtn);

  card.appendChild(content);
  wrapper.appendChild(card);
  return wrapper;
}

/**
 * Build the Ionic markup string for code snippet display.
 */
function buildWithdrawCodeString({ currency, balance, showInfo, confirmed, mode }) {
  const darkStyle = mode === 'dark'
    ? '\n  style="--background: var(--bsdex-dark-tint); --color: #fff;"'
    : '';

  const infoSnippet = showInfo
    ? `\n    <ion-note>Network fee: 0.0001 ${currency}. Withdrawals are processed within 30 minutes.</ion-note>\n`
    : '';

  return `<ion-card${darkStyle}>
  <ion-card-header>
    <ion-card-title>Withdraw ${currency}</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    <ion-item lines="none">
      <ion-label>Available balance</ion-label>
      <ion-note slot="end">${balance} ${currency}</ion-note>
    </ion-item>

    <ion-input
      fill="outline"
      label-placement="stacked"
      label="Wallet address"
      placeholder="Enter ${currency} address"
    ></ion-input>

    <ion-input
      fill="outline"
      label-placement="stacked"
      label="Amount"
      placeholder="0.00"
      type="number"
    ></ion-input>
    <ion-button fill="clear" size="small">Use max</ion-button>
${infoSnippet}
    <ion-checkbox${confirmed ? ' checked' : ''} label-placement="end">
      I confirm this withdrawal address is correct
    </ion-checkbox>

    <ion-button
      expand="block"
      fill="solid"
      color="primary"${!confirmed ? '\n      disabled' : ''}
    >Withdraw ${currency}</ion-button>
  </ion-card-content>
</ion-card>`;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const BTCLight = {
  render: (args) => {
    const container = createWithdraw(args);
    container.appendChild(createCodeSnippet(buildWithdrawCodeString(args)));
    return container;
  },
  args: { mode: 'light', currency: 'BTC', balance: '0.05234', showInfo: true, confirmed: false },
};

export const BTCLightConfirmed = {
  render: (args) => {
    const container = createWithdraw(args);
    container.appendChild(createCodeSnippet(buildWithdrawCodeString(args)));
    return container;
  },
  args: { mode: 'light', currency: 'BTC', balance: '0.05234', showInfo: true, confirmed: true },
};

export const BTCDark = {
  render: (args) => {
    const container = createWithdraw(args);
    container.appendChild(createCodeSnippet(buildWithdrawCodeString(args)));
    return container;
  },
  args: { mode: 'dark', currency: 'BTC', balance: '0.05234', showInfo: true, confirmed: false },
};

export const BTCDarkConfirmed = {
  render: (args) => {
    const container = createWithdraw(args);
    container.appendChild(createCodeSnippet(buildWithdrawCodeString(args)));
    return container;
  },
  args: { mode: 'dark', currency: 'BTC', balance: '0.05234', showInfo: true, confirmed: true },
};

export const ETHLight = {
  render: (args) => {
    const container = createWithdraw(args);
    container.appendChild(createCodeSnippet(buildWithdrawCodeString(args)));
    return container;
  },
  args: { mode: 'light', currency: 'ETH', balance: '2.5000', showInfo: false, confirmed: false },
};

// ---------------------------------------------------------------------------
// API Documentation
// ---------------------------------------------------------------------------

export const API = {
  render: () => {
    return createApiTable({
      properties: [
        { name: 'currency', type: 'string', default: "'BTC'", description: 'Cryptocurrency symbol displayed in the title, balance, and submit button.' },
        { name: 'balance', type: 'string', default: '-', description: 'Available balance shown in the header row.' },
        { name: 'showInfo', type: 'boolean', default: 'true', description: 'Whether to show the network fee information note.' },
        { name: 'confirmed', type: 'boolean', default: 'false', description: 'Controls the confirmation checkbox state. Submit button is disabled when false.' },
        { name: 'mode', type: "'light' | 'dark'", default: "'light'", description: 'Visual theme applied to the card via CSS custom properties.' },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background color of the ion-card container.' },
        { name: '--color', description: 'Default text color inside the card.' },
        { name: '--border-color', description: 'Border color for ion-input fields (outline fill).' },
        { name: '--highlight-color-focused', description: 'Input border highlight color when focused.' },
        { name: '--border-radius', description: 'Border radius of the submit ion-button.' },
      ],
      shadowParts: [
        { name: 'native (ion-card)', description: 'The native card wrapper element.' },
        { name: 'native (ion-input)', description: 'The native input element inside ion-input.' },
        { name: 'native (ion-button)', description: 'The native button element inside ion-button.' },
        { name: 'container (ion-checkbox)', description: 'The checkbox mark container.' },
      ],
    });
  },
};
