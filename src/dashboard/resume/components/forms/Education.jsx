import { Input } from '@/components/ui/input'
import  { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle, CheckCircle2, Lightbulb } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Skills() {
  const [skillsList, setSkillsList] = useState([])
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  useEffect(() => {
    resumeInfo?.Skills?.length > 0 && setSkillsList(resumeInfo?.Skills)
  }, [])

  const handleChange = (index, name, value) => {
    setSaved(false);
    setSkillsList(prev =>
      prev.map((item, i) => i === index ? { ...item, [name]: value } : item)
    );
  }

  const AddNewSkills = () => {
    setSkillsList(prev => [...prev, { name: '', rating: 0 }]);
  }

  const RemoveSkills = () => {
    setSkillsList(prev => prev.slice(0, -1));
  }

  const onSave = () => {
    if (skillsList.some(s => !s.name.trim())) {
      toast('Please fill in all skill names before saving');
      return;
    }
    setLoading(true);
    GlobalApi.UpdateResumeDetail(resumeId, {
      data: { Skills: skillsList.map(({ id, ...rest }) => rest) }
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
    setResumeInfo(prev => ({ ...prev, Skills: skillsList }));
  }, [skillsList])

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Skills</h2>
      <p className='text-gray-500 text-sm'>Add your top professional key skills</p>

      {/* Empty state */}
      {skillsList.length === 0 && (
        <div className='flex flex-col items-center justify-center py-10 text-center border-2 border-dashed border-gray-200 rounded-lg mt-5'>
          <Lightbulb className='h-8 w-8 text-gray-300 mb-2' />
          <p className='text-sm text-gray-400'>No skills added yet</p>
          <p className='text-xs text-gray-300 mt-1'>Click "+ Add More Skill" to get started</p>
        </div>
      )}

      <div className='mt-3'>
        {skillsList.map((item, index) => (
          <div key={index} className='flex justify-between items-center mb-2 border rounded-lg p-3 gap-4'>
            <div className='flex-1'>
              <label className='text-xs text-gray-500'>Skill Name</label>
              <Input
                className={!item.name.trim() && item.name !== undefined
                  ? 'border-amber-300'
                  : ''}
                defaultValue={item.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <div className='flex flex-col items-center'>
              <label className='text-xs text-gray-500 mb-1'>Proficiency</label>
              <Rating
                style={{ maxWidth: 120 }}
                value={item.rating}
                onChange={(v) => handleChange(index, 'rating', v)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-between mt-4'>
        <div className='flex gap-2'>
          <Button variant="outline" onClick={AddNewSkills} className="text-primary">
            + Add More Skill
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
            className="text-primary"
            disabled={skillsList.length === 0}
          >
            - Remove
          </Button>
        </div>
        <Button
          disabled={loading}
          onClick={onSave}
          className={saved
            ? 'bg-green-500 hover:bg-green-600 transition-colors duration-300'
            : ''}
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

export default Skills