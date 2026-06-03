

function ExperiencePreview({ resumeInfo }) {
  const theme = resumeInfo?.themecolor || resumeInfo?.themeColor || '#2a6ef5'

  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2' style={{ color: theme }}>
        Professional Experience
      </h2>
      <hr style={{ borderColor: theme }} />

      {resumeInfo?.Experience?.map((experience, index) => (
        <div key={index} className='my-5'>
          <h2 className='text-sm font-bold' style={{ color: theme }}>
            {experience?.title}
          </h2>
          <h2 className='text-xs flex justify-between'>
            <span>
              {[experience?.companyName, experience?.city, experience?.state]
                .filter(Boolean)
                .join(', ')}
            </span>
            <span>
              {experience?.startDate}
              {(experience?.endDate || experience?.currentlyWorking)
                ? ` To ${experience?.currentlyWorking ? 'Present' : experience?.endDate}`
                : ''}
            </span>
          </h2>
          <div
            className='text-xs my-2 [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:pl-2 [&>p]:text-justify [&>ul>li]:text-justify'
            dangerouslySetInnerHTML={{ __html: experience?.workSummery }}
          />
        </div>
      ))}
    </div>
  )
}

export default ExperiencePreview