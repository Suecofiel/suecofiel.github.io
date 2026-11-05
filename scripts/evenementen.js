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
      tijd          bijvoorbeeld "19.30 uur", of ""
      titel         naam van het evenement
      soort         bijvoorbeeld "Lezing", "Film", "Concert",
                    "Tentoonstelling", "Viering", "Kerstmarkt"
      plaats        stad en eventueel locatie
      organisator   wie het organiseert
      beschrijving  één of twee zinnen, in je eigen woorden
      link          adres van de pagina van de organisator
   De volgorde in de lijst maakt niet uit.

   Voorbeeld:
   // { datum: "2026-12-13", einddatum: "", tijd: "18.00 uur",
   //   titel: "Luciaviering", soort: "Viering",
   //   plaats: "Rotterdam", organisator: "Naam van de organisator",
   //   beschrijving: "Traditionele Luciaviering met koor en processie.",
   //   link: "https://www.voorbeeld.nl" },
   ============================================================ */
const evenementen = [

  { datum: "2026-11-04", einddatum: "2026-11-08", tijd: "",
    titel: "Noordelijk Film Festival",
    soort: "Film", plaats: "Leeuwarden", organisator: "",
    beschrijving: "Vijfdaags filmfestival in Leeuwarden met recente films en documentaires uit Noord-Europa, vaak films die nog niet in Nederlandse bioscopen te zien zijn.",
    link: "https://noordelijkfilmfestival.nl/" },

  { datum: "2026-11-27", einddatum: "2026-11-28", tijd: "vrijdag 11.00–18.00 uur, zaterdag 11.00–17.00 uur",
    titel: "Zweedse kerstmarkt van Svenska kyrkan",
    soort: "Kerstmarkt", plaats: "Locatie nog niet bekendgemaakt", organisator: "Svenska kyrkan in Nederland",
    beschrijving: "Jaarlijkse kerstmarkt van Svenska kyrkan, de Zweedse kerk in Nederland. In eerdere jaren vond de markt plaats in Rotterdam; de locatie voor dit jaar is nog niet bekendgemaakt.",
    link: "https://zweeds-nederlandse-vereniging.nl/nieuws/27-en-28-november-2026-kerstmarkt-svenska-kyrkan-in-nederland/" },

  { datum: "2026-12-10", einddatum: "2026-12-20", tijd: "10 dec 18.45 uur, 13 dec 19.00 uur en 20 dec 18.20 uur",
    titel: "Persona van Ingmar Bergman",
    soort: "Film", plaats: "Delft, Filmhuis Lumen", organisator: "Filmhuis Lumen",
    beschrijving: "Persona van Ingmar Bergman draait in Filmhuis Lumen in Delft als onderdeel van Focus on Ingmar Bergman. De film wordt in het Zweeds en Engels gesproken; er zijn Nederlandse ondertitels.",
    link: "https://filmhuis-lumen.nl/films/persona-focus-on-ingmar-bergman/" },

  { datum: "2026-12-11", einddatum: "", tijd: "18.00–20.00 uur",
    titel: "Lucia met de Young Professionals",
    soort: "Viering", plaats: "Amsterdam, Stromma (Keizersgracht 270)", organisator: "Swedish Chamber of Commerce for the Netherlands",
    beschrijving: "Luciaviering van de Young Professionals van de Zweedse Kamer van Koophandel in Nederland. Leden melden zich aan via de website; niet-leden kunnen zich als gast aanmelden via een formulier.",
    link: "https://swedishchamber.nl/events/december-11-lucia-with-the-young-professionals/" },

  { datum: "2026-12-12", einddatum: "2026-12-13", tijd: "10.00–17.00 uur",
    titel: "Zweedse Kerstmarkt Groningen",
    soort: "Kerstmarkt", plaats: "Groningen, Suikerfabriek", organisator: "",
    beschrijving: "Overdekte kerstmarkt in de voormalige suikerfabriek met meer dan honderd Scandinavische pop-upwinkels, Zweeds eten, live muziek en workshops, zoals het maken van een smörgåstårta (Zweedse broodtaart) of een Zweeds kerstlampje. Entree: 10 euro.",
    link: "https://zweedsekerstmarkt.nl/" },

  { datum: "2026-12-14", einddatum: "", tijd: "20.00 uur (zaal open 19.30 uur)",
    titel: "Luciaconcert van Svenska Högtidskören in Amsterdam",
    soort: "Concert", plaats: "Amsterdam, Obrechtkerk", organisator: "Svenska Högtidskören",
    beschrijving: "Het Zweedse koor Svenska Högtidskören uit Amsterdam zingt rond Lucia, het Zweedse lichtfeest op 13 december. De toegang is gratis; een vrijwillige bijdrage wordt op prijs gesteld.",
    link: "https://zweeds-nederlandse-vereniging.nl/nieuws/14-december-lucia-concert-2026-svenska-hogtidskoren-amsterdam-obrechtkerk/" },

  { datum: "2026-12-20", einddatum: "", tijd: "20.10 uur",
    titel: "Fanny och Alexander van Ingmar Bergman",
    soort: "Film", plaats: "Delft, Filmhuis Lumen", organisator: "Filmhuis Lumen",
    beschrijving: "Fanny och Alexander van Ingmar Bergman draait vanaf 17 december in Filmhuis Lumen in Delft, als onderdeel van Focus on Ingmar Bergman. Op de website van het filmhuis staat voorlopig één voorstelling, op zondag 20 december.",
    link: "https://filmhuis-lumen.nl/films/fanny-and-alexander-english-subs/" },

  { datum: "2026-12-31", einddatum: "", tijd: "",
    titel: "Het zevende zegel van Ingmar Bergman",
    soort: "Film", plaats: "Bergen, Filmtheater Cinebergen", organisator: "Filmtheater Cinebergen",
    beschrijving: "Het zevende zegel (Det sjunde inseglet) komt in een digitale restauratie naar Filmtheater Cinebergen, vanaf 31 december. De film is Zweeds gesproken en Nederlands ondertiteld. De speeltijden zijn nog niet bekend.",
    link: "https://www.cinebergen.nl/film/the-seventh-seal-digitale-restauratie/" },

  { datum: "2026-06-26", einddatum: "2027-01-24", tijd: "",
    titel: "Marit Törnqvist – Verborgen verhalen",
    soort: "Tentoonstelling", plaats: "Dordrecht, Nationaal Onderwijsmuseum", organisator: "Nationaal Onderwijsmuseum",
    beschrijving: "Meer dan honderd originele tekeningen van de Zweeds-Nederlandse illustrator Marit Törnqvist, bekend van haar illustraties bij boeken van Astrid Lindgren. De tentoonstelling is verlengd tot 24 januari 2027.",
    link: "https://www.onderwijsmuseum.nl/tentoonstelling/marit-toernqvist-verborgen-verhalen" },

  { datum: "2027-01-28", einddatum: "2027-02-07", tijd: "",
    titel: "International Film Festival Rotterdam (IFFR)",
    soort: "Film", plaats: "Rotterdam", organisator: "",
    beschrijving: "Op IFFR draaien regelmatig Zweedse films. Het programma voor 2027 is nog niet bekend; op de website kun je filteren op Zweeds als gesproken taal.",
    link: "https://iffr.com/nl/iffr_film_spoken_language/zweeds" }

];


