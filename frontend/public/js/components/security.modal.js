// js/components/security.modal.js
import { changePassword } from '../services/auth.service.js';
import { clearSession } from '../utils/storage.js';

(function () {
  const btn = document.getElementById('btn-change-password');

  // ⛔ Este módulo NO aplica si el botón no existe
  if (!btn) {
    console.warn('⚠️ security.modal.js no aplica para este usuario');
    return; // ✅ AHORA SÍ ES VÁLIDO
  }

  btn.addEventListener('click', async () => {
    const msg = document.getElementById('security-msg');

    const currentPassword =
      document.getElementById('current-password')?.value;
    const newPassword =
      document.getElementById('new-password')?.value;
    const confirm =
      document.getElementById('confirm-new-password')?.value;

    msg.hidden = true;

    if (!currentPassword || !newPassword || !confirm) {
      msg.textContent = 'Todos los campos son obligatorios';
      msg.hidden = false;
      return;
    }

    if (newPassword !== confirm) {
      msg.textContent = 'Las contraseñas no coinciden';
      msg.hidden = false;
      return;
    }

    try {
      await changePassword(currentPassword, newPassword);

      msg.textContent =
        'Contraseña actualizada. Debes iniciar sesión nuevamente.';
      msg.hidden = false;

      clearSession();
      setTimeout(() => window.location.reload(), 1500);

    } catch (err) {
      msg.textContent =
        err?.message || 'No fue posible cambiar la contraseña';
      msg.hidden = false;
    }
  });
})();
