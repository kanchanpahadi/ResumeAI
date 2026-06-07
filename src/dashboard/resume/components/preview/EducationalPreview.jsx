import React from 'react'

function EducationPreview({ resumeInfo }) {
  const theme = resumeInfo?.themecolor || resumeInfo?.themeColor || '#2a6ef5'

  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{ color: theme }}>
        Education
      </h2>
      <hr style={{ borderColor: theme }} />

      {resumeInfo?.Education?.map((education, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold' style={{ color: theme }}>
            {education?.universityName}
          </h2>
          <h2 className='text-xs flex justify-between'>
            <span>
              {education?.degree}
              {education?.major ? ` in ${education?.major}` : ''}
            </span>
            <span>
              {education?.startDate}
              {education?.endDate ? ` - ${education?.endDate}` : ''}
            </span>
          </h2>
          {education?.description && (
            <div
              className='text-xs my-2 [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:pl-2 [&>p]:text-justify [&>ul>li]:text-justify'
              dangerouslySetInnerHTML={{ __html: education?.description }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default EducationPreview