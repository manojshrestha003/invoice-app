import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  total: { type: Number, required: true, min: 0 },
});

const InvoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  date: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['PAID', 'UNPAID', 'PENDING'], default: 'PENDING' },
  items: { type: [ItemSchema], required: true },
  totalAmount: { type: Number, required: true },
  notes: String,
});

export default mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
