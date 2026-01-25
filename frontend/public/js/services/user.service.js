import { api } from '../api/api.js';

/**
 * ===============================
 * 👤 PERFIL DEL USUARIO
 * ===============================
 */

/**
 * Obtener mis datos
 */
export async function getMyProfile() {
  return api('/users/me');
}

/**
 * Actualizar mis datos
 */
export async function updateProfile(profileData) {
  return api('/users/me', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  });
}
