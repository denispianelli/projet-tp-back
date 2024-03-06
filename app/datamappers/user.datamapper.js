import pool from '../services/pg-pool.service.js';

export default {
  async findUserById(id) {
    const sqlQuery = {
      text: 'SELECT * FROM get_user($1);',
      values: [id],
    };

    const result = await pool.query(sqlQuery);
    return result.rows[0];
  },
  async findUserByUsername(username) {
    const sqlQuery = {
      text: 'SELECT * FROM check_user_exists_by_username($1);',
      values: [username],
    };

    const result = await pool.query(sqlQuery);
    return result.rows[0];
  },
  async findUserByEmail(email) {
    const sqlQuery = {
      text: 'SELECT * FROM check_user_exists_by_email($1);',
      values: [email],
    };

    const result = await pool.query(sqlQuery);
    return result.rows[0].check_user_exists_by_email;
  },
  async createUser(user) {
    const sqlQuery = {
      text: 'SELECT * FROM create_user($1);',
      values: [user],
    };

    const result = await pool.query(sqlQuery);
    return result.rows[0];
  },
  async updateUser(user) {
    const sqlQuery = {
      text: 'SELECT * FROM update_user_infos($1);',
      values: [user],
    };
    const result = await pool.query(sqlQuery);
    return result.rows[0];
  },

  async getAllUnlockedCharacters(userId) {
    const sqlQuery = {
      text: 'SELECT * FROM get_user_character($1)',
      values: [userId],
    };

    const result = await pool.query(sqlQuery);

    return result.rows;
  },
  async postUnlockCharacter(userId, characterId) {
    const sqlQuery = {
      text: 'SELECT * FROM post_unlocked_character($1, $2)',
      values: [userId, characterId],
    };

    const result = await pool.query(sqlQuery);

    return result.rows[0];
  },
};
