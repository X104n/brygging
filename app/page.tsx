import Link from 'next/link'
import { FlaskConical, BookOpen, Compass, ArrowRight, Star, ChevronRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/skjema')

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">

      {/* Header */}
      <header className="bg-amber-900 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-base sm:text-lg tracking-tight shrink-0">
            <FlaskConical className="w-5 h-5 text-amber-300" />
            <span>Bryggeskjema</span>
          </div>
          <nav className="hidden sm:flex items-center gap-1">
            <Link href="/utforsk" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-amber-100 hover:text-white hover:bg-amber-800 transition-colors">
              <Compass className="w-4 h-4" /> Utforsk
            </Link>
            <Link href="/info" className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-amber-100 hover:text-white hover:bg-amber-800 transition-colors">
              <BookOpen className="w-4 h-4" /> Brygguiden
            </Link>
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/logg-inn" className="text-sm text-amber-100 hover:text-white px-3 py-1.5 rounded-lg hover:bg-amber-800 transition-colors">
              Logg inn
            </Link>
            <Link href="/registrer" className="text-sm bg-amber-600 hover:bg-amber-500 text-white font-semibold px-4 py-1.5 rounded-lg transition-colors">
              Registrer
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white">
        <FlaskConical className="absolute -right-8 -bottom-8 w-72 h-72 text-white/5 pointer-events-none" />
        <FlaskConical className="absolute right-48 top-6 w-14 h-14 text-white/10 rotate-12 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 py-16 sm:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-amber-200 mb-6">
            <FlaskConical className="w-4 h-4" />
            For hjemmebryggerens hjerte
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-5">
            Logg brygget ditt.<br />
            <span className="text-amber-300">Del det med verden.</span>
          </h1>
          <p className="text-lg sm:text-xl text-amber-100/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Bryggeskjema hjelper deg å holde oversikt over hele bryggeprosessen —
            fra meskevann til tappedato.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/registrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-amber-900 hover:bg-amber-50 font-bold rounded-xl px-7 py-3.5 text-base transition-colors shadow-lg"
            >
              Start gratis <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/utforsk"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-semibold rounded-xl px-7 py-3.5 text-base transition-colors"
            >
              <Compass className="w-5 h-5" /> Utforsk brygg
            </Link>
          </div>
        </div>
      </section>

      {/* Explore without account */}
      <section className="bg-white py-14 px-4 border-b border-zinc-100">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest text-center mb-8">
            Ingen konto nødvendig
          </p>
          <div className="grid sm:grid-cols-2 gap-5">

            {/* Utforsk card */}
            <Link
              href="/utforsk"
              className="group relative bg-gradient-to-br from-stone-900 via-amber-950 to-amber-800 rounded-2xl overflow-hidden p-6 text-white hover:scale-[1.02] transition-transform shadow-md"
            >
              <Compass className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 pointer-events-none" />
              <div className="relative">
                <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5 text-amber-300" />
                </div>
                <h2 className="text-xl font-bold mb-2">Utforsk brygg</h2>
                <p className="text-amber-200/80 text-sm leading-relaxed mb-5">
                  Se hva andre hjemmebryggerier har laget. Finn inspirasjon til neste batch — uten å opprette konto.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 group-hover:gap-2.5 transition-all">
                  Bla gjennom brygg <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Brygguiden card */}
            <Link
              href="/info"
              className="group relative bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-700 rounded-2xl overflow-hidden p-6 text-white hover:scale-[1.02] transition-transform shadow-md"
            >
              <BookOpen className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10 pointer-events-none" />
              <div className="relative">
                <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5 text-emerald-300" />
                </div>
                <h2 className="text-xl font-bold mb-2">Brygguiden</h2>
                <p className="text-teal-200/80 text-sm leading-relaxed mb-5">
                  Lær om OG, FG, ABV, mesking og gjæring med interaktive kalkulatorer og forklaringer.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-300 group-hover:gap-2.5 transition-all">
                  Les guiden <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* Features — what you get with an account */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">Med konto</p>
            <h2 className="text-2xl font-bold text-zinc-900">Alt du trenger for å brygge bedre</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                emoji: '📋',
                tittel: 'Strukturert bryggeskjema',
                tekst: 'Sjekklister for alle 5 faser. Aldri glem et steg igjen.',
              },
              {
                emoji: '📸',
                tittel: 'Bilde & smaksnotater',
                tekst: 'Legg til bilde og smaksbeskrivelse. Gi hvert batch en karakter.',
              },
              {
                emoji: '🌍',
                tittel: 'Publiser til utforsk',
                tekst: 'Del de beste batchene dine. Bygg opp din brygger-profil.',
              },
            ].map((f) => (
              <div key={f.tittel} className="bg-white rounded-xl p-5 border border-zinc-100 shadow-sm text-center">
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="font-bold text-zinc-900 mb-1.5 text-sm">{f.tittel}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{f.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-800 text-white py-16 px-4 text-center">
        <Star className="w-8 h-8 text-amber-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Klar til å brygge smartere?</h2>
        <p className="text-amber-200/80 mb-8 text-sm">Gratis å bruke. Ingen kredittkort nødvendig.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/registrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-amber-800 font-bold rounded-xl px-8 py-3 text-base hover:bg-amber-50 transition-colors shadow"
          >
            Registrer deg gratis <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/logg-inn"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold rounded-xl px-8 py-3 text-base hover:bg-white/10 transition-colors"
          >
            Logg inn
          </Link>
        </div>
      </section>

      <footer className="bg-amber-900 text-amber-400 text-center text-xs py-5 flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5">
          <FlaskConical className="w-3.5 h-3.5" /> Bryggeskjema
        </span>
        <span className="text-amber-700">·</span>
        <Link href="/utforsk" className="hover:text-amber-200 transition-colors">Utforsk</Link>
        <span className="text-amber-700">·</span>
        <Link href="/info" className="hover:text-amber-200 transition-colors">Brygguiden</Link>
        <span className="text-amber-700">·</span>
        <Link href="/logg-inn" className="hover:text-amber-200 transition-colors">Logg inn</Link>
      </footer>

    </div>
  )
}
