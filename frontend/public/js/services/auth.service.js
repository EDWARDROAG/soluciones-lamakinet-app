// js/services/auth.service.js
import { api } from '../api/api.js';
import { setToken, clearSession } from '../utils/storage.js';

export async function login(email, password) {
  try {
    const data = await api('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (!data?.token) {
      throw new Error('Respuesta inválida del servidor');
    }

    setToken(data.token);
    return data;
  } catch (err) {
    throw new Error(
      err?.message || 'Correo o contraseña incorrectos'
    );
  }
}

export function logout() {
  clearSession();
}

export async function forgotPassword(email) {
  try {
    return await api('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  } catch {
   
    return true;
  }
}

export async function resetPassword(token, password) {
  try {
    return await api(`/auth/reset-password/${token}`, {
      method: 'POST',
      body: JSON.stringify({ password })
    });
  } catch (err) {
    throw new Error(
      err?.message || 'El enlace es inválido o expiró'
    );
  }
}

// Cambiar contraseña (usuario autenticado)
export async function changePassword(currentPassword, newPassword) {
  try {
    return await api('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({
        currentPassword,
        newPassword
      })
    });
  } catch (err) {
    throw new Error(
      err?.message || 'No fue posible cambiar la contraseña'
    );
  }
}



export async function register(userData) {
  try {
    const response = await fetch(
      'http://localhost:3000/api/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      }
    );

    const data = await response.json();

    if (!response.ok || !data?.token) {
      throw new Error(data.message || 'Error en el registro');
    }

    // 🔐 AUTO-LOGIN: guardar token
    setToken(data.token);

    return data;
  } catch (err) {
    throw new Error(
      err?.message || 'No fue posible crear la cuenta'
    );
  }
}



