import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount must be positive']
  },

  category: {
    type: String,
    required: true,
    enum: ['Food', 'Transport', 'Health', 'Shopping', 'Bills', 'Entertainment', 'Other'],
    trim: true
  },

  description: {
    type: String,
    default: '',
    trim: true
  },

  date: {
    type: Date,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Expense', expenseSchema);
