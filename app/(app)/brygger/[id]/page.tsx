import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BrewerHeader from './_components/BrewerHeader'
import FavoritterCard from './_components/FavoritterCard'
import PubliserteSkjema from './_components/PubliserteSkjema'

export default async function BryggerProfilPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: profile }, { data: skjemaer }, { count: totalFinished }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', id).single(),
    supabase
      .from('bryggeskjema')
      .select('id, batch_navn, batch_nr, bryggedato, malt_og, abv, karakter, smaksnotater')
      .eq('user_id', id)
      .eq('published', true)
      .order('created_at', { ascending: false }),
    supabase
      .from('bryggeskjema')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', id)
      .eq('finished', true),
  ])

  if (!profile) notFound()

  const ratedSkjemaer = (skjemaer ?? []).filter((s) => s.karakter)
  const avgKarakter =
    ratedSkjemaer.length > 0
      ? (ratedSkjemaer.reduce((sum, s) => sum + (s.karakter ?? 0), 0) / ratedSkjemaer.length).toFixed(1)
      : null

  return (
    <div className="space-y-8">
      <BrewerHeader
        profile={profile}
        totalFinished={totalFinished ?? 0}
        publishedCount={skjemaer?.length ?? 0}
        avgKarakter={avgKarakter}
      />
      <FavoritterCard
        favoritt_ol_stil={profile.favoritt_ol_stil}
        favoritt_humle={profile.favoritt_humle}
        favoritt_gjaer={profile.favoritt_gjaer}
      />
      <PubliserteSkjema skjemaer={skjemaer ?? []} />
    </div>
  )
}
