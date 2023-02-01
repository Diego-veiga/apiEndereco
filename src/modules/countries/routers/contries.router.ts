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

contriesRouter.get('/', contriesController.index);

contriesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  contriesController.show,
);
contriesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
    },
  }),
  contriesController.update,
);
contriesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  contriesController.delete,
);

export default contriesRouter;
