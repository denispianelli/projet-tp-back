import APIError from './APIError.service.js';

export default function notFound(_req, _res, next) {
  const err = new APIError('Not Found', 404);
  next(err);
}
