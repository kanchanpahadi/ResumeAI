// import React from 'react'

// function SkillsPreview({resumeInfo}) {
//   return (
//     <div className='my-6'>
//     <h2 className='text-center font-bold text-sm mb-2'
//     style={{
//         color:resumeInfo?.themeColor
//     }}
//     >Education</h2>
//     <hr style={{
//         borderColor:resumeInfo?.themeColor
//     }} />

//     <div className='grid grid-cols-2 gap-3 my-4'>
//         {resumeInfo?.skills.map((skill,index)=>(
//             <div key={index} className='flex items-center justify-between'>
//                 <h2 className='text-xs'>{skill.name}</h2>
//                 <div className='h-2 bg-gray-200 w-[120px]'>
//                     <div className='h-2'
//                         style={{
//                             backgroundColor:resumeInfo?.themeColor,
//                             width:skill?.rating*20+'%'
//                         }}
//                     >
//                     </div>
//                 </div>
//             </div>
//         ))}
//     </div>
//     </div>
//   )
// }

// export default SkillsPreview



// import React from 'react'

// function SkillsPreview({resumeInfo}) {
//   return (
//     <div className='my-6'>
//         <h2 className='text-center font-bold text-sm mb-2'
//         style={{color:resumeInfo?.themecolor}}>
//             Skills
//         </h2>
//         <hr style={{borderColor:resumeInfo?.themecolor}} />
//         <div className='grid grid-cols-2 gap-3 my-4'>
//             {resumeInfo?.Skills?.map((skill,index)=>(
//                 <div key={index} className='flex items-center justify-between'>
//                     <h2 className='text-xs'>{skill.name}</h2>
//                     <div className='h-2 bg-gray-200 w-[120px]'>
//                         <div className='h-2'
//                         style={{
//                             backgroundColor:resumeInfo?.themecolor,
//                             width:skill?.rating*20+'%'
//                         }}>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default SkillsPreview


// import React from 'react'

// function SkillsPreview({resumeInfo}) {
//   return (
//     <div className='my-6'>
//         <h2 className='text-center font-bold text-sm mb-2'
//         style={{color:resumeInfo?.themeColor}}>
//             Skills
//         </h2>
//         <hr style={{borderColor:resumeInfo?.themeColor}} />
//         <div className='grid grid-cols-2 gap-3 my-4'>
//             {resumeInfo?.Skills?.map((skill,index)=>(
//                 <div key={index} className='flex items-center justify-between'>
//                     <h2 className='text-xs'>{skill.name}</h2>
//                     <div className='h-2 bg-gray-200 w-[120px]'>
//                         <div className='h-2'
//                         style={{
//                             backgroundColor:resumeInfo?.themeColor,
//                             width:skill?.rating*20+'%'
//                         }}>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default SkillsPreview


// import React from 'react'

// function SkillsPreview({resumeInfo}) {
//   return (
//     <div className='my-6'>
//         {/* ✅ No theme on heading and hr */}
//         <h2 className='text-center font-bold text-sm mb-2'>
//             Skills
//         </h2>
//         <hr />
//         <div className='grid grid-cols-2 gap-3 my-4'>
//             {resumeInfo?.Skills?.map((skill,index)=>(
//                 <div key={index} className='flex items-center justify-between'>
//                     <h2 className='text-xs'>{skill.name}</h2>
//                     <div className='h-2 bg-gray-200 w-[120px]'>
//                         {/* ✅ gray fallback when no theme selected */}
//                         <div className='h-2'
//                         style={{
//                             backgroundColor: resumeInfo?.themeColor || '#9CA3AF',
//                             width: skill?.rating * 20 + '%'
//                         }}>
//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default SkillsPreview



import React from 'react'

function SkillsPreview({resumeInfo}) {
  // ✅ null and undefined both fall through to default purple
  const barColor = resumeInfo?.themeColor || resumeInfo?.themecolor || '#6c47ff';

  return (
    <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2'>
            Skills
        </h2>
        <hr />
        <div className='grid grid-cols-2 gap-3 my-4'>
            {resumeInfo?.Skills?.map((skill,index)=>(
                <div key={index} className='flex items-center justify-between'>
                    <h2 className='text-xs'>{skill.name}</h2>
                    <div className='h-2 bg-gray-200 w-[120px]'>
                        <div className='h-2'
                        style={{
                            backgroundColor: barColor,  // ✅ always has a color
                            width: skill?.rating * 20 + '%'
                        }}>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SkillsPreview