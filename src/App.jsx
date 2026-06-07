// src/App.jsx
import React, { useState, useEffect } from 'react';

const API = '/api';
function getToken() { return localStorage.getItem('fmh_token'); }
function setToken(t) { localStorage.setItem('fmh_token', t); }

async function api(path, opts = {}) {
  const token = getToken();
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...opts.headers },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// ── Mobile detection hook ─────────────────────────────────────────────────────
function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 640);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 640);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return m;
}

// Injects one-time global CSS for things inline styles can't do
function GlobalCSS() {
  useEffect(() => {
    const id = 'fmh-global';
    if (document.getElementById(id)) return;
    const s = document.createElement('style');
    s.id = id;
    s.textContent = `
      *, *::before, *::after { box-sizing: border-box; }
      body { -webkit-text-size-adjust: 100%; }
      /* Prevent iOS from zooming into small inputs */
      @media (max-width: 639px) {
        input, textarea, select { font-size: 16px !important; }
      }
      /* Horizontally scrollable tables / rule sections */
      .fmh-scroll-x { overflow-x: auto; -webkit-overflow-scrolling: touch; }
      /* Conjugation table rows wrap gracefully */
      .fmh-rule-row { display: flex; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
      .fmh-rule-key { min-width: 140px; font-size: 13px; font-weight: 600; }
      @media (max-width: 639px) {
        .fmh-rule-key { min-width: 0; width: 100%; }
      }
      /* Scrollable filter pill rows */
      .fmh-pill-row { display: flex; gap: 3px; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
      .fmh-pill-row::-webkit-scrollbar { display: none; }
      .fmh-pill-row button { white-space: nowrap; flex-shrink: 0; }
    `;
    document.head.appendChild(s);
  }, []);
  return null;
}

// ── LOGO MARK SVG ─────────────────────────────────────────────────────────────
function LogoMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="url(#lg)"/>
      <text x="20" y="27" textAnchor="middle" fontSize="20" fontWeight="bold" fill="white" fontFamily="Georgia, serif">F</text>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6c63ff"/>
          <stop offset="1" stopColor="#2dd4bf"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function Logo({ size = 'md' }) {
  const sizes = { sm: { icon: 28, text: 15, sub: 10 }, md: { icon: 36, text: 20, sub: 11 }, lg: { icon: 52, text: 28, sub: 13 } };
  const s = sizes[size] || sizes.md;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <LogoMark size={s.icon} />
      <div>
        <div style={{ fontSize: s.text, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', lineHeight: 1.1, fontFamily: 'Georgia, serif' }}>
          French<span style={{ color: '#2dd4bf' }}>Mastery</span>
        </div>
        {size !== 'sm' && <div style={{ fontSize: s.sub, color: 'rgba(255,255,255,0.45)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 1 }}>Hub</div>}
      </div>
    </div>
  );
}

// ── ONBOARDING FLOW ───────────────────────────────────────────────────────────
const ONBOARDING_STEPS = [
  {
    id: 'level',
    question: 'What is your current French level?',
    subtitle: 'Be honest - this helps us personalize your roadmap',
    emoji: '📊',
    options: [
      { value: 'complete_beginner', label: 'Complete Beginner', desc: 'I know very little or no French', icon: '🌱' },
      { value: 'A1', label: 'A1 - Beginner', desc: 'I know basic greetings and numbers', icon: '🔤' },
      { value: 'A2', label: 'A2 - Elementary', desc: 'I can handle simple conversations', icon: '💬' },
      { value: 'B1', label: 'B1 - Intermediate', desc: 'I can discuss familiar topics', icon: '📚' },
    ]
  },
  {
    id: 'exam',
    question: 'Which exam are you preparing for?',
    subtitle: 'Both are accepted by IRCC for Canadian immigration',
    emoji: '🎯',
    options: [
      { value: 'TEF', label: 'TEF Canada', desc: 'TEF - Test of French Evaluation, most common', icon: '🍁' },
      { value: 'TCF', label: 'TCF Canada', desc: 'Test de Connaissance du Francais', icon: '🇫🇷' },
      { value: 'both', label: 'Not sure yet', desc: 'Decide later - prepare for both', icon: '🤔' },
      { value: 'general', label: 'General French', desc: 'Not for immigration - just learning', icon: '📖' },
    ]
  },
  {
    id: 'date',
    question: 'When do you plan to take the exam?',
    subtitle: 'This sets your B2 deadline and study pace',
    emoji: '📅',
    options: [
      { value: '3months', label: 'Within 3 months', desc: 'Intensive preparation needed', icon: '🔥' },
      { value: '6months', label: '3-6 months', desc: 'Focused, consistent study', icon: '⚡' },
      { value: '1year', label: '6-12 months', desc: 'Steady progressive learning', icon: '📈' },
      { value: '2years', label: '1-2 years', desc: 'Building from foundation up', icon: '🏗️' },
    ]
  },
  {
    id: 'hours',
    question: 'How many hours per week can you study?',
    subtitle: 'We will build your daily plan around your schedule',
    emoji: '⏱️',
    options: [
      { value: '2', label: '1-2 hours/week', desc: 'Quick sessions when I can', icon: '🌙' },
      { value: '5', label: '3-5 hours/week', desc: 'A bit every day', icon: '📅' },
      { value: '10', label: '5-10 hours/week', desc: 'Serious commitment', icon: '💪' },
      { value: '15', label: '10+ hours/week', desc: 'Full immersion mode', icon: '🚀' },
    ]
  },
];

function OnboardingFlow({ user, onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [saving, setSaving] = useState(false);

  const current = ONBOARDING_STEPS[step];
  const progress = ((step) / ONBOARDING_STEPS.length) * 100;

  function select(value) {
    const newAnswers = { ...answers, [current.id]: value };
    setAnswers(newAnswers);
    if (step < ONBOARDING_STEPS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 300);
    } else {
      finish(newAnswers);
    }
  }

  async function finish(finalAnswers) {
    setSaving(true);
    try {
      await api('/auth/me', { method: 'PATCH', body: JSON.stringify({
        target_exam: finalAnswers.exam === 'both' || finalAnswers.exam === 'general' ? 'TEF' : finalAnswers.exam,
        target_date: finalAnswers.date === '3months' ? new Date(Date.now() + 90*86400000).toISOString().slice(0,10)
          : finalAnswers.date === '6months' ? new Date(Date.now() + 180*86400000).toISOString().slice(0,10)
          : finalAnswers.date === '1year' ? new Date(Date.now() + 365*86400000).toISOString().slice(0,10)
          : '2027-12-01',
      })});
    } catch {}
    localStorage.setItem('fmh_onboarded', 'true');
    localStorage.setItem('fmh_profile', JSON.stringify(finalAnswers));
    setSaving(false);
    onComplete(finalAnswers);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f0e17', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: 520 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Logo size="lg" />
        </div>

        {/* Progress bar */}
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 4, height: 4, marginBottom: 40, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #6c63ff, #2dd4bf)', borderRadius: 4, transition: 'width 0.4s ease' }} />
        </div>

        {/* Step counter */}
        <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 8, letterSpacing: '1px', textTransform: 'uppercase' }}>
          Step {step + 1} of {ONBOARDING_STEPS.length}
        </div>

        {/* Question */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>{current.emoji}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>{current.question}</div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>{current.subtitle}</div>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {current.options.map(opt => (
            <button
              key={opt.value}
              onClick={() => select(opt.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px',
                background: answers[current.id] === opt.value ? 'rgba(108,99,255,0.2)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${answers[current.id] === opt.value ? '#6c63ff' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 12, cursor: 'pointer', textAlign: 'left', width: '100%',
                transition: 'all 0.15s', fontFamily: 'inherit',
              }}
            >
              <span style={{ fontSize: 24, flexShrink: 0 }}>{opt.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 2 }}>{opt.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{opt.desc}</div>
              </div>
              <div style={{ width: 20, height: 20, borderRadius: '50%', border: `2px solid ${answers[current.id] === opt.value ? '#6c63ff' : 'rgba(255,255,255,0.2)'}`, background: answers[current.id] === opt.value ? '#6c63ff' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {answers[current.id] === opt.value && <span style={{ color: '#fff', fontSize: 11 }}>✓</span>}
              </div>
            </button>
          ))}
        </div>

        {saving && <div style={{ textAlign: 'center', marginTop: 24, color: '#2dd4bf', fontSize: 14 }}>Setting up your personalized roadmap...</div>}

        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} style={{ display: 'block', margin: '20px auto 0', background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}>← Back</button>
        )}
      </div>
    </div>
  );
}

// ── WELCOME SCREEN (after onboarding) ────────────────────────────────────────
function WelcomeScreen({ user, profile, onContinue }) {
  const levelMap = { complete_beginner: 'A1', A1: 'A1', A2: 'A2', B1: 'B1' };
  const level = levelMap[profile?.level] || 'A1';
  const exam = profile?.exam === 'both' || profile?.exam === 'general' ? 'TEF/TCF' : (profile?.exam || 'TEF');
  const dateMap = { '3months': '3 months', '6months': '6 months', '1year': '12 months', '2years': '24 months' };
  const timeline = dateMap[profile?.date] || '24 months';

  return (
    <div style={{ minHeight: '100vh', background: '#0f0e17', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 480, textAlign: 'center' }}>
        <Logo size="lg" />
        <div style={{ marginTop: 40, marginBottom: 8 }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 12 }}>Your Personalized Roadmap</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Bienvenue, {user.name?.split(' ')[0]}! 🎉</div>
          <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', marginBottom: 32 }}>Here is your path to {exam} success</div>
        </div>

        {/* Roadmap cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32, textAlign: 'left' }}>
          {[
            { icon: '📍', label: 'Starting point', value: `Level ${level}`, color: '#6c63ff' },
            { icon: '🎯', label: 'Target exam', value: exam, color: '#2dd4bf' },
            { icon: '⏱️', label: 'Timeline', value: timeline, color: '#fbbf24' },
            { icon: '📚', label: 'First lesson', value: 'Greetings & Introductions (A1)', color: '#4ade80' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{item.label}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: item.color, marginTop: 2 }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onContinue} style={{ width: '100%', padding: '16px 0', background: 'linear-gradient(135deg, #6c63ff, #2dd4bf)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.3px' }}>
          Start Learning →
        </button>
        <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>Your data is stored locally on your computer only</div>
      </div>
    </div>
  );
}

// ── Login Screen ──────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', city: 'Oakville' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();

  async function submit(e) {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const data = mode === 'login'
        ? await api('/auth/login', { method: 'POST', body: JSON.stringify({ email: form.email, password: form.password }) })
        : await api('/auth/register', { method: 'POST', body: JSON.stringify(form) });
      setToken(data.token);
      onLogin(data.user, mode === 'register');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inp = { display: 'block', width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '14px 16px', color: '#fff', fontSize: 16, marginBottom: 12, boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none', minHeight: 48 };

  return (
    <div style={{ minHeight: '100vh', background: '#0f0e17', display: 'flex', flexDirection: isMobile ? 'column' : 'row', fontFamily: 'system-ui, sans-serif' }}>
      {/* Left panel - branding (hidden on mobile) */}
      <div style={{ flex: 1, background: 'linear-gradient(135deg, #1a1929 0%, #0f0e17 100%)', display: isMobile ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <Logo size="lg" />
        <div style={{ marginTop: 40, maxWidth: 340 }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: 16 }}>
            Your path to B2 French and Canadian PR
          </div>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, marginBottom: 32 }}>
            A1 to B2 lessons, spaced repetition vocabulary, grammar drills, and full TEF/TCF exam preparation - all in one app.
          </div>
          {[
            '28 progressive lessons (A1 → B2)',
            'Spaced repetition flashcards (SM-2)',
            'AI writing feedback',
            'TEF/TCF mock exam practice',
            'Personalized study roadmap',
          ].map(f => (
            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(45,212,191,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#2dd4bf', fontSize: 11 }}>✓</span>
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{f}</span>
            </div>
          ))}
          <div style={{ marginTop: 32, padding: '14px 18px', background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 12 }}>
            <div style={{ fontSize: 12, color: '#6c63ff', fontWeight: 600, marginBottom: 4 }}>🍁 Made for Canadian Immigration</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Designed around IRCC requirements, TEF Canada format, and Oakville/Ontario context</div>
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div style={{ width: isMobile ? '100%' : 420, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: isMobile ? 'flex-start' : 'center', padding: isMobile ? '32px 24px' : 48, minHeight: isMobile ? '100vh' : 'auto' }}>
        <div style={{ width: '100%', maxWidth: 340 }}>
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
              {mode === 'login' ? 'Welcome back' : 'Create your account'}
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
              {mode === 'login' ? 'Sign in to continue your French journey' : 'Start your journey to B2 French today'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 3, marginBottom: 24 }}>
            {['login', 'register'].map(m => (
              <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: '9px 0', background: mode === m ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', borderRadius: 8, color: mode === m ? '#fff' : 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 13, fontWeight: mode === m ? 600 : 400, fontFamily: 'inherit' }}>
                {m === 'login' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={submit}>
            {mode === 'register' && (
              <>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" required style={inp} />
                <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} placeholder="Your city (e.g. Oakville)" style={inp} />
              </>
            )}
            <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="Email address" type="email" required style={inp} />
            <input value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Password (8+ characters)" type="password" required style={inp} />

            {error && <div style={{ color: '#f87171', fontSize: 13, marginBottom: 12, padding: '10px 14px', background: 'rgba(248,113,113,0.1)', borderRadius: 8 }}>{error}</div>}

            <button type="submit" disabled={loading} style={{ width: '100%', padding: '16px 0', background: 'linear-gradient(135deg, #6c63ff, #5b52f0)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer', opacity: loading ? 0.7 : 1, fontFamily: 'inherit', marginTop: 4, minHeight: 52 }}>
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
            🔒 Your data is stored locally on your computer only
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = { display: 'block', width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '13px 16px', color: '#fff', fontSize: 14, marginBottom: 10, boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none' };

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      api('/auth/me').then(u => { setUser(u); setChecked(true); }).catch(() => { localStorage.removeItem('fmh_token'); setChecked(true); });
    } else {
      setChecked(true);
    }
  }, []);

  if (!checked) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f0e17', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <LogoMark size={52} />
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', letterSpacing: '1px' }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={(u, isNew) => {
      setUser(u);
      if (isNew && !localStorage.getItem('fmh_onboarded')) {
        setShowOnboarding(true);
      }
    }} />;
  }

  if (showOnboarding) {
    return <OnboardingFlow user={user} onComplete={p => { setProfile(p); setShowOnboarding(false); setShowWelcome(true); }} />;
  }

  if (showWelcome) {
    return <WelcomeScreen user={user} profile={profile} onContinue={() => setShowWelcome(false)} />;
  }

  return (
    <>
      <GlobalCSS />
      <Hub user={user} onLogout={() => { localStorage.removeItem('fmh_token'); setUser(null); }} />
    </>
  );
}

