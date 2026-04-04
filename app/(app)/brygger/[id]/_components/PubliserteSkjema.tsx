import SchemaListCard from '@/app/components/SchemaListCard'
import EmptyState from '@/app/components/EmptyState'

type Skjema = {
  id: string
  batch_navn: string | null
  batch_nr: string | null
  bryggedato: string | null
  malt_og: number | null
  abv: number | null
  karakter: number | null
  smaksnotater: string | null
}

export default function PubliserteSkjema({ skjemaer }: { skjemaer: Skjema[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide mb-3">
        Publiserte skjema ({skjemaer.length})
      </h2>
      {!skjemaer.length ? (
        <EmptyState title="Ingen publiserte skjema ennå." />
      ) : (
        <div className="grid gap-4">
          {skjemaer.map((s) => (
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
            />
          ))}
        </div>
      )}
    </div>
  )
}
