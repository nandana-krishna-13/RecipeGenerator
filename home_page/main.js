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

document.addEventListener('DOMContentLoaded', function () {
    const mainButton = document.querySelector('.home__button');
    const floatingButton = document.querySelector('.get-started-button');

    // Initially hide the floating button
    floatingButton.style.display = 'none';

    window.addEventListener('scroll', function () {
        const mainButtonPosition = mainButton.getBoundingClientRect().bottom;
        const aboutSection = document.getElementById('about');
        const aboutRect = aboutSection.getBoundingClientRect();

        const isAboutInView = aboutRect.top <= window.innerHeight && aboutRect.bottom >= 0;

        if (mainButtonPosition < 0 || isAboutInView) {
            // Show floating button when main button scrolls out of view or about section is in view
            floatingButton.style.display = 'flex';
        } else {
            // Hide floating button otherwise
            floatingButton.style.display = 'none';
        }
    });

    // Add 3D tilt effect to about section images
    const aboutImages = document.querySelectorAll('.about__image');
    console.log('About images found:', aboutImages.length);

    aboutImages.forEach(image => {
        console.log('Attaching event listeners to image:', image);
        image.style.transition = 'transform 0.2s ease';

        image.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            const rotateX = deltaY * 10; // max 10 degrees rotation
            const rotateY = deltaX * 10;

            image.style.transform = `perspective(500px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
        });

        image.addEventListener('mouseleave', () => {
            image.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
});
