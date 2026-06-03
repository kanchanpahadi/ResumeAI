import { Loader2, PlusSquare, Upload, FileText, } from 'lucide-react'
import  { useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { v4 as uuidv4 } from 'uuid'
import GlobalApi from './../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY

async function callGroq(prompt) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GROQ_KEY
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
      max_tokens: 2000
    })
  })
  const data = await res.json()
  const text = data.choices?.[0]?.message?.content || ''
  const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
  const match = cleaned.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('No JSON found')
  return JSON.parse(match[0])
}

async function extractPdfText(file) {
  const pdfjsLib = await import('pdfjs-dist')
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let fullText = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    fullText += content.items.map(item => item.str).join(' ') + '\n'
  }
  return fullText
}

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false)
  const [step, setStep]             = useState('choice')
  const [resumeTitle, setResumeTitle] = useState('')
  const [dragging, setDragging]     = useState(false)
  const [statusMsg, setStatusMsg]   = useState('')
  const [error, setError]           = useState('')
  const { user } = useUser()
  const navigation = useNavigate()
  const inputRef = useRef()

  const reset = () => {
    setStep('choice')
    setResumeTitle('')
    setDragging(false)
    setStatusMsg('')
    setError('')
  }

  const close = () => {
    setOpenDialog(false)
    setTimeout(reset, 300)
  }

  /* ── Create blank resume ── */
  const onCreate = async () => {
    if (!resumeTitle.trim()) return
    setStep('saving')
    const uuid = uuidv4()
    const data = {
      data: {
        Title: resumeTitle,
        resumeId: uuid,
        UserEmail: user?.primaryEmailAddress?.emailAddress,
        UserName: user?.fullName
      }
    }
    try {
      const resp = await GlobalApi.CreateNewResume(data)
      navigation('/dashboard/resume/' + resp.data.data.documentId + '/edit')
    } catch (e) {
      setError('Failed to create resume. Try again.')
      setStep('scratch')
    }
  }

  /* ── Upload + parse PDF ── */
  const processPdf = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.')
      return
    }
    if (!resumeTitle.trim()) {
      setError('Please enter a resume title first.')
      return
    }
    setError('')
    setStep('parsing')
    setStatusMsg('Reading your PDF…')

    try {
      const rawText = await extractPdfText(file)

      setStatusMsg('AI is extracting your details…')

      const prompt = `You are a resume parser. Extract all information from this resume text and return ONLY a JSON object with these exact keys (no markdown, no explanation):
{
  "firstName": "",
  "lastName": "",
  "jobTitle": "",
  "address": "",
  "Phone": "",
  "email": "",
  "Summary": "",
  "Experience": [{"title":"","companyName":"","city":"","state":"","startDate":"","endDate":"","currentlyWorking":false,"workSummery":""}],
  "Education": [{"universityName":"","degree":"","major":"","startDate":"","endDate":"","description":""}],
  "Skills": [{"name":"","rating":4}]
}

Resume text:
${rawText.slice(0, 4000)}`

      const parsed = await callGroq(prompt)

      setStatusMsg('Creating your resume…')

      const uuid = uuidv4()
      const createData = {
        data: {
          Title: resumeTitle,
          resumeId: uuid,
          UserEmail: user?.primaryEmailAddress?.emailAddress,
          UserName: user?.fullName
        }
      }
      const resp = await GlobalApi.CreateNewResume(createData)
      const docId = resp.data.data.documentId

      await GlobalApi.UpdateResumeDetail(docId, {
        data: {
          firstName:  parsed.firstName  || '',
          lastName:   parsed.lastName   || '',
          jobTitle:   parsed.jobTitle   || '',
          address:    parsed.address    || '',
          Phone:      parsed.Phone      || '',
          email:      parsed.email      || '',
          Summary:    parsed.Summary    || '',
          Experience: parsed.Experience || [],
          Education:  parsed.Education  || [],
          Skills:     parsed.Skills     || [],
        }
      })

      navigation('/dashboard/resume/' + docId + '/edit')
    } catch (e) {
      console.error(e)
      setError('Could not parse PDF. Try again or create from scratch.')
      setStep('upload')
      setStatusMsg('')
    }
  }

  const onDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    processPdf(e.dataTransfer.files[0])
  }

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ar-choice-card {
          border: 1.5px solid #e8e5de;
          border-radius: 16px;
          padding: 1.6rem 1.4rem;
          cursor: pointer;
          transition: all 0.2s;
          background: white;
          text-align: left;
          width: 100%;
        }
        .ar-choice-card:hover {
          border-color: #0d0d0d;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }
        .ar-choice-card.upload:hover { border-color: #2a6ef5; }

        .ar-icon-wrap {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 0.9rem;
        }
        .ar-title {
          font-size: 0.95rem; font-weight: 700; color: #0d0d0d;
          margin-bottom: 0.3rem; font-family: 'DM Sans', sans-serif;
        }
        .ar-desc {
          font-size: 0.76rem; color: #888; line-height: 1.5;
          font-family: 'DM Sans', sans-serif;
        }

        .ar-input {
          width: 100%; border: 1.5px solid #e8e5de;
          border-radius: 10px; padding: 0.6rem 0.9rem;
          font-size: 0.85rem; font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .ar-input:focus { border-color: #2a6ef5; }

        .ar-btn {
          display: inline-flex; align-items: center; justify-content: center;
          gap: 0.4rem; padding: 0.6rem 1.3rem;
          border-radius: 100px; border: none; cursor: pointer;
          font-size: 0.82rem; font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .ar-btn.primary { background: #0d0d0d; color: white; }
        .ar-btn.primary:hover { background: #2a6ef5; }
        .ar-btn.primary:disabled { background: #d1d5db; cursor: not-allowed; }
        .ar-btn.ghost { background: transparent; color: #888; border: 1px solid #e8e5de; }
        .ar-btn.ghost:hover { border-color: #0d0d0d; color: #0d0d0d; }

        .ar-drop-zone {
          border: 2px dashed #e0ddd6;
          border-radius: 14px;
          padding: 2.5rem 1.5rem;
          text-align: center;
          cursor: pointer;
          background: #faf8f3;
          transition: all 0.2s;
        }
        .ar-drop-zone.drag { border-color: #2a6ef5; background: #eff6ff; }
        .ar-drop-zone:hover { border-color: #aaa; }

        @keyframes ar-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .ar-spin { animation: ar-spin 1s linear infinite; }

        .add-card {
          padding: 3.5rem 1rem;
          border: 2px dashed #e0ddd6;
          display: flex; align-items: center; justify-content: center;
          background: #faf8f3; border-radius: 16px;
          height: 280px; cursor: pointer;
          transition: all 0.22s;
        }
        .add-card:hover {
          border-color: #2a6ef5; background: #eff6ff;
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(42,110,245,0.1);
        }
      `}</style>

      {/* ── Dashboard card ── */}
      <div className="add-card" onClick={() => setOpenDialog(true)}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: '#0d0d0d', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 0.8rem'
          }}>
            <PlusSquare size={22} color="white" />
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: '#0d0d0d' }}>
            New Resume
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', color: '#aaa', marginTop: '0.2rem' }}>
            Create or import
          </div>
        </div>
      </div>

      {/* ── Dialog ── */}
      <Dialog open={openDialog} onOpenChange={(val) => { if (!val) close() }}>
        <DialogContent
          style={{ fontFamily: "'DM Sans', sans-serif", borderRadius: 20, padding: 0, overflow: 'hidden', maxWidth: 440, border: 'none' }}
          onInteractOutside={close}
        >
          {/* Header */}
          <div style={{ padding: '1.6rem 1.6rem 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 700, color: '#0d0d0d', margin: 0 }}>
                {step === 'choice'  ? 'New Resume'           :
                 step === 'scratch' ? 'Create from Scratch'  :
                 step === 'upload'  ? 'Import PDF Resume'    :
                 step === 'parsing' ? 'Importing…'           :
                 'Creating…'}
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.3rem', marginBottom: 0 }}>
                {step === 'choice'  ? 'How would you like to start?' :
                 step === 'scratch' ? 'Give your resume a title to begin.' :
                 step === 'upload'  ? 'Upload your existing PDF resume.' :
                 step === 'parsing' ? statusMsg :
                 'Setting things up…'}
              </p>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: '1.4rem 1.6rem 1.6rem' }}>

            {/* ── CHOICE ── */}
            {step === 'choice' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button className="ar-choice-card" onClick={() => setStep('scratch')}>
                  <div className="ar-icon-wrap" style={{ background: '#0d0d0d' }}>
                    <FileText size={20} color="white" />
                  </div>
                  <div className="ar-title">Create from Scratch</div>
                  <div className="ar-desc">Start with a blank resume and fill in your details step by step with AI assistance.</div>
                </button>

                <button className="ar-choice-card upload" onClick={() => setStep('upload')}>
                  <div className="ar-icon-wrap" style={{ background: '#eff6ff' }}>
                    <Upload size={20} color="#2a6ef5" />
                  </div>
                  <div className="ar-title">Import Existing Resume</div>
                  <div className="ar-desc">Upload your PDF resume — AI reads it and auto-fills all your details instantly.</div>
                </button>
              </div>
            )}

            {/* ── FROM SCRATCH ── */}
            {step === 'scratch' && (
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                  Resume Title
                </label>
                <input
                  className="ar-input"
                  placeholder="e.g. Full Stack Developer Resume"
                  value={resumeTitle}
                  onChange={e => setResumeTitle(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && resumeTitle.trim() && onCreate()}
                  autoFocus
                />
                {error && <p style={{ fontSize: '0.73rem', color: '#ef4444', marginTop: '0.5rem' }}>{error}</p>}
                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.2rem', justifyContent: 'flex-end' }}>
                  <button className="ar-btn ghost" onClick={() => setStep('choice')}>← Back</button>
                  <button className="ar-btn primary" disabled={!resumeTitle.trim()} onClick={onCreate}>
                    Create Resume →
                  </button>
                </div>
              </div>
            )}

            {/* ── UPLOAD ── */}
            {step === 'upload' && (
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#555', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                  Resume Title
                </label>
                <input
                  className="ar-input"
                  placeholder="e.g. My Imported Resume"
                  value={resumeTitle}
                  onChange={e => setResumeTitle(e.target.value)}
                  style={{ marginBottom: '1rem' }}
                />

                <div
                  className={`ar-drop-zone ${dragging ? 'drag' : ''}`}
                  onDragOver={e => { e.preventDefault(); setDragging(true) }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  onClick={() => resumeTitle.trim() ? inputRef.current.click() : setError('Enter a title first.')}
                >
                  <input ref={inputRef} type="file" accept=".pdf" style={{ display: 'none' }} onChange={e => processPdf(e.target.files[0])} />
                  <Upload size={28} style={{ color: '#aaa', margin: '0 auto 0.7rem', display: 'block' }} />
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0d0d0d', marginBottom: '0.25rem' }}>
                    Drop your PDF here
                  </div>
                  <div style={{ fontSize: '0.73rem', color: '#aaa' }}>or click to browse</div>
                </div>

                {error && <p style={{ fontSize: '0.73rem', color: '#ef4444', marginTop: '0.6rem' }}>{error}</p>}

                <div style={{ marginTop: '1rem' }}>
                  <button className="ar-btn ghost" onClick={() => { setStep('choice'); setError('') }}>← Back</button>
                </div>
              </div>
            )}

            {/* ── PARSING / SAVING ── */}
            {(step === 'parsing' || step === 'saving') && (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem' }}>
                  <Loader2 size={26} color="#2a6ef5" className="ar-spin" style={{ animation: 'ar-spin 1s linear infinite' }} />
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0d0d0d', marginBottom: '0.4rem' }}>
                  {statusMsg || 'Creating your resume…'}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#aaa' }}>
                  This takes just a few seconds
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddResume