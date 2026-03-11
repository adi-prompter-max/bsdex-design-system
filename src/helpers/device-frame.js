/**
 * Device Frame Helper
 *
 * Wraps story content in a mobile device simulator frame.
 * Supports iOS (iPhone) and Android device shapes.
 */

/**
 * Returns the current time formatted for a status bar display.
 * @returns {string}
 */
function getStatusBarTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

/**
 * Creates a status bar element for the device frame.
 * @param {'ios'|'md'} platform
 * @returns {string} HTML string
 */
function createStatusBar(platform) {
  const time = getStatusBarTime();

  if (platform === 'ios') {
    return `
      <div class="device-frame__status-bar">
        <div class="device-frame__status-bar-left">${time}</div>
        <div class="device-frame__status-bar-right">
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
            <rect x="0" y="6" width="3" height="6" rx="0.5"/>
            <rect x="4.5" y="4" width="3" height="8" rx="0.5"/>
            <rect x="9" y="1" width="3" height="11" rx="0.5"/>
            <rect x="13" y="0" width="3" height="12" rx="0.5"/>
          </svg>
          <svg width="15" height="12" viewBox="0 0 15 12" fill="currentColor">
            <path d="M7.5 3.6C9.3 3.6 10.9 4.3 12.1 5.4L13.5 4C11.9 2.5 9.8 1.6 7.5 1.6S3.1 2.5 1.5 4L2.9 5.4C4.1 4.3 5.7 3.6 7.5 3.6Z"/>
            <path d="M7.5 7.2C8.6 7.2 9.6 7.6 10.3 8.3L11.7 6.9C10.6 5.9 9.1 5.2 7.5 5.2S4.4 5.9 3.3 6.9L4.7 8.3C5.4 7.6 6.4 7.2 7.5 7.2Z"/>
            <circle cx="7.5" cy="10.5" r="1.5"/>
          </svg>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
            <rect x="0" y="1" width="22" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1"/>
            <rect x="22.5" y="4" width="2" height="4" rx="0.5"/>
            <rect x="1.5" y="2.5" width="17" height="7" rx="1"/>
          </svg>
        </div>
      </div>`;
  }

  // Android status bar
  return `
    <div class="device-frame__status-bar">
      <div class="device-frame__status-bar-left">${time}</div>
      <div class="device-frame__status-bar-right">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 2.4C7.3 2.4 8.5 2.9 9.4 3.7L10.5 2.6C9.3 1.5 7.7 0.8 6 0.8S2.7 1.5 1.5 2.6L2.6 3.7C3.5 2.9 4.7 2.4 6 2.4Z"/>
          <path d="M6 5.4C6.8 5.4 7.6 5.7 8.2 6.2L9.3 5.1C8.4 4.3 7.2 3.8 6 3.8S3.6 4.3 2.7 5.1L3.8 6.2C4.4 5.7 5.2 5.4 6 5.4Z"/>
          <circle cx="6" cy="8.5" r="1.2"/>
        </svg>
        <svg width="20" height="12" viewBox="0 0 20 12" fill="currentColor">
          <rect x="0" y="1.5" width="18" height="9" rx="1.5" fill="none" stroke="currentColor" stroke-width="1"/>
          <rect x="18.5" y="3.5" width="1.5" height="4" rx="0.5"/>
          <rect x="1.5" y="3" width="13" height="6" rx="0.5"/>
        </svg>
      </div>
    </div>`;
}

/**
 * Wraps content in a device frame.
 *
 * @param {string|HTMLElement} content - The story content (HTML string or element)
 * @param {'ios'|'md'} platform - The target platform ('ios' for iPhone, 'md' for Android)
 * @param {object} [options]
 * @param {'light'|'dark'} [options.theme='light'] - Color theme for the device frame
 * @returns {HTMLElement} A wrapper element containing the device frame
 */
export function wrapInDeviceFrame(content, platform, options = {}) {
  const { theme = 'light' } = options;

  const platformClass = platform === 'ios' ? 'device-frame--ios' : 'device-frame--android';
  const themeClass = theme === 'dark' ? 'device-frame--dark' : 'device-frame--light';
  const wrapperPlatformClass = platform === 'ios' ? 'device-frame-wrapper--ios' : 'device-frame-wrapper--android';

  const contentHtml = typeof content === 'string'
    ? content
    : content instanceof HTMLElement
      ? content.outerHTML
      : String(content);

  const notchOrPunchHole = platform === 'ios'
    ? '<div class="device-frame__notch"></div>'
    : '<div class="device-frame__punch-hole"></div>';

  const bottomElement = platform === 'ios'
    ? '<div class="device-frame__home-indicator"></div>'
    : '<div class="device-frame__nav-bar"><div class="device-frame__nav-bar-pill"></div></div>';

  const wrapper = document.createElement('div');
  wrapper.className = `device-frame-wrapper ${wrapperPlatformClass}`;
  wrapper.innerHTML = `
    <div class="device-frame ${platformClass} ${themeClass}">
      ${notchOrPunchHole}
      ${createStatusBar(platform)}
      <div class="device-frame__screen">
        <div class="device-frame__content">
          ${contentHtml}
        </div>
      </div>
      ${bottomElement}
    </div>
  `;

  return wrapper;
}
