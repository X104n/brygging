'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type Props = {
  id?: string
  tittel: string
  tagline: string
  icon: React.ReactNode
  farge: string
  defaultOpen?: boolean
  children: React.ReactNode
}

export default function Accordion({ id, tittel, tagline, icon, farge, defaultOpen = false, children }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section id={id} className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden scroll-mt-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full ${farge} px-5 sm:px-6 py-4 flex items-center justify-between gap-3 text-left transition-opacity hover:opacity-95`}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="text-white shrink-0 opacity-90">{icon}</div>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-white leading-tight">{tittel}</h2>
            <p className="text-white/60 text-xs mt-0.5 hidden sm:block">{tagline}</p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-white/70 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`transition-all duration-200 overflow-hidden ${open ? 'max-h-[9999px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="px-5 sm:px-6 py-5 space-y-4 text-sm text-zinc-700 leading-relaxed">
          {children}
        </div>
      </div>
    </section>
  )
}
