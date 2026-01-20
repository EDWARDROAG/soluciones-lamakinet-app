// js/utils/session.js
import { getToken, clearSession } from './storage.js';

(function () {
  const btnLogin = document.getElementById('btn-login');
  const userBox = document.getElementById('user-box');
  const userToggle = document.getElementById('user-name');
  const userMenu = document.getElementById('user-menu');
  const btnLogout = document.getElementById('btn-logout');

  // Si no existe el header (por ejemplo en login.html), no hace nada
  if (!btnLogin || !userBox || !userToggle || !userMenu || !btnLogout) return;

  const token = getToken();

  // ===== SIN SESIÓN =====
  if (!token) {
    btnLogin.style.display = 'inline-block';
    userBox.style.display = 'none';
    return;
  }

  // ===== CON SESIÓN =====
  btnLogin.style.display = 'none';
  userBox.style.display = 'inline-block';

  // Mostrar nombre desde JWT (solo visual)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const name = payload.firstName || payload.name || 'Usuario';
    userToggle.textContent = `Hola, ${name} ▼`;
  } catch {
    userToggle.textContent = 'Hola, Usuario ▼';
  }

  // Abrir / cerrar menú usuario
  userToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    userMenu.style.display =
      userMenu.style.display === 'block' ? 'none' : 'block';
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener('click', () => {
    userMenu.style.display = 'none';
  });

  // Logout
  btnLogout.addEventListener('click', () => {
    clearSession();
    window.location.href = 'index.html';
  });
})();

// Abrir modal de perfil
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


