import auth from '@config/auth';
import AppError from '@shared/errors/AppError';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthencticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, auth.jwt.secret);
    const { sub } = decodeToken as TokenPayload;

    request.user = {
      id: sub,
    };
    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token.');
  }
}
