import { Loader2Icon, MoreVertical, Pencil, Eye, Download, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalApi from './../../../service/GlobalApi'
import { toast } from 'sonner'

/* ─────────────────────────── Classic mini ─────────────────────────── */
function MiniClassic({ resume, themeColor }) {
  const skills     = resume?.Skills     || []
  const experience = resume?.Experience || []
  const education  = resume?.Education  || []
  return (
    <div style={{ width: 480, minHeight: 640, background: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 11, lineHeight: 1.4, padding: '24px 28px 20px', boxSizing: 'border-box', pointerEvents: 'none', userSelect: 'none' }}>
      <div style={{ height: 5, background: themeColor, margin: '-24px -28px 18px' }} />
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 900, color: themeColor, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 3 }}>
          {resume?.firstName || 'Your'} {resume?.lastName || 'Name'}
        </div>
        <div style={{ fontSize: 10, fontWeight: 500, color: '#3a3a3a', marginBottom: 2 }}>{resume?.jobTitle || 'Job Title'}</div>
        <div style={{ fontSize: 9, color: themeColor, marginBottom: 4 }}>{resume?.address || ''}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: themeColor }}>
          <span>{resume?.Phone || ''}</span><span>{resume?.email || ''}</span>
        </div>
        <div style={{ height: 1.5, background: themeColor, margin: '7px 0', opacity: 0.7 }} />
      </div>
      {resume?.Summary && <p style={{ fontSize: 8.5, color: '#555', lineHeight: 1.55, marginBottom: 10 }}>{resume.Summary.slice(0, 200)}{resume.Summary.length > 200 ? '…' : ''}</p>}
      {experience.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 9, color: themeColor, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>Professional Experience</div>
          <div style={{ height: 1, background: themeColor, opacity: 0.3, marginBottom: 6 }} />
          {experience.slice(0, 2).map((exp, i) => (
            <div key={i} style={{ marginBottom: 7 }}>
              <div style={{ fontWeight: 700, fontSize: 9, color: themeColor }}>{exp?.title}</div>
              <div style={{ fontSize: 8, color: '#777', display: 'flex', justifyContent: 'space-between' }}>
                <span>{[exp?.companyName, exp?.city].filter(Boolean).join(', ')}</span>
                <span>{exp?.startDate}{(exp?.endDate || exp?.currentlyWorking) ? ` – ${exp?.currentlyWorking ? 'Present' : exp?.endDate}` : ''}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      {skills.length > 0 && (
        <div>
          <div style={{ textAlign: 'center', fontWeight: 700, fontSize: 9, color: themeColor, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>Skills</div>
          <div style={{ height: 1, background: themeColor, opacity: 0.3, marginBottom: 6 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
            {skills.slice(0, 6).map((skill, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 8, color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0, flex: '0 0 auto', maxWidth: 72 }}>{skill?.name}</span>
                <div style={{ flex: 1, height: 4, background: '#f0ede6', borderRadius: 100, overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 100, background: themeColor, width: `${(skill?.rating || 3) * 20}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────── Minimal mini ─────────────────────────── */
function MiniMinimal({ resume, themeColor }) {
  const skills     = resume?.Skills     || []
  const experience = resume?.Experience || []
  const education  = resume?.Education  || []
  return (
    <div style={{ width: 480, minHeight: 640, background: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: 11, lineHeight: 1.4, padding: '28px 32px', boxSizing: 'border-box', pointerEvents: 'none', userSelect: 'none' }}>
      <div style={{ fontSize: 20, fontWeight: 600, color: '#0d0d0d', letterSpacing: '-0.03em', lineHeight: 1 }}>
        {resume?.firstName || 'Your'} {resume?.lastName || 'Name'}
      </div>
      <div style={{ fontSize: 10, color: '#666', marginTop: 3 }}>{resume?.jobTitle}</div>
      <div style={{ display: 'flex', gap: 12, marginTop: 5, fontSize: 8.5, color: '#888' }}>
        {resume?.Phone && <span>{resume.Phone}</span>}
        {resume?.email && <span>{resume.email}</span>}
        {resume?.address && <span>{resume.address}</span>}
      </div>
      <div style={{ width: 36, height: 2, background: themeColor, margin: '10px 0' }} />
      {resume?.Summary && <p style={{ fontSize: 8.5, color: '#555', lineHeight: 1.6, marginBottom: 10 }}>{resume.Summary.slice(0, 160)}…</p>}
      {experience.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999', marginBottom: 6 }}>Experience</div>
          {experience.slice(0, 2).map((exp, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ fontWeight: 600, fontSize: 9, color: '#0d0d0d' }}>{exp?.title}</div>
              <div style={{ fontSize: 8, color: themeColor }}>{exp?.companyName}</div>
            </div>
          ))}
        </div>
      )}
      {skills.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {skills.slice(0, 8).map((skill, i) => (
            <span key={i} style={{ fontSize: 8, padding: '2px 8px', borderRadius: 100, background: themeColor + '14', color: themeColor, border: `1px solid ${themeColor}25` }}>{skill?.name}</span>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────── Modern mini ─────────────────────────── */
function MiniModern({ resume, themeColor }) {
  const skills     = resume?.Skills     || []
  const experience = resume?.Experience || []
  const initials   = `${resume?.firstName?.[0] || ''}${resume?.lastName?.[0] || ''}`
  return (
    <div style={{ width: 480, minHeight: 640, background: '#fff', fontFamily: "'DM Sans', sans-serif", display: 'flex', pointerEvents: 'none', userSelect: 'none' }}>
      {/* Sidebar */}
      <div style={{ width: '36%', background: themeColor + '10', padding: '24px 16px', flexShrink: 0 }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: themeColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{initials || '?'}</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#0d0d0d', lineHeight: 1.2 }}>{resume?.firstName} {resume?.lastName}</div>
        <div style={{ fontSize: 8.5, color: '#777', marginTop: 2 }}>{resume?.jobTitle}</div>
        <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: themeColor, margin: '14px 0 5px' }}>Skills</div>
        {skills.slice(0, 5).map((skill, i) => (
          <div key={i} style={{ marginBottom: 5 }}>
            <div style={{ fontSize: 8, color: '#444', marginBottom: 2 }}>{skill?.name}</div>
            <div style={{ height: 3, background: '#e0ddd6', borderRadius: 100, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: themeColor, width: `${(skill?.rating || 3) * 20}%` }} />
            </div>
          </div>
        ))}
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: '24px 18px', borderLeft: '1px solid #f0ede6' }}>
        {resume?.Summary && <p style={{ fontSize: 8.5, color: '#555', lineHeight: 1.6, marginBottom: 12 }}>{resume.Summary.slice(0, 140)}…</p>}
        {experience.length > 0 && (
          <div>
            <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: themeColor, marginBottom: 8, paddingBottom: 4, borderBottom: `1.5px solid ${themeColor}30` }}>Experience</div>
            {experience.slice(0, 2).map((exp, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 9, color: '#0d0d0d' }}>{exp?.title}</div>
                <div style={{ fontSize: 8, color: themeColor, fontWeight: 500 }}>{exp?.companyName}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────── Executive mini ─────────────────────────── */
function MiniExecutive({ resume, themeColor }) {
  const skills     = resume?.Skills     || []
  const experience = resume?.Experience || []
  return (
    <div style={{ width: 480, minHeight: 640, background: '#fff', fontFamily: "'DM Sans', sans-serif", pointerEvents: 'none', userSelect: 'none' }}>
      {/* Dark header */}
      <div style={{ background: themeColor, padding: '22px 28px 18px', color: '#fff' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>
          {resume?.firstName || 'Your'} {resume?.lastName || 'Name'}
        </div>
        <div style={{ fontSize: 9, fontWeight: 300, opacity: 0.8, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: 4 }}>{resume?.jobTitle}</div>
        <div style={{ display: 'flex', gap: 14, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.15)', fontSize: 8, opacity: 0.8 }}>
          {resume?.Phone && <span>{resume.Phone}</span>}
          {resume?.email && <span>{resume.email}</span>}
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: '18px 28px' }}>
        {resume?.Summary && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: themeColor, marginBottom: 5, paddingBottom: 4, borderBottom: `1.5px solid ${themeColor}35` }}>Summary</div>
            <p style={{ fontSize: 8.5, color: '#555', lineHeight: 1.65, fontStyle: 'italic', margin: 0 }}>{resume.Summary.slice(0, 160)}…</p>
          </div>
        )}
        {experience.length > 0 && (
          <div>
            <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: themeColor, marginBottom: 5, paddingBottom: 4, borderBottom: `1.5px solid ${themeColor}35` }}>Experience</div>
            {experience.slice(0, 2).map((exp, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 600, fontSize: 9.5, color: '#0d0d0d' }}>{exp?.title}</div>
                <div style={{ fontSize: 8.5, color: themeColor, fontWeight: 600 }}>{[exp?.companyName, exp?.city].filter(Boolean).join(' · ')}</div>
              </div>
            ))}
          </div>
        )}
        {skills.length > 0 && (
          <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {skills.slice(0, 6).map((skill, i) => (
              <span key={i} style={{ fontSize: 7.5, padding: '2px 8px', borderRadius: 3, background: themeColor + '12', color: themeColor, border: `1px solid ${themeColor}25` }}>{skill?.name}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─────────────────────────── Dispatcher ─────────────────────────── */
function MiniResumePreview({ resume, themeColor }) {
  const template = resume?.template || 'classic'
  if (template === 'minimal')   return <MiniMinimal   resume={resume} themeColor={themeColor} />
  if (template === 'modern')    return <MiniModern    resume={resume} themeColor={themeColor} />
  if (template === 'executive') return <MiniExecutive resume={resume} themeColor={themeColor} />
  return <MiniClassic resume={resume} themeColor={themeColor} />
}

/* ─────────────────────────── Card ─────────────────────────── */
function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const themeColor  = resume?.themecolor || resume?.themeColor || '#2a6ef5';
  const resumeTitle = resume?.Title      || resume?.title      || 'Untitled Resume';

  const MINI_W  = 480;
  const SCALE   = 0.5;
  const THUMB_H = 210;

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(() => {
      toast('Resume deleted.');
      refreshData();
      setLoading(false);
      setOpenAlert(false);
    }, () => setLoading(false))
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');
        .rc-wrap {
          border-radius: 16px; overflow: hidden;
          background: #fff; border: 1px solid rgba(0,0,0,0.07);
          transition: transform 0.22s, box-shadow 0.22s;
          display: flex; flex-direction: column; width: 100%;
        }
        .rc-wrap:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(0,0,0,0.12); }
        .rc-thumb {
          position: relative; height: ${THUMB_H}px;
          overflow: hidden; background: #faf8f3; flex-shrink: 0;
        }
        .rc-mini {
          position: absolute; top: 0; left: 0;
          width: ${MINI_W}px;
          transform: scale(${SCALE}); transform-origin: top left;
        }
        .rc-fade {
          position: absolute; bottom: 0; left: 0; right: 0; height: 64px;
          background: linear-gradient(to bottom, transparent, rgba(250,248,243,0.97));
          pointer-events: none; z-index: 2;
        }
        .rc-overlay {
          position: absolute; inset: 0; z-index: 3;
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.2s; background: rgba(0,0,0,0.02);
        }
        .rc-wrap:hover .rc-overlay { opacity: 1; }
        .rc-open-pill {
          font-family: 'DM Sans', sans-serif; font-size: 0.75rem; font-weight: 500;
          border-radius: 100px; padding: 0.35rem 1rem; background: white;
          letter-spacing: 0.02em; border: 1px solid; transition: transform 0.15s;
        }
        .rc-wrap:hover .rc-open-pill { transform: scale(1.05); }
        .rc-footer {
          padding: 0.8rem 1rem;
          display: flex; align-items: center; justify-content: space-between;
          border-top: 1px solid rgba(0,0,0,0.06); background: #fff;
        }
        .rc-title {
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500;
          color: #0d0d0d; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 130px;
        }
        .rc-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; border: 1.5px solid rgba(0,0,0,0.1); }
        .rc-template-badge {
          font-size: 0.6rem; font-weight: 600; letter-spacing: 0.06em;
          text-transform: capitalize; padding: 0.1rem 0.5rem;
          border-radius: 100px; opacity: 0.75;
        }
        .rc-menu-btn {
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 8px;
          color: #7a7a7a; background: transparent; border: none; cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .rc-menu-btn:hover { background: #f2ede3; color: #0d0d0d; }
      `}</style>

      <div className="rc-wrap">
        <Link to={'/dashboard/resume/' + resume.documentId + '/edit'} className="block">
          <div className="rc-thumb">
            <div className="rc-mini">
              <MiniResumePreview resume={resume} themeColor={themeColor} />
            </div>
            <div className="rc-fade" />
            <div className="rc-overlay">
              <span className="rc-open-pill" style={{ color: themeColor, borderColor: themeColor }}>
                Open →
              </span>
            </div>
          </div>
        </Link>

        <div className="rc-footer">
          <div className="flex items-center gap-2 min-w-0">
            <div className="rc-dot" style={{ background: themeColor }} />
            <span className="rc-title">{resumeTitle}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Template badge */}
            <span className="rc-template-badge"
              style={{ background: themeColor + '14', color: themeColor }}>
              {resume?.template || 'classic'}
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="rc-menu-btn"><MoreVertical size={15} /></button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="rounded-xl shadow-xl border-0 p-1 min-w-[140px]">
                {[
                  { label: 'Edit',     icon: <Pencil size={13} />,   onClick: () => navigation('/dashboard/resume/' + resume.documentId + '/edit') },
                  { label: 'View',     icon: <Eye size={13} />,      onClick: () => navigation('/my-resume/' + resume.documentId + '/view') },
                  { label: 'Download', icon: <Download size={13} />, onClick: () => navigation('/my-resume/' + resume.documentId + '/view') },
                  { label: 'Delete',   icon: <Trash2 size={13} />,   onClick: () => setOpenAlert(true), danger: true },
                ].map(item => (
                  <DropdownMenuItem
                    key={item.label}
                    onClick={item.onClick}
                    className={`flex items-center gap-2 rounded-lg text-sm px-3 py-2 cursor-pointer
                      ${item.danger ? 'text-[#e8401c] focus:bg-red-50 focus:text-[#e8401c]' : 'text-[#0d0d0d]'}`}
                  >
                    {item.icon} {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <AlertDialog open={openAlert}>
        <AlertDialogContent className="rounded-2xl border-0 shadow-2xl p-8 max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-bold text-[#0d0d0d]">
              Delete this resume?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-gray-400 mt-2 leading-relaxed">
              This cannot be undone.{' '}
              <span className="text-[#0d0d0d] font-medium">"{resumeTitle}"</span>{' '}
              will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex gap-2">
            <AlertDialogCancel onClick={() => setOpenAlert(false)} className="flex-1 rounded-full text-sm">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete} disabled={loading}
              className="flex-1 rounded-full text-sm bg-[#e8401c] hover:bg-[#c43216] text-white flex items-center justify-center gap-2">
              {loading ? <Loader2Icon size={15} className="animate-spin" /> : <><Trash2 size={14} /> Delete</>}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ResumeCardItem