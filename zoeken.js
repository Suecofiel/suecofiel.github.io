/* ============================================================
   ZOEKFUNCTIE VAN DE SUECOFIEL (geldt voor alle pagina's)
   De zoekfunctie doorzoekt twee dingen:
   1. alle artikelen die op de huidige pagina staan (automatisch);
   2. de lijst hieronder, met losse pagina's en artikelen.
   Nieuwe pagina of nieuw artikel? Kopieer dan één regel uit de
   lijst, plak hem eronder en pas de tekst aan.
   ============================================================ */
const extraPaginas = [
  { titel: "Over De Suecofiel", rubriek: "Over", tekst: "suecofiel betekenis woordenboek platform over Zweden", url: "over.html" },
  { titel: "Zo spreek je het Zweeds uit", rubriek: "Uitspraakhulp", tekst: "uitspraak klinkers medeklinkers å ä ö y g k sj tj klanken", url: "uitspraakhulp.html" }
  // Voorbeeld voor later:
  // , { titel: "Gustav Vasa en het ontstaan van Zweden", rubriek: "Geschiedenis", tekst: "Hoe Zweden in 1523 een eigen koninkrijk werd", url: "artikelen/gustav-vasa.html" }
];

// Artikelen op de huidige pagina automatisch verzamelen
const homepageArtikelen = Array.from(document.querySelectorAll(".rubriek")).flatMap(function (sectie) {
  const rubriek = sectie.querySelector("h2").textContent.trim();
  return Array.from(sectie.querySelectorAll(".artikel")).map(function (a) {
    return {
      titel: a.querySelector("h3").textContent.trim(),
      rubriek: rubriek,
      tekst: a.querySelector("p") ? a.querySelector("p").textContent.trim() : "",
      url: a.getAttribute("href")
    };
  });
});

const zoekindex = homepageArtikelen.concat(extraPaginas);
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
