import Link from 'next/link'
import { FlaskConical, BookOpen, Compass, Users, ClipboardList, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/skjema')
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">
      {/* Nav */}
      <header className="bg-amber-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-lg">
          <FlaskConical className="w-5 h-5 text-amber-300" />
          Bryggeskjema
        </div>
        <div className="flex items-center gap-3">
          <Link href="/logg-inn" className="text-sm text-amber-100 hover:text-white px-3 py-1.5 rounded-lg hover:bg-amber-800 transition-colors">
            Logg inn
          </Link>
          <Link href="/registrer" className="text-sm bg-amber-600 hover:bg-amber-500 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors">
            Kom i gang
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 sm:py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <FlaskConical className="w-4 h-4" />
            For hjemmebryggerens hjerte
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-amber-900 mb-4 sm:mb-6 leading-tight">
            Logg brygget ditt.<br />Del det med verden.
          </h1>
          <p className="text-base sm:text-xl text-zinc-600 mb-8 sm:mb-10 leading-relaxed">
            Bryggeskjema hjelper deg å holde oversikt over hele bryggeprosessen —
            fra meskevann til tappedato. Del de beste batchene med andre bryggere.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="/registrer"
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl px-6 py-3 text-base sm:text-lg transition-colors"
            >
              Start gratis <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/logg-inn"
              className="flex items-center justify-center gap-2 w-full sm:w-auto border-2 border-amber-700 text-amber-700 hover:bg-amber-100 font-semibold rounded-xl px-6 py-3 text-base sm:text-lg transition-colors"
            >
              Logg inn
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-zinc-900 mb-12">Alt du trenger for å brygge bedre</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: <ClipboardList className="w-6 h-6 text-amber-600" />,
                tittel: 'Strukturert bryggeskjema',
                tekst: 'Fyll inn sjekklister for alle 5 faser — forberedelser, mesking, koking, nedkjøling og gjæring. Aldri glem et steg igjen.',
              },
              {
                icon: <BookOpen className="w-6 h-6 text-green-600" />,
                tittel: 'Brygguiden',
                tekst: 'Lær hva OG, FG, ABV og effektivitet betyr, og hvorfor det er viktig å logge dem. Innebygd forklaring på hvert felt.',
              },
              {
                icon: <Compass className="w-6 h-6 text-blue-600" />,
                tittel: 'Utforsk andres brygg',
                tekst: 'Publiser dine ferdige skjema og se hva andre hjemmebryggerier har laget. Finn inspirasjon til neste batch.',
              },
              {
                icon: <Users className="w-6 h-6 text-purple-600" />,
                tittel: 'Brygger-profiler',
                tekst: 'Bygg opp din profil med ditt hjemmebryggeri, favoritthumle og -gjær. Se statistikk over dine brygg over tid.',
              },
            ].map((f) => (
              <div key={f.tittel} className="bg-zinc-50 rounded-xl p-6 border border-zinc-100">
                <div className="w-11 h-11 bg-white rounded-lg shadow-sm flex items-center justify-center mb-4 border border-zinc-100">
                  {f.icon}
                </div>
                <h3 className="font-bold text-zinc-900 mb-2">{f.tittel}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{f.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-800 text-white py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-3">Klar til å brygge smartere?</h2>
        <p className="text-amber-200 mb-8">Gratis å bruke. Ingen kredittkort nødvendig.</p>
        <Link
          href="/registrer"
          className="inline-flex items-center gap-2 bg-white text-amber-800 font-bold rounded-xl px-8 py-3 text-lg hover:bg-amber-50 transition-colors"
        >
          Registrer deg nå <ArrowRight className="w-5 h-5" />
        </Link>
      </section>

      <footer className="bg-amber-900 text-amber-300 text-center text-sm py-4">
        Bryggeskjema — laget for hjemmebryggerier
      </footer>
    </div>
  )
}
