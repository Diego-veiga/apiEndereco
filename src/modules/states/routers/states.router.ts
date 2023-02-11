import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import StatesController from '../controllers/statesController';

const stateRouter = Router();

const statesController = new StatesController();

stateRouter.use(isAuthenticated);

stateRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      abbreviation: Joi.string().max(4).required(),
      contry_id: Joi.string().uuid().required(),
      active: Joi.boolean().optional(),
    },
  }),
  statesController.create,
);

stateRouter.get('/', statesController.index);

stateRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  statesController.show,
);
stateRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().min(2).required(),
      abbreviation: Joi.string().max(4).required(),
      contry_id: Joi.string().uuid().required(),
    },
  }),
  statesController.update,
);
stateRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  statesController.delete,
);

export default stateRouter;
