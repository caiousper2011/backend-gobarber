import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
console.log('erro');

const { create } = new AppointmentController();

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRouter.post('/', create);

export default appointmentsRouter;
