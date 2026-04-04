import SectionCard from '@/app/components/SectionCard'
import FormField from '@/app/components/FormField'
import FormCheckbox from '@/app/components/FormCheckbox'
import FormGrid from '@/app/components/FormGrid'

type Props = { str: (f: string) => string; bool: (f: string) => boolean }

export default function GjaeringSeksjon({ str, bool }: Props) {
  return (
    <SectionCard tittel="5 – Gjæring">
      <FormGrid>
        <FormField label="Gjæringstemp" name="gjaeringstemp" type="number" step="0.1" enhet="°C" defaultValue={str('gjaeringstemp')} tooltip="Ale-gjær trives ved 16–22°C. Lager-gjær ved 8–12°C. For høy temp gir fuselalkoholer og ubehagelig smak." />
        <FormField label="Antall liter" name="antall_liter_gjaering" type="number" step="0.1" defaultValue={str('antall_liter_gjaering')} tooltip="Ferdig volum overført til gjæringskar. Nyttig for å beregne faktisk batch-størrelse." />
      </FormGrid>
      <FormCheckbox name="sjekk_oksygenert" label="Oksygenert vørter" defaultChecked={bool('sjekk_oksygenert')} />
      <FormCheckbox name="sjekk_tilsatt_gjaer" label="Tilsatt gjær" defaultChecked={bool('sjekk_tilsatt_gjaer')} />
      <FormCheckbox name="sjekk_torrhumle" label="Tilsatt tørrhumle eller tilsetninger" defaultChecked={bool('sjekk_torrhumle')} />
    </SectionCard>
  )
}
