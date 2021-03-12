import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/authenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const authentucateUserService = new AuthenticateUserService();

  const { user, token } = await authentucateUserService.execute({
    email,
    password,
  });

  return res.json({ user: { ...user, password: undefined }, token });
});

export default sessionsRouter;
