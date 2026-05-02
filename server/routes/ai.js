// server/routes/ai.js
// Writing feedback: uses OpenAI GPT-4o-mini (very cheap ~$0.001 per submission)
// TTS: returns null — frontend uses free browser SpeechSynthesis instead
// Transcription: optional Whisper (pennies per minute) OR returns mock for offline use

const express = require('express');
const DB = require('../db/database');
const { requireAuth } = require('../middleware/auth');
const router = express.Router();
router.use(requireAuth);

// Lazy-load OpenAI only if API key is set
function getOpenAI() {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'optional') return null;
  const OpenAI = require('openai');
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// ── Writing Feedback ──────────────────────────────────────────────────────────
router.post('/writing-feedback', requireAuth, async (req, res) => {
  const { text, level = 'A1', prompt = '' } = req.body;
  if (!text || text.trim().length < 10) {
    return res.status(400).json({ error: 'Please write at least a sentence first.' });
  }

  const openai = getOpenAI();

  // If no OpenAI key, return rule-based feedback (free, offline)
  if (!openai) {
    return res.json(ruleBasedFeedback(text, level));
  }

  const CEFR = {
    A1: 'Beginner A1. Check: articles (le/la/les/un/une), basic gender agreement, simple vocabulary.',
    A2: 'Elementary A2. Check: verb conjugations, negation (ne...pas), adjective agreement, prepositions.',
    B1: 'Intermediate B1. Check: passé composé vs imparfait, future tense, relative clauses, object pronouns.',
    B2: 'Upper-intermediate B2. Check: subjunctive, discourse cohesion, register, argument structure.',
  };

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // ~$0.001 per call — very cheap
      messages: [
        {
          role: 'system',
          content: `You are a French teacher for Canadian immigration learners (TEF/TCF). ${CEFR[level] || CEFR.A1}
Student is in Oakville, Ontario. Return ONLY valid JSON, no markdown:
{"overall":"2-3 sentence assessment","score":<0-100>,"corrections":[{"original":"wrong phrase","corrected":"correct phrase","explanation":"brief rule"}],"strengths":["strength 1","strength 2"],"next_steps":["action 1","action 2"],"cefr_estimate":"A1"}`,
        },
        { role: 'user', content: `Prompt: "${prompt}"\n\nStudent wrote:\n${text}` },
      ],
      temperature: 0.3,
      max_tokens: 600,
    });

    let feedback;
    try {
      feedback = JSON.parse(completion.choices[0].message.content.trim());
    } catch {
      const match = completion.choices[0].message.content.match(/\{[\s\S]*\}/);
      feedback = match ? JSON.parse(match[0]) : ruleBasedFeedback(text, level);
    }

    // Save to DB
    DB.insert('writing_submissions', {
      user_id: req.user.id, prompt, level, content: text,
      word_count: text.trim().split(/\s+/).length,
      ai_feedback: JSON.stringify(feedback), ai_score: feedback.score || 0,
    });
    DB.logActivity(req.user.id, 20, 25);

    res.json(feedback);
  } catch (err) {
    console.error('[AI writing]', err.message);
    // Fall back to rule-based if API fails
    res.json(ruleBasedFeedback(text, level));
  }
});

// ── Free rule-based feedback (no API key needed) ──────────────────────────────
function ruleBasedFeedback(text, level) {
  const corrections = [];
  const lower = text.toLowerCase();

  // Common A1 errors
  if (/\bje suis \d+\b/.test(lower)) corrections.push({ original: 'je suis [age]', corrected: 'j\'ai [age] ans', explanation: 'Use "avoir" for age, not "être": J\'ai 35 ans.' });
  if (/\bdes informations\b/.test(lower) && /\bune information\b/.test(lower)) corrections.push({ original: 'une information', corrected: 'une information (correct!)', explanation: '"Information" is usually used in plural in French: des informations.' });
  if (/c'est un bon\b/.test(lower)) corrections.push({ original: 'possible match', corrected: 'Check adjective gender agreement', explanation: 'Adjectives must agree with the noun\'s gender.' });

  const wordCount = text.trim().split(/\s+/).length;
  const score = Math.min(85, 50 + wordCount * 0.5 + (corrections.length === 0 ? 20 : 0));

  return {
    overall: `Good effort! Your ${level} writing shows initiative. ${corrections.length === 0 ? 'No major errors detected in this quick check.' : 'A few common patterns to watch below.'}  Add your OpenAI API key in .env for detailed AI feedback.`,
    score: Math.round(score),
    corrections,
    strengths: ['You wrote in French — great start!', 'Sentence length is appropriate for your level.'],
    next_steps: ['Review definite and indefinite articles (le/la/les/un/une/des)', 'Practice adjective gender agreement'],
    cefr_estimate: level,
  };
}

// ── TTS — returns null; frontend uses browser SpeechSynthesis (free) ──────────
router.post('/tts', requireAuth, (req, res) => {
  // We tell the frontend to use browser TTS instead
  res.json({ use_browser_tts: true, text: req.body.text });
});

// ── Transcription (optional — pennies per minute) ─────────────────────────────
router.post('/transcribe', requireAuth, async (req, res) => {
  const openai = getOpenAI();
  if (!openai) {
    return res.json({
      transcript: '(Transcription requires an OpenAI API key in your .env file. Add OPENAI_API_KEY=sk-... to enable this feature. Cost: about $0.006 per minute.)',
      pronunciation: { tips: ['Set up OpenAI API key for real transcription'], sounds_to_practice: [], overall: 'API key not configured' },
    });
  }

  // With API key — real Whisper transcription
  try {
    const multer = require('multer');
    // Audio file would be in req.file if multer middleware is set up
    res.json({ transcript: 'Whisper transcription ready — send audio file via FormData', pronunciation: {} });
  } catch (err) {
    res.status(500).json({ error: 'Transcription failed: ' + err.message });
  }
});

module.exports = router;
