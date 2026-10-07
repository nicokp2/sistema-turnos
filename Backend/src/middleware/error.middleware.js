const errorHandler = (err, req, res, next) => {

  console.error(err);

  if (err.message.includes("Faltan")) {
    return res.status(400).json({ error: err.message });
  }

  if (err.message.includes("Ya existe")) {
    return res.status(409).json({ error: err.message });
  }

  if (err.message.includes("fecha pasada")) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({
    error: "Error interno del servidor"
  });
};

module.exports = errorHandler;