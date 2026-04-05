import Link from 'next/link'
import {
  FlaskConical, Thermometer, Clock, Droplets,
  BarChart3, BookOpen, Star,
} from 'lucide-react'
import Accordion from '@/app/components/Accordion'
import AbvKalkulator from '@/app/components/AbvKalkulator'
import MeskevannKalkulator from '@/app/components/MeskevannKalkulator'
import FordampningsKalkulator from '@/app/components/FordampningsKalkulator'
import GjaeringsGuide from '@/app/components/GjaeringsGuide'
import KarakterSkala from '@/app/components/KarakterSkala'

function Begrep({ tittel, children }: { tittel: string; children: React.ReactNode }) {
  return (
    <div className="border-l-4 border-amber-300 pl-4">
      <p className="font-semibold text-zinc-900">{tittel}</p>
      <p className="mt-0.5">{children}</p>
    </div>
  )
}

function Tips({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-amber-900 text-sm">
      <span className="font-semibold">Tips: </span>{children}
    </div>
  )
}

const prosessSteg = [
  { nr: 1, label: 'Forberedelse', href: '#graviteter', farge: 'bg-amber-100 text-amber-800 border-amber-200' },
  { nr: 2, label: 'Mesking', href: '#meskeprosess', farge: 'bg-orange-100 text-orange-800 border-orange-200' },
  { nr: 3, label: 'Koking', href: '#koking', farge: 'bg-red-100 text-red-800 border-red-200' },
  { nr: 4, label: 'Nedkjøling', href: '#nedkjoling', farge: 'bg-blue-100 text-blue-800 border-blue-200' },
  { nr: 5, label: 'Gjæring', href: '#gjaering', farge: 'bg-green-100 text-green-800 border-green-200' },
]

