// js/utils/guard.js
import { isAuthenticated, getUser } from './storage.js';

/**
 * ===============================
 * 🔐 Requiere autenticación básica
 * ===============================
 * Si no hay sesión → forbidden
 */
export function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'forbidden.html';
  }
}

/**
 * ===============================
 * 🎭 Requiere uno o varios roles
 * ===============================
 * @param {Array<string>} allowedRoles
 *
 * Ejemplos:
 * requireRole(['admin'])
 * requireRole(['super_admin', 'admin'])
 */
export function requireRole(allowedRoles = []) {
  if (!isAuthenticated()) {
    window.location.href = 'forbidden.html';
    return;
  }

  const user = getUser();

  if (!user || !allowedRoles.includes(user.role)) {
    window.location.href = 'forbidden.html';
  }
}

/**
 * ===============================
 * 🧭 Guard automático por HTML
 * ===============================
 * Se ejecuta al cargar cualquier página
 * y valida si el rol puede estar ahí
 */
export function autoGuardByPage() {
  // Si no hay sesión, solo dejamos index.html
  if (!isAuthenticated()) return;

  const user = getUser();
  if (!user || !user.role) {
    window.location.href = 'forbidden.html';
    return;
  }

  // Nombre del archivo actual
  const page = window.location.pathname.split('/').pop();

  /**
   * Mapa de acceso por página
   * Clave  → HTML
   * Valor  → roles permitidos
   */
  const roleAccessMap = {
    'superadmin.html': ['super_admin'],
    'admin.html': ['admin', 'super_admin'],
    'cashier.html': ['cashier', 'admin', 'super_admin'],
    'index.html': ['client']
  };

  // Si la página está protegida por rol
  if (roleAccessMap[page]) {
    if (!roleAccessMap[page].includes(user.role)) {
      window.location.href = 'forbidden.html';
    }
  }
}
