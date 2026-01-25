// js/pages/login.js
import { login } from '../services/auth.service.js';
import { setSessionUser } from '../utils/storage.js';

const form = document.getElementById('login-form');
const error = document.getElementById('error');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    error.hidden = true;

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    try {
      /**
       * 1️⃣ Login backend
       * login() retorna:
       * {
       *   token,
       *   user: { id, email, role }
       * }
       *
       * El token YA se guarda en auth.service.js
       */
      const { user } = await login(email, password);

      if (!user || !user.role) {
        throw new Error('No se pudo identificar el rol del usuario');
      }

      /**
       * 2️⃣ Guardar usuario en sesión
       * (el guard.js depende de esto)
       */
      setSessionUser(user);

      /**
       * 3️⃣ FLUJO POST-LOGIN SEGÚN ROL
       */
      switch (user.role) {
        case 'super_admin':
          window.location.href = 'superadmin.html';
          break;

        case 'admin':
          window.location.href = 'admin.html';
          break;

        case 'cashier':
          window.location.href = 'cashier.html';
          break;

        case 'client':
        default:
          // Cliente final:
          // se queda en index.html
          // se recarga para cerrar modal y activar sesión
          window.location.reload();
          break;
      }

    } catch (err) {
      error.textContent =
        err.message || 'Error al iniciar sesión';
      error.hidden = false;
    }
  });
}
