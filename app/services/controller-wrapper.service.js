/**
 * Middleware qui enveloppe un contrôleur asynchrone et gère les erreurs qui pourraient survenir.
 * @param {Function} controller Le contrôleur à exécuter.
 * @returns {Function} Middleware Express qui appelle le contrôleur avec les
 * arguments req, res, next.
 */
export default (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (err) {
    next(err);
  }
};
