/* ============================================================
   ARTIKELENLIJST VAN DE SUECOFIEL
   Dit is de centrale lijst met alle artikelen. De homepage
   toont bovenaan één uitgelicht artikel en daaronder "Nieuw op
   De Suecofiel": de 3 nieuwste artikelen uit alle rubrieken (bij
   6 of meer artikelen de 6 nieuwste). Het uitgelichte artikel
   staat nooit ook in "Nieuw". De zoekbalk doorzoekt deze lijst
   op elke pagina.

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
                 Boeken (artikelen over boeken, in Cultuur &
                 Tradities), en de invalshoek Zweden & Nederland.
      datum      jaar-maand-dag, bijvoorbeeld "2026-11-03"
      inleiding  één of twee zinnen
      afbeelding foto in de map afbeeldingen, bijvoorbeeld
                 "afbeeldingen/stockholm.jpg", of "" voor een grijs vak
      url        bestandsnaam van de artikelpagina
      uitgelicht optioneel: zet uitgelicht: true om dit artikel bovenaan
                 de homepage te tonen. Zonder deze regel wordt het
                 nieuwste artikel automatisch uitgelicht. Haal de regel
                 weg als het artikel niet meer uitgelicht hoeft te zijn.
   De volgorde in deze lijst maakt niet uit: de datum bepaalt
   welk artikel vooraan komt.
   ============================================================ */
const artikelen = [

  { titel: "Nieuwe boeken met een Zweedse link in 2026", rubriek: "Cultuur & Tradities", onderwerp: "Taal & Literatuur", labels: ["Boeken"], datum: "2026-11-08",
    inleiding: "Een selectie uit de boeken met een Zweedse link die in 2026 zijn verschenen: zeven titels, op volgorde van verschijning. Ook Engelstalige titels staan erbij.",
    afbeelding: "afbeeldingen/boeken-november-2026.jpg", url: "boeken-november-2026" },

  { titel: "Finland viert deze week de Zweedse taal", rubriek: "Actualiteiten", onderwerp: "", labels: ["Duiding"], datum: "2026-11-03",
    inleiding: "Deze week staat in Finland de Zweedse taal centraal. Svenska veckan loopt van 2 tot en met 8 november, met Svenska dagen op vrijdag 6 november als hoogtepunt.",
    afbeelding: "afbeeldingen/abo-svenska-teater.jpg", url: "svenska-veckan" },

  { titel: "Een goed jaar voor de Zweedse wijnbouw", rubriek: "Actualiteiten", onderwerp: "", labels: ["Duiding"], datum: "2026-11-01",
    inleiding: "Wijnboeren in Skåne spreken van een zeer goed oogstjaar. De sector is klein, maar groeit snel en mag sinds vorig jaar ook wijn verkopen op het eigen terrein.",
    afbeelding: "afbeeldingen/lysekil-druiven.jpg", url: "zweedse-wijn" },

  { titel: "Göteborg: hoe Nederlanders een Zweedse havenstad hielpen vormgeven", rubriek: "Samenleving", onderwerp: "Geschiedenis", labels: ["Achtergrond", "Zweden & Nederland"], datum: "2026-10-25",
    inleiding: "Van zeventiende-eeuwse grachten tot een moderne internationale haven: de geschiedenis van Göteborg laat zien hoe nauw Zweden en de Nederlandse Republiek met elkaar verbonden waren.",
    afbeelding: "afbeeldingen/goteborg-stora-hamnkanalen.jpg", url: "goteborg-nederlanders" },

  { titel: "De predikant uit Arvika en de lichtjes van Allerheiligen", rubriek: "Cultuur & Tradities", onderwerp: "Tradities", labels: ["Achtergrond"], datum: "2026-10-21",
    inleiding: "Met Alla helgons dag bezoekt ongeveer de helft van de Zweden een begraafplaats. Een opvallend jonge traditie, met een predikant uit Arvika in een onverwachte hoofdrol.",
    afbeelding: "afbeeldingen/alla-helgons-dag.jpg", url: "alla-helgons-dag" },

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
  const maanden = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
  return d.getDate() + " " + maanden[d.getMonth()] + " " + d.getFullYear();
}

