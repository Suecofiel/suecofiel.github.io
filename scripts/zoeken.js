/* ============================================================
   ZOEKFUNCTIE VAN DE SUECOFIEL (geldt voor alle pagina's)
   De zoekfunctie doorzoekt twee dingen:
   1. alle artikelen uit artikelen.js (automatisch);
   2. de lijst hieronder, met losse pagina's zoals Uitspraakhulp.
   Nieuwe losse pagina? Kopieer dan één regel uit de lijst,
   plak hem eronder en pas de tekst aan.
   ============================================================ */
const extraPaginas = [
  { titel: "Over De Suecofiel", rubriek: "Over", tekst: "suecofiel betekenis woordenboek platform over Zweden", url: "over" },
  { titel: "Zo spreek je het Zweeds uit", rubriek: "Kennisbank", tekst: "uitspraakhulp uitspraak klinkers medeklinkers å ä ö y g k sj tj klanken", url: "uitspraakhulp" },
  { titel: "Zweedse feestdagen en tradities", rubriek: "Kennisbank", tekst: "feestdagen tradities kalender agenda midsommar lucia nationaldag kerst valborg pasen", url: "feestdagen" },
  { titel: "Zweden en Nederland in cijfers", rubriek: "Kennisbank", tekst: "cijfers feiten vergelijking oppervlakte inwoners bevolkingsdichtheid hoofdstad stockholm amsterdam bos bosbedekking staatsvorm munteenheid kroon euro welvaart bbp overheidsschuld vakantiedagen levensverwachting ouderschapsverlof energie hernieuwbare duurzame elektriciteit", url: "cijfers" },
  { titel: "Begrippen van A tot Z", rubriek: "Kennisbank", tekst: "begrippen woordenlijst betekenis stormaktstiden grootmacht svenska akademien zweedse academie nobelprijs allemansratten fika folkhemmet fredagsmys hen jantelagen julbord kraftskiva lagom landskap en lan moder svea norrland offentlighetsprincipen personnummer riksdag sambo skargard stuga systembolaget tre kronor", url: "begrippen" },
  { titel: "Tijdlijn van de Zweedse geschiedenis", rubriek: "Kennisbank", tekst: "geschiedenis tijdlijn vikingen vasa gustav kalmarunie grootmacht stormaktstiden bernadotte folkhemmet palme navo eu", url: "tijdlijn" },
  { titel: "Kennisbank", rubriek: "Kennisbank", tekst: "naslag feiten begrippen tijdlijn geschiedenis politiek", url: "kennisbank" },
  { titel: "Agenda", rubriek: "Agenda", tekst: "agenda evenementen Nederland lezing film concert tentoonstelling viering kerstmarkt lucia", url: "agenda" },
  { titel: "Actualiteiten", rubriek: "Rubriek", tekst: "alle artikelen actualiteiten nieuws duiding achtergrond", url: "actualiteiten" },
  { titel: "Cultuur & Tradities", rubriek: "Rubriek", tekst: "alle artikelen cultuur tradities gewoontes taal literatuur muziek kunst levensstijl", url: "cultuur" },
  { titel: "Samenleving", rubriek: "Rubriek", tekst: "alle artikelen samenleving verzorgingsstaat onderwijs werk geschiedenis", url: "samenleving" }
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
   ZOEKKNOP OP BREDE SCHERMEN
   Het zoekveld schuift uit als je op het vergrootglas klikt.
   ============================================================ */
const zoekknop = document.querySelector(".zoekknop");
const zoekblok = document.querySelector(".search");

function zetZoekveld(open) {
  zoekblok.classList.toggle("open", open);
  zoekknop.setAttribute("aria-expanded", open ? "true" : "false");
  if (open) { zoekveld.focus(); } else { resultaten.hidden = true; }
}

if (zoekknop && zoekblok) {
  zoekknop.addEventListener("click", function () {
    zetZoekveld(!zoekblok.classList.contains("open"));
  });
  zoekveld.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { zetZoekveld(false); zoekknop.focus(); }
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".search")) { zetZoekveld(false); }
  });
}


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
   De koers staat in de voettekst (mobiel) en in de band op de homepage (desktop).
   ============================================================ */
