import CoreModel from './CoreModel.js';
import pool from '../services/pg-pool.service.js';

export default class Character extends CoreModel {
  static tableName = 'character';

  static async findAll() {
    const query = `
    SELECT c.*, w.name AS weapon_name
    FROM character c
    JOIN weapon w ON c.weapon_id = w.id;`;

    const { rows } = await pool.query(query);

    return rows;
  }

  static async findById(id) {
    const query = `
    SELECT c.*, w.name AS weapon_name
    FROM character c
    JOIN weapon w ON c.weapon_id = w.id
    WHERE c.id = ${id};`;

    const { rows } = await pool.query(query);

    return rows[0];
  }
}
