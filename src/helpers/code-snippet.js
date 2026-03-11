/**
 * Code Snippet Helper
 *
 * Generates a styled, copy-able code block for Ionic component usage examples.
 */

const styles = `
  .code-snippet {
    margin-top: 24px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
    font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace;
  }

  .code-snippet__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px;
    background: #f7fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .code-snippet__label {
    font-size: 12px;
    font-weight: 600;
    color: #718096;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .code-snippet__copy-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    font-size: 12px;
    font-weight: 500;
    color: #4a5568;
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.15s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  .code-snippet__copy-btn:hover {
    background: #edf2f7;
    border-color: #cbd5e0;
    color: #2d3748;
  }

  .code-snippet__copy-btn--copied {
    color: #38a169;
    border-color: #c6f6d5;
    background: #f0fff4;
  }

  .code-snippet__body {
    padding: 16px;
    margin: 0;
    background: #1a202c;
    overflow-x: auto;
  }

  .code-snippet__code {
    font-size: 13px;
    line-height: 1.6;
    color: #e2e8f0;
    white-space: pre;
    tab-size: 2;
  }
`;

let stylesInjected = false;

function injectStyles() {
  if (stylesInjected) return;
  const styleEl = document.createElement('style');
  styleEl.setAttribute('data-code-snippet', '');
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);
  stylesInjected = true;
}

/**
 * Escapes HTML entities for safe display in a code block.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Creates a code snippet section with copy functionality.
 *
 * @param {string} ionicCode - The Ionic component code to display
 * @param {object} [options]
 * @param {string} [options.label='Code'] - Label shown in the snippet header
 * @returns {HTMLElement}
 */
export function createCodeSnippet(ionicCode, options = {}) {
  const { label = 'Code' } = options;

  injectStyles();

  const container = document.createElement('div');
  container.className = 'code-snippet';

  const copyId = `copy-btn-${Math.random().toString(36).slice(2, 9)}`;

  container.innerHTML = `
    <div class="code-snippet__header">
      <span class="code-snippet__label">${escapeHtml(label)}</span>
      <button class="code-snippet__copy-btn" id="${copyId}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <span>Copy</span>
      </button>
    </div>
    <pre class="code-snippet__body"><code class="code-snippet__code">${escapeHtml(ionicCode.trim())}</code></pre>
  `;

  // Attach copy handler after insertion
  requestAnimationFrame(() => {
    const btn = document.getElementById(copyId);
    if (!btn) return;

    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(ionicCode.trim());
        btn.classList.add('code-snippet__copy-btn--copied');
        btn.querySelector('span').textContent = 'Copied!';

        setTimeout(() => {
          btn.classList.remove('code-snippet__copy-btn--copied');
          btn.querySelector('span').textContent = 'Copy';
        }, 2000);
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = ionicCode.trim();
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        btn.querySelector('span').textContent = 'Copied!';
        setTimeout(() => {
          btn.querySelector('span').textContent = 'Copy';
        }, 2000);
      }
    });
  });

  return container;
}
