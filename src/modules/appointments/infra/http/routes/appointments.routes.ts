import { Router } from 'express';
import AppointmentController from '../controllers/AppointmentController';

const appointmentsRouter = Router();
const { create } = new AppointmentController();

console.log('teste final husky');

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRouter.post('/', create);

export default appointmentsRouter;
