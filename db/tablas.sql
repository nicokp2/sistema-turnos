CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE barberos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE servicios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    duracion_minutos INTEGER NOT NULL,
    precio NUMERIC(10,2) NOT NULL
);

CREATE TABLE turnos (
    id SERIAL PRIMARY KEY,
    cliente_id INTEGER REFERENCES clientes(id) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    servicio VARCHAR(100) NOT NULL,
    estado VARCHAR(50) DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE turnos
ADD CONSTRAINT turno_unico_fecha_hora
UNIQUE (fecha, hora);

SELECT id, nombre FROM clientes;

DELETE FROM clientes WHERE id = 5;

ALTER TABLE clientes
ADD CONSTRAINT clientes_nombre_unique UNIQUE (nombre);

SELECT * FROM turnos;

SELECT COUNT(*) FROM turnos;
SELECT COUNT(*) FROM turnos WHERE estado = 'pendiente';
SELECT COUNT(*) FROM turnos WHERE estado = 'confirmado';
SELECT COUNT(*) FROM turnos WHERE fecha = CURRENT_DATE;





