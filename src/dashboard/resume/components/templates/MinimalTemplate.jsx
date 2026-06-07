import React from 'react'

function MinimalTemplate({ resumeInfo }) {
  const themeColor = resumeInfo?.themecolor || '#111111'

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#fff', minHeight: '100%' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap');
        .min-wrap { padding: 3rem 3.2rem; }
        .min-name {
          font-size: 2rem; font-weight: 600; letter-spacing: -0.03em;
          color: #0d0d0d; line-height: 1;
        }
        .min-title { font-size: 0.85rem; color: #666; margin-top: 0.3rem; font-weight: 400; }
        .min-contact {
          display: flex; gap: 1.2rem; margin-top: 0.6rem;
          font-size: 0.72rem; color: #888;
        }
        .min-contact span { display: flex; align-items: center; gap: 0.3rem; }
        .min-divider {
          height: 1px; background: #e8e8e8; margin: 1.4rem 0;
        }
        .min-accent-divider {
          height: 2px; margin: 1.4rem 0; width: 40px;
        }
        .min-section-label {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #999; margin-bottom: 1rem;
        }
        .min-section { margin-top: 1.8rem; }
      `}</style>

      <div className="min-wrap">
        {/* Header */}
        <div>
          <div className="min-name">
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </div>
          <div className="min-title">{resumeInfo?.jobTitle}</div>
          <div className="min-contact">
            {resumeInfo?.Phone && <span>{resumeInfo.Phone}</span>}
            {resumeInfo?.email && <span>{resumeInfo.email}</span>}
            {resumeInfo?.address && <span>{resumeInfo.address}</span>}
          </div>
          <div className="min-accent-divider" style={{ background: themeColor }} />
        </div>

        {/* Summary */}
        {resumeInfo?.Summary && (
          <div className="min-section">
            <div className="min-section-label">About</div>
            <p style={{ fontSize: '0.82rem', color: '#444', lineHeight: 1.7, margin: 0 }}>
              {resumeInfo.Summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {resumeInfo?.Experience?.length > 0 && (
          <div className="min-section">
            <div className="min-section-label">Experience</div>
            {resumeInfo.Experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0d0d0d' }}>{exp?.title}</span>
                  <span style={{ fontSize: '0.72rem', color: '#aaa' }}>
                    {exp?.startDate}{exp?.endDate || exp?.currentlyWorking ? ` – ${exp?.currentlyWorking ? 'Present' : exp?.endDate}` : ''}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: themeColor, marginTop: '0.15rem', fontWeight: 500 }}>
                  {[exp?.companyName, exp?.city].filter(Boolean).join(', ')}
                </div>
                {exp?.workSummery && (
                  <div style={{ fontSize: '0.78rem', color: '#555', marginTop: '0.4rem', lineHeight: 1.6 }}
                    dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resumeInfo?.Education?.length > 0 && (
          <div className="min-section">
            <div className="min-section-label">Education</div>
            {resumeInfo.Education.map((edu, i) => (
              <div key={i} style={{ marginBottom: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#0d0d0d' }}>{edu?.universityName}</span>
                  <span style={{ fontSize: '0.72rem', color: '#aaa' }}>
                    {edu?.startDate}{edu?.endDate ? ` – ${edu.endDate}` : ''}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#666', marginTop: '0.1rem' }}>
                  {edu?.degree}{edu?.major ? ` — ${edu.major}` : ''}
                </div>
                {edu?.description && (
                  <div style={{ fontSize: '0.75rem', color: '#555', marginTop: '0.3rem', lineHeight: 1.6 }}
                    dangerouslySetInnerHTML={{ __html: edu.description }} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resumeInfo?.Skills?.length > 0 && (
          <div className="min-section">
            <div className="min-section-label">Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {resumeInfo.Skills.map((skill, i) => (
                <span key={i} style={{
                  fontSize: '0.73rem', padding: '0.25rem 0.75rem',
                  borderRadius: '100px', fontWeight: 500,
                  background: themeColor + '12',
                  color: themeColor,
                  border: `1px solid ${themeColor}25`
                }}>
                  {skill?.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MinimalTemplate