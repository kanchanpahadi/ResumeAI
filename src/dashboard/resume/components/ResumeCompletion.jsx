import { useContext, useMemo } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { CheckCircle2, Circle } from 'lucide-react'

const CHECKS = [
  { label: 'First & last name',  fn: r => !!(r?.firstName && r?.lastName) },
  { label: 'Job title',          fn: r => !!r?.jobTitle },
  { label: 'Contact info',       fn: r => !!(r?.Phone && r?.email) },
  { label: 'Address',            fn: r => !!r?.address },
  { label: 'Summary written',    fn: r => !!(r?.Summary && r.Summary.length > 30) },
  { label: 'Experience added',   fn: r => !!(r?.Experience?.length > 0) },
  { label: 'Education added',    fn: r => !!(r?.Education?.length > 0) },
  { label: 'Skills added',       fn: r => !!(r?.Skills?.length > 0) },
]

function ResumeCompletion() {
  const { resumeInfo } = useContext(ResumeInfoContext)

  const { score, done } = useMemo(() => {
    const done  = CHECKS.filter(c => c.fn(resumeInfo)).length
    const score = Math.round((done / CHECKS.length) * 100)
    return { score, done }
  }, [resumeInfo])

  const color = score >= 80 ? '#10b981'
              : score >= 50 ? '#d97706'
              : '#ef4444'

  const label = score === 100 ? 'Ready to download!'
              : score >= 80   ? 'Almost there'
              : score >= 50   ? 'Good progress'
              : 'Getting started'

  return (
    <div
      className="rounded-xl p-4 mb-2 border"
      style={{
        background: `${color}08`,
        borderColor: `${color}25`,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Score row */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase" style={{ color }}>
            Resume Score
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">{label}</p>
        </div>
        <span
          className="text-2xl font-black tabular-nums leading-none"
          style={{ color }}
        >
          {score}<span className="text-base">%</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden mb-3">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${score}%`, background: color }}
        />
      </div>

      {/* Checklist */}
      <div className="space-y-1">
        {CHECKS.map((check, i) => {
          const passed = check.fn(resumeInfo)
          return (
            <div
              key={i}
              className="flex items-center gap-2"
            >
              {passed
                ? <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} />
                : <Circle      className="w-3.5 h-3.5 flex-shrink-0 text-gray-300" />
              }
              <span
                className="text-[11px]"
                style={{
                  color:  passed ? '#6b7280' : '#9ca3af',
                  // no strikethrough — just muted color for done items
                }}
              >
                {check.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Completion note */}
      {score === 100 && (
        <p className="text-[11px] font-semibold mt-3 text-center" style={{ color }}>
          All sections complete — your resume is ready.
        </p>
      )}
    </div>
  )
}

export default ResumeCompletion