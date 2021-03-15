import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import { IUserRepository } from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository') private userRepository: IUserRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('incorrect email/password combination', 401);
    }

    const passworMatched = await compare(password, user.password);

    if (!passworMatched) {
      throw new AppError('incorrect email/password combination', 401);
    }
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ id: user.id }, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
