'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function parseChecks(formData: FormData, keys: string[]) {
  return Object.fromEntries(keys.map((k) => [k, formData.get(k) === 'on']))
}

function num(val: FormDataEntryValue | null) {
  if (!val || val === '') return null
  const n = parseFloat(val as string)
  return isNaN(n) ? null : n
}

function str(val: FormDataEntryValue | null) {
  if (!val || val === '') return null
  return val as string
}

export async function lagreSkjema(id: string | null, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/logg-inn')

  const data = {
    user_id: user.id,
    batch_navn: str(formData.get('batch_navn')),
    batch_nr: str(formData.get('batch_nr')),
    bryggedato: str(formData.get('bryggedato')),
    tappedato: str(formData.get('tappedato')),
    forv_og: num(formData.get('forv_og')),
    forv_fg: num(formData.get('forv_fg')),
    malt_og: num(formData.get('malt_og')),
    malt_fg: num(formData.get('malt_fg')),
    abv: num(formData.get('abv')),
    effektivitet: num(formData.get('effektivitet')),
    meskevann_liter: num(formData.get('meskevann_liter')),
    skyllevann_liter: num(formData.get('skyllevann_liter')),
    mesketemp: num(formData.get('mesketemp')),
    mesketid: str(formData.get('mesketid')),
    koketid: str(formData.get('koketid')),
    antall_liter_til_kok: num(formData.get('antall_liter_til_kok')),
    tidspunkt_start: str(formData.get('tidspunkt_start')),
    gjaeringstemp: num(formData.get('gjaeringstemp')),
    antall_liter_gjaering: num(formData.get('antall_liter_gjaering')),
    ...parseChecks(formData, [
      'sjekk_vannmengde',
      'sjekk_bryggeutstyr',
      'sjekk_ingredienser',
      'sjekk_gjaeringskar',
      'sjekk_meskevann_klargjort',
      'sjekk_meskevann_temp',
      'sjekk_tilsatt_malt',
      'sjekk_rort_i_mesken',
      'sjekk_skyllevann_klargjort',
      'sjekk_mesking_ferdig',
      'sjekk_humle',
      'sjekk_gjaernaring',
      'sjekk_spiralkjoler',
      'sjekk_vorter_kjolt',
      'sjekk_malt_og',
      'sjekk_oksygenert',
      'sjekk_tilsatt_gjaer',
      'sjekk_torrhumle',
    ]),
    bryggenotater: str(formData.get('bryggenotater')),
    smaksnotater: str(formData.get('smaksnotater')),
    karakter: num(formData.get('karakter')),
  }

  if (id) {
    const { error } = await supabase
      .from('bryggeskjema')
      .update(data)
      .eq('id', id)
      .eq('user_id', user.id)

    if (error) return { error: error.message }
  } else {
    const { error } = await supabase.from('bryggeskjema').insert(data)
    if (error) return { error: error.message }
  }

  revalidatePath('/skjema')
  redirect('/skjema')
}

export async function saveBildeUrl(skjemaId: string, url: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logg-inn')

  await supabase
    .from('bryggeskjema')
    .update({ bilde_url: url })
    .eq('id', skjemaId)
    .eq('user_id', user.id)

  revalidatePath(`/skjema/${skjemaId}`)
  revalidatePath(`/utforsk/${skjemaId}`)
}

export async function slettSkjema(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/logg-inn')

  await supabase
    .from('bryggeskjema')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  revalidatePath('/skjema')
  redirect('/skjema')
}
