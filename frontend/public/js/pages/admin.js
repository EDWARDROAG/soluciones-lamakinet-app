import { logout } from '../services/auth.service.js';
import { autoGuardByPage } from '../utils/guard.js';

autoGuardByPage();

const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    logout();
    window.location.replace('index.html');
  });
}
