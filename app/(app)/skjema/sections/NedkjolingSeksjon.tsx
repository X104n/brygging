import SectionCard from '@/app/components/SectionCard'
import FormCheckbox from '@/app/components/FormCheckbox'

type Props = { bool: (f: string) => boolean }

export default function NedkjolingSeksjon({ bool }: Props) {
  return (
    <SectionCard tittel="4 – Nedkjøling">
      <FormCheckbox name="sjekk_vorter_kjolt" label="Vørter kjølt ned" defaultChecked={bool('sjekk_vorter_kjolt')} />
      <FormCheckbox name="sjekk_malt_og" label="Målt Original Gravity" defaultChecked={bool('sjekk_malt_og')} />
    </SectionCard>
  )
}
