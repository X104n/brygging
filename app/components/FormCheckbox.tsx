type Props = {
  name: string
  label: string
  defaultChecked?: boolean
}

export default function FormCheckbox({ name, label, defaultChecked }: Props) {
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
