document.getElementById('loginForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  // Clear previous error messages
  document.getElementById('emailError').textContent = '';
  document.getElementById('passwordError').textContent = '';

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  let valid = true;

  if (email === '') {
    document.getElementById('emailError').textContent = 'Please enter your email.';
    valid = false;
  }

  if (password === '') {
    document.getElementById('passwordError').textContent = 'Please enter your password.';
    valid = false;
  }

  if (!valid) return;

  try {
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      alert('✅ Login successful!');
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userName', data.name); 
      
      

      // Optional: save token to localStorage and redirect
      window.location.href = 'index.html';
    } else {
      alert(`❌ ${data.message}`);
    }
  } catch (err) {
    alert('❌ Server error');
    console.error(err);
  }
});

// Password visibility toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  togglePassword.classList.toggle('bx-show');
  togglePassword.classList.toggle('bx-hide');
});


