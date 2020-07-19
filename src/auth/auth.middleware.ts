import { Request, Response, NextFunction } from 'express';
import * as userService from '../user/user.service';
import bcryptjs from 'bcryptjs';

export const validateLoginData = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('验证用户登录数据');

  const { name, password } = request.body;

  if (!name) return next(new Error('no name'));
  if (!password) return next(new Error('no password'));

  const user = await userService.getUserByName(name, { password: true });
  if (!user) return next(new Error('user not exist'));

  const matched = await bcryptjs.compare(password, user.password);
  if (!matched) return next(new Error('password not match'));

  next();
};
