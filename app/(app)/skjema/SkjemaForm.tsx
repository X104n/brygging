'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { lagreSkjema } from '@/app/actions/skjema'
import type { Bryggeskjema } from '@/lib/definitions'
import Link from 'next/link'
import Tooltip from './Tooltip'

type Props = { skjema?: Bryggeskjema }
type Source = Record<string, unknown>

function serializeForm(form: HTMLFormElement): Record<string, string | boolean> {
  const data: Record<string, string | boolean> = {}
  for (const el of Array.from(form.elements)) {
    if (el instanceof HTMLInputElement && el.name) {
      data[el.name] = el.type === 'checkbox' ? el.checked : el.value
    } else if (el instanceof HTMLTextAreaElement && el.name) {
      data[el.name] = el.value
    }
  }
  return data
}

function Seksjon({ tittel, children }: { tittel: string; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6">
      <h2 className="text-lg font-bold text-amber-800 mb-4 pb-2 border-b border-amber-100">
        {tittel}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

function Felt({
  label,
  name,
  type = 'text',
  defaultValue,
  enhet,
  step,
  tooltip,
}: {
  label: string
  name: string
  type?: string
  defaultValue?: string | number | null
  enhet?: string
  step?: string
  tooltip?: string
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor={name}>
        {label}
        {enhet && <span className="text-zinc-400 font-normal ml-1">({enhet})</span>}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        step={step}
        defaultValue={defaultValue ?? ''}
        className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
    </div>
  )
}

function Sjekk({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="w-4 h-4 accent-amber-700 rounded"
      />
      <span className="text-sm text-zinc-700 group-hover:text-zinc-900">{label}</span>
    </label>
  )
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">{children}</div>
}

export default function SkjemaForm({ skjema }: Props) {
  const id = skjema?.id ?? null
  const draftKey = `bryggeskjema_draft_${id ?? 'new'}`

  const [source, setSource] = useState<Source>(skjema ?? {})
  const [draftLoaded, setDraftLoaded] = useState(false)
  const [restoredFromDraft, setRestoredFromDraft] = useState(false)
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load draft from localStorage before first render
  useEffect(() => {
    const saved = localStorage.getItem(draftKey)
    if (saved) {
      try {
        setSource(JSON.parse(saved))
        setRestoredFromDraft(true)
      } catch {}
    }
    setDraftLoaded(true)
  }, [draftKey])

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      localStorage.setItem(draftKey, JSON.stringify(serializeForm(form)))
      setSavedAt(new Date().toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' }))
    }, 1500)
  }

  const handleSubmit = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    localStorage.removeItem(draftKey)
  }

  const discardDraft = () => {
    localStorage.removeItem(draftKey)
    setSource(skjema ?? {})
    setRestoredFromDraft(false)
    setSavedAt(null)
  }

  const action = lagreSkjema.bind(null, id)
  const [state, formAction, pending] = useActionState(
    async (_: unknown, formData: FormData) => action(formData),
    null
  )

  // Helpers to read from source (handles both DB types and serialized draft strings)
  const str = (field: string) => {
    const v = source[field]
    return v != null ? String(v) : ''
  }
  const bool = (field: string) => {
    const v = source[field]
    return v === true || v === 'true'
  }

  // Delay rendering until we've checked localStorage to avoid defaultValue flash
  if (!draftLoaded) return null

  return (
    <form action={formAction} onChange={handleChange} onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-amber-900">
          {skjema ? 'Rediger skjema' : 'Nytt bryggeskjema'}
        </h1>
        <Link href="/skjema" className="text-sm text-zinc-500 hover:text-zinc-700">
          Avbryt
        </Link>
      </div>

      {/* Draft status bar */}
      {(restoredFromDraft || savedAt) && (
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 text-sm">
          <span className="text-amber-800">
            {restoredFromDraft && !savedAt
              ? 'Utkast gjenopprettet fra forrige økt'
              : `Utkast lagret kl. ${savedAt}`}
          </span>
          {restoredFromDraft && (
            <button
              type="button"
              onClick={discardDraft}
              className="text-amber-700 hover:text-amber-900 hover:underline ml-4"
            >
              Forkast utkast
            </button>
          )}
        </div>
      )}

      <Seksjon tittel="Generelt">
        <Grid>
          <Felt label="Batch-navn" name="batch_navn" defaultValue={str('batch_navn')} />
          <Felt label="Batch-nr" name="batch_nr" defaultValue={str('batch_nr')} />
        </Grid>
        <Grid>
          <Felt label="Bryggedato" name="bryggedato" type="date" defaultValue={str('bryggedato')} />
          <Felt label="Tappedato" name="tappedato" type="date" defaultValue={str('tappedato')} />
        </Grid>
        <Grid>
          <Felt label="Forventa OG" name="forv_og" type="number" step="0.001" defaultValue={str('forv_og')} tooltip="Original Gravity — tettheten til vørteren før gjæring. Typisk 1.040–1.070. Høyere OG = mer sukker = sterkere øl." />
          <Felt label="Forventa FG" name="forv_fg" type="number" step="0.001" defaultValue={str('forv_fg')} tooltip="Final Gravity — forventet tetthet etter gjæring. Differansen mellom OG og FG bestemmer alkoholinnholdet." />
          <Felt label="Effektivitet" name="effektivitet" type="number" step="0.1" enhet="%" defaultValue={str('effektivitet')} tooltip="Hvor mye sukker du fikk ut av maltet ditt vs. teoretisk maks. 70–80% er normalt for hjemmebryggerier." />
        </Grid>
        <Grid>
          <Felt label="Målt OG" name="malt_og" type="number" step="0.001" defaultValue={str('malt_og')} tooltip="Faktisk målt Original Gravity. Sammenlign med forventa OG for å se om oppskriften traff." />
          <Felt label="Målt FG" name="malt_fg" type="number" step="0.001" defaultValue={str('malt_fg')} tooltip="Faktisk målt Final Gravity etter fullført gjæring. Mål med hydrometer — refraktometer er unøyaktig etter gjæring." />
          <Felt label="ABV" name="abv" type="number" step="0.1" enhet="%" defaultValue={str('abv')} tooltip="Alkohol By Volume. Beregnes fra OG og FG: (OG − FG) × 131,25. F.eks. OG 1.050 og FG 1.010 → 5,25% ABV." />
        </Grid>
      </Seksjon>

      <Seksjon tittel="1 – Forberedelser">
        <Sjekk name="sjekk_vannmengde" label="Vannmengde oppmålt" defaultChecked={bool('sjekk_vannmengde')} />
        <Sjekk name="sjekk_bryggeutstyr" label="Bryggeutstyr reingjort" defaultChecked={bool('sjekk_bryggeutstyr')} />
        <Sjekk name="sjekk_ingredienser" label="Ingredienser målt opp" defaultChecked={bool('sjekk_ingredienser')} />
        <Sjekk name="sjekk_gjaeringskar" label="Gjæringskar o.l. desinfisert" defaultChecked={bool('sjekk_gjaeringskar')} />
        <Sjekk name="sjekk_meskevann_klargjort" label="Meskevann klargjort" defaultChecked={bool('sjekk_meskevann_klargjort')} />
      </Seksjon>

      <Seksjon tittel="2 – Meskeprosess">
        <Grid>
          <Felt label="Meskevann" name="meskevann_liter" type="number" step="0.1" enhet="liter" defaultValue={str('meskevann_liter')} tooltip="Mengden vann du blander med maltet. Typisk 2,5–3,5 liter per kg malt." />
          <Felt label="Skyllevann" name="skyllevann_liter" type="number" step="0.1" enhet="liter" defaultValue={str('skyllevann_liter')} tooltip="Vann brukt til å skylle resterende sukker ut av maltkaken etter mesking." />
          <Felt label="Mesketemp" name="mesketemp" type="number" step="0.1" enhet="°C" defaultValue={str('mesketemp')} tooltip="65–68°C gir balansert øl. Lavere temp → tørrere øl (mer gjærbart sukker). Høyere temp → fyldigere, søtere øl." />
          <Felt label="Mesketid" name="mesketid" defaultValue={str('mesketid')} tooltip="Hvor lenge maltet stod i varmt vann. Typisk 60 minutter. Kortere tid kan gi lavere effektivitet." />
        </Grid>
        <Sjekk name="sjekk_meskevann_temp" label="Meskevann har riktig temperatur" defaultChecked={bool('sjekk_meskevann_temp')} />
        <Sjekk name="sjekk_tilsatt_malt" label="Tilsatt malt og rørt ut klumper" defaultChecked={bool('sjekk_tilsatt_malt')} />
        <Sjekk name="sjekk_rort_i_mesken" label="Rørt i mesken (kvart 15. minutt)" defaultChecked={bool('sjekk_rort_i_mesken')} />
        <Sjekk name="sjekk_skyllevann_klargjort" label="Skyllevann klargjort til riktig temperatur" defaultChecked={bool('sjekk_skyllevann_klargjort')} />
        <Sjekk name="sjekk_mesking_ferdig" label="Mesking og skylling ferdig" defaultChecked={bool('sjekk_mesking_ferdig')} />
      </Seksjon>

      <Seksjon tittel="3 – Koking">
        <Grid>
          <Felt label="Koketid" name="koketid" defaultValue={str('koketid')} tooltip="Standard er 60 min. 90 min brukes ved pilsnermalt for å drive bort DMS. Lengre kok = mer bitterhet og fordampning." />
          <Felt label="Liter til kok" name="antall_liter_til_kok" type="number" step="0.1" defaultValue={str('antall_liter_til_kok')} tooltip="Volum vørter du starter koket med. Vil alltid bli redusert med 10–15% per time pga. fordampning." />
          <Felt label="Tidspunkt start" name="tidspunkt_start" type="time" defaultValue={str('tidspunkt_start')} />
        </Grid>
        <Sjekk name="sjekk_humle" label="Humle og andre tilsetninger" defaultChecked={bool('sjekk_humle')} />
        <Sjekk name="sjekk_gjaernaring" label="Gjærnæring og klarning" defaultChecked={bool('sjekk_gjaernaring')} />
        <Sjekk name="sjekk_spiralkjoler" label="Spiralkjøler desinfisert 15 min" defaultChecked={bool('sjekk_spiralkjoler')} />
      </Seksjon>

      <Seksjon tittel="4 – Nedkjøling">
        <Sjekk name="sjekk_vorter_kjolt" label="Vørter kjølt ned" defaultChecked={bool('sjekk_vorter_kjolt')} />
        <Sjekk name="sjekk_malt_og" label="Målt Original Gravity" defaultChecked={bool('sjekk_malt_og')} />
      </Seksjon>

      <Seksjon tittel="5 – Gjæring">
        <Grid>
          <Felt label="Gjæringstemp" name="gjaeringstemp" type="number" step="0.1" enhet="°C" defaultValue={str('gjaeringstemp')} tooltip="Ale-gjær trives ved 16–22°C. Lager-gjær ved 8–12°C. For høy temp gir fuselalkoholer og ubehagelig smak." />
          <Felt label="Antall liter" name="antall_liter_gjaering" type="number" step="0.1" defaultValue={str('antall_liter_gjaering')} tooltip="Ferdig volum overført til gjæringskar. Nyttig for å beregne faktisk batch-størrelse." />
        </Grid>
        <Sjekk name="sjekk_oksygenert" label="Oksygenert vørter" defaultChecked={bool('sjekk_oksygenert')} />
        <Sjekk name="sjekk_tilsatt_gjaer" label="Tilsatt gjær" defaultChecked={bool('sjekk_tilsatt_gjaer')} />
        <Sjekk name="sjekk_torrhumle" label="Tilsatt tørrhumle eller tilsetninger" defaultChecked={bool('sjekk_torrhumle')} />
      </Seksjon>

      <Seksjon tittel="Notater">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="bryggenotater">
            Bryggenotater
          </label>
          <textarea
            id="bryggenotater"
            name="bryggenotater"
            rows={4}
            defaultValue={str('bryggenotater')}
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-y"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="smaksnotater">
            Smaksnotater
          </label>
          <textarea
            id="smaksnotater"
            name="smaksnotater"
            rows={4}
            defaultValue={str('smaksnotater')}
            className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-y"
          />
        </div>
        <Felt label="Karakter" name="karakter" type="number" step="1" defaultValue={str('karakter')} tooltip="Din subjektive vurdering av ølet fra 1–10. 6 = greit drikkbart, 8 = vil gjerne gjenta, 10 = det beste du har laget." />
      </Seksjon>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">{state.error}</p>
      )}

      <div className="flex justify-end gap-3 pb-8">
        <Link
          href="/skjema"
          className="rounded-lg border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
        >
          Avbryt
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg px-6 py-2 text-sm transition-colors disabled:opacity-50"
        >
          {pending ? 'Lagrer…' : 'Lagre skjema'}
        </button>
      </div>
    </form>
  )
}
