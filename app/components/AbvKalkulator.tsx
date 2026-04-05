'use client'

import { useState } from 'react'
import { Calculator } from 'lucide-react'

export default function AbvKalkulator() {
  const [og, setOg] = useState('')
  const [fg, setFg] = useState('')

  const ogN = parseFloat(og)
  const fgN = parseFloat(fg)
  const valid = !isNaN(ogN) && !isNaN(fgN) && ogN > fgN && ogN > 1 && fgN >= 1
  const abv = valid ? ((ogN - fgN) * 131.25).toFixed(1) : null
  const attenuation = valid ? Math.round(((ogN - fgN) / (ogN - 1)) * 100) : null

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-200">
      <div className="bg-zinc-800 px-4 py-3 flex items-center gap-2">
        <Calculator className="w-4 h-4 text-zinc-300" />
        <p className="text-sm font-semibold text-zinc-200">ABV-kalkulator</p>
        <span className="ml-auto text-xs text-zinc-500">Live beregning</span>
      </div>

      <div className="bg-zinc-50 p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
              OG — Original Gravity
            </label>
            <input
              type="number"
              step="0.001"
              min="1.000"
              max="1.200"
              placeholder="1.050"
              value={og}
              onChange={(e) => setOg(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
              FG — Final Gravity
            </label>
            <input
              type="number"
              step="0.001"
              min="1.000"
              max="1.200"
              placeholder="1.010"
              value={fg}
              onChange={(e) => setFg(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {valid && abv ? (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-amber-700 tabular-nums">{abv}%</p>
              <p className="text-xs text-zinc-500 mt-1">Alkohol (ABV)</p>
            </div>
            <div className="bg-white border border-zinc-200 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold text-zinc-700 tabular-nums">{attenuation}%</p>
              <p className="text-xs text-zinc-500 mt-1">Attenuation</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-3 text-zinc-400 text-sm italic">
            Skriv inn OG og FG for å beregne
          </div>
        )}
      </div>
    </div>
  )
}
