import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
// import User from '../infra/typeorm/entities/User';
import { IUserRepository } from '../repositories/IUsersRepository';
import IMailProvider from '../../../shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository') private userRepository: IUserRepository,
    @inject('MailProvider') private mailProvider: IMailProvider,
    @inject('UserTokenRepository') private userToken: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists', 404);
    }

    const { token } = await this.userToken.generate(user.id);

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido! token: ${token}`,
    );
  }
}

export default SendForgotPasswordEmailService;
