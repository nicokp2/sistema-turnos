const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sistema_gestion',
    password: 'Mellizos2001',
    port: 5432,
});

module.exports = pool;
