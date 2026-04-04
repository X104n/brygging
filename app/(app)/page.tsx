import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { FlaskConical, BookOpen, Compass, ClipboardList } from 'lucide-react'
import StatsGrid from '@/app/components/StatsGrid'
import SchemaListCard from '@/app/components/SchemaListCard'
import EmptyState from '@/app/components/EmptyState'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [{ data: skjemaer }, { data: profile }, { data: publiserte }] = await Promise.all([
    supabase
      .from('bryggeskjema')
      .select('id, batch_navn, bryggedato, karakter, finished')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false })
      .limit(4),
    supabase.from('profiles').select('display_name').eq('id', user!.id).single(),
    supabase
      .from('bryggeskjema')
      .select('id, batch_navn, bryggedato, karakter, user_id')
      .eq('published', true)
      .neq('user_id', user!.id)
      .order('updated_at', { ascending: false })
      .limit(3),
  ])

  const navn = profile?.display_name || 'brygg'
  const antallFerdige = (skjemaer ?? []).filter((s) => s.finished).length
  const antallUtkast = (skjemaer ?? []).filter((s) => !s.finished).length
  const ratedSkjemaer = (skjemaer ?? []).filter((s) => s.karakter)
  const snitt =
    ratedSkjemaer.length > 0
      ? (ratedSkjemaer.reduce((sum, s) => sum + (s.karakter ?? 0), 0) / ratedSkjemaer.length).toFixed(1)
      : null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-amber-900">Hei, {navn}! 🍺</h1>
        <p className="text-zinc-500 mt-1">Her er en oversikt over bryggingen din.</p>
      </div>

      <StatsGrid stats={[
        { label: 'Ferdige brygg', value: antallFerdige },
        { label: 'Utkast', value: antallUtkast },
        { label: 'Snittkarakter', value: snitt ?? '–' },
      ]} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: '/skjema/ny', icon: <FlaskConical className="w-5 h-5" />, label: 'Nytt skjema', farge: 'bg-amber-700 text-white hover:bg-amber-800' },
          { href: '/skjema', icon: <ClipboardList className="w-5 h-5" />, label: 'Mine skjema', farge: 'bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200' },
          { href: '/utforsk', icon: <Compass className="w-5 h-5" />, label: 'Utforsk', farge: 'bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200' },
          { href: '/info', icon: <BookOpen className="w-5 h-5" />, label: 'Brygguiden', farge: 'bg-white text-zinc-700 hover:bg-zinc-50 border border-zinc-200' },
        ].map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${a.farge}`}
          >
            {a.icon} {a.label}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide">Dine siste skjema</h2>
            <Link href="/skjema" className="text-xs text-amber-700 hover:underline">Se alle</Link>
          </div>
          {!(skjemaer ?? []).length ? (
            <EmptyState
              title="Ingen skjema ennå."
              action={
                <Link href="/skjema/ny" className="text-amber-700 hover:underline font-medium">
                  Lag ditt første →
                </Link>
              }
            />
          ) : (
            <div className="space-y-2">
              {(skjemaer ?? []).map((s) => (
                <SchemaListCard
                  key={s.id}
                  id={s.id}
                  href={`/skjema/${s.id}`}
                  batch_navn={s.batch_navn}
                  bryggedato={s.bryggedato}
                  karakter={s.karakter}
                  subtitle={s.finished ? 'Ferdig' : 'Utkast'}
                />
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide">Fra fellesskapet</h2>
            <Link href="/utforsk" className="text-xs text-amber-700 hover:underline">Se alle</Link>
          </div>
          {!(publiserte ?? []).length ? (
            <EmptyState title="Ingen publiserte skjema ennå." />
          ) : (
            <div className="space-y-2">
              {(publiserte ?? []).map((s) => (
                <SchemaListCard
                  key={s.id}
                  id={s.id}
                  href={`/utforsk/${s.id}`}
                  batch_navn={s.batch_navn}
                  bryggedato={s.bryggedato}
                  karakter={s.karakter}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
