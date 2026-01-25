import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * ===============================
 * 📦 ESQUEMA DE USUARIO
 * ===============================
 * Este modelo representa a TODOS los usuarios del sistema:
 * - super_admin  → Control total (solo tú)
 * - admin        → Administradores que tú creas
 * - cashier      → Cajeros
 * - client       → Clientes (registro público)
 */
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      trim: true
    },

    /**
     * 🔐 Contraseña
     * - Nunca se devuelve en consultas
     * - Se almacena hasheada (ver middleware pre-save)
     */
    password: {
      type: String,
      required: true,
      select: false
    },

    /**
     * 🎭 Rol del usuario
     *
     * Reglas:
     * - El registro público SIEMPRE crea usuarios con rol "client"
     * - "super_admin" NO se crea por frontend
     * - Los cambios de rol solo se hacen desde backend protegido
     */
    role: {
      type: String,
      enum: ['super_admin', 'admin', 'cashier', 'client'],
      default: 'client'
    },

    /**
     * 🔁 Recuperación de contraseña
     */
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  {
    timestamps: true
  }
);

/**
 * ===============================
 * 🔐 HASH DE CONTRASEÑA
 * ===============================
 * - Se ejecuta SOLO si la contraseña fue modificada
 * - Evita doble hash
 */
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

/**
 * ===============================
 * 🔍 COMPARAR CONTRASEÑA
 * ===============================
 * @param {string} plainPassword
 * @returns {Promise<boolean>}
 */
userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

export default mongoose.model('User', userSchema);
