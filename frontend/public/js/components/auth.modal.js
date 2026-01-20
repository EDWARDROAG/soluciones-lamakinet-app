// js/components/auth.modal.js
import {
  login,
  forgotPassword
} from '../services/auth.service.js';

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

  // Si no existe el modal en la página, no hacemos nada
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

  // ===== BOTONES CAMBIO DE VISTA =====
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

  // ===== LOGIN =====
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
      await login(email, password);
      closeModal();
      window.location.reload();
    } catch (err) {
      loginError.textContent =
        err?.message || 'Correo o contraseña incorrectos';
      loginError.hidden = false;
    }
  });

  // ===== RECUPERAR CONTRASEÑA =====
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
