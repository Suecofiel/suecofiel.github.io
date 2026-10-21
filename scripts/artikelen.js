/* ============================================================
   ARTIKELENLIJST VAN DE SUECOFIEL
   Dit is de centrale lijst met alle artikelen. De homepage
   toont per rubriek automatisch de drie nieuwste artikelen,
   met het nieuwste artikel vooraan. De zoekbalk doorzoekt
   deze lijst op elke pagina.

   NIEUW ARTIKEL TOEVOEGEN:
   1. Kopieer een blok van { tot en met }, inclusief de komma.
   2. Plak het bovenaan de lijst, direct onder "const artikelen = [".
   3. Pas de gegevens aan:
      titel      de kop van het artikel
      rubriek    precies één van: Actualiteiten, Cultuur & Tradities,
                 Samenleving
      onderwerp  onderwerp binnen de rubriek, of "" voor geen onderwerp.
                 Cultuur & Tradities: Tradities, Taal & Literatuur,
                   Muziek & Film, Eten & Drinken, Design & Architectuur
                 Samenleving: Geschiedenis, Politiek, Werk & Economie
                 Actualiteiten: geen onderwerpen ("")
      labels     soort artikel, tussen rechte haken, bijvoorbeeld
                 ["Achtergrond"] of ["Duiding", "Zweden & Nederland"].
                 Mogelijk: Achtergrond, Duiding, Uitgelegd, Interview,
                 Recensie, en de invalshoek Zweden & Nederland.
      datum      jaar-maand-dag, bijvoorbeeld "2026-11-03"
      inleiding  één of twee zinnen
      afbeelding foto in de map afbeeldingen, bijvoorbeeld
                 "afbeeldingen/stockholm.jpg", of "" voor een grijs vak
      url        bestandsnaam van de artikelpagina
   De volgorde in deze lijst maakt niet uit: de datum bepaalt
   welk artikel vooraan komt.
   ============================================================ */
const artikelen = [

  { titel: "De predikant uit Arvika en de lichtjes van Allerheiligen", rubriek: "Cultuur & Tradities", onderwerp: "Tradities", labels: ["Achtergrond"], datum: "2026-10-21",
    inleiding: "Met Alla helgons dag bezoekt ongeveer de helft van de Zweden een begraafplaats. Een opvallend jonge traditie, met een predikant uit Arvika in een onverwachte hoofdrol.",
    afbeelding: "afbeeldingen/alla-helgons-dag.jpg", url: "alla-helgons-dag.html" },

  // ----- Voorbeeldartikelen: later vervangen door echte artikelen -----
  { titel: "Voorbeeldartikel Actualiteiten 3", rubriek: "Actualiteiten", onderwerp: "", labels: ["Duiding"], datum: "2026-10-17",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "artikel-sjabloon.html" },
  { titel: "Voorbeeldartikel Actualiteiten 2", rubriek: "Actualiteiten", onderwerp: "", labels: ["Duiding", "Zweden & Nederland"], datum: "2026-10-10",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel Actualiteiten 1", rubriek: "Actualiteiten", onderwerp: "", labels: ["Achtergrond"], datum: "2026-10-03",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel Samenleving 3", rubriek: "Samenleving", onderwerp: "Geschiedenis", labels: ["Achtergrond"], datum: "2026-10-15",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel Samenleving 2", rubriek: "Samenleving", onderwerp: "Werk & Economie", labels: ["Uitgelegd"], datum: "2026-10-08",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel Samenleving 1", rubriek: "Samenleving", onderwerp: "Geschiedenis", labels: ["Interview", "Zweden & Nederland"], datum: "2026-10-01",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },

];



/* ============================================================
   ONDERWERPEN PER RUBRIEK
   Bepaalt welke onderwerpknoppen er op een rubriekpagina kunnen
   staan, en in welke volgorde. Een knop verschijnt alleen als er
   minstens één artikel met dat onderwerp is.
   Nieuw onderwerp? Zet het hier in de lijst van de rubriek.
   ============================================================ */
const onderwerpen = {
  "Cultuur & Tradities": ["Tradities", "Taal & Literatuur", "Muziek & Film", "Eten & Drinken", "Design & Architectuur"],
  "Samenleving": ["Geschiedenis", "Politiek", "Werk & Economie"]
};


/* ============================================================
   HIERONDER NIETS AANPASSEN
   Deze code zet de artikelen op de homepage, de rubriekpagina's
   en onder artikelen.
   ============================================================ */

