// server/routes/planner.js
const express = require('express');
const DB = require('../db/database');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();
router.use(requireAuth);

router.get('/', (req, res) => {
  const uid = req.user.id;
  const { week } = req.query;
  const start = week || DB.today();
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  const endStr = end.toISOString().slice(0, 10);
  const tasks = DB.findAll('planner_tasks', t => t.user_id === uid && t.scheduled_date >= start && t.scheduled_date <= endStr)
    .sort((a, b) => (a.scheduled_date + (a.scheduled_time || '')).localeCompare(b.scheduled_date + (b.scheduled_time || '')));
  res.json(tasks);
});

router.post('/', (req, res) => {
  const { task_type, scheduled_date, scheduled_time, duration_min = 30, notes = '' } = req.body;
  if (!task_type || !scheduled_date) return res.status(400).json({ error: 'task_type and scheduled_date required' });
  const task = DB.insert('planner_tasks', { user_id: req.user.id, task_type, scheduled_date, scheduled_time, duration_min, notes, is_done: 0 });
  res.status(201).json(task);
});

router.patch('/:id/done', (req, res) => {
  const id = parseInt(req.params.id);
  DB.update('planner_tasks', t => t.id === id && t.user_id === req.user.id, { is_done: 1 });
  const task = DB.findOne('planner_tasks', t => t.id === id);
  if (task) DB.logActivity(req.user.id, task.duration_min || 30, 15);
  res.json({ success: true });
});

router.delete('/:id', (req, res) => {
  DB.delete('planner_tasks', t => t.id === parseInt(req.params.id) && t.user_id === req.user.id);
  res.json({ success: true });
});

module.exports = router;
