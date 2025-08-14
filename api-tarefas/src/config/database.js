const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_ACESS);
    console.log('MongoDB Conectado com Sucesso!');
  } catch (err) {
    console.error('Falha ao conectar com o MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;