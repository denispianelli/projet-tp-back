import pool from '../services/pg-pool.service.js';

export default {
  async getAllCharacters() {
    const sqlQuery = {
      text: 'SELECT * FROM get_characters_with_weapons()',
      values: [],
    };

    const result = await pool.query(sqlQuery);
    return result.rows;
  },
};
