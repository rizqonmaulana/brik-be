import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { errorResponse } from '../helper/response';
import { UserRole } from '../model/user';

interface CustomRequest extends Request {
  token?: any; // Define the token property
}

export const isLogin = (req: CustomRequest, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  if (token) {
    token = token.split(' ')[1];
    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (error, result) => {
      if (
        (error && error.name === 'JsonWebTokenError') ||
        (error && error.name === 'TokenExpiredError')
      ) {
        console.log(error);
        return res.status(403).json(errorResponse('Invalid token', error.message));
      } else {
        req.token = result;
        next();
      }
    });
  } else {
    return res.status(400).json(errorResponse('Please login first'));
  }
};

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  const userData = req.token;

  if (!userData || userData.role !== UserRole.ADMIN) {
    return res.status(401).json(errorResponse('You are not allowed to access this page'));
  } else {
    next();
  }
};
