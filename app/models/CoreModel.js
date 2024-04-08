import pool from '../services/pg-pool.service.js';

/**
 * Classe représentant un modèle de base pour les entités de la base de données.
 */
export default class CoreModel {
  /**
   * Récupère toutes les entités de la table correspondante.
   * @returns {Promise<Array<Object>>} Une promesse contenant un tableau
   * d'objets représentant les entités.
   */
  static async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;

    const { rows } = await pool.query(query);

    return rows;
  }

  /**
   * Récupère une entité par son identifiant.
   * @param {number} id - L'identifiant de l'entité à récupérer.
   * @returns {Promise<Object>} Une promesse contenant l'objet représentant l'entité.
   */
  static async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ${id};`;

    const { rows } = await pool.query(query);

    return rows[0];
  }

  /**
   * Crée une nouvelle entité dans la table correspondante.
   * @param {Object} data - Les données de l'entité à créer.
   * @returns {Promise<Object>} Une promesse contenant l'objet représentant l'entité créée.
   */
  static async create(data) {
    const columns = Object.keys(data);
    const values = Object.values(data);

    const placeholders = values.map((_, i) => `$${i + 1}`);

    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;

    const { rows } = await pool.query(query, values);

    return rows[0];
  }

  /**
   * Met à jour une entité existante dans la table correspondante.
   * @param {number} id - L'identifiant de l'entité à mettre à jour.
   * @param {Object} data - Les nouvelles données de l'entité.
   * @returns {Promise<Object>} Une promesse contenant l'objet représentant l'entité mise à jour.
   */
  static async update(id, data) {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map((key, i) => `${key} = $${i + 1}`);

    const query = `UPDATE ${this.tableName} SET ${placeholders} WHERE id = ${id} RETURNING *`;

    const { rows } = await pool.query(query, values);

    return rows[0];
  }

  /**
   * Supprime une entité de la table correspondante.
   * @param {number} id - L'identifiant de l'entité à supprimer.
   * @returns {Promise<Object>} Une promesse contenant l'objet représentant l'entité supprimée.
   */
  static async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ${id}`;

    const { rows } = await pool.query(query);

    return rows[0];
  }
}
