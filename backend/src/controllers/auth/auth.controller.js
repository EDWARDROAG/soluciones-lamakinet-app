const User = require('../../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const user = await User.create({ email, password, role });

    return res.status(201).json({
      message: 'Usuario creado correctamente',
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('ERROR REAL:', error);
    return res.status(500).json({ message: error.message });
  }
};

// 🔑 LOGIN REAL
const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }

    // Importante: pedir el password (select:false)
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    return res.status(200).json({
      message: 'Login exitoso',
      user: { id: user._id, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('ERROR LOGIN:', error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
