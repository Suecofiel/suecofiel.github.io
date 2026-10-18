/* ============================================================
   ZOEKFUNCTIE VAN DE SUECOFIEL (geldt voor alle pagina's)
   De zoekfunctie doorzoekt twee dingen:
   1. alle artikelen uit artikelen.js (automatisch);
   2. de lijst hieronder, met losse pagina's zoals Uitspraakhulp.
   Nieuwe losse pagina? Kopieer dan één regel uit de lijst,
   plak hem eronder en pas de tekst aan.
   ============================================================ */
const extraPaginas = [
  { titel: "Over De Suecofiel", rubriek: "Over", tekst: "suecofiel betekenis woordenboek platform over Zweden", url: "over.html" },
  { titel: "Zo spreek je het Zweeds uit", rubriek: "Kennisbank", tekst: "uitspraakhulp uitspraak klinkers medeklinkers å ä ö y g k sj tj klanken", url: "uitspraakhulp.html" },
  { titel: "Zweedse feestdagen", rubriek: "Kennisbank", tekst: "feestdagen tradities kalender agenda midsommar lucia nationaldag kerst valborg pasen", url: "feestdagen.html" },
  { titel: "Kennisbank", rubriek: "Kennisbank", tekst: "naslag feiten begrippen tijdlijn geschiedenis politiek", url: "kennisbank.html" },
  { titel: "Evenementen", rubriek: "Evenementen", tekst: "evenementen Nederland lezing film concert tentoonstelling viering", url: "evenementen.html" },
  { titel: "Actualiteiten", rubriek: "Rubriek", tekst: "alle artikelen actualiteiten nieuws duiding achtergrond", url: "actualiteiten.html" },
  { titel: "Cultuur & Tradities", rubriek: "Rubriek", tekst: "alle artikelen cultuur tradities gewoontes taal literatuur muziek kunst levensstijl", url: "cultuur.html" },
  { titel: "Samenleving", rubriek: "Rubriek", tekst: "alle artikelen samenleving verzorgingsstaat onderwijs werk geschiedenis", url: "samenleving.html" }
];

// Artikelen uit artikelen.js (nieuwste eerst)
const artikelenVoorZoeken = (typeof artikelenOpDatum !== "undefined" ? artikelenOpDatum : []).map(function (a) {
  return { titel: a.titel, rubriek: a.rubriek, tekst: a.inleiding + " " + (a.onderwerp || "") + " " + (a.labels || []).join(" "), url: a.url };
});

const zoekindex = artikelenVoorZoeken.concat(extraPaginas);
const zoekveld = document.getElementById("zoekveld");
const resultaten = document.getElementById("zoekresultaten");

// Hoofdletters en accenten negeren (zodat "angstrom" ook "ångström" vindt)
function normaliseer(tekst) {
  return tekst.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function zoek() {
  const woorden = normaliseer(zoekveld.value).split(/\s+/).filter(Boolean);
  resultaten.innerHTML = "";

  if (woorden.length === 0) {
    resultaten.hidden = true;
    return;
  }

  const treffers = zoekindex.filter(function (item) {
    const inhoud = normaliseer(item.titel + " " + item.rubriek + " " + item.tekst);
    return woorden.every(function (w) { return inhoud.includes(w); });
  });

  if (treffers.length === 0) {
    const li = document.createElement("li");
    li.className = "geen";
    li.textContent = "Geen artikelen gevonden. Probeer een ander woord.";
    resultaten.appendChild(li);
  } else {
    treffers.slice(0, 10).forEach(function (item) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = /^(\/|#|https?:)/.test(item.url) ? item.url : "/" + item.url;
      const label = document.createElement("span");
      label.className = "rubriek-label";
      label.textContent = item.rubriek;
      a.appendChild(label);
      a.appendChild(document.createTextNode(item.titel));
      li.appendChild(a);
      resultaten.appendChild(li);
    });
  }
  resultaten.hidden = false;
}

zoekveld.addEventListener("input", zoek);

// Enter opent het eerste resultaat
zoekveld.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const eerste = resultaten.querySelector("a");
    if (eerste) { window.location.href = eerste.href; }
  }
  if (e.key === "Escape") { resultaten.hidden = true; }
});

