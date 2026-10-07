const turnosService = require("../services/turnos.service");

const obtenerTurnos = async (req, res) => {
  try {
    const turnos = await turnosService.obtenerTurnos();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const crearTurno = async (req, res, next) => {
  try {
    const turno = await turnosService.crearTurno(req.body);
    res.status(201).json(turno);
  } catch (error) {
    next(error);
  }
};

const actualizarTurno = async (req, res) => {
  try {
    const turnoActualizado = await turnosService.actualizarTurno(
      req.params.id,
      req.body
    );
    res.json(turnoActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const eliminarTurno = async (req, res) => {
  try {
    await turnosService.eliminarTurno(req.params.id);
    res.json({ mensaje: "Turno eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerAgendaDia = async (req, res) => {
  try {
    const { fecha } = req.query;

    const agenda = await turnosService.obtenerAgendaDia(fecha);

    res.json(agenda);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo agenda" });
  }
};

module.exports = {
  obtenerTurnos,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
  obtenerAgendaDia
};