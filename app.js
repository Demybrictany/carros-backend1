const express = require("express");
const cors = require("cors");
require("dotenv").config();

const sequelize = require("./db/db");

const app = express();

// CORS CORREGIDO
app.use(cors());

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Ruta raíz (opcional pero recomendado)
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Cargar modelos
require("./models/vendedor.model");
require("./models/comprador.model");
require("./models/carropredio.model");
require("./models/gastos.model");
require("./models/venta.model");

// Relaciones
require("./models/relations");

// Conexión DB
sequelize.authenticate()
  .then(() => console.log("✅ Conexión a la base de datos correcta"))
  .catch(err => console.log("❌ Error al conectar", err));

// Rutas API
app.use("/vendedores", require("./routes/vendedores.routes"));
app.use("/compradores", require("./routes/compradores.routes"));
app.use("/colaboradores", require("./routes/colaboradores.routes"));
app.use("/carros-predio", require("./routes/carropredio.routes"));
app.use("/gastos", require("./routes/gastos.routes"));
app.use("/ventas", require("./routes/ventas.routes"));
app.use("/contrato", require("./routes/contrato.routes"));
app.use("/buscar", require("./routes/buscar.routes"));

// Sincronizar y levantar servidor
sequelize.sync({ alter: false }).then(() => {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
