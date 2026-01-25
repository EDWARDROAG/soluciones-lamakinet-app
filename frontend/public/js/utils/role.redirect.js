// js/utils/role.redirect.js
import { getUser } from './storage.js';

export function redirectByRole(options = {}) {
  const {
    allowClient = true,
    fromIndex = false
  } = options;

  const user = getUser();
  if (!user || !user.role) return;

  // Si viene desde index.html
  if (fromIndex) {
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
        if (!allowClient) {
          window.location.replace('index.html');
        }
        return;

      default:
        localStorage.clear();
        window.location.replace('index.html');
        return;
    }
  }
}
