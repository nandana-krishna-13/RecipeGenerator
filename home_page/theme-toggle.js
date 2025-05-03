document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIconClass = 'bx bx-moon';
    const sunIconClass = 'bx bx-sun';

    if(themeToggleBtn){
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('theme');
        if(savedTheme === 'light'){
            body.classList.add('light-theme');
            themeToggleBtn.querySelector('i').className = sunIconClass;
        } else {
            themeToggleBtn.querySelector('i').className = moonIconClass;
        }

        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            themeToggleBtn.querySelector('i').className = isLight ? sunIconClass : moonIconClass;
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });

        // Add floating animation to toggle button
        if(typeof gsap !== 'undefined'){
            gsap.to(themeToggleBtn, {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }
    }
});
