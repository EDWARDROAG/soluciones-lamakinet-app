// js/utils/session.js
import {
  getToken,
  clearSession,
  getUser
} from './storage.js';

(function () {
  const btnLogin = document.getElementById('btn-login');
  const userBox = document.getElementById('user-box');
  const userToggle = document.getElementById('user-name');
  const userMenu = document.getElementById('user-menu');
  const btnLogout = document.getElementById('btn-logout');

  // Si no existe el header (por ejemplo en login.html), no hace nada
  if (!btnLogin || !userBox || !userToggle || !userMenu || !btnLogout) return;

  const token = getToken();

  // =====================
  // SIN SESIÓN
  // =====================
  if (!token) {
    btnLogin.style.display = 'inline-block';
    userBox.style.display = 'none';
    return;
  }

  // =====================
  // CON SESIÓN
  // =====================
  btnLogin.style.display = 'none';
  userBox.style.display = 'inline-block';

  // Mostrar nombre desde sesión (NO desde JWT)
  const sessionUser = getUser();

  if (sessionUser?.firstName) {
    userToggle.textContent = `Hola, ${sessionUser.firstName} ▼`;
  } else {
    userToggle.textContent = 'Hola, Usuario ▼';
  }

  // =====================
  // Abrir / cerrar menú usuario
  // =====================
  userToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    userMenu.style.display =
      userMenu.style.display === 'block' ? 'none' : 'block';
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', () => {
    userMenu.style.display = 'none';
  });

  // =====================
  // Logout
  // =====================
  btnLogout.addEventListener('click', () => {
    clearSession();
    window.location.href = 'index.html';
  });

  // =====================
  // Escuchar cambios de usuario (reactivo)
  // =====================
  document.addEventListener('userUpdated', (e) => {
    const user = e.detail;
    if (user?.firstName) {
      userToggle.textContent = `Hola, ${user.firstName} ▼`;
    }
  });
})();

// =====================
// MODAL PERFIL
// =====================
const btnProfile = document.getElementById('btn-profile');
const profileModal = document.getElementById('profile-modal');
const btnCloseProfile = document.getElementById('btn-close-profile');

btnProfile?.addEventListener('click', () => {
  profileModal.classList.add('active');
  profileModal.setAttribute('aria-hidden', 'false');
});

btnCloseProfile?.addEventListener('click', () => {
  profileModal.classList.remove('active');
  profileModal.setAttribute('aria-hidden', 'true');
});

// =====================
// MODAL SEGURIDAD
// =====================
const btnSecurity = document.getElementById('btn-security');
const securityModal = document.getElementById('security-modal');
const btnCloseSecurity = document.getElementById('btn-close-security');

btnSecurity?.addEventListener('click', () => {
  securityModal.classList.add('active');
  securityModal.setAttribute('aria-hidden', 'false');
});

btnCloseSecurity?.addEventListener('click', () => {
  securityModal.classList.remove('active');
  securityModal.setAttribute('aria-hidden', 'true');
});
