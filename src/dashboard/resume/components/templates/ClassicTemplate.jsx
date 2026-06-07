import React from 'react'
import PersonalDetailPreview from '../preview/PersonalDetailPreview'
import SummeryPreview from '../preview/SummeryPreview'
import ExperiencePreview from '../preview/ExperiencePreview'
import EducationalPreview from '../preview/EducationalPreview'
import SkillsPreview from '../preview/SkillsPreview'

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

export default ClassicTemplate