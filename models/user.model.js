const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
