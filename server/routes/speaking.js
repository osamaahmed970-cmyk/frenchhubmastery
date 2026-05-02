// server/routes/speaking.js
const express = require('express');
const DB = require('../db/database');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();
router.use(requireAuth);

const PROMPTS = {
  A1: ['Présentez-vous. Comment vous appelez-vous? D\'où venez-vous?', 'Décrivez votre famille.', 'Quel est votre repas préféré?'],
  A2: ['Décrivez votre journée typique au Canada.', 'Parlez d\'Oakville. Qu\'est-ce que vous aimez?'],
  B1: ['Quelles sont les différences entre votre pays d\'origine et le Canada?', 'Parlez de vos projets d\'avenir au Canada.'],
  B2: ['Les avantages et inconvénients de l\'immigration économique au Canada.', 'Le bilinguisme est-il bénéfique pour le Canada?'],
};

router.get('/prompts', (req, res) => res.json(PROMPTS[req.query.level] || PROMPTS['A1']));
router.get('/history', (req, res) => {
  res.json(DB.findAll('speaking_recordings', r => r.user_id === req.user.id)
    .sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 20));
});

module.exports = router;
