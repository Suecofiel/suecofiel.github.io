/* ============================================================
   EVENEMENTEN OVER ZWEDEN IN NEDERLAND
   De pagina agenda.html toont automatisch alle evenementen
   die nog moeten komen, op datum en per maand gegroepeerd.
   Afgelopen evenementen verdwijnen vanzelf.

   NIEUW EVENEMENT TOEVOEGEN:
   Kopieer het voorbeeldblok hieronder (zonder de // aan het begin
   van elke regel), plak het tussen de rechte haken van de lijst en
   pas de gegevens aan:
      datum         jaar-maand-dag, bijvoorbeeld "2026-12-13"
      einddatum     laatste dag bij meerdaagse evenementen, anders ""
      datums        alleen bij losse speeldata (bijvoorbeeld een film die op
                    drie dagen draait): lijst van alle data, zoals
                    datums: ["2026-12-10", "2026-12-13", "2026-12-20"]
                    Laat dit weg als het niet nodig is.
      titel         naam van het evenement
      soort         bijvoorbeeld "Lezing", "Film", "Concert",
                    "Tentoonstelling", "Viering", "Kerstmarkt"
      plaats        stad en eventueel locatie
      beschrijving  één of twee zinnen, in je eigen woorden
      link          adres van de pagina van de organisator
   De volgorde in de lijst maakt niet uit.

   Voorbeeld:
   // { datum: "2026-12-13", einddatum: "",
   //   titel: "Luciaviering", soort: "Viering",
   //   plaats: "Rotterdam",
   //   beschrijving: "Traditionele Luciaviering met koor en processie.",
   //   link: "https://www.voorbeeld.nl" },
   ============================================================ */
const evenementen = [

  { datum: "2026-11-04", einddatum: "2026-11-08",
    titel: "Noordelijk Film Festival",
    soort: "Film", plaats: "Leeuwarden",
    beschrijving: "Vijfdaags filmfestival in Leeuwarden met recente films en documentaires uit Noord-Europa, vaak films die nog niet in Nederlandse bioscopen te zien zijn.",
    link: "https://noordelijkfilmfestival.nl/" },

  { datum: "2026-12-10", einddatum: "",
    datums: ["2026-12-10", "2026-12-13", "2026-12-20"],
    titel: "Persona van Ingmar Bergman",
    soort: "Film", plaats: "Delft, Filmhuis Lumen",
    beschrijving: "Onderdeel van de filmreeks Focus on Ingmar Bergman. De film wordt in het Zweeds en Engels gesproken; er zijn Nederlandse ondertitels.",
    link: "https://filmhuis-lumen.nl/films/persona-focus-on-ingmar-bergman/" },

  { datum: "2026-12-11", einddatum: "",
    titel: "Lucia met de Young Professionals",
    soort: "Viering", plaats: "Amsterdam, Stromma",
    beschrijving: "Luciaviering voor de Young Professionals. Leden melden zich aan via de website; niet-leden kunnen zich als gast aanmelden via een formulier.",
    link: "https://swedishchamber.nl/events/december-11-lucia-with-the-young-professionals/" },

  { datum: "2026-12-12", einddatum: "2026-12-13",
    titel: "Zweedse Kerstmarkt Groningen",
    soort: "Kerstmarkt", plaats: "Groningen, Suikerfabriek",
    beschrijving: "Overdekte kerstmarkt in de voormalige suikerfabriek met meer dan honderd Scandinavische pop-upwinkels, Zweeds eten, live muziek en workshops, zoals het maken van een smörgåstårta (Zweedse broodtaart) of een Zweeds kerstlampje.",
    link: "https://zweedsekerstmarkt.nl/" },

  { datum: "2026-12-14", einddatum: "",
    titel: "Luciaconcert van Svenska Högtidskören in Amsterdam",
    soort: "Concert", plaats: "Amsterdam, Obrechtkerk",
    beschrijving: "Concert van het Zweedse koor Svenska Högtidskören rond Lucia, het Zweedse lichtfeest op 13 december.",
    link: "https://www.facebook.com/events/obrechtkerk/lucia-concert-2026-amsterdam/1478054214236407/" },

  { datum: "2026-12-20", einddatum: "",
    titel: "Fanny och Alexander van Ingmar Bergman",
    soort: "Film", plaats: "Delft, Filmhuis Lumen",
    beschrijving: "Onderdeel van de filmreeks Focus on Ingmar Bergman.",
    link: "https://filmhuis-lumen.nl/films/fanny-and-alexander-english-subs/" },

  { datum: "2026-12-31", einddatum: "",
    titel: "Het zevende zegel van Ingmar Bergman",
    soort: "Film", plaats: "Bergen, Filmtheater Cinebergen",
    beschrijving: "Het zevende zegel (Det sjunde inseglet) is te zien in een digitale restauratie, vanaf 31 december. De film is Zweeds gesproken en Nederlands ondertiteld.",
    link: "https://www.cinebergen.nl/film/the-seventh-seal-digitale-restauratie/" },

  { datum: "2026-06-26", einddatum: "2027-01-24",
    titel: "Marit Törnqvist – Verborgen verhalen",
    soort: "Tentoonstelling", plaats: "Dordrecht, Nationaal Onderwijsmuseum",
    beschrijving: "Meer dan honderd originele tekeningen van de Zweeds-Nederlandse illustrator Marit Törnqvist, bekend van haar illustraties bij boeken van Astrid Lindgren. De tentoonstelling is verlengd tot 24 januari 2027.",
    link: "https://www.onderwijsmuseum.nl/tentoonstelling/marit-toernqvist-verborgen-verhalen" },

  { datum: "2027-01-28", einddatum: "2027-02-07",
    titel: "International Film Festival Rotterdam (IFFR)",
    soort: "Film", plaats: "Rotterdam",
    beschrijving: "Op IFFR draaien regelmatig Zweedse films. Het programma voor 2027 is nog niet bekend; op de website kun je filteren op Zweeds als gesproken taal.",
    link: "https://iffr.com/nl/iffr_film_spoken_language/zweeds" }

];


