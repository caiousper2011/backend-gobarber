import 'reflect-metadata';
import AuthenticateUserService from '@modules/users/services/authenticateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AutheticateUser', () => {
  beforeEach(() => {
    fakeRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(fakeRepository, fakeHashProvider);
    authenticateUserService = new AuthenticateUserService(
      fakeRepository,
      fakeHashProvider,
    );
  });
  it('should authenticate an user', async () => {
    const userParams = {
      name: 'Caio Barbosa de Almeida',
      email: 'caio.almeida@hotmail.com',
      password: '123456',
    };

    await createUserService.execute(userParams);

    const { token } = await authenticateUserService.execute({
      email: userParams.email,
      password: userParams.password,
    });

    expect(token).toBeTruthy();
  });

  it('should avoid non user to be authenticated', async () => {
    const userParams = {
      name: 'Caio Barbosa de Almeida',
      email: 'caio.almeida@hotmail.com',
      password: '123456',
    };

    await createUserService.execute(userParams);

    await expect(
      authenticateUserService.execute({
        email: userParams.email,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      authenticateUserService.execute({
        email: 'caio.almeida@gmail.com',
        password: userParams.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
