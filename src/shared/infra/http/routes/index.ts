import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const routes = Router();
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
routes.use(ensureAuthenticated);
routes.use('/appointments', appointmentsRouter);

export default routes;
