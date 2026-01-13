const Client = require('../models/Client');
const AppError = require('../utils/AppError');
const mongoose = require('mongoose');

// CREATE — Crear cliente
const createClient = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name) {
      throw new AppError('El nombre del cliente es obligatorio', 400);
    }

    const client = await Client.create({
      name,
      email,
      phone,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: client
    });
  } catch (error) {
    next(error);
  }
};

// READ — Obtener todos los clientes del usuario
const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find({
      createdBy: req.user.id
    });

    res.status(200).json({
      success: true,
      data: clients
    });
  } catch (error) {
    next(error);
  }
};

// READ — Obtener un cliente por ID
const getClientById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // ✅ Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('ID de cliente inválido', 400);
    }

    const client = await Client.findOne({
      _id: id,
      createdBy: req.user.id
    });

    if (!client) {
      throw new AppError('Cliente no encontrado', 404);
    }

    res.status(200).json({
      success: true,
      data: client
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE — Actualizar cliente
const updateClient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    // ✅ Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('ID de cliente inválido', 400);
    }

    const client = await Client.findOneAndUpdate(
      {
        _id: id,
        createdBy: req.user.id
      },
      {
        name,
        email,
        phone
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!client) {
      throw new AppError('Cliente no encontrado', 404);
    }

    res.status(200).json({
      success: true,
      data: client
    });
  } catch (error) {
    next(error);
  }
};


// DELETE — Eliminar cliente
const deleteClient = async (req, res, next) => {
  try {
    const { id } = req.params;

    // ✅ Validar ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('ID de cliente inválido', 400);
    }

    const client = await Client.findOneAndDelete({
      _id: id,
      createdBy: req.user.id
    });

    if (!client) {
      throw new AppError('Cliente no encontrado', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Cliente eliminado correctamente'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient
};
