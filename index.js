const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
const feedbackRoutes = require('./routes/feedback.routes');
app.use('/api/feedback', feedbackRoutes);

// Conexão ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error(err));

// Rotas básicas
app.get('/', (req, res) => {
  res.send('Feedify API');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
