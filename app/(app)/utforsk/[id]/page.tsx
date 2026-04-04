import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

function Rad({ label, value }: { label: string; value?: string | number | null }) {
  if (!value && value !== 0) return null
  return (
    <div>
      <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{label}</dt>
      <dd className="text-sm text-zinc-900 mt-0.5">{value}</dd>
    </div>
  )
}

function Seksjon({ tittel, children }: { tittel: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6">
      <h2 className="text-lg font-bold text-amber-800 mb-4 pb-2 border-b border-amber-100">
        {tittel}
      </h2>
      {children}
    </section>
  )
}

function Sjekk({ checked, label }: { checked: boolean; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={checked ? 'text-green-600' : 'text-zinc-300'}>
        {checked ? '☑' : '☐'}
      </span>
      <span className={checked ? 'text-zinc-800' : 'text-zinc-400'}>{label}</span>
    </div>
  )
}

export default async function UtforskDetaljerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from('bryggeskjema')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .single()

  if (!data) notFound()

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name')
    .eq('id', data.user_id)
    .single()

  const brewer = profile?.display_name || 'Ukjent brygg'
  const s = data

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/utforsk" className="text-sm text-zinc-500 hover:text-zinc-700">
            ← Tilbake til Utforsk
          </Link>
          <h1 className="text-2xl font-bold text-amber-900 mt-2">
            {s.batch_navn || 'Uten navn'}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Av{' '}
            <Link href={`/brygger/${s.user_id}`} className="hover:text-amber-700 hover:underline">
              {brewer}
            </Link>
            {s.bryggedato ? ` · Brygget ${new Date(s.bryggedato).toLocaleDateString('nb-NO')}` : ''}
          </p>
        </div>
        {s.karakter && (
          <div className="text-center bg-amber-50 border border-amber-200 rounded-xl px-5 py-3">
            <p className="text-3xl font-bold text-amber-700">{s.karakter}</p>
            <p className="text-xs text-zinc-500">/ 10</p>
          </div>
        )}
      </div>

      <Seksjon tittel="Generelt">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Rad label="Batch-nr" value={s.batch_nr} />
          <Rad label="Bryggedato" value={s.bryggedato ? new Date(s.bryggedato).toLocaleDateString('nb-NO') : null} />
          <Rad label="Tappedato" value={s.tappedato ? new Date(s.tappedato).toLocaleDateString('nb-NO') : null} />
          <Rad label="Forventa OG" value={s.forv_og} />
          <Rad label="Forventa FG" value={s.forv_fg} />
          <Rad label="Effektivitet" value={s.effektivitet != null ? `${s.effektivitet}%` : null} />
          <Rad label="Målt OG" value={s.malt_og} />
          <Rad label="Målt FG" value={s.malt_fg} />
          <Rad label="ABV" value={s.abv != null ? `${s.abv}%` : null} />
        </dl>
      </Seksjon>

      <Seksjon tittel="Meskeprosess">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3 mb-4">
          <Rad label="Meskevann" value={s.meskevann_liter != null ? `${s.meskevann_liter} L` : null} />
          <Rad label="Skyllevann" value={s.skyllevann_liter != null ? `${s.skyllevann_liter} L` : null} />
          <Rad label="Mesketemp" value={s.mesketemp != null ? `${s.mesketemp} °C` : null} />
          <Rad label="Mesketid" value={s.mesketid} />
        </dl>
      </Seksjon>

      <Seksjon tittel="Koking">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Rad label="Koketid" value={s.koketid} />
          <Rad label="Liter til kok" value={s.antall_liter_til_kok} />
          <Rad label="Tidspunkt start" value={s.tidspunkt_start} />
        </dl>
      </Seksjon>

      <Seksjon tittel="Gjæring">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Rad label="Gjæringstemp" value={s.gjaeringstemp != null ? `${s.gjaeringstemp} °C` : null} />
          <Rad label="Antall liter" value={s.antall_liter_gjaering} />
        </dl>
      </Seksjon>

      {(s.bryggenotater || s.smaksnotater) && (
        <Seksjon tittel="Notater">
          {s.bryggenotater && (
            <div className="mb-4">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">Bryggenotater</p>
              <p className="text-sm text-zinc-800 whitespace-pre-wrap">{s.bryggenotater}</p>
            </div>
          )}
          {s.smaksnotater && (
            <div>
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-1">Smaksnotater</p>
              <p className="text-sm text-zinc-800 whitespace-pre-wrap">{s.smaksnotater}</p>
            </div>
          )}
        </Seksjon>
      )}
    </div>
  )
}
