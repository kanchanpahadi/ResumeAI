import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState, useEffect } from 'react'
import {
  Editor, EditorProvider,
  BtnBold, BtnBulletList, BtnItalic, BtnLink,
  BtnNumberedList, BtnStrikeThrough, BtnUnderline,
  Separator, Toolbar
} from 'react-simple-wysiwyg'
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT = 'position title: {positionTitle}, give me ONLY 5-7 bullet points for experience in a resume. Return ONLY the HTML <ul><li> list, no intro text, no headings, no explanation, no JSON. Start directly with <ul>.'

function RichTextEditor({ onRichTextEditorChange, index, defaultValue, label, hideAI }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  setValue(defaultValue);
}, [defaultValue]);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.Experience[index]?.title) {
      toast('Please add a Position Title first');
      return;
    }
    setLoading(true);
    try {
      const prompt = PROMPT.replace('{positionTitle}', resumeInfo.Experience[index].title);
      const result = await AIChatSession.sendMessage(prompt);
      const raw = result.response.text();
      const match = raw.match(/<ul[\s\S]*<\/ul>/i);
      const cleaned = match ? match[0] : raw.replace(/```html?|```/gi, '').trim();
      setValue(cleaned);
      onRichTextEditorChange(cleaned);
    } catch (e) {
      toast('Failed to generate summary');
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>{label ?? 'Work Summary'}</label>
        {!hideAI && (
          <Button variant="outline" size="sm"
            onClick={GenerateSummeryFromAI}
            disabled={loading}
            className="flex gap-2 border-primary text-primary">
            {loading
              ? <LoaderCircle className='animate-spin h-4 w-4' />
              : <><Brain className='h-4 w-4' /> Generate from AI</>
            }
          </Button>
        )}
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e) => {
          setValue(e.target.value);
          onRichTextEditorChange(e.target.value);
        }}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor