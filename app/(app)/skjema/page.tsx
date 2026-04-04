import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Bryggeskjema } from '@/lib/definitions'

type ListItem = Pick<Bryggeskjema, 'id' | 'batch_navn' | 'batch_nr' | 'bryggedato' | 'malt_og' | 'malt_fg' | 'karakter' | 'created_at' | 'finished' | 'published'>

function SkjemaKort({ s }: { s: ListItem }) {
  return (
    <Link
      href={`/skjema/${s.id}`}
      className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5 hover:shadow-md hover:border-amber-200 transition-all flex items-center justify-between"
    >
      <div>
        <div className="flex items-center gap-2">
          <p className="font-semibold text-zinc-900 text-lg">
            {s.batch_navn || 'Uten navn'}
          </p>
          {s.published && (
            <span className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-medium">
              Publisert
            </span>
          )}
        </div>
        <p className="text-sm text-zinc-500 mt-0.5">
          {s.batch_nr ? `Batch #${s.batch_nr}` : ''}
          {s.batch_nr && s.bryggedato ? ' · ' : ''}
          {s.bryggedato ? new Date(s.bryggedato).toLocaleDateString('nb-NO') : ''}
        </p>
      </div>
      <div className="flex items-center gap-6 text-sm text-zinc-500">
        {s.malt_og && <span>OG: {s.malt_og}</span>}
        {s.malt_fg && <span>FG: {s.malt_fg}</span>}
        {s.karakter && (
          <span className="font-bold text-amber-700 text-base">{s.karakter}/10</span>
        )}
        <span className="text-zinc-300 text-xl">&rsaquo;</span>
      </div>
    </Link>
  )
}

export default async function SkjemaListePage() {
  const supabase = await createClient()
  const { data: skjemaer } = await supabase
    .from('bryggeskjema')
    .select('id, batch_navn, batch_nr, bryggedato, malt_og, malt_fg, karakter, created_at, finished, published')
    .order('created_at', { ascending: false })

  const ferdige = (skjemaer ?? []).filter((s) => s.finished)
  const utkast = (skjemaer ?? []).filter((s) => !s.finished)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-amber-900">Mine bryggeskjema</h1>
        <Link
          href="/skjema/ny"
          className="bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg px-4 py-2 text-sm transition-colors"
        >
          + Nytt skjema
        </Link>
      </div>

      {!skjemaer?.length ? (
        <div className="text-center py-20 text-zinc-500">
          <p className="text-lg mb-4">Ingen skjema ennå.</p>
          <Link href="/skjema/ny" className="text-amber-700 hover:underline font-medium">
            Lag ditt første bryggeskjema
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {ferdige.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">
                Ferdige brygg ({ferdige.length})
              </h2>
              <div className="grid gap-4">
                {ferdige.map((s) => <SkjemaKort key={s.id} s={s as ListItem} />)}
              </div>
            </section>
          )}

          {utkast.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">
                Utkast ({utkast.length})
              </h2>
              <div className="grid gap-4">
                {utkast.map((s) => <SkjemaKort key={s.id} s={s as ListItem} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
