import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmetsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmetsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmetsRepository);
  });

  it('should be able to a new appointment', async () => {
    const appointmentParams = {
      date: new Date(),
      provider_id: '12345',
    };

    const appointment = await createAppointment.execute(appointmentParams);

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(appointmentParams.provider_id);
  });

  it('should not be able to create two appointments at the same time', async () => {
    const appointmentDate = new Date(2021, 2, 17);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '12345',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
