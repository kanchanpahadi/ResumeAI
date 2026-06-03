import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useContext, useState, useEffect, useRef } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import MinimalTemplate from './templates/MinimalTemplate.jsx'
import ModernTemplate from './templates/ModernTemplate.jsx'
import ExecutiveTemplate from './templates/ExecutiveTemplate.jsx'
import GlobalApi from "../../../../service/GlobalApi.js";
import { useParams } from 'react-router-dom'

const TEMPLATES = [
  { id: 'classic',   label: 'Classic'   },
  { id: 'minimal',   label: 'Minimal'   },
  { id: 'modern',    label: 'Modern'    },
  { id: 'executive', label: 'Executive' },
]

// A4 dimensions at 96dpi
const A4_WIDTH  = 794
const A4_HEIGHT = 1123

function ClassicTemplate({ resumeInfo }) {
  const themeColor = resumeInfo?.themecolor || '#2a6ef5'
  return (
    <div className="relative bg-white h-full" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');
        .resume-preview-wrap {
          position: relative; background: #ffffff; min-height: 100%;
          overflow: hidden;
        }
        .resume-top-bar { height: 6px; width: 100%; }
        .resume-side-strip {
          position: absolute; top: 6px; left: 0; width: 3px; bottom: 0; opacity: 0.15;
        }
        .resume-body { padding: 2.8rem 2.8rem 2.8rem 3rem; }
        .resume-section {
          margin-top: 1.6rem; padding-top: 1.4rem; border-top: 1px solid #f2ede3;
        }
      `}</style>
      <div className="resume-preview-wrap">
        <div className="resume-top-bar" style={{ background: themeColor }} />
        <div className="resume-side-strip" style={{ background: themeColor }} />
        <div className="resume-body">
          <PersonalDetailPreview resumeInfo={resumeInfo} />
          <div className={resumeInfo?.Summary ? 'resume-section' : ''}>
            <SummeryPreview resumeInfo={resumeInfo} />
          </div>
          {resumeInfo?.Experience?.length > 0 && (
            <div className="resume-section"><ExperiencePreview resumeInfo={resumeInfo} /></div>
          )}
          {resumeInfo?.Education?.length > 0 && (
            <div className="resume-section"><EducationalPreview resumeInfo={resumeInfo} /></div>
          )}
          {resumeInfo?.Skills?.length > 0 && (
            <div className="resume-section"><SkillsPreview resumeInfo={resumeInfo} /></div>
          )}
        </div>
        <div className="absolute bottom-4 right-5 text-[9px] tracking-widest uppercase font-medium opacity-20"
          style={{ color: themeColor }}>ResumeAI</div>
      </div>
    </div>
  )
}

// Wrapper that enforces A4 size and scales to fit container
function A4Page({ children }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const update = () => {
      const containerWidth = el.parentElement?.clientWidth || A4_WIDTH
      setScale(Math.min(containerWidth / A4_WIDTH, 1))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el.parentElement || el)
    return () => ro.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @media print {
          .a4-scaler { transform: none !important; width: 100% !important; height: auto !important; }
          .a4-outer  { height: auto !important; overflow: visible !important; }
        }
      `}</style>
      {/* Outer div holds the scaled height so layout doesn't collapse */}
      <div
        className="a4-outer w-full overflow-hidden"
        style={{ height: A4_HEIGHT * scale }}
      >
        {/* Inner div is always A4 size, scaled down visually */}
        <div
          ref={containerRef}
          className="a4-scaler bg-white"
          style={{
            width:  A4_WIDTH,
            minHeight: A4_HEIGHT,
            transformOrigin: 'top left',
            transform: `scale(${scale})`,
          }}
        >
          {children}
        </div>
      </div>
    </>
  )
}

function ResumePreview() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { resumeId } = useParams()
  const [activeTemplate, setActiveTemplate] = useState('classic')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (resumeInfo?.template) {
      setActiveTemplate(resumeInfo.template)
    }
  }, [resumeInfo?.template])

  const switchTemplate = async (templateId) => {
    setActiveTemplate(templateId)
    setResumeInfo(prev => ({ ...prev, template: templateId }))
    if (resumeId) {
      setSaving(true)
      try {
        await GlobalApi.UpdateResumeDetail(resumeId, { data: { template: templateId } })
      } catch (e) {
        console.error('Failed to save template:', e)
      }
      setSaving(false)
    }
  }

  const themeColor = resumeInfo?.themecolor || '#2a6ef5'

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Template switcher — hidden on print */}
      <div id="no-print" style={{
        display: 'flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.6rem 0.8rem', background: '#f9f7f2',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        flexWrap: 'wrap'
      }}>
        <span style={{
          fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', color: '#aaa', marginRight: '0.3rem'
        }}>
          Template
        </span>
        {TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => switchTemplate(t.id)}
            style={{
              fontSize: '0.72rem', fontWeight: 500,
              padding: '0.28rem 0.85rem', borderRadius: '100px',
              border: activeTemplate === t.id ? 'none' : '1px solid #e0ddd6',
              background: activeTemplate === t.id ? themeColor : 'white',
              color: activeTemplate === t.id ? 'white' : '#555',
              cursor: 'pointer', transition: 'all 0.15s',
              boxShadow: activeTemplate === t.id ? `0 2px 8px ${themeColor}40` : 'none'
            }}
          >
            {t.label}
          </button>
        ))}
        {saving && (
          <span style={{ fontSize: '0.65rem', color: '#aaa', marginLeft: '0.3rem' }}>
            Saving…
          </span>
        )}
      </div>

      {/* A4 page wrapper */}
      <A4Page>
        {activeTemplate === 'classic'   && <ClassicTemplate   resumeInfo={resumeInfo} />}
        {activeTemplate === 'minimal'   && <MinimalTemplate   resumeInfo={resumeInfo} />}
        {activeTemplate === 'modern'    && <ModernTemplate    resumeInfo={resumeInfo} />}
        {activeTemplate === 'executive' && <ExecutiveTemplate resumeInfo={resumeInfo} />}
      </A4Page>

    </div>
  )
}

export default ResumePreview