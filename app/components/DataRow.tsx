type Props = {
  label: string
  value?: string | number | null
}

export function DataRow({ label, value }: Props) {
  if (value === null || value === undefined || value === '') return null
  return (
    <div>
      <dt className="text-xs font-medium text-zinc-500 uppercase tracking-wide">{label}</dt>
      <dd className="text-sm text-zinc-900 mt-0.5">{value}</dd>
    </div>
  )
}

export function DataGrid({ children }: { children: React.ReactNode }) {
  return (
    <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">{children}</dl>
  )
}
