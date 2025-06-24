import express from 'express';

import { protect } from '../controllers/authController.js';
import { createExpense, getAllExpenses, getExpenseById, updateExpense } from '../controllers/expenseController.js';

const router = express.Router();

router.use(protect); // Protect all routes after this middleware

router
  .get('/', getAllExpenses)
  .post('/create', createExpense);

router
  .route('/:id')
  .get(getExpenseById)
  .patch(updateExpense);

export default router;
