/* ============================================================
   ZWEEDSE FEESTDAGEN (pagina feestdagen.html in de Kennisbank)
   De pagina toont automatisch alle feestdagen en tradities die nog
   moeten komen, op volgorde van datum en per maand gegroepeerd.
   Data die voorbij zijn, verdwijnen vanzelf.

   NIEUWE FEESTDAG OF TRADITIE TOEVOEGEN:
   Kopieer een blok van { tot en met }, inclusief de komma,
   plak het ergens in de lijst en pas de gegevens aan:
      datum         jaar-maand-dag, bijvoorbeeld "2027-03-14"
      titel         Zweedse naam
      nederlands    Nederlandse naam (verschijnt klein onder de titel)
      soort         "Officiële feestdag" (krijgt een rood datumblokje),
                    "Traditie", of "Traditie · in de praktijk een vrije dag"
      plaats        bijvoorbeeld "Stockholm", of ""
      beschrijving  één of twee zinnen, of "" voor geen beschrijving.
                    Zweedse woorden schuin: <em lang=\"sv\">woord</em>
   De volgorde in de lijst maakt niet uit.
   ============================================================ */
const feestdagen = [

  { datum: "2026-10-31", titel: "Alla helgons dag", nederlands: "Allerheiligen", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Valt altijd op de zaterdag tussen 31 oktober en 6 november. In dat weekend bezoekt ongeveer de helft van de Zweden een begraafplaats om kaarsen aan te steken bij de graven van dierbaren; ’s avonds branden er duizenden lichtjes. <a href=\"/alla-helgons-dag.html\">Lees het artikel</a>" },
  { datum: "2026-11-06", titel: "Gustav Adolfsdagen", nederlands: "Gustaaf Adolfdag", soort: "Traditie", plaats: "",
    beschrijving: "Herdenking van koning Gustav II Adolf, die in 1632 sneuvelde bij Lützen. Bakkers verkopen het <em lang=\"sv\">Gustav Adolfsbakelse</em>, een gebakje met zijn beeltenis in chocolade of marsepein." },
  { datum: "2026-11-10", titel: "Mårtensafton", nederlands: "Sint-Maartensavond", soort: "Traditie", plaats: "",
    beschrijving: "Vooral in Skåne gevierd met een uitgebreid ganzenmaal. Traditioneel begint de maaltijd met <em lang=\"sv\">svartsoppa</em>, een donkere, kruidige soep op basis van ganzenbloed." },
  { datum: "2026-11-29", titel: "Första advent", nederlands: "Eerste advent", soort: "Traditie", plaats: "",
    beschrijving: "Het begin van de adventstijd. Voor de ramen verschijnen overal elektrische kandelaars (<em lang=\"sv\">adventsljusstakar</em>) en papieren sterren, die in veel huizen tot na de jaarwisseling blijven branden." },
  { datum: "2026-12-10", titel: "Nobeldagen", nederlands: "Nobeldag", soort: "Traditie", plaats: "Stockholm",
    beschrijving: "Op de sterfdag van Alfred Nobel worden de Nobelprijzen uitgereikt in het concertgebouw van Stockholm (<em lang=\"sv\">Konserthuset</em>). Daarna volgt het Nobelbanket in het stadhuis. Beide zijn live te zien op de Zweedse televisie." },
  { datum: "2026-12-13", titel: "Luciadagen", nederlands: "Luciadag", soort: "Traditie", plaats: "",
    beschrijving: "In het donkerste deel van het jaar trekken processies in witte gewaden, met Lucia voorop met een kroon van kaarsen, zingend door scholen, kerken en kantoren." },
  { datum: "2026-12-24", titel: "Julafton", nederlands: "Kerstavond", soort: "Traditie · in de praktijk een vrije dag", plaats: "",
    beschrijving: "Het hoogtepunt van de Zweedse kerst, met het <em lang=\"sv\">julbord</em>, om drie uur ’s middags <em lang=\"sv\">Kalle Anka</em> (Donald Duck) op televisie en ’s avonds de cadeaus." },
  { datum: "2026-12-25", titel: "Juldagen", nederlands: "Eerste kerstdag", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Traditioneel begonnen met de vroege kerkdienst <em lang=\"sv\">julotta</em>." },
  { datum: "2026-12-26", titel: "Annandag jul", nederlands: "Tweede kerstdag", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Rond deze dag begint traditioneel de <em lang=\"sv\">mellandagsrea</em>, de uitverkoop tussen kerst en oud en nieuw. Steeds meer winkels beginnen daar tegenwoordig al eerder mee." },
  { datum: "2026-12-31", titel: "Nyårsafton", nederlands: "Oudejaarsavond", soort: "Traditie · in de praktijk een vrije dag", plaats: "",
    beschrijving: "Met vuurwerk om middernacht en, live op televisie vanaf Skansen in Stockholm, het voorlezen van Tennysons gedicht <em lang=\"sv\">Nyårsklockan</em>, een traditie sinds het eind van de negentiende eeuw." },
  { datum: "2027-01-01", titel: "Nyårsdagen", nederlands: "Nieuwjaarsdag", soort: "Officiële feestdag", plaats: "",
    beschrijving: "" },
  { datum: "2027-01-06", titel: "Trettondedag jul", nederlands: "Driekoningen", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Letterlijk ‘de dertiende dag van kerst’: dertien dagen na kerstavond." },
  { datum: "2027-01-13", titel: "Tjugondedag Knut", nederlands: "Einde van de kersttijd", soort: "Traditie", plaats: "",
    beschrijving: "Twintig dagen na kerstavond eindigt officieel de kersttijd. Vroeger werd de kerstboom dan met een feestje afgetuigd, de <em lang=\"sv\">julgransplundring</em>, maar die traditie is grotendeels verdwenen; veel Zweden zetten de boom al eerder buiten." },
  { datum: "2027-02-09", titel: "Fettisdagen", nederlands: "Vette dinsdag", soort: "Traditie", plaats: "",
    beschrijving: "De dag van de <em lang=\"sv\">semla</em>: een zoete bol met amandelspijs en slagroom, waarvan er op deze dag miljoenen worden gegeten." },
  { datum: "2027-03-25", titel: "Våffeldagen", nederlands: "Wafeldag", soort: "Traditie", plaats: "",
    beschrijving: "De naam is ontstaan uit <em lang=\"sv\">Vårfrudagen</em>, letterlijk ‘Onze-Vrouwedag’: de kerkelijke feestdag waarop de engel Gabriël aan Maria de geboorte van Jezus aankondigt. In snelle spraak klinkt dat als <em lang=\"sv\">våffeldagen</em>, en zo werd het een dag om wafels te eten." },
  { datum: "2027-03-26", titel: "Långfredagen", nederlands: "Goede Vrijdag", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Traditioneel een stille dag." },
  { datum: "2027-03-28", titel: "Påskdagen", nederlands: "Pasen", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Het grote paasfeest vieren Zweden vooral op de zaterdag ervoor, <em lang=\"sv\">påskafton</em>. Rond Pasen gaan kinderen verkleed als <em lang=\"sv\">påskkärringar</em> (paasheksjes) langs de deuren om snoep te vragen, en worden takken versierd met gekleurde veren." },
  { datum: "2027-03-29", titel: "Annandag påsk", nederlands: "Tweede paasdag", soort: "Officiële feestdag", plaats: "",
    beschrijving: "" },
  { datum: "2027-04-30", titel: "Valborgsmässoafton", nederlands: "Walpurgisnacht", soort: "Traditie", plaats: "",
    beschrijving: "Met grote vreugdevuren en koorzang wordt de lente verwelkomd; in Uppsala en Lund is het een groot studentenfeest." },
  { datum: "2027-05-01", titel: "Första maj", nederlands: "Dag van de Arbeid", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Met demonstraties en toespraken van politieke partijen en vakbonden." },
  { datum: "2027-05-06", titel: "Kristi himmelsfärdsdag", nederlands: "Hemelvaartsdag", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Valt altijd op een donderdag; veel Zweden nemen de vrijdag erna vrij, een zogeheten <em lang=\"sv\">klämdag</em> (brugdag)." },
  { datum: "2027-05-16", titel: "Pingstdagen", nederlands: "Pinksteren", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Anders dan in Nederland is tweede pinksterdag in Zweden sinds 2005 geen vrije dag meer." },
  { datum: "2027-06-06", titel: "Sveriges nationaldag", nederlands: "Nationale feestdag", soort: "Officiële feestdag", plaats: "",
    beschrijving: "Ter herinnering aan de verkiezing van Gustav Vasa tot koning in 1523 en de grondwet van 1809. Sinds 2005 een officiële vrije dag." },
  { datum: "2027-06-25", titel: "Midsommarafton", nederlands: "Midzomeravond", soort: "Traditie · in de praktijk een vrije dag", plaats: "",
    beschrijving: "Het bekendste Zweedse feest: dansen rond de <em lang=\"sv\">midsommarstång</em>, haring met nieuwe aardappelen, aardbeien en bloemenkransen in het haar." },
  { datum: "2027-06-26", titel: "Midsommardagen", nederlands: "Midzomerdag", soort: "Officiële feestdag", plaats: "",
    beschrijving: "De dag na het grote feest." },
  { datum: "2027-08-19", titel: "Surströmmingspremiären", nederlands: "Begin van het surströmmingseizoen", soort: "Traditie", plaats: "",
    beschrijving: "Op de derde donderdag van augustus begint traditioneel het seizoen van de beruchte gegiste haring, vooral in Noord-Zweden." },
  { datum: "2027-10-04", titel: "Kanelbullens dag", nederlands: "Dag van het kaneelbroodje", soort: "Traditie", plaats: "",
    beschrijving: "Sinds 1999 een themadag voor de <em lang=\"sv\">kanelbulle</em>, een vaste waarde bij de Zweedse <em lang=\"sv\">fika</em>." },

];


/* ============================================================
   HIERONDER NIETS AANPASSEN
   Deze code zet de feestdagen op de pagina.
   ============================================================ */
(function () {
  const lijstElement = document.getElementById("feestdagen-lijst");
  if (!lijstElement) { return; }

  function maakDatum(tekst) {
    const d = tekst.split("-").map(Number);
    return new Date(d[0], d[1] - 1, d[2]);
  }

  const vandaag = new Date();
  vandaag.setHours(0, 0, 0, 0);

  const komend = feestdagen
    .filter(function (g) { return maakDatum(g.datum) >= vandaag; })
    .sort(function (a, b) { return a.datum.localeCompare(b.datum); });

  if (komend.length === 0) {
    const leeg = document.createElement("p");
    leeg.className = "leeg";
    leeg.textContent = "Er staan op dit moment geen feestdagen in de lijst.";
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
    item.className = "agenda-item" + (g.soort === "Officiële feestdag" ? " vrije-dag" : "");

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
    inhoud.append(soort, titel);

    if (g.nederlands) {
      const nl = document.createElement("p");
      nl.className = "agenda-nederlands";
      nl.textContent = g.nederlands;
      inhoud.appendChild(nl);
    }
    if (g.beschrijving) {
      const tekst = document.createElement("p");
      tekst.innerHTML = g.beschrijving;
      inhoud.appendChild(tekst);
    }

    item.append(datumBlok, inhoud);
    maandLijst.appendChild(item);
  });
})();
