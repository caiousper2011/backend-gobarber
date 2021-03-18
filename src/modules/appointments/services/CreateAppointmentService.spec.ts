import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

describe('CreateAppointment', () => {
  it('should be able to a new appointment', async () => {
    const fakeAppointmetsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmetsRepository,
    );
    const appointmentParams = {
      date: new Date(),
      provider_id: '12345',
    };

    const appointment = await createAppointment.execute(appointmentParams);

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(appointmentParams.provider_id);
  });

  it('should not be able to create two appointments at the same time', async () => {
    const fakeAppointmetsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmetsRepository,
    );

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