(function () {
  const kolommen = document.querySelector(".voettekst-kolommen");
  if (!kolommen) { return; }

  const adressen = [
    "https://api.frankfurter.dev/v1/latest?from=EUR&to=SEK",
    "https://api.frankfurter.app/latest?from=EUR&to=SEK"
  ];

  // Geen API-sleutel of wachtwoord nodig: Frankfurter is een openbare dienst.
  // Na 5 seconden zonder antwoord wordt het opgegeven, zodat de site nooit blijft hangen.
  function haalKoers(i) {
    if (i >= adressen.length) { return Promise.reject(new Error("geen koers")); }
    const controle = ("AbortController" in window) ? new AbortController() : null;
    const wekker = controle ? setTimeout(function () { controle.abort(); }, 5000) : null;
    return fetch(adressen[i], controle ? { signal: controle.signal } : {})
      .then(function (r) { if (!r.ok) { throw new Error("fout"); } return r.json(); })
      .finally(function () { if (wekker) { clearTimeout(wekker); } })
      .catch(function () { return haalKoers(i + 1); });
  }

  // Getallen in Nederlandse notatie (komma als decimaalteken)
  function getal(waarde, decimalen) {
    return waarde.toLocaleString("nl-NL", { minimumFractionDigits: decimalen, maximumFractionDigits: decimalen });
  }
  function leesGetal(tekst) {
    return parseFloat(String(tekst).replace(/\s/g, "").replace(/\./g, "").replace(",", "."));
  }

  // Het invoerblok (EUR en SEK) komt zowel in de voettekst (mobiel) als in de band op de homepage (desktop)
  function rekenHtml() {
    return '<div class="koers-reken">' +
      '<label><span>EUR</span><input type="text" inputmode="decimal" class="koers-eur" value="10" aria-label="Bedrag in euro"></label>' +
      '<span class="koers-pijl" aria-hidden="true">⇄</span>' +
      '<label><span>SEK</span><input type="text" inputmode="decimal" class="koers-sek" aria-label="Bedrag in Zweedse kronor"></label>' +
      '</div>';
  }

  function koppelRekenaar(blok, koers) {
    const eur = blok.querySelector(".koers-eur");
    const sek = blok.querySelector(".koers-sek");
    sek.value = getal(10 * koers, 2);
    eur.addEventListener("input", function () {
      const w = leesGetal(eur.value);
      sek.value = isNaN(w) ? "" : getal(w * koers, 2);
    });
    sek.addEventListener("input", function () {
      const w = leesGetal(sek.value);
      eur.value = isNaN(w) ? "" : getal(w / koers, 2);
    });
  }

  const band = document.getElementById("band");
  const bandKoers = document.getElementById("home-koers");

  haalKoers(0).then(function (data) {
    const koers = data && data.rates && data.rates.SEK;
    if (!koers || typeof koers !== "number" || !data.date) { throw new Error("geen koers"); }

    const d = data.date.split("-").map(Number);
    const datum = new Date(d[0], d[1] - 1, d[2])
      .toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
    const bron = '<p class="koers-bron">ECB-referentiekoers van ' + datum + '</p>';

    // Voettekst (zichtbaar op mobiel, op alle pagina's)
    const blok = document.createElement("div");
    blok.className = "voettekst-koers";
    blok.innerHTML =
      '<h2>Wisselkoers</h2>' +
      '<div class="koers-regels">' +
        '<p class="koers-regel">1 euro = <strong>' + getal(koers, 2) + '</strong> kronor</p>' +
        '<p class="koers-regel">1 krona = <strong>' + getal(1 / koers, 3) + '</strong> euro</p>' +
      '</div>' + rekenHtml() + bron;
    kolommen.appendChild(blok);
    koppelRekenaar(blok, koers);

    // Band op de homepage (zichtbaar op desktop)
    if (bandKoers) {
      bandKoers.innerHTML = '<p class="home-koers-kopje">Wisselkoers</p>' + rekenHtml() + bron;
      bandKoers.hidden = false;
      koppelRekenaar(bandKoers, koers);
      if (band) { band.dataset.koers = "ja"; }
    }
  }).catch(function () {
    /* geen koers: de blokjes blijven weg */
    if (band) { band.dataset.koers = "nee"; }
  }).then(function () {
    if (typeof bandBijwerken === "function") { bandBijwerken(); }
  });
})();
