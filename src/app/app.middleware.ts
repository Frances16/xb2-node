import { Request, Response, NextFunction } from 'express';

export const requestUrl = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.log(request.url);
  next();
};

export const defaultErrorHandle = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  if (error.message) {
    console.log(error.message);
  }

  let statusCode: number, message: string;

  switch (error.message) {
    case 'no name':
      statusCode = 400;
      message = '请提供用户名';
      break;
    case 'no password':
      statusCode = 400;
      message = '请提供用户密码';
      break;
    case 'user exist':
      statusCode = 409;
      message = '用户名已被占用';
      break;
    case 'user not exist':
      statusCode = 400;
      message = '用户名不存在';
      break;
    case 'password not match':
      statusCode = 400;
      message = '密码不对';
      break;
    case 'UNAUTHORIZED':
      statusCode = 401;
      message = '请先登录';
      break;
    default:
      statusCode = 500;
      message = '服务器出了点问题';
      break;
  }
  response.status(statusCode).send({ message });
};
