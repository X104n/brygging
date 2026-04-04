import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) redirect('/skjema')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">Bryggeskjema</h1>
        <p className="text-zinc-600 mb-8 text-lg">
          Hold styr på bryggeprosessen din. Logg hvert batch, fyll inn sjekklister
          og ta notater — alt på ett sted.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/logg-inn"
            className="bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg px-6 py-3 transition-colors"
          >
            Logg inn
          </Link>
          <Link
            href="/registrer"
            className="border border-amber-700 text-amber-700 hover:bg-amber-100 font-semibold rounded-lg px-6 py-3 transition-colors"
          >
            Registrer deg
          </Link>
        </div>
      </div>
    </div>
  )
}
