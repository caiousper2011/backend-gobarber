import { container } from 'tsyringe';
import './providers';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';
import { IUserRepository } from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import '@modules/users/providers';
import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppontmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UsersTokenRepository,
);
