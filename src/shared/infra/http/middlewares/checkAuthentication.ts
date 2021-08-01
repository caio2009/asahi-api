import AppError from "@shared/errors/AppError";
import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

interface IDecodedToken {
  sub: string;
}

export default function checkAuthentication(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError(401, 'Missing access token.');
  }

  const [, accessToken] = authorization?.split(' ');

  if (!accessToken) {
    throw new AppError(401, 'Missing access token.');
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) as IDecodedToken;

    req.user = decoded.sub;

    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      throw new AppError(401, 'Expired access token.');
    }

    if (err instanceof JsonWebTokenError) {
      throw new AppError(401, 'Invalid access token.');
    }
  }
}