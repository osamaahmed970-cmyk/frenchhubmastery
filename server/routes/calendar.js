// server/routes/calendar.js
const express = require('express');
const DB = require('../db/database');
const { requireAuth } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
router.use(requireAuth);

router.get('/export.ics', (req, res) => {
  const uid = req.user.id;
  const today = DB.today();
  const tasks = DB.findAll('planner_tasks', t => t.user_id === uid && t.scheduled_date >= today);
  const user = DB.findOne('users', u => u.id === uid);

  const NAMES = { vocab: '🃏 French Vocabulary (Anki)', grammar: '📝 French Grammar Drills', listen: '🎧 French Listening (Busuu)', write: '✍️ French Writing Practice', speak: '🎙️ French Speaking Practice', read: '📖 French Reading Practice' };

  function icsDate(dateStr, timeStr = '09:00') {
    return new Date(`${dateStr}T${timeStr}:00`).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  let ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//French Mastery Hub//EN', `X-WR-CALNAME:French Study — ${user?.name || 'Learner'}`];

  tasks.forEach(t => {
    const time = t.scheduled_time || '09:00';
    const end = new Date(`${t.scheduled_date}T${time}:00`);
    end.setMinutes(end.getMinutes() + (t.duration_min || 30));
    const endStr = end.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    ics = ics.concat(['BEGIN:VEVENT', `UID:${uuidv4()}@fmh`, `DTSTAMP:${now}`, `DTSTART:${icsDate(t.scheduled_date, time)}`, `DTEND:${endStr}`, `SUMMARY:${NAMES[t.task_type] || 'French Study'}`, `DESCRIPTION:${t.notes || 'French Mastery Hub study session'}`, 'STATUS:CONFIRMED', 'END:VEVENT']);
  });

  ics.push('END:VCALENDAR');
  res.set('Content-Type', 'text/calendar');
  res.set('Content-Disposition', 'attachment; filename="french-study.ics"');
  res.send(ics.join('\r\n'));
});

module.exports = router;
