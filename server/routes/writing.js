// server/routes/writing.js
const express = require('express');
const DB = require('../db/database');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();
router.use(requireAuth);

const PROMPTS = {
  A1: [
    { prompt: 'Décrivez votre quartier à Oakville. Qu\'est-ce qu\'il y a près de chez vous?', min_words: 50, max_words: 80 },
    { prompt: 'Présentez votre famille. Combien de personnes?', min_words: 40, max_words: 70 },
    { prompt: 'Décrivez votre repas préféré.', min_words: 40, max_words: 70 },
  ],
  A2: [
    { prompt: 'Décrivez votre journée typique au Canada.', min_words: 80, max_words: 120 },
    { prompt: 'Écrivez un email à un ami pour décrire votre nouvelle vie à Oakville.', min_words: 80, max_words: 130 },
  ],
  B1: [
    { prompt: 'Racontez un souvenir important de votre vie. Utilisez le passé composé et l\'imparfait.', min_words: 120, max_words: 180 },
    { prompt: 'Les avantages et inconvénients de vivre en banlieue au Canada.', min_words: 120, max_words: 180 },
  ],
  B2: [
    { prompt: 'Pensez-vous que l\'immigration est bénéfique pour le Canada? Justifiez votre point de vue.', min_words: 200, max_words: 300 },
    { prompt: 'Rédigez une lettre de motivation pour un poste bilingue à Ottawa.', min_words: 200, max_words: 300 },
  ],
};

router.get('/prompts', (req, res) => res.json(PROMPTS[req.query.level] || PROMPTS['A1']));

router.get('/history', (req, res) => {
  const rows = DB.findAll('writing_submissions', r => r.user_id === req.user.id)
    .sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, 20)
    .map(r => ({ id: r.id, prompt: r.prompt, level: r.level, word_count: r.word_count, ai_score: r.ai_score, submitted_at: r.created_at }));
  res.json(rows);
});

module.exports = router;