// Nieuwste artikelen eerst
const artikelenOpDatum = artikelen.slice().sort(function (a, b) {
  return b.datum.localeCompare(a.datum);
});

// Adres altijd vanaf de hoofdmap van de site laten beginnen
// ("cultuur" wordt "/cultuur"), zodat links overal werken
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

// Adres van de rubriekpagina bij elke rubriek
const rubriekAdressen = {
  "Actualiteiten": "/actualiteiten",
  "Cultuur & Tradities": "/cultuur",
  "Samenleving": "/samenleving"
};

// Regel boven de titel op de homepage: rubriek (aanklikbaar) en datum
function maakRubriekRegel(a) {
  const regel = document.createElement("p");
  regel.className = "kaart-rubriek-regel";
  const rubriek = document.createElement("a");
  rubriek.className = "kaart-rubriek";
  rubriek.href = rubriekAdressen[a.rubriek] || "/";
  rubriek.textContent = a.rubriek;
  const datum = document.createElement("time");
  datum.dateTime = a.datum;
  datum.textContent = leesbareDatum(a.datum);
  regel.append(rubriek, datum);
  return regel;
}

// Afbeelding (of grijs vak) voor de homepage-kaarten
function maakHomeAfbeelding(a) {
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
  return beeld;
}

// Titel als link; een onzichtbare laag maakt de hele kaart klikbaar
function maakTitelLink(a, kop) {
  const link = document.createElement("a");
  link.className = "kaart-link";
  link.href = siteAdres(a.url);
  link.textContent = a.titel;
  kop.appendChild(link);
  return kop;
}

// Homepage: uitgelicht artikel bovenaan
// (het nieuwste artikel met uitgelicht: true, anders het nieuwste artikel)
const uitgelichtVak = document.getElementById("uitgelicht");
let uitgelichtArtikel = null;
if (uitgelichtVak) {
  uitgelichtArtikel = artikelenOpDatum.find(function (a) { return a.uitgelicht; }) || artikelenOpDatum[0];
  if (uitgelichtArtikel) {
    const a = uitgelichtArtikel;
    const kaart = document.createElement("article");
    kaart.className = "uitgelicht-kaart";
    const tekst = document.createElement("div");
    const inl = document.createElement("p");
    inl.className = "uitgelicht-inleiding";
    inl.textContent = a.inleiding;
    tekst.append(maakRubriekRegel(a), maakTitelLink(a, document.createElement("h2")), inl);
    kaart.append(maakHomeAfbeelding(a), tekst);
    uitgelichtVak.appendChild(kaart);
  } else {
    uitgelichtVak.closest(".uitgelicht").hidden = true;
  }
}

// Homepage: "Nieuw op De Suecofiel": de nieuwste artikelen uit alle rubrieken,
// zonder het uitgelichte artikel. Altijd volle rijen van 3: bij 3, 4 of 5
// artikelen staan er 3, vanaf 6 artikelen staan er 6.
const nieuwRaster = document.getElementById("nieuw-raster");
if (nieuwRaster) {
  const kandidaten = artikelenOpDatum.filter(function (a) { return a !== uitgelichtArtikel; });
  let aantal = Math.min(6, kandidaten.length);
  if (aantal > 3) { aantal = Math.floor(aantal / 3) * 3; }

  if (aantal === 0) {
    nieuwRaster.closest("section").hidden = true;
  } else {
    kandidaten.slice(0, aantal).forEach(function (a) {
      const kaart = document.createElement("article");
      kaart.className = "artikel artikel-home";
      const inl = document.createElement("p");
      inl.textContent = a.inleiding;
      kaart.append(maakHomeAfbeelding(a), maakRubriekRegel(a), maakTitelLink(a, document.createElement("h3")), inl);
      nieuwRaster.appendChild(kaart);
    });
  }
}

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
