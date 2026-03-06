import './Toast.css';

export default {
  title: 'Components/Toast',
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    type: { control: 'select', options: ['success', 'info', 'warning', 'danger'] },
  },
};

const icons = {
  success: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.2"/><path d="M6 10l3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  info: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.2"/><path d="M10 9v4M10 7h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  warning: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.2"/><path d="M10 7v4M10 13h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  danger: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.2"/><path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

const createToast = ({ message, type }) => {
  const toast = document.createElement('div');
  toast.className = `bsdex-toast bsdex-toast--${type}`;
  toast.innerHTML = `
    <span class="bsdex-toast__icon">${icons[type]}</span>
    <span class="bsdex-toast__message">${message}</span>
  `;
  return toast;
};

export const Success = {
  render: (args) => createToast(args),
  args: { message: 'Transaction completed successfully', type: 'success' },
};

export const Info = {
  render: (args) => createToast(args),
  args: { message: 'Your order has been placed', type: 'info' },
};

export const Warning = {
  render: (args) => createToast(args),
  args: { message: 'Network connection is unstable', type: 'warning' },
};

export const Danger = {
  render: (args) => createToast(args),
  args: { message: 'Failed to process transaction', type: 'danger' },
};

export const AllTypes = {
  render: () => {
    const container = document.createElement('div');
    container.style.cssText = 'display: flex; flex-direction: column; gap: 12px; max-width: 400px;';
    ['success', 'info', 'warning', 'danger'].forEach(type => {
      container.appendChild(createToast({ message: `This is a ${type} toast message`, type }));
    });
    return container;
  },
};
