const express = require("express");
const router = express.Router();
const statsController = require("../controllers/stats.controller");

/**
 * @swagger
 * /stats/turnos:
 *   get:
 *     summary: Obtener estadísticas del sistema
 *     tags: [Estadísticas]
 *     responses:
 *       200:
 *         description: Estadísticas de turnos
 */
router.get("/turnos", statsController.getStatsTurnos);

module.exports = router;
