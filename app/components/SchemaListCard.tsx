import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'

type Props = {
  id: string
  href: string
  batch_navn: string | null
  batch_nr?: string | null
  bryggedato?: string | null
  karakter?: number | null
  malt_og?: number | null
  malt_fg?: number | null
  abv?: number | null
  /** Shown beneath the title, e.g. brewer name or "Ferdig / Utkast" */
  subtitle?: React.ReactNode
  /** Preview text shown below subtitle */
  preview?: string | null
  badges?: React.ReactNode
  imageUrl?: string | null
}

export default function SchemaListCard({
  href,
  batch_navn,
  batch_nr,
  bryggedato,
  karakter,
  malt_og,
  malt_fg,
  abv,
  subtitle,
  preview,
  badges,
  imageUrl,
}: Props) {
  const dateStr = bryggedato
    ? new Date(bryggedato).toLocaleDateString('nb-NO')
    : null

  const meta = [batch_nr ? `Batch #${batch_nr}` : null, dateStr]
    .filter(Boolean)
    .join(' · ')

  return (
    <Link
      href={href}
      className="bg-white rounded-xl shadow-sm border border-zinc-100 hover:shadow-md hover:border-amber-200 transition-all flex items-stretch overflow-hidden"
    >
      {imageUrl && (
        <div className="relative w-24 sm:w-32 shrink-0">
          <Image src={imageUrl} alt={batch_navn || 'Bilde'} fill className="object-cover" unoptimized />
        </div>
      )}
      <div className="flex-1 min-w-0 flex items-start justify-between gap-4 p-5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-semibold text-zinc-900 text-base">
              {batch_navn || 'Uten navn'}
            </p>
            {badges}
          </div>
          {(meta || subtitle) && (
            <p className="text-sm text-zinc-500 mt-0.5">
              {subtitle}
              {subtitle && meta ? ' · ' : ''}
              {meta}
            </p>
          )}
          {preview && (
            <p className="text-sm text-zinc-500 mt-1 line-clamp-2">{preview}</p>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-zinc-500 shrink-0">
          {malt_og && <span>OG: {malt_og}</span>}
          {malt_fg && <span>FG: {malt_fg}</span>}
          {abv && <span>{abv}%</span>}
          {karakter && (
            <span className="font-bold text-amber-700 text-base flex items-center gap-1">
              <Star className="w-3.5 h-3.5" />
              {karakter}
            </span>
          )}
          <span className="text-zinc-300 text-xl">&rsaquo;</span>
        </div>
      </div>
    </Link>
  )
}
