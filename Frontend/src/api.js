const BASE_URL = "http://localhost:3000";

export const getTurnos = async () => {
const response = await fetch(`${BASE_URL}/turnos`);
if (!response.ok) throw new Error("Error obteniendo turnos");
return await response.json();
};

export const getClientes = async () => {
const response = await fetch(`${BASE_URL}/clientes`);
if (!response.ok) throw new Error("Error obteniendo clientes");
return await response.json();
};

export const crearTurno = async (formData) => {
const response = await fetch(`${BASE_URL}/turnos`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(formData),
});

if (!response.ok) throw new Error("Error creando turno");
return await response.json();
};

export const actualizarTurno = async (id, datos) => {
const response = await fetch(`${BASE_URL}/turnos/${id}`, {
method: "PUT",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(datos),
});

if (!response.ok) throw new Error("Error actualizando turno");
return await response.json();
};

export const eliminarTurno = async (id) => {
const response = await fetch(`${BASE_URL}/turnos/${id}`, {
method: "DELETE",
});

if (!response.ok) throw new Error("Error eliminando turno");
};

export const getStats = async () => {
const response = await fetch(`${BASE_URL}/stats/turnos`);

if (!response.ok) throw new Error("Error obteniendo estadísticas");

return await response.json();
};

export const crearCliente = async (nombre) => {
const response = await fetch(`${BASE_URL}/clientes`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ nombre }),
});

if (!response.ok) throw new Error("Error creando cliente");
return await response.json();
};
