'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function saveProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logg-inn')

  await supabase.from('profiles').upsert({
    id: user.id,
    display_name: (formData.get('display_name') as string) || null,
    bio: (formData.get('bio') as string) || null,
    hjemmebryggeri: (formData.get('hjemmebryggeri') as string) || null,
    brygg_siden: formData.get('brygg_siden') ? Number(formData.get('brygg_siden')) : null,
    sted: (formData.get('sted') as string) || null,
    favoritt_ol_stil: (formData.get('favoritt_ol_stil') as string) || null,
    favoritt_humle: (formData.get('favoritt_humle') as string) || null,
    favoritt_gjaer: (formData.get('favoritt_gjaer') as string) || null,
  })

  revalidatePath('/profil')
  revalidatePath(`/brygger/${user.id}`)
  return { success: true }
}

export async function saveAvatarUrl(url: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logg-inn')

  await supabase.from('profiles').upsert({ id: user.id, avatar_url: url })

  revalidatePath('/profil')
  revalidatePath(`/brygger/${user.id}`)
}
