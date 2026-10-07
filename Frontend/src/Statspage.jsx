import { useEffect, useState } from "react";

function Stats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const cargarStats = async () => {
      try {
        const response = await fetch("http://localhost:3000/stats/turnos");
        const data = await response.json();
        console.log("Stats desde backend:", data);
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };

    cargarStats();
  }, []);

  if (!stats) return <p>Cargando estadísticas...</p>;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Turnos totales</h3>
        <p>{stats.turnos_totales}</p>
      </div>

      <div className="stat-card">
        <h3>Turnos hoy</h3>
        <p>{stats.turnos_hoy}</p>
      </div>

      <div className="stat-card">
        <h3>Pendientes</h3>
        <p>{stats.turnos_pendientes}</p>
      </div>

      <div className="stat-card">
        <h3>Confirmados</h3>
        <p>{stats.turnos_confirmados}</p>
      </div>

      <div className="stat-card">
        <h3>Clientes</h3>
        <p>{stats.clientes_totales}</p>
      </div>
    </div>
  );
}

export default Stats;