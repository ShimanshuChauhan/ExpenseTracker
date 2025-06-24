import expenseModel from '../models/expenseModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getAllExpenses = catchAsync(async (req, res, next) => {
  const expenses = await expenseModel.find({ user: req.user.id }).sort({ date: -1 });

  res.status(200).json({
    status: 'success',
    results: expenses.length,
    data: {
      expenses
    }
  });
});

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

export const getExpenseById = catchAsync(async (req, res, next) => {
  const expenseId = req.params.id;
  const expense = await expenseModel.findById(expenseId);

  if (!expense) {
    return next(new AppError('No expense found with that ID', 404));
  }

  if (expense.user.toString() !== req.user.id) {
    return next(new AppError('You do not have permission to view this expense', 403));
  }

  res.status(200).json({
    status: 'success',
    data: {
      expense
    }
  });
});