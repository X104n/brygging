'use client'

import { useState } from 'react'
import { Droplets } from 'lucide-react'

export default function MeskevannKalkulator() {
  const [kg, setKg] = useState('')
  const [batch, setBatch] = useState('20')
  const [ratio, setRatio] = useState(3.0)

  const kgN = parseFloat(kg)
  const batchN = parseFloat(batch)
  const valid = !isNaN(kgN) && kgN > 0 && !isNaN(batchN) && batchN > 0

  const meskevann = valid ? kgN * ratio : null
  const absorption = valid ? kgN * 1.0 : null                        // ~1 L absorbed per kg grain
  const preBoil = valid ? batchN * 1.15 : null                        // ~15% boil loss
  const skyllevann = valid ? Math.max(0, preBoil! - meskevann! + absorption!) : null
  const totalVann = valid ? meskevann! + skyllevann! : null

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-200">
      <div className="bg-orange-600 px-4 py-3 flex items-center gap-2">
        <Droplets className="w-4 h-4 text-white" />
        <p className="text-sm font-semibold text-white">Vannkalkulator</p>
        <span className="ml-auto text-xs text-orange-200">Meskevann & skyllevann</span>
      </div>

      <div className="bg-zinc-50 p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
              Malt (kg)
            </label>
            <input
              type="number" step="0.1" min="0.1" placeholder="4.5"
              value={kg} onChange={(e) => setKg(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5">
              Ønsket batch (liter)
            </label>
            <input
              type="number" step="1" min="1" placeholder="20"
              value={batch} onChange={(e) => setBatch(e.target.value)}
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
            <span className="font-semibold uppercase tracking-wide">Meskeforhold</span>
            <span className="font-bold text-orange-600">{ratio.toFixed(1)} L / kg</span>
          </div>
          <input
            type="range" min="2.5" max="3.5" step="0.1"
            value={ratio} onChange={(e) => setRatio(parseFloat(e.target.value))}
            className="w-full accent-orange-500"
          />
          <div className="flex justify-between text-xs text-zinc-400 mt-0.5">
            <span>2.5 — tykk mesk</span>
            <span>3.5 — tynn mesk</span>
          </div>
        </div>

        {valid && meskevann !== null ? (
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
              <p className="text-xl sm:text-2xl font-bold text-blue-700 tabular-nums">{meskevann.toFixed(1)}L</p>
              <p className="text-xs text-zinc-500 mt-0.5">Meskevann</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 text-center">
              <p className="text-xl sm:text-2xl font-bold text-orange-700 tabular-nums">{skyllevann!.toFixed(1)}L</p>
              <p className="text-xs text-zinc-500 mt-0.5">Skyllevann</p>
            </div>
            <div className="bg-zinc-100 border border-zinc-200 rounded-xl p-3 text-center">
              <p className="text-xl sm:text-2xl font-bold text-zinc-700 tabular-nums">{totalVann!.toFixed(1)}L</p>
              <p className="text-xs text-zinc-500 mt-0.5">Totalt vann</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-3 text-zinc-400 text-sm italic">
            Fyll inn malt og batch-størrelse for å beregne
          </div>
        )}
      </div>
    </div>
  )
}
