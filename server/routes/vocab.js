// server/routes/vocab.js
const express = require('express');
const DB = require('../db/database');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();
router.use(requireAuth);

function sm2(card, rating) {
  const q = { hard: 1, okay: 3, easy: 5 }[rating] ?? 3;
  let { ease_factor = 2.5, interval_days = 1, repetitions = 0 } = card;
  if (q >= 3) {
    if (repetitions === 0) interval_days = 1;
    else if (repetitions === 1) interval_days = 6;
    else interval_days = Math.round(interval_days * ease_factor);
    repetitions++;
  } else {
    repetitions = 0; interval_days = 1;
  }
  ease_factor = Math.max(1.3, ease_factor + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval_days);
  return { ease_factor: Math.round(ease_factor * 100) / 100, interval_days, repetitions, next_review: nextReview.toISOString().slice(0, 10) };
}

router.get('/due', (req, res) => {
  const uid = req.user.id;
  const { level } = req.query;
  const today = DB.today();
  let cards = DB.findAll('vocab_cards', c => !level || c.level === level);
  const withProgress = cards.map(c => {
    const uv = DB.findOne('user_vocab', r => r.user_id === uid && r.card_id === c.id);
    return { ...c, ...uv, next_review: uv?.next_review || today };
  });
  const due = withProgress.filter(c => c.next_review <= today).slice(0, 25);
  res.json({ cards: due, count: due.length });
});

router.get('/stats', (req, res) => {
  const uid = req.user.id;
  const all = DB.findAll('user_vocab', r => r.user_id === uid);
  res.json({
    new_count: DB.findAll('vocab_cards').length - all.length,
    learning: all.filter(r => r.repetitions > 0 && r.repetitions <= 2).length,
    mastered: all.filter(r => r.repetitions > 2).length,
    due_today: all.filter(r => r.next_review <= DB.today()).length,
  });
});

router.post('/review', (req, res) => {
  const { card_id, rating } = req.body;
  const uid = req.user.id;
  const existing = DB.findOne('user_vocab', r => r.user_id === uid && r.card_id === card_id);
  const updated = sm2(existing || {}, rating);
  DB.upsert('user_vocab', r => r.user_id === uid && r.card_id === card_id,
    { user_id: uid, card_id, ...updated, last_rating: rating }
  );
  const xp = { hard: 5, okay: 10, easy: 15 }[rating] || 5;
  DB.logActivity(uid, 1, xp);
  res.json({ success: true, next_review: updated.next_review, xp_earned: xp });
});

module.exports = router;
