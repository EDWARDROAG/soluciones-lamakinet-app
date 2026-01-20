// js/pages/profile.js
import { requireAuth } from '../utils/guard.js';
import { getProfile, updateProfile } from '../services/user.service.js';

(function () {
  const form = document.getElementById('profile-form');
  if (!form) return; 

  requireAuth();

  const msg = document.getElementById('profile-msg');

  const inputFirstName = document.getElementById('profile-name');
  const inputLastName  = document.getElementById('profile-lastname');
  const inputEmail     = document.getElementById('profile-email');
  const inputPhone     = document.getElementById('profile-phone');

  async function loadProfile() {
    try {
      msg.hidden = true;

      const user = await getProfile();

      inputFirstName.value = user.firstName || '';
      inputLastName.value  = user.lastName || '';
      inputEmail.value     = user.email || '';
      inputPhone.value     = user.phone || '';

    } catch (err) {
      msg.textContent = err.message || 'Error al cargar perfil';
      msg.hidden = false;
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.hidden = true;

    const payload = {
      firstName: inputFirstName.value.trim(),
      lastName: inputLastName.value.trim(),
      phone: inputPhone.value.trim()
    };

    try {
      await updateProfile(payload);
      msg.textContent = 'Perfil actualizado correctamente';
      msg.hidden = false;
    } catch (err) {
      msg.textContent = err.message || 'Error al guardar perfil';
      msg.hidden = false;
    }
  });

  loadProfile();
})();
