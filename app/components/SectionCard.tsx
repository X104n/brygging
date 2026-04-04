type Props = {
  tittel: string
  children: React.ReactNode
  /** If provided, renders a solid coloured header (e.g. "bg-amber-700") */
  headerColor?: string
  /** Optional icon shown beside the title when headerColor is set */
  icon?: React.ReactNode
  id?: string
}

export default function SectionCard({ tittel, children, headerColor, icon, id }: Props) {
  if (headerColor) {
    return (
      <section id={id} className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
        <div className={`${headerColor} px-6 py-4 flex items-center gap-3`}>
          {icon && <div className="text-white">{icon}</div>}
          <h2 className="text-lg font-bold text-white">{tittel}</h2>
        </div>
        <div className="px-6 py-5 space-y-4 text-sm text-zinc-700 leading-relaxed">{children}</div>
      </section>
    )
  }
  return (
    <section id={id} className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6">
      <h2 className="text-lg font-bold text-amber-800 mb-4 pb-2 border-b border-amber-100">
        {tittel}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  )
}
