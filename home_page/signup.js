// signup.js

document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // prevent form reload
  const name = document.getElementById('name').value.trim()
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert('✅ Signup successful!');
      localStorage.setItem('userId', data.userId); // optional: save user ID
      window.location.href = 'login.html'; // redirect to login or profile
    } else {
      alert('❌ ' + data.message);
    }
  } catch (err) {
    console.error('Signup error:', err);
    alert('❌ Server error during signup');
  }
});
