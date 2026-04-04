import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { loggUt } from '@/app/actions/auth'
import Link from 'next/link'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/logg-inn')

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      <header className="bg-amber-800 text-white px-6 py-4 flex items-center justify-between shadow">
        <Link href="/skjema" className="text-xl font-bold tracking-tight hover:opacity-90">
          Bryggeskjema
        </Link>
        <nav className="flex gap-4 text-sm font-medium">
          <Link href="/skjema" className="opacity-80 hover:opacity-100 transition-opacity">
            Mine skjema
          </Link>
          <Link href="/utforsk" className="opacity-80 hover:opacity-100 transition-opacity">
            Utforsk
          </Link>
        </nav>
        <div className="flex items-center gap-4 text-sm">
          <span className="opacity-70">{user.email}</span>
          <form action={loggUt}>
            <button
              type="submit"
              className="bg-amber-700 hover:bg-amber-600 border border-amber-600 rounded-lg px-3 py-1 transition-colors"
            >
              Logg ut
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
