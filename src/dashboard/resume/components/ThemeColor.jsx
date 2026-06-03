import React, { useContext, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { Palette, Check, X } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const COLOR_PALETTE = [
  { label: 'Ink',       hex: '#0d0d0d' },
  { label: 'Ocean',     hex: '#2a6ef5' },
  { label: 'Violet',    hex: '#7b4ff5' },
  { label: 'Coral',     hex: '#e8401c' },
  { label: 'Gold',      hex: '#d4a843' },
  { label: 'Teal',      hex: '#1d9e75' },
  { label: 'Rose',      hex: '#d4547a' },
  { label: 'Slate',     hex: '#475569' },
  { label: 'Crimson',   hex: '#c0392b' },
  { label: 'Indigo',    hex: '#4338ca' },
  { label: 'Emerald',   hex: '#059669' },
  { label: 'Amber',     hex: '#d97706' },
  { label: 'Sky',       hex: '#0284c7' },
  { label: 'Fuchsia',   hex: '#a21caf' },
  { label: 'Sienna',    hex: '#92400e' },
]

function ThemeColor() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { resumeId } = useParams()
  const [selectedColor, setSelectedColor] = useState(
    resumeInfo?.themeColor || resumeInfo?.themecolor || null
  )
  const [saving, setSaving] = useState(false)

  const onColorSelect = (color) => {
    setSelectedColor(color)
    setResumeInfo(prev => ({ ...prev, themeColor: color, themecolor: color }))
    setSaving(true)
    GlobalApi.UpdateResumeDetail(resumeId, { data: { themecolor: color } })
      .then(() => { toast('Theme updated!'); setSaving(false) })
      .catch(() => setSaving(false))
  }

  const onClearTheme = () => {
    setSelectedColor(null)
    setResumeInfo(prev => ({ ...prev, themeColor: null, themecolor: null }))
    GlobalApi.UpdateResumeDetail(resumeId, { data: { themecolor: null } })
      .then(() => toast('Theme cleared'))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline" size="sm"
          className="flex items-center gap-2 rounded-full border border-black/10 px-4 h-9 text-sm font-medium hover:bg-[#0d0d0d] hover:text-white hover:border-transparent transition-all"
        >
          {selectedColor
            ? <span className="w-4 h-4 rounded-full border border-white shadow-sm flex-shrink-0" style={{ background: selectedColor }} />
            : <Palette size={15} />
          }
          Theme
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className="w-72 p-0 rounded-2xl border-0 shadow-2xl overflow-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400">Theme Color</p>
          <p className="text-sm font-medium text-[#0d0d0d] mt-0.5">
            {selectedColor
              ? COLOR_PALETTE.find(c => c.hex === selectedColor)?.label || 'Custom'
              : 'No theme selected'}
          </p>
        </div>

        {/* Color grid */}
        <div className="p-5">
          <div className="grid grid-cols-5 gap-3 mb-4">
            {COLOR_PALETTE.map(({ hex, label }) => (
              <button
                key={hex}
                title={label}
                onClick={() => onColorSelect(hex)}
                className="relative group"
              >
                <div
                  className="w-9 h-9 rounded-full transition-transform duration-150 group-hover:scale-110"
                  style={{ background: hex }}
                />
                {selectedColor === hex && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check size={14} color="white" strokeWidth={3} />
                  </div>
                )}
                {/* Ring on selected */}
                {selectedColor === hex && (
                  <div
                    className="absolute -inset-1 rounded-full border-2 pointer-events-none"
                    style={{ borderColor: hex }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Preview bar */}
          {selectedColor && (
            <div
              className="h-2 rounded-full mb-4 transition-all"
              style={{ background: selectedColor }}
            />
          )}

          {/* Clear button */}
          <button
            onClick={onClearTheme}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-full border border-gray-200 text-xs font-medium text-gray-500 hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            <X size={12} /> Remove theme color
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ThemeColor