/*===== MENU SHOW Y HIDDEN =====*/
document.addEventListener('DOMContentLoaded', () => {
    // NAV MENU SHOW/HIDE
    const navMenu = document.getElementById('nav-menu');
    const toggleMenu = document.getElementById('nav-toggle');
    const closeMenu = document.getElementById('nav-close');

    if(toggleMenu && navMenu){
        toggleMenu.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    if(closeMenu && navMenu){
        closeMenu.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    }

    // MOUSEMOVE HOME IMG
    document.addEventListener('mousemove', move);
    function move(e){
        document.querySelectorAll('.move').forEach(layer =>{
            const speed = layer.getAttribute('data-speed');

            const x = (window.innerWidth - e.pageX*speed)/120;
            const y = (window.innerHeight - e.pageY*speed)/120;

            layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }

    // GSAP ANIMATION
    // NAV
    gsap.from('.nav__logo, .nav__toggle', {opacity: 0, duration: 1, delay:2, y: 10});
    gsap.from('.nav__item', {opacity: 0, duration: 1, delay: 2.1, y: 30, stagger: 0.2,});

    // HOME
    gsap.from('.home__title', {opacity: 0, duration: 1, delay:1.6, y: 30});
    gsap.from('.home__description', {opacity: 0, duration: 1, delay:1.8, y: 30});
    gsap.from('.home__button', {opacity: 0, duration: 1, delay:2.1, y: 30});
    gsap.from('.home__img', {opacity: 0, duration: 1, delay:1.3, y: 30});

    // FEATURED RECIPES
    gsap.from('.section-title', {opacity: 0, duration: 1, delay: 2.5, y: 30});
    gsap.from('.card', {opacity: 0, duration: 1, delay: 2.7, y: 30, stagger: 0.3});

    // BUTTON HOVER ANIMATION
    const button = document.querySelector('.home__button');
    if(button){
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {scale: 1.1, duration: 0.3, ease: "power1.out"});
        });
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {scale: 1, duration: 0.3, ease: "power1.out"});
        });
    }

    // THEME TOGGLE
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIconClass = 'bx bx-moon';
    const sunIconClass = 'bx bx-sun';

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'light'){
        body.classList.add('light-theme');
        if(themeToggleBtn){
            themeToggleBtn.querySelector('i').className = sunIconClass;
        }
    } else {
        if(themeToggleBtn){
            themeToggleBtn.querySelector('i').className = moonIconClass;
        }
    }

    if(themeToggleBtn){
        themeToggleBtn.addEventListener('click', () => {
            console.log('Theme toggle clicked');
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            themeToggleBtn.querySelector('i').className = isLight ? sunIconClass : moonIconClass;
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });

        // Add floating animation to toggle button
        gsap.to(themeToggleBtn, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }

    // Add floating animation to login button
    const loginButton = document.querySelector('.login-button');
    if(loginButton){
        gsap.to(loginButton, {
            y: -8,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: 0.5
        });

        // Add hover scale animation
        loginButton.addEventListener('mouseenter', () => {
            gsap.to(loginButton, {scale: 1.1, duration: 0.3, ease: "power1.out"});
        });
        loginButton.addEventListener('mouseleave', () => {
            gsap.to(loginButton, {scale: 1, duration: 0.3, ease: "power1.out"});
        });
    }
});

/*===== MOUSEMOVE HOME IMG =====*/
document.addEventListener('mousemove', move);
function move(e){
    this.querySelectorAll('.move').forEach(layer =>{
        const speed = layer.getAttribute('data-speed')

        const x = (window.innerWidth - e.pageX*speed)/120
        const y = (window.innerHeight - e.pageY*speed)/120

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}

/*===== GSAP ANIMATION =====*/
// NAV
gsap.from('.nav__logo, .nav__toggle', {opacity: 0, duration: 1, delay:2, y: 10})
gsap.from('.nav__item', {opacity: 0, duration: 1, delay: 2.1, y: 30, stagger: 0.2,})

// HOME
gsap.from('.home__title', {opacity: 0, duration: 1, delay:1.6, y: 30})
gsap.from('.home__description', {opacity: 0, duration: 1, delay:1.8, y: 30})
gsap.from('.home__button', {opacity: 0, duration: 1, delay:2.1, y: 30})
gsap.from('.home__img', {opacity: 0, duration: 1, delay:1.3, y: 30})

// FEATURED RECIPES
gsap.from('.section-title', {opacity: 0, duration: 1, delay: 2.5, y: 30})
gsap.from('.card', {opacity: 0, duration: 1, delay: 2.7, y: 30, stagger: 0.3})

// BUTTON HOVER ANIMATION
const button = document.querySelector('.home__button');
button.addEventListener('mouseenter', () => {
    gsap.to(button, {scale: 1.1, duration: 0.3, ease: "power1.out"});
});
button.addEventListener('mouseleave', () => {
    gsap.to(button, {scale: 1, duration: 0.3, ease: "power1.out"});
});

console.log('main.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    // THEME TOGGLE
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const moonIconClass = 'bx bx-moon';
    const sunIconClass = 'bx bx-sun';

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'light'){
        body.classList.add('light-theme');
        themeToggleBtn.querySelector('i').className = sunIconClass;
    } else {
        themeToggleBtn.querySelector('i').className = moonIconClass;
    }

    themeToggleBtn.addEventListener('click', () => {
        alert('Toggle clicked');
        console.log('Theme toggle clicked');
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        themeToggleBtn.querySelector('i').className = isLight ? sunIconClass : moonIconClass;
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
});
