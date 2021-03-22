import AppError from '@shared/errors/AppError';
import 'reflect-metadata';

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let resetPasswordService: ResetPasswordService;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });

  it('should reset password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Caio Barbosa',
      email: 'caio.almeida@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({ token, password: '12345678' });

    await fakeUserRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalled();
  });

  it('should be able to reset password with non existing token', async () => {
    expect(
      resetPasswordService.execute({ token: '', password: '12345678' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to reset password with non existing user', async () => {
    const { token } = await fakeUserTokenRepository.generate('not user id');

    expect(
      resetPasswordService.execute({ token, password: '12345678' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'Caio Barbosa',
      email: 'caio.almeida@gmail.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({ token, password: '12345678' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
