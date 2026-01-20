// js/services/user.service.js
import { api } from '../api/api.js';

export async function getProfile() {
  try {
    return await api('/users/me');
  } catch (err) {
    throw new Error(
      err?.message || 'Error al cargar el perfil'
    );
  }
}

export async function updateProfile(data) {
  try {
    return await api('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  } catch (err) {
    throw new Error(
      err?.message || 'Error al actualizar el perfil'
    );
  }
}
