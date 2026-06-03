import { useState, useContext } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Sparkles, Loader2, ExternalLink, MapPin, Building2, DollarSign, RefreshCw } from 'lucide-react'

const GROQ_KEY     = import.meta.env.VITE_GROQ_API_KEY
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY

async function getJobQueries(resumeInfo) {
  const skills   = (resumeInfo?.Skills     || []).map(s => s.name).join(', ')
  const exp      = (resumeInfo?.Experience || []).map(e => e.title).join(', ')
  const jobTitle = resumeInfo?.jobTitle || ''
  const summary  = resumeInfo?.Summary  || ''

  const prompt = `Based on this resume, return ONLY a JSON array of 3 job search queries (no markdown):
["query1", "query2", "query3"]

Resume:
- Job Title: ${jobTitle}
- Summary: ${summary}
- Skills: ${skills}
- Experience: ${exp}

Make queries specific, e.g. "react frontend developer", "node.js backend engineer".`

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + GROQ_KEY },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
      max_tokens: 200,
    }),
  })
  const data  = await res.json()
  const text  = data.choices?.[0]?.message?.content || ''
  const match = text.match(/\[[\s\S]*\]/)
  if (!match) throw new Error('Could not generate job queries')
  return JSON.parse(match[0])
}

async function fetchRealJobs(query) {
  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&num_pages=1&page=1`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'jsearch.p.rapidapi.com',
      'x-rapidapi-key': RAPIDAPI_KEY,
    },
  })
  const data = await res.json()
  return (data.data || []).slice(0, 3).map(job => ({
    title:       job.job_title,
    company:     job.employer_name,
    location:    [job.job_city, job.job_state, job.job_country].filter(Boolean).join(', '),
    type:        job.job_employment_type || 'Full-time',
    salary:      job.job_min_salary && job.job_max_salary
                   ? `$${Math.round(job.job_min_salary / 1000)}k – $${Math.round(job.job_max_salary / 1000)}k`
                   : null,
    description: job.job_description?.slice(0, 180) + '…',
    applyUrl:    job.job_apply_link,
    logo:        job.employer_logo,
    posted:      job.job_posted_at_datetime_utc
                   ? new Date(job.job_posted_at_datetime_utc).toLocaleDateString()
                   : null,
  }))
}

function ResumeUploadAndJobs() {
  const { resumeInfo } = useContext(ResumeInfoContext)
  const [status, setStatus] = useState('idle')
  const [jobs,   setJobs]   = useState([])
  const [error,  setError]  = useState('')
  const [step,   setStep]   = useState('')

  const analyze = async () => {
    setStatus('loading')
    setJobs([])
    setError('')
    try {
      setStep('Analysing your resume…')
      const queries = await getJobQueries(resumeInfo)
      setStep('Finding current job listings…')
      const results = await Promise.all(queries.map(q => fetchRealJobs(q)))
      const allJobs = results.flat()
      if (allJobs.length === 0) throw new Error('No jobs found for your profile')
      setJobs(allJobs)
      setStatus('done')
    } catch (e) {
      setError(e.message || 'Something went wrong.')
      setStatus('error')
    }
  }

  return (
    <div
      className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Header */}
      <h2 className="font-bold text-lg mb-1">Job Matches</h2>
      <p className="text-gray-500 text-sm mb-5">
        AI picks the best searches from your resume and pulls live job listings.
      </p>

      {/* Idle / Error */}
      {(status === 'idle' || status === 'error') && (
        <div>
          <button
            onClick={analyze}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0d0d0d] text-white rounded-lg font-semibold text-sm hover:bg-[#2a6ef5] transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Find Jobs for Me
          </button>
          {status === 'error' && (
            <p className="text-center text-xs text-red-400 mt-3">{error} — Try again.</p>
          )}
        </div>
      )}

      {/* Loading */}
      {status === 'loading' && (
        <div className="text-center py-10">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#0d0d0d] mb-1">{step}</p>
          <p className="text-xs text-gray-400">This takes just a few seconds</p>
        </div>
      )}

      {/* Results */}
      {status === 'done' && (
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">
            {jobs.length} jobs found
          </p>

          <div className="flex flex-col gap-3">
            {jobs.map((job, i) => (
              <div
                key={i}
                className="border border-[#f0ede6] rounded-xl p-4 bg-white hover:shadow-md transition-shadow"
              >
                {/* Job header */}
                <div className="flex gap-3 mb-2 items-start">
                  {job.logo && (
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="w-9 h-9 rounded-lg object-contain border border-[#f0ede6] flex-shrink-0"
                      onError={e => (e.target.style.display = 'none')}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-[#0d0d0d] leading-tight">{job.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> {job.company}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  {job.location && (
                    <span className="flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                      <MapPin className="w-2.5 h-2.5" /> {job.location}
                    </span>
                  )}
                  {job.type && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-500">
                      {job.type}
                    </span>
                  )}
                  {job.salary && (
                    <span className="flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-green-50 text-green-600 font-semibold">
                      <DollarSign className="w-2.5 h-2.5" /> {job.salary}
                    </span>
                  )}
                  {job.posted && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600">
                      {job.posted}
                    </span>
                  )}
                </div>

                {/* Description */}
                {job.description && (
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">{job.description}</p>
                )}

                {/* Apply */}
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-full bg-[#0d0d0d] text-white hover:bg-[#2a6ef5] transition-colors no-underline"
                >
                  Apply Now <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>

          <button
            onClick={analyze}
            className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-[#e0ddd6] bg-white text-xs font-medium text-gray-500 hover:border-[#0d0d0d] hover:text-[#0d0d0d] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
        </div>
      )}
    </div>
  )
}

export default ResumeUploadAndJobs