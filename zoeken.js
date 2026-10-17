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
  { titel: "Zo spreek je het Zweeds uit", rubriek: "Uitspraakhulp", tekst: "uitspraak klinkers medeklinkers å ä ö y g k sj tj klanken", url: "uitspraakhulp.html" }
];

// Artikelen uit artikelen.js (nieuwste eerst)
const artikelenVoorZoeken = (typeof artikelenOpDatum !== "undefined" ? artikelenOpDatum : []).map(function (a) {
  return { titel: a.titel, rubriek: a.rubriek, tekst: a.inleiding, url: a.url };
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
      a.href = item.url;
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
   Opent en sluit het menu als je op "Menu" tikt.
   ============================================================ */
const menuknop = document.querySelector(".menuknop");
const hoofdmenu = document.getElementById("hoofdmenu");

if (menuknop && hoofdmenu) {
  menuknop.addEventListener("click", function () {
    const open = hoofdmenu.classList.toggle("open");
    menuknop.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // Menu weer sluiten nadat je op een knop in het menu hebt getikt
  hoofdmenu.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      hoofdmenu.classList.remove("open");
      menuknop.setAttribute("aria-expanded", "false");
    }
  });
}
