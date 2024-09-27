const Feedback = require('../models/feedback.model');
const natural = require('natural');
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmerPt; // Stemmer para português

const analyzer = new Analyzer('PorterStemmerPt', stemmer, 'afinn');

exports.createFeedback = async (req, res) => {
  try {
    const { cliente, comentario } = req.body;
    const sentimentoScore = analyzer.getSentiment(comentario.split(' '));

    let sentimento;
    if (sentimentoScore > 0) {
      sentimento = 'positivo';
    } else if (sentimentoScore < 0) {
      sentimento = 'negativo';
    } else {
      sentimento = 'neutro';
    }

    const newFeedback = new Feedback({
      cliente,
      comentario,
      sentimento,
    });

    await newFeedback.save();
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
