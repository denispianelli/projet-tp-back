import userDatamapper from '../datamappers/user.datamapper.js';
import jwtService from './jwt.service.js';

export async function isMember(req, _res, next) {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];

  const { result, error } = jwtService.verifyToken(token);

  if (result) {
    const user = await userDatamapper.findUserById(result.id);

    if (user.role === 'member' || user.role === 'admin') {
      req.result = user;
      next();
    } else {
      const err = new Error('Vous n\'êtes pas autorisé');
      err.status = 401;
      next(err);
    }
  }

  if (error) {
    next(error);
  }
}

export async function IsAdmin(req, _res, next) {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];

  const { result, error } = jwtService.verifyToken(token);

  if (result) {
    const user = await userDatamapper.findUserById(result.id);
    if (user.role === 'admin') {
      req.result = user;
      next();
    } else {
      const err = new Error('Vous n\'êtes pas autorisé');
      err.status = 401;
      next(err);
    }
  } else {
    next(error);
  }
}
