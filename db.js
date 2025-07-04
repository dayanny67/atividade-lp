const { pool } = require ('pg');

const pool = new ({
    user: 'postgres',
    host: 'localhost',
    database: 'loja',
    password: '1234',
    port: 5432,
})
