import { Input } from '@/components/ui/input'
import { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoaderCircle, CheckCircle2, GraduationCap } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Education() {
  const [educationList, setEducationList] = useState([])
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo?.Education?.length > 0 && setEducationList(resumeInfo?.Education)
  }, [])

  const handleChange = (index, name, value) => {
    setSaved(false);
    setEducationList(prev =>
      prev.map((item, i) => i === index ? { ...item, [name]: value } : item)
    );
  }

  const AddNewEducation = () => {
    setEducationList(prev => [...prev, {
      universityName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }]);
  }

  const RemoveEducation = () => {
    setEducationList(prev => prev.slice(0, -1));
  }

  const onSave = () => {
    if (educationList.some(e => !e.universityName.trim() || !e.degree.trim())) {
      toast('Please fill in University and Degree before saving');
      return;
    }
    setLoading(true);
    GlobalApi.UpdateResumeDetail(resumeId, {
      data: { Education: educationList.map(({ id, ...rest }) => rest) }
    }).then(() => {
      setLoading(false);
      setSaved(true);
      toast('Details updated!');
      setTimeout(() => setSaved(false), 2500);
    }, () => {
      setLoading(false);
      toast('Server Error, Try again!');
    });
  }

  useEffect(() => {
    setResumeInfo(prev => ({ ...prev, Education: educationList }));
  }, [educationList])

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p className='text-gray-500 text-sm'>Add your educational background</p>

      {/* Empty state */}
      {educationList.length === 0 && (
        <div className='flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-gray-200 rounded-lg mt-5'>
          <GraduationCap className='h-8 w-8 text-gray-300 mb-2' />
          <p className='text-sm text-gray-400'>No education added yet</p>
          <p className='text-xs text-gray-300 mt-1'>Click "+ Add Education" to get started</p>
        </div>
      )}

      <div className='mt-3'>
        {educationList.map((item, index) => (
          <div key={index} className='border rounded-lg p-4 mb-4'>
            <h3 className='text-sm font-semibold text-gray-600 mb-3'>
              Education #{index + 1}
            </h3>
            <div className='grid grid-cols-2 gap-3'>

              <div className='col-span-2'>
                <label className='text-xs text-gray-500'>University / School Name <span className='text-red-400'>*</span></label>
                <Input
                  className={!item.universityName.trim() ? 'border-amber-300' : ''}
                  defaultValue={item.universityName}
                  onChange={(e) => handleChange(index, 'universityName', e.target.value)}
                />
              </div>

              <div>
                <label className='text-xs text-gray-500'>Degree <span className='text-red-400'>*</span></label>
                <Input
                  className={!item.degree.trim() ? 'border-amber-300' : ''}
                  defaultValue={item.degree}
                  onChange={(e) => handleChange(index, 'degree', e.target.value)}
                />
              </div>

              <div>
                <label className='text-xs text-gray-500'>Major / Field of Study</label>
                <Input
                  defaultValue={item.major}
                  onChange={(e) => handleChange(index, 'major', e.target.value)}
                />
              </div>

              <div>
                <label className='text-xs text-gray-500'>Start Date</label>
                <Input
                  type='date'
                  defaultValue={item.startDate}
                  onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                />
              </div>

              <div>
                <label className='text-xs text-gray-500'>End Date</label>
                <Input
                  type='date'
                  defaultValue={item.endDate}
                  onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                />
              </div>

              <div className='col-span-2'>
                <label className='text-xs text-gray-500'>Description</label>
                <textarea
                  className='w-full border rounded-md p-2 text-sm mt-1 min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/30'
                  defaultValue={item.description}
                  placeholder='Relevant coursework, achievements, activities...'
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                />
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-between mt-4'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewEducation} className="text-primary">
            + Add Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="text-primary"
            disabled={educationList.length === 0}
          >
            - Remove
          </Button>
        </div>
        <Button
          disabled={loading}
          onClick={onSave}
          className={saved ? 'bg-green-500 hover:bg-green-600 transition-colors duration-300' : ''}
        >
          {loading
            ? <LoaderCircle className='animate-spin' />
            : saved
              ? <><CheckCircle2 className='h-4 w-4 mr-1' /> Saved!</>
              : 'Save'
          }
        </Button>
      </div>
    </div>
  )
}

export default Education