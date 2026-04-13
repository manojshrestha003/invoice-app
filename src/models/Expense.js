import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  category: { 
    type: String, 
    required: true,
    enum: ['Software', 'Hardware', 'Travel', 'Meals', 'Office Supplies', 'Advertising', 'Other'],
    default: 'Other'
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  description: { 
    type: String, 
    required: true 
  },
  taxAmount: { 
    type: Number, 
    default: 0 
  }
}, {
  timestamps: true
});

export default mongoose.models.Expense || mongoose.model('Expense', ExpenseSchema);
