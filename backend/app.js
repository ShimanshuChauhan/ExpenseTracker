import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config({ path: './config.env' });

import userRouter from './routes/userRouter.js';
import expenseRouter from './routes/expenseRouter.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

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
app.use('/api/v1/expenses', expenseRouter);

app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;