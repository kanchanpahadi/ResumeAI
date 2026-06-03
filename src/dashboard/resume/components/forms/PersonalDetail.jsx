import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle, CheckCircle2 } from 'lucide-react';
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

const FIELDS = [
  { name: 'firstName', label: 'First Name', colSpan: 1 },
  { name: 'lastName',  label: 'Last Name',  colSpan: 1 },
  { name: 'jobTitle',  label: 'Job Title',  colSpan: 2 },
  { name: 'address',   label: 'Address',    colSpan: 2 },
  { name: 'Phone',     label: 'Phone',      colSpan: 1 },
  { name: 'email',     label: 'Email',      colSpan: 1 },
]

function PersonalDetail({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    enabledNext(false);
    setSaved(false);
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setResumeInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }));
  }

  const validate = () => {
    const newErrors = {};
    FIELDS.forEach(({ name }) => {
      const val = formData[name] ?? resumeInfo?.[name] ?? '';
      if (!val.toString().trim()) newErrors[name] = true;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const onSave = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast('Please fill in all required fields');
      return;
    }
    setLoading(true);
    GlobalApi.UpdateResumeDetail(params?.resumeId, { data: formData }).then(() => {
      enabledNext(true);
      setLoading(false);
      setSaved(true);
      toast('Details updated');
      setTimeout(() => setSaved(false), 2500);
    }, () => {
      setLoading(false);
      toast('Server error, please try again');
    });
  }

  return (
    <div className="form-section-card">
      <h2 className="form-section-title">Personal Details</h2>
      <p className="form-section-subtitle">Get started with your basic information</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          {FIELDS.map(({ name, label, colSpan }) => (
            <div key={name} className={colSpan === 2 ? 'col-span-2' : ''}>
              <label className="form-label">
                {label}
                <span className="text-red-400 ml-0.5">*</span>
              </label>
              <Input
                name={name}
                defaultValue={resumeInfo?.[name]}
                onChange={handleInputChange}
                className={`form-input${errors[name] ? ' border-red-400 focus-visible:ring-red-300' : ''}`}
              />
              {errors[name] && (
                <p className="form-error">{label} is required</p>
              )}
            </div>
          ))}
        </div>

        <div className="form-actions">
          <Button
            type="submit"
            disabled={loading}
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
      </form>
    </div>
  )
}

export default PersonalDetail