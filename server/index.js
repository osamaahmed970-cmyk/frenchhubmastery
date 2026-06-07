// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const IS_PROD = process.env.NODE_ENV === 'production';

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({
  origin: IS_PROD
    ? [process.env.CLIENT_URL, /\.vercel\.app$/, /\.railway\.app$/].filter(Boolean)
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(__dirname, 'uploads', 'audio');
try { fs.mkdirSync(UPLOADS_DIR, { recursive: true }); } catch (e) { console.warn('[startup] Could not create uploads dir:', e.message); }
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Seed database on startup ──────────────────────────────────────────────────
const { seedIfEmpty } = require('./db/seed');
seedIfEmpty();

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api/auth',     require('./routes/auth'));
app.use('/api/lessons',  require('./routes/lessons'));
app.use('/api/vocab',    require('./routes/vocab'));
app.use('/api/grammar',  require('./routes/grammar'));
app.use('/api/writing',  require('./routes/writing'));
app.use('/api/speaking', require('./routes/speaking'));
app.use('/api/progress', require('./routes/progress'));
app.use('/api/planner',  require('./routes/planner'));
app.use('/api/ai',       require('./routes/ai'));
app.use('/api/calendar', require('./routes/calendar'));
app.use('/api/content',  require('./routes/content'));

app.get('/api/health', (req, res) => res.json({
  status: 'ok',
  env: process.env.NODE_ENV,
  timestamp: new Date().toISOString()
}));

// ── Serve React build in production ──────────────────────────────────────────
if (IS_PROD) {
  const buildPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(buildPath));
  // All non-API routes serve the React app
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(buildPath, 'index.html'));
    }
  });
}

// ── Error handler ─────────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[Error]', err.message);
  res.status(err.status || 500).json({
    error: IS_PROD ? 'Something went wrong' : err.message
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('  🇫🇷  French Mastery Hub');
  console.log(`  🌍  Running on port ${PORT}`);
  console.log(`  📦  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('');
});
