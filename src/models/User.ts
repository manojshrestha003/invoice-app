import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ""
  },
  company: {
    type: String
  },
  address: {
    type: String
  },
  defaultTaxRate: {
    type: Number,
    default: 0
  }
});


const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
