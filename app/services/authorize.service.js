import User from '../models/User.js';
import APIError from './APIError.service.js';
import jwtService from './jwt.service.js';

export async function isMember(req, _res, next) {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];

  const { result, error } = jwtService.verifyToken(token);

  if (result) {
    const user = await User.findById(result.id);

    if (user.role === 'member' || user.role === 'admin') {
      req.result = user;
      next();
    } else {
      const err = new APIError('Vous n\'êtes pas autorisé', 401);
      next(err);
    }
  }

  if (error) {
    const err = new APIError('Vous n\'êtes pas autorisé', 401);
    next(err);
  }
}

export async function IsAdmin(req, _res, next) {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];

  const { result, error } = jwtService.verifyToken(token);

  if (result) {
    const user = await User.findById(result.id);
    if (user.role === 'admin') {
      req.result = user;
      next();
    } else {
      const err = new APIError('Vous n\'êtes pas autorisé', 401);
      next(err);
    }
  }

  if (error) {
    const err = new APIError('Vous n\'êtes pas autorisé', 401);
    next(err);
  }
}
