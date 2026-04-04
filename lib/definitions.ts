export type Bryggeskjema = {
  id: string
  user_id: string
  created_at: string
  updated_at: string
  batch_navn: string | null
  batch_nr: string | null
  bryggedato: string | null
  tappedato: string | null
  forv_og: number | null
  forv_fg: number | null
  malt_og: number | null
  malt_fg: number | null
  abv: number | null
  effektivitet: number | null
  meskevann_liter: number | null
  skyllevann_liter: number | null
  mesketemp: number | null
  mesketid: string | null
  koketid: string | null
  antall_liter_til_kok: number | null
  tidspunkt_start: string | null
  gjaeringstemp: number | null
  antall_liter_gjaering: number | null
  sjekk_vannmengde: boolean
  sjekk_bryggeutstyr: boolean
  sjekk_ingredienser: boolean
  sjekk_gjaeringskar: boolean
  sjekk_meskevann_klargjort: boolean
  sjekk_meskevann_temp: boolean
  sjekk_tilsatt_malt: boolean
  sjekk_rort_i_mesken: boolean
  sjekk_skyllevann_klargjort: boolean
  sjekk_mesking_ferdig: boolean
  sjekk_humle: boolean
  sjekk_gjaernaring: boolean
  sjekk_spiralkjoler: boolean
  sjekk_vorter_kjolt: boolean
  sjekk_malt_og: boolean
  sjekk_oksygenert: boolean
  sjekk_tilsatt_gjaer: boolean
  sjekk_torrhumle: boolean
  bryggenotater: string | null
  smaksnotater: string | null
  karakter: number | null
  published: boolean
  finished: boolean
}
