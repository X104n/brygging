'use client'

import { useTransition } from 'react'
import { toggleFinished } from '@/app/actions/publiser'

export default function FerdigKnapp({ id, finished }: { id: string; finished: boolean }) {
  const [pending, startTransition] = useTransition()

  const handle = () => {
    startTransition(() => toggleFinished(id, !finished))
  }

  return (
    <button
      type="button"
      onClick={handle}
      disabled={pending}
      className={`text-sm font-medium rounded-lg px-4 py-2 transition-colors disabled:opacity-50 border ${
        finished
          ? 'bg-zinc-100 text-zinc-600 border-zinc-200 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200'
          : 'bg-amber-700 text-white border-amber-700 hover:bg-amber-800'
      }`}
    >
      {pending ? 'Oppdaterer…' : finished ? 'Sett tilbake til utkast' : 'Merk som ferdig'}
    </button>
  )
}
