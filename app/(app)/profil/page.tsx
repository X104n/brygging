import { createClient } from '@/lib/supabase/server'
import AvatarUpload from './AvatarUpload'
import ProfilForm from './ProfilForm'
import Link from 'next/link'
import type { Profile } from '@/lib/profile'

export default async function ProfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-amber-900">Min profil</h1>
        <Link
          href={`/brygger/${user!.id}`}
          className="text-sm text-amber-700 hover:underline"
        >
          Se offentlig profil →
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6 flex flex-col items-center gap-2">
        <AvatarUpload
          userId={user!.id}
          currentUrl={profile?.avatar_url ?? null}
          displayName={profile?.display_name ?? null}
        />
        <p className="text-sm text-zinc-500">{user!.email}</p>
      </div>

      <ProfilForm profile={profile as Profile | null} />
    </div>
  )
}
