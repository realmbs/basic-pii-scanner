import './styles/main.scss';

// initialize theme
document.documentElement.setAttribute('data-theme', 'dark');

// theme toggle logic
const themeToggle = document.getElementById('theme-toggle');
themeToggle?.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

console.log('test');