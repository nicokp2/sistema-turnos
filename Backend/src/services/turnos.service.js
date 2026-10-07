const db = require("../db/db");

const obtenerTurnos = async () => {
  const result = await db.query(`
    SELECT t.id, c.nombre AS cliente, t.fecha, t.hora, t.servicio, t.estado
    FROM turnos t
    JOIN clientes c ON t.cliente_id = c.id
    ORDER BY t.fecha, t.hora
  `);

  return result.rows;
};

const crearTurno = async (data) => {

  const { fecha, hora, servicio, estado } = data;
  const cliente_id = Number(data.cliente_id);

  if (!cliente_id || !fecha || !hora || !servicio) {
    throw new Error("Faltan campos obligatorios");
  }

  // validar fecha pasada
  const hoy = new Date().toISOString().split("T")[0];

  if (fecha < hoy) {
    throw new Error("No se puede crear un turno en una fecha pasada");
  }

  // verificar turno duplicado
  const existente = await db.query(
    `SELECT * FROM turnos
     WHERE fecha = $1 AND hora = $2`,
    [fecha, hora]
  );

  if (existente.rows.length > 0) {
    throw new Error("Ya existe un turno en ese horario");
  }

  const result = await db.query(
    `INSERT INTO turnos (cliente_id, fecha, hora, servicio, estado)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [cliente_id, fecha, hora, servicio, estado]
  );

  return result.rows[0];
};

const actualizarTurno = async (id, { estado }) => {
  const result = await db.query(
    `
    UPDATE turnos
    SET estado = $1
    WHERE id = $2
    RETURNING *
    `,
    [estado, id]
  );

  return result.rows[0];
};

const eliminarTurno = async (id) => {
  await db.query("DELETE FROM turnos WHERE id = $1", [id]);
};

const obtenerAgendaDia = async (fecha) => {

  const horarios = [
    "09:00","09:15","09:30","09:45","10:00","10:15","10:30","10:45","11:00","11:15","11:30","11:45",
    "12:00","12:15","12:30","12:45","13:00","13:15","13:30","13:45","14:00","14:15","14:30","14:45",
    "15:00","15:15","15:30","15:45","16:00","16:15","16:30","16:45","17:00","17:15","17:30","17:45",
    "18:00","18:15","18:30","18:45","19:00"
  ];

  const turnos = await db.query(
    `SELECT t.hora, c.nombre AS cliente
     FROM turnos t
     JOIN clientes c ON t.cliente_id = c.id
     WHERE t.fecha = $1`,
    [fecha]
  );

  const turnosMap = {};

  turnos.rows.forEach(t => {
    const hora = t.hora.slice(0,5); // 🔧 quitar segundos
    turnosMap[hora] = t.cliente;
  });

  const agenda = horarios.map(hora => ({
    hora,
    cliente: turnosMap[hora] || null
  }));

  return agenda;
};

module.exports = {
  obtenerTurnos,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
  obtenerAgendaDia
};