import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of summary for 3 experience level, Mid Level and Fresher level in 3-4 lines. Return ONLY a raw JSON array, no markdown, no explanation, no extra text. Example format: [{\"experience_level\":\"Fresher\",\"summary\":\"...\"},{\"experience_level\":\"Mid Level\",\"summary\":\"...\"},{\"experience_level\":\"Senior\",\"summary\":\"...\"}]"

function Summery({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState(resumeInfo?.Summary || '');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const params = useParams();
  const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();

  const wordCount = summery.trim() === '' ? 0 : summery.trim().split(/\s+/).length;
  const charCount = summery.length;

  useEffect(() => {
    if (summery) {
      setResumeInfo(prev => ({ ...prev, Summary: summery }));
    }
  }, [summery]);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.jobTitle) {
      toast('Please add a Job Title in Personal Details first');
      return;
    }
    setLoading(true);
    try {
      const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
      const result = await AIChatSession.sendMessage(PROMPT);
      const rawText = result.response.text();
      const cleaned = rawText.replace(/```json|```/g, '').trim();
      setAiGenerateSummeryList(JSON.parse(cleaned));
    } catch (e) {
      toast('Failed to generate summary');
      console.error(e);
    }
    setLoading(false);
  }

  const handleSuggestionClick = (item) => {
    setSummery(item?.summary);
    setResumeInfo(prev => ({ ...prev, Summary: item?.summary }));
    setSaved(false);
  }

  const onSave = (e) => {
    e.preventDefault();
    if (!summery.trim()) {
      toast('Please write or generate a summary first');
      return;
    }
    setLoading(true);
    GlobalApi.UpdateResumeDetail(params?.resumeId, { data: { Summary: summery } }).then(() => {
      enabledNext(true);
      setLoading(false);
      setSaved(true);
      toast('Details updated');
      setTimeout(() => setSaved(false), 2500);
    }, () => {
      setLoading(false);
    });
  }

  return (
    <div>
      <div className="form-section-card">
        <h2 className="form-section-title">Summary</h2>
        <p className="form-section-subtitle">Add a professional summary for your job title</p>

        <form className="mt-5" onSubmit={onSave}>
          <div className="flex justify-between items-center mb-2">
            <label className="form-label">Professional Summary</label>
            <Button
              variant="outline" type="button" size="sm"
              onClick={GenerateSummeryFromAI}
              className="border-primary text-primary flex gap-2 h-8 text-xs"
            >
              {loading
                ? <LoaderCircle className="animate-spin h-3.5 w-3.5" />
                : <><Brain className="h-3.5 w-3.5" /> Generate with AI</>
              }
            </Button>
          </div>

          <Textarea
            required
            value={summery}
            rows={5}
            className="form-input resize-none"
            placeholder="Write a short summary about your experience and goals..."
            onChange={(e) => {
              setSummery(e.target.value);
              setSaved(false);
              setResumeInfo(prev => ({ ...prev, Summary: e.target.value }));
            }}
          />

          <div className="flex justify-between mt-1.5 mb-3">
            <span className={`text-xs ${wordCount === 0 ? 'text-gray-300' : wordCount < 20 ? 'text-amber-500' : 'text-green-500'}`}>
              {wordCount} words{wordCount > 0 && wordCount < 20 ? ' — aim for 20+' : ''}
            </span>
            <span className="text-xs text-gray-300">{charCount} chars</span>
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

      {aiGeneratedSummeryList && (
        <div className="mt-4">
          <h3 className="form-section-title mb-1">AI Suggestions</h3>
          <p className="form-section-subtitle mb-3">Click any option to use it</p>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className="p-4 my-3 rounded-xl cursor-pointer border border-transparent
                hover:border-primary/20 hover:bg-primary/5 transition-all duration-150
                bg-white shadow-sm"
            >
              <span className="inline-block text-xs font-semibold text-primary bg-primary/10
                px-2.5 py-0.5 rounded-full mb-2">
                {item?.experience_level}
              </span>
              <p className="text-sm text-gray-600 leading-relaxed">{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Summery