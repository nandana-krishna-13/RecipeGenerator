// Handle theme toggle
const themeToggleButton = document.getElementById('theme-toggle');
const logo = document.getElementById('nav-logo');

// Check the current theme and set the logo accordingly
function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme'); // Ensure only one theme is active
        logo.src = 'logo_light.png'; // Light logo for dark theme
    } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme'); // Ensure only one theme is active
        logo.src = 'logo_dark.png'; // Dark logo for light theme
    }
}

// Initialize theme based on system preference
const darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
applyTheme(darkThemeMediaQuery.matches ? 'dark' : 'light');

// Toggle theme on button click
themeToggleButton.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Handle "Get Started" button visibility on scroll
document.addEventListener('DOMContentLoaded', function () {
    const mainButton = document.querySelector('.home__button');
    const floatingButton = document.querySelector('.get-started-button');

    // Initially hide the floating button
    floatingButton.style.display = 'none';

    window.addEventListener('scroll', function () {
        const mainButtonPosition = mainButton.getBoundingClientRect().bottom;

        if (mainButtonPosition < 0) {
            // Show floating button when main button scrolls out of view
            floatingButton.style.display = 'flex';
        } else {
            // Hide floating button when main button is still visible
            floatingButton.style.display = 'none';
        }
    });
});
