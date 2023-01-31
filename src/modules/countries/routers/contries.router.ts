import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import ContriesController from '../controllers/contriesController';

const contriesRouter = Router();

const contriesController = new ContriesController();

contriesRouter.use(isAuthenticated);

contriesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
    },
  }),
  contriesController.create,
);

export default contriesRouter;
