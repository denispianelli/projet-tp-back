import pool from '../services/pg-pool.service.js';

export default {
  async getAll(tableName) {
    const sqlQuery = {
      text: 'SELECT * FROM get_all_from_table($1)',
      values: [tableName],
    };

    const result = await pool.query(sqlQuery);

    return result.rows;
  },
};
