import SectionCard from '@/app/components/SectionCard'
import FormField from '@/app/components/FormField'
import FormGrid from '@/app/components/FormGrid'

type Props = { str: (f: string) => string }

export default function GenereltSeksjon({ str }: Props) {
  return (
    <SectionCard tittel="Generelt">
      <FormGrid>
        <FormField label="Batch-navn" name="batch_navn" defaultValue={str('batch_navn')} />
        <FormField label="Batch-nr" name="batch_nr" defaultValue={str('batch_nr')} />
      </FormGrid>
      <FormGrid>
        <FormField label="Bryggedato" name="bryggedato" type="date" defaultValue={str('bryggedato')} />
        <FormField label="Tappedato" name="tappedato" type="date" defaultValue={str('tappedato')} />
      </FormGrid>
      <FormGrid>
        <FormField label="Forventa OG" name="forv_og" type="number" step="0.001" defaultValue={str('forv_og')} tooltip="Original Gravity — tettheten til vørteren før gjæring. Typisk 1.040–1.070. Høyere OG = mer sukker = sterkere øl." />
        <FormField label="Forventa FG" name="forv_fg" type="number" step="0.001" defaultValue={str('forv_fg')} tooltip="Final Gravity — forventet tetthet etter gjæring. Differansen mellom OG og FG bestemmer alkoholinnholdet." />
        <FormField label="Effektivitet" name="effektivitet" type="number" step="0.1" enhet="%" defaultValue={str('effektivitet')} tooltip="Hvor mye sukker du fikk ut av maltet ditt vs. teoretisk maks. 70–80% er normalt for hjemmebryggerier." />
      </FormGrid>
      <FormGrid>
        <FormField label="Målt OG" name="malt_og" type="number" step="0.001" defaultValue={str('malt_og')} tooltip="Faktisk målt Original Gravity. Sammenlign med forventa OG for å se om oppskriften traff." />
        <FormField label="Målt FG" name="malt_fg" type="number" step="0.001" defaultValue={str('malt_fg')} tooltip="Faktisk målt Final Gravity etter fullført gjæring. Mål med hydrometer — refraktometer er unøyaktig etter gjæring." />
        <FormField label="ABV" name="abv" type="number" step="0.1" enhet="%" defaultValue={str('abv')} tooltip="Alkohol By Volume. Beregnes fra OG og FG: (OG − FG) × 131,25. F.eks. OG 1.050 og FG 1.010 → 5,25% ABV." />
      </FormGrid>
    </SectionCard>
  )
}
