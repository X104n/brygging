import Link from 'next/link'
import { FlaskConical, Thermometer, Clock, Droplets, BarChart3, BookOpen, Star } from 'lucide-react'

function Seksjon({
  icon,
  tittel,
  children,
  id,
  farge,
}: {
  icon: React.ReactNode
  tittel: string
  children: React.ReactNode
  id: string
  farge: string
}) {
  return (
    <section id={id} className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
      <div className={`${farge} px-6 py-4 flex items-center gap-3`}>
        <div className="text-white">{icon}</div>
        <h2 className="text-lg font-bold text-white">{tittel}</h2>
      </div>
      <div className="px-6 py-5 space-y-4 text-sm text-zinc-700 leading-relaxed">{children}</div>
    </section>
  )
}

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

export default function InfoPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-2">Brygguiden</h1>
        <p className="text-zinc-600">
          En oversikt over alle de viktige parameterne i bryggeprosessen — hva de betyr,
          hvorfor de er viktige å logge, og hva du bør se etter.
        </p>
      </div>

      {/* Quick nav */}
      <nav className="bg-white rounded-xl border border-zinc-100 shadow-sm p-4">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">Hopp til seksjon</p>
        <div className="flex flex-wrap gap-2">
          {[
            ['#graviteter', 'Graviteter & ABV'],
            ['#meskeprosess', 'Meskeprosess'],
            ['#koking', 'Koking'],
            ['#nedkjoling', 'Nedkjøling'],
            ['#gjaering', 'Gjæring'],
            ['#notater', 'Notater & karakter'],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-sm bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-lg px-3 py-1.5 transition-colors"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      <Seksjon id="graviteter" tittel="Graviteter, effektivitet & ABV" icon={<BarChart3 className="w-5 h-5" />} farge="bg-amber-700">
        <p>
          Gravitet måler tettheten til vørteren sammenlignet med rent vann (1.000). Sukker øker tettheten,
          og når gjæren spiser sukkeret synker den igjen. Disse to målingene er grunnlaget for å beregne
          alkoholinnholdet og forstå gjæringen din.
        </p>

        <Begrep tittel="OG — Original Gravity (forventa & målt)">
          Tettheten til vørteren <em>før</em> gjæring starter. En typisk session-øl ligger på 1.040,
          mens en sterk barleywine kan være 1.100+. Høyere OG betyr mer sukker og potensielt sterkere øl.
          Å logge både forventa og målt OG viser deg om oppskriften din traff — og om effektiviteten din
          var som planlagt.
        </Begrep>

        <Begrep tittel="FG — Final Gravity (forventa & målt)">
          Tettheten <em>etter</em> gjæringen er ferdig. Gjæren omdanner sukker til alkohol og CO₂,
          så FG er alltid lavere enn OG. En FG som ikke faller til forventa nivå kan tyde på at gjæringen
          stoppet for tidlig (stuck fermentation), feil gjæringstemperatur, eller for lite gjær.
        </Begrep>

        <Begrep tittel="ABV — Alkohol By Volume">
          Beregnes automatisk fra OG og FG med formelen:{' '}
          <code className="bg-zinc-100 px-1 rounded text-zinc-800">(OG − FG) × 131,25</code>.{' '}
          For eksempel: OG 1.050 og FG 1.010 gir (0.040) × 131.25 ≈ <strong>5,25% ABV</strong>.
        </Begrep>

        <Begrep tittel="Effektivitet">
          Hvor mye sukker du klarte å ekstrahere fra maltet ditt, uttrykt i prosent av det teoretisk
          mulige. De fleste hjemmebryggerier ligger på 70–80%. Lav effektivitet kan skyldes for grovt
          malt, feil mesketemp, dårlig omrøring eller for lite skyllevann.
        </Begrep>

        <Tips>
          Bruk et refraktometer eller hydrometer til å måle OG og FG. Husk at refraktometeret gir
          unøyaktige FG-målinger etter gjæring — bruk da heller et hydrometer.
        </Tips>
      </Seksjon>

      <Seksjon id="meskeprosess" tittel="Meskeprosess" icon={<Thermometer className="w-5 h-5" />} farge="bg-orange-600">
        <p>
          Mesking er prosessen der du blander varmt vann med knust malt for å aktivere enzymer
          som bryter ned stivelse til gjærbart sukker. Temperatur og tid er de to viktigste
          variablene — og de har stor innvirkning på smaken av det ferdige ølet.
        </p>

        <Begrep tittel="Mesketemp">
          De viktigste enzymene (alfa- og beta-amylase) jobber best i ulike temperaturintervaller.
          Beta-amylase trives rundt <strong>62–65°C</strong> og lager mye gjærbart sukker → tørt,
          lett øl. Alfa-amylase er aktiv rundt <strong>68–72°C</strong> og gir mer ugjærbare
          dekstriner → fyldigere, søtere øl. De fleste oppskrifter sikter mot 65–68°C for balanse.
        </Begrep>

        <Begrep tittel="Mesketid">
          Typisk 60 minutter. Kortere mesking kan gi lavere effektivitet og uferdig sukkeromdanning.
          Noen avanserte oppskrifter bruker trinnmesking med ulike temperaturer.
        </Begrep>

        <Begrep tittel="Meskevann & skyllevann">
          Mengden meskevann påvirker tykkelsen på mesken og enzymaktiviteten.
          Skyllevann (sparge) brukes til å skylle resterende sukker ut av maltkaken.
          Totalt vann ≈ meskevann + skyllevann = litt mer enn du vil ha til kok.
        </Begrep>

        <Tips>
          Notér mesketemperaturen etter omrøring, ikke bare når du tilsetter vannet. Maltet
          senker temperaturen, og de første minuttene er avgjørende.
        </Tips>
      </Seksjon>

      <Seksjon id="koking" tittel="Koking" icon={<FlaskConical className="w-5 h-5" />} farge="bg-red-600">
        <p>
          Koking steriliserer vørteren, fordamper uønskede forbindelser (særlig DMS),
          karamelliserer sukker og isomeriserer humlesyrer til bitterhet.
        </p>

        <Begrep tittel="Koketid">
          Standard er 60 minutter. Kortere koking gir mindre bitterhet og fordampning.
          90 minutters kok brukes ofte ved pilsnermalt for å drive bort mer DMS
          (dimetylsulfid — gir kornlukten i malt).
        </Begrep>

        <Begrep tittel="Liter til kok">
          Du vil alltid miste litt volum under koking (fordampning, typisk 10–15% per time).
          Å logge dette hjelper deg å treffe ønsket batch-størrelse neste gang.
        </Begrep>

        <Begrep tittel="Humletilsetninger">
          Bitterhumle tilsettes tidlig (60 min), aromahumle sent (5–0 min) eller i whirlpool.
          Jo lengre koketid for humlen, jo mer bitterhet — men jo mindre aroma. Notér
          tilsetningspunktene dine i bryggenotatene.
        </Begrep>

        <Tips>
          Spiralkjøleren bør desinfiseres de siste 15 minuttene av koket — den er da neddykket
          i kokende vørter og steriliseres effektivt.
        </Tips>
      </Seksjon>

      <Seksjon id="nedkjoling" tittel="Nedkjøling" icon={<Droplets className="w-5 h-5" />} farge="bg-blue-600">
        <p>
          Rask nedkjøling er kritisk for ølkvalitet. Langsom avkjøling gir bakterier tid til å
          infisere vørteren, og øker risikoen for DMS-produksjon.
        </p>

        <Begrep tittel="Mål: kjøl ned under 80°C så fort som mulig">
          Over 80°C er sterilisert sone — her produseres det fortsatt DMS. Under 80°C stopper
          DMS-produksjonen. Mål: ned til gjæringstemperatur (ca. 18–20°C for ale) innen 20–30 min.
        </Begrep>

        <Begrep tittel="Måling av OG">
          Nedkjøling er det naturlige tidspunktet å måle OG, siden hydrometeret er kalibrert
          til 20°C og vørteren nå er kald nok til en nøyaktig avlesning.
        </Begrep>

        <Tips>
          Bruk isvannskrets i spiralkjøleren for raskere nedkjøling om sommeren. God kjøling
          skaper også en kaldstuing (cold break) der proteiner klumper seg og synker — dette
          gir klarere øl.
        </Tips>
      </Seksjon>

      <Seksjon id="gjaering" tittel="Gjæring" icon={<Clock className="w-5 h-5" />} farge="bg-green-700">
        <p>
          Gjæringen er der magien skjer — gjæren omdanner sukker til alkohol og CO₂, og skaper
          hundrevis av smaksforbindelser. Temperaturkontroll er den enkeltfaktoren som har størst
          innvirkning på smaken.
        </p>

        <Begrep tittel="Gjæringstemp">
          Ale-gjær (Saccharomyces cerevisiae): <strong>16–22°C</strong>.
          Lager-gjær: <strong>8–12°C</strong>.
          For høy temperatur gir fruktige estere og fuselalkoholer (hodepine!).
          For lav temp kan gjæren bli dorsk og gjæringen stoppe.
        </Begrep>

        <Begrep tittel="Oksygenering">
          Gjær trenger oksygen i startfasen for å bygge opp sterke cellevegger og formere seg.
          Rist gjæringskarret eller bruk en luftpumpe rett etter pitching. Etter gjæringen starter
          vil oksygen ødelegge ølet (oksidering).
        </Begrep>

        <Begrep tittel="Tørrhumling (dry hopping)">
          Tilsetting av humle direkte i gjæringskaret (uten koking) gir intens humlearoma.
          Typisk mot slutten av primærgjæringen. Logg når du tilsetter og hvor lenge.
        </Begrep>

        <Tips>
          Bruk en temperaturlogger eller termometer festet på utsiden av gjæringskarret.
          Stabile temperaturer er viktigere enn eksakt temperatur.
        </Tips>
      </Seksjon>

      <Seksjon id="notater" tittel="Notater & karakter" icon={<BookOpen className="w-5 h-5" />} farge="bg-purple-700">
        <p>
          Bryggenotater og smaksnotater er kanskje det mest undervurderte feltet i et bryggeskjema.
          Hukommelsen er kortere enn du tror — og neste gang du brygger samme øl vil du takke
          deg selv for å ha skrevet ned alt.
        </p>

        <Begrep tittel="Bryggenotater">
          Skriv ned alt som avvek fra planen: annen malt enn planlagt, uventet lang koketid,
          temperaturavvik, problemer med utstyr. Disse detaljene forklarer ofte hvorfor ølet
          ble annerledes enn forventet.
        </Begrep>

        <Begrep tittel="Smaksnotater">
          Smak ølet ved tapping og etter kondisjonering. Beskriv aroma, smak, farge og munnfølelse.
          Bruk gjerne fagtermer: humlighet, maltighet, fruktig, ester, fenol, tørr, fyldig osv.
        </Begrep>

        <Begrep tittel="Karakter (1–10)">
          En enkel karakter gjør det lett å sammenligne batch-er over tid. 6 er «greit drikkbart»,
          8 er «vil gjerne brygge igjen», 10 er «det beste jeg har laget». Vær ærlig med deg selv!
        </Begrep>

        <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-3 text-purple-900 text-sm">
          <span className="font-semibold">Husk: </span>
          De beste bryggerne er de som lærer av hvert batch. Et godt loggført bryggeskjema er
          verktøyet som gjør deg bedre — ett brygg av gangen.
        </div>
      </Seksjon>

      <div className="text-center py-4">
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
