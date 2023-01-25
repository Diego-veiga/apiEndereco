import uploadConfig from '@config/upload';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import multer from 'multer';
import UserAvatarController from '../controllers/UserAvatarController';
import UserController from '../controllers/userControllers';

const usersRoute = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRoute.get('/', isAuthenticated, userController.index);
usersRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().max(50).required(),
      lastName: Joi.string().max(50).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

usersRoute.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
export default usersRoute;
