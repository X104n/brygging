'use client'

import { useState } from 'react'
import { Thermometer } from 'lucide-react'

const YEAST_TYPES = [
  {
    id: 'ale',
    label: 'Ale-gjær',
    color: 'bg-amber-500',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-300',
    bgColor: 'bg-amber-50',
    min: 15,
    optimal: [18, 22],
    max: 26,
    notes: [
      { temp: 15, desc: 'For kald — gjæren kan bli treg eller stoppe' },
      { temp: 18, desc: 'Rent, krispt resultat — minimale estere' },
      { temp: 20, desc: 'Balansert — fruktighet begynner å komme frem' },
      { temp: 22, desc: 'Øvre grense — tydelige estere, litt varmt' },
      { temp: 26, desc: 'For varm — fuselalkohol og ubehagelig smak' },
    ],
  },
  {
    id: 'lager',
    label: 'Lager-gjær',
    color: 'bg-sky-500',
    textColor: 'text-sky-700',
    borderColor: 'border-sky-300',
    bgColor: 'bg-sky-50',
    min: 6,
    optimal: [9, 12],
    max: 15,
    notes: [
      { temp: 6, desc: 'Svært kald — langsom gjæring, risiko for stopp' },
      { temp: 9, desc: 'God start — rent, klassisk lagerkarakter' },
      { temp: 12, desc: 'Øvre grense — akseptabelt, noe mer sulfur' },
      { temp: 15, desc: 'For varm — unøyaktig lagerkarakter' },
    ],
  },
  {
    id: 'kveik',
    label: 'Kveik',
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-300',
    bgColor: 'bg-orange-50',
    min: 25,
    optimal: [35, 40],
    max: 43,
    notes: [
      { temp: 25, desc: 'Lavt for kveik — sakte gjæring' },
      { temp: 35, desc: 'Ideelt — høy aktivitet, fruktighetsestere' },
      { temp: 40, desc: 'Svært aktiv — nesten ferdig på under et døgn' },
      { temp: 43, desc: 'Øvre grense — bruk med forsiktighet' },
    ],
  },
]

function TempBar({ yeast, temp }: { yeast: typeof YEAST_TYPES[0]; temp: number }) {
  const range = yeast.max - yeast.min
  const optPct = [(yeast.optimal[0] - yeast.min) / range * 100, (yeast.optimal[1] - yeast.min) / range * 100]
  const markerPct = Math.min(100, Math.max(0, (temp - yeast.min) / range * 100))

  const inZone = temp >= yeast.optimal[0] && temp <= yeast.optimal[1]
  const tooLow = temp < yeast.optimal[0]
  const tooHigh = temp > yeast.optimal[1]

  return (
    <div className="space-y-2">
      <div className="relative h-5 rounded-full overflow-visible bg-zinc-200">
        {/* optimal zone */}
        <div
          className={`absolute top-0 bottom-0 rounded-full opacity-60 ${yeast.color}`}
          style={{ left: `${optPct[0]}%`, width: `${optPct[1] - optPct[0]}%` }}
        />
        {/* temperature marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md z-10 transition-all duration-150"
          style={{
            left: `calc(${markerPct}% - 8px)`,
            backgroundColor: inZone ? '#22c55e' : tooLow ? '#60a5fa' : '#f87171',
          }}
        />
      </div>
      <div className="flex justify-between text-xs text-zinc-400">
        <span>{yeast.min}°C</span>
        <span className={`font-semibold ${inZone ? 'text-green-600' : tooLow ? 'text-blue-500' : 'text-red-500'}`}>
          {temp}°C — {inZone ? 'Optimal sone' : tooLow ? 'For kald' : 'For varm'}
        </span>
        <span>{yeast.max}°C</span>
      </div>
    </div>
  )
}

export default function GjaeringsGuide() {
  const [activeYeast, setActiveYeast] = useState('ale')
  const yeast = YEAST_TYPES.find((y) => y.id === activeYeast)!

  const midTemp = Math.round((yeast.optimal[0] + yeast.optimal[1]) / 2)
  const [temp, setTemp] = useState(midTemp)

  const handleYeastChange = (id: string) => {
    const y = YEAST_TYPES.find((y) => y.id === id)!
    setActiveYeast(id)
    setTemp(Math.round((y.optimal[0] + y.optimal[1]) / 2))
  }

  const closestNote = yeast.notes.reduce((prev, curr) =>
    Math.abs(curr.temp - temp) < Math.abs(prev.temp - temp) ? curr : prev
  )

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-200">
      <div className="bg-green-700 px-4 py-3 flex items-center gap-2">
        <Thermometer className="w-4 h-4 text-white" />
        <p className="text-sm font-semibold text-white">Gjæringstemperatur</p>
        <span className="ml-auto text-xs text-green-200">Interaktiv guide</span>
      </div>

      <div className="bg-zinc-50 p-4 space-y-4">
        {/* Yeast type selector */}
        <div className="flex gap-2">
          {YEAST_TYPES.map((y) => (
            <button
              key={y.id}
              onClick={() => handleYeastChange(y.id)}
              className={`flex-1 text-xs font-semibold py-2 px-3 rounded-lg border transition-colors ${
                activeYeast === y.id
                  ? `${y.bgColor} ${y.textColor} ${y.borderColor}`
                  : 'bg-white text-zinc-500 border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {y.label}
            </button>
          ))}
        </div>

        {/* Temp slider */}
        <div>
          <div className="flex justify-between text-xs text-zinc-500 mb-1.5">
            <span className="font-semibold uppercase tracking-wide">Sett temperatur</span>
            <span className={`font-bold ${yeast.textColor}`}>{temp}°C</span>
          </div>
          <input
            type="range"
            min={yeast.min}
            max={yeast.max}
            step="1"
            value={temp}
            onChange={(e) => setTemp(parseInt(e.target.value))}
            className="w-full"
            style={{ accentColor: activeYeast === 'ale' ? '#f59e0b' : activeYeast === 'lager' ? '#0ea5e9' : '#f97316' }}
          />
        </div>

        {/* Visual bar */}
        <TempBar yeast={yeast} temp={temp} />

        {/* Insight box */}
        <div className={`rounded-lg px-4 py-3 text-sm border ${yeast.bgColor} ${yeast.borderColor} ${yeast.textColor}`}>
          <span className="font-semibold">{temp}°C: </span>
          {closestNote.desc}
        </div>

        <p className="text-xs text-zinc-400 text-center">
          Optimal sone: {yeast.optimal[0]}–{yeast.optimal[1]}°C
        </p>
      </div>
    </div>
  )
}
