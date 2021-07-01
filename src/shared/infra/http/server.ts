import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import initDB from '@shared/infra/typeorm';
import initDI from '@shared/di';
import appRouter from '@shared/infra/http/routes';
import AppError from '@shared/errors/AppError';

initDB().then(() => {
  initDI();

  const app = express();
  const PORT = 3333;
  
  app.use(express.json());
  
  app.use(appRouter());

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.errorStatus).json(err);
    }

    console.log(err);

    return res.status(500).json({
      errorStatus: 500,
      message: 'Internal server error!'
    });
  });

  app.listen(PORT, () => console.log(`Backend started on port ${PORT}.`));
});