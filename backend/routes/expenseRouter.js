import express from 'express';

import { protect } from '../controllers/authController.js';
import { createExpense, deleteExpense, getAllExpenses, getExpenseById, getExpenseSummary, getExpenseSummaryByCategory, updateExpense } from '../controllers/expenseController.js';

const router = express.Router();

router.use(protect); // Protect all routes after this middleware

router
  .get('/', getAllExpenses)
  .post('/create', createExpense);

router
  .get('/summary/by-date', getExpenseSummary)
  .get('/summary/by-category', getExpenseSummaryByCategory);

router
  .route('/:id')
  .get(getExpenseById)
  .patch(updateExpense)
  .delete(deleteExpense);

export default router;
