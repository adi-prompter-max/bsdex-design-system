import './Pagination.css';

export default {
  title: 'Components/Pagination',
  tags: ['autodocs'],
  argTypes: {
    totalPages: { control: { type: 'number', min: 1, max: 20 } },
    currentPage: { control: { type: 'number', min: 1, max: 20 } },
    mode: { control: 'select', options: ['light', 'dark'] },
  },
};

const arrowLeft = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4l-4 4 4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const arrowRight = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const createPagination = ({ totalPages, currentPage, mode = 'light' }) => {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = mode === 'dark' ? 'background: #191c1d; padding: 16px; border-radius: 8px; display: inline-block;' : 'display: inline-block;';

  const nav = document.createElement('nav');
  nav.className = `bsdex-pagination${mode === 'dark' ? ' bsdex-pagination--dark' : ''}`;

  const prevBtn = document.createElement('button');
  prevBtn.className = 'bsdex-pagination__item bsdex-pagination__arrow';
  prevBtn.innerHTML = arrowLeft;
  if (currentPage === 1) prevBtn.disabled = true;
  nav.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = `bsdex-pagination__item${i === currentPage ? ' bsdex-pagination__item--active' : ''}`;
    btn.textContent = i;
    nav.appendChild(btn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.className = 'bsdex-pagination__item bsdex-pagination__arrow';
  nextBtn.innerHTML = arrowRight;
  if (currentPage === totalPages) nextBtn.disabled = true;
  nav.appendChild(nextBtn);

  wrapper.appendChild(nav);
  return wrapper;
};

export const Default = {
  render: (args) => createPagination(args),
  args: { totalPages: 5, currentPage: 1, mode: 'light' },
};

export const MiddlePage = {
  render: (args) => createPagination(args),
  args: { totalPages: 5, currentPage: 3, mode: 'light' },
};

export const LastPage = {
  render: (args) => createPagination(args),
  args: { totalPages: 5, currentPage: 5, mode: 'light' },
};

export const DarkDefault = {
  render: (args) => createPagination(args),
  args: { totalPages: 5, currentPage: 1, mode: 'dark' },
};

export const DarkMiddlePage = {
  render: (args) => createPagination(args),
  args: { totalPages: 5, currentPage: 3, mode: 'dark' },
};
