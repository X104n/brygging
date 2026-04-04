import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'

export default async function BryggerProfilPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (!profile) notFound()

  // Fetch published schemas
  const { data: skjemaer } = await supabase
    .from('bryggeskjema')
    .select('id, batch_navn, batch_nr, bryggedato, malt_og, abv, karakter, smaksnotater')
    .eq('user_id', id)
    .eq('published', true)
    .order('created_at', { ascending: false })

  // Stats
  const { count: totalFinished } = await supabase
    .from('bryggeskjema')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', id)
    .eq('finished', true)

  const avgKarakter =
    skjemaer && skjemaer.length > 0
      ? (
          skjemaer.reduce((sum, s) => sum + (s.karakter ?? 0), 0) /
          skjemaer.filter((s) => s.karakter).length || 0
        ).toFixed(1)
      : null

  const navn = profile.display_name || 'Ukjent brygg'
  const initials = navn.slice(0, 2).toUpperCase()
  const år = profile.brygg_siden
    ? new Date().getFullYear() - profile.brygg_siden
    : null

  return (
    <div className="space-y-8">
      {/* Header card */}
      <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          {/* Avatar */}
          <div className="shrink-0">
            {profile.avatar_url ? (
              <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-amber-200">
                <Image src={profile.avatar_url} alt={navn} fill className="object-cover" unoptimized />
              </div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-amber-100 ring-4 ring-amber-200 flex items-center justify-center text-3xl font-bold text-amber-700">
                {initials}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold text-zinc-900">{navn}</h1>
            {profile.hjemmebryggeri && (
              <p className="text-amber-700 font-medium mt-0.5">{profile.hjemmebryggeri}</p>
            )}
            <div className="flex flex-wrap gap-3 mt-2 justify-center sm:justify-start text-sm text-zinc-500">
              {profile.sted && <span>📍 {profile.sted}</span>}
              {år !== null && år >= 0 && (
                <span>🍺 Brygg siden {profile.brygg_siden} ({år} år erfaring)</span>
              )}
            </div>
            {profile.bio && (
              <p className="mt-3 text-sm text-zinc-700 max-w-lg">{profile.bio}</p>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-6 pt-6 border-t border-zinc-100 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-amber-700">{totalFinished ?? 0}</p>
            <p className="text-xs text-zinc-500 mt-0.5">Ferdige brygg</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-700">{skjemaer?.length ?? 0}</p>
            <p className="text-xs text-zinc-500 mt-0.5">Publiserte skjema</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-amber-700">
              {avgKarakter && avgKarakter !== 'NaN' ? avgKarakter : '–'}
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">Snittkarakter</p>
          </div>
        </div>
      </div>

      {/* Favorites */}
      {(profile.favoritt_ol_stil || profile.favoritt_humle || profile.favoritt_gjaer) && (
        <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6">
          <h2 className="text-lg font-bold text-amber-800 mb-4 pb-2 border-b border-amber-100">
            Favoritter
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {profile.favoritt_ol_stil && (
              <div className="bg-amber-50 rounded-lg p-4 text-center">
                <p className="text-2xl mb-1">🍺</p>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">Ølstil</p>
                <p className="text-sm font-semibold text-zinc-800 mt-0.5">{profile.favoritt_ol_stil}</p>
              </div>
            )}
            {profile.favoritt_humle && (
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-2xl mb-1">🌿</p>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">Humle</p>
                <p className="text-sm font-semibold text-zinc-800 mt-0.5">{profile.favoritt_humle}</p>
              </div>
            )}
            {profile.favoritt_gjaer && (
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <p className="text-2xl mb-1">🧫</p>
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">Gjær</p>
                <p className="text-sm font-semibold text-zinc-800 mt-0.5">{profile.favoritt_gjaer}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Published schemas */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">
          Publiserte skjema ({skjemaer?.length ?? 0})
        </h2>
        {!skjemaer?.length ? (
          <p className="text-zinc-400 text-sm">Ingen publiserte skjema ennå.</p>
        ) : (
          <div className="grid gap-4">
            {skjemaer.map((s) => (
              <Link
                key={s.id}
                href={`/utforsk/${s.id}`}
                className="bg-white rounded-xl shadow-sm border border-zinc-100 p-5 hover:shadow-md hover:border-amber-200 transition-all flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-zinc-900">{s.batch_navn || 'Uten navn'}</p>
                  <p className="text-sm text-zinc-500 mt-0.5">
                    {s.batch_nr ? `Batch #${s.batch_nr}` : ''}
                    {s.batch_nr && s.bryggedato ? ' · ' : ''}
                    {s.bryggedato ? new Date(s.bryggedato).toLocaleDateString('nb-NO') : ''}
                  </p>
                  {s.smaksnotater && (
                    <p className="text-sm text-zinc-500 mt-1 line-clamp-1">{s.smaksnotater}</p>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-zinc-500 shrink-0">
                  {s.malt_og && <span>OG: {s.malt_og}</span>}
                  {s.abv && <span>{s.abv}%</span>}
                  {s.karakter && (
                    <span className="font-bold text-amber-700 text-base">{s.karakter}/10</span>
                  )}
                  <span className="text-zinc-300 text-xl">&rsaquo;</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
