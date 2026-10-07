import { useEffect, useState } from "react";

function AgendaDia() {

  const [agenda, setAgenda] = useState([]);
  const [fecha, setFecha] = useState("");


  useEffect(() => {

    if (!fecha) {
      setAgenda([]);
      return;
    }

    const cargarAgenda = async () => {

      try {

        const res = await fetch(
          `http://localhost:3000/turnos/agenda?fecha=${fecha}`
        );

        if (!res.ok) {
          throw new Error("Error obteniendo agenda");
        }

        const data = await res.json();

        setAgenda(data);

      } catch (error) {

        console.error("Error cargando agenda:", error);

      }

    };

    cargarAgenda();

  }, [fecha]);


  return (

    <>

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
      />


      <div className="agenda-container">

        {agenda.length === 0 && fecha && (

          <div className="agenda-empty">
            No hay horarios disponibles.
          </div>

        )}


        {agenda.map((slot, i) => (

          <div
            key={i}
            className={`agenda-slot ${
              slot.cliente ? "ocupado" : "libre"
            }`}
          >

            <strong>
              {slot.hora}
            </strong>


            {slot.cliente ? (

              <span>
                {slot.cliente}
              </span>

            ) : (

              <span>
                Libre
              </span>

            )}

          </div>

        ))}

      </div>

    </>

  );
}

export default AgendaDia;