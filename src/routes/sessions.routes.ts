import { Router } from 'express';
import AuthenticateUserService from '../services/authenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const authentucateUserService = new AuthenticateUserService();

    const { user, token } = await authentucateUserService.execute({
      email,
      password,
    });

    return res.json({ ...user, password: undefined, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
