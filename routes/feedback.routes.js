const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/feedback.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, FeedbackController.getAllFeedback);
router.post('/', FeedbackController.createFeedback); // Supondo que clientes possam enviar feedback sem autenticação

module.exports = router;
