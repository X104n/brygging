import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function UtforskPage() {
  const supabase = await createClient()

  const { data: skjemaer } = await supabase
    .from('bryggeskjema')
    .select('id, batch_navn, batch_nr, bryggedato, malt_og, malt_fg, abv, karakter, bryggenotater, smaksnotater, user_id')
    .eq('published', true)
    .order('updated_at', { ascending: false })
    .limit(50)

  // Fetch display names for all authors
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
        <div className="text-center py-20 text-zinc-500">
          <p className="text-lg">Ingen publiserte skjema ennå.</p>
          <p className="text-sm mt-2">Publiser ett av dine egne skjema for å komme i gang!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {skjemaer.map((s) => {
            const brewer = nameMap[s.user_id] || 'Ukjent brygg'
            return (
              <Link
                key={s.id}
                href={`/utforsk/${s.id}`}
                className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5 hover:shadow-md hover:border-amber-200 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-zinc-900 text-lg">
                        {s.batch_navn || 'Uten navn'}
                      </p>
                      {s.batch_nr && (
                        <span className="text-xs bg-amber-100 text-amber-700 rounded-full px-2 py-0.5">
                          Batch #{s.batch_nr}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-zinc-500 mt-0.5">
                      <Link
                        href={`/brygger/${s.user_id}`}
                        className="hover:text-amber-700 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {brewer}
                      </Link>
                      {s.bryggedato
                        ? ` · ${new Date(s.bryggedato).toLocaleDateString('nb-NO')}`
                        : ''}
                    </p>
                    {s.smaksnotater && (
                      <p className="text-sm text-zinc-600 mt-2 line-clamp-2">{s.smaksnotater}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1 text-sm text-zinc-500 shrink-0">
                    {s.malt_og && <span>OG: {s.malt_og}</span>}
                    {s.abv && <span>ABV: {s.abv}%</span>}
                    {s.karakter && (
                      <span className="font-bold text-amber-700 text-base">{s.karakter}/10</span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
