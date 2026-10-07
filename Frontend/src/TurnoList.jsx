function TurnoList({ turnos, cambiarEstado, eliminarTurno }) {

  if (!turnos || turnos.length === 0) {
    return <p>No hay turnos cargados.</p>;
  }

  return (
    <div className="turnos-container">

      {turnos.map((turno) => (

        <div key={turno.id} className="turno-card">

          <div className="turno-info">

            <strong>{turno.cliente}</strong>

            <span>
              📅 {new Date(turno.fecha).toLocaleDateString()} 
              ⏰ {turno.hora}
            </span>

            <span>{turno.servicio}</span>

            <span className={`badge ${turno.estado}`}>
              {turno.estado}
            </span>

          </div>

          <div className="turno-actions">

            {turno.estado === "pendiente" && (
              <button
                className="confirm"
                onClick={() => cambiarEstado(turno.id, "confirmado")}
              >
                Confirmar
              </button>
            )}

            <button
              className="delete"
              onClick={() => eliminarTurno(turno.id)}
            >
              Eliminar
            </button>

          </div>

        </div>

      ))}

    </div>
  );
}

export default TurnoList;
