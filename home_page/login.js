document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous errors
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    const email = this.email.value.trim();
    const password = this.password.value.trim();

    let valid = true;

    if (email === '') {
        document.getElementById('emailError').textContent = 'Please enter your email.';
        valid = false;
    }

    if (password === '') {
        document.getElementById('passwordError').textContent = 'Please enter your password.';
        valid = false;
    }

    if (valid) {
        alert('Login successful! (Demo)');
        window.location.href = 'index.html';
        this.reset();
    }
});

// Toggle password visibility
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('bx-show');
    togglePassword.classList.toggle('bx-hide');
});
