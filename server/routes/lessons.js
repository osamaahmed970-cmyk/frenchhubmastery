// server/routes/lessons.js
const express = require('express');
const DB = require('../db/database');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  const { level } = req.query;
  let lessons = DB.findAll('lessons', l => !level || l.level === level);
  lessons = lessons.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
  const uid = req.user.id;
  const withProgress = lessons.map(l => {
    const ul = DB.findOne('user_lessons', r => r.user_id === uid && r.lesson_id === l.id);
    return { ...l, status: ul?.status || 'not_started', score: ul?.score, completed_at: ul?.completed_at };
  });
  res.json(withProgress);
});

router.get('/:id', (req, res) => {
  const lesson = DB.findOne('lessons', l => l.id === parseInt(req.params.id));
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  const progress = DB.findOne('user_lessons', r => r.user_id === req.user.id && r.lesson_id === lesson.id);
  res.json({ ...lesson, content: lesson.content ? JSON.parse(lesson.content) : null, progress });
});

router.post('/:id/complete', (req, res) => {
  const lessonId = parseInt(req.params.id);
  const lesson = DB.findOne('lessons', l => l.id === lessonId);
  if (!lesson) return res.status(404).json({ error: 'Lesson not found' });
  const uid = req.user.id;
  const { score = 100 } = req.body;
  DB.upsert('user_lessons',
    r => r.user_id === uid && r.lesson_id === lessonId,
    { user_id: uid, lesson_id: lessonId, status: 'completed', score, completed_at: new Date().toISOString() }
  );
  DB.logActivity(uid, lesson.duration_min || 30, lesson.xp_reward || 50);
  res.json({ success: true, xp_earned: lesson.xp_reward });
});

module.exports = router;
