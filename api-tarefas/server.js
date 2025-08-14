const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const connectDB = require('./src/config/database')


const startServer = async () => {
  try {
    //Conecta ao banco de dados antes de iniciar o servidor
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error("Não foi possível iniciar o servidor", error);
  }
};

startServer();
