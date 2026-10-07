const express = require("express");
const cors = require("cors");

const errorHandler = require("./middleware/error.middleware");
const turnosRoutes = require("./routes/turnos.routes");
const clientesRoutes = require("./routes/clientes.routes");
const statsRoutes = require("./routes/stats.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/turnos", turnosRoutes);
app.use("/clientes", clientesRoutes);
app.use("/stats", statsRoutes);

app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});