import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { ArrowLeft, ArrowRight, Download } from 'lucide-react'
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';
import ResumeCompletion from './ResumeCompletion';
import AiPanel from './AiPanel';
import ResumeUploadAndJobs from './ResumeUploadAndJobs';

const STEPS = [
  { id: 1, label: 'Info'       },
  { id: 2, label: 'Summary'    },
  { id: 3, label: 'Experience' },
  { id: 4, label: 'Education'  },
  { id: 5, label: 'Skills'     },
  { id: 6, label: 'AI Tools'   },
  { id: 7, label: 'Jobs'       },
]

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const [enableNext, setEnableNext] = useState(true)
  const { resumeId } = useParams()

  const goNext = () => setActiveFormIndex(i => i + 1)
  const goPrev = () => setActiveFormIndex(i => i - 1)
  const isLastStep = activeFormIndex === STEPS.length

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── Shared form component styles ─────────────────────────────── */

        .form-section-card {
          background: white;
          border-radius: 12px;
          padding: 1.4rem 1.5rem 1.2rem;
          border-top: 3px solid var(--primary, #2a6ef5);
          box-shadow: 0 2px 12px rgba(0,0,0,0.06);
          margin-top: 1.2rem;
        }

        .form-section-title {
          font-size: 1rem;
          font-weight: 700;
          color: #111;
          letter-spacing: -0.01em;
          margin: 0 0 3px;
        }

        .form-section-subtitle {
          font-size: 0.78rem;
          color: #9ca3af;
          margin: 0 0 0.2rem;
          font-weight: 400;
        }

        .form-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #4b5563;
          letter-spacing: 0.02em;
          margin-bottom: 4px;
        }

        .form-input {
          font-size: 0.85rem;
        }

        .form-error {
          font-size: 0.72rem;
          color: #f87171;
          margin-top: 2px;
        }

        .form-entry-card {
          border: 1px solid #f0ede8;
          border-radius: 10px;
          padding: 1rem 1.1rem;
          margin-top: 0.9rem;
          background: #fdfcfb;
        }

        .form-entry-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #f0ede8;
        }

        .form-entry-index {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #d1c9be;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        .form-empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1rem;
          text-align: center;
          border: 2px dashed #e5e1da;
          border-radius: 10px;
          margin-top: 1rem;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          margin-top: 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid #f5f3ef;
        }

        .form-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 1.1rem;
          padding-top: 0.9rem;
          border-top: 1px solid #f5f3ef;
        }

        /* Green saved state for buttons */
        .btn-saved {
          background-color: #22c55e !important;
          color: white !important;
        }
        .btn-saved:hover {
          background-color: #16a34a !important;
        }

        /* ── Step progress ─────────────────────────────────────────────── */

        .step-dot {
          width: 26px; height: 26px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.68rem; font-weight: 700;
          border: 2px solid #e5e7eb;
          background: white; color: #c4c4c4;
          transition: all 0.22s ease;
          flex-shrink: 0; cursor: pointer;
        }
        .step-dot:hover { border-color: #9ca3af; }
        .step-dot.active  { background: #111; border-color: #111; color: white; }
        .step-dot.done    { background: #22c55e; border-color: #22c55e; color: white; }

        .step-line {
          flex: 1; height: 2px; background: #e5e7eb; margin: 0 3px;
          transition: background 0.3s ease;
        }
        .step-line.done { background: #22c55e; }

        /* ── Nav buttons ───────────────────────────────────────────────── */

        .nav-btn {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 0.78rem; font-weight: 600;
          padding: 0.48rem 1.1rem; border-radius: 100px;
          border: none; cursor: pointer;
          transition: all 0.18s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .nav-btn.primary { background: #111; color: white; }
        .nav-btn.primary:hover { background: #2a6ef5; }
        .nav-btn.primary:disabled { background: #d1d5db; cursor: not-allowed; }
        .nav-btn.secondary {
          background: transparent; color: #6b7280;
          border: 1px solid #e5e7eb;
        }
        .nav-btn.secondary:hover { border-color: #111; color: #111; }
        .nav-btn.finish {
          background: linear-gradient(135deg, #2a6ef5, #7b4ff5);
          color: white;
        }
        .nav-btn.finish:hover { opacity: 0.88; transform: scale(1.02); }
      `}</style>

      {/* Toolbar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.65rem 1.1rem',
        borderBottom: '1px solid #f0ede8',
        background: 'white', position: 'sticky', top: 0, zIndex: 10
      }}>
        <ThemeColor />
        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#c4bdb4', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {activeFormIndex} / {STEPS.length}
        </span>
      </div>

      {/* Step bar */}
      <div style={{ padding: '0.9rem 1.1rem 0.7rem', background: 'white', borderBottom: '1px solid #f5f3ef' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {STEPS.map((step, i) => (
            <React.Fragment key={step.id}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <button
                  onClick={() => setActiveFormIndex(step.id)}
                  className={`step-dot ${activeFormIndex === step.id ? 'active' : activeFormIndex > step.id ? 'done' : ''}`}
                >
                  {activeFormIndex > step.id ? '✓' : step.id}
                </button>
                <span style={{ fontSize: '0.6rem', fontWeight: 600, color: activeFormIndex === step.id ? '#111' : '#bbb', display: 'none', letterSpacing: '0.04em' }}
                  className="sm:block"
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`step-line ${activeFormIndex > step.id ? 'done' : ''}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Completion */}
      <div style={{ padding: '0.9rem 1.1rem 0', background: '#faf8f3' }}>
        <ResumeCompletion />
      </div>

      {/* Form content */}
      <div style={{ padding: '0 1.1rem 1.2rem', background: '#faf8f3' }}>
        {activeFormIndex === 1 ? <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
          : activeFormIndex === 2 ? <Summery      enabledNext={(v) => setEnableNext(v)} />
          : activeFormIndex === 3 ? <Experience />
          : activeFormIndex === 4 ? <Education />
          : activeFormIndex === 5 ? <Skills />
          : activeFormIndex === 6 ? <AiPanel />
          : activeFormIndex === 7 ? <ResumeUploadAndJobs />
          : null}
      </div>

      {/* Nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.7rem 1.1rem',
        background: 'white', borderTop: '1px solid #f0ede8',
        position: 'sticky', bottom: 0
      }}>
        <button
          className="nav-btn secondary"
          onClick={goPrev}
          style={{ visibility: activeFormIndex > 1 ? 'visible' : 'hidden' }}
        >
          <ArrowLeft size={13} /> Back
        </button>

        {isLastStep ? (
          <Link to={'/my-resume/' + resumeId + '/view'}>
            <button className="nav-btn finish" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Download size={13} /> Download
            </button>
          </Link>
        ) : (
          <button
            className="nav-btn primary"
            disabled={!enableNext}
            onClick={goNext}
          >
            Next <ArrowRight size={13} />
          </button>
        )}
      </div>
    </div>
  )
}

export default FormSection