import citiesRouter from '@modules/cities/routers/cities.router';
import contriesRouter from '@modules/countries/routers/contries.router';
import stateRouter from '@modules/states/routers/states.router';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import sessionRoute from '@modules/users/routes/sessions.routes';
import usersRoute from '@modules/users/routes/user.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRoute);
routes.use('/session', sessionRoute);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/contries', contriesRouter);
routes.use('/states', stateRouter);
routes.use('/cities', citiesRouter);

export default routes;
