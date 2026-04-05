import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FlaskConical, Plus } from 'lucide-react'
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
      {/* Hero banner — breaks out of px-4 padding */}
      <div className="-mx-4 -mt-6 sm:-mt-8 mb-8 relative overflow-hidden bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600">
        {/* Decorative flask watermarks */}
        <FlaskConical className="absolute -right-4 -bottom-6 w-48 h-48 text-white/5 pointer-events-none" />
        <FlaskConical className="absolute right-28 top-1 w-10 h-10 text-white/10 rotate-12 pointer-events-none" />

        <div className="relative px-6 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="bg-white/10 border border-white/20 rounded-lg p-1.5">
                  <FlaskConical className="w-4 h-4 text-amber-100" />
                </div>
                <span className="text-amber-200 text-xs font-semibold uppercase tracking-widest">
                  Din bryggelogg
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Mine brygg
              </h1>
              <div className="flex items-center gap-3 mt-2 text-sm text-amber-200/80">
                {ferdige.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                    {ferdige.length} {ferdige.length === 1 ? 'ferdig brygg' : 'ferdige brygg'}
                  </span>
                )}
                {utkast.length > 0 && (
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-300 inline-block" />
                    {utkast.length} {utkast.length === 1 ? 'utkast' : 'utkast'}
                  </span>
                )}
                {!skjemaer?.length && (
                  <span className="text-amber-200/60">Ingen brygg ennå</span>
                )}
              </div>
            </div>

            <Link
              href="/skjema/ny"
              className="shrink-0 flex items-center gap-2 bg-white text-amber-800 hover:bg-amber-50 font-bold rounded-xl px-4 py-3 text-sm transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden xs:inline">Nytt brygg</span>
              <span className="xs:hidden">Nytt</span>
            </Link>
          </div>
        </div>
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
