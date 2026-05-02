// server/routes/grammar.js
const express = require('express');
const DB = require('../db/database');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  const { level, category, limit = 10 } = req.query;
  let drills = DB.findAll('grammar_drills', d => (!level || d.level === level) && (!category || d.category === category));
  drills = drills.sort(() => Math.random() - 0.5).slice(0, parseInt(limit));
  res.json(drills);
});

router.post('/attempt', (req, res) => {
  const { drill_id, chosen_idx } = req.body;
  const drill = DB.findOne('grammar_drills', d => d.id === drill_id);
  if (!drill) return res.status(404).json({ error: 'Drill not found' });
  const is_correct = chosen_idx === drill.correct_idx;
  DB.insert('user_drill_attempts', { user_id: req.user.id, drill_id, chosen_idx, is_correct: is_correct ? 1 : 0 });
  DB.logActivity(req.user.id, 1, is_correct ? 10 : 2);
  res.json({ is_correct, correct_idx: drill.correct_idx, explanation: drill.explanation, xp_earned: is_correct ? 10 : 2 });
});

router.get('/history', (req, res) => {
  const attempts = DB.findAll('user_drill_attempts', r => r.user_id === req.user.id);
  const byCategory = {};
  attempts.forEach(a => {
    const drill = DB.findOne('grammar_drills', d => d.id === a.drill_id);
    if (!drill) return;
    if (!byCategory[drill.category]) byCategory[drill.category] = { correct: 0, total: 0 };
    byCategory[drill.category].total++;
    if (a.is_correct) byCategory[drill.category].correct++;
  });
  const result = Object.entries(byCategory).map(([category, stats]) => ({
    category, ...stats, accuracy: Math.round((stats.correct / stats.total) * 100)
  })).sort((a, b) => a.accuracy - b.accuracy);
  res.json(result);
});

module.exports = router;
