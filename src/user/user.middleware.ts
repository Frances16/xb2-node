import { Request, Response, NextFunction } from 'express';
import * as userService from './user.service';
import bcryptjs from 'bcryptjs';

export const validateUserData = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('验证用户数据');

  const { name, password } = request.body;

  if (!name) return next(new Error('no name'));
  if (!password) return next(new Error('no password'));

  const user = await userService.getUserByName(name);
  if (user) return next(new Error('user exist'));

  next();
};

export const hashPassword = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { password } = request.body;
  request.body.password = await bcryptjs.hash(password, 10);
  next();
};
