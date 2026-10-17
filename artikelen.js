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
      rubriek    precies één van: Actualiteiten, Cultuur,
                 Wetenschap, Geschiedenis
      datum      jaar-maand-dag, bijvoorbeeld "2026-11-03"
      inleiding  één of twee zinnen
      afbeelding bestandsnaam van de foto, of "" voor een grijs vak
      url        bestandsnaam van de artikelpagina
   De volgorde in deze lijst maakt niet uit: de datum bepaalt
   welk artikel vooraan komt.
   ============================================================ */
const artikelen = [

  // ----- Voorbeeldartikelen: later vervangen door echte artikelen -----
  { titel: "Voorbeeldartikel 3", rubriek: "Actualiteiten", datum: "2026-10-17",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel 2", rubriek: "Actualiteiten", datum: "2026-10-10",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel 1", rubriek: "Actualiteiten", datum: "2026-10-03",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },

  { titel: "Voorbeeldartikel 3", rubriek: "Cultuur", datum: "2026-10-16",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel 2", rubriek: "Cultuur", datum: "2026-10-09",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel 1", rubriek: "Cultuur", datum: "2026-10-02",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },

  { titel: "Voorbeeldartikel 3", rubriek: "Wetenschap", datum: "2026-10-15",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel 2", rubriek: "Wetenschap", datum: "2026-10-08",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel 1", rubriek: "Wetenschap", datum: "2026-10-01",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },

  { titel: "Voorbeeldartikel 3", rubriek: "Geschiedenis", datum: "2026-10-14",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel 2", rubriek: "Geschiedenis", datum: "2026-10-07",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },
  { titel: "Voorbeeldartikel 1", rubriek: "Geschiedenis", datum: "2026-09-30",
    inleiding: "Een korte inleiding van één of twee zinnen over het artikel.",
    afbeelding: "", url: "#" },

];


/* ============================================================
   HIERONDER NIETS AANPASSEN
   Deze code zet de artikelen op de homepage.
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

  lijst.forEach(function (a) {
    const kaart = document.createElement("a");
    kaart.className = "artikel";
    kaart.href = a.url;

    const beeld = document.createElement("div");
    beeld.className = "afbeelding";
    if (a.afbeelding) {
      const img = document.createElement("img");
      img.src = a.afbeelding;
      img.alt = "";
      beeld.appendChild(img);
    } else {
      beeld.textContent = "Afbeelding";
    }

    const datum = document.createElement("time");
    datum.className = "datum";
    datum.dateTime = a.datum;
    datum.textContent = leesbareDatum(a.datum);

    const kop = document.createElement("h3");
    kop.textContent = a.titel;

    const tekst = document.createElement("p");
    tekst.textContent = a.inleiding;

    kaart.append(beeld, datum, kop, tekst);
    grid.appendChild(kaart);
  });
});
