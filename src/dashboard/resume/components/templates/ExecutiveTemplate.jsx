import React from 'react'

function ExecutiveTemplate({ resumeInfo }) {
  const themeColor = resumeInfo?.themecolor || '#1a1a2e'
  const skills     = resumeInfo?.Skills     || []
  const experience = resumeInfo?.Experience || []
  const education  = resumeInfo?.Education  || []

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#fff', minHeight: '100%' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        .exec-header {
          padding: 2.6rem 3rem 2.2rem;
          color: #fff;
        }
        .exec-name {
          font-family: 'Playfair Display', serif;
          font-size: 2.2rem; font-weight: 900;
          letter-spacing: -0.02em; line-height: 1; margin-bottom: 0.4rem;
        }
        .exec-jobtitle {
          font-size: 0.9rem; font-weight: 300; opacity: 0.85;
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .exec-contact-bar {
          display: flex; gap: 2rem; margin-top: 1.2rem;
          padding-top: 1.2rem; border-top: 1px solid rgba(255,255,255,0.15);
        }
        .exec-contact-item {
          font-size: 0.73rem; opacity: 0.8; display: flex; align-items: center; gap: 0.4rem;
        }
        .exec-body {
          padding: 2rem 3rem;
        }
        .exec-section { margin-bottom: 1.8rem; }
        .exec-section-label {
          font-size: 0.63rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; margin-bottom: 0.9rem;
          padding-bottom: 0.45rem; border-bottom: 1.5px solid;
        }
        .exec-exp-row { margin-bottom: 1.2rem; }
        .exec-exp-title {
          font-size: 0.9rem; font-weight: 600; color: #0d0d0d;
        }
        .exec-exp-sub {
          display: flex; justify-content: space-between;
          font-size: 0.75rem; margin-top: 0.15rem;
        }
        .exec-exp-desc {
          font-size: 0.79rem; color: #555; margin-top: 0.4rem; line-height: 1.65;
        }
        .exec-two-col {
          display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
        }
        .exec-skill-tag {
          display: inline-block; font-size: 0.72rem; font-weight: 500;
          padding: 0.25rem 0.7rem; border-radius: 4px; margin: 0 0.3rem 0.4rem 0;
        }
      `}</style>

      {/* ── Dark header ── */}
      <div className="exec-header" style={{ background: themeColor }}>
        <div className="exec-name">
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </div>
        <div className="exec-jobtitle">{resumeInfo?.jobTitle}</div>
        <div className="exec-contact-bar">
          {resumeInfo?.Phone   && <span className="exec-contact-item">📞 {resumeInfo.Phone}</span>}
          {resumeInfo?.email   && <span className="exec-contact-item">✉️ {resumeInfo.email}</span>}
          {resumeInfo?.address && <span className="exec-contact-item">📍 {resumeInfo.address}</span>}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="exec-body">

        {/* Summary */}
        {resumeInfo?.Summary && (
          <div className="exec-section">
            <div className="exec-section-label" style={{ color: themeColor, borderColor: themeColor + '40' }}>
              Executive Summary
            </div>
            <p style={{
              fontSize: '0.84rem', color: '#444', lineHeight: 1.75,
              fontStyle: 'italic', margin: 0
            }}>
              {resumeInfo.Summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="exec-section">
            <div className="exec-section-label" style={{ color: themeColor, borderColor: themeColor + '40' }}>
              Professional Experience
            </div>
            {experience.map((exp, i) => (
              <div key={i} className="exec-exp-row">
                <div className="exec-exp-title">{exp?.title}</div>
                <div className="exec-exp-sub">
                  <span style={{ color: themeColor, fontWeight: 600, fontSize: '0.78rem' }}>
                    {[exp?.companyName, exp?.city].filter(Boolean).join(' · ')}
                  </span>
                  <span style={{ color: '#aaa' }}>
                    {exp?.startDate}{exp?.endDate || exp?.currentlyWorking
                      ? ` – ${exp?.currentlyWorking ? 'Present' : exp?.endDate}` : ''}
                  </span>
                </div>
                {exp?.workSummery && (
                  <div className="exec-exp-desc"
                    dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education + Skills in two columns */}
        <div className="exec-two-col">

          {education.length > 0 && (
            <div>
              <div className="exec-section-label" style={{ color: themeColor, borderColor: themeColor + '40' }}>
                Education
              </div>
              {education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '0.9rem' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0d0d0d' }}>
                    {edu?.universityName}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#666', marginTop: '0.1rem' }}>
                    {edu?.degree}{edu?.major ? ` in ${edu.major}` : ''}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#aaa', marginTop: '0.1rem' }}>
                    {edu?.startDate}{edu?.endDate ? ` – ${edu.endDate}` : ''}
                  </div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <div className="exec-section-label" style={{ color: themeColor, borderColor: themeColor + '40' }}>
                Core Competencies
              </div>
              <div>
                {skills.map((skill, i) => (
                  <span key={i} className="exec-skill-tag"
                    style={{ background: themeColor + '10', color: themeColor, border: `1px solid ${themeColor}25` }}>
                    {skill?.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ExecutiveTemplate