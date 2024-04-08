/**
 * Classe représentant une erreur API.
 * @extends Error
 */
export default class APIError extends Error {
  /**
   * Crée une instance d'APIError.
   * @param {string} message - Le message d'erreur.
   * @param {number} status - Le statut de l'erreur.
   */
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
