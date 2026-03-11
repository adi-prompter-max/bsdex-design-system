import './Pagination.css';
import { createCodeSnippet } from '../../helpers/code-snippet';
import { createApiTable } from '../../helpers/api-table';

export default {
  title: 'Components/Pagination',
  tags: ['autodocs'],
  argTypes: {
    totalPages: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Total number of pages',
    },
    currentPage: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'The currently active page (1-based)',
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

/**
 * Create a pagination component using ion-button and ion-icon elements.
 */
function createPagination({ totalPages = 5, currentPage = 1, mode = 'light' }) {
  const wrapper = document.createElement('div');
  if (mode === 'dark') {
    wrapper.style.cssText = 'background: #191c1d; padding: 16px; border-radius: 8px; display: inline-block;';
  } else {
    wrapper.style.cssText = 'display: inline-block;';
  }

  const nav = document.createElement('div');
  nav.style.cssText = 'display: flex; align-items: center; gap: 4px;';

  // Previous button
  const prevBtn = document.createElement('ion-button');
  prevBtn.setAttribute('fill', 'clear');
  prevBtn.setAttribute('size', 'small');
  if (currentPage === 1) prevBtn.setAttribute('disabled', '');
  if (mode === 'dark') prevBtn.style.setProperty('--color', '#ffffff');

  const prevIcon = document.createElement('ion-icon');
  prevIcon.setAttribute('slot', 'icon-only');
  prevIcon.setAttribute('name', 'chevron-back');
  prevBtn.appendChild(prevIcon);
  nav.appendChild(prevBtn);

  // Page number buttons
  const pageButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('ion-button');
    btn.setAttribute('size', 'small');

    if (i === currentPage) {
      btn.setAttribute('fill', 'solid');
      btn.setAttribute('color', 'primary');
      btn.style.setProperty('--background', 'var(--bsdex-primary-base)');
      btn.style.setProperty('--color', '#ffffff');
      btn.style.setProperty('--border-radius', 'var(--bsdex-radius-sm, 4px)');
    } else {
      btn.setAttribute('fill', 'clear');
      if (mode === 'dark') {
        btn.style.setProperty('--color', '#ffffff');
      } else {
        btn.style.setProperty('--color', 'var(--bsdex-dark-base)');
      }
    }

    btn.textContent = String(i);
    pageButtons.push(btn);

    btn.addEventListener('click', () => {
      pageButtons.forEach((b) => {
        b.setAttribute('fill', 'clear');
        b.removeAttribute('color');
        b.style.removeProperty('--background');
        if (mode === 'dark') {
          b.style.setProperty('--color', '#ffffff');
        } else {
          b.style.setProperty('--color', 'var(--bsdex-dark-base)');
        }
      });
      btn.setAttribute('fill', 'solid');
      btn.setAttribute('color', 'primary');
      btn.style.setProperty('--background', 'var(--bsdex-primary-base)');
      btn.style.setProperty('--color', '#ffffff');
      btn.style.setProperty('--border-radius', 'var(--bsdex-radius-sm, 4px)');

      prevBtn.disabled = (i === 1);
      nextBtn.disabled = (i === totalPages);
    });

    nav.appendChild(btn);
  }

  // Next button
  const nextBtn = document.createElement('ion-button');
  nextBtn.setAttribute('fill', 'clear');
  nextBtn.setAttribute('size', 'small');
  if (currentPage === totalPages) nextBtn.setAttribute('disabled', '');
  if (mode === 'dark') nextBtn.style.setProperty('--color', '#ffffff');

  const nextIcon = document.createElement('ion-icon');
  nextIcon.setAttribute('slot', 'icon-only');
  nextIcon.setAttribute('name', 'chevron-forward');
  nextBtn.appendChild(nextIcon);
  nav.appendChild(nextBtn);

  // Arrow click handlers
  prevBtn.addEventListener('click', () => {
    const activeIdx = pageButtons.findIndex((b) => b.getAttribute('fill') === 'solid');
    if (activeIdx > 0) pageButtons[activeIdx - 1].click();
  });
  nextBtn.addEventListener('click', () => {
    const activeIdx = pageButtons.findIndex((b) => b.getAttribute('fill') === 'solid');
    if (activeIdx < pageButtons.length - 1) pageButtons[activeIdx + 1].click();
  });

  wrapper.appendChild(nav);
  return wrapper;
}

/**
 * Build the Ionic markup string for code snippet display.
 */
function buildCodeString({ totalPages = 5, currentPage = 1 }) {
  let code = `<div style="display: flex; align-items: center; gap: 4px;">`;
  code += `\n  <ion-button fill="clear" size="small"${currentPage === 1 ? ' disabled' : ''}>`;
  code += `\n    <ion-icon slot="icon-only" name="chevron-back"></ion-icon>`;
  code += `\n  </ion-button>`;

  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      code += `\n  <ion-button fill="solid" color="primary" size="small">${i}</ion-button>`;
    } else {
      code += `\n  <ion-button fill="clear" size="small">${i}</ion-button>`;
    }
  }

  code += `\n  <ion-button fill="clear" size="small"${currentPage === totalPages ? ' disabled' : ''}>`;
  code += `\n    <ion-icon slot="icon-only" name="chevron-forward"></ion-icon>`;
  code += `\n  </ion-button>`;
  code += `\n</div>`;
  return code;
}

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default = {
  render: (args) => {
    const container = createPagination(args);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { totalPages: 5, currentPage: 1, mode: 'light' },
};

export const MiddlePage = {
  render: (args) => {
    const container = createPagination(args);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { totalPages: 5, currentPage: 3, mode: 'light' },
};

export const LastPage = {
  render: (args) => {
    const container = createPagination(args);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { totalPages: 5, currentPage: 5, mode: 'light' },
};

export const DarkDefault = {
  render: (args) => {
    const container = createPagination(args);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { totalPages: 5, currentPage: 1, mode: 'dark' },
};

export const DarkMiddlePage = {
  render: (args) => {
    const container = createPagination(args);
    container.appendChild(createCodeSnippet(buildCodeString(args)));
    return container;
  },
  args: { totalPages: 5, currentPage: 3, mode: 'dark' },
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
          type: "'solid' | 'clear'",
          default: "'clear'",
          description: 'Set the fill style of page buttons. Active page uses "solid", inactive pages use "clear".',
        },
        {
          name: 'color',
          type: "'primary'",
          default: "'primary'",
          description: 'The color applied to the active page button.',
        },
        {
          name: 'size',
          type: "'small' | 'default' | 'large'",
          default: "'small'",
          description: 'Size of the pagination buttons.',
        },
        {
          name: 'disabled',
          type: 'boolean',
          default: 'false',
          description: 'If true, the navigation arrow button cannot be clicked. Applied to previous arrow on first page, next arrow on last page.',
        },
      ],
      cssCustomProperties: [
        { name: '--background', description: 'Background color of the active page button.' },
        { name: '--color', description: 'Text/icon color of the page and arrow buttons.' },
        { name: '--border-radius', description: 'Border radius of the active page button.' },
      ],
    });
  },
};
