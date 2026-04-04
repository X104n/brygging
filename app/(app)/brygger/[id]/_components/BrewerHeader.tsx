import AvatarDisplay from '@/app/components/AvatarDisplay'

type Profile = {
  display_name: string | null
  hjemmebryggeri: string | null
  sted: string | null
  brygg_siden: number | null
  bio: string | null
  avatar_url: string | null
}

type Props = {
  profile: Profile
  totalFinished: number
  publishedCount: number
  avgKarakter: string | null
}

export default function BrewerHeader({ profile, totalFinished, publishedCount, avgKarakter }: Props) {
  const navn = profile.display_name || 'Ukjent brygg'
  const år = profile.brygg_siden ? new Date().getFullYear() - profile.brygg_siden : null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 p-8">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <AvatarDisplay url={profile.avatar_url} name={navn} size="lg" />
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

      <div className="mt-6 pt-6 border-t border-zinc-100 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-amber-700">{totalFinished}</p>
          <p className="text-xs text-zinc-500 mt-0.5">Ferdige brygg</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-amber-700">{publishedCount}</p>
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
  )
}
