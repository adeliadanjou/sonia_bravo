const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userCreditSchema = new Schema({
  amount: Number,

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const UserCredit = mongoose.model('UserCredit', userCreditSchema);

module.exports = UserCredit;
