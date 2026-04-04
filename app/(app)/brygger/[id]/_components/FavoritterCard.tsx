import SectionCard from '@/app/components/SectionCard'

type Props = {
  favoritt_ol_stil: string | null
  favoritt_humle: string | null
  favoritt_gjaer: string | null
}

export default function FavoritterCard({ favoritt_ol_stil, favoritt_humle, favoritt_gjaer }: Props) {
  if (!favoritt_ol_stil && !favoritt_humle && !favoritt_gjaer) return null

  return (
    <SectionCard tittel="Favoritter">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {favoritt_ol_stil && (
          <div className="bg-amber-50 rounded-lg p-4 text-center">
            <p className="text-2xl mb-1">🍺</p>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">Ølstil</p>
            <p className="text-sm font-semibold text-zinc-800 mt-0.5">{favoritt_ol_stil}</p>
          </div>
        )}
        {favoritt_humle && (
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-2xl mb-1">🌿</p>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">Humle</p>
            <p className="text-sm font-semibold text-zinc-800 mt-0.5">{favoritt_humle}</p>
          </div>
        )}
        {favoritt_gjaer && (
          <div className="bg-yellow-50 rounded-lg p-4 text-center">
            <p className="text-2xl mb-1">🧫</p>
            <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">Gjær</p>
            <p className="text-sm font-semibold text-zinc-800 mt-0.5">{favoritt_gjaer}</p>
          </div>
        )}
      </div>
    </SectionCard>
  )
}
