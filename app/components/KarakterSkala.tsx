'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

const DESCRIPTIONS: Record<number, { label: string; desc: string; color: string }> = {
  1:  { label: 'Udrikkelig',    desc: 'Noe gikk alvorlig galt. Helles ut.',                    color: 'text-red-600'    },
  2:  { label: 'Veldig dårlig', desc: 'Store feil — infeksjon, fusel eller annet off-flavor.',  color: 'text-red-500'    },
  3:  { label: 'Dårlig',        desc: 'Tydelige feil. Ikke hyggelig å drikke.',                 color: 'text-orange-600' },
  4:  { label: 'Under middels', desc: 'Flere ting som skurrer. Kan drikkes med innsats.',       color: 'text-orange-500' },
  5:  { label: 'Middels',       desc: 'Gjennomsnittlig. Drikkbart, men ikke spennende.',        color: 'text-yellow-600' },
  6:  { label: 'Godkjent',      desc: 'Greit brygg. Fungerer til hverdags.',                    color: 'text-yellow-500' },
  7:  { label: 'Bra',           desc: 'Over gjennomsnittet. Vil gjerne drikke dette igjen.',    color: 'text-lime-600'   },
  8:  { label: 'Veldig bra',    desc: 'Vil brygge igjen. Del gjerne med venner.',               color: 'text-green-600'  },
  9:  { label: 'Fremragende',   desc: 'Nær perfekt for stilen. Stolt av dette.',                color: 'text-emerald-600'},
  10: { label: 'Mesterverk',    desc: 'Det beste du har laget. Dokumenter alt!',                color: 'text-teal-600'   },
}

export default function KarakterSkala() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [selected, setSelected] = useState<number | null>(null)

  const active = hovered ?? selected

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-200">
      <div className="bg-purple-700 px-4 py-3 flex items-center gap-2">
        <Star className="w-4 h-4 text-white" />
        <p className="text-sm font-semibold text-white">Karakterskala</p>
        <span className="ml-auto text-xs text-purple-200">1–10</span>
      </div>

      <div className="bg-zinc-50 p-4 space-y-4">
        {/* Star row */}
        <div className="flex gap-1 justify-between">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(selected === n ? null : n)}
              className="flex-1 flex flex-col items-center gap-1 group"
              aria-label={`Karakter ${n}`}
            >
              <Star
                className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                  active !== null && n <= active
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-none text-zinc-300 group-hover:text-amber-300'
                }`}
              />
              <span className={`text-xs font-bold transition-colors ${
                active === n ? 'text-zinc-700' : 'text-zinc-300'
              }`}>{n}</span>
            </button>
          ))}
        </div>

        {/* Description */}
        {active !== null ? (
          <div className="rounded-lg bg-white border border-zinc-200 px-4 py-3 text-center space-y-1">
            <p className={`text-lg font-bold ${DESCRIPTIONS[active].color}`}>
              {active}/10 — {DESCRIPTIONS[active].label}
            </p>
            <p className="text-sm text-zinc-600">{DESCRIPTIONS[active].desc}</p>
          </div>
        ) : (
          <div className="text-center py-2 text-zinc-400 text-sm italic">
            Hold over eller klikk en stjerne for å se beskrivelse
          </div>
        )}

        <p className="text-xs text-zinc-400 text-center">
          6 = greit drikkbart · 8 = vil brygge igjen · 10 = mesterverk
        </p>
      </div>
    </div>
  )
}
