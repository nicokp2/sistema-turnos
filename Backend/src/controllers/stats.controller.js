const statsService = require("../services/stats.service");

const getStatsTurnos = async (req, res) => {
  try {
    const stats = await statsService.getStatsTurnos();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo estadísticas" });
  }
};

module.exports = {
  getStatsTurnos
};