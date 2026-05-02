// server/routes/progress.js
const express = require('express');
const DB = require('../db/database');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();
router.use(requireAuth);

router.get('/dashboard', (req, res) => {
  const uid = req.user.id;
  const sessions = DB.findAll('study_sessions', s => s.user_id === uid);
  const totalMin = sessions.reduce((a, s) => a + (s.duration_min || 0), 0);
  const totalXP = sessions.reduce((a, s) => a + (s.xp_earned || 0), 0);
  const mastered = DB.findAll('user_vocab', v => v.user_id === uid && v.repetitions > 2).length;
  const completedLessons = DB.findAll('user_lessons', l => l.user_id === uid && l.status === 'completed');
  const allDrills = DB.findAll('user_drill_attempts', d => d.user_id === uid);
  const recentDrills = allDrills.slice(-50);
  const accuracy = recentDrills.length ? Math.round(recentDrills.filter(d => d.is_correct).length / recentDrills.length * 100) : 0;

  const activity = DB.findAll('daily_activity', a => a.user_id === uid)
    .sort((a, b) => a.activity_date.localeCompare(b.activity_date));
  const last28 = activity.filter(a => a.activity_date >= new Date(Date.now() - 28*86400000).toISOString().slice(0, 10));

  // Streak
  const streak = computeStreak(uid);

  // Skill scores
  const skillScores = DB.findAll('skill_scores', s => s.user_id === uid);
  const skills = {};
  skillScores.forEach(s => {
    if (!skills[s.skill]) skills[s.skill] = [];
    skills[s.skill].push(s.score);
  });
  const skillAvg = Object.entries(skills).map(([skill, scores]) => ({
    skill, score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
  }));

  const user = DB.findOne('users', u => u.id === uid);
  const daysLeft = user?.target_date
    ? Math.max(0, Math.ceil((new Date(user.target_date) - new Date()) / 86400000))
    : null;

  res.json({
    totalHours: Math.round(totalMin / 60 * 10) / 10,
    totalXP,
    wordsMastered: mastered,
    lessonsCompleted: completedLessons.length,
    lessonsTotal: DB.findAll('lessons').length,
    drillAccuracy: accuracy,
    streak,
    hoursByDay: last28,
    skills: skillAvg,
    daysLeft,
    targetExam: user?.target_exam,
    city: user?.city,
  });
});

function computeStreak(userId) {
  const days = DB.findAll('daily_activity', a => a.user_id === userId && a.total_minutes > 0)
    .map(a => a.activity_date).sort((a, b) => b.localeCompare(a));
  if (!days.length) return { current: 0, longest: 0 };
  let streak = 0;
  let check = new Date().toISOString().slice(0, 10);
  for (const day of days) {
    if (day === check) {
      streak++;
      const d = new Date(check); d.setDate(d.getDate() - 1);
      check = d.toISOString().slice(0, 10);
    } else break;
  }
  return { current: streak, longest: streak };
}

router.get('/weak-areas', (req, res) => {
  const uid = req.user.id;
  const skillScores = DB.findAll('skill_scores', s => s.user_id === uid);
  const skills = {};
  skillScores.forEach(s => {
    if (!skills[s.skill]) skills[s.skill] = [];
    skills[s.skill].push(s.score);
  });
  const DEFAULTS = { listening: 50, reading: 60, writing: 45, speaking: 35, grammar: 60, vocab: 70 };
  const RECS = {
    listening: 'Listen to RFI Savoirs 10 min/day. Try shadowing — pause and repeat after native speakers.',
    reading: 'Read one French article from Radio-Canada weekly. Use the Reading section for practice.',
    writing: 'Write 50 words per day in French. Submit for AI feedback to catch article/gender errors.',
    speaking: 'Record yourself daily for 60 seconds. Shadow Québécois YouTubers.',
    grammar: 'Do 10 grammar drills per session. Review every explanation carefully.',
    vocab: 'Study Anki deck at lunch daily. Aim for 20 cards — never skip review cards.',
  };
  const result = Object.entries(DEFAULTS).map(([skill, defaultScore]) => {
    const scores = skills[skill] || [];
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : defaultScore;
    return { skill, avg_score: avg, recommendation: RECS[skill], isWeak: avg < 65 };
  }).sort((a, b) => a.avg_score - b.avg_score);
  res.json(result);
});

router.post('/session', (req, res) => {
  const { session_type, duration_min, xp_earned = 0 } = req.body;
  DB.insert('study_sessions', { user_id: req.user.id, session_type, duration_min, xp_earned });
  DB.logActivity(req.user.id, duration_min, xp_earned);
  res.json({ success: true });
});

router.post('/skill', (req, res) => {
  const { skill, score } = req.body;
  DB.insert('skill_scores', { user_id: req.user.id, skill, score: Math.min(100, Math.max(0, score)) });
  res.json({ success: true });
});

module.exports = router;
