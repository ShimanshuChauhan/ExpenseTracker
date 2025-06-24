import expenseModel from '../models/expenseModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const createExpense = catchAsync(async (req, res, next) => {
  const { amount, description, category, date } = req.body;

  if (!amount || !description || !category || !date) {
    return next(new AppError('Please provide all required fields!', 400));
  }

  const expense = await expenseModel.create({
    amount,
    description,
    category,
    user: req.user.id,
    date: new Date(date)
  });

  res.status(201).json({
    status: 'success',
    data: {
      expense
    }
  });
});