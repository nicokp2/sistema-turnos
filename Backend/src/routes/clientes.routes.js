const express = require("express");
const router = express.Router();

const { obtenerClientes, crearCliente } = require("../controllers/clientes.controller");

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get("/", obtenerClientes);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Crear un cliente
 *     tags: [Clientes]
 *     responses:
 *       201:
 *         description: Cliente creado
 */
router.post("/", crearCliente);

module.exports = router;