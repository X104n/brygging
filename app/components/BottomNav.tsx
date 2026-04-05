'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Compass, BookOpen, Info, User } from 'lucide-react'

const links = [
  { href: '/utforsk', icon: Compass, label: 'Utforsk' },
  { href: '/skjema', icon: BookOpen, label: 'Skjema' },
  { href: '/info', icon: Info, label: 'Brygguiden' },
  { href: '/profil', icon: User, label: 'Profil' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-amber-900 border-t border-amber-800 z-50 safe-area-bottom">
      <div className="flex">
        {links.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 text-xs font-medium transition-colors ${
                active ? 'text-amber-300' : 'text-amber-200/60 hover:text-amber-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'stroke-[2.5]' : ''}`} />
              <span>{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
