import pool from '../services/pg-pool.service.js';

export default class CoreModel {
  static async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;

    const { rows } = await pool.query(query);

    return rows;
  }

  static async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ${id};`;

    const { rows } = await pool.query(query);

    return rows[0];
  }

  static async create(data) {
    const columns = Object.keys(data);
    const values = Object.values(data);

    const placeholders = values.map((_, i) => `$${i + 1}`);

    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;

    const { rows } = await pool.query(query, values);

    return rows[0];
  }

  static async update(id, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map((key, i) => `${key} = $${i + 1}`);

    const query = `UPDATE ${this.tableName} SET ${placeholders} WHERE id = ${id} RETURNING *`;

    const { rows } = await pool.query(query, values);

    return rows[0];
  }

  static async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ${id}`;

    const { rows } = await pool.query(query);

    return rows[0];
  }
}
