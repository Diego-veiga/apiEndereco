import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import '@shared/typeorm';
import { errors } from 'celebrate';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use('/files', express.static(uploadConfig.directory));

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response
        .status(error.statusCode)
        .json({ status: 'error', message: error.message });
    }

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal Server Error' });
  },
);

app.listen(3333, () => {
  console.log('server started on port 3333');
});
