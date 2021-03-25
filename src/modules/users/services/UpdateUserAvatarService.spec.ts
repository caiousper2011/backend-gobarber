import 'reflect-metadata';
import FakeStorage from '@shared/container/providers/storageProviders/fakes/FakeStorage';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UserRepository from '../repositories/fakes/FakeUsersRepository';

let fakeStorageRepository: FakeStorage;
let fakeUserRepository: UserRepository;
let fakHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeStorageRepository = new FakeStorage();
    fakeUserRepository = new UserRepository();
    fakHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakHashProvider,
    );
    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageRepository,
    );
  });

  it('Should save file', async () => {
    const user = await createUserService.execute({
      email: 'caiousper2011@hotmail.com',
      name: 'Caio Barbosa de almeida',
      password: '123456',
    });

    const saveAvatar = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avengers',
    });

    expect(saveAvatar).toHaveProperty('id');
  });

  it('Should update avatar', async () => {
    const deleteFile = jest.spyOn(fakeStorageRepository, 'deleteFile');

    const user = await createUserService.execute({
      email: 'caiousper2011@hotmail.com',
      name: 'Caio Barbosa de almeida',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avengers',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'avengers end game',
    });

    expect(deleteFile).toHaveBeenCalledWith('avengers');
    expect(user.avatar).toBe('avengers end game');
  });

  it('Should not update or create avatar when not authenticated user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: '1',
        avatarFilename: 'avengers',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
