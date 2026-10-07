const db = require("../db/db");

const obtenerClientes = async () => {
  const result = await db.query("SELECT * FROM clientes");
  return result.rows;
};

const crearCliente = async (nombre) => {
  const result = await db.query(
    "INSERT INTO clientes (nombre) VALUES ($1) RETURNING *",
    [nombre]
  );

  return result.rows[0];
};

module.exports = {
  obtenerClientes,
  crearCliente
};