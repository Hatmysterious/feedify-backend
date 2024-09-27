const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  cliente: String,
  comentario: String,
  sentimento: String, // Já está incluído
  data: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
