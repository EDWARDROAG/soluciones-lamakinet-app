// js/utils/guard.js
import { isAuthenticated } from './storage.js';

export function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'forbidden.html';
  }
}
