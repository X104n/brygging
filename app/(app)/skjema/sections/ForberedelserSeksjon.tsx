import SectionCard from '@/app/components/SectionCard'
import FormCheckbox from '@/app/components/FormCheckbox'

type Props = { bool: (f: string) => boolean }

export default function ForberedelserSeksjon({ bool }: Props) {
  return (
    <SectionCard tittel="1 – Forberedelser">
      <FormCheckbox name="sjekk_vannmengde" label="Vannmengde oppmålt" defaultChecked={bool('sjekk_vannmengde')} />
      <FormCheckbox name="sjekk_bryggeutstyr" label="Bryggeutstyr reingjort" defaultChecked={bool('sjekk_bryggeutstyr')} />
      <FormCheckbox name="sjekk_ingredienser" label="Ingredienser målt opp" defaultChecked={bool('sjekk_ingredienser')} />
      <FormCheckbox name="sjekk_gjaeringskar" label="Gjæringskar o.l. desinfisert" defaultChecked={bool('sjekk_gjaeringskar')} />
      <FormCheckbox name="sjekk_meskevann_klargjort" label="Meskevann klargjort" defaultChecked={bool('sjekk_meskevann_klargjort')} />
    </SectionCard>
  )
}
