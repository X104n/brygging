import SectionCard from '@/app/components/SectionCard'
import FormField from '@/app/components/FormField'

type Props = { str: (f: string) => string }

export default function NotatSeksjon({ str }: Props) {
  return (
    <SectionCard tittel="Notater">
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
      <FormField
        label="Karakter"
        name="karakter"
        type="number"
        step="1"
        defaultValue={str('karakter')}
        tooltip="Din subjektive vurdering av ølet fra 1–10. 6 = greit drikkbart, 8 = vil gjerne gjenta, 10 = det beste du har laget."
      />
    </SectionCard>
  )
}
