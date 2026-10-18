/* ============================================================
   EVENEMENTEN OVER ZWEDEN IN NEDERLAND
   De pagina evenementen.html toont automatisch alle evenementen
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
                    "Tentoonstelling", "Viering"
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

  const komend = evenementen
    .filter(function (e) { return maakDatum(e.einddatum || e.datum) >= vandaag; })
    .sort(function (a, b) { return a.datum.localeCompare(b.datum); });

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
    const maand = datum.toLocaleDateString("nl-NL", { month: "long", year: "numeric" });

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
