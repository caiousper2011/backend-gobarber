import 'reflect-metadata';
import CreateUserService from '@modules/users/services/CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should create um user', async () => {
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
    const userParams = {
      name: 'Caio Barbosa',
      email: 'caio.almeida@hotmail.com',
      password: '123456',
    };

    await createUserService.execute(userParams);

    await expect(createUserService.execute(userParams)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
