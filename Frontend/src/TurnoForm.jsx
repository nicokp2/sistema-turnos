import { useState } from "react";

function TurnoForm({
  formData,
  handleChange,
  handleSubmit,
  clientes,
  crearClienteNuevo
}) {

  const [nuevoCliente, setNuevoCliente] = useState("");
  const [busquedaCliente, setBusquedaCliente] = useState("");

  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.nombre
      .toLowerCase()
      .includes(busquedaCliente.toLowerCase())
  );

  const handleCrearCliente = async () => {
    if (!nuevoCliente.trim()) return;

    await crearClienteNuevo(nuevoCliente.trim());

    setNuevoCliente("");
  };

  return (
    <form className="turno-form" onSubmit={handleSubmit}>

      {/* TÍTULO */}

      <div className="form-header">
        <h2>Nuevo turno</h2>
        <p>Completá los datos para reservar un turno.</p>
      </div>


      {/* CLIENTE */}

      <div className="form-group">

        <label>Cliente</label>

        <input
          type="text"
          placeholder="Buscar cliente..."
          value={busquedaCliente}
          onChange={(e) => setBusquedaCliente(e.target.value)}
        />

        <select
          name="cliente_id"
          value={formData.cliente_id}
          onChange={handleChange}
          required
        >
          <option value="">
            Seleccionar cliente
          </option>

          {clientesFiltrados.map((cliente) => (
            <option
              key={cliente.id}
              value={cliente.id}
            >
              {cliente.nombre}
            </option>
          ))}
        </select>

      </div>


      {/* CREAR CLIENTE */}

      <div className="new-client">

        <label>¿Cliente nuevo?</label>

        <div className="new-client-row">

          <input
            type="text"
            placeholder="Nombre del cliente"
            value={nuevoCliente}
            onChange={(e) => setNuevoCliente(e.target.value)}
          />

          <button
            type="button"
            className="secondary-button"
            onClick={handleCrearCliente}
            disabled={!nuevoCliente.trim()}
          >
            Crear
          </button>

        </div>

      </div>


      {/* FECHA */}

      <div className="form-group">

        <label>Fecha</label>

        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          min={new Date().toISOString().split("T")[0]}
          required
        />

      </div>


      {/* HORA */}

      <div className="form-group">

        <label>Hora</label>

        <input
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          required
        />

      </div>


      {/* SERVICIO */}

      <div className="form-group">

        <label>Servicio</label>

        <input
          type="text"
          name="servicio"
          placeholder="Ej: Corte de pelo"
          value={formData.servicio}
          onChange={handleChange}
          required
        />

      </div>


      {/* ESTADO */}

      <div className="form-group">

        <label>Estado</label>

        <select
          name="estado"
          value={formData.estado}
          onChange={handleChange}
        >
          <option value="pendiente">
            Pendiente
          </option>

          <option value="confirmado">
            Confirmado
          </option>

        </select>

      </div>


      {/* BOTÓN */}

      <button
        type="submit"
        className="primary-button"
      >
        Agregar turno
      </button>

    </form>
  );
}

export default TurnoForm;
