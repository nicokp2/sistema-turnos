const db = require("./src/db/db");

const clientes = [
  {
    nombre: "Juan Pérez",
    telefono: "11-5555-1001",
    email: "juan@gmail.com"
  },
  {
    nombre: "Lucas Gómez",
    telefono: "11-5555-1002",
    email: "lucas@gmail.com"
  },
  {
    nombre: "Matías Rodríguez",
    telefono: "11-5555-1003",
    email: "matias@gmail.com"
  },
  {
    nombre: "Nicolás López",
    telefono: "11-5555-1004",
    email: "nicolas@gmail.com"
  },
  {
    nombre: "Santiago Fernández",
    telefono: "11-5555-1005",
    email: "santiago@gmail.com"
  },
  {
    nombre: "Agustín Martínez",
    telefono: "11-5555-1006",
    email: "agustin@gmail.com"
  },
  {
    nombre: "Tomás González",
    telefono: "11-5555-1007",
    email: "tomas@gmail.com"
  },
  {
    nombre: "Franco Díaz",
    telefono: "11-5555-1008",
    email: "franco@gmail.com"
  },
  {
    nombre: "Martín Romero",
    telefono: "11-5555-1009",
    email: "martin@gmail.com"
  },
  {
    nombre: "Facundo Torres",
    telefono: "11-5555-1010",
    email: "facundo@gmail.com"
  }
];


const turnos = [
  {
    cliente: "Juan Pérez",
    dias: 0,
    hora: "09:00",
    servicio: "Corte",
    estado: "confirmado"
  },
  {
    cliente: "Lucas Gómez",
    dias: 0,
    hora: "09:30",
    servicio: "Barba",
    estado: "pendiente"
  },
  {
    cliente: "Matías Rodríguez",
    dias: 0,
    hora: "10:00",
    servicio: "Corte + barba",
    estado: "confirmado"
  },
  {
    cliente: "Nicolás López",
    dias: 0,
    hora: "11:00",
    servicio: "Corte",
    estado: "pendiente"
  },
  {
    cliente: "Santiago Fernández",
    dias: 0,
    hora: "12:00",
    servicio: "Corte",
    estado: "confirmado"
  },

  {
    cliente: "Agustín Martínez",
    dias: 1,
    hora: "09:00",
    servicio: "Barba",
    estado: "pendiente"
  },
  {
    cliente: "Tomás González",
    dias: 1,
    hora: "10:00",
    servicio: "Corte",
    estado: "confirmado"
  },
  {
    cliente: "Franco Díaz",
    dias: 1,
    hora: "11:30",
    servicio: "Corte + barba",
    estado: "pendiente"
  },
  {
    cliente: "Martín Romero",
    dias: 1,
    hora: "15:00",
    servicio: "Corte",
    estado: "confirmado"
  },

  {
    cliente: "Facundo Torres",
    dias: 2,
    hora: "09:30",
    servicio: "Corte",
    estado: "pendiente"
  },
  {
    cliente: "Juan Pérez",
    dias: 2,
    hora: "10:30",
    servicio: "Barba",
    estado: "confirmado"
  },
  {
    cliente: "Lucas Gómez",
    dias: 2,
    hora: "12:00",
    servicio: "Corte",
    estado: "pendiente"
  },

  {
    cliente: "Matías Rodríguez",
    dias: 3,
    hora: "09:00",
    servicio: "Corte",
    estado: "confirmado"
  },
  {
    cliente: "Nicolás López",
    dias: 3,
    hora: "11:00",
    servicio: "Barba",
    estado: "pendiente"
  },
  {
    cliente: "Santiago Fernández",
    dias: 3,
    hora: "16:00",
    servicio: "Corte + barba",
    estado: "confirmado"
  }
];


function obtenerFecha(dias) {

  const fecha = new Date();

  fecha.setHours(12, 0, 0, 0);

  fecha.setDate(fecha.getDate() + dias);

  return fecha.toISOString().split("T")[0];
}


async function seed() {

  try {

    console.log("");
    console.log("=================================");
    console.log("   BARBERPRO - DATOS DE PRUEBA");
    console.log("=================================");
    console.log("");


    // =================================
    // CLIENTES
    // =================================

    const idsClientes = {};

    for (const cliente of clientes) {

      const existente = await db.query(
        `SELECT id
         FROM clientes
         WHERE nombre = $1`,
        [cliente.nombre]
      );


      if (existente.rows.length > 0) {

        idsClientes[cliente.nombre] = existente.rows[0].id;

        console.log(`Cliente existente: ${cliente.nombre}`);

      } else {

        const resultado = await db.query(
          `INSERT INTO clientes
           (nombre, telefono, email)
           VALUES ($1, $2, $3)
           RETURNING id`,
          [
            cliente.nombre,
            cliente.telefono,
            cliente.email
          ]
        );

        idsClientes[cliente.nombre] = resultado.rows[0].id;

        console.log(`✓ Cliente creado: ${cliente.nombre}`);
      }
    }


    console.log("");
    console.log("Clientes procesados correctamente.");
    console.log("");


    // =================================
    // TURNOS
    // =================================

    for (const turno of turnos) {

      const clienteId = idsClientes[turno.cliente];

      const fecha = obtenerFecha(turno.dias);


      // Comprobar que no exista
      // un turno en ese horario

      const existente = await db.query(
        `SELECT id
         FROM turnos
         WHERE fecha = $1
         AND hora = $2`,
        [
          fecha,
          turno.hora
        ]
      );


      if (existente.rows.length > 0) {

        console.log(
          `Turno existente: ${fecha} ${turno.hora}`
        );

        continue;
      }


      await db.query(
        `INSERT INTO turnos
         (cliente_id, fecha, hora, servicio, estado)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          clienteId,
          fecha,
          turno.hora,
          turno.servicio,
          turno.estado
        ]
      );


      console.log(
        `✓ Turno creado: ${fecha} ${turno.hora}`
      );
    }


    console.log("");
    console.log("=================================");
    console.log(" DATOS CARGADOS CORRECTAMENTE");
    console.log("=================================");
    console.log("");

  } catch (error) {

    console.error("");
    console.error("ERROR AL CARGAR LOS DATOS:");
    console.error(error);
    console.error("");

  } finally {

    await db.end();

  }
}


seed();