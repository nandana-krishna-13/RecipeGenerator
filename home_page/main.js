// Handle theme toggle
const themeToggleButton = document.getElementById('theme-toggle');
const logo = document.getElementById('nav-logo');

// Apply a theme and optionally update logo
function applyTheme(theme) {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    document.body.classList.toggle('light-theme', theme === 'light');

    // Update logo if it exists
    if (logo) {
        logo.src = theme === 'dark' ? 'logo_light.png' : 'logo_dark.png';
    }
}

// Apply saved theme or fallback to system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
applyTheme(initialTheme);

// Only setup toggle if the button is present (index.html)
if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);

        // Update toggle icon
        const icon = themeToggleButton.querySelector('i');
        if (icon) {
            if (newTheme === 'light') {
                icon.classList.remove('bx-moon');
                icon.classList.add('bx-sun');
            } else {
                icon.classList.remove('bx-sun');
                icon.classList.add('bx-moon');
            }
        }
    });
}

// On initial load, update toggle icon to match theme
document.addEventListener('DOMContentLoaded', () => {
    if (themeToggleButton) {
        const icon = themeToggleButton.querySelector('i');
        if (icon) {
            if (document.body.classList.contains('light-theme')) {
                icon.classList.remove('bx-moon');
                icon.classList.add('bx-sun');
            } else {
                icon.classList.remove('bx-sun');
                icon.classList.add('bx-moon');
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const mainButton = document.querySelector('.home__button');
    const floatingButton = document.querySelector('.get-started-button');

    if (mainButton && floatingButton) {
        // Initially hide the floating button
        floatingButton.style.display = 'none';

        window.addEventListener('scroll', function () {
            const mainButtonPosition = mainButton.getBoundingClientRect().bottom;
            const aboutSection = document.getElementById('about');
            const aboutRect = aboutSection ? aboutSection.getBoundingClientRect() : {};

            const isAboutInView = aboutSection &&
                aboutRect.top <= window.innerHeight &&
                aboutRect.bottom >= 0;

            if (mainButtonPosition < 0 || isAboutInView) {
                floatingButton.style.display = 'flex';
            } else {
                floatingButton.style.display = 'none';
            }
        });
    }

    // 3D tilt effect for about section images
    const aboutImages = document.querySelectorAll('.about__image');

    aboutImages.forEach(image => {
        image.style.transition = 'transform 0.2s ease';

        image.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            const rotateX = deltaY * 10;
            const rotateY = deltaX * 10;

            image.style.transform = `perspective(500px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
        });

        image.addEventListener('mouseleave', () => {
            image.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
    });
});
