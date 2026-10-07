const db = require("../db/db");

const getStatsTurnos = async () => {

  const turnosTotales = await db.query(
    "SELECT COUNT(*) FROM turnos"
  );

  const turnosHoy = await db.query(
    "SELECT COUNT(*) FROM turnos WHERE fecha = CURRENT_DATE"
  );

  const turnosPendientes = await db.query(
    "SELECT COUNT(*) FROM turnos WHERE estado = 'pendiente'"
  );

  const turnosConfirmados = await db.query(
    "SELECT COUNT(*) FROM turnos WHERE estado = 'confirmado'"
  );

  const clientesTotales = await db.query(
    "SELECT COUNT(*) FROM clientes"
  );

  return {
    turnos_totales: parseInt(turnosTotales.rows[0].count),
    turnos_hoy: parseInt(turnosHoy.rows[0].count),
    turnos_pendientes: parseInt(turnosPendientes.rows[0].count),
    turnos_confirmados: parseInt(turnosConfirmados.rows[0].count),
    clientes_totales: parseInt(clientesTotales.rows[0].count)
  };
};

module.exports = {
  getStatsTurnos
};