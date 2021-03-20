import 'reflect-metadata';
import FakeStorage from '@shared/container/providers/storageProviders/fakes/FakeStorage';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UserRepository from '../repositories/fakes/FakeUsersRepository';

describe('UpdateUserAvatar', () => {
  it('Should save file', async () => {
    const fakeStorageRepository = new FakeStorage();
    const fakeUserRepository = new UserRepository();
    const fakHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakHashProvider,
    );
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageRepository,
    );

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
    const fakeStorageRepository = new FakeStorage();
    const fakeUserRepository = new UserRepository();
    const fakHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakHashProvider,
    );
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageRepository,
    );

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
    const fakeStorageRepository = new FakeStorage();
    const fakeUserRepository = new UserRepository();

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageRepository,
    );

    expect(
      updateUserAvatarService.execute({
        user_id: '1',
        avatarFilename: 'avengers',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