// ── TOOLTIP TOUR ──────────────────────────────────────────────────────────────
const TOUR_STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to FrenchMastery Hub! 🎉',
    body: 'This quick tour will show you how to use every feature. It takes about 60 seconds. You can exit anytime and restart it from the Help button.',
    target: null,
    position: 'center',
  },
  {
    id: 'dashboard',
    title: '📊 Dashboard',
    body: 'Your home base. See your streak, XP, hours logged, and CEFR progress at a glance. Today Plan shows what to study and you can mark tasks done right here.',
    target: 'nav-dashboard',
    position: 'right',
  },
  {
    id: 'lessons',
    title: '📖 Lessons',
    body: '28 progressive lessons from A1 to B2. Each lesson has 3 tabs: Learn (full grammar explanations + audio), Exercises (interactive questions with feedback), and Quiz (must score 60%+ to complete).',
    target: 'nav-lessons',
    position: 'right',
  },
  {
    id: 'vocab',
    title: '🃏 Vocabulary Flashcards',
    body: 'Anki-style spaced repetition using the SM-2 algorithm. Rate each card as Hard, Okay, or Easy. The app schedules your next review automatically. Do this at lunch every day.',
    target: 'nav-vocab',
    position: 'right',
  },
  {
    id: 'grammar',
    title: '✏️ Grammar Drills',
    body: 'Fill-in-the-blank and multiple choice drills organized by category: articles, verbs, pronouns, tenses, and more. Every wrong answer shows a clear explanation.',
    target: 'nav-grammar',
    position: 'right',
  },
  {
    id: 'reading',
    title: '📰 Reading Practice',
    body: 'Passages at A1, A2, B1, and B2 level with 5 comprehension questions each. All written in Canadian and Oakville context. Submit your answers to see the score and explanations.',
    target: 'nav-reading',
    position: 'right',
  },
  {
    id: 'listening',
    title: '🎧 Listening Practice',
    body: 'Audio tracks played by your browser free French voice. Press Play, listen carefully, then answer 5 questions. The script is revealed after you submit so you can review.',
    target: 'nav-listening',
    position: 'right',
  },
  {
    id: 'writing',
    title: '✍️ Writing + AI',
    body: 'Writing prompts at each level with model answers. Write your response, then click Get AI Feedback for instant correction of grammar, articles, and style. Each level has 10 prompts.',
    target: 'nav-writing',
    position: 'right',
  },
  {
    id: 'speaking',
    title: '🎙️ Speaking Practice',
    body: 'Press the mic button, speak your response in French, then press stop. Read the model answer and listen to it in French using the Play button. 10 prompts per level.',
    target: 'nav-speaking',
    position: 'right',
  },
  {
    id: 'progress',
    title: '📈 Progress Dashboard',
    body: 'Track your CEFR level, total hours logged, skill breakdown (listening/reading/writing/speaking/grammar/vocab), and your weak areas with specific recommendations.',
    target: 'nav-progress',
    position: 'right',
  },
  {
    id: 'planner',
    title: '📅 Daily Planner',
    body: 'Your personalized weekly study schedule. Tasks are based on your availability. Click "Export to Calendar" to add everything to Google Calendar as recurring events.',
    target: 'nav-planner',
    position: 'right',
  },
  {
    id: 'theme',
    title: '🌙 Theme & Language',
    body: 'Toggle between dark and light mode with the switch at the bottom. Switch the app language between French and English with the FR/EN button.',
    target: 'nav-theme',
    position: 'right',
  },
  {
    id: 'done',
    title: 'You are all set! 🚀',
    body: 'Start with Lesson 1: Greetings & Introductions, then do your vocabulary flashcards daily. Come back to this tour anytime using the ? button in the sidebar. Bonne chance!',
    target: null,
    position: 'center',
  },
];

