import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import SchemaListCard from '@/app/components/SchemaListCard'
import EmptyState from '@/app/components/EmptyState'

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
        <EmptyState
          title="Ingen skjema ennå."
          action={
            <Link href="/skjema/ny" className="text-amber-700 hover:underline font-medium">
              Lag ditt første bryggeskjema
            </Link>
          }
        />
      ) : (
        <div className="space-y-8">
          {ferdige.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">
                Ferdige brygg ({ferdige.length})
              </h2>
              <div className="grid gap-4">
                {ferdige.map((s) => (
                  <SchemaListCard
                    key={s.id}
                    id={s.id}
                    href={`/skjema/${s.id}`}
                    batch_navn={s.batch_navn}
                    batch_nr={s.batch_nr}
                    bryggedato={s.bryggedato}
                    malt_og={s.malt_og}
                    malt_fg={s.malt_fg}
                    karakter={s.karakter}
                    badges={
                      s.published ? (
                        <span className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-medium">
                          Publisert
                        </span>
                      ) : null
                    }
                  />
                ))}
              </div>
            </section>
          )}

          {utkast.length > 0 && (
            <section>
              <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">
                Utkast ({utkast.length})
              </h2>
              <div className="grid gap-4">
                {utkast.map((s) => (
                  <SchemaListCard
                    key={s.id}
                    id={s.id}
                    href={`/skjema/${s.id}`}
                    batch_navn={s.batch_navn}
                    batch_nr={s.batch_nr}
                    bryggedato={s.bryggedato}
                    malt_og={s.malt_og}
                    malt_fg={s.malt_fg}
                    karakter={s.karakter}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
