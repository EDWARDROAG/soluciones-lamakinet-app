import { getMyProfile, updateProfile } from '../services/user.service.js';
import { setSessionUser } from '../utils/storage.js';

(function () {
  const btnProfile = document.getElementById('btn-profile');
  const modal = document.getElementById('profile-modal');
  const btnClose = document.getElementById('btn-close-profile');

  const form = document.getElementById('profile-form');
  const msg = document.getElementById('profile-msg');

  if (!btnProfile || !modal || !form) return;

  const inputFirstName = document.getElementById('profile-name');
  const inputLastName  = document.getElementById('profile-lastname');
  const inputEmail     = document.getElementById('profile-email');
  const inputPhone     = document.getElementById('profile-phone');

  // =========================
  // Abrir modal y cargar datos
  // =========================
  btnProfile.addEventListener('click', async () => {
    console.log('CLICK EN MIS DATOS');
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    msg.hidden = true;

    try {
      console.log('ANTES DE getMyProfile'); // 👈 prueba 2
      const user = await getMyProfile();
      console.log('RESPUESTA getMyProfile:', user); // 👈 prueba 3

      inputFirstName.value = user.firstName || '';
      inputLastName.value  = user.lastName || '';
      inputEmail.value     = user.email || '';
      inputPhone.value     = user.phone || '';
    } catch (err) {
      msg.textContent = err.message || 'Error al cargar datos';
      msg.hidden = false;
    }
  });

  // =========================
  // Cerrar modal
  // =========================
  btnClose?.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  });

  // =========================
  // Guardar cambios
  // =========================
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.hidden = true;

    const payload = {
      firstName: inputFirstName.value.trim(),
      lastName: inputLastName.value.trim(),
      phone: inputPhone.value.trim()
    };

    try {
      const updatedUser = await updateProfile(payload);

      // 🔁 actualizar estado de sesión
      setSessionUser(updatedUser);

      // 🔔 notificar a toda la UI (navbar, etc.)
      document.dispatchEvent(
        new CustomEvent('userUpdated', { detail: updatedUser })
      );

      msg.textContent = 'Datos actualizados correctamente';
      msg.hidden = false;
    } catch (err) {
      msg.textContent = err.message || 'Error al guardar';
      msg.hidden = false;
    }
  });
})();
