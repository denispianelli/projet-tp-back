import pool from '../services/pg-pool.service.js';
import CoreModel from './CoreModel.js';

export default class User extends CoreModel {
  static tableName = 'public."user"';

  static async findByUsername(username) {
    const query = 'SELECT * FROM public."user" WHERE username = $1;';
    const { rows } = await pool.query(query, [username]);
    return rows[0];
  }

  static async getAllUnlockedCharacters(userId) {
    const query = `
    SELECT DISTINCT u.id, u.username, u.coins, c.name as character_name, c.fullname, c.description, w.name, w.description, w.evolved, w.base_damage, w.cooldown, w.knockback
    FROM public.user u
    JOIN unlocked_character uc ON uc.user_id = u.id
    JOIN character c ON uc.character_id = c.id
    JOIN weapon w ON c.weapon_id = w.id
    WHERE u.id = $1;
    `;

    const { rows } = await pool.query(query, [userId]);

    return rows;
  }

  static async unlockCharacter(userId, characterId) {
    const query = 'INSERT INTO unlocked_character (user_id, character_id) VALUES ($1, $2) RETURNING *';

    const { rows } = await pool.query(query, [userId, characterId]);

    return rows[0];
  }
}
