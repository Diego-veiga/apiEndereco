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

export default routes;
