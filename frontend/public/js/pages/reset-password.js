import { resetPassword } from '../services/auth.service.js';

const form = document.getElementById('reset-form');
const msg = document.getElementById('msg');

const params = new URLSearchParams(window.location.search);
const token = params.get('token');

if (!token) {
  msg.textContent = 'Token inválido o ausente';
  msg.hidden = false;
  form.style.display = 'none';
} else {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.hidden = true;

    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm').value;

    if (password !== confirm) {
      msg.textContent = 'Las contraseñas no coinciden';
      msg.hidden = false;
      return;
    }

    try {
      await resetPassword(token, password);
      msg.textContent = 'Contraseña actualizada correctamente';
      msg.hidden = false;

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    } catch (err) {
      msg.textContent = err.message || 'El enlace es inválido o expiró';
      msg.hidden = false;
    }
  });
}