// Lijst sluiten als je ergens anders klikt
document.addEventListener("click", function (e) {
  if (!e.target.closest(".search")) { resultaten.hidden = true; }
});


/* ============================================================
   MENUKNOP OP MOBIELE TELEFOONS
   Opent en sluit het menu (met het zoekveld) als je op de menuknop tikt.
   ============================================================ */
const menuknop = document.querySelector(".menuknop");
const hoofdmenu = document.getElementById("hoofdmenu");

if (menuknop && hoofdmenu) {
  const kop = menuknop.closest("header");

  menuknop.addEventListener("click", function () {
    const open = hoofdmenu.classList.toggle("open");
    menuknop.setAttribute("aria-expanded", open ? "true" : "false");
    // Op mobiel staat het zoekveld in het menu: mee openen en sluiten
    if (kop) { kop.classList.toggle("menu-open", open); }
  });

  // Menu weer sluiten nadat je op een knop in het menu hebt getikt
  hoofdmenu.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      hoofdmenu.classList.remove("open");
      menuknop.setAttribute("aria-expanded", "false");
      if (kop) { kop.classList.remove("menu-open"); }
    }
  });
}


/* ============================================================
   WISSELKOERS IN DE VOETTEKST
   Haalt de officiële referentiekoers van de Europese Centrale
   Bank (ECB) op via de gratis dienst Frankfurter. De ECB werkt
   deze koers elke werkdag rond 16.00 uur bij.
   Lukt het ophalen niet, dan verschijnt het blokje gewoon niet.
   ============================================================ */
(function () {
  const kolommen = document.querySelector(".voettekst-kolommen");
  if (!kolommen) { return; }

  const adressen = [
    "https://api.frankfurter.dev/v1/latest?from=EUR&to=SEK",
    "https://api.frankfurter.app/latest?from=EUR&to=SEK"
  ];

  function haalKoers(i) {
    if (i >= adressen.length) { return Promise.reject(new Error("geen koers")); }
    return fetch(adressen[i])
      .then(function (r) { if (!r.ok) { throw new Error("fout"); } return r.json(); })
      .catch(function () { return haalKoers(i + 1); });
  }

  // Getallen in Nederlandse notatie (komma als decimaalteken)
  function getal(waarde, decimalen) {
    return waarde.toLocaleString("nl-NL", { minimumFractionDigits: decimalen, maximumFractionDigits: decimalen });
  }
  function leesGetal(tekst) {
    return parseFloat(String(tekst).replace(/\s/g, "").replace(/\./g, "").replace(",", "."));
  }

  haalKoers(0).then(function (data) {
    const koers = data && data.rates && data.rates.SEK;
    if (!koers) { return; }

    const d = data.date.split("-").map(Number);
    const datum = new Date(d[0], d[1] - 1, d[2])
      .toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });

    const blok = document.createElement("div");
    blok.className = "voettekst-koers";
    blok.innerHTML =
      '<h2>Wisselkoers</h2>' +
      '<p class="koers-regel">1 euro = <strong>' + getal(koers, 2) + '</strong> kronor</p>' +
      '<p class="koers-regel">1 krona = <strong>' + getal(1 / koers, 3) + '</strong> euro</p>' +
      '<div class="koers-reken">' +
        '<label><span>EUR</span><input type="text" inputmode="decimal" id="koers-eur" value="10" aria-label="Bedrag in euro"></label>' +
        '<span class="koers-pijl" aria-hidden="true">⇄</span>' +
        '<label><span>SEK</span><input type="text" inputmode="decimal" id="koers-sek" aria-label="Bedrag in Zweedse kronor"></label>' +
      '</div>' +
      '<p class="koers-bron">ECB-referentiekoers van ' + datum + '</p>';
    kolommen.appendChild(blok);

    const eur = document.getElementById("koers-eur");
    const sek = document.getElementById("koers-sek");
    sek.value = getal(10 * koers, 2);

    eur.addEventListener("input", function () {
      const w = leesGetal(eur.value);
      sek.value = isNaN(w) ? "" : getal(w * koers, 2);
    });
    sek.addEventListener("input", function () {
      const w = leesGetal(sek.value);
      eur.value = isNaN(w) ? "" : getal(w / koers, 2);
    });
  }).catch(function () { /* geen koers: blokje blijft weg */ });
})();
