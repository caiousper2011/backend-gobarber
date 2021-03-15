import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const { create } = new SessionsController();

sessionsRouter.post('/', create);

export default sessionsRouter;
