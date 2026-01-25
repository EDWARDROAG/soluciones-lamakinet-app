// js/components/auth.modal.js
import {
  login,
  forgotPassword,
  register
} from '../services/auth.service.js';

import { setSessionUser } from '../utils/storage.js';

(function () {
  // ===== ELEMENTOS BASE =====
  const btnLogin = document.getElementById('btn-login');
  const modal = document.getElementById('login-modal');
  const btnClose = document.getElementById('btn-close-login');

  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const recoverForm = document.getElementById('recover-form');

  const loginError = document.getElementById('login-error');
  const registerError = document.getElementById('register-error');

  if (!btnLogin || !modal || !loginForm) return;

  // ===== FUNCIONES VISUALES =====
  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');

    loginError.hidden = true;
    if (registerError) registerError.hidden = true;

    loginForm.reset();
    registerForm?.reset();
    recoverForm?.reset();

    showLogin();
  }

  function showLogin() {
    loginForm.hidden = false;
    registerForm && (registerForm.hidden = true);
    recoverForm && (recoverForm.hidden = true);
  }

  function showRegister() {
    loginForm.hidden = true;
    registerForm && (registerForm.hidden = false);
    recoverForm && (recoverForm.hidden = true);
  }

  function showRecover() {
    loginForm.hidden = true;
    registerForm && (registerForm.hidden = true);
    recoverForm && (recoverForm.hidden = false);
  }

  // ===== EVENTOS MODAL =====
  btnLogin.addEventListener('click', openModal);
  btnClose?.addEventListener('click', closeModal);

  document
    .getElementById('btn-show-register')
    ?.addEventListener('click', showRegister);

  document
    .getElementById('btn-show-recover')
    ?.addEventListener('click', showRecover);

  document
    .getElementById('btn-cancel-register')
    ?.addEventListener('click', showLogin);

  document
    .getElementById('btn-cancel-recover')
    ?.addEventListener('click', showLogin);

  // ===============================
  // LOGIN (CON REDIRECCIÓN POR ROL)
  // ===============================
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.hidden = true;

    const email = document.getElementById('login-user').value.trim();
    const password = document.getElementById('login-pass').value;

    if (!email || !password) {
      loginError.textContent = 'Todos los campos son obligatorios';
      loginError.hidden = false;
      return;
    }

    try {
      // 🔐 Login backend
      const { user } = await login(email, password);

      if (!user || !user.role) {
        throw new Error('No se pudo identificar el rol del usuario');
      }

      // 💾 Guardar usuario en sesión
      setSessionUser(user);

      closeModal();

      // 🚦 Redirección según rol
      switch (user.role) {
        case 'super_admin':
          window.location.replace('superadmin.html');
          return;

        case 'admin':
          window.location.replace('admin.html');
          return;

        case 'cashier':
          window.location.replace('cashier.html');
          return;

        case 'client':
        default:
          // Cliente se queda en index
          window.location.reload();
          return;
      }

    } catch (err) {
      loginError.textContent =
        err?.message || 'Correo o contraseña incorrectos';
      loginError.hidden = false;
    }
  });

  // ===============================
  // REGISTRO (SOLO CLIENTES)
  // ===============================
  registerForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    registerError.hidden = true;

    const firstName = document.getElementById('register-name').value.trim();
    const lastName = document.getElementById('register-lastname').value.trim();
    const email = document
      .getElementById('register-email')
      .value.trim()
      .toLowerCase();
    const phone = document.getElementById('register-phone').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById(
      'register-password-confirm'
    ).value;

    if (!firstName || !lastName || !email || !phone || !password) {
      registerError.textContent = 'Todos los campos son obligatorios';
      registerError.hidden = false;
      return;
    }

    if (password !== confirm) {
      registerError.textContent = 'Las contraseñas no coinciden';
      registerError.hidden = false;
      return;
    }

    try {
      await register({
        firstName,
        lastName,
        email,
        phone,
        password
      });

      closeModal();
      window.location.reload();

    } catch (err) {
      registerError.textContent =
        err?.message || 'Error al crear la cuenta';
      registerError.hidden = false;
    }
  });

  // ===============================
  // RECUPERAR CONTRASEÑA
  // ===============================
  recoverForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('recover-email').value.trim();

    try {
      await forgotPassword(email);
    } catch {
      // Mensaje neutro por seguridad
    }

    alert(
      'Si el correo existe, recibirás un enlace para restablecer tu contraseña.'
    );

    showLogin();
  });

})();
