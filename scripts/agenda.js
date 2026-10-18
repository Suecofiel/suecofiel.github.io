/* ============================================================
   AGENDA VAN DE SUECOFIEL
   De agendapagina toont automatisch alle gebeurtenissen die nog
   moeten komen, op volgorde van datum en per maand gegroepeerd.
   Gebeurtenissen die voorbij zijn, verdwijnen vanzelf.

   NIEUWE GEBEURTENIS TOEVOEGEN:
   Kopieer een blok van { tot en met }, inclusief de komma,
   plak het ergens in de lijst en pas de gegevens aan:
      datum         jaar-maand-dag, bijvoorbeeld "2027-03-14"
      titel         naam van de gebeurtenis
      soort         bijvoorbeeld "Officiële feestdag", "Traditie",
                    "Film", "Concert", "Lezing", "Tentoonstelling"
      plaats        bijvoorbeeld "Amsterdam" of "" als het niet van
                    toepassing is
      beschrijving  één of twee zinnen
   De volgorde in de lijst maakt niet uit.
   ============================================================ */
const agenda = [

  // ----- 2026 -----
  { datum: "2026-10-31", titel: "Alla helgons dag", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Allerheiligen. Zweden steken massaal kaarsen aan op de graven van hun dierbaren; begraafplaatsen veranderen 's avonds in zeeën van licht." },
  { datum: "2026-11-06", titel: "Gustav Adolfsdagen", soort: "Traditie", plaats: "",
    beschrijving: "Herdenking van koning Gustav II Adolf, die in 1632 sneuvelde bij Lützen. Bakkers verkopen het Gustav Adolfsbakelse, een gebakje met zijn beeltenis in chocolade." },
  { datum: "2026-11-10", titel: "Mårtensafton", soort: "Traditie", plaats: "",
    beschrijving: "Sint-Maartensavond, vooral in Skåne gevierd met een uitgebreid ganzenmaal. Traditioneel begint de maaltijd met svartsoppa, een donkere, kruidige soep op basis van ganzenbloed." },
  { datum: "2026-12-10", titel: "Nobeldagen", soort: "Traditie", plaats: "Stockholm",
    beschrijving: "Uitreiking van de Nobelprijzen in het Konserthuset, gevolgd door het Nobelbanket in het stadhuis, live uitgezonden op de Zweedse televisie." },
  { datum: "2026-12-13", titel: "Luciadagen", soort: "Traditie", plaats: "",
    beschrijving: "In het donkerste deel van het jaar trekken processies in witte gewaden, met Lucia voorop met een kroon van kaarsen, zingend door scholen, kerken en kantoren." },
  { datum: "2026-12-24", titel: "Julafton", soort: "Traditie", plaats: "",
    beschrijving: "Kerstavond is in Zweden het hoogtepunt van kerst, met het julbord, om drie uur Donald Duck op televisie en 's avonds de cadeaus." },
  { datum: "2026-12-25", titel: "Juldagen", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Eerste kerstdag, traditioneel begonnen met de vroege julotta-kerkdienst." },
  { datum: "2026-12-26", titel: "Annandag jul", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Tweede kerstdag, tegenwoordig ook de dag van de grote uitverkoop." },
  { datum: "2026-12-31", titel: "Nyårsafton", soort: "Traditie", plaats: "",
    beschrijving: "Oudejaarsavond, met om middernacht vuurwerk en het voorlezen van het gedicht Nyårsklockan van Tennyson vanuit Skansen in Stockholm." },

  // ----- 2027 -----
  { datum: "2027-01-01", titel: "Nyårsdagen", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Nieuwjaarsdag." },
  { datum: "2027-01-06", titel: "Trettondedag jul", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Driekoningen, de dertiende dag na kerst, is in Zweden een vrije dag." },
  { datum: "2027-01-13", titel: "Tjugondedag Knut", soort: "Traditie", plaats: "",
    beschrijving: "Op de twintigste dag na kerst eindigt de kersttijd. De kerstboom wordt afgetuigd en naar buiten gezet, vaak met een kinderfeestje waarbij nog één keer rond de boom wordt gedanst en de kinderen het snoepgoed uit de boom mogen halen." },
  { datum: "2027-02-09", titel: "Fettisdagen", soort: "Traditie", plaats: "",
    beschrijving: "Vette dinsdag, de dag van de semla: een zoete bol met amandelspijs en slagroom. Zweden eten er op deze dag miljoenen van." },
  { datum: "2027-03-25", titel: "Våffeldagen", soort: "Traditie", plaats: "",
    beschrijving: "Wafeldag. De naam komt van Vårfrudagen (Maria-Boodschap), dat in de volksmond veranderde in våffeldagen." },
  { datum: "2027-03-26", titel: "Långfredagen", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Goede Vrijdag, traditioneel een stille dag." },
  { datum: "2027-03-28", titel: "Påskdagen", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Pasen. Kinderen verkleden zich rond Pasen als påskkärringar (paasheksjes) en takken worden versierd met gekleurde veren." },
  { datum: "2027-03-29", titel: "Annandag påsk", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Tweede paasdag." },
  { datum: "2027-04-30", titel: "Valborgsmässoafton", soort: "Traditie", plaats: "",
    beschrijving: "Walpurgisnacht. Met grote vreugdevuren en koorzang wordt de lente verwelkomd; in Uppsala en Lund is het een groot studentenfeest." },
  { datum: "2027-05-01", titel: "Första maj", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Dag van de Arbeid, met demonstraties en toespraken van politieke partijen en vakbonden." },
  { datum: "2027-05-06", titel: "Kristi himmelsfärdsdag", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Hemelvaartsdag." },
  { datum: "2027-05-16", titel: "Pingstdagen", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Pinksteren. Anders dan in Nederland is tweede pinksterdag in Zweden geen vrije dag meer." },
  { datum: "2027-06-06", titel: "Sveriges nationaldag", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Nationale feestdag, ter herinnering aan de verkiezing van Gustav Vasa tot koning in 1523 en de grondwet van 1809." },
  { datum: "2027-06-25", titel: "Midsommarafton", soort: "Traditie", plaats: "",
    beschrijving: "Het bekendste Zweedse feest: dansen rond de midsommarstång, haring met nieuwe aardappelen, aardbeien en bloemenkransen in het haar." },
  { datum: "2027-06-26", titel: "Midsommardagen", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Midzomerdag, de dag na het grote feest." },
  { datum: "2027-08-19", titel: "Surströmmingspremiären", soort: "Traditie", plaats: "",
    beschrijving: "Op de derde donderdag van augustus begint traditioneel het seizoen van de beruchte gegiste haring, vooral in Noord-Zweden." },
  { datum: "2027-10-04", titel: "Kanelbullens dag", soort: "Traditie", plaats: "",
    beschrijving: "De dag van het kaneelbroodje, sinds 1999 een feestdag voor de kanelbulle, een vaste waarde bij de Zweedse fika." },

];


/* ============================================================
   HIERONDER NIETS AANPASSEN
   Deze code zet de agenda op de pagina.
   ============================================================ */
(function () {
  const lijstElement = document.getElementById("agenda-lijst");
  if (!lijstElement) { return; }

  function maakDatum(tekst) {
    const d = tekst.split("-").map(Number);
    return new Date(d[0], d[1] - 1, d[2]);
  }

  const vandaag = new Date();
  vandaag.setHours(0, 0, 0, 0);

  const komend = agenda
    .filter(function (g) { return maakDatum(g.datum) >= vandaag; })
    .sort(function (a, b) { return a.datum.localeCompare(b.datum); });

  if (komend.length === 0) {
    const leeg = document.createElement("p");
    leeg.className = "leeg";
    leeg.textContent = "Er staan op dit moment geen gebeurtenissen in de agenda.";
    lijstElement.appendChild(leeg);
    return;
  }

  let huidigeMaand = "";
  let maandLijst = null;

  komend.forEach(function (g) {
    const datum = maakDatum(g.datum);
    const maand = datum.toLocaleDateString("nl-NL", { month: "long", year: "numeric" });

    // Nieuw maandkopje
    if (maand !== huidigeMaand) {
      huidigeMaand = maand;
      const kop = document.createElement("h2");
      kop.className = "agenda-maand";
      kop.textContent = maand.charAt(0).toUpperCase() + maand.slice(1);
      lijstElement.appendChild(kop);
      maandLijst = document.createElement("ul");
      maandLijst.className = "agenda-items";
      lijstElement.appendChild(maandLijst);
    }

    const item = document.createElement("li");
    item.className = "agenda-item";

    const datumBlok = document.createElement("time");
    datumBlok.className = "agenda-datum";
    datumBlok.dateTime = g.datum;
    const dag = document.createElement("span");
    dag.className = "agenda-dag";
    dag.textContent = datum.getDate();
    const weekdag = document.createElement("span");
    weekdag.className = "agenda-weekdag";
    weekdag.textContent = datum.toLocaleDateString("nl-NL", { weekday: "short" });
    datumBlok.append(dag, weekdag);

    const inhoud = document.createElement("div");
    const soort = document.createElement("span");
    soort.className = "agenda-soort";
    soort.textContent = g.soort + (g.plaats ? " · " + g.plaats : "");
    const titel = document.createElement("h3");
    titel.lang = "sv";
    titel.textContent = g.titel;
    const tekst = document.createElement("p");
    tekst.textContent = g.beschrijving;
    inhoud.append(soort, titel, tekst);

    item.append(datumBlok, inhoud);
    maandLijst.appendChild(item);
  });
})();
