

function SummeryPreview({ resumeInfo }) {
  return (
    <p className='text-xs text-justify leading-relaxed'>
      {resumeInfo?.Summary}
    </p>
  )
}

export default SummeryPreview