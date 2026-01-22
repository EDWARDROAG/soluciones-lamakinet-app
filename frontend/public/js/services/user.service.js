// js/services/user.service.js
import { api } from '../api/api.js';

export async function getProfile() {
  try {
    const response = await api('/users/me');
    return response; // 👈 ahora sí devuelve el perfil completo
  } catch (err) {
    throw new Error(
      err?.message || 'Error al cargar el perfil'
    );
  }
}

export async function updateProfile(data) {
  try {
    const response = await api('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    return response; // 👈 devuelve usuario actualizado
  } catch (err) {
    throw new Error(
      err?.message || 'Error al actualizar el perfil'
    );
  }
}
