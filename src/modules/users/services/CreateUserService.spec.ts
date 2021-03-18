import 'reflect-metadata';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUsers', () => {
  it('should create um user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const userParams = {
      name: 'Caio Barbosa',
      email: 'caio.almeida@hotmail.com',
      password: '123456',
    };

    const user = await createUserService.execute(userParams);

    expect(user.email).toBe(userParams.email);
    expect(user).toHaveProperty('id');
  });

  it('should avoid to create user already created', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const userParams = {
      name: 'Caio Barbosa',
      email: 'caio.almeida@hotmail.com',
      password: '123456',
    };

    await createUserService.execute(userParams);

    expect(createUserService.execute(userParams)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
