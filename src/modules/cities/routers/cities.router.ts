import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import CitiesController from '../controllers/citiesController';

const citiesRouter = Router();

const citiesController = new CitiesController();

citiesRouter.use(isAuthenticated);

citiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      state_id: Joi.string().uuid().required(),
      active: Joi.boolean().optional(),
    },
  }),
  citiesController.create,
);

citiesRouter.get('/', citiesController.index);

citiesRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  citiesController.show,
);
citiesRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      state_id: Joi.string().uuid().required(),
      active: Joi.boolean().optional(),
    },
  }),
  citiesController.update,
);
citiesRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  citiesController.delete,
);

export default citiesRouter;
