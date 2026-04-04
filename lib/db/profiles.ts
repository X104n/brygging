import { createClient } from '@/lib/supabase/server'

export async function getProfile(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return data
}

export async function getProfileNames(userIds: string[]): Promise<Record<string, string | null>> {
  if (!userIds.length) return {}
  const supabase = await createClient()
  const { data } = await supabase
    .from('profiles')
    .select('id, display_name')
    .in('id', userIds)
  return Object.fromEntries((data ?? []).map((p) => [p.id, p.display_name]))
}
