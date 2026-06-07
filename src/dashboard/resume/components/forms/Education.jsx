import { Input } from '@/components/ui/input'
import { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoaderCircle, CheckCircle2, GraduationCap, Sparkles } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import RichTextEditor from '../RichTextEditor'
import { AIChatSession } from './../../../../../service/AIModal';

function Education() {
  const [educationList, setEducationList] = useState([])
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [aiLoading, setAiLoading] = useState(null);
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

  const generateDescription = async (index) => {
    const item = educationList[index];
    if (!item.universityName.trim() || !item.degree.trim()) {
      toast('Please fill in University and Degree first');
      return;
    }
    setAiLoading(index);
    try {
      const prompt = `Degree: ${item.degree}${item.major ? `, Major: ${item.major}` : ''}, University: ${item.universityName}. Write ONLY 3-4 bullet points as HTML <ul><li> list for a resume education description. Focus on relevant coursework, achievements and skills. Return ONLY the HTML <ul><li> list, no intro, no explanation. Start directly with <ul>.`;

      const result = await AIChatSession.sendMessage(prompt);
      const raw = result.response.text();
      const match = raw.match(/<ul[\s\S]*<\/ul>/i);
      const cleaned = match ? match[0] : raw.replace(/```html?|```/gi, '').trim();
      handleChange(index, 'description', cleaned);
      toast('Description generated!');
    } catch {
      toast('Failed to generate, try again');
    }
    setAiLoading(null);
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
                  value={item.universityName}
                  onChange={(e) => handleChange(index, 'universityName', e.target.value)}
                />
              </div>

              <div>
                <label className='text-xs text-gray-500'>Degree <span className='text-red-400'>*</span></label>
                <Input
                  className={!item.degree.trim() ? 'border-amber-300' : ''}
                  value={item.degree}
                  onChange={(e) => handleChange(index, 'degree', e.target.value)}
                />
              </div>

              <div>
                <label className='text-xs text-gray-500'>Major / Field of Study</label>
                <Input
                  value={item.major}
                  onChange={(e) => handleChange(index, 'major', e.target.value)}
                />
              </div>

              <div>
                <label className='text-xs text-gray-500'>Start Date</label>
                <Input
                  type='date'
                  value={item.startDate}
                  onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                />
              </div>

              <div>
                <label className='text-xs text-gray-500'>End Date</label>
                <Input
                  type='date'
                  value={item.endDate}
                  onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                />
              </div>

              <div className='col-span-2'>
                <div className='flex justify-between items-center mb-1'>
                  <label className='text-xs text-gray-500'>Description</label>
                  <Button
                    variant='outline'
                    size='sm'
                    type='button'
                    disabled={aiLoading === index}
                    onClick={() => generateDescription(index)}
                    className='text-xs h-7 px-2 text-primary gap-1'
                  >
                    {aiLoading === index
                      ? <><LoaderCircle className='h-3 w-3 animate-spin' /> Generating...</>
                      : <><Sparkles className='h-3 w-3' /> Generate with AI</>
                    }
                  </Button>
                </div>
                <RichTextEditor
                  index={index}
                  label=''
                  hideAI={true}
                  defaultValue={item?.description}
                  onRichTextEditorChange={(value) =>
                    handleChange(index, 'description', value)
                  }
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