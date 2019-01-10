const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type:String, unique: true},
  password: String, 
  email: String,
  restaurant: {type: Boolean, default: false},
  tables: [{type: Schema.Types.ObjectId, ref: 'Table'}],
  restaurantName: String,
  address: String,         
  zipCode: Number,
  lat: String,
  lng: String,         
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