export default function InfoPage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero banner */}
      <div className="-mx-4 -mt-6 sm:-mt-8 mb-8 relative overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-700">
        <BookOpen className="absolute -right-4 -bottom-4 w-48 h-48 text-white/5 pointer-events-none" />
        <BookOpen className="absolute right-24 top-3 w-10 h-10 text-white/10 -rotate-6 pointer-events-none" />

        <div className="relative px-6 pt-10 pb-8 sm:pt-14 sm:pb-10">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="bg-white/10 border border-white/20 rounded-lg p-1.5">
              <BookOpen className="w-4 h-4 text-emerald-200" />
            </div>
            <span className="text-emerald-300 text-xs font-semibold uppercase tracking-widest">
              Kunnskap
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">Brygguiden</h1>
          <p className="text-teal-200/70 mt-2 text-sm sm:text-base max-w-md">
            Alt du trenger å vite om prosessen — fra OG til tappedato
          </p>
        </div>
      </div>

      {/* Brewing process stepper */}
      <div className="mb-8">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
          Bryggeprosessen
        </p>
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-1">
          {prosessSteg.map((steg, i) => (
            <div key={steg.nr} className="flex items-center gap-1 sm:gap-2 shrink-0">
              <a
                href={steg.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-colors hover:opacity-80 ${steg.farge}`}
              >
                <span className="font-bold opacity-60">{steg.nr}.</span>
                {steg.label}
              </a>
              {i < prosessSteg.length - 1 && (
                <span className="text-zinc-300 text-sm">→</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Accordion sections */}
      <div className="space-y-3">
        <Accordion
          id="graviteter"
          tittel="Graviteter, effektivitet & ABV"
          tagline="OG, FG, alkohol og effektivitet forklart"
          icon={<BarChart3 className="w-5 h-5" />}
          farge="bg-amber-700"
          defaultOpen
        >
          <p>
            Gravitet måler tettheten til vørteren sammenlignet med rent vann (1.000). Sukker øker
            tettheten, og når gjæren spiser sukkeret synker den igjen. Disse to målingene er
            grunnlaget for å beregne alkoholinnholdet.
          </p>

          <Begrep tittel="OG — Original Gravity (forventa & målt)">
            Tettheten <em>før</em> gjæring starter. En session-øl ligger typisk på 1.040,
            en sterk barleywine på 1.100+. Å logge både forventa og målt OG viser om oppskriften
            traff — og om effektiviteten var som planlagt.
          </Begrep>

          <Begrep tittel="FG — Final Gravity (forventa & målt)">
            Tettheten <em>etter</em> gjæringen er ferdig. En FG som ikke faller til forventa nivå
            kan tyde på stuck fermentation, feil temperatur eller for lite gjær.
          </Begrep>

          <Begrep tittel="Effektivitet">
            Hvor mye sukker du fikk ut av maltet, uttrykt som prosent av teoretisk maks.
            Hjemmebryggerier ligger typisk på 70–80%. Lav effektivitet skyldes ofte for grovt
            malt, feil mesketemp eller for lite skyllevann.
          </Begrep>

          <AbvKalkulator />

          <Tips>
            Bruk et hydrometer til å måle FG — refraktometeret gir unøyaktige resultater
            etter gjæringen har startet.
          </Tips>
        </Accordion>

        <Accordion
          id="meskeprosess"
          tittel="Meskeprosess"
          tagline="Temperatur, tid og vann — nøklene til sukkeret"
          icon={<Thermometer className="w-5 h-5" />}
          farge="bg-orange-600"
        >
          <p>
            Mesking er der du aktiverer enzymer i maltet som bryter ned stivelse til gjærbart
            sukker. Temperatur er den viktigste variabelen — den avgjør smaken på ølet ditt.
          </p>

          {/* Temperature zone guide */}
          <div className="rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50">
            <div className="bg-zinc-800 px-4 py-2.5 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-zinc-300" />
              <p className="text-sm font-semibold text-zinc-200">Mesketemperatur — hva skjer?</p>
            </div>
            <div className="p-4 space-y-3">
              {/* Visual temp bar */}
              <div className="relative h-6 rounded-full overflow-hidden flex">
                <div className="flex-1 bg-gradient-to-r from-sky-400 to-sky-300" />
                <div className="flex-1 bg-gradient-to-r from-emerald-400 to-emerald-300" />
                <div className="flex-1 bg-gradient-to-r from-orange-400 to-red-400" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-sky-400 shrink-0" />
                    <span className="font-bold text-zinc-700">62–65°C</span>
                  </div>
                  <p className="text-zinc-500 leading-tight">Tørt, lett øl</p>
                  <p className="text-zinc-400 leading-tight hidden sm:block">Beta-amylase dominerer → mye gjærbart sukker</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 shrink-0" />
                    <span className="font-bold text-zinc-700">65–68°C</span>
                  </div>
                  <p className="text-zinc-500 leading-tight">Balansert</p>
                  <p className="text-zinc-400 leading-tight hidden sm:block">Begge enzymer aktive → god balanse</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-orange-400 shrink-0" />
                    <span className="font-bold text-zinc-700">68–72°C</span>
                  </div>
                  <p className="text-zinc-500 leading-tight">Fyldig, søtt øl</p>
                  <p className="text-zinc-400 leading-tight hidden sm:block">Alfa-amylase dominerer → mer body</p>
                </div>
              </div>
            </div>
          </div>

          <Begrep tittel="Mesketid">
            Typisk 60 minutter. Kortere mesking kan gi lavere effektivitet. Noen avanserte
            oppskrifter bruker trinnmesking med ulike temperaturer for å forme smaksprofilen.
          </Begrep>

          <Begrep tittel="Meskevann & skyllevann">
            Totalt vann ≈ meskevann + skyllevann = litt mer enn du vil ha til kok.
            Skyllevannet henter ut resterende sukker fra maltkaken.
          </Begrep>

          <MeskevannKalkulator />

          <Tips>
            Mål mesketemperaturen etter omrøring — maltet senker temperaturen de første minuttene.
          </Tips>
        </Accordion>

        <Accordion
          id="koking"
          tittel="Koking"
          tagline="Sterilisering, humle og fordampning"
          icon={<FlaskConical className="w-5 h-5" />}
          farge="bg-red-600"
        >
          <p>
            Koking steriliserer vørteren, fordamper uønskede forbindelser (særlig DMS),
            karamelliserer sukker og isomeriserer humlesyrer til bitterhet.
          </p>

          <Begrep tittel="Koketid">
            Standard er 60 minutter. 90 minutters kok brukes ved pilsnermalt for å
            drive bort DMS (dimetylsulfid — gir kornlukten i malt).
          </Begrep>

          <Begrep tittel="Liter til kok">
            Du mister typisk 10–15% volum per time via fordampning. Å logge dette
            hjelper deg å treffe ønsket batch-størrelse neste gang.
          </Begrep>

          <Begrep tittel="Humletilsetninger">
            Bitterhumle tilsettes tidlig (60 min), aromahumle sent (5–0 min) eller i whirlpool.
            Jo lengre koketid, jo mer bitterhet — men jo mindre aroma.
          </Begrep>

          <FordampningsKalkulator />

          <Tips>
            Spiralkjøleren desinfiseres de siste 15 minuttene av koket — den er neddykket
            i kokende vørter og steriliseres effektivt.
          </Tips>
        </Accordion>

        <Accordion
          id="nedkjoling"
          tittel="Nedkjøling"
          tagline="Rask avkjøling = bedre øl"
          icon={<Droplets className="w-5 h-5" />}
          farge="bg-blue-600"
        >
          <p>
            Rask nedkjøling er kritisk for ølkvalitet. Langsom avkjøling gir bakterier tid til
            å infisere vørteren og øker risikoen for DMS-produksjon.
          </p>

          <Begrep tittel="Mål: under 80°C så raskt som mulig">
            Over 80°C produseres det fortsatt DMS. Under 80°C stopper produksjonen.
            Sikt mot gjæringstemperatur (ca. 18–20°C for ale) innen 20–30 minutter.
          </Begrep>

          <Begrep tittel="Måling av OG">
            Nedkjøling er det naturlige tidspunktet for å måle OG, siden hydrometeret er
            kalibrert til 20°C og vørteren nå er kald nok til en nøyaktig avlesning.
          </Begrep>

          <Tips>
            God kjøling skaper en kaldstuing (cold break) der proteiner klumper seg og synker
            — dette gir klarere øl. Bruk isvannskrets for raskere kjøling om sommeren.
          </Tips>
        </Accordion>

        <Accordion
          id="gjaering"
          tittel="Gjæring"
          tagline="Temperaturkontroll avgjør smaken"
          icon={<Clock className="w-5 h-5" />}
          farge="bg-green-700"
        >
          <p>
            Gjæringen er der magien skjer — gjæren omdanner sukker til alkohol og CO₂, og skaper
            hundrevis av smaksforbindelser. Temperaturkontroll er den enkeltfaktoren med størst
            innvirkning på smaken.
          </p>

          <Begrep tittel="Gjæringstemp">
            Ale-gjær: <strong>16–22°C</strong>. Lager-gjær: <strong>8–12°C</strong>.
            For høy temperatur gir fruktige estere og fuselalkoholer. For lav temp
            kan gjæren bli dorsk og gjæringen stoppe.
          </Begrep>

          <Begrep tittel="Oksygenering">
            Gjær trenger oksygen i startfasen for å formere seg. Rist gjæringskarret eller
            bruk luftpumpe rett etter pitching. Etter oppstart vil oksygen ødelegge ølet.
          </Begrep>

          <Begrep tittel="Tørrhumling (dry hopping)">
            Humle tilsatt direkte i gjæringskarret (uten koking) gir intens humlearoma.
            Tilsettes typisk mot slutten av primærgjæringen.
          </Begrep>

          <GjaeringsGuide />

          <Tips>
            Stabile temperaturer er viktigere enn eksakt temperatur — fest et termometer
            på utsiden av gjæringskarret og unngå store svingninger.
          </Tips>
        </Accordion>

        <Accordion
          id="notater"
          tittel="Notater & karakter"
          tagline="Lær av hvert batch — skriv ned alt"
          icon={<BookOpen className="w-5 h-5" />}
          farge="bg-purple-700"
        >
          <p>
            Bryggenotater og smaksnotater er kanskje det mest undervurderte feltet i et
            bryggeskjema. Hukommelsen er kortere enn du tror.
          </p>

          <Begrep tittel="Bryggenotater">
            Skriv ned alt som avvek fra planen: annen malt, uventet lang koketid,
            temperaturavvik, problemer med utstyr. Disse detaljene forklarer ofte hvorfor
            ølet ble annerledes enn forventet.
          </Begrep>

          <Begrep tittel="Smaksnotater">
            Smak ølet ved tapping og etter kondisjonering. Beskriv aroma, smak, farge og
            munnfølelse — gjerne med fagtermer: humlighet, maltighet, ester, fenol, tørr, fyldig.
          </Begrep>

          <Begrep tittel="Karakter (1–10)">
            En enkel karakter gjør det lett å sammenligne batch-er over tid.
            6 = greit drikkbart, 8 = vil brygge igjen, 10 = det beste jeg har laget.
          </Begrep>

          <KarakterSkala />

          <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3 text-purple-900 text-sm">
            <span className="font-semibold">Husk: </span>
            De beste bryggerne er de som lærer av hvert batch. Et godt loggført
            bryggeskjema er verktøyet som gjør deg bedre — ett brygg av gangen.
          </div>
        </Accordion>
      </div>

      <div className="text-center py-8">
        <Link
          href="/skjema/ny"
          className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl px-6 py-3 transition-colors"
        >
          <Star className="w-4 h-4" />
          Klar til å brygge? Lag et nytt skjema
        </Link>
      </div>
    </div>
  )
}
