// LESSON VIEWER — paste this into src/App.jsx replacing the existing "Lessons" function

function Lessons({ V }) {
  const [lessons, setLessons] = React.useState([]);
  const [filter, setFilter] = React.useState('ALL');
  const [openLesson, setOpenLesson] = React.useState(null);
  const [lessonData, setLessonData] = React.useState(null);
  const [tab, setTab] = React.useState('learn');
  const [exIdx, setExIdx] = React.useState(0);
  const [chosen, setChosen] = React.useState(null);
  const [exResult, setExResult] = React.useState(null);
  const [quizIdx, setQuizIdx] = React.useState(0);
  const [quizChosen, setQuizChosen] = React.useState(null);
  const [quizScore, setQuizScore] = React.useState(0);
  const [quizDone, setQuizDone] = React.useState(false);
  const [translateInput, setTranslateInput] = React.useState('');

  React.useEffect(() => {
    api('/lessons').then(setLessons).catch(() => {});
  }, []);

  async function openLes(id) {
    const data = await api(`/lessons/${id}`);
    setLessonData(data);
    setOpenLesson(id);
    setTab('learn');
    setExIdx(0); setChosen(null); setExResult(null);
    setQuizIdx(0); setQuizChosen(null); setQuizScore(0); setQuizDone(false);
    window.scrollTo(0, 0);
  }

  async function complete() {
    await api(`/lessons/${openLesson}/complete`, { method: 'POST', body: JSON.stringify({ score: Math.round((quizScore / content.quiz.length) * 100) }) });
    api('/lessons').then(setLessons);
    alert('🎉 Lesson complete! XP earned.');
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

  const content = lessonData?.content ? (typeof lessonData.content === 'string' ? JSON.parse(lessonData.content) : lessonData.content) : null;

  // ── Exercise logic ────────────────────────────────────────────────────────
  function checkAnswer(idx) {
    if (chosen !== null) return;
    setChosen(idx);
    const ex = content.exercises[exIdx];
    setExResult(idx === ex.correct);
  }

  function checkTranslate() {
    const ex = content.exercises[exIdx];
    const norm = s => s.toLowerCase().replace(/['']/g, "'").trim();
    const correct = norm(translateInput) === norm(ex.answer) ||
      (ex.alternatives || []).some(a => norm(translateInput) === norm(a));
    setChosen(0);
    setExResult(correct);
  }

  function nextEx() {
    if (exIdx + 1 >= content.exercises.length) {
      setTab('quiz');
    } else {
      setExIdx(e => e + 1);
      setChosen(null); setExResult(null); setTranslateInput('');
    }
  }

  // ── Quiz logic ────────────────────────────────────────────────────────────
  function answerQuiz(idx) {
    if (quizChosen !== null) return;
    setQuizChosen(idx);
    if (idx === content.quiz[quizIdx].correct) setQuizScore(s => s + 1);
  }

  function nextQuiz() {
    if (quizIdx + 1 >= content.quiz.length) {
      setQuizDone(true);
    } else {
      setQuizIdx(q => q + 1);
      setQuizChosen(null);
    }
  }

  const passed = quizDone && (quizScore / content?.quiz?.length) >= 0.6;

  // ── RENDER ────────────────────────────────────────────────────────────────
  if (openLesson && lessonData && content) {
    return (
      <div style={{ padding: '24px 32px' }}>
        {/* Back button */}
        <button onClick={() => { setOpenLesson(null); setLessonData(null); }} style={{ background: 'none', border: `1px solid ${V.border}`, borderRadius: 8, padding: '7px 14px', color: V.text2, cursor: 'pointer', fontSize: 13, marginBottom: 20, fontFamily: 'inherit' }}>← Back to Lessons</button>

        {/* Lesson header */}
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, background: `${LEVEL_COLOR[lessonData.level]}22`, color: LEVEL_COLOR[lessonData.level], letterSpacing: '1px' }}>{lessonData.level}</span>
          <div style={{ fontSize: 26, fontWeight: 700, color: V.text, fontFamily: 'Georgia, serif', marginTop: 8 }}>{lessonData.title}</div>
          <div style={{ fontSize: 14, color: V.text2, marginTop: 4 }}>{lessonData.description}</div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 3, background: V.bg3, borderRadius: 8, padding: 3, marginBottom: 24, width: 'fit-content' }}>
          {[['learn', '📖 Learn'], ['exercises', '✏️ Exercises'], ['quiz', '🎯 Quiz']].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ padding: '8px 18px', borderRadius: 6, fontSize: 13, cursor: 'pointer', border: 'none', background: tab === id ? V.surface : 'transparent', color: tab === id ? V.text : V.text2, fontWeight: tab === id ? 500 : 400, fontFamily: 'inherit' }}>{label}</button>
          ))}
        </div>

        {/* ── LEARN TAB ─────────────────────────────────────────────────── */}
        {tab === 'learn' && (
          <div>
            {/* Intro */}
            <div style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 12, padding: 20, marginBottom: 16, borderLeft: `3px solid ${V.accent}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: V.accent, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>Introduction</div>
              <div style={{ fontSize: 14, color: V.text2, lineHeight: 1.8 }}>{content.intro}</div>
            </div>

            {/* Sections */}
            {content.sections?.map((sec, si) => (
              <div key={si} style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: V.text3, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 14 }}>{sec.type === 'vocabulary' ? '🗂 Vocabulary' : sec.type === 'grammar' ? '📐 Grammar Rule' : sec.type === 'dialogue' ? '💬 Dialogue' : sec.type === 'tips' ? '💡 Tips' : sec.type === 'pronunciation' ? '🔊 Pronunciation' : '📌 Section'}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: V.text, marginBottom: 12 }}>{sec.title}</div>

                {/* Explanation box */}
                {sec.explanation && <div style={{ background: V.bg3, borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 13, color: V.text2, lineHeight: 1.7 }}>{sec.explanation}</div>}

                {/* Grammar rules */}
                {sec.rules?.map((r, ri) => (
                  <div key={ri} style={{ borderBottom: `0.5px solid ${V.border}`, paddingBottom: 14, marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                      <div style={{ minWidth: 180, fontSize: 13, fontWeight: 600, color: V.accent }}>{r.rule}</div>
                      <div style={{ flex: 1 }}>
                        {r.example && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                            <span style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: V.text }}>{r.example}</span>
                            <button onClick={() => speak(r.example)} style={{ background: V.bg3, border: 'none', borderRadius: 4, padding: '2px 7px', fontSize: 11, cursor: 'pointer', color: V.text2, fontFamily: 'inherit' }}>▶ Listen</button>
                          </div>
                        )}
                        {r.translation && <div style={{ fontSize: 12, color: V.text3, fontStyle: 'italic', marginBottom: 4 }}>{r.translation}</div>}
                        {r.breakdown && <div style={{ fontSize: 12, color: V.text2, background: V.bg3, borderRadius: 4, padding: '4px 8px', display: 'inline-block' }}>{r.breakdown}</div>}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Vocabulary items */}
                {sec.items?.map((item, ii) => (
                  <div key={ii} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10, alignItems: 'center', borderBottom: `0.5px solid ${V.border}`, padding: '10px 0' }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, color: V.text, fontFamily: 'Georgia, serif' }}>{item.fr}</div>
                      {item.pron && <div style={{ fontSize: 11, color: V.text3, fontStyle: 'italic', marginTop: 2 }}>/{item.pron}/</div>}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, color: V.text2 }}>{item.en}</div>
                      {item.note && <div style={{ fontSize: 11, color: V.text3, marginTop: 2 }}>{item.note}</div>}
                    </div>
                    <button onClick={() => speak(item.fr.split('/')[0].split('→')[0].trim())} style={{ background: V.bg3, border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, cursor: 'pointer', color: V.text2, fontFamily: 'inherit', whiteSpace: 'nowrap' }}>▶ Play</button>
                  </div>
                ))}

                {/* Dialogue */}
                {sec.lines?.map((line, li) => (
                  <div key={li} style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
                    <div style={{ minWidth: 80, fontSize: 11, fontWeight: 700, color: V.accent, paddingTop: 3 }}>{line.speaker}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <div style={{ fontSize: 14, color: V.text, fontFamily: 'Georgia, serif', fontStyle: 'italic', flex: 1 }}>{line.fr}</div>
                        <button onClick={() => speak(line.fr)} style={{ background: V.bg3, border: 'none', borderRadius: 4, padding: '2px 7px', fontSize: 11, cursor: 'pointer', color: V.text2, fontFamily: 'inherit', flexShrink: 0 }}>▶</button>
                      </div>
                      <div style={{ fontSize: 12, color: V.text3, marginTop: 3 }}>{line.en}</div>
                    </div>
                  </div>
                ))}

                {/* Tips */}
                {sec.tips?.map((tip, ti) => (
                  <div key={ti} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: V.gold, fontSize: 14, flexShrink: 0 }}>★</span>
                    <div style={{ fontSize: 13, color: V.text2, lineHeight: 1.6 }}>{tip}</div>
                  </div>
                ))}

                {/* Pronunciation notes */}
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

        {/* ── EXERCISES TAB ─────────────────────────────────────────────── */}
        {tab === 'exercises' && content.exercises && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: V.text2 }}>Exercise {Math.min(exIdx + 1, content.exercises.length)} of {content.exercises.length}</div>
              <div style={{ fontSize: 13, color: V.text3 }}>{content.exercises[exIdx]?.type}</div>
            </div>

            {/* Progress bar */}
            <div style={{ height: 4, background: V.bg3, borderRadius: 2, marginBottom: 20, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${((exIdx) / content.exercises.length) * 100}%`, background: V.accent, borderRadius: 2, transition: 'width 0.4s' }} />
            </div>

            {(() => {
              const ex = content.exercises[exIdx];
              if (!ex) return null;
              return (
                <div style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 12, padding: 24 }}>
                  <div style={{ fontSize: 16, color: V.text, marginBottom: 20, lineHeight: 1.6, fontFamily: 'Georgia, serif' }}>{ex.question}</div>

                  {ex.type === 'translate' ? (
                    <div>
                      <textarea
                        value={translateInput}
                        onChange={e => setTranslateInput(e.target.value)}
                        placeholder="Type your French translation here..."
                        disabled={chosen !== null}
                        style={{ width: '100%', background: V.bg3, border: `1px solid ${V.border}`, borderRadius: 8, padding: 12, fontSize: 14, color: V.text, fontFamily: 'inherit', resize: 'vertical', minHeight: 80, boxSizing: 'border-box' }}
                      />
                      {chosen === null && (
                        <button onClick={checkTranslate} style={{ marginTop: 10, padding: '10px 20px', background: V.accent, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>Check Answer</button>
                      )}
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {ex.options.map((opt, i) => {
                        let bg = V.surface, color = V.text, border = V.border;
                        if (chosen !== null) {
                          if (i === ex.correct) { bg = 'rgba(74,222,128,0.1)'; color = V.green; border = V.green; }
                          else if (i === chosen && exResult === false) { bg = 'rgba(248,113,113,0.1)'; color = V.red; border = V.red; }
                        }
                        return (
                          <button key={i} onClick={() => checkAnswer(i)} style={{ padding: '12px 16px', background: bg, border: `1px solid ${border}`, borderRadius: 8, fontSize: 14, cursor: chosen !== null ? 'default' : 'pointer', textAlign: 'left', color, fontFamily: 'inherit', lineHeight: 1.4 }}>{opt}</button>
                        );
                      })}
                    </div>
                  )}

                  {/* Feedback */}
                  {chosen !== null && (
                    <div style={{ marginTop: 16 }}>
                      <div style={{ padding: 14, background: exResult ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)', borderRadius: 8, border: `1px solid ${exResult ? V.green + '44' : V.red + '44'}`, marginBottom: 12 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: exResult ? V.green : V.red, marginBottom: 6 }}>{exResult ? '✓ Correct!' : '✗ Not quite'}</div>
                        <div style={{ fontSize: 13, color: V.text2, lineHeight: 1.6 }}>{ex.explanation}</div>
                        {ex.type === 'translate' && !exResult && (
                          <div style={{ marginTop: 8, fontSize: 13, color: V.green }}>Correct: <em>{ex.answer}</em></div>
                        )}
                      </div>
                      <button onClick={nextEx} style={{ padding: '10px 20px', background: V.accent, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                        {exIdx + 1 >= content.exercises.length ? 'Go to Quiz →' : 'Next Exercise →'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ── QUIZ TAB ──────────────────────────────────────────────────── */}
        {tab === 'quiz' && content.quiz && (
          <div>
            {!quizDone ? (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ fontSize: 13, color: V.text2 }}>Question {quizIdx + 1} of {content.quiz.length}</div>
                  <div style={{ fontSize: 13, color: V.green }}>Score: {quizScore}/{quizIdx}</div>
                </div>
                <div style={{ height: 4, background: V.bg3, borderRadius: 2, marginBottom: 20, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${(quizIdx / content.quiz.length) * 100}%`, background: V.gold, borderRadius: 2 }} />
                </div>

                {(() => {
                  const q = content.quiz[quizIdx];
                  return (
                    <div style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 12, padding: 24 }}>
                      <div style={{ fontSize: 16, color: V.text, marginBottom: 20, lineHeight: 1.6, fontFamily: 'Georgia, serif' }}>{q.question}</div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        {q.options.map((opt, i) => {
                          let bg = V.surface, color = V.text, border = V.border;
                          if (quizChosen !== null) {
                            if (i === q.correct) { bg = 'rgba(74,222,128,0.1)'; color = V.green; border = V.green; }
                            else if (i === quizChosen) { bg = 'rgba(248,113,113,0.1)'; color = V.red; border = V.red; }
                          }
                          return (
                            <button key={i} onClick={() => answerQuiz(i)} style={{ padding: '12px 16px', background: bg, border: `1px solid ${border}`, borderRadius: 8, fontSize: 14, cursor: quizChosen !== null ? 'default' : 'pointer', textAlign: 'left', color, fontFamily: 'inherit' }}>{opt}</button>
                          );
                        })}
                      </div>
                      {quizChosen !== null && (
                        <div style={{ marginTop: 16 }}>
                          <div style={{ padding: 12, background: V.bg3, borderRadius: 8, fontSize: 13, color: V.text2, marginBottom: 12 }}>{q.explanation}</div>
                          <button onClick={nextQuiz} style={{ padding: '10px 20px', background: V.accent, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                            {quizIdx + 1 >= content.quiz.length ? 'See Results →' : 'Next Question →'}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            ) : (
              // Quiz results
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>{passed ? '🎉' : '📚'}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: V.text, marginBottom: 8 }}>
                  {quizScore} / {content.quiz.length} — {Math.round((quizScore / content.quiz.length) * 100)}%
                </div>
                <div style={{ fontSize: 15, color: V.text2, marginBottom: 24 }}>
                  {passed ? 'Excellent! You passed this lesson.' : 'You need 60% to pass. Review the lesson and try again.'}
                </div>
                {passed ? (
                  <button onClick={complete} style={{ padding: '14px 28px', background: V.green, color: '#0f0e17', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', marginRight: 12 }}>✓ Complete Lesson (+{lessonData.xp_reward} XP)</button>
                ) : (
                  <button onClick={() => { setQuizIdx(0); setQuizChosen(null); setQuizScore(0); setQuizDone(false); }} style={{ padding: '14px 28px', background: V.accent, color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Try Again</button>
                )}
                <button onClick={() => setTab('learn')} style={{ padding: '14px 28px', background: V.surface, color: V.text, border: `1px solid ${V.border}`, borderRadius: 10, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', marginLeft: 8 }}>Review Lesson</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // ── LESSON LIST ───────────────────────────────────────────────────────────
  return (
    <div style={{ padding: '28px 32px' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: V.text, fontFamily: 'Georgia, serif', marginBottom: 4 }}>All Lessons</div>
        <div style={{ fontSize: 13, color: V.text2 }}>{lessons.length} progressive lessons · A1 to B2 · Click any lesson to begin</div>
      </div>

      <div style={{ display: 'flex', gap: 3, background: V.bg3, borderRadius: 8, padding: 3, marginBottom: 24, width: 'fit-content' }}>
        {['ALL','A1','A2','B1','B2'].map(lvl => (
          <button key={lvl} onClick={() => setFilter(lvl)} style={{ padding: '7px 16px', borderRadius: 6, fontSize: 13, cursor: 'pointer', border: 'none', background: filter === lvl ? V.surface : 'transparent', color: filter === lvl ? V.text : V.text2, fontWeight: filter === lvl ? 500 : 400, fontFamily: 'inherit' }}>{lvl}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {filtered.map(l => (
          <div key={l.id} onClick={() => openLes(l.id)} style={{ background: V.surface, border: `1px solid ${V.border}`, borderRadius: 10, padding: 16, cursor: 'pointer', transition: 'border 0.15s', position: 'relative', overflow: 'hidden' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = V.accent}
            onMouseLeave={e => e.currentTarget.style.borderColor = V.border}>
            {l.status === 'completed' && <div style={{ position: 'absolute', top: 10, right: 10, background: V.green, color: '#0f0e17', width: 22, height: 22, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>✓</div>}
            <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8, padding: '2px 7px', borderRadius: 4, display: 'inline-block', background: `${LEVEL_COLOR[l.level]}22`, color: LEVEL_COLOR[l.level] }}>{l.level}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: V.text, marginBottom: 4, lineHeight: 1.3 }}>{l.title}</div>
            <div style={{ fontSize: 11, color: V.text3, lineHeight: 1.5, marginBottom: 10 }}>{l.description}</div>
            <div style={{ display: 'flex', gap: 12, fontSize: 10, color: V.text3 }}>
              <span>⏱ {l.duration_min} min</span>
              <span>⚡ {l.xp_reward} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
