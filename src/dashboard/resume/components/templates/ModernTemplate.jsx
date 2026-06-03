import React from 'react'

function ModernTemplate({ resumeInfo }) {
  const themeColor = resumeInfo?.themecolor || '#2a6ef5'
  const skills     = resumeInfo?.Skills     || []
  const experience = resumeInfo?.Experience || []
  const education  = resumeInfo?.Education  || []
  const initials   = `${resumeInfo?.firstName?.[0] || ''}${resumeInfo?.lastName?.[0] || ''}`

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", display: 'flex', minHeight: '100%', background: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        .mod-sidebar {
          width: 36%; flex-shrink: 0;
          padding: 2.4rem 1.6rem;
          display: flex; flex-direction: column; gap: 1.6rem;
        }
        .mod-main {
          flex: 1; padding: 2.4rem 2rem;
          border-left: 1px solid #f0ede6;
        }
        .mod-avatar {
          width: 64px; height: 64px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.4rem; font-weight: 700; color: #fff; margin-bottom: 0.8rem;
        }
        .mod-sidebar-name {
          font-size: 1.1rem; font-weight: 700; color: #0d0d0d;
          line-height: 1.2; letter-spacing: -0.02em;
        }
        .mod-sidebar-title {
          font-size: 0.75rem; color: #777; margin-top: 0.2rem;
        }
        .mod-sidebar-label {
          font-size: 0.6rem; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; margin-bottom: 0.6rem;
        }
        .mod-contact-item {
          font-size: 0.72rem; color: #555; margin-bottom: 0.35rem;
          word-break: break-all; line-height: 1.4;
        }
        .mod-skill-row {
          margin-bottom: 0.55rem;
        }
        .mod-skill-name {
          font-size: 0.72rem; color: #444; margin-bottom: 0.2rem;
          display: flex; justify-content: space-between;
        }
        .mod-skill-bar-bg {
          height: 4px; background: #e8e8e8; border-radius: 100px; overflow: hidden;
        }
        .mod-section-label {
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; margin-bottom: 0.9rem;
          padding-bottom: 0.5rem; border-bottom: 2px solid;
        }
        .mod-section { margin-bottom: 1.8rem; }
        .mod-exp-title {
          font-size: 0.88rem; font-weight: 600; color: #0d0d0d;
        }
        .mod-exp-meta {
          font-size: 0.73rem; margin-top: 0.1rem;
          display: flex; justify-content: space-between;
        }
        .mod-exp-desc {
          font-size: 0.78rem; color: #555; margin-top: 0.4rem; line-height: 1.6;
        }
      `}</style>

      {/* ── Sidebar ── */}
      <div className="mod-sidebar" style={{ background: themeColor + '08' }}>

        {/* Avatar + name */}
        <div>
          <div className="mod-avatar" style={{ background: themeColor }}>
            {initials || '?'}
          </div>
          <div className="mod-sidebar-name">
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </div>
          <div className="mod-sidebar-title">{resumeInfo?.jobTitle}</div>
        </div>

        {/* Contact */}
        <div>
          <div className="mod-sidebar-label" style={{ color: themeColor }}>Contact</div>
          {resumeInfo?.Phone   && <div className="mod-contact-item">📞 {resumeInfo.Phone}</div>}
          {resumeInfo?.email   && <div className="mod-contact-item">✉️ {resumeInfo.email}</div>}
          {resumeInfo?.address && <div className="mod-contact-item">📍 {resumeInfo.address}</div>}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <div className="mod-sidebar-label" style={{ color: themeColor }}>Skills</div>
            {skills.map((skill, i) => (
              <div key={i} className="mod-skill-row">
                <div className="mod-skill-name">
                  <span>{skill?.name}</span>
                </div>
                <div className="mod-skill-bar-bg">
                  <div style={{
                    height: '100%', borderRadius: 100,
                    background: themeColor,
                    width: `${(skill?.rating || 3) * 20}%`
                  }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education in sidebar */}
        {education.length > 0 && (
          <div>
            <div className="mod-sidebar-label" style={{ color: themeColor }}>Education</div>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '0.9rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#0d0d0d', lineHeight: 1.3 }}>
                  {edu?.universityName}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.1rem' }}>
                  {edu?.degree}{edu?.major ? `, ${edu.major}` : ''}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#aaa', marginTop: '0.1rem' }}>
                  {edu?.startDate}{edu?.endDate ? ` – ${edu.endDate}` : ''}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Main ── */}
      <div className="mod-main">

        {/* Summary */}
        {resumeInfo?.Summary && (
          <div className="mod-section">
            <div className="mod-section-label" style={{ color: themeColor, borderColor: themeColor + '30' }}>
              Profile
            </div>
            <p style={{ fontSize: '0.82rem', color: '#444', lineHeight: 1.7, margin: 0 }}>
              {resumeInfo.Summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mod-section">
            <div className="mod-section-label" style={{ color: themeColor, borderColor: themeColor + '30' }}>
              Experience
            </div>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '1.3rem' }}>
                <div className="mod-exp-title">{exp?.title}</div>
                <div className="mod-exp-meta">
                  <span style={{ color: themeColor, fontWeight: 500, fontSize: '0.78rem' }}>
                    {[exp?.companyName, exp?.city].filter(Boolean).join(', ')}
                  </span>
                  <span style={{ color: '#aaa', fontSize: '0.72rem' }}>
                    {exp?.startDate}{exp?.endDate || exp?.currentlyWorking
                      ? ` – ${exp?.currentlyWorking ? 'Present' : exp?.endDate}` : ''}
                  </span>
                </div>
                {exp?.workSummery && (
                  <div className="mod-exp-desc"
                    dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ModernTemplate