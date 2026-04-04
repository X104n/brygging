'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { lagreSkjema } from '@/app/actions/skjema'
import type { Bryggeskjema } from '@/lib/definitions'
import Link from 'next/link'
import GenereltSeksjon from './sections/GenereltSeksjon'
import ForberedelserSeksjon from './sections/ForberedelserSeksjon'
import MeskeprosessSeksjon from './sections/MeskeprosessSeksjon'
import KokingSeksjon from './sections/KokingSeksjon'
import NedkjolingSeksjon from './sections/NedkjolingSeksjon'
import GjaeringSeksjon from './sections/GjaeringSeksjon'
import NotatSeksjon from './sections/NotatSeksjon'

type Props = { skjema?: Bryggeskjema }
type Source = Record<string, unknown>

function serializeForm(form: HTMLFormElement): Record<string, string | boolean> {
  const data: Record<string, string | boolean> = {}
  for (const el of Array.from(form.elements)) {
    if (el instanceof HTMLInputElement && el.name) {
      data[el.name] = el.type === 'checkbox' ? el.checked : el.value
    } else if (el instanceof HTMLTextAreaElement && el.name) {
      data[el.name] = el.value
    }
  }
  return data
}

export default function SkjemaForm({ skjema }: Props) {
  const id = skjema?.id ?? null
  const draftKey = `bryggeskjema_draft_${id ?? 'new'}`

  const [source, setSource] = useState<Source>(skjema ?? {})
  const [draftLoaded, setDraftLoaded] = useState(false)
  const [restoredFromDraft, setRestoredFromDraft] = useState(false)
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(draftKey)
    if (saved) {
      try {
        setSource(JSON.parse(saved))
        setRestoredFromDraft(true)
      } catch {}
    }
    setDraftLoaded(true)
  }, [draftKey])

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      localStorage.setItem(draftKey, JSON.stringify(serializeForm(form)))
      setSavedAt(new Date().toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' }))
    }, 1500)
  }

  const handleSubmit = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    localStorage.removeItem(draftKey)
  }

  const discardDraft = () => {
    localStorage.removeItem(draftKey)
    setSource(skjema ?? {})
    setRestoredFromDraft(false)
    setSavedAt(null)
  }

  const action = lagreSkjema.bind(null, id)
  const [state, formAction, pending] = useActionState(
    async (_: unknown, formData: FormData) => action(formData),
    null
  )

  const str = (field: string) => {
    const v = source[field]
    return v != null ? String(v) : ''
  }
  const bool = (field: string) => {
    const v = source[field]
    return v === true || v === 'true'
  }

  if (!draftLoaded) return null

  return (
    <form action={formAction} onChange={handleChange} onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-amber-900">
          {skjema ? 'Rediger skjema' : 'Nytt bryggeskjema'}
        </h1>
        <Link href="/skjema" className="text-sm text-zinc-500 hover:text-zinc-700">
          Avbryt
        </Link>
      </div>

      {(restoredFromDraft || savedAt) && (
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm">
          <span className="text-amber-800">
            {restoredFromDraft && !savedAt
              ? 'Utkast gjenopprettet fra forrige økt'
              : `Utkast lagret kl. ${savedAt}`}
          </span>
          {restoredFromDraft && (
            <button
              type="button"
              onClick={discardDraft}
              className="text-amber-700 hover:text-amber-900 hover:underline ml-4"
            >
              Forkast utkast
            </button>
          )}
        </div>
      )}

      <GenereltSeksjon str={str} />
      <ForberedelserSeksjon bool={bool} />
      <MeskeprosessSeksjon str={str} bool={bool} />
      <KokingSeksjon str={str} bool={bool} />
      <NedkjolingSeksjon bool={bool} />
      <GjaeringSeksjon str={str} bool={bool} />
      <NotatSeksjon str={str} />

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">{state.error}</p>
      )}

      <div className="flex justify-end gap-3 pb-8">
        <Link
          href="/skjema"
          className="rounded-lg border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
        >
          Avbryt
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg px-6 py-2 text-sm transition-colors disabled:opacity-50"
        >
          {pending ? 'Lagrer…' : 'Lagre skjema'}
        </button>
      </div>
    </form>
  )
}
