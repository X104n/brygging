import Tooltip from '@/app/components/Tooltip'

type Props = {
  label: string
  name: string
  type?: string
  defaultValue?: string | number | null
  enhet?: string
  step?: string
  tooltip?: string
}

export default function FormField({ label, name, type = 'text', defaultValue, enhet, step, tooltip }: Props) {
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
