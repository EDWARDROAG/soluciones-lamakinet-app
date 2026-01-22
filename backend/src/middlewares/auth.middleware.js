import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';
import User from '../models/User.js';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Token no proporcionado'
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    // 🔑 BUSCAR USUARIO REAL EN BD
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

export default authMiddleware;
