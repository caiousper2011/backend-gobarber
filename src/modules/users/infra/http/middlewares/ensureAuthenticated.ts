import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void | Response {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({ error: 'token is missed' });
  }

  const [, tokenToBeValidated] = token.split(' ');

  try {
    const decoded = verify(tokenToBeValidated, authConfig.jwt.secret);
    const { sub } = decoded as ITokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'invalid token' });
  }
}
