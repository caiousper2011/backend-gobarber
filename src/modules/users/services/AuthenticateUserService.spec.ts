import 'reflect-metadata';
import AuthenticateUserService from '@modules/users/services/authenticateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AutheticateUser', () => {
  it('should authenticate an user', async () => {
    const fakeRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeRepository,
      fakeHashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeRepository,
      fakeHashProvider,
    );
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
    const fakeRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeRepository,
      fakeHashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeRepository,
      fakeHashProvider,
    );
    const userParams = {
      name: 'Caio Barbosa de Almeida',
      email: 'caio.almeida@hotmail.com',
      password: '123456',
    };

    await createUserService.execute(userParams);

    expect(
      authenticateUserService.execute({
        email: userParams.email,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);

    expect(
      authenticateUserService.execute({
        email: 'caio.almeida@gmail.com',
        password: userParams.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
