import { createClient } from '@/lib/supabase/server'
import { loggUt } from '@/app/actions/auth'
import Link from 'next/link'
import { Compass, BookOpen, User, LogOut, FlaskConical, Info, LogIn } from 'lucide-react'
import BottomNav from '@/app/components/BottomNav'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const profile = user
    ? (await supabase.from('profiles').select('display_name, avatar_url').eq('id', user.id).single()).data
    : null

  const displayName = profile?.display_name || user?.email?.split('@')[0] || 'Profil'

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <header className="bg-amber-900 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">

          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-base sm:text-lg tracking-tight hover:opacity-90 transition-opacity shrink-0"
          >
            <FlaskConical className="w-5 h-5 text-amber-300" />
            <span className="hidden xs:inline sm:inline">Bryggeskjema</span>
            <span className="xs:hidden sm:hidden">Brygg</span>
          </Link>

          {/* Nav links — hidden on mobile, handled by BottomNav */}
          <nav className="hidden sm:flex items-center gap-1">
            <Link
              href="/utforsk"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-amber-100 hover:text-white hover:bg-amber-800 transition-colors"
            >
              <Compass className="w-4 h-4" />
              Utforsk
            </Link>
            {user && (
              <Link
                href="/skjema"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-amber-100 hover:text-white hover:bg-amber-800 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Mine skjema
              </Link>
            )}
            <Link
              href="/info"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-amber-100 hover:text-white hover:bg-amber-800 transition-colors"
            >
              <Info className="w-4 h-4" />
              Brygguiden
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {user ? (
              <>
                <Link
                  href="/profil"
                  className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg text-sm font-medium text-amber-100 hover:text-white hover:bg-amber-800 transition-colors"
                >
                  {profile?.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.avatar_url}
                      alt={displayName}
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-amber-300"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline max-w-[120px] truncate">{displayName}</span>
                </Link>
                <form action={loggUt}>
                  <button
                    type="submit"
                    title="Logg ut"
                    className="flex items-center gap-1.5 px-2 sm:px-3 py-2 rounded-lg text-sm font-medium text-amber-200 hover:text-white hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logg ut</span>
                  </button>
                </form>
              </>
            ) : (
              <Link
                href="/logg-inn"
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-amber-700 hover:bg-amber-600 text-white transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>Logg inn</span>
              </Link>
            )}
          </div>

        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8 pb-24 sm:pb-8">
        {children}
      </main>

      <BottomNav />
    </div>
  )
}
