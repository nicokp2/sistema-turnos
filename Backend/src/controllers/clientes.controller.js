const clientesService = require("../services/clientes.service");

const obtenerClientes = async (req, res) => {
  try {
    const clientes = await clientesService.obtenerClientes();
    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo clientes" });
  }
};

const crearCliente = async (req, res) => {
  try {
    const { nombre } = req.body;

    const nuevoCliente = await clientesService.crearCliente(nombre);

    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando cliente" });
  }
};

module.exports = {
  obtenerClientes,
  crearCliente
};