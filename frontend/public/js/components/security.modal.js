// js/components/security.modal.js
import { changePassword } from '../services/auth.service.js';

(function () {
  const form = document.getElementById('security-form');
  if (!form) return;

  const msg = document.getElementById('security-msg');

  const currentInput = document.getElementById('current-password');
  const newInput = document.getElementById('new-password');
  const confirmInput = document.getElementById('confirm-new-password');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.hidden = true;

    const currentPassword = currentInput.value.trim();
    const newPassword = newInput.value.trim();
    const confirmPassword = confirmInput.value.trim();

    // Validaciones
    if (!currentPassword || !newPassword || !confirmPassword) {
      msg.textContent = 'Todos los campos son obligatorios';
      msg.hidden = false;
      return;
    }

    if (newPassword.length < 6) {
      msg.textContent = 'La nueva contraseña debe tener al menos 6 caracteres';
      msg.hidden = false;
      return;
    }

    if (newPassword !== confirmPassword) {
      msg.textContent = 'Las contraseñas no coinciden';
      msg.hidden = false;
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);

      msg.textContent = 'Contraseña actualizada correctamente';
      msg.hidden = false;

      form.reset();
    } catch (err) {
      msg.textContent = err.message || 'Error al cambiar contraseña';
      msg.hidden = false;
    }
  });
})();
