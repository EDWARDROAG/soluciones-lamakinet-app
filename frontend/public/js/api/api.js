// js/api/api.js
import { getToken, clearSession } from '../utils/storage.js';
import ENV from '../config/env.js';

export async function api(endpoint, options = {}) {
  const token = getToken();

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(`${ENV.API_BASE_URL}${endpoint}`, {
      ...options,
      headers
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor');
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    // respuestas sin body (204, etc.)
  }

  if (!response.ok) {
    if (response.status === 401) {
      clearSession();
      throw new Error('Sesión expirada. Inicia sesión nuevamente.');
    }

    if (response.status === 403) {
      throw new Error('No tienes permisos para esta acción.');
    }

    throw new Error(data?.message || 'Error inesperado en la API');
  }

  return data;
}
