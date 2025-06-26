// explore_theme.js

const themeToggleBtn = document.getElementById('theme-toggle');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
  } else {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
  }
}

// Optional: Use system preference or localStorage
const savedTheme = localStorage.getItem('theme');
const darkMedia = window.matchMedia('(prefers-color-scheme: dark)');
applyTheme(savedTheme || (darkMedia.matches ? 'dark' : 'light'));

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});
