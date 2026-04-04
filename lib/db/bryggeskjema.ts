import { createClient } from '@/lib/supabase/server'

export async function getSkjemaerForUser(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('bryggeskjema')
    .select('id, batch_navn, batch_nr, bryggedato, malt_og, malt_fg, karakter, created_at, finished, published')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function getPublishedSkjemaer(limit = 50) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('bryggeskjema')
    .select('id, batch_navn, batch_nr, bryggedato, malt_og, malt_fg, abv, karakter, smaksnotater, user_id')
    .eq('published', true)
    .order('updated_at', { ascending: false })
    .limit(limit)
  return data ?? []
}

export async function getPublishedSkjemaerForUser(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('bryggeskjema')
    .select('id, batch_navn, batch_nr, bryggedato, malt_og, abv, karakter, smaksnotater')
    .eq('user_id', userId)
    .eq('published', true)
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function getFinishedCount(userId: string) {
  const supabase = await createClient()
  const { count } = await supabase
    .from('bryggeskjema')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('finished', true)
  return count ?? 0
}
