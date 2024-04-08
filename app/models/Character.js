import CoreModel from './CoreModel.js';
import pool from '../services/pg-pool.service.js';

/**
 * Représente un personnage dans le jeu.
 */
export default class Character extends CoreModel {
  static tableName = 'character';

  /**
   * Récupère tous les personnages de la base de données.
   * @returns {Promise<Array>} Une promesse contenant un tableau de personnages.
   */
  static async findAll() {
    const query = `
    SELECT c.*, w.name AS weapon_name
    FROM character c
    JOIN weapon w ON c.weapon_id = w.id;`;

    const { rows } = await pool.query(query);

    return rows;
  }

  /**
   * Récupère un personnage par son identifiant.
   * @param {number} id - L'identifiant du personnage.
   * @returns {Promise<Object>} Une promesse contenant le personnage trouvé.
   */
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
