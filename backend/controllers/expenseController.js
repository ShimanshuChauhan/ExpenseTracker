import expenseModel from '../models/expenseModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import { mongoose } from 'mongoose';

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

export const updateExpense = catchAsync(async (req, res, next) => {
  const { amount, description, category, date } = req.body;
  const expenseId = req.params.id;
  const expense = await expenseModel.findById(expenseId);

  if (!expense) {
    return next(new AppError('No expense found with that ID', 404));
  }

  if (expense.user.toString() !== req.user.id) {
    return next(new AppError('You do not have permission to update this expense', 403));
  }

  const updateData = {};
  if (amount) { updateData.amount = amount; }
  if (description) { updateData.description = description; }
  if (category) { updateData.category = category; }
  if (date) { updateData.date = new Date(date); }

  const updatedExpense = await expenseModel.findByIdAndUpdate(expenseId, updateData, { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    data: {
      expense: updatedExpense
    }
  });
});

export const deleteExpense = catchAsync(async (req, res, next) => {
  const expenseId = req.params.id;
  const expense = await expenseModel.findById(expenseId);

  if (!expense) {
    return next(new AppError('No expense found with that ID', 404));
  }

  if (expense.user.toString() !== req.user.id) {
    return next(new AppError('You do not have permission to delete this expense', 403));
  }

  await expenseModel.findByIdAndDelete(expenseId);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

export const getExpenseSummary = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { range } = req.query;

  let startDate = new Date();
  let groupFormat = '%Y-%m-%d';

  if (range === 'weekly') {
    startDate.setDate(startDate.getDate() - 6);
  } else if (range === 'monthly') {
    startDate.setDate(startDate.getDate() - 29);
  } else if (range === '6months') {
    startDate.setMonth(startDate.getMonth() - 5);
    groupFormat = '%Y-%m';
  } else {
    return next(new AppError('Invalid range parameter', 400));
  }

  const summary = await expenseModel.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        date: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: groupFormat, date: '$date' } },
        total: { $sum: '$amount' }
      }
    },
    {
      $sort: { _id: 1 }
    },
    {
      $group: {
        _id: null,
        summary: {
          $push: {
            date: '$_id',
            total: '$total'
          }
        },
        totalExpense: { $sum: '$total' }
      }
    },
    {
      $project: {
        _id: 0,
        summary: 1,
        totalExpense: 1
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      summary
    }
  });
});