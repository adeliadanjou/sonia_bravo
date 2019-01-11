const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const messageSchema = new Schema({
  destination: {type: String, match: /^\S+@\S+\.\S+$/},
  body: {type: String, maxlength: 30},
  status: {type: String, enum:["OK", "NO ENVIADO", "TIMEOUT"]}
       
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
