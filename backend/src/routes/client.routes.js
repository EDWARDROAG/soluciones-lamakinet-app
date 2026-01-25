import express from 'express';
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
} from '../controllers/client.controller.js';

import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * ===============================
 * 👥 CLIENTES
 * ===============================
 * Todas las rutas de clientes requieren autenticación
 */
router.use(protect);

// Crear cliente
router.post('/', createClient);

// Listar clientes
router.get('/', getClients);

// Obtener cliente por ID
router.get('/:id', getClientById);

// Actualizar cliente
router.put('/:id', updateClient);

// Eliminar cliente
router.delete('/:id', deleteClient);

export default router;
