const app = require('./src/app');
const { PORT } = require('./src/config/env');
const connectDB = require('./src/config/db');

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});

