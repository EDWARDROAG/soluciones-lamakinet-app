const TOKEN_KEY = 'lamakinet_token';

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

/* ✅ alias semántico para sesión */
export function clearSession() {
  removeToken();
  removeSessionUser();
}

export function isAuthenticated() {
  return !!getToken();
}

const USER_KEY = 'lamakinet_user';

export function setSessionUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getSessionUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function removeSessionUser() {
  localStorage.removeItem(USER_KEY);
}