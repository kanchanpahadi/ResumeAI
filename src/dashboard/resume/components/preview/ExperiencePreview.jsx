// import React from 'react'

// function ExperiencePreview({resumeInfo}) {
//   return (
//     <div className='my-6'>
//         <h2 className='text-center font-bold text-sm mb-2'
//         style={{
//             color:resumeInfo?.themeColor
//         }}
//         >Professional Experience</h2>
//         <hr style={{
//             borderColor:resumeInfo?.themeColor
//         }} />

//         {resumeInfo?.Experience?.map((experience,index)=>(
//             <div key={index} className='my-5'>
//                 <h2 className='text-sm font-bold'
//                  style={{
//                     color:resumeInfo?.themeColor
//                 }}>{experience?.title}</h2>
//                 <h2 className='text-xs flex justify-between'>{experience?.companyName}, 
//                 {experience?.city}, 
//                 {experience?.state}
//                 <span>{experience?.startDate} To {experience?.currentlyWorking?'Present':experience.endDate} </span>
//                 </h2>
//                 {/* <p className='text-xs my-2'>
//                     {experience.workSummery}
//                 </p> */}
//                 <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:experience?.workSummery}} />
//             </div>
//         ))}
//     </div>
//   )
// }

// export default ExperiencePreview



import React from 'react'

function ExperiencePreview({resumeInfo}) {
  return (
    <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2'
        style={{color:resumeInfo?.themecolor}}>
            Professional Experience
        </h2>
        <hr style={{borderColor:resumeInfo?.themecolor}} />
        {resumeInfo?.Experience?.map((experience,index)=>(
            <div key={index} className='my-5'>
                <h2 className='text-sm font-bold'
                style={{color:resumeInfo?.themecolor}}>
                    {experience?.title}
                </h2>

                {/* ✅ Fix 1: only show if values exist, removes the ",," issue */}
                <h2 className='text-xs flex justify-between'>
                    <span>
                        {[experience?.companyName, experience?.city, experience?.state]
                            .filter(Boolean)
                            .join(', ')}
                    </span>
                    <span>
                        {experience?.startDate} {experience?.endDate || experience?.currentlyWorking ? `To ${experience?.currentlyWorking ? 'Present' : experience?.endDate}` : ''}
                    </span>
                </h2>

                {/* ✅ Fix 2: justified text + proper bullet indentation */}
                <div className='text-xs my-2 [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:pl-2 [&>p]:text-justify [&>ul>li]:text-justify'
                    dangerouslySetInnerHTML={{__html:experience?.workSummery}} 
                />
            </div>
        ))}
    </div>
  )
}

export default ExperiencePreview