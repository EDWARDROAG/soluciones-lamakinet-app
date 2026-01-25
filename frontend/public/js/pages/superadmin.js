import { logout } from '../services/auth.service.js';
import { autoGuardByPage } from '../utils/guard.js';

// 🔐 Ejecutar guard al cargar
autoGuardByPage();

// 🔓 Logout
const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    logout();

    // 🔥 Salida limpia (sin historial)
    window.location.replace('index.html');
  });
}
