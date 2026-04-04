import SectionCard from '@/app/components/SectionCard'
import FormField from '@/app/components/FormField'
import FormCheckbox from '@/app/components/FormCheckbox'
import FormGrid from '@/app/components/FormGrid'

type Props = { str: (f: string) => string; bool: (f: string) => boolean }

export default function KokingSeksjon({ str, bool }: Props) {
  return (
    <SectionCard tittel="3 – Koking">
      <FormGrid>
        <FormField label="Koketid" name="koketid" defaultValue={str('koketid')} tooltip="Standard er 60 min. 90 min brukes ved pilsnermalt for å drive bort DMS. Lengre kok = mer bitterhet og fordampning." />
        <FormField label="Liter til kok" name="antall_liter_til_kok" type="number" step="0.1" defaultValue={str('antall_liter_til_kok')} tooltip="Volum vørter du starter koket med. Vil alltid bli redusert med 10–15% per time pga. fordampning." />
        <FormField label="Tidspunkt start" name="tidspunkt_start" type="time" defaultValue={str('tidspunkt_start')} />
      </FormGrid>
      <FormCheckbox name="sjekk_humle" label="Humle og andre tilsetninger" defaultChecked={bool('sjekk_humle')} />
      <FormCheckbox name="sjekk_gjaernaring" label="Gjærnæring og klarning" defaultChecked={bool('sjekk_gjaernaring')} />
      <FormCheckbox name="sjekk_spiralkjoler" label="Spiralkjøler desinfisert 15 min" defaultChecked={bool('sjekk_spiralkjoler')} />
    </SectionCard>
  )
}