function Tour({ onClose }) {
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const current = TOUR_STEPS[step];

  useEffect(() => {
    if (current.target) {
      const el = document.getElementById(current.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          const rect = el.getBoundingClientRect();
          setTargetRect(rect);
        }, 150);
      }
    } else {
      setTargetRect(null);
    }
  }, [step]);

  function next() {
    if (step < TOUR_STEPS.length - 1) setStep(s => s + 1);
    else { localStorage.setItem('fmh_tour_done', 'true'); onClose(); }
  }

  function prev() { if (step > 0) setStep(s => s - 1); }
  function skip() { localStorage.setItem('fmh_tour_done', 'true'); onClose(); }

  const isCenter = current.position === 'center' || !targetRect;

  // Tooltip position calculation
  let tooltipStyle = {};
  if (targetRect && !isCenter) {
    const top = targetRect.top + targetRect.height / 2 - 80;
    tooltipStyle = {
      position: 'fixed',
      left: targetRect.right + 16,
      top: Math.max(20, Math.min(top, window.innerHeight - 280)),
      width: 300,
      zIndex: 10001,
    };
  } else {
    tooltipStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: Math.min(380, window.innerWidth - 32),
      zIndex: 10001,
    };
  }

  return (
    <>
      {/* Overlay */}
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', zIndex: 10000, backdropFilter: 'blur(2px)' }} onClick={skip} />

      {/* Highlight box around target */}
      {targetRect && !isCenter && (
        <div style={{
          position: 'fixed',
          top: targetRect.top - 4,
          left: targetRect.left - 4,
          width: targetRect.width + 8,
          height: targetRect.height + 8,
          border: '2px solid #6c63ff',
          borderRadius: 10,
          zIndex: 10001,
          boxShadow: '0 0 0 4px rgba(108,99,255,0.25)',
          pointerEvents: 'none',
          background: 'rgba(108,99,255,0.08)',
        }} />
      )}

      {/* Tooltip card */}
      <div style={{
        ...tooltipStyle,
        background: '#1a1929',
        border: '1px solid rgba(108,99,255,0.4)',
        borderRadius: 16,
        padding: '22px 24px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
      }}>
        {/* Arrow pointing left (only when positioned to right of target) */}
        {targetRect && !isCenter && (
          <div style={{
            position: 'absolute',
            left: -8,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderRight: '8px solid rgba(108,99,255,0.4)',
          }} />
        )}

        {/* Step counter */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {TOUR_STEPS.map((_, i) => (
              <div key={i} style={{ width: i === step ? 18 : 6, height: 6, borderRadius: 3, background: i === step ? '#6c63ff' : i < step ? 'rgba(108,99,255,0.4)' : 'rgba(255,255,255,0.15)', transition: 'all 0.3s' }} />
            ))}
          </div>
          <button onClick={skip} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0 }}>×</button>
        </div>

        <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 10, lineHeight: 1.3 }}>{current.title}</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 20 }}>{current.body}</div>

        <div style={{ display: 'flex', gap: 8 }}>
          {step > 0 && (
            <button onClick={prev} style={{ padding: '9px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, color: 'rgba(255,255,255,0.6)', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}>← Back</button>
          )}
          <button onClick={next} style={{ flex: 1, padding: '9px 16px', background: 'linear-gradient(135deg, #6c63ff, #5b52f0)', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit' }}>
            {step === TOUR_STEPS.length - 1 ? 'Start Learning! 🚀' : `Next (${step + 1}/${TOUR_STEPS.length - 1}) →`}
          </button>
        </div>
        {step < TOUR_STEPS.length - 1 && (
          <button onClick={skip} style={{ display: 'block', margin: '10px auto 0', background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit' }}>Skip tour</button>
        )}
      </div>
    </>
  );
}


// ── Bottom Navigation (mobile only) ──────────────────────────────────────────
function BottomNav({ section, setSection, V }) {
  const items = [
    ['dashboard', '🏠', 'Home'],
    ['lessons', '📖', 'Lessons'],
    ['vocab', '🃏', 'Vocab'],
    ['grammar', '✏️', 'Drills'],
    ['progress', '📈', 'Progress'],
  ];
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200,
      background: V.bg2, borderTop: `1px solid ${V.border}`,
      display: 'flex', height: 60,
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {items.map(([id, icon, label]) => (
        <button key={id} onClick={() => setSection(id)} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'none', border: 'none', cursor: 'pointer', gap: 2, padding: '6px 2px',
          color: section === id ? V.accent : V.text3,
          borderTop: `2px solid ${section === id ? V.accent : 'transparent'}`,
          fontFamily: 'inherit',
        }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>{icon}</span>
          <span style={{ fontSize: 9, fontWeight: section === id ? 700 : 400, letterSpacing: '0.3px' }}>{label}</span>
        </button>
      ))}
    </div>
  );
}

// ── Hub: full app loaded after login ─────────────────────────────────────────
function Hub({ user, onLogout }) {
  const [section, setSection] = useState('dashboard');
  const [isLight, setIsLight] = useState(false);
  const [isEN, setIsEN] = useState(false);
  const [showTour, setShowTour] = useState(() => !localStorage.getItem('fmh_tour_done'));
  const isMobile = useIsMobile();

  // Inject the main CSS variables into body
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.fontFamily = "'DM Sans', system-ui, sans-serif";
    document.body.style.background = isLight ? '#f8f7ff' : '#0f0e17';
    document.body.style.color = isLight ? '#0f0e17' : '#fffffe';
  }, [isLight]);

  const V = {
    bg: isLight ? '#f8f7ff' : '#0f0e17',
    bg2: isLight ? '#eeedf8' : '#1a1929',
    bg3: isLight ? '#e4e3f4' : '#232236',
    surface: isLight ? '#ffffff' : '#2d2c45',
    surface2: isLight ? '#f0effe' : '#3a3857',
    border: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
    text: isLight ? '#0f0e17' : '#fffffe',
    text2: isLight ? '#4a4870' : '#a7a5c0',
    text3: isLight ? '#9897b8' : '#6b698a',
    accent: '#6c63ff',
    teal: isLight ? '#0d9488' : '#2dd4bf',
    gold: isLight ? '#d97706' : '#fbbf24',
    green: isLight ? '#16a34a' : '#4ade80',
    red: isLight ? '#dc2626' : '#f87171',
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: V.bg, color: V.text }}>
      {/* Sidebar - hidden on mobile (replaced by BottomNav) */}
      <div style={{ width: 220, background: V.bg2, borderRight: `1px solid ${V.border}`, display: isMobile ? 'none' : 'flex', flexDirection: 'column', flexShrink: 0, overflowY: 'auto' }}>
        <div style={{ padding: '16px 18px 14px', borderBottom: `1px solid ${V.border}` }}>
          <Logo size="sm" />
          <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 5, background: 'linear-gradient(135deg,#6c63ff,#a78bfa)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 20, letterSpacing: '0.5px' }}>⬡ A1 → B2 Journey</div>
        </div>

        <div style={{ padding: '12px 14px 8px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${V.border}` }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#6c63ff,#f87171)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: '#fff', flexShrink: 0 }}>
            {user.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{user.name}</div>
            <div style={{ fontSize: 10, color: V.text3 }}>📍 {user.city || 'Oakville'}, ON</div>
          </div>
        </div>

        <nav style={{ padding: '10px 0', flex: 1 }}>
          {[
            ['Learning', [
              ['dashboard', '◈', 'Dashboard'],
              ['lessons', '◉', 'Lessons'],
              ['vocab', '◇', 'Vocabulary'],
              ['grammar', '≋', 'Grammar Drills'],
            ]],
            ['Practice', [
              ['reading', '◳', 'Reading'],
              ['listening', '◎', 'Listening'],
              ['writing', '✦', 'Writing + AI'],
              ['speaking', '⊙', 'Speaking'],
            ]],
            ['Track', [
              ['progress', '◈', 'Progress'],
              ['planner', '▦', 'Daily Planner'],
            ]],
          ].map(([label, items]) => (
            <div key={label}>
              <div style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '2px', color: V.text3, padding: '10px 18px 5px', fontWeight: 600 }}>{label}</div>
              {items.map(([id, icon, name]) => (
                <div key={id} id={`nav-${id}`} onClick={() => setSection(id)} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 18px', cursor: 'pointer', color: section === id ? V.accent : V.text2, background: section === id ? `rgba(108,99,255,0.1)` : 'transparent', borderLeft: `2px solid ${section === id ? V.accent : 'transparent'}`, fontSize: 13, fontWeight: section === id ? 500 : 400, transition: 'all 0.15s' }}>
                  <span style={{ fontSize: 15, width: 18, textAlign: 'center' }}>{icon}</span> {name}
                </div>
              ))}
            </div>
          ))}
        </nav>

        {/* Tour button */}
        <div style={{ padding: '8px 18px', borderTop: `1px solid ${V.border}` }}>
          <button
            onClick={() => setShowTour(true)}
            style={{ width: '100%', padding: '9px 0', background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 8, color: V.accent, cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
          >
            <span style={{ fontSize: 14 }}>?</span> How to use this app
          </button>
        </div>

        <div id="nav-theme" style={{ padding: '10px 18px', borderTop: `1px solid ${V.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 14 }}>🌙</span>
            <div onClick={() => setIsLight(l => !l)} style={{ width: 34, height: 18, background: isLight ? V.accent : V.surface2, border: `1px solid ${V.border}`, borderRadius: 9, position: 'relative', cursor: 'pointer' }}>
              <div style={{ width: 12, height: 12, background: '#fff', borderRadius: '50%', position: 'absolute', top: 2, left: isLight ? 18 : 2, transition: 'left 0.2s' }} />
            </div>
            <span style={{ fontSize: 14 }}>☀️</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => setIsEN(e => !e)} style={{ fontSize: 10, fontWeight: 700, color: V.text3, cursor: 'pointer', background: V.surface, border: `1px solid ${V.border}`, padding: '3px 7px', borderRadius: 4 }}>{isEN ? 'FR' : 'EN'}</button>
            <button onClick={onLogout} style={{ fontSize: 10, color: V.text3, cursor: 'pointer', background: 'none', border: 'none', padding: '3px 4px' }} title="Sign out">⎋</button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'auto', background: V.bg, paddingBottom: isMobile ? 64 : 0 }}>
        <SectionContent section={section} user={user} V={V} isEN={isEN} onNavigate={setSection} />
      </div>

      {/* Bottom nav - mobile only */}
      {isMobile && <BottomNav section={section} setSection={setSection} V={V} />}

      {/* Tour overlay */}
      {showTour && <Tour onClose={() => setShowTour(false)} />}
    </div>
  );
}

// ── Section Router ────────────────────────────────────────────────────────────
function SectionContent({ section, user, V, isEN, onNavigate }) {
  const sections = { dashboard: Dashboard, lessons: Lessons, vocab: Vocab, grammar: Grammar, reading: Reading, listening: Listening, writing: Writing, speaking: Speaking, progress: Progress, planner: Planner };
  const Component = sections[section] || Dashboard;
  return <Component user={user} V={V} isEN={isEN} onNavigate={onNavigate} />;
}

// ── Shared UI ─────────────────────────────────────────────────────────────────
function PageHeader({ title, sub, V }) {
  const isMobile = useIsMobile();
  return (
    <div style={{ marginBottom: isMobile ? 16 : 24 }}>
      <div style={{ fontSize: isMobile ? 20 : 26, fontWeight: 700, color: V.text, marginBottom: 4, fontFamily: 'Georgia, serif', lineHeight: 1.2 }}>{title}</div>
      {sub && <div style={{ fontSize: isMobile ? 12 : 13, color: V.text2, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}

function Card({ children, V, style = {} }) {
  return <div style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 12, padding: 20, marginBottom: 16, ...style }}>{children}</div>;
}

function CardTitle({ children, V }) {
  return <div style={{ fontSize: 11, fontWeight: 700, color: V.text2, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 14 }}>{children}</div>;
}

function StatCard({ label, value, sub, color, V }) {
  return (
    <div style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 12, padding: 16 }}>
      <div style={{ fontSize: 10, color: V.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color: color || V.text, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: V.text2, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function ProgressBar({ label, value, max, color, V }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: V.text2, marginBottom: 5 }}>
        <span>{label}</span><span>{pct}%</span>
      </div>
      <div style={{ height: 6, background: V.bg3, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color || V.accent, borderRadius: 3, transition: 'width 0.6s' }} />
      </div>
    </div>
  );
}

function Btn({ children, onClick, primary, small, V, style = {} }) {
  return (
    <button onClick={onClick} style={{ padding: small ? '6px 14px' : '10px 20px', borderRadius: 8, fontFamily: 'inherit', fontSize: small ? 12 : 13, fontWeight: 500, cursor: 'pointer', border: `1px solid ${primary ? V.accent : V.border}`, background: primary ? V.accent : V.surface, color: primary ? '#fff' : V.text, transition: 'all 0.15s', ...style }}>
      {children}
    </button>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard({ user, V, onNavigate }) {
  const [data, setData] = useState(null);
  const isMobile = useIsMobile();
  const [done, setDone] = useState(() => {
    try { return JSON.parse(localStorage.getItem('fmh_daily_done') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    api('/progress/dashboard').then(setData).catch(() => {});
  }, []);

  const daysLeft = data?.daysLeft ?? 608;

  const todayTasks = [
    { icon: '🃏', label: 'Vocabulary Flashcards', sub: '20 cards · Spaced repetition', section: 'vocab', time: 'Lunch · 15 min' },
    { icon: '📖', label: 'Reading Practice', sub: 'A1 passage with comprehension', section: 'reading', time: 'Evening · 20 min' },
    { icon: '🎧', label: 'Listening Practice', sub: 'Audio track + 5 questions', section: 'listening', time: 'Commute · 10 min' },
    { icon: '✏️', label: 'Grammar Drills', sub: '10 questions + explanations', section: 'grammar', time: 'Anytime · 10 min' },
    { icon: '✍️', label: 'Writing Practice', sub: 'One prompt with model answer', section: 'writing', time: 'Evening · 20 min' },
  ];

  function markDone(section) {
    const newDone = done.includes(section) ? done.filter(d => d !== section) : [...done, section];
    setDone(newDone);
    localStorage.setItem('fmh_daily_done', JSON.stringify(newDone));
    if (!done.includes(section)) {
      api('/progress/session', { method: 'POST', body: JSON.stringify({ session_type: section, duration_min: 15, xp_earned: 20 }) }).catch(() => {});
    }
  }

  const completedToday = done.length;
  const totalTasks = todayTasks.length;

  return (
    <div style={{ padding: isMobile ? '16px' : '28px 32px' }}>
      <PageHeader title={`Bonjour, ${user.name?.split(' ')[0]}! 👋`} sub={`${new Date().toLocaleDateString('fr-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} · ${user.city || 'Oakville'}, Ontario`} V={V} />

      <div style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(45,212,191,0.1))', border: '1px solid rgba(108,99,255,0.25)', borderRadius: 12, padding: isMobile ? '12px 14px' : '16px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 28 }}>🇨🇦</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: isMobile ? 12 : 14, fontWeight: 600, color: V.text }}>Target: B2 {user.target_exam || 'TEF'}/TCF - Canadian PR</div>
          <div style={{ fontSize: 11, color: V.text2, marginTop: 2 }}>Current: A1 → Next milestone: A2 (est. Sep 2026)</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: V.accent, fontFamily: 'monospace' }}>{daysLeft}</div>
          <div style={{ fontSize: 9, color: V.text3, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Days to Goal</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: isMobile ? 8 : 12, marginBottom: 14 }}>
        <StatCard label="Streak" value={`🔥 ${data?.streak?.current ?? 0}`} sub="Days in a row" V={V} />
        <StatCard label="Hours Logged" value={`${data?.totalHours ?? 0}h`} sub={`+${data?.totalXP ?? 0} XP`} V={V} />
        <StatCard label="Words Learned" value={data?.wordsMastered ?? 0} sub="Mastered (SM-2)" V={V} />
        <StatCard label="Drill Accuracy" value={`${data?.drillAccuracy ?? 0}%`} sub="Last 50 drills" color={V.green} V={V} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
        <Card V={V}>
          <CardTitle V={V}>CEFR Progress</CardTitle>
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            {['A1','A2','B1','B2'].map((lvl, i) => {
              const isDone = i === 0;
              const isCurrent = i === 1;
              return (
                <div key={lvl} style={{ flex: 1, textAlign: 'center', padding: '10px 6px', borderRadius: 8, border: `1px solid ${isCurrent ? V.accent : V.border}`, background: isDone ? 'rgba(74,222,128,0.1)' : isCurrent ? 'rgba(108,99,255,0.15)' : V.bg3, opacity: i > 1 ? 0.5 : 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: isDone ? V.green : isCurrent ? V.accent : V.text }}>{lvl}</div>
                  <div style={{ fontSize: 10, color: V.text3 }}>{isDone ? '68%' : isCurrent ? '12%' : '0%'}</div>
                </div>
              );
            })}
          </div>
          <ProgressBar label="Overall to B2" value={8} max={100} color={`linear-gradient(90deg, ${V.accent}, ${V.teal})`} V={V} />
        </Card>

        <Card V={V}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <CardTitle V={V} style={{ marginBottom: 0 }}>Today Plan · {user.city || 'Oakville'}</CardTitle>
            <span style={{ fontSize: 12, color: completedToday === totalTasks ? V.green : V.text3, fontWeight: 600 }}>{completedToday}/{totalTasks} done</span>
          </div>
          <div style={{ height: 4, background: V.bg3, borderRadius: 2, marginBottom: 14, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(completedToday/totalTasks)*100}%`, background: V.green, borderRadius: 2, transition: 'width 0.4s' }} />
          </div>
          {todayTasks.map(task => (
            <div key={task.section} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, padding: '8px 10px', borderRadius: 8, background: done.includes(task.section) ? 'rgba(74,222,128,0.06)' : V.bg3, border: `1px solid ${done.includes(task.section) ? V.green + '44' : 'transparent'}`, transition: 'all 0.2s' }}>
              <span style={{ fontSize: 18, flexShrink: 0, opacity: done.includes(task.section) ? 0.5 : 1 }}>{task.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  onClick={() => onNavigate(task.section)}
                  style={{ color: done.includes(task.section) ? V.text3 : V.accent, fontSize: 13, fontWeight: 500, cursor: 'pointer', textDecoration: done.includes(task.section) ? 'line-through' : 'none' }}
                >{task.label}</div>
                <div style={{ fontSize: 10, color: V.text3 }}>{task.time}</div>
              </div>
              <button
                onClick={() => markDone(task.section)}
                style={{ width: 24, height: 24, borderRadius: '50%', border: `2px solid ${done.includes(task.section) ? V.green : V.border}`, background: done.includes(task.section) ? V.green : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: done.includes(task.section) ? '#0f0e17' : V.text3, flexShrink: 0, transition: 'all 0.2s' }}
              >{done.includes(task.section) ? '✓' : ''}</button>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

// ── Lessons ───────────────────────────────────────────────────────────────────
function Lessons({ V }) {
  const [lessons, setLessons] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const isMobile = useIsMobile();
  const [openLesson, setOpenLesson] = useState(null);
  const [lessonData, setLessonData] = useState(null);
  const [tab, setTab] = useState('learn');
  const [exIdx, setExIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [exResult, setExResult] = useState(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizChosen, setQuizChosen] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [translateInput, setTranslateInput] = useState('');

  useEffect(() => { api('/lessons').then(setLessons).catch(() => {}); }, []);

  async function openLes(id) {
    const data = await api(`/lessons/${id}`);
    setLessonData(data); setOpenLesson(id); setTab('learn');
    setExIdx(0); setChosen(null); setExResult(null);
    setQuizIdx(0); setQuizChosen(null); setQuizScore(0); setQuizDone(false); setTranslateInput('');
    window.scrollTo(0, 0);
  }

  async function complete() {
    const total = content2?.quiz?.length || 1;
    await api(`/lessons/${openLesson}/complete`, { method: 'POST', body: JSON.stringify({ score: Math.round((quizScore / total) * 100) }) });
    api('/lessons').then(setLessons);
    alert('Lesson complete! XP earned.');
    setOpenLesson(null); setLessonData(null);
  }

  function speak(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'fr-FR'; u.rate = 0.82;
      const voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('fr'));
      if (voices.length) u.voice = voices[0];
      window.speechSynthesis.speak(u);
    }
  }

  const LEVEL_COLOR = { A1: V.teal, A2: '#60a5fa', B1: V.gold, B2: '#f472b6' };
  const filtered = filter === 'ALL' ? lessons : lessons.filter(l => l.level === filter);
  const content2 = lessonData?.content ? (typeof lessonData.content === 'string' ? JSON.parse(lessonData.content) : lessonData.content) : null;

  function checkAnswer(idx) {
    if (chosen !== null) return;
    setChosen(idx); setExResult(idx === content2.exercises[exIdx].correct);
  }

  function checkTranslate() {
    const ex = content2.exercises[exIdx];
    const norm = s => s.toLowerCase().replace(/['']/g, "'").trim();
    const correct = norm(translateInput) === norm(ex.answer) || (ex.alternatives || []).some(a => norm(translateInput) === norm(a));
    setChosen(0); setExResult(correct);
  }

  function nextEx() {
    if (exIdx + 1 >= content2.exercises.length) { setTab('quiz'); }
    else { setExIdx(e => e + 1); setChosen(null); setExResult(null); setTranslateInput(''); }
  }

  function answerQuiz(idx) {
    if (quizChosen !== null) return;
    setQuizChosen(idx);
    if (idx === content2.quiz[quizIdx].correct) setQuizScore(s => s + 1);
  }

  function nextQuiz() {
    if (quizIdx + 1 >= content2.quiz.length) { setQuizDone(true); }
    else { setQuizIdx(q => q + 1); setQuizChosen(null); }
  }

  const passed = quizDone && content2 && (quizScore / content2.quiz.length) >= 0.6;

  if (openLesson && lessonData && content2) {
    return (
      <div style={{ padding: isMobile ? '14px' : '24px 32px' }}>
        <button onClick={() => { setOpenLesson(null); setLessonData(null); }} style={{ background: 'none', border: `1px solid ${V.border}`, borderRadius: 8, padding: '10px 14px', color: V.text2, cursor: 'pointer', fontSize: 13, marginBottom: 16, fontFamily: 'inherit', minHeight: 44 }}>← Back to Lessons</button>
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, background: `${LEVEL_COLOR[lessonData.level]}22`, color: LEVEL_COLOR[lessonData.level], letterSpacing: '1px' }}>{lessonData.level}</span>
          <div style={{ fontSize: 26, fontWeight: 700, color: V.text, fontFamily: 'Georgia, serif', marginTop: 8 }}>{lessonData.title}</div>
          <div style={{ fontSize: 14, color: V.text2, marginTop: 4 }}>{lessonData.description}</div>
        </div>
        <div className="fmh-pill-row" style={{ background: V.bg3, borderRadius: 8, padding: 3, marginBottom: 20, width: isMobile ? '100%' : 'fit-content' }}>
          {[['learn', '📖 Learn'], ['exercises', '✏️ Exercises'], ['quiz', '🎯 Quiz']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ flex: isMobile ? 1 : 'none', padding: '10px 18px', borderRadius: 6, fontSize: 13, cursor: 'pointer', border: 'none', background: tab === id ? V.surface : 'transparent', color: tab === id ? V.text : V.text2, fontWeight: tab === id ? 500 : 400, fontFamily: 'inherit', minHeight: 44 }}>{label}</button>
          ))}
        </div>

        {tab === 'learn' && (
          <div>
            <div style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: `3px solid ${V.accent}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: V.accent, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>Introduction</div>
              <div style={{ fontSize: 14, color: V.text2, lineHeight: 1.8 }}>{content2.intro}</div>
            </div>
            {content2.sections?.map((sec, si) => (
              <div key={si} style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: V.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>{sec.type === 'vocabulary' ? '🗂 Vocabulary' : sec.type === 'grammar' ? '📐 Grammar Rule' : sec.type === 'dialogue' ? '💬 Dialogue' : sec.type === 'tips' ? '💡 TEF/TCF Tips' : sec.type === 'pronunciation' ? '🔊 Pronunciation' : '📌 Section'}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: V.text, marginBottom: 12 }}>{sec.title}</div>
                {sec.explanation && <div style={{ background: V.bg3, borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 13, color: V.text2, lineHeight: 1.7 }}>{sec.explanation}</div>}
                {sec.rules?.map((r, ri) => (
                  <div key={ri} style={{ borderBottom: `0.5px solid ${V.border}`, paddingBottom: 14, marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap', flexDirection: isMobile ? 'column' : 'row' }}>
                      <div style={{ minWidth: isMobile ? 0 : 200, width: isMobile ? '100%' : 'auto', fontSize: 13, fontWeight: 600, color: V.accent }}>{r.rule}</div>
                      <div style={{ flex: 1 }}>
                        {r.example && <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                          <span style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: V.text }}>{r.example}</span>
                          <button onClick={() => speak(r.example)} style={{ background: V.bg3, border: 'none', borderRadius: 4, padding: '2px 7px', fontSize: 11, cursor: 'pointer', color: V.text2, fontFamily: 'inherit' }}>▶</button>
                        </div>}
                        {r.translation && <div style={{ fontSize: 12, color: V.text3, fontStyle: 'italic', marginBottom: 4 }}>{r.translation}</div>}
                        {r.breakdown && <div style={{ fontSize: 12, color: V.text2, background: V.bg3, borderRadius: 4, padding: '4px 8px', display: 'inline-block' }}>{r.breakdown}</div>}
                      </div>
                    </div>
                  </div>
                ))}
                {sec.items?.map((item, ii) => (
                  <div key={ii} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr auto', gap: isMobile ? 6 : 10, alignItems: 'center', borderBottom: `0.5px solid ${V.border}`, padding: '10px 0' }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: V.text, fontFamily: 'Georgia, serif' }}>{item.fr}</div>
                      {item.pron && <div style={{ fontSize: 11, color: V.text3, fontStyle: 'italic', marginTop: 2 }}>/{item.pron}/</div>}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, color: V.text2 }}>{item.en}</div>
                      {item.note && <div style={{ fontSize: 11, color: V.text3, marginTop: 2 }}>{item.note}</div>}
                    </div>
                    {!isMobile && <button onClick={() => speak(item.fr.split('/')[0].split('→')[0].trim())} style={{ background: V.bg3, border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', color: V.text2, fontFamily: 'inherit' }}>▶ Play</button>}
                  </div>
                ))}
                {sec.lines?.map((line, li) => (
                  <div key={li} style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'flex-start' }}>
                    <div style={{ minWidth: 90, fontSize: 11, fontWeight: 700, color: V.accent, paddingTop: 3 }}>{line.speaker}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <div style={{ fontSize: 14, color: V.text, fontFamily: 'Georgia, serif', fontStyle: 'italic', flex: 1 }}>{line.fr}</div>
                        <button onClick={() => speak(line.fr)} style={{ background: V.bg3, border: 'none', borderRadius: 4, padding: '2px 7px', fontSize: 11, cursor: 'pointer', color: V.text2, fontFamily: 'inherit', flexShrink: 0 }}>▶</button>
                      </div>
                      <div style={{ fontSize: 12, color: V.text3, marginTop: 3 }}>{line.en}</div>
                    </div>
                  </div>
                ))}
                {sec.tips?.map((tip, ti) => (
                  <div key={ti} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: V.gold, fontSize: 14, flexShrink: 0 }}>★</span>
                    <div style={{ fontSize: 13, color: V.text2, lineHeight: 1.6 }}>{tip}</div>
                  </div>
                ))}
                {sec.notes?.map((note, ni) => (
                  <div key={ni} style={{ marginBottom: 12, padding: '10px 14px', background: V.bg3, borderRadius: 8, borderLeft: `2px solid ${V.teal}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: V.text, fontFamily: 'Georgia, serif' }}>{note.word}</span>
                      <button onClick={() => speak(note.word)} style={{ background: 'none', border: `1px solid ${V.border}`, borderRadius: 4, padding: '2px 7px', fontSize: 11, cursor: 'pointer', color: V.text2, fontFamily: 'inherit' }}>▶ Play</button>
                    </div>
                    <div style={{ fontSize: 13, color: V.text2 }}>{note.tip}</div>
                  </div>
                ))}
              </div>
            ))}
            <button onClick={() => setTab('exercises')} style={{ width: '100%', padding: 14, background: V.accent, color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginTop: 8 }}>Continue to Exercises →</button>
          </div>
        )}

        {tab === 'exercises' && content2?.exercises && (() => {
          const ex = content2.exercises[exIdx];
          if (!ex) return null;
          return (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: V.text2 }}>Exercise {Math.min(exIdx + 1, content2.exercises.length)} of {content2.exercises.length}</div>
              </div>
              <div style={{ height: 4, background: V.bg3, borderRadius: 2, marginBottom: 20, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(exIdx / content2.exercises.length) * 100}%`, background: V.accent, borderRadius: 2 }} />
              </div>
              <div style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 16, color: V.text, marginBottom: 20, lineHeight: 1.6, fontFamily: 'Georgia, serif' }}>{ex.question}</div>
                {ex.type === 'translate' ? (
                  <div>
                    <textarea value={translateInput} onChange={e => setTranslateInput(e.target.value)} placeholder="Type your French translation here..." disabled={chosen !== null} style={{ width: '100%', background: V.bg3, border: `1px solid ${V.border}`, borderRadius: 8, padding: 12, fontSize: 14, color: V.text, fontFamily: 'inherit', resize: 'vertical', minHeight: 80, boxSizing: 'border-box' }} />
                    {chosen === null && <button onClick={checkTranslate} style={{ marginTop: 10, padding: '10px 20px', background: V.accent, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Check Answer</button>}
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10 }}>
                    {ex.options.map((opt, i) => {
                      let bg = V.surface, color = V.text, border = V.border;
                      if (chosen !== null) {
                        if (i === ex.correct) { bg = 'rgba(74,222,128,0.1)'; color = V.green; border = V.green; }
                        else if (i === chosen && !exResult) { bg = 'rgba(248,113,113,0.1)'; color = V.red; border = V.red; }
                      }
                      return <button key={i} onClick={() => checkAnswer(i)} style={{ padding: '14px 16px', background: bg, border: `1px solid ${border}`, borderRadius: 8, fontSize: 14, cursor: chosen !== null ? 'default' : 'pointer', textAlign: 'left', color, fontFamily: 'inherit', lineHeight: 1.4, minHeight: 48 }}>{opt}</button>;
                    })}
                  </div>
                )}
                {chosen !== null && (
                  <div style={{ marginTop: 16 }}>
                    <div style={{ padding: 14, background: exResult ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)', borderRadius: 8, border: `1px solid ${exResult ? V.green + '44' : V.red + '44'}`, marginBottom: 12 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: exResult ? V.green : V.red, marginBottom: 6 }}>{exResult ? '✓ Correct!' : '✗ Not quite'}</div>
                      <div style={{ fontSize: 13, color: V.text2, lineHeight: 1.6 }}>{ex.explanation}</div>
                      {ex.type === 'translate' && !exResult && <div style={{ marginTop: 8, fontSize: 13, color: V.green }}>Correct: <em>{ex.answer}</em></div>}
                    </div>
                    <button onClick={nextEx} style={{ padding: '10px 20px', background: V.accent, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                      {exIdx + 1 >= content2.exercises.length ? 'Go to Quiz →' : 'Next Exercise →'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {tab === 'quiz' && content2?.quiz && (
          <div>
            {!quizDone ? (() => {
              const q = content2.quiz[quizIdx];
              return (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div style={{ fontSize: 13, color: V.text2 }}>Question {quizIdx + 1} of {content2.quiz.length}</div>
                    <div style={{ fontSize: 13, color: V.green }}>Score: {quizScore}/{quizIdx}</div>
                  </div>
                  <div style={{ height: 4, background: V.bg3, borderRadius: 2, marginBottom: 20, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(quizIdx / content2.quiz.length) * 100}%`, background: V.gold, borderRadius: 2 }} />
                  </div>
                  <div style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 12, padding: 24 }}>
                    <div style={{ fontSize: 16, color: V.text, marginBottom: 20, lineHeight: 1.6, fontFamily: 'Georgia, serif' }}>{q.question}</div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10 }}>
                      {q.options.map((opt, i) => {
                        let bg = V.surface, color = V.text, border = V.border;
                        if (quizChosen !== null) {
                          if (i === q.correct) { bg = 'rgba(74,222,128,0.1)'; color = V.green; border = V.green; }
                          else if (i === quizChosen) { bg = 'rgba(248,113,113,0.1)'; color = V.red; border = V.red; }
                        }
                        return <button key={i} onClick={() => answerQuiz(i)} style={{ padding: '14px 16px', background: bg, border: `1px solid ${border}`, borderRadius: 8, fontSize: 14, cursor: quizChosen !== null ? 'default' : 'pointer', textAlign: 'left', color, fontFamily: 'inherit', minHeight: 48 }}>{opt}</button>;
                      })}
                    </div>
                    {quizChosen !== null && (
                      <div style={{ marginTop: 16 }}>
                        <div style={{ padding: 12, background: V.bg3, borderRadius: 8, fontSize: 13, color: V.text2, marginBottom: 12 }}>{q.explanation}</div>
                        <button onClick={nextQuiz} style={{ padding: '10px 20px', background: V.accent, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                          {quizIdx + 1 >= content2.quiz.length ? 'See Results →' : 'Next Question →'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })() : (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{passed ? '🎉' : '📚'}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: V.text, marginBottom: 8 }}>{quizScore} / {content2.quiz.length} - {Math.round((quizScore / content2.quiz.length) * 100)}%</div>
                <div style={{ fontSize: 15, color: V.text2, marginBottom: 24 }}>{passed ? 'Excellent! You passed this lesson.' : 'You need 60% to pass. Review the lesson and try again.'}</div>
                {passed
                  ? <button onClick={complete} style={{ padding: '14px 28px', background: V.green, color: '#0f0e17', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12 }}>✓ Complete Lesson (+{lessonData.xp_reward} XP)</button>
                  : <button onClick={() => { setQuizIdx(0); setQuizChosen(null); setQuizScore(0); setQuizDone(false); }} style={{ padding: '14px 28px', background: V.accent, color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Try Again</button>
                }
                <button onClick={() => setTab('learn')} style={{ padding: '14px 28px', background: V.surface, color: V.text, border: `1px solid ${V.border}`, borderRadius: 10, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', marginLeft: 8 }}>Review Lesson</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: isMobile ? '16px' : '28px 32px' }}>
      <PageHeader title="All Lessons" sub={`${lessons.length} progressive lessons · A1 to B2 · Click any lesson to begin`} V={V} />
      <div className="fmh-pill-row" style={{ background: V.bg3, borderRadius: 8, padding: 3, marginBottom: 20 }}>
        {['ALL','A1','A2','B1','B2'].map(lvl => (
          <button key={lvl} onClick={() => setFilter(lvl)} style={{ padding: '10px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer', border: 'none', background: filter === lvl ? V.surface : 'transparent', color: filter === lvl ? V.text : V.text2, fontWeight: filter === lvl ? 500 : 400, fontFamily: 'inherit', minHeight: 44 }}>{lvl}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: isMobile ? 8 : 12 }}>
        {filtered.map(l => (
          <div key={l.id} onClick={() => openLes(l.id)}
            onMouseEnter={e => e.currentTarget.style.borderColor = V.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = V.border}
            style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 10, padding: 16, cursor: 'pointer', transition: 'border 0.15s', position: 'relative', overflow: 'hidden' }}>
            {l.status === 'completed' && <div style={{ position: 'absolute', top: 10, right: 10, background: V.green, color: '#0f0e17', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>✓</div>}
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8, padding: '2px 7px', borderRadius: 4, display: 'inline-block', background: `${LEVEL_COLOR[l.level]}22`, color: LEVEL_COLOR[l.level] }}>{l.level}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: V.text, marginBottom: 4, lineHeight: 1.3 }}>{l.title}</div>
            <div style={{ fontSize: 11, color: V.text3, lineHeight: 1.5, marginBottom: 10 }}>{l.description}</div>
            <div style={{ display: 'flex', gap: 12, fontSize: 10, color: V.text3 }}>
              <span>⏱ {l.duration_min} min</span><span>⚡ {l.xp_reward} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ── Vocab ─────────────────────────────────────────────────────────────────────
function Vocab({ V }) {
  const [cards, setCards] = useState([]);
  const [stats, setStats] = useState({});
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    api('/vocab/due').then(d => setCards(d.cards || []));
    api('/vocab/stats').then(setStats);
  }, []);

  async function rate(rating) {
    if (!cards[idx]) return;
    await api('/vocab/review', { method: 'POST', body: JSON.stringify({ card_id: cards[idx].id, rating }) });
    setFlipped(false);
    setIdx(i => i + 1);
  }

  const card = cards[idx % Math.max(cards.length, 1)];
  const done = idx >= cards.length;

  return (
    <div style={{ padding: isMobile ? '16px' : '28px 32px' }}>
      <PageHeader title="Vocabulary Flashcards" sub="Anki-style spaced repetition · SM-2 algorithm" V={V} />

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
        {[['New', stats.new_count ?? 0, '#60a5fa'], ['Review', stats.due_today ?? 0, V.gold], ['Mastered', stats.mastered ?? 0, V.green]].map(([l, v, c]) => (
          <div key={l} style={{ textAlign: 'center', padding: '12px 20px', background: V.surface, border: `1px solid ${V.border}`, borderRadius: 12, minWidth: 100 }}>
            <div style={{ fontSize: 10, color: V.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>{l}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: c }}>{v}</div>
          </div>
        ))}
      </div>

      {done ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: V.text, marginBottom: 6 }}>All cards reviewed!</div>
          <div style={{ fontSize: 14, color: V.text2 }}>Come back tomorrow for your next batch.</div>
          <Btn primary onClick={() => { setIdx(0); setFlipped(false); }} V={V} style={{ marginTop: 16 }}>Review Again</Btn>
        </div>
      ) : card ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', maxWidth: 480, height: 200, background: flipped ? `linear-gradient(135deg, rgba(108,99,255,0.15), rgba(167,139,250,0.1))` : V.surface, border: `1px solid ${V.border}`, borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textAlign: 'center', padding: 20 }}>
            {!flipped ? (
              <>
                <div style={{ fontSize: 36, fontWeight: 700, color: V.text, marginBottom: 6, fontFamily: 'Georgia, serif' }}>{card.word}</div>
                <div style={{ fontSize: 12, color: V.text3, textTransform: 'uppercase', letterSpacing: '1px' }}>{card.word_type}</div>
                <div style={{ fontSize: 12, color: V.text3, marginTop: 12 }}>Tap to reveal →</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 22, fontWeight: 600, color: V.accent, marginBottom: 8 }}>{card.translation}</div>
                <div style={{ fontSize: 13, color: V.text2, fontStyle: 'italic' }}>"{card.example_fr}"</div>
              </>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: 480 }}>
            {[['😓 Hard', 'hard', 'rgba(248,113,113,0.15)', V.red], ['😐 Okay', 'okay', 'rgba(251,191,36,0.15)', V.gold], ['😄 Easy', 'easy', 'rgba(74,222,128,0.15)', V.green]].map(([label, r, bg, c]) => (
              <button key={r} onClick={() => rate(r)} style={{ flex: 1, padding: isMobile ? '14px 0' : '10px 0', background: bg, color: c, border: `1px solid ${c}33`, borderRadius: 8, fontSize: isMobile ? 14 : 13, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500, minHeight: 52 }}>{label}</button>
            ))}
          </div>
          <div style={{ fontSize: 12, color: V.text3 }}>Card {Math.min(idx + 1, cards.length)} of {cards.length}</div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: 40, color: V.text2 }}>Loading cards...</div>
      )}
    </div>
  );
}

// ── Grammar ───────────────────────────────────────────────────────────────────
function Grammar({ V }) {
  const [drills, setDrills] = useState([]);
  const isMobile = useIsMobile();
  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ c: 0, t: 0 });
  const [category, setCategory] = useState('');

  function load(cat) {
    setCategory(cat);
    api(`/grammar?${cat ? `category=${cat}&` : ''}limit=12`).then(d => { setDrills(d); setIdx(0); setChosen(null); setResult(null); });
  }

  useEffect(() => { load(''); }, []);

  const drill = drills[idx];

  async function choose(i) {
    if (chosen !== null) return;
    setChosen(i);
    const data = await api('/grammar/attempt', { method: 'POST', body: JSON.stringify({ drill_id: drill.id, chosen_idx: i }) });
    setResult(data);
    setScore(s => ({ c: s.c + (data.is_correct ? 1 : 0), t: s.t + 1 }));
  }

  const options = drill?.options ? JSON.parse(drill.options) : [];

  return (
    <div style={{ padding: isMobile ? '16px' : '28px 32px' }}>
      <PageHeader title="Grammar Drills" sub="Fill-in-the-blank · Explanations · Track your weak spots" V={V} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 10, flexWrap: 'wrap' }}>
        <div className="fmh-pill-row" style={{ background: V.bg3, borderRadius: 8, padding: 3, flex: 1 }}>
          {[['', 'All'], ['articles', 'Articles'], ['verbs', 'Être/Avoir'], ['pronouns', 'Pronouns'], ['negation', 'Negation'], ['past', 'Past'], ['future', 'Future']].map(([val, label]) => (
            <button key={val} onClick={() => load(val)} style={{ padding: '8px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer', border: 'none', background: category === val ? V.surface : 'transparent', color: category === val ? V.text : V.text2, minHeight: 40 }}>{label}</button>
          ))}
        </div>
        <div style={{ fontSize: 13, color: V.text2, flexShrink: 0 }}>Score: <span style={{ color: V.green, fontWeight: 600 }}>{score.c}/{score.t}</span></div>
      </div>

      {drill ? (
        <Card V={V}>
          <div style={{ fontSize: 11, color: V.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>Question {idx + 1} of {drills.length}</div>
          <div style={{ fontSize: isMobile ? 16 : 18, color: V.text, marginBottom: 4, lineHeight: 1.5 }}>{drill.question}</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 8, marginTop: 16 }}>
            {options.map((opt, i) => {
              let bg = V.surface, color = V.text, border = V.border;
              if (chosen !== null) {
                if (i === result?.correct_idx) { bg = 'rgba(74,222,128,0.1)'; color = V.green; border = V.green; }
                else if (i === chosen && !result?.is_correct) { bg = 'rgba(248,113,113,0.1)'; color = V.red; border = V.red; }
              }
              return (
                <button key={i} onClick={() => choose(i)} style={{ padding: '14px', background: bg, border: `1px solid ${border}`, borderRadius: 8, fontSize: 14, cursor: chosen !== null ? 'default' : 'pointer', textAlign: 'left', color, fontFamily: 'inherit', minHeight: 48 }}>{opt}</button>
              );
            })}
          </div>

          {result && (
            <div style={{ background: V.bg3, borderLeft: `3px solid ${V.accent}`, borderRadius: '0 8px 8px 0', padding: '12px 14px', marginTop: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: V.accent, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.8px' }}>💡 Explanation</div>
              <div style={{ fontSize: 13, color: V.text2 }}>{drill.explanation}</div>
            </div>
          )}

          {chosen !== null && (
            <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
              <Btn primary small onClick={() => { setIdx(i => i + 1 < drills.length ? i + 1 : 0); setChosen(null); setResult(null); }} V={V}>Next →</Btn>
            </div>
          )}
        </Card>
      ) : (
        <div style={{ textAlign: 'center', padding: 40, color: V.text2 }}>Loading drills...</div>
      )}
    </div>
  );
}


// UPDATED SECTIONS - paste these into App.jsx replacing the existing
// Reading, Listening, Writing, and Speaking functions

// ── Reading ───────────────────────────────────────────────────────────────────
function Reading({ V }) {
  const [level, setLevel] = useState('A1');
  const isMobile = useIsMobile();
  const [passages, setPassages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Load from data.json via API
    fetch('/api/content/readings?level=' + level, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('fmh_token') }
    }).then(r => r.json()).then(d => {
      setPassages(d || []);
      setCurrent(0); setAnswers({}); setSubmitted(false); setScore(0);
    }).catch(() => setPassages([]));
  }, [level]);

  const passage = passages[current];

  function answer(qIdx, optIdx) {
    if (submitted) return;
    setAnswers(a => ({ ...a, [qIdx]: optIdx }));
  }

  function submit() {
    if (!passage) return;
    let s = 0;
    passage.questions.forEach((q, i) => { if (answers[i] === q.correct) s++; });
    setScore(s);
    setSubmitted(true);
    // Log session
    fetch('/api/progress/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('fmh_token') },
      body: JSON.stringify({ session_type: 'reading', duration_min: 15, xp_earned: s * 10 })
    });
  }

  function next() {
    setCurrent(c => (c + 1) % passages.length);
    setAnswers({}); setSubmitted(false); setScore(0);
  }

  return (
    <div style={{ padding: isMobile ? '16px' : '28px 32px' }}>
      <PageHeader title="Reading Practice" sub="Oakville & Canadian context · A1 to B2 · 5 questions per passage" V={V} />

      <div style={{ display: 'flex', gap: 3, background: V.bg3, borderRadius: 8, padding: 3, marginBottom: 20, width: 'fit-content' }}>
        {['A1','A2','B1','B2'].map(l => (
          <button key={l} onClick={() => setLevel(l)} style={{ padding: '7px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer', border: 'none', background: level === l ? V.surface : 'transparent', color: level === l ? V.text : V.text2, fontFamily: 'inherit' }}>{l}</button>
        ))}
      </div>

      {!passage ? (
        <div style={{ textAlign: 'center', padding: 40, color: V.text2 }}>Loading passages...</div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: V.text2 }}>Passage {current + 1} of {passages.length}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { setCurrent(c => Math.max(0, c-1)); setAnswers({}); setSubmitted(false); }} style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer', color: V.text2, fontFamily: 'inherit', fontSize: 12 }}>← Prev</button>
              <button onClick={next} style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer', color: V.text2, fontFamily: 'inherit', fontSize: 12 }}>Next →</button>
            </div>
          </div>

          <Card V={V} style={{ marginBottom: 16 }}>
            <CardTitle V={V}>{passage.title} · <span style={{ color: V.accent }}>{level}</span></CardTitle>
            <div style={{ fontSize: 15, lineHeight: 1.9, color: V.text2, fontFamily: 'Georgia, serif', borderLeft: `3px solid ${V.accent}`, paddingLeft: 16, marginBottom: 8 }}>{passage.text}</div>
          </Card>

          <Card V={V}>
            <CardTitle V={V}>Comprehension Questions</CardTitle>
            {passage.questions.map((q, qi) => (
              <div key={qi} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 14, color: V.text, marginBottom: 10, fontWeight: 500 }}>{qi + 1}. {q.q}</div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 8 }}>
                  {q.options.map((opt, oi) => {
                    let bg = V.surface, color = V.text, border = V.border;
                    if (submitted) {
                      if (oi === q.correct) { bg = 'rgba(74,222,128,0.1)'; color = V.green; border = V.green; }
                      else if (oi === answers[qi] && oi !== q.correct) { bg = 'rgba(248,113,113,0.1)'; color = V.red; border = V.red; }
                    } else if (answers[qi] === oi) {
                      bg = 'rgba(108,99,255,0.1)'; border = V.accent; color = V.accent;
                    }
                    return (
                      <button key={oi} onClick={() => answer(qi, oi)} style={{ padding: '12px 14px', background: bg, border: `1px solid ${border}`, borderRadius: 8, fontSize: 13, cursor: submitted ? 'default' : 'pointer', textAlign: 'left', color, fontFamily: 'inherit', lineHeight: 1.4, minHeight: 48 }}>{opt}</button>
                    );
                  })}
                </div>
                {submitted && q.note && (
                  <div style={{ marginTop: 8, fontSize: 12, color: V.text3, fontStyle: 'italic' }}>💡 {q.note}</div>
                )}
              </div>
            ))}

            {!submitted ? (
              <Btn primary onClick={submit} V={V} style={{ marginTop: 8 }}>Submit Answers</Btn>
            ) : (
              <div>
                <div style={{ padding: 14, background: score >= 4 ? 'rgba(74,222,128,0.08)' : score >= 3 ? 'rgba(251,191,36,0.08)' : 'rgba(248,113,113,0.08)', borderRadius: 8, border: `1px solid ${score >= 4 ? V.green : score >= 3 ? V.gold : V.red}44`, marginBottom: 12 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: score >= 4 ? V.green : score >= 3 ? V.gold : V.red }}>
                    {score}/5 - {score >= 4 ? 'Excellent! 🎉' : score >= 3 ? 'Good work! 👍' : 'Keep practicing! 📚'}
                  </div>
                </div>
                <Btn primary onClick={next} V={V}>Next Passage →</Btn>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

// ── Listening ─────────────────────────────────────────────────────────────────
function Listening({ V }) {
  const [level, setLevel] = useState('A1');
  const isMobile = useIsMobile();
  const [tracks, setTracks] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showScript, setShowScript] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    fetch('/api/content/listening?level=' + level, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('fmh_token') }
    }).then(r => r.json()).then(d => {
      setTracks(d || []);
      setCurrent(0); setAnswers({}); setSubmitted(false); setShowScript(false);
    }).catch(() => setTracks([]));
  }, [level]);

  const track = tracks[current];

  function speak() {
    if ('speechSynthesis' in window) {
      if (playing) { window.speechSynthesis.cancel(); setPlaying(false); return; }
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(track.script);
      u.lang = 'fr-FR'; u.rate = level === 'A1' ? 0.75 : level === 'A2' ? 0.8 : 0.85;
      const voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('fr'));
      if (voices.length) u.voice = voices[0];
      u.onend = () => setPlaying(false);
      setPlaying(true);
      window.speechSynthesis.speak(u);
    }
  }

  function answer(qIdx, optIdx) { if (submitted) return; setAnswers(a => ({ ...a, [qIdx]: optIdx })); }

  function submit() {
    if (!track) return;
    let s = 0;
    track.questions.forEach((q, i) => { if (answers[i] === q.correct) s++; });
    setSubmitted(true);
  }

  const score = track ? track.questions.filter((q, i) => answers[i] === q.correct).length : 0;

  return (
    <div style={{ padding: isMobile ? '16px' : '28px 32px' }}>
      <PageHeader title="Listening Practice" sub="Free browser TTS · 5 questions per track · Script revealed after answering" V={V} />

      <div style={{ display: 'flex', gap: 3, background: V.bg3, borderRadius: 8, padding: 3, marginBottom: 20, width: 'fit-content' }}>
        {['A1','A2','B1','B2'].map(l => (
          <button key={l} onClick={() => setLevel(l)} style={{ padding: '7px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer', border: 'none', background: level === l ? V.surface : 'transparent', color: level === l ? V.text : V.text2, fontFamily: 'inherit' }}>{l}</button>
        ))}
      </div>

      {!track ? (
        <div style={{ textAlign: 'center', padding: 40, color: V.text2 }}>Loading tracks...</div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: V.text2 }}>Track {current + 1} of {tracks.length} · {track.type}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { setCurrent(c => Math.max(0, c-1)); setAnswers({}); setSubmitted(false); setShowScript(false); window.speechSynthesis.cancel(); setPlaying(false); }} style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer', color: V.text2, fontFamily: 'inherit', fontSize: 12 }}>← Prev</button>
              <button onClick={() => { setCurrent(c => (c+1)%tracks.length); setAnswers({}); setSubmitted(false); setShowScript(false); window.speechSynthesis.cancel(); setPlaying(false); }} style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer', color: V.text2, fontFamily: 'inherit', fontSize: 12 }}>Next →</button>
            </div>
          </div>

          <Card V={V} style={{ marginBottom: 16 }}>
            <CardTitle V={V}>{track.title}</CardTitle>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
              <button onClick={speak} style={{ width: 56, height: 56, borderRadius: '50%', background: playing ? 'linear-gradient(135deg,#f87171,#e879f9)' : 'linear-gradient(135deg,#6c63ff,#a78bfa)', border: 'none', cursor: 'pointer', fontSize: 22, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{playing ? '⏹' : '▶'}</button>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: V.text }}>{playing ? '🔊 Playing in French...' : 'Click to play in French'}</div>
                <div style={{ fontSize: 12, color: V.text3 }}>Speed: {level === 'A1' ? 'Slow (A1)' : level === 'A2' ? 'Natural (A2)' : 'Fast (B1/B2)'} · Listen before answering</div>
              </div>
            </div>

            {submitted && (
              <button onClick={() => setShowScript(s => !s)} style={{ fontSize: 12, color: V.accent, background: 'none', border: `1px solid ${V.accent}`, borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontFamily: 'inherit' }}>
                {showScript ? '▼ Hide Script' : '▶ Show Script'}
              </button>
            )}
            {showScript && submitted && (
              <div style={{ marginTop: 12, padding: 14, background: V.bg3, borderRadius: 8, fontSize: 13, color: V.text2, lineHeight: 1.8, whiteSpace: 'pre-line', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{track.script}</div>
            )}
          </Card>

          <Card V={V}>
            <CardTitle V={V}>Comprehension Questions (5)</CardTitle>
            {track.questions.map((q, qi) => (
              <div key={qi} style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 14, color: V.text, marginBottom: 8, fontWeight: 500 }}>{qi + 1}. {q.q}</div>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 8 }}>
                  {q.options.map((opt, oi) => {
                    let bg = V.surface, color = V.text, border = V.border;
                    if (submitted) {
                      if (oi === q.correct) { bg = 'rgba(74,222,128,0.1)'; color = V.green; border = V.green; }
                      else if (oi === answers[qi] && oi !== q.correct) { bg = 'rgba(248,113,113,0.1)'; color = V.red; border = V.red; }
                    } else if (answers[qi] === oi) { bg = 'rgba(108,99,255,0.1)'; border = V.accent; color = V.accent; }
                    return <button key={oi} onClick={() => answer(qi, oi)} style={{ padding: '12px', background: bg, border: `1px solid ${border}`, borderRadius: 8, fontSize: 13, cursor: submitted ? 'default' : 'pointer', textAlign: 'left', color, fontFamily: 'inherit', minHeight: 48 }}>{opt}</button>;
                  })}
                </div>
              </div>
            ))}
            {!submitted ? (
              <Btn primary onClick={submit} V={V}>Submit Answers</Btn>
            ) : (
              <div style={{ padding: 14, background: score >= 4 ? 'rgba(74,222,128,0.08)' : 'rgba(251,191,36,0.08)', borderRadius: 8, border: `1px solid ${score >= 4 ? V.green : V.gold}44` }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: score >= 4 ? V.green : V.gold }}>{score}/5 - {score >= 4 ? 'Excellent! 🎉' : 'Keep practicing! 📚'}</div>
                <div style={{ fontSize: 12, color: V.text3, marginTop: 4 }}>Click "Show Script" to review the text</div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

// ── Writing ───────────────────────────────────────────────────────────────────
function Writing({ V }) {
  const [level, setLevel] = useState('A1');
  const isMobile = useIsMobile();
  const [prompts, setPrompts] = useState([]);
  const [promptIdx, setPromptIdx] = useState(0);
  const [text, setText] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    fetch('/api/content/writing?level=' + level, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('fmh_token') }
    }).then(r => r.json()).then(d => {
      setPrompts(d || []);
      setPromptIdx(0); setText(''); setFeedback(null); setShowModel(false);
    }).catch(() => {
      api(`/writing/prompts?level=${level}`).then(setPrompts);
    });
  }, [level]);

  const prompt = prompts[promptIdx];
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  async function getFeedback() {
    if (!text.trim() || text.trim().length < 15) return alert('Please write at least a few sentences first!');
    setLoading(true); setFeedback(null);
    try {
      const data = await api('/ai/writing-feedback', { method: 'POST', body: JSON.stringify({ text, level, prompt: prompt?.prompt || '' }) });
      setFeedback(data);
    } finally { setLoading(false); }
  }

  return (
    <div style={{ padding: isMobile ? '16px' : '28px 32px' }}>
      <PageHeader title="Writing Practice" sub="10 prompts per level · Model answers · AI feedback available" V={V} />

      <div style={{ display: 'flex', gap: 3, background: V.bg3, borderRadius: 8, padding: 3, marginBottom: 16, width: 'fit-content' }}>
        {['A1','A2','B1','B2'].map(l => <button key={l} onClick={() => { setLevel(l); setText(''); setFeedback(null); setShowModel(false); }} style={{ padding: '6px 14px', borderRadius: 6, fontSize: 12, cursor: 'pointer', border: 'none', background: level === l ? V.surface : 'transparent', color: level === l ? V.text : V.text2, fontFamily: 'inherit' }}>{l}</button>)}
      </div>

      {prompt && (
        <Card V={V} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <CardTitle V={V} style={{ marginBottom: 0 }}>Prompt {promptIdx + 1} of {prompts.length} · {prompt.type}</CardTitle>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { setPromptIdx(i => Math.max(0, i-1)); setText(''); setFeedback(null); setShowModel(false); }} style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 6, padding: '4px 10px', cursor: 'pointer', color: V.text2, fontFamily: 'inherit', fontSize: 11 }}>← Prev</button>
              <button onClick={() => { setPromptIdx(i => (i+1)%prompts.length); setText(''); setFeedback(null); setShowModel(false); }} style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 6, padding: '4px 10px', cursor: 'pointer', color: V.text2, fontFamily: 'inherit', fontSize: 11 }}>Next →</button>
            </div>
          </div>
          <div style={{ fontSize: 14, color: V.text, lineHeight: 1.6, fontStyle: 'italic', padding: 14, background: V.bg3, borderRadius: 8 }}>
            "{prompt.prompt}"<br/>
            <span style={{ fontSize: 11, color: V.text3, fontStyle: 'normal' }}>{level} · {prompt.min_words}-{prompt.max_words} words</span>
          </div>
        </Card>
      )}

      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Écrivez votre réponse ici... (Write your response here...)" style={{ width: '100%', background: V.bg3, border: `1px solid ${V.border}`, borderRadius: 8, padding: 14, fontFamily: 'inherit', fontSize: 14, color: V.text, resize: 'vertical', minHeight: 160, lineHeight: 1.6, boxSizing: 'border-box', outline: 'none' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 10 : 0, marginTop: 10, marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: prompt && wordCount < prompt.min_words ? V.red : V.green }}>
          {wordCount} words {prompt && `(target: ${prompt.min_words}-${prompt.max_words})`}
        </div>
        <div style={{ display: 'flex', gap: 8, width: isMobile ? '100%' : 'auto' }}>
          <button onClick={() => setShowModel(s => !s)} style={{ flex: isMobile ? 1 : 'none', padding: '10px 14px', background: V.surface, border: `1px solid ${V.border}`, borderRadius: 8, fontSize: 13, cursor: 'pointer', color: V.text2, fontFamily: 'inherit', minHeight: 44 }}>{showModel ? 'Hide' : 'Show'} Model Answer</button>
          <Btn primary onClick={getFeedback} V={V} style={{ flex: isMobile ? 1 : 'none', minHeight: 44 }}>{loading ? '✦ Analyzing...' : '✦ Get AI Feedback'}</Btn>
        </div>
      </div>

      {showModel && prompt?.model_response && (
        <div style={{ background: 'rgba(45,212,191,0.05)', border: `1px solid rgba(45,212,191,0.25)`, borderRadius: 10, padding: 18, marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: V.teal, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.8px' }}>📝 Model Answer</div>
          <div style={{ fontSize: 13, color: V.text2, lineHeight: 1.8, whiteSpace: 'pre-line', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{prompt.model_response}</div>
        </div>
      )}

      {feedback && (
        <div style={{ background: `linear-gradient(135deg, rgba(108,99,255,0.08), rgba(45,212,191,0.05))`, border: `1px solid rgba(108,99,255,0.25)`, borderRadius: 10, padding: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: V.accent, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.8px' }}>✦ AI Feedback - Score: {feedback.score}/100</div>
          <p style={{ fontSize: 13, color: V.text2, lineHeight: 1.6, marginBottom: 12 }}>{feedback.overall}</p>
          {feedback.corrections?.map((c, i) => (
            <div key={i} style={{ marginBottom: 10, padding: '10px 12px', background: V.bg3, borderRadius: 8 }}>
              <span style={{ color: V.red, textDecoration: 'line-through', marginRight: 8 }}>{c.original}</span>
              <span style={{ color: V.green, fontWeight: 600, marginRight: 8 }}>→ {c.corrected}</span>
              <div style={{ fontSize: 11, color: V.text3, marginTop: 4 }}>{c.explanation}</div>
            </div>
          ))}
          {feedback.strengths?.length > 0 && <div style={{ color: V.green, fontSize: 12, marginTop: 8 }}>✓ {feedback.strengths.join(' · ')}</div>}
          {feedback.next_steps?.length > 0 && <div style={{ color: V.gold, fontSize: 12, marginTop: 6 }}>→ {feedback.next_steps.join(' · ')}</div>}
        </div>
      )}
    </div>
  );
}

// ── Speaking ──────────────────────────────────────────────────────────────────
function Speaking({ V }) {
  const [level, setLevel] = useState('A1');
  const isMobile = useIsMobile();
  const [prompts, setPrompts] = useState([]);
  const [promptIdx, setPromptIdx] = useState(0);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const timerRef = React.useRef(null);

  useEffect(() => {
    fetch('/api/content/speaking?level=' + level, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('fmh_token') }
    }).then(r => r.json()).then(d => {
      setPrompts(d || []);
      setPromptIdx(0); setShowModel(false); setShowTips(false);
    }).catch(() => {
      api(`/speaking/prompts?level=${level}`).then(p => setPrompts(p.map(text => ({ prompt: text }))));
    });
  }, [level]);

  const prompt = prompts[promptIdx];

  function toggleRec() {
    if (recording) {
      clearInterval(timerRef.current);
      setRecording(false);
    } else {
      setSeconds(0); setRecording(true);
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    }
  }

  function speakModel() {
    if (!prompt?.model_response) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(prompt.model_response);
      u.lang = 'fr-FR'; u.rate = 0.82;
      const voices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith('fr'));
      if (voices.length) u.voice = voices[0];
      window.speechSynthesis.speak(u);
    }
  }

  return (
    <div style={{ padding: isMobile ? '16px' : '28px 32px' }}>
      <PageHeader title="Speaking Practice" sub="10 prompts per level · Model answers · TEF oral format" V={V} />

      <div style={{ display: 'flex', gap: 3, background: V.bg3, borderRadius: 8, padding: 3, marginBottom: 20, width: 'fit-content' }}>
        {['A1','A2','B1','B2'].map(l => <button key={l} onClick={() => { setLevel(l); setShowModel(false); setShowTips(false); }} style={{ padding: '7px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer', border: 'none', background: level === l ? V.surface : 'transparent', color: level === l ? V.text : V.text2, fontFamily: 'inherit' }}>{l}</button>)}
      </div>

      {!prompt ? (
        <div style={{ textAlign: 'center', padding: 40, color: V.text2 }}>Loading prompts...</div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 13, color: V.text2 }}>Prompt {promptIdx + 1} of {prompts.length}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { setPromptIdx(i => Math.max(0, i-1)); setShowModel(false); setShowTips(false); window.speechSynthesis?.cancel(); }} style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer', color: V.text2, fontFamily: 'inherit', fontSize: 12 }}>← Prev</button>
              <button onClick={() => { setPromptIdx(i => (i+1)%prompts.length); setShowModel(false); setShowTips(false); window.speechSynthesis?.cancel(); }} style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 6, padding: '5px 12px', cursor: 'pointer', color: V.text2, fontFamily: 'inherit', fontSize: 12 }}>Next →</button>
            </div>
          </div>

          <Card V={V} style={{ textAlign: 'center', marginBottom: 16 }}>
            <CardTitle V={V} style={{ textAlign: 'left' }}>Speaking Prompt · {level}</CardTitle>
            <div style={{ fontSize: 16, color: V.text, fontStyle: 'italic', lineHeight: 1.6, padding: 16, background: V.bg3, borderRadius: 8, marginBottom: 20, textAlign: 'left' }}>
              "{prompt.prompt}"
              {prompt.duration_sec && <div style={{ fontSize: 11, color: V.text3, fontStyle: 'normal', marginTop: 6 }}>Target: {Math.floor(prompt.duration_sec/60)}:{String(prompt.duration_sec%60).padStart(2,'0')} · TEF oral format</div>}
            </div>

            <button onClick={toggleRec} style={{ width: 68, height: 68, borderRadius: '50%', background: recording ? 'linear-gradient(135deg,#f87171,#e879f9)' : 'linear-gradient(135deg,#6c63ff,#a78bfa)', border: 'none', cursor: 'pointer', fontSize: 26, color: '#fff', boxShadow: recording ? '0 0 0 8px rgba(248,113,113,0.2)' : 'none', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              {recording ? '⏹' : '🎙️'}
            </button>
            <div style={{ marginTop: 10, fontSize: 12, color: V.text3 }}>
              {recording ? `🔴 Recording... ${seconds}s - Press to stop` : 'Press to start recording'}
            </div>
          </Card>

          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <button onClick={() => setShowModel(s => !s)} style={{ flex: 1, padding: '10px 0', background: V.surface, border: `1px solid ${V.border}`, borderRadius: 8, cursor: 'pointer', color: V.text2, fontFamily: 'inherit', fontSize: 13 }}>{showModel ? '▼' : '▶'} Model Answer</button>
            {prompt.tips && <button onClick={() => setShowTips(s => !s)} style={{ flex: 1, padding: '10px 0', background: V.surface, border: `1px solid ${V.border}`, borderRadius: 8, cursor: 'pointer', color: V.text2, fontFamily: 'inherit', fontSize: 13 }}>{showTips ? '▼' : '▶'} Tips</button>}
          </div>

          {showModel && prompt.model_response && (
            <Card V={V} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: V.teal, textTransform: 'uppercase', letterSpacing: '0.8px' }}>📝 Model Response</div>
                <button onClick={speakModel} style={{ background: V.bg3, border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer', color: V.text2, fontFamily: 'inherit' }}>▶ Listen in French</button>
              </div>
              <div style={{ fontSize: 13, color: V.text2, lineHeight: 1.8, whiteSpace: 'pre-line', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{prompt.model_response}</div>
            </Card>
          )}

          {showTips && prompt.tips && (
            <Card V={V}>
              <div style={{ fontSize: 11, fontWeight: 700, color: V.accent, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 10 }}>💡 Speaking Tips</div>
              {prompt.tips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <span style={{ color: V.gold, flexShrink: 0 }}>★</span>
                  <div style={{ fontSize: 13, color: V.text2 }}>{tip}</div>
                </div>
              ))}
            </Card>
          )}
        </div>
      )}
    </div>
  );
}


// ── Progress ──────────────────────────────────────────────────────────────────
function Progress({ user, V }) {
  const [data, setData] = useState(null);
  const isMobile = useIsMobile();
  const [weak, setWeak] = useState([]);

  useEffect(() => {
    api('/progress/dashboard').then(setData);
    api('/progress/weak-areas').then(setWeak);
  }, []);

  return (
    <div style={{ padding: isMobile ? '16px' : '28px 32px' }}>
      <PageHeader title="Progress Dashboard" sub="CEFR tracking · Hours logged · Weak areas" V={V} />
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4,1fr)', gap: isMobile ? 8 : 12, marginBottom: 14 }}>
        <StatCard label="Current Level" value="A1" sub="Foundation" color={V.accent} V={V} />
        <StatCard label="Total Hours" value={`${data?.totalHours ?? 0}h`} sub="Since start" V={V} />
        <StatCard label="Lessons Done" value={`${data?.lessonsCompleted ?? 0}/${data?.lessonsTotal ?? 46}`} sub={`${Math.round(((data?.lessonsCompleted ?? 0) / (data?.lessonsTotal ?? 46)) * 100)}% complete`} V={V} />
        <StatCard label="XP Points" value={data?.totalXP ?? 0} sub="Total earned" color={V.gold} V={V} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
        <Card V={V}>
          <CardTitle V={V}>Skill Breakdown</CardTitle>
          {weak.map(s => (
            <div key={s.skill} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 13, color: V.text, minWidth: 120 }}>{({ listening: '🎧 Listening', reading: '📖 Reading', writing: '✍️ Writing', speaking: '🗣️ Speaking', grammar: '📝 Grammar', vocab: '🃏 Vocabulary' })[s.skill] || s.skill}</div>
              <div style={{ flex: 1, background: V.bg3, borderRadius: 3, height: 6, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${s.avg_score}%`, background: s.isWeak ? V.red : V.green, borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 11, color: V.text3, minWidth: 30, textAlign: 'right', fontFamily: 'monospace' }}>{s.avg_score}%</div>
            </div>
          ))}
        </Card>

        <Card V={V}>
          <CardTitle V={V}>⚠️ Focus Areas</CardTitle>
          {weak.filter(s => s.isWeak).map(s => (
            <div key={s.skill} style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 8, padding: 10, marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: V.red, marginBottom: 4, textTransform: 'capitalize' }}>{s.skill} · {s.avg_score}%</div>
              <div style={{ fontSize: 11, color: V.text2 }}>{s.recommendation}</div>
            </div>
          ))}
          {weak.filter(s => s.isWeak).length === 0 && <div style={{ fontSize: 13, color: V.green }}>🎉 All skills above 65%! Keep it up.</div>}
        </Card>
      </div>

      <Card V={V}>
        <CardTitle V={V}>B2 Milestone Timeline</CardTitle>
        {[['✅ Apr 2026', 'A1 Foundation (in progress)', true], ['Sep 2026', 'A2 Everyday Conversations', false], ['Mar 2027', 'B1 Independent Proficiency', false], ['🎯 Dec 2027', 'B2 TEF/TCF Exam Ready', false]].map(([date, label, done]) => (
          <div key={date} style={{ display: 'flex', gap: 12, marginBottom: 14, paddingLeft: 20, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 4, width: 10, height: 10, borderRadius: '50%', background: done ? V.green : V.bg3, border: `2px solid ${done ? V.green : V.border}` }} />
            <div><div style={{ fontSize: 11, color: V.text3, fontFamily: 'monospace' }}>{date}</div><div style={{ fontSize: 13, color: V.text, fontWeight: 500 }}>{label}</div></div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── Planner ───────────────────────────────────────────────────────────────────
function Planner({ V }) {
  const [tasks, setTasks] = useState([]);
  const isMobile = useIsMobile();

  useEffect(() => { api('/planner').then(setTasks).catch(() => {}); }, []);

  async function markDone(id) {
    await api(`/planner/${id}/done`, { method: 'PATCH' });
    setTasks(t => t.map(task => task.id === id ? { ...task, is_done: 1 } : task));
  }

  const COLORS = { vocab: ['rgba(45,212,191,0.12)', '#2dd4bf'], grammar: ['rgba(108,99,255,0.12)', '#6c63ff'], listen: ['rgba(251,191,36,0.12)', '#fbbf24'], write: ['rgba(244,114,182,0.12)', '#f472b6'], speak: ['rgba(248,113,113,0.12)', '#f87171'], read: ['rgba(96,165,250,0.12)', '#60a5fa'] };
  const LABELS = { vocab: 'Vocabulary', grammar: 'Grammar', listen: 'Listening', write: 'Writing', speak: 'Speaking', read: 'Reading' };

  function exportICS() { window.open('/api/calendar/export.ics', '_blank'); }

  return (
    <div style={{ padding: isMobile ? '16px' : '28px 32px' }}>
      <PageHeader title="Daily Study Planner" sub="Personalized for your schedule · Export to Google Calendar" V={V} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: V.text2 }}>This week's tasks</div>
        <Btn small onClick={exportICS} V={V}>📅 Export to Calendar</Btn>
      </div>

      {tasks.length === 0 ? (
        <Card V={V}><div style={{ textAlign: 'center', color: V.text2, fontSize: 14, padding: 20 }}>No tasks yet - they\'ll appear here based on your study schedule.</div></Card>
      ) : tasks.map(t => (
        <div key={t.id} style={{ background: V.surface, border: `1px solid ${t.is_done ? V.green + '44' : V.border}`, borderRadius: 10, padding: '12px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14, opacity: t.is_done ? 0.6 : 1 }}>
          <span style={{ fontSize: 20 }}>{({ vocab: '🃏', grammar: '📝', listen: '🎧', write: '✍️', speak: '🎙️', read: '📖' })[t.task_type] || '📚'}</span>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 12, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: (COLORS[t.task_type] || ['rgba(108,99,255,0.12)','#6c63ff'])[0], color: (COLORS[t.task_type] || ['','#6c63ff'])[1] }}>{LABELS[t.task_type] || t.task_type}</span>
            <span style={{ fontSize: 12, color: V.text3, marginLeft: 8 }}>{t.scheduled_time || ''} · {t.duration_min} min</span>
            {t.notes && <div style={{ fontSize: 11, color: V.text3, marginTop: 2 }}>{t.notes}</div>}
          </div>
          {!t.is_done && <Btn small onClick={() => markDone(t.id)} V={V}>✓ Done</Btn>}
          {t.is_done && <span style={{ fontSize: 12, color: V.green }}>✓ Done</span>}
        </div>
      ))}

      <Card V={V} style={{ marginTop: 8 }}>
        <CardTitle V={V}>Your Fixed Schedule</CardTitle>
        <div style={{ fontSize: 13, color: V.text2, lineHeight: 1.9 }}>
          🕛 <strong>Monday 11:30pm</strong> - Tutor session<br/>
          📱 <strong>Tuesday & Friday</strong> - Busuu listening practice<br/>
          🥗 <strong>Weekdays at lunch</strong> - Vocabulary flashcards in app (15 min)<br/>
          📓 <strong>Saturday morning</strong> - Workbook + writing practice<br/>
          💪 <strong>Gym days</strong> - French podcast in earbuds
        </div>
      </Card>
    </div>
  );
}
