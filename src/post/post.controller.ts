import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { getPosts, createPost, updatePost, deletePost } from './post.service';
import { PostModel } from './post.model';

export const index = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const posts = await getPosts();
    response.send(posts);
  } catch (error) {
    next(error);
  }
};

export const store = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { title, content } = request.body;
  try {
    const data = await createPost({ title, content });
    response.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { postId } = request.params;
  const post = _.pick(request.body, ['title', 'content']);
  try {
    const data = await updatePost(postId, post);
    response.send(data);
  } catch (error) {
    next(error);
  }
};

export const destroy = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { postId } = request.params;
  try {
    const data = await deletePost(postId);
    response.send(data);
  } catch (error) {
    next(error);
  }
};
