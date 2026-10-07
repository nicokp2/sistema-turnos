const express = require("express");
const router = express.Router();

const {
  obtenerTurnos,
  crearTurno,
  actualizarTurno,
  eliminarTurno,
  obtenerAgendaDia
} = require("../controllers/turnos.controller");

/**
 * @swagger
 * /turnos:
 *   get:
 *     summary: Obtener todos los turnos
 *     tags: [Turnos]
 *     responses:
 *       200:
 *         description: Lista de turnos
 */
router.get("/", obtenerTurnos);

/**
 * @swagger
 * /turnos:
 *   post:
 *     summary: Crear un turno
 *     tags: [Turnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente_id:
 *                 type: integer
 *               fecha:
 *                 type: string
 *               hora:
 *                 type: string
 *               servicio:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Turno creado
 */
router.post("/", crearTurno);

/**
 * @swagger
 * /turnos/{id}:
 *   put:
 *     summary: Actualizar estado de un turno
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Turno actualizado
 */
router.put("/:id", actualizarTurno);

/**
 * @swagger
 * /turnos/{id}:
 *   delete:
 *     summary: Eliminar un turno
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turno eliminado
 */
router.delete("/:id", eliminarTurno);

router.get("/agenda", obtenerAgendaDia);

module.exports = router;