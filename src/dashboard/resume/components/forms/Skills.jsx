import { Input } from '@/components/ui/input'
import { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle, CheckCircle2, Lightbulb, Plus, Minus } from 'lucide-react'
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
      toast('Fill in all skill names first');
      return;
    }
    setLoading(true);
    GlobalApi.UpdateResumeDetail(resumeId, {
      data: { Skills: skillsList.map(({ id, ...rest }) => rest) }
    }).then(() => {
      setLoading(false);
      setSaved(true);
      toast('Saved!');
      setTimeout(() => setSaved(false), 2500);
    }, () => {
      setLoading(false);
      toast('Something went wrong, try again');
    });
  }

  useEffect(() => {
    setResumeInfo(prev => ({ ...prev, Skills: skillsList }));
  }, [skillsList])

  return (
    <div className="form-section-card">
      <h2 className="form-section-title">Skills</h2>
      <p className="form-section-subtitle">Add the skills most relevant to the role you're applying for</p>

      {skillsList.length === 0 && (
        <div className="form-empty-state">
          <Lightbulb className="h-7 w-7 text-gray-300 mb-2" />
          <p className="text-sm text-gray-400">No skills yet</p>
          <p className="text-xs text-gray-300 mt-1">Click "+ Add Skill" below</p>
        </div>
      )}

      <div className="mt-3">
        {skillsList.map((item, index) => (
          <div key={index} className="flex justify-between items-center mb-2 border border-gray-100 rounded-lg p-3 gap-4 bg-white">
            <div className="flex-1">
              <label className="form-label">Skill</label>
              <Input
                className={`form-input${!item.name.trim() && item.name !== undefined ? ' border-amber-300' : ''}`}
                defaultValue={item.name}
                placeholder="e.g. React, Figma, SQL..."
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center gap-1">
              <label className="form-label mb-0">Level</label>
              <Rating
                style={{ maxWidth: 110 }}
                value={item.rating}
                onChange={(v) => handleChange(index, 'rating', v)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="form-footer">
        <div className="flex gap-2">
          <Button variant="outline" onClick={AddNewSkills}
            className="text-primary border-primary/30 hover:bg-primary/5 gap-1.5 text-sm">
            <Plus className="h-3.5 w-3.5" /> Add Skill
          </Button>
          <Button variant="outline" onClick={RemoveSkills}
            disabled={skillsList.length === 0}
            className="text-gray-500 border-gray-200 hover:bg-gray-50 gap-1.5 text-sm">
            <Minus className="h-3.5 w-3.5" /> Remove
          </Button>
        </div>
        <Button
          disabled={loading}
          onClick={onSave}
          className={saved ? 'btn-saved' : ''}
        >
          {loading
            ? <LoaderCircle className="animate-spin h-4 w-4" />
            : saved
              ? <><CheckCircle2 className="h-4 w-4 mr-1" /> Saved!</>
              : 'Save'
          }
        </Button>
      </div>
    </div>
  )
}

export default Skills