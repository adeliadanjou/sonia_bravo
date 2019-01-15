const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const {getConnection} = require("../database");

const userCreditSchema = new Schema({
  amount: Number,

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const Credit = (mongo) => getConnection(mongo).model('Credit', userCreditSchema)

module.exports = Credit;
