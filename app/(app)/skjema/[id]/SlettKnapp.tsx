'use client'

import { slettSkjema } from '@/app/actions/skjema'

export default function SlettKnapp({ id }: { id: string }) {
  const slett = slettSkjema.bind(null, id)

  return (
    <form action={slett}>
      <button
        type="submit"
        className="text-sm text-red-600 hover:text-red-800 hover:underline"
        onClick={(e) => {
          if (!confirm('Sikker på at du vil slette dette skjemaet?')) e.preventDefault()
        }}
      >
        Slett skjema
      </button>
    </form>
  )
}
