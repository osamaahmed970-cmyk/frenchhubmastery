// server/db/database.js
// Zero-dependency JSON file database — works on all platforms, no compiling needed
// Data is stored in server/db/data.json

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_FILE = path.join(__dirname, 'data.json');

// Default empty database structure
const DEFAULT_DB = {
  users: [],
  lessons: [],
  user_lessons: [],
  vocab_cards: [],
  user_vocab: [],
  grammar_drills: [],
  user_drill_attempts: [],
  writing_submissions: [],
  speaking_recordings: [],
  study_sessions: [],
  skill_scores: [],
  planner_tasks: [],
  daily_activity: [],
};

// Load DB from file, or create fresh
function loadDB() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    saveDB(DEFAULT_DB);
    return JSON.parse(JSON.stringify(DEFAULT_DB));
  }
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  } catch {
    return JSON.parse(JSON.stringify(DEFAULT_DB));
  }
}

// Save DB back to file
function saveDB(db) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

// Auto-incrementing ID counter per table
function nextId(table) {
  const db = loadDB();
  const items = db[table] || [];
  return items.length === 0 ? 1 : Math.max(...items.map(i => i.id || 0)) + 1;
}

// ── Query helpers (mimic SQLite API) ─────────────────────────────────────────

const DB = {
  // Find all matching rows
  findAll(table, predicate = () => true) {
    const db = loadDB();
    return (db[table] || []).filter(predicate);
  },

  // Find first matching row
  findOne(table, predicate) {
    return this.findAll(table, predicate)[0] || null;
  },

  // Insert a row, returns the new row
  insert(table, data) {
    const db = loadDB();
    if (!db[table]) db[table] = [];
    const row = {
      id: nextId(table),
      created_at: new Date().toISOString(),
      ...data,
    };
    db[table].push(row);
    saveDB(db);
    return row;
  },

  // Update rows matching predicate
  update(table, predicate, changes) {
    const db = loadDB();
    let count = 0;
    db[table] = (db[table] || []).map(row => {
      if (predicate(row)) {
        count++;
        return { ...row, ...changes, updated_at: new Date().toISOString() };
      }
      return row;
    });
    saveDB(db);
    return count;
  },

  // Upsert: update if exists, insert if not
  upsert(table, predicate, data) {
    const existing = this.findOne(table, predicate);
    if (existing) {
      return this.update(table, r => r.id === existing.id, data);
    } else {
      return this.insert(table, data);
    }
  },

  // Delete rows matching predicate
  delete(table, predicate) {
    const db = loadDB();
    const before = db[table].length;
    db[table] = db[table].filter(r => !predicate(r));
    saveDB(db);
    return before - db[table].length;
  },

  // Increment numeric fields on matching rows
  increment(table, predicate, fields) {
    const db = loadDB();
    db[table] = (db[table] || []).map(row => {
      if (predicate(row)) {
        const updated = { ...row };
        for (const [k, v] of Object.entries(fields)) {
          updated[k] = (updated[k] || 0) + v;
        }
        return updated;
      }
      return row;
    });
    saveDB(db);
  },

  // Today's date string YYYY-MM-DD
  today() {
    return new Date().toISOString().slice(0, 10);
  },

  // Upsert daily_activity
  logActivity(userId, minutes, xp) {
    const today = this.today();
    const existing = this.findOne('daily_activity',
      r => r.user_id === userId && r.activity_date === today
    );
    if (existing) {
      this.update('daily_activity', r => r.id === existing.id, {
        total_minutes: (existing.total_minutes || 0) + minutes,
        xp_earned: (existing.xp_earned || 0) + xp,
      });
    } else {
      this.insert('daily_activity', {
        user_id: userId,
        activity_date: today,
        total_minutes: minutes,
        xp_earned: xp,
      });
    }
  },
};

module.exports = DB;
