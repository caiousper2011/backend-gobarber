import 'reflect-metadata';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '../../../shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '../../../shared/errors/AppError';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPassEmailService: SendForgotPasswordEmailService;
let fakeUserTokenRepository: FakeUserTokenRepository;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    sendForgotPassEmailService = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });

  it('should be able to recover password using the email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'Caio Barbosa',
      email: 'caio.almeida@gmail.com',
      password: '123456',
    });

    await sendForgotPassEmailService.execute({
      email: 'caio.almeida@gmail.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('should not be able to recover a  non-existing user password', async () => {
    await expect(
      sendForgotPassEmailService.execute({
        email: 'caio.almeida@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    await fakeUserRepository.create({
      name: 'caio barbsoa',
      email: 'caio.almeida@gmail.com',
      password: '1234',
    });

    await sendForgotPassEmailService.execute({
      email: 'caio.almeida@gmail.com',
    });

    expect(generateToken).toHaveBeenCalled();
  });
});
