/**
 * Middleware qui génère une erreur "Not Found" et la transmet à la prochaine fonction
 * de middleware.
 * @param {import('express').Request} req L'objet de requête Express.
 * @param {import('express').Response} res L'objet de réponse Express.
 * @param {import('express').NextFunction} next La fonction next de Express.
 */
export default function notFound(_req, _res, next) {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
}
