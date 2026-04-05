import { createClient } from '@/lib/supabase/server'
import { Compass } from 'lucide-react'
import SchemaListCard from '@/app/components/SchemaListCard'
import EmptyState from '@/app/components/EmptyState'

export default async function UtforskPage() {
  const supabase = await createClient()

  const { data: skjemaer } = await supabase
    .from('bryggeskjema')
    .select('id, batch_navn, batch_nr, bryggedato, malt_og, malt_fg, abv, karakter, smaksnotater, bilde_url, user_id')
    .eq('published', true)
    .order('updated_at', { ascending: false })
    .limit(50)

  const userIds = [...new Set((skjemaer ?? []).map((s) => s.user_id))]
  const { data: profiles } = userIds.length
    ? await supabase.from('profiles').select('id, display_name').in('id', userIds)
    : { data: [] }

  const nameMap = Object.fromEntries((profiles ?? []).map((p) => [p.id, p.display_name]))
  const count = skjemaer?.length ?? 0

  return (
    <div>
      {/* Hero banner — breaks out of px-4 padding */}
      <div className="-mx-4 -mt-6 sm:-mt-8 mb-8 relative overflow-hidden bg-gradient-to-br from-stone-900 via-amber-950 to-amber-800">
        {/* Decorative compass watermark */}
        <Compass className="absolute -right-6 -bottom-4 w-52 h-52 text-white/5 rotate-12 pointer-events-none" />
        <Compass className="absolute right-24 top-2 w-12 h-12 text-amber-400/20 -rotate-6 pointer-events-none" />

        <div className="relative px-6 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-1.5">
                  <Compass className="w-4 h-4 text-amber-300" />
                </div>
                <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">
                  Fellesskapet
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Utforsk brygg
              </h1>
              <p className="text-amber-200/70 mt-2 text-sm sm:text-base max-w-sm">
                Oppdage inspirasjon fra hjemmebryggerier over hele landet
              </p>
            </div>

            {count > 0 && (
              <div className="shrink-0 bg-white/10 border border-white/10 rounded-2xl px-5 py-4 text-center backdrop-blur-sm">
                <p className="text-3xl sm:text-4xl font-bold text-amber-300 leading-none">{count}</p>
                <p className="text-amber-400/80 text-xs mt-1.5 leading-tight">
                  publiserte<br />brygg
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {!skjemaer?.length ? (
        <EmptyState
          title="Ingen publiserte skjema ennå."
          description="Publiser ett av dine egne skjema for å komme i gang!"
        />
      ) : (
        <div className="grid gap-4">
          {skjemaer.map((s) => {
            const brewer = nameMap[s.user_id] || 'Ukjent brygg'
            return (
              <SchemaListCard
                key={s.id}
                id={s.id}
                href={`/utforsk/${s.id}`}
                batch_navn={s.batch_navn}
                batch_nr={s.batch_nr}
                bryggedato={s.bryggedato}
                malt_og={s.malt_og}
                abv={s.abv}
                karakter={s.karakter}
                preview={s.smaksnotater}
                imageUrl={s.bilde_url}
                subtitle={brewer}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
