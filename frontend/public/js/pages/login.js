import { login } from '../services/auth.service.js';

const form = document.getElementById('login-form');
const error = document.getElementById('error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  error.hidden = true;

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  try {
    await login(email, password);
    window.location.href = 'profile.html';
  } catch (err) {
    error.textContent = err.message || 'Error al iniciar sesión';
    error.hidden = false;
  }
});