/* ============================================================
   HIERONDER NIETS AANPASSEN
   Deze code zet de evenementen op de pagina.
   ============================================================ */
/* ---- Gedeelde functies: ook gebruikt door de homepage (homepage.js) ---- */
function maakDatum(tekst) {
  const d = tekst.split("-").map(Number);
  return new Date(d[0], d[1] - 1, d[2]);
}
function vandaagDatum() {
  const vandaag = new Date();
  vandaag.setHours(0, 0, 0, 0);
  return vandaag;
}
// Resterende speeldata (alleen bij evenementen met een lijst "datums"):
// data die voorbij zijn verdwijnen vanzelf.
function resterend(e) {
  if (!e.datums) { return []; }
  const vandaag = vandaagDatum();
  return e.datums.filter(function (d) { return maakDatum(d) >= vandaag; });
}
function laatsteDatum(e) {
  if (e.datums && e.datums.length) { return e.datums[e.datums.length - 1]; }
  return e.einddatum || e.datum;
}
// De datum waarmee het evenement in de lijst staat: de eerstvolgende
// speeldatum, of de startdatum.
function eerstvolgende(e) {
  const rest = resterend(e);
  return rest.length ? rest[0] : e.datum;
}
// Een evenement dat al loopt (bijvoorbeeld een tentoonstelling)
// staat onder de huidige maand.
function groepDatum(e) {
  const vandaag = vandaagDatum();
  const start = maakDatum(eerstvolgende(e));
  return start < vandaag ? vandaag : start;
}
function loopt(e) {
  return !e.datums && maakDatum(e.datum) < vandaagDatum();
}
// Alle evenementen die nog niet voorbij zijn, in de volgorde van de agenda
function komendeEvenementen() {
  const vandaag = vandaagDatum();
  return evenementen
    .filter(function (e) { return maakDatum(laatsteDatum(e)) >= vandaag; })
    .sort(function (a, b) { return groepDatum(a) - groepDatum(b); });
}

(function () {
  const lijstElement = document.getElementById("evenementen-lijst");
  if (!lijstElement) { return; }

  function korteDatum(datum) {
    return datum.toLocaleDateString("nl-NL", { day: "numeric", month: "long" });
  }
  // "10, 13 en 20 december" (of "30 november en 3 december")
  function datumLijst(data) {
    const d = data.map(maakDatum);
    const zelfdeMaand = d.every(function (x) { return x.getMonth() === d[0].getMonth(); });
    const delen = zelfdeMaand
      ? d.map(function (x) { return String(x.getDate()); })
      : d.map(korteDatum);
    let tekst = delen.length > 1
      ? delen.slice(0, -1).join(", ") + " en " + delen[delen.length - 1]
      : delen[0];
    if (zelfdeMaand) { tekst += " " + d[0].toLocaleDateString("nl-NL", { month: "long" }); }
    return tekst;
  }

  const komend = komendeEvenementen();

  if (komend.length === 0) {
    const leeg = document.createElement("p");
    leeg.className = "leeg";
    leeg.textContent = "Binnenkort vind je hier evenementen over Zweden in Nederland.";
    lijstElement.appendChild(leeg);
    return;
  }

  let huidigeMaand = "";
  let maandLijst = null;

  komend.forEach(function (e) {
    const datum = maakDatum(eerstvolgende(e));
    const maand = groepDatum(e).toLocaleDateString("nl-NL", { month: "long", year: "numeric" });

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
    datumBlok.dateTime = eerstvolgende(e);
    const dag = document.createElement("span");
    dag.className = "agenda-dag";
    datumBlok.appendChild(dag);
    if (loopt(e)) {
      dag.textContent = "Nu";
      dag.classList.add("agenda-nu");
      datumBlok.classList.add("agenda-datum-nu");
    } else {
      dag.textContent = datum.getDate();
      const weekdag = document.createElement("span");
      weekdag.className = "agenda-weekdag";
      weekdag.textContent = datum.toLocaleDateString("nl-NL", { weekday: "short" });
      datumBlok.appendChild(weekdag);
    }

    const inhoud = document.createElement("div");
    const soort = document.createElement("div");
    soort.className = "agenda-meta";
    const label = document.createElement("span");
    label.className = "typelabel";
    label.textContent = e.soort;
    soort.appendChild(label);
    if (e.plaats) {
      const plaats = document.createElement("span");
      plaats.className = "agenda-plaats";
      plaats.textContent = e.plaats;
      soort.appendChild(plaats);
    }
    const titel = document.createElement("h3");
    titel.textContent = e.titel;

    const details = document.createElement("p");
    details.className = "agenda-details";
    const delen = [];
    const rest = resterend(e);
    if (rest.length > 1) { delen.push(datumLijst(rest)); }
    if (e.einddatum) { delen.push("t/m " + korteDatum(maakDatum(e.einddatum))); }
    details.textContent = delen.join(" · ");

    const tekst = document.createElement("p");
    tekst.textContent = e.beschrijving;

    inhoud.append(soort, titel);
    if (delen.length) { inhoud.appendChild(details); }
    inhoud.appendChild(tekst);

    if (e.link) {
      const link = document.createElement("a");
      link.className = "agenda-link";
      link.href = e.link;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = "Meer informatie bij de organisator ↗";
      inhoud.appendChild(link);
    }

    item.append(datumBlok, inhoud);
    maandLijst.appendChild(item);
  });
})();
