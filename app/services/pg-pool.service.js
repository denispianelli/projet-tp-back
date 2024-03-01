import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool();

pool.connect();

export default pool;
