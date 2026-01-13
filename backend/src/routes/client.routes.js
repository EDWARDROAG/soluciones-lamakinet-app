const express = require('express');
const router = express.Router();


const {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
} = require('../controllers/client.controller');

const authMiddleware = require('../middlewares/auth.middleware');

// 🔐 Proteger todas las rutas de clientes
router.use(authMiddleware);

// ➕ Crear cliente
router.post('/', createClient);

// 📄 Obtener todos los clientes
router.get('/', getClients);

// 🔍 Obtener un cliente por ID
router.get('/:id', getClientById);

//  Editar cliente: UPDATE

router.put('/:id', updateClient);

//   Eliminar cliente: DELETE
router.delete('/:id', deleteClient);

module.exports = router;
