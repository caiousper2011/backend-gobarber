import { container } from 'tsyringe';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository';
import { IUserRepository } from '@modules/users/repositories/IUsersRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import '@modules/users/providers';

container.registerSingleton<IAppointmentsRepository>(
  'AppontmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository);
