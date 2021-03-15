import 'reflect-metadata';
import express, { Response, NextFunction, Request } from 'express';
import cors from 'cors';
import 'express-async-errors';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import routes from './routes';
import '@shared/infra/typeorm';

import '@shared/container';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }

    console.error(error);

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  },
);
app.listen(3333, () => {
  console.log('server on 😎');
});
