const User = require('../../models/User');

const register = async (req, res) => {
  try {
    const { email, password, role } = req.body || {};
    console.log('BODY:', req.body);
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email y contraseña son obligatorios'
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: 'El usuario ya existe'
      });
    }

    const user = await User.create({
      email,
      password,
      role
    });

    return res.status(201).json({
      message: 'Usuario creado correctamente',
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('ERROR REAL:', error);
    return res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { register };
