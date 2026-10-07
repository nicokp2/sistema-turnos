import {
  getTurnos,
  crearTurno,
  actualizarTurno,
  eliminarTurno as eliminarTurnoAPI,
  getClientes,
  getStats,
  crearCliente
} from "./api";

import "./App.css";

import TurnoForm from "./TurnoForm";
import TurnoList from "./TurnoList";
import StatsChart from "./StatsChart";
import AgendaDia from "./AgendaDia";

import { useEffect, useState } from "react";


function App() {

  const [filtro, setFiltro] = useState("todos");

  const [turnos, setTurnos] = useState([]);

  const [clientes, setClientes] = useState([]);

  const [formData, setFormData] = useState({
    cliente_id: "",
    fecha: "",
    hora: "",
    servicio: "",
    estado: "pendiente"
  });

  const [stats, setStats] = useState({
    turnos_totales: 0,
    turnos_hoy: 0,
    turnos_pendientes: 0,
    turnos_confirmados: 0,
    clientes_totales: 0
  });


  // =========================
  // CARGAR DATOS
  // =========================

  useEffect(() => {

    const cargarDatos = async () => {

      try {

        const turnosData = await getTurnos();
        const clientesData = await getClientes();
        const statsData = await getStats();

        setTurnos(turnosData);
        setClientes(clientesData);
        setStats(statsData);

      } catch (error) {

        console.error("Error cargando datos:", error);

      }

    };

    cargarDatos();

  }, []);


  // =========================
  // CAMBIAR INPUTS
  // =========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  // =========================
  // CREAR TURNO
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const nuevoTurno = {
        ...formData,
        cliente_id: Number(formData.cliente_id)
      };

      await crearTurno(nuevoTurno);

      // Actualizar turnos
      const turnosActualizados = await getTurnos();
      setTurnos(turnosActualizados);

      // Actualizar estadísticas
      const statsActualizadas = await getStats();
      setStats(statsActualizadas);

      // Limpiar formulario
      setFormData({
        cliente_id: "",
        fecha: "",
        hora: "",
        servicio: "",
        estado: "pendiente"
      });

    } catch (error) {

      alert(error.message);

    }

  };


  // =========================
  // CAMBIAR ESTADO
  // =========================

  const cambiarEstado = async (id, nuevoEstado) => {

    try {

      await actualizarTurno(id, {
        estado: nuevoEstado
      });

      const turnosActualizados = await getTurnos();
      setTurnos(turnosActualizados);

      const statsActualizadas = await getStats();
      setStats(statsActualizadas);

    } catch (error) {

      console.error("Error actualizando turno:", error);

    }

  };


  // =========================
  // ELIMINAR TURNO
  // =========================

  const eliminarTurno = async (id) => {

    try {

      await eliminarTurnoAPI(id);

      const turnosActualizados = await getTurnos();
      setTurnos(turnosActualizados);

      const statsActualizadas = await getStats();
      setStats(statsActualizadas);

    } catch (error) {

      console.error("Error eliminando turno:", error);

    }

  };


  // =========================
  // CREAR CLIENTE
  // =========================

  const crearClienteNuevo = async (nombre) => {

    try {

      await crearCliente(nombre);

      const clientesActualizados = await getClientes();

      setClientes(clientesActualizados);

    } catch (error) {

      console.error("Error creando cliente:", error);

      alert(error.message);

    }

  };


  // =========================
  // FILTROS
  // =========================

  const turnosFiltrados =
    filtro === "todos"
      ? turnos
      : turnos.filter(
          (turno) => turno.estado === filtro
        );


  // =========================
  // INTERFAZ
  // =========================

  return (

    <div className="app-shell">


      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside className="sidebar">

        <div className="sidebar-header">

          <div className="logo-icon">
            ✂
          </div>

          <div>
            <h2>BarberPro</h2>
            <span>Gestión de barbería</span>
          </div>

        </div>


        <div className="sidebar-divider"></div>


        <div className="sidebar-section">

          <span className="sidebar-label">
            NUEVO TURNO
          </span>

          <TurnoForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            clientes={clientes}
            crearClienteNuevo={crearClienteNuevo}
          />

        </div>


        <div className="sidebar-footer">

          <div className="status-indicator"></div>

          <span>
            Sistema conectado
          </span>

        </div>

      </aside>



      {/* =====================================
          DASHBOARD
      ===================================== */}

      <main className="dashboard">


        {/* HEADER */}

        <header className="dashboard-header">

          <div>

            <span className="eyebrow">
              PANEL DE CONTROL
            </span>

            <h1>
              Agenda de Turnos
            </h1>

            <p>
              Gestioná tus turnos y clientes desde un solo lugar.
            </p>

          </div>


          <div className="header-date">

            <span>
              Hoy
            </span>

            <strong>
              {new Date().toLocaleDateString("es-AR", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </strong>

          </div>

        </header>



        {/* =====================================
            ESTADÍSTICAS
        ===================================== */}

        <section className="stats-container">


          <div className="stat-card">

            <div className="stat-icon purple">
              📅
            </div>

            <div>

              <span>
                Turnos totales
              </span>

              <strong>
                {stats.turnos_totales || 0}
              </strong>

            </div>

          </div>



          <div className="stat-card">

            <div className="stat-icon blue">
              🕐
            </div>

            <div>

              <span>
                Turnos hoy
              </span>

              <strong>
                {stats.turnos_hoy || 0}
              </strong>

            </div>

          </div>



          <div className="stat-card">

            <div className="stat-icon orange">
              ⏳
            </div>

            <div>

              <span>
                Pendientes
              </span>

              <strong>
                {stats.turnos_pendientes || 0}
              </strong>

            </div>

          </div>



          <div className="stat-card">

            <div className="stat-icon green">
              ✓
            </div>

            <div>

              <span>
                Confirmados
              </span>

              <strong>
                {stats.turnos_confirmados || 0}
              </strong>

            </div>

          </div>



          <div className="stat-card">

            <div className="stat-icon pink">
              👥
            </div>

            <div>

              <span>
                Clientes
              </span>

              <strong>
                {stats.clientes_totales || 0}
              </strong>

            </div>

          </div>


        </section>



        {/* =====================================
            GRÁFICO + AGENDA
        ===================================== */}

        <section className="dashboard-grid">


          {/* GRÁFICO */}

          <div className="dashboard-card chart-card">

            <div className="card-header">

              <div>

                <h2>
                  Estado de los turnos
                </h2>

                <p>
                  Distribución actual
                </p>

              </div>

            </div>


            <div className="chart-wrapper">

              <StatsChart stats={stats} />

            </div>

          </div>



          {/* AGENDA */}

          <div className="dashboard-card agenda-card">

            <div className="card-header">

              <div>

                <h2>
                  Agenda del día
                </h2>

                <p>
                  Horarios disponibles y ocupados
                </p>

              </div>

            </div>


            <div className="agenda-wrapper">

              <AgendaDia />

            </div>

          </div>


        </section>



        {/* =====================================
            LISTA DE TURNOS
        ===================================== */}

        <section className="turnos-section">


          <div className="turnos-header">

            <div>

              <h2>
                Próximos turnos
              </h2>

              <p>
                Administrá los turnos registrados.
              </p>

            </div>


            <div className="filtros">

              <button
                className={
                  filtro === "todos"
                    ? "active"
                    : ""
                }
                onClick={() => setFiltro("todos")}
              >
                Todos
              </button>


              <button
                className={
                  filtro === "pendiente"
                    ? "active"
                    : ""
                }
                onClick={() => setFiltro("pendiente")}
              >
                Pendientes
              </button>


              <button
                className={
                  filtro === "confirmado"
                    ? "active"
                    : ""
                }
                onClick={() => setFiltro("confirmado")}
              >
                Confirmados
              </button>

            </div>

          </div>



          <div className="turnos-list-container">

            <TurnoList
              turnos={turnosFiltrados}
              cambiarEstado={cambiarEstado}
              eliminarTurno={eliminarTurno}
            />

          </div>


        </section>


      </main>

    </div>

  );

}


export default App;