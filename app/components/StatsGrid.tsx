type Stat = {
  label: string
  value: string | number | null
}

export default function StatsGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
      {stats.map((s) => (
        <div key={s.label} className="bg-white rounded-xl border border-zinc-100 shadow-sm p-5 text-center">
          <p className="text-3xl font-bold text-amber-700">{s.value ?? '–'}</p>
          <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
        </div>
      ))}
    </div>
  )
}
