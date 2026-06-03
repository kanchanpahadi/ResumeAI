import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'
import { Download, Share2, CheckCircle2, ArrowLeft } from 'lucide-react'

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState()
  const { resumeId } = useParams()
  const wrapRef = useRef(null)

  useEffect(() => {
    GetResumeInfo()
  }, [])

  // Scoped background via ref — does NOT touch document.body
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const prev = el.style.background
    el.style.background = '#f5f0e8'
    return () => { el.style.background = prev }
  }, [])

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then(resp => {
      setResumeInfo(resp.data.data)
    })
  }

  const HandleDownload = () => {
    window.print()
  }

  const themeColor = resumeInfo?.themecolor || '#2a6ef5'

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        #no-print { font-family: 'DM Sans', sans-serif; }

        @media print {
          #no-print    { display: none !important; }
          #view-wrap   { background: white !important; min-height: unset !important; }
          #print-area  { width: 100%; margin: 0; padding: 0; box-shadow: none !important; border-radius: 0 !important; }
        }
      `}</style>

      {/*
        ref={wrapRef} — scopes the background to this element only.
        No body mutation, no bleed into other routes.
      */}
      <div ref={wrapRef} id="view-wrap" style={{ minHeight: '100vh', background: '#f5f0e8' }}>

        {/* Top bar (hidden on print) */}
        <div id="no-print">
          <Header />

          {/* Hero banner */}
          <div
            className="mt-16 py-10 px-6 text-center relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)' }}
          >
            {/* Accent line using theme color */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: themeColor }}
            />

            <div className="flex items-center justify-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4" style={{ color: themeColor }} />
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: themeColor }}
              >
                Resume Ready
              </span>
            </div>

            <h1
              className="text-3xl md:text-4xl font-bold text-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Resume is Complete
            </h1>
            <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
              Download as PDF or share a direct link with recruiters.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={HandleDownload}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
                style={{ background: themeColor, border: 'none' }}
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>

              <RWebShare
                data={{
                  text:  'Here is my resume — open the URL to view it.',
                  url:   import.meta.env.VITE_BASE_URL + '/my-resume/' + resumeId + '/view',
                  title: `${resumeInfo?.firstName || ''} ${resumeInfo?.lastName || ''} Resume`,
                }}
              >
                <Button
                  variant="outline"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border-white/20 text-white bg-white/10 hover:bg-white/20 transition-all hover:scale-105"
                >
                  <Share2 className="w-4 h-4" />
                  Share Link
                </Button>
              </RWebShare>

              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Tips strip */}
          <div className="bg-white border-b border-gray-100 py-2.5 px-6">
            <p className="text-center text-xs text-gray-400">
              For best results: use Chrome or Edge · enable{' '}
              <span className="font-medium text-gray-500">Background graphics</span>{' '}
              in print settings · save as PDF, not "Open PDF Preview"
            </p>
          </div>
        </div>

        {/* Resume preview (visible + printed) */}
        <div className="py-10 px-4 md:px-10 lg:px-24 xl:px-48">
          <div id="print-area" className="bg-white rounded shadow-2xl overflow-hidden">
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume