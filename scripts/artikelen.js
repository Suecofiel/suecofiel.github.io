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

  // ----- Voorbeeldartikelen: later vervangen door echte artikelen -----
  { titel: "Voorbeeldartikel Actualiteiten 3", rubriek: "Actualiteiten", labels: ["Duiding"], datum: "2026-10-17",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "artikel-sjabloon.html" },
  { titel: "Voorbeeldartikel Actualiteiten 2", rubriek: "Actualiteiten", labels: ["Duiding", "Zweden & Nederland"], datum: "2026-10-10",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel Actualiteiten 1", rubriek: "Actualiteiten", labels: ["Achtergrond"], datum: "2026-10-03",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel Cultuur 3", rubriek: "Cultuur & Tradities", labels: ["Uitgelegd"], datum: "2026-10-16",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel Cultuur 2", rubriek: "Cultuur & Tradities", labels: ["Achtergrond"], datum: "2026-10-09",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel Cultuur 1", rubriek: "Cultuur & Tradities", labels: ["Recensie"], datum: "2026-10-02",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel Samenleving 3", rubriek: "Samenleving", labels: ["Achtergrond"], datum: "2026-10-15",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel Samenleving 2", rubriek: "Samenleving", labels: ["Uitgelegd"], datum: "2026-10-08",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel Samenleving 1", rubriek: "Samenleving", labels: ["Interview", "Zweden & Nederland"], datum: "2026-10-01",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },

];



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

// Rubriekpagina: alle artikelen uit de rubriek, nieuwste eerst
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
  lijst.forEach(function (a) { grid.appendChild(maakKaart(a)); });
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
