import SectionCard from '@/app/components/SectionCard'
import FormField from '@/app/components/FormField'
import FormCheckbox from '@/app/components/FormCheckbox'
import FormGrid from '@/app/components/FormGrid'

type Props = { str: (f: string) => string; bool: (f: string) => boolean }

export default function MeskeprosessSeksjon({ str, bool }: Props) {
  return (
    <SectionCard tittel="2 – Meskeprosess">
      <FormGrid>
        <FormField label="Meskevann" name="meskevann_liter" type="number" step="0.1" enhet="liter" defaultValue={str('meskevann_liter')} tooltip="Mengden vann du blander med maltet. Typisk 2,5–3,5 liter per kg malt." />
        <FormField label="Skyllevann" name="skyllevann_liter" type="number" step="0.1" enhet="liter" defaultValue={str('skyllevann_liter')} tooltip="Vann brukt til å skylle resterende sukker ut av maltkaken etter mesking." />
        <FormField label="Mesketemp" name="mesketemp" type="number" step="0.1" enhet="°C" defaultValue={str('mesketemp')} tooltip="65–68°C gir balansert øl. Lavere temp → tørrere øl (mer gjærbart sukker). Høyere temp → fyldigere, søtere øl." />
        <FormField label="Mesketid" name="mesketid" defaultValue={str('mesketid')} tooltip="Hvor lenge maltet stod i varmt vann. Typisk 60 minutter. Kortere tid kan gi lavere effektivitet." />
      </FormGrid>
      <FormCheckbox name="sjekk_meskevann_temp" label="Meskevann har riktig temperatur" defaultChecked={bool('sjekk_meskevann_temp')} />
      <FormCheckbox name="sjekk_tilsatt_malt" label="Tilsatt malt og rørt ut klumper" defaultChecked={bool('sjekk_tilsatt_malt')} />
      <FormCheckbox name="sjekk_rort_i_mesken" label="Rørt i mesken (kvart 15. minutt)" defaultChecked={bool('sjekk_rort_i_mesken')} />
      <FormCheckbox name="sjekk_skyllevann_klargjort" label="Skyllevann klargjort til riktig temperatur" defaultChecked={bool('sjekk_skyllevann_klargjort')} />
      <FormCheckbox name="sjekk_mesking_ferdig" label="Mesking og skylling ferdig" defaultChecked={bool('sjekk_mesking_ferdig')} />
    </SectionCard>
  )
}
