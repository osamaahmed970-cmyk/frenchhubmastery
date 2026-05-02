// server/routes/auth.js
const express = require('express');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const DB = require('../db/database');
const { signToken, requireAuth } = require('../middleware/auth');
const router = express.Router();

function hashPw(pw) {
  return crypto.createHash('sha256').update(pw + 'fmh_salt_2026').digest('hex');
}

router.post('/register', (req, res) => {
  const { name, email, password, city = 'Oakville' } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Name, email, and password are required.' });
  if (DB.findOne('users', u => u.email === email.toLowerCase())) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }
  const user = DB.insert('users', {
    id: uuidv4(), name, email: email.toLowerCase(),
    password: hashPw(password), city,
    target_level: 'B2', target_exam: 'TEF', target_date: '2027-12-01',
  });
  // Seed default planner
  seedDefaultPlanner(user.id);
  const token = signToken({ id: user.id, email: user.email, name: user.name });
  res.status(201).json({ token, user: { id: user.id, name, email: user.email, city } });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = DB.findOne('users', u => u.email === email?.toLowerCase());
  if (!user || user.password !== hashPw(password)) {
    return res.status(401).json({ error: 'Incorrect email or password.' });
  }
  const token = signToken({ id: user.id, email: user.email, name: user.name });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, city: user.city, target_exam: user.target_exam, target_date: user.target_date } });
});

router.get('/me', requireAuth, (req, res) => {
  const user = DB.findOne('users', u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  const { password, ...safe } = user;
  res.json(safe);
});

function seedDefaultPlanner(userId) {
  const today = new Date();
  const tasks = [
    { task_type: 'grammar', scheduled_time: '23:30', duration_min: 45, notes: 'Tutor session (Monday)' },
    { task_type: 'vocab',   scheduled_time: '12:30', duration_min: 15, notes: 'Anki lunch session' },
    { task_type: 'listen',  scheduled_time: '19:00', duration_min: 30, notes: 'Busuu listening (Tue/Fri)' },
    { task_type: 'read',    scheduled_time: '10:00', duration_min: 45, notes: 'Saturday workbook' },
    { task_type: 'write',   scheduled_time: '11:00', duration_min: 30, notes: 'Writing practice' },
  ];
  tasks.forEach(t => DB.insert('planner_tasks', { user_id: userId, scheduled_date: DB.today(), is_done: 0, ...t }));
}

module.exports = router;
