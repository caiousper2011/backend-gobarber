import { Request, Response } from 'express';
import AuthenticateUserService from '@modules/users/services/authenticateUserService';

import { container } from 'tsyringe';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authentucateUserService = container.resolve(AuthenticateUserService);

    const { user, token } = await authentucateUserService.execute({
      email,
      password,
    });

    return response.json({ user: { ...user, password: undefined }, token });
  }
}

export default SessionsController;
