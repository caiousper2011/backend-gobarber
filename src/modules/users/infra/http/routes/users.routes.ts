import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig);
const { create } = new UsersController();
const { update } = new UserAvatarController();

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('file'),
  update,
);

usersRouter.post('/', create);

export default usersRouter;
