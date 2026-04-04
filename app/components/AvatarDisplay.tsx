import Image from 'next/image'

type Size = 'xs' | 'sm' | 'md' | 'lg'

const sizeClasses: Record<Size, { container: string; text: string }> = {
  xs: { container: 'w-6 h-6',  text: 'text-xs' },
  sm: { container: 'w-8 h-8',  text: 'text-sm' },
  md: { container: 'w-12 h-12', text: 'text-base' },
  lg: { container: 'w-24 h-24', text: 'text-3xl' },
}

type Props = {
  url: string | null
  name: string
  size?: Size
  className?: string
}

export default function AvatarDisplay({ url, name, size = 'md', className = '' }: Props) {
  const { container, text } = sizeClasses[size]
  const initials = (name || 'B').slice(0, 2).toUpperCase()

  const base = `${container} rounded-full overflow-hidden ring-2 ring-amber-200 shrink-0 ${className}`

  if (url) {
    return (
      <div className={`relative ${base}`}>
        <Image src={url} alt={name} fill className="object-cover" unoptimized />
      </div>
    )
  }

  return (
    <div className={`${base} bg-amber-100 flex items-center justify-center font-bold text-amber-700 ${text}`}>
      {initials}
    </div>
  )
}
