import mongoose from 'mongoose';
import { MONGO_URI } from './env.js';

export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🟢 MongoDB conectado');
  } catch (error) {
    console.error('🔴 Error MongoDB:', error.message);
    process.exit(1);
  }
}
