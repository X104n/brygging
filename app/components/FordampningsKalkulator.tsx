'use client'

import { useState } from 'react'
import { FlaskConical } from 'lucide-react'

export default function FordampningsKalkulator() {
  const [start, setStart] = useState('')
  const [rate, setRate] = useState(10)
  const [time, setTime] = useState(60)

  const startN = parseFloat(start)
  const valid = !isNaN(startN) && startN > 0

  const fordampet = valid ? (startN * (rate / 100)) * (time / 60) : null
  const slutt = valid ? Math.max(0, startN - fordampet!) : null

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-200">
      <div className="bg-red-600 px-4 py-3 flex items-center gap-2">
        <FlaskConical className="w-4 h-4 text-white" />
        <p className="text-sm font-semibold text-white">Fordampningskalkulator</p>
        <span className="ml-auto text-xs text-red-200">Kok &amp; fordampning</span>
      </div>

      <div className="bg-zinc-50 p-4 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
            Volum før kok (liter)
          </label>
          <input
            type="number" step="0.5" min="1" placeholder="26"
            value={start} onChange={(e) => setStart(e.target.value)}
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
            <span className="font-semibold uppercase tracking-wide">Fordampningsrate</span>
            <span className="font-bold text-red-600">{rate}% / time</span>
          </div>
          <input
            type="range" min="5" max="20" step="1"
            value={rate} onChange={(e) => setRate(parseInt(e.target.value))}
            className="w-full accent-red-500"
          />
          <div className="flex justify-between text-xs text-zinc-400 mt-0.5">
            <span>5% — lav fordampning</span>
            <span>20% — kraftig kok</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
            <span className="font-semibold uppercase tracking-wide">Koketid</span>
            <span className="font-bold text-red-600">{time} min</span>
          </div>
          <input
            type="range" min="30" max="120" step="15"
            value={time} onChange={(e) => setTime(parseInt(e.target.value))}
            className="w-full accent-red-500"
          />
          <div className="flex justify-between text-xs text-zinc-400 mt-0.5">
            <span>30 min</span>
            <span>120 min</span>
          </div>
        </div>

        {valid && fordampet !== null ? (
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
              <p className="text-xl sm:text-2xl font-bold text-red-700 tabular-nums">−{fordampet.toFixed(1)}L</p>
              <p className="text-xs text-zinc-500 mt-0.5">Fordampet</p>
            </div>
            <div className="bg-zinc-100 border border-zinc-200 rounded-xl p-3 text-center">
              <p className="text-xl sm:text-2xl font-bold text-zinc-700 tabular-nums">{slutt!.toFixed(1)}L</p>
              <p className="text-xs text-zinc-500 mt-0.5">Etter kok</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-3 text-zinc-400 text-sm italic">
            Fyll inn volum før kok for å beregne
          </div>
        )}
      </div>
    </div>
  )
}
