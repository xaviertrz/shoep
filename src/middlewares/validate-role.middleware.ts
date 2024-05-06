import { NextFunction, Request, Response } from 'express';
import { HttpResponseCodes } from '../shared/HttpResponseCodes';

export function validateRole(role_id: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body.token_role_id !== role_id) {
      return res
        .status(HttpResponseCodes.UNAUTHORIZED)
        .json({ message: 'El rol del usuario no tiene acceso a esa funcionalidad' });
    }
    next();
  };
}
