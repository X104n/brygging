import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
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

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-amber-900">Utforsk</h1>
        <p className="text-sm text-zinc-500 mt-1">Publiserte bryggeskjema fra alle brukere</p>
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
                subtitle={
                  <Link
                    href={`/brygger/${s.user_id}`}
                    className="hover:text-amber-700 hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {brewer}
                  </Link>
                }
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
