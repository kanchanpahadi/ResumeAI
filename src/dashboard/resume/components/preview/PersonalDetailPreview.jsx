import React from 'react'

function PersonalDetailPreview({ resumeInfo }) {
  const theme = resumeInfo?.themecolor || resumeInfo?.themeColor || '#2a6ef5'

  return (
    <div>
      <h2 className='font-bold text-xl text-center' style={{ color: theme }}>
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>

      <h3 className='text-sm text-center font-medium my-1' style={{ color: theme }}>
        {resumeInfo?.jobTitle}
      </h3>

      <hr className='my-2' style={{ borderColor: theme }} />

      <p className='text-xs text-center text-gray-500'>
        {[resumeInfo?.address, resumeInfo?.Phone, resumeInfo?.email]
          .filter(Boolean)
          .join(' | ')}
      </p>
    </div>
  )
}

export default PersonalDetailPreview