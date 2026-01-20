import { forgotPassword } from '../services/auth.service.js';

const form = document.getElementById('forgot-form');
const msg = document.getElementById('forgot-msg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  msg.hidden = true;

  const email = document.getElementById('email').value.trim();

  try {
    await forgotPassword(email);
  } catch {
    // No revelamos errores por seguridad
  }

  msg.textContent =
    'Si el correo existe, recibirás un enlace para restablecer tu contraseña.';
  msg.hidden = false;

  form.reset();
});
