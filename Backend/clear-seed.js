const db = require("./src/db/db");

async function limpiarDatos() {
  try {
    console.log("");
    console.log("=================================");
    console.log("   LIMPIANDO DATOS DE PRUEBA");
    console.log("=================================");
    console.log("");

    // Primero eliminamos los turnos
    await db.query("DELETE FROM turnos");

    // Después eliminamos los clientes
    await db.query("DELETE FROM clientes");

    console.log("✓ Turnos eliminados");
    console.log("✓ Clientes eliminados");

    console.log("");
    console.log("=================================");
    console.log("   BASE LIMPIA");
    console.log("=================================");
    console.log("");

  } catch (error) {
    console.error("Error limpiando los datos:");
    console.error(error);

  } finally {
    await db.end();
  }
}

limpiarDatos();