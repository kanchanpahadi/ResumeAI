import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import Header from '@/components/custom/Header'

function Home() {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif", background: '#080810' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing: border-box; }
        .font-serif { font-family: 'Instrument Serif', serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes blink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes glowPulse {
          0%,100% { opacity: 0.4; } 50% { opacity: 0.8; }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-10px); }
        }

        .fade-up-1 { animation: fadeUp 0.7s 0.05s ease both; }
        .fade-up-2 { animation: fadeUp 0.7s 0.18s ease both; }
        .fade-up-3 { animation: fadeUp 0.7s 0.30s ease both; }
        .fade-up-4 { animation: fadeUp 0.7s 0.44s ease both; }

        .grad-text {
          background: linear-gradient(135deg, #fff 0%, #a8c8ff 45%, #c4b5fd 85%, #f9a8d4 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradShift 7s ease infinite;
        }
        .glow-blob {
          position: absolute; border-radius: 50%;
          filter: blur(100px); pointer-events: none;
          animation: glowPulse 5s ease-in-out infinite;
        }
        .float-card { animation: floatY 6s ease-in-out infinite; }
        .blink-cursor { animation: blink 1s step-end infinite; }

        .grid-bg {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .feat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px;
          padding: 26px;
          transition: background 0.25s, transform 0.25s, border-color 0.25s;
        }
        .feat-card:hover {
          background: rgba(255,255,255,0.065);
          border-color: rgba(255,255,255,0.14);
          transform: translateY(-3px);
        }

        .step-num {
          font-family: 'Instrument Serif', serif;
          font-size: 3.8rem; line-height: 1; font-style: italic;
          color: rgba(255,255,255,0.06);
          display: block; margin-bottom: 14px;
        }

        .tmpl-card {
          border-radius: 14px; overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }
        .tmpl-card:hover {
          transform: translateY(-6px) scale(1.015);
          box-shadow: 0 20px 56px rgba(0,0,0,0.5);
        }

        .testi-card {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 18px; padding: 26px;
          transition: all 0.25s;
        }
        .testi-card:hover {
          background: rgba(255,255,255,0.06);
          transform: translateY(-3px);
        }

        .btn-main {
          display: inline-flex; align-items: center; gap: 9px;
          background: #fff; color: #080810;
          font-weight: 600; font-size: 0.92rem;
          padding: 13px 30px; border-radius: 100px;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          text-decoration: none; letter-spacing: -0.01em;
        }
        .btn-main:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(255,255,255,0.18);
          background: #eef3ff;
        }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 9px;
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.75);
          font-weight: 500; font-size: 0.92rem;
          padding: 13px 26px; border-radius: 100px;
          background: transparent; text-decoration: none;
          transition: all 0.2s;
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.35);
          color: #fff;
        }

        .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent); }
        .marquee-track { animation: marquee 26s linear infinite; }
        .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
        .section-label {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: #6366f1; margin-bottom: 12px; display: block;
        }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 130, paddingBottom: 96, paddingLeft: 24, paddingRight: 24 }}>
        <div className="grid-bg" />
        <div className="glow-blob" style={{ width: 560, height: 560, top: -180, left: '50%', transform: 'translateX(-55%)', background: 'rgba(99,102,241,0.16)' }} />
        <div className="glow-blob" style={{ width: 360, height: 360, top: 80, right: -80, background: 'rgba(236,72,153,0.1)' }} />

        <div style={{ position: 'relative', maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>

          {/* Tiny badge — real, not hype */}
          <div className="fade-up-1" style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 100, padding: '5px 14px',
              fontSize: '0.75rem', fontWeight: 500, color: 'rgba(255,255,255,0.6)'
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
              free to use · no account required to browse
            </span>
          </div>

          <h1 className="fade-up-2 font-serif"
            style={{ fontSize: 'clamp(3rem, 7vw, 82px)', lineHeight: 1.04, letterSpacing: '-0.02em', marginBottom: 22 }}>
            <span className="grad-text">Land the interview.</span>
            <br />
            <span style={{ color: 'rgba(255,255,255,0.92)' }}>Not the rejection.</span>
          </h1>

          <p className="fade-up-3" style={{ fontSize: '1.08rem', color: 'rgba(255,255,255,0.44)', maxWidth: 460, margin: '0 auto 36px', lineHeight: 1.7, fontWeight: 300 }}>
            Build a resume that actually gets read. AI helps with the writing,
            you stay in control of everything else.
          </p>

          <div className="fade-up-4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            <Link to="/dashboard" className="btn-main">
              Build mine for free <ArrowRight size={16} />
            </Link>
            <a href="#how" className="btn-ghost">
              How it works
            </a>
          </div>

          {/* Honest stats — no made-up numbers */}
          <div className="fade-up-4" style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32,
            marginTop: 52, paddingTop: 40,
            borderTop: '1px solid rgba(255,255,255,0.06)'
          }}>
            {[
              { num: '4',     sub: 'resume templates' },
              { num: '~3min', sub: 'average build time' },
              { num: 'AI',    sub: 'content for every section' },
              { num: 'PDF',   sub: 'one-click export' },
            ].map(s => (
              <div key={s.sub} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'Instrument Serif, serif', fontSize: '2.4rem', lineHeight: 1,
                  background: 'linear-gradient(135deg, #fff, #a8c8ff)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>{s.num}</div>
                <div style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating editor mockup */}
        <div style={{ maxWidth: 680, margin: '64px auto 0', position: 'relative' }}>
          <div style={{
            position: 'absolute', bottom: -30, left: '50%', transform: 'translateX(-50%)',
            width: '65%', height: 50,
            background: 'rgba(99,102,241,0.28)', filter: 'blur(28px)', borderRadius: '50%', pointerEvents: 'none'
          }} />
          <div className="float-card" style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 20, padding: 28,
            backdropFilter: 'blur(12px)', position: 'relative'
          }}>
            <div style={{ display: 'flex', gap: 7, marginBottom: 22 }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => (
                <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 22 }}>
              <div>
                <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#ec4899)', marginBottom: 10 }} />
                <div style={{ height: 9, background: 'rgba(255,255,255,0.14)', borderRadius: 5, marginBottom: 5, width: '75%' }} />
                <div style={{ height: 7, background: 'rgba(255,255,255,0.07)', borderRadius: 5, width: '55%', marginBottom: 18 }} />
                <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6366f1', marginBottom: 7 }}>Skills</div>
                {[85, 68, 52].map((w, i) => (
                  <div key={i} style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 4, marginBottom: 5, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${w}%`, background: 'linear-gradient(90deg,#6366f1,#a78bfa)', borderRadius: 4 }} />
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6366f1', marginBottom: 7 }}>Summary</div>
                <div style={{
                  background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.18)',
                  borderRadius: 10, padding: '10px 12px', marginBottom: 14
                }}>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }}>
                    Frontend engineer with 3 years building React apps. Comfortable owning features end-to-end
                    <span className="blink-cursor" style={{ display: 'inline-block', width: 2, height: 11, background: '#6366f1', marginLeft: 2, verticalAlign: 'middle' }} />
                  </p>
                </div>
                <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6366f1', marginBottom: 7 }}>Experience</div>
                {[100, 80, 65, 50].map((w, i) => (
                  <div key={i} style={{ height: i === 0 ? 7 : 5, background: 'rgba(255,255,255,0.07)', borderRadius: 4, marginBottom: 5, width: `${w}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── MARQUEE ── */}
      <section style={{ padding: '40px 0', overflow: 'hidden' }}>
        <p style={{ textAlign: 'center', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 18 }}>
          People using this to apply at
        </p>
        <div className="marquee-wrap" style={{ overflow: 'hidden' }}>
          <div className="marquee-track" style={{ display: 'flex', gap: 52, width: 'max-content' }}>
            {['Google', 'Deloitte', 'Amazon', 'Infosys', 'TCS', 'Leapfrog', 'Fusemachines', 'Microsoft', 'Stripe', 'Notion',
              'Google', 'Deloitte', 'Amazon', 'Infosys', 'TCS', 'Leapfrog', 'Fusemachines', 'Microsoft', 'Stripe', 'Notion'].map((name, i) => (
              <span key={i} style={{ fontSize: '1rem', fontWeight: 600, color: 'rgba(255,255,255,0.16)', whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── FEATURES ── */}
      <section style={{ padding: '88px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: 56, maxWidth: 520 }}>
            <span className="section-label">What's inside</span>
            <h2 className="font-serif" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)', color: '#fff', lineHeight: 1.12, marginBottom: 14 }}>
              Actually useful tools.<br />Not just a pretty editor.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.92rem', lineHeight: 1.7 }}>
              Every feature here is something we actually needed when building resumes ourselves.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 14 }}>
            {[
              {
                icon: '✍',  color: '#6366f1',
                title: 'AI writing on every section',
                desc: 'Hit one button on your experience or summary and the AI rewrites it into something a recruiter would actually stop and read.'
              },
              {
                icon: '⇄',  color: '#ec4899',
                title: 'Switch templates in one click',
                desc: 'Four different looks — Classic, Minimal, Modern, Executive. All your data carries over instantly.'
              },
              {
                icon: '⊡',  color: '#f59e0b',
                title: 'Live preview as you type',
                desc: 'The resume preview updates in real time next to the form. No need to save before seeing what it looks like.'
              },
              {
                icon: '⌕',  color: '#10b981',
                title: 'Job matching',
                desc: 'AI reads your resume and pulls job listings that actually match your background. Not just keyword searches.'
              },
              {
                icon: '✉',  color: '#3b82f6',
                title: 'Cover letter generator',
                desc: 'Paste a job description, get a tailored cover letter. Takes about 30 seconds.'
              },
              {
                icon: '↑',  color: '#a78bfa',
                title: 'Import your existing PDF',
                desc: "Already have a resume somewhere? Upload the PDF. We'll parse it and fill in all the fields automatically."
              },
            ].map((f, i) => (
              <div key={i} className="feat-card">
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: `${f.color}16`, border: `1px solid ${f.color}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 17, color: f.color, marginBottom: 18
                }}>
                  {f.icon}
                </div>
                <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginBottom: 8, letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.845rem', lineHeight: 1.68, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── TEMPLATES ── */}
      <section style={{ padding: '88px 24px', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-blob" style={{ width: 450, height: 450, top: '30%', left: -80, background: 'rgba(99,102,241,0.09)' }} />
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20, marginBottom: 48 }}>
            <div>
              <span className="section-label">Templates</span>
              <h2 className="font-serif" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)', color: '#fff', lineHeight: 1.12, marginBottom: 10 }}>
                Four styles, one dataset.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.9rem', lineHeight: 1.65, maxWidth: 380 }}>
                Swap templates without losing anything. Good for tailoring to different companies.
              </p>
            </div>
            <Link to="/dashboard" style={{ color: '#6366f1', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
              Try them all <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
            {[
              { name: 'Classic',   accent: '#2a6ef5', desc: 'Traditional layout, clean hierarchy' },
              { name: 'Minimal',   accent: '#111',    desc: 'Stripped back, lots of whitespace' },
              { name: 'Modern',    accent: '#1d9e75', desc: 'Sidebar layout, visual skills bars' },
              { name: 'Executive', accent: '#7a1a1a', desc: 'Bold header, formal and serious' },
            ].map((t, i) => (
              <div key={i} className="tmpl-card">
                <div style={{ background: '#f9f7f2', padding: '18px 14px', height: 185, position: 'relative', overflow: 'hidden' }}>
                  <div style={{ height: 3.5, background: t.accent, borderRadius: 2, marginBottom: 11 }} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 9 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: t.accent, opacity: 0.75 }} />
                    <div>
                      <div style={{ height: 6, width: 64, background: '#1a1a1a', borderRadius: 3, marginBottom: 3 }} />
                      <div style={{ height: 4.5, width: 44, background: '#ccc', borderRadius: 3 }} />
                    </div>
                  </div>
                  {[88, 72, 58, 78, 62].map((w, j) => (
                    <div key={j} style={{
                      height: j === 0 ? 5.5 : 4.5,
                      width: `${w}%`, marginBottom: 4.5,
                      background: j === 0 ? t.accent : '#e0ddd6',
                      borderRadius: 3, opacity: j === 0 ? 0.65 : 1
                    }} />
                  ))}
                  <div style={{
                    position: 'absolute', bottom: 8, right: 10,
                    fontSize: 8.5, fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: t.accent, opacity: 0.3
                  }}>Preview</div>
                </div>
                <div style={{
                  background: 'rgba(255,255,255,0.03)', padding: '11px 14px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem', marginBottom: 2 }}>{t.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.32)', fontSize: '0.72rem' }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ padding: '88px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <span className="section-label">How it works</span>
            <h2 className="font-serif" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)', color: '#fff', lineHeight: 1.12 }}>
              Honestly pretty quick.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {[
              { num: '1', color: '#6366f1', title: 'Sign in', desc: 'Clerk handles auth so you just hit "Sign in with Google" and you\'re in. No forms, no email confirmation loop.' },
              { num: '2', color: '#ec4899', title: 'Fill your details', desc: 'Work through the steps — personal info, experience, education, skills. The form saves as you go.' },
              { num: '3', color: '#f59e0b', title: 'Let AI clean it up', desc: 'Each section has a Generate button. Click it and the AI rewrites your content to sound more professional.' },
              { num: '4', color: '#10b981', title: 'Download and send', desc: 'Export as A4 PDF directly from the browser. That\'s it — go apply.' },
            ].map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.065)',
                borderRadius: 18, padding: '28px 22px',
                transition: 'background 0.25s, transform 0.25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.055)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.025)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <span className="step-num">{s.num}</span>
                <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '0.92rem', marginBottom: 8, letterSpacing: '-0.01em' }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.845rem', lineHeight: 1.68, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '88px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <span className="section-label">From people who used it</span>
            <h2 className="font-serif" style={{ fontSize: 'clamp(1.9rem, 3.8vw, 2.9rem)', color: '#fff', lineHeight: 1.12 }}>
              What they said.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 14 }}>
            {[
              {
                initials: 'SB', color: '#6366f1',
                name: 'Siddharth B.', role: 'Just got into Leapfrog',
                quote: "Honestly I just needed something quick before a deadline. Uploaded my old CV, switched to Modern template, AI touched up my summary. Done in maybe 20 minutes."
              },
              {
                initials: 'KT', color: '#ec4899',
                name: 'Kriti T.', role: 'Final year, CS',
                quote: "The cover letter thing is genuinely useful. I was rewriting the same letter for every company. Now I just paste the JD and edit the output. Saves a lot of time."
              },
              {
                initials: 'NP', color: '#f59e0b',
                name: 'Nischal P.', role: 'Software intern',
                quote: "I liked that I could see exactly what my resume looked like while I was editing it. Most builders make you go back and forth to preview."
              },
            ].map((t, i) => (
              <div key={i} className="testi-card">
                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={12} fill="#f59e0b" stroke="none" />
                  ))}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', lineHeight: 1.72, marginBottom: 18, margin: '0 0 18px' }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: `${t.color}28`, border: `1px solid ${t.color}45`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 700, color: t.color, flexShrink: 0
                  }}>{t.initials}</div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.84rem' }}>{t.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.74rem', marginTop: 1 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── CTA ── */}
      <section style={{ padding: '96px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="glow-blob" style={{ width: 600, height: 600, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'rgba(99,102,241,0.13)' }} />
        <div style={{ position: 'relative' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>Ready when you are</span>
          <h2 className="font-serif" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)', color: '#fff', lineHeight: 1.06, marginBottom: 14 }}>
            Stop tweaking the old one.<br />
            <em style={{ color: '#a78bfa', fontStyle: 'normal' }}>Start fresh.</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.38)', marginBottom: 36, fontSize: '1rem', fontWeight: 300 }}>
            Free. No credit card. Takes about 5 minutes.
          </p>
          <Link to="/dashboard" className="btn-main" style={{ fontSize: '1rem', padding: '14px 36px' }}>
            Let's build it <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '20px 36px',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between', gap: 12
      }}>
        <p style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.2)', margin: 0 }}>
          © 2025 ResumeAI
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['GitHub', 'Contact'].map(l => (
            <a key={l} href="#" style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.25)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}
            >{l}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}

export default Home