import React, { useContext, useState } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Sparkles, Copy, Check, Briefcase, Mail, Loader2, FileText, PenLine } from 'lucide-react'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

async function callGroq(prompt) {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  })
  const data = await res.json()
  return data.choices?.[0]?.message?.content || ''
}

async function extractJobDetails(jdText) {
  const prompt = `Extract the job title and company name from this job description.
Return ONLY a JSON object like: {"jobTitle": "...", "company": "..."}
No explanation, no markdown, just the JSON.

Job Description:
${jdText.slice(0, 3000)}`
  const raw = await callGroq(prompt)
  try {
    const match = raw.match(/\{[\s\S]*?\}/)
    return match ? JSON.parse(match[0]) : { jobTitle: '', company: '' }
  } catch {
    return { jobTitle: '', company: '' }
  }
}

async function generateCoverLetter({ name, jobTitle, company, experience, skills, summary, jdText }) {
  const jdSection = jdText
    ? `\nJob Description provided:\n${jdText.slice(0, 2000)}\nTailor the letter to match the requirements in this job description.`
    : ''

  const prompt = `Write a professional cover letter for:
Name: ${name || 'the applicant'}
Applying for: ${jobTitle} at ${company}
Experience: ${experience || 'not specified'}
Key Skills: ${skills || 'not specified'}
Summary: ${summary || 'not specified'}
${jdSection}

Write a compelling 3-paragraph cover letter. Be specific, professional, and enthusiastic. Do not include date/address headers. Start directly with "Dear Hiring Manager,"`

  return await callGroq(prompt)
}

export default function AiPanel() {
  const { resumeInfo } = useContext(ResumeInfoContext)
  const [mode, setMode]         = useState('manual')
  const [jdText, setJdText]     = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany]   = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [loading, setLoading]   = useState(false)
  const [extracting, setExtracting] = useState(false)
  const [copied, setCopied]     = useState(false)

  const experience = resumeInfo?.Experience
    ?.map(e => `${e.title} at ${e.companyName}`)
    .join(', ')
  const skills = resumeInfo?.Skills?.map(s => s.name).join(', ')
  const name   = `${resumeInfo?.firstName || ''} ${resumeInfo?.lastName || ''}`.trim()
  const summary = resumeInfo?.Summary

  const handleExtractFromJD = async () => {
    if (!jdText.trim()) return
    setExtracting(true)
    try {
      const extracted = await extractJobDetails(jdText)
      if (extracted.jobTitle) setJobTitle(extracted.jobTitle)
      if (extracted.company)  setCompany(extracted.company)
    } finally {
      setExtracting(false)
    }
  }

  const handleGenerate = async () => {
    if (!jobTitle || !company) return
    setLoading(true)
    try {
      const letter = await generateCoverLetter({
        name, jobTitle, company, experience, skills, summary,
        jdText: mode === 'paste' ? jdText : '',
      })
      setCoverLetter(letter)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <Mail className="w-4 h-4 text-primary" />
        <h2 className="font-bold text-lg">Cover Letter</h2>
      </div>
      <p className="text-gray-500 text-sm mb-5">
        Generate a tailored cover letter from your resume details.
      </p>

      {/* Mode Toggle */}
      <div className="flex rounded-lg border overflow-hidden text-sm font-medium mb-4">
        <button
          onClick={() => setMode('manual')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 transition-colors ${
            mode === 'manual'
              ? 'bg-[#0d0d0d] text-white'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          <PenLine className="w-3.5 h-3.5" />
          Manual
        </button>
        <button
          onClick={() => setMode('paste')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 transition-colors ${
            mode === 'paste'
              ? 'bg-[#0d0d0d] text-white'
              : 'bg-white text-gray-500 hover:bg-gray-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Paste JD
        </button>
      </div>

      {/* Paste JD mode */}
      {mode === 'paste' && (
        <div className="mb-4 space-y-2">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Job Description
          </label>
          <textarea
            className="w-full border rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0d0d0d]/20"
            rows={5}
            placeholder="Paste the full job description — AI will auto-extract company name and job title."
            value={jdText}
            onChange={e => setJdText(e.target.value)}
          />
          <button
            onClick={handleExtractFromJD}
            disabled={!jdText.trim() || extracting}
            className="flex items-center gap-2 px-4 py-1.5 bg-[#f3f4f6] text-[#0d0d0d] text-xs font-semibold rounded-lg hover:bg-[#e8e5de] disabled:opacity-50 transition-colors"
          >
            {extracting
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : <Sparkles className="w-3.5 h-3.5" />}
            {extracting ? 'Extracting…' : 'Auto-Extract Details'}
          </button>
        </div>
      )}

      {/* Fields */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-1">
            Job Title
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d0d0d]/20"
            placeholder="e.g. Frontend Developer"
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-400 block mb-1">
            Company
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d0d0d]/20"
            placeholder="e.g. Google"
            value={company}
            onChange={e => setCompany(e.target.value)}
          />
        </div>
      </div>

      {/* Auto-fill notice */}
      {(resumeInfo?.Experience?.length > 0 || resumeInfo?.Skills?.length > 0) && (
        <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
          <Briefcase className="w-3 h-3" />
          Using your resume experience and skills to personalise the letter.
        </p>
      )}

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={!jobTitle || !company || loading}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0d0d0d] text-white rounded-lg font-semibold text-sm hover:bg-[#2a6ef5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {loading
          ? <Loader2 className="w-4 h-4 animate-spin" />
          : <Sparkles className="w-4 h-4" />}
        {loading ? 'Generating…' : 'Generate Cover Letter'}
      </button>

      {/* Output */}
      {coverLetter && (
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Cover Letter
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copied
                ? <><Check className="w-3 h-3 text-green-500" /> Copied!</>
                : <><Copy className="w-3 h-3" /> Copy</>}
            </button>
          </div>
          <div className="border rounded-lg p-4 text-sm text-gray-700 whitespace-pre-wrap bg-[#faf8f3] max-h-72 overflow-y-auto leading-relaxed">
            {coverLetter}
          </div>
        </div>
      )}
    </div>
  )
}