import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as userService from '../user/user.service';
import bcryptjs from 'bcryptjs';
import { PUBLIC_KEY } from '../app/app.config';
import { TokenPayload } from './auth.interface';

/* 验证用户登录数据 */
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

  request.body.user = user;

  next();
};

/* 验证用户身份 */
export const authGuard = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log('验证用户身份');
  try {
    const authorization = request.header('Authorization');
    if (!authorization) throw new Error();

    const token = authorization.replace('Bearer ', '');
    if (!token) throw new Error();

    const decoded = jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });

    request.user = decoded as TokenPayload;

    next();
  } catch (error) {
    next(new Error('UNAUTHORIZED'));
  }
};