/* ============================================================
   HIERONDER NIETS AANPASSEN
   Deze code zet de evenementen op de pagina.
   ============================================================ */
(function () {
  const lijstElement = document.getElementById("evenementen-lijst");
  if (!lijstElement) { return; }

  function maakDatum(tekst) {
    const d = tekst.split("-").map(Number);
    return new Date(d[0], d[1] - 1, d[2]);
  }
  function korteDatum(datum) {
    return datum.toLocaleDateString("nl-NL", { day: "numeric", month: "long" });
  }

  const vandaag = new Date();
  vandaag.setHours(0, 0, 0, 0);

  // Een evenement dat al loopt (bijvoorbeeld een tentoonstelling)
  // staat onder de huidige maand.
  function groepDatum(e) {
    const start = maakDatum(e.datum);
    return start < vandaag ? vandaag : start;
  }

  const komend = evenementen
    .filter(function (e) { return maakDatum(e.einddatum || e.datum) >= vandaag; })
    .sort(function (a, b) { return groepDatum(a) - groepDatum(b); });

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
    const datum = maakDatum(e.datum);
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
    datumBlok.dateTime = e.datum;
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
    soort.textContent = [e.soort, e.plaats].filter(Boolean).join(" · ");
    const titel = document.createElement("h3");
    titel.textContent = e.titel;

    const details = document.createElement("p");
    details.className = "agenda-details";
    const delen = [];
    if (e.einddatum) { delen.push("t/m " + korteDatum(maakDatum(e.einddatum))); }
    if (e.tijd) { delen.push(e.tijd); }
    if (e.organisator) { delen.push("Organisatie: " + e.organisator); }
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
