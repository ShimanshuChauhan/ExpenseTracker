import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import userRouter from './routes/userRouter.js';
import AppError from './utils/appError.js';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/test', (req, res) => {
  res.status(401).json({
    status: 'server is running'
  });
});

app.use('/api/v1/users', userRouter);

app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


export default app;