'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function togglePublish(id: string, publish: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logg-inn')

  await supabase
    .from('bryggeskjema')
    .update({ published: publish })
    .eq('id', id)
    .eq('user_id', user.id)

  revalidatePath(`/skjema/${id}`)
  revalidatePath('/utforsk')
}

export async function saveDisplayName(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logg-inn')

  const display_name = formData.get('display_name') as string

  await supabase
    .from('profiles')
    .upsert({ id: user.id, display_name: display_name || null })

  revalidatePath('/utforsk')
}
