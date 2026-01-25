import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/User.js';


/**
 * ===============================
 * 🔐 MIDDLEWARE DE AUTENTICACIÓN
 * ===============================
 * - Verifica que exista el token JWT
 * - Valida el token
 * - Inyecta en req.user la info mínima necesaria
 *
 * IMPORTANTE:
 * - NO devuelve el usuario completo
 * - Solo lo necesario para autorización (id y role)
 */
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // ❌ No hay header o no es Bearer
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Token no proporcionado'
      });
    }

    const token = authHeader.split(' ')[1];

    // 🔓 Verificar token
    const decoded = jwt.verify(token, JWT_SECRET);

    /**
     * 🧠 Inyectamos el usuario autenticado en la request
     * Esto ya lo usaremos en controladores y guards de rol
     */
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token inválido o expirado'
    });
  }
};

/**
 * ===============================
 * 🛡️ MIDDLEWARE DE AUTORIZACIÓN POR ROLES
 * ===============================
 * @param {...string} allowedRoles
 *
 * Uso:
 * authorizeRoles('super_admin')
 * authorizeRoles('super_admin', 'admin')
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Seguridad extra: si por alguna razón no existe req.user
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        message: 'Usuario no autenticado'
      });
    }

    // ❌ Rol no autorizado
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'No tienes permisos para realizar esta acción'
      });
    }

    // ✅ Rol permitido
    next();
  };
};

export { protect, authorizeRoles };
