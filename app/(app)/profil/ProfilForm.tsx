'use client'

import { useActionState } from 'react'
import { saveProfile } from '@/app/actions/profil'
import type { Profile } from '@/lib/profile'

type Props = { profile: Profile | null }

const OL_STILER = [
  'IPA', 'Pale Ale', 'Stout', 'Porter', 'Lager', 'Pilsner',
  'Wheat Beer / Hveteøl', 'Sour / Sur øl', 'Belgian Ale', 'Barleywine',
  'Saison', 'Amber Ale', 'Brown Ale', 'Red Ale', 'Annet',
]

export default function ProfilForm({ profile }: Props) {
  const [state, action, pending] = useActionState(
    async (_: unknown, formData: FormData) => saveProfile(formData),
    null
  )

  const p = profile

  return (
    <form action={action} className="space-y-6">
      <section className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6 space-y-4">
        <h2 className="text-lg font-bold text-amber-800 pb-2 border-b border-amber-100">Grunninfo</h2>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="display_name">
            Kallenavn
          </label>
          <input
            id="display_name"
            name="display_name"
            type="text"
            defaultValue={p?.display_name ?? ''}
            placeholder="Hva vil du hete?"
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="hjemmebryggeri">
            Hjemmebryggeri
          </label>
          <input
            id="hjemmebryggeri"
            name="hjemmebryggeri"
            type="text"
            defaultValue={p?.hjemmebryggeri ?? ''}
            placeholder="Hva heter bryggeriet ditt?"
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="bio">
            Om meg
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            defaultValue={p?.bio ?? ''}
            placeholder="Si noe om deg selv som hjemmebrygger…"
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-y"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="sted">
              Sted
            </label>
            <input
              id="sted"
              name="sted"
              type="text"
              defaultValue={p?.sted ?? ''}
              placeholder="By eller region"
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="brygg_siden">
              Brygging siden
            </label>
            <input
              id="brygg_siden"
              name="brygg_siden"
              type="number"
              min={1900}
              max={new Date().getFullYear()}
              defaultValue={p?.brygg_siden ?? ''}
              placeholder="År"
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6 space-y-4">
        <h2 className="text-lg font-bold text-amber-800 pb-2 border-b border-amber-100">Favoritter</h2>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="favoritt_ol_stil">
            Favoritt ølstil
          </label>
          <select
            id="favoritt_ol_stil"
            name="favoritt_ol_stil"
            defaultValue={p?.favoritt_ol_stil ?? ''}
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
          >
            <option value="">Velg en stil…</option>
            {OL_STILER.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="favoritt_humle">
              Favoritthumle
            </label>
            <input
              id="favoritt_humle"
              name="favoritt_humle"
              type="text"
              defaultValue={p?.favoritt_humle ?? ''}
              placeholder="f.eks. Cascade"
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="favoritt_gjaer">
              Favorittgjær
            </label>
            <input
              id="favoritt_gjaer"
              name="favoritt_gjaer"
              type="text"
              defaultValue={p?.favoritt_gjaer ?? ''}
              placeholder="f.eks. US-05"
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </section>

      {state?.success && (
        <p className="text-sm text-green-700 bg-green-50 rounded-lg px-4 py-3">Profil lagret!</p>
      )}

      <div className="flex justify-end pb-8">
        <button
          type="submit"
          disabled={pending}
          className="bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg px-6 py-2 text-sm transition-colors disabled:opacity-50"
        >
          {pending ? 'Lagrer…' : 'Lagre profil'}
        </button>
      </div>
    </form>
  )
}
