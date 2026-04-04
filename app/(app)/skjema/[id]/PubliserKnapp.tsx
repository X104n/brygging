'use client'

import { useTransition } from 'react'
import { togglePublish } from '@/app/actions/publiser'

export default function PubliserKnapp({ id, published }: { id: string; published: boolean }) {
  const [pending, startTransition] = useTransition()

  const handle = () => {
    startTransition(() => togglePublish(id, !published))
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handle}
        disabled={pending}
        className={`text-sm font-medium rounded-lg px-4 py-2 transition-colors disabled:opacity-50 ${
          published
            ? 'bg-green-100 text-green-800 hover:bg-red-50 hover:text-red-700 border border-green-200 hover:border-red-200'
            : 'bg-zinc-100 text-zinc-700 hover:bg-green-50 hover:text-green-800 border border-zinc-200 hover:border-green-200'
        }`}
      >
        {pending ? 'Oppdaterer…' : published ? 'Publisert – klikk for å trekke tilbake' : 'Publiser skjema'}
      </button>
      {published && (
        <span className="text-xs text-zinc-400">Synlig for alle brukere i Utforsk</span>
      )}
    </div>
  )
}