// "2026-10-17" omzetten naar "17 oktober 2026"
function leesbareDatum(datum) {
  const delen = datum.split("-").map(Number);
  const d = new Date(delen[0], delen[1] - 1, delen[2]);
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

// Nieuwste artikelen eerst
const artikelenOpDatum = artikelen.slice().sort(function (a, b) {
  return b.datum.localeCompare(a.datum);
});

// Adres altijd vanaf de hoofdmap van de site laten beginnen
// ("cultuur.html" wordt "/cultuur.html"), zodat links overal werken
function siteAdres(url) {
  return /^(\/|#|https?:)/.test(url) ? url : "/" + url;
}

// Eén artikelkaart maken (afbeelding, datum, titel, inleiding)
function maakKaart(a) {
  const kaart = document.createElement("a");
  kaart.className = "artikel";
  kaart.href = siteAdres(a.url);

  const beeld = document.createElement("div");
  beeld.className = "afbeelding";
  if (a.afbeelding) {
    const img = document.createElement("img");
    img.src = siteAdres(a.afbeelding);
    img.alt = "";
    beeld.appendChild(img);
  } else {
    beeld.textContent = "Afbeelding";
  }

  // Regel boven de titel: labels en datum
  const meta = document.createElement("p");
  meta.className = "kaart-meta";
  (a.labels || []).forEach(function (l) {
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = l;
    meta.appendChild(label);
  });
  const datum = document.createElement("time");
  datum.className = "datum";
  datum.dateTime = a.datum;
  datum.textContent = leesbareDatum(a.datum);
  meta.appendChild(datum);

  const kop = document.createElement("h3");
  kop.textContent = a.titel;

  const tekst = document.createElement("p");
  tekst.textContent = a.inleiding;

  kaart.append(beeld, meta, kop, tekst);
  return kaart;
}

// Homepage: per rubriek de drie nieuwste artikelen
document.querySelectorAll(".grid[data-rubriek]").forEach(function (grid) {
  const rubriek = grid.getAttribute("data-rubriek");
  const lijst = artikelenOpDatum.filter(function (a) { return a.rubriek === rubriek; }).slice(0, 3);

  if (lijst.length === 0) {
    const leeg = document.createElement("p");
    leeg.className = "leeg";
    leeg.textContent = "Binnenkort verschijnen hier de eerste artikelen.";
    grid.appendChild(leeg);
    return;
  }
  lijst.forEach(function (a) { grid.appendChild(maakKaart(a)); });
});

// Van een onderwerp een adres maken: "Werk & Economie" wordt "werk-en-economie"
function onderwerpAdres(tekst) {
  return tekst.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "en").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// Rubriekpagina: alle artikelen uit de rubriek, nieuwste eerst,
// met knoppen om op onderwerp te filteren
document.querySelectorAll("[data-rubriek-alle]").forEach(function (grid) {
  const rubriek = grid.getAttribute("data-rubriek-alle");
  const lijst = artikelenOpDatum.filter(function (a) { return a.rubriek === rubriek; });

  if (lijst.length === 0) {
    const leeg = document.createElement("p");
    leeg.className = "leeg";
    leeg.textContent = "Binnenkort verschijnen hier de eerste artikelen.";
    grid.appendChild(leeg);
    return;
  }

  const kaarten = lijst.map(function (a) {
    const kaart = maakKaart(a);
    kaart.dataset.onderwerp = a.onderwerp ? onderwerpAdres(a.onderwerp) : "";
    grid.appendChild(kaart);
    return kaart;
  });

  // Alleen onderwerpen tonen waar artikelen in staan, in de vaste volgorde
  const aanwezig = (onderwerpen[rubriek] || []).filter(function (o) {
    return lijst.some(function (a) { return a.onderwerp === o; });
  });
  if (aanwezig.length === 0) { return; }

  const balk = document.createElement("div");
  balk.className = "onderwerpen";
  balk.setAttribute("role", "group");
  balk.setAttribute("aria-label", "Filter op onderwerp");

  const knoppen = [{ naam: "Alles", adres: "" }].concat(aanwezig.map(function (o) {
    return { naam: o, adres: onderwerpAdres(o) };
  })).map(function (o) {
    const knop = document.createElement("button");
    knop.type = "button";
    knop.textContent = o.naam;
    knop.dataset.adres = o.adres;
    knop.addEventListener("click", function () {
      history.replaceState(null, "", o.adres ? "#" + o.adres : window.location.pathname);
      toon(o.adres);
    });
    balk.appendChild(knop);
    return knop;
  });
  grid.parentNode.insertBefore(balk, grid);

  function toon(adres) {
    if (adres && !aanwezig.some(function (o) { return onderwerpAdres(o) === adres; })) { adres = ""; }
    knoppen.forEach(function (k) { k.setAttribute("aria-pressed", k.dataset.adres === adres ? "true" : "false"); });
    kaarten.forEach(function (k) { k.hidden = adres !== "" && k.dataset.onderwerp !== adres; });
  }

  toon(decodeURIComponent(window.location.hash.slice(1)));
  window.addEventListener("hashchange", function () {
    toon(decodeURIComponent(window.location.hash.slice(1)));
  });
});

// Artikelpagina: drie andere artikelen uit dezelfde rubriek
const leesOok = document.querySelector("[data-lees-ook]");
const artikelpagina = document.querySelector(".artikelpagina[data-rubriek]");
if (leesOok && artikelpagina) {
  const rubriek = artikelpagina.getAttribute("data-rubriek");
  const ditBestand = window.location.pathname.split("/").pop();
  const lijst = artikelenOpDatum.filter(function (a) {
    return a.rubriek === rubriek && a.url.replace(/^\//, "") !== ditBestand;
  }).slice(0, 3);

  if (lijst.length === 0) {
    leesOok.closest(".lees-ook").hidden = true;
  } else {
    lijst.forEach(function (a) { leesOok.appendChild(maakKaart(a)); });
  }
}
