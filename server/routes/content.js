// server/routes/content.js
// GET /api/content/readings?level=A1
// GET /api/content/writing?level=A1
// GET /api/content/speaking?level=A1
// GET /api/content/listening?level=A1

const express = require('express');
const fs = require('fs');
const path = require('path');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth);

function getData() {
  const dataPath = path.join(__dirname, '..', 'db', 'data.json');
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch { return {}; }
}

router.get('/readings', (req, res) => {
  const { level } = req.query;
  const data = getData();
  const readings = (data.readings || []).filter(r => !level || r.level === level);
  res.json(readings);
});

router.get('/writing', (req, res) => {
  const { level } = req.query;
  const data = getData();
  const prompts = (data.writing_prompts || []).filter(p => !level || p.level === level);
  res.json(prompts);
});

router.get('/speaking', (req, res) => {
  const { level } = req.query;
  const data = getData();
  const prompts = (data.speaking_prompts || []).filter(p => !level || p.level === level);
  res.json(prompts);
});

router.get('/listening', (req, res) => {
  const { level } = req.query;
  const data = getData();
  const tracks = (data.listening_tracks || []).filter(t => !level || t.level === level);
  res.json(tracks);
});

module.exports = router;
