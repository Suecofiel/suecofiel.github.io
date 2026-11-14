/* ============================================================
   AGENDA OP DE HOMEPAGE
   Toont links de eerstvolgende Zweedse feestdag (uit
   feestdagen.js) en rechts de eerstvolgende 3 evenementen
   (uit agenda.js). Afgelopen feestdagen en evenementen worden
   overgeslagen, met dezelfde regels als op de agendapagina.
   Hier hoef je niets aan te passen: de gegevens staan in
   feestdagen.js en agenda.js.
   ============================================================ */
(function () {
  const vak = document.getElementById("home-agenda");
  if (!vak) { return; }

  // Eerstvolgende feestdag (een feestdag van vandaag telt nog mee)
  let feestdag = null;
  if (typeof feestdagen !== "undefined") {
    const vandaag = vandaagDatum();
    feestdag = feestdagen
      .filter(function (g) { return maakDatum(g.datum) >= vandaag; })
      .sort(function (a, b) { return a.datum.localeCompare(b.datum); })[0] || null;
  }

  // Eerstvolgende 3 evenementen
  const evenementenLijst = (typeof evenementen !== "undefined" ? komendeEvenementen() : []).slice(0, 3);

  if (!feestdag && evenementenLijst.length === 0) {
    vak.closest("section").hidden = true;
    return;
  }

  // ----- Links: volgende feestdag -----
  if (!feestdag) { vak.classList.add("zonder-feestdag"); }
  if (feestdag) {
    const blok = document.createElement("div");
    blok.className = "home-feestdag";

    const kopje = document.createElement("p");
    kopje.className = "home-feestdag-kopje";
    const vandaagTekst = vandaagDatum().getTime() === maakDatum(feestdag.datum).getTime();
    kopje.textContent = vandaagTekst ? "Vandaag" : "Volgende feestdag of traditie";

    const naam = document.createElement("h3");
    naam.textContent = feestdag.titel;

    const dag = document.createElement("p");
    dag.className = "home-feestdag-dag";
    const dagTekst = maakDatum(feestdag.datum).toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });
    dag.textContent = dagTekst.charAt(0).toUpperCase() + dagTekst.slice(1);

    blok.append(kopje, naam, dag);

    if (feestdag.beschrijving) {
      const uitleg = document.createElement("p");
      uitleg.className = "home-feestdag-uitleg";
      uitleg.innerHTML = feestdag.beschrijving;   // eigen tekst uit feestdagen.js (met schuine Zweedse woorden)
      blok.appendChild(uitleg);
    }

    const link = document.createElement("a");
    link.href = "/feestdagen";
    link.textContent = "Alle Zweedse feestdagen en tradities →";
    blok.appendChild(link);

    vak.appendChild(blok);
  }

  // ----- Rechts: eerstvolgende evenementen -----
  const rechts = document.createElement("div");
  rechts.className = "home-evenementen";

  if (evenementenLijst.length === 0) {
    const leeg = document.createElement("p");
    leeg.className = "leeg";
    leeg.textContent = "Binnenkort vind je hier evenementen over Zweden in Nederland.";
    rechts.appendChild(leeg);
  } else {
    const lijst = document.createElement("ul");
    lijst.className = "home-evenementen-lijst";

    evenementenLijst.forEach(function (e) {
      const item = document.createElement("li");
      item.className = "home-evenement";

      // Lopend evenement (bijvoorbeeld een tentoonstelling): "nog t/m einddatum"
      const datumTekst = loopt(e) && e.einddatum
        ? "nog t/m " + leesbareDatum(e.einddatum)
        : leesbareDatum(eerstvolgende(e));
      const datum = document.createElement("time");
      datum.className = "home-evenement-datum";
      datum.dateTime = eerstvolgende(e);
      datum.textContent = datumTekst;

      const titel = document.createElement("h3");
      const titelLink = document.createElement("a");
      titelLink.href = "/agenda";
      titelLink.textContent = e.titel;
      titel.appendChild(titelLink);

      // Onder de titel: label (soort evenement) en de volledige plaats; op mobiel staan
      // label en alleen de stad op de regel bij de datum (CSS bepaalt wat zichtbaar is)
      const meta = document.createElement("p");
      meta.className = "home-evenement-meta";
      if (e.soort) {
        const label = document.createElement("span");
        label.className = "typelabel";
        label.textContent = e.soort;
        meta.appendChild(label);
      }
      const plaatsVolledig = (e.plaats || "").trim();
      if (plaatsVolledig) {
        const volledigPlaats = document.createElement("span");
        volledigPlaats.className = "home-plaats-volledig";
        volledigPlaats.textContent = plaatsVolledig;
        const stad = document.createElement("span");
        stad.className = "home-plaats-stad";
        stad.textContent = plaatsVolledig.split(",")[0].trim();
        meta.append(volledigPlaats, stad);
      }

      item.append(datum, titel);
      if (meta.childNodes.length) { item.appendChild(meta); }
      lijst.appendChild(item);
    });
    rechts.appendChild(lijst);
  }

  const volledig = document.createElement("p");
  volledig.className = "home-agenda-volledig";
  const volledigLink = document.createElement("a");
  volledigLink.href = "/agenda";
  volledigLink.textContent = "Volledige agenda →";
  volledig.appendChild(volledigLink);

  const voorbehoud = document.createElement("p");
  voorbehoud.className = "home-agenda-voorbehoud";
  voorbehoud.textContent = "Gegevens onder voorbehoud.";

  rechts.append(volledig, voorbehoud);
  vak.appendChild(rechts);
})();


/* ============================================================
   ZIJKOLOM OP DE HOMEPAGE: DATUM, NAAMDAG EN BEGRIP VAN DE DAG
   Staat naast "Nieuw op De Suecofiel" (op smallere schermen eronder).
   - Datum: de datum van vandaag als kop.
   - Naamdag: gegevens uit scripts/naamdagen.js. Bestaat dat bestand
     (nog) niet of staat de dag er niet in, dan blijft het kaartje weg.
     Staat de dag er met een lege lijst in (dagen zonder naam), dan
     toont het kaartje "Geen naamdag".
     Het bestand moet in _layouts/standaard.html staan, vóór homepage.js.
       const naamdagen = { "11-13": ["Hugo", "Humbert"], ... };   // "maand-dag"
   - Begrip van de dag: elke dag een ander begrip uit begrippen.html
     (alle begrippen komen om de beurt aan bod). De uitleg wordt na
     twee regels (tot en met 1000 px) of drie regels (daarboven) afgekapt; het hele
     kaartje is een link naar het begrip.
   Lukt er niets van, dan verdwijnt de zijkolom en staat "Nieuw op
   De Suecofiel" weer over de volle breedte.
   Hier hoef je niets aan te passen.
   ============================================================ */
(function () {
  const kolom = document.getElementById("vandaag");
  if (!kolom) { return; }
  const wrapper = kolom.parentNode;

  function ggd(a, b) { return b ? ggd(b, a % b) : a; }
  // Dagkeuze: elke dag een ander nummer; alle nummers komen om de beurt aan bod
  function dagKeuze(aantal) {
    const nu = vandaagDatum();
    const dag = Math.floor(Date.UTC(nu.getFullYear(), nu.getMonth(), nu.getDate()) / 86400000);
    let stap = 7;
    while (ggd(stap, aantal) !== 1) { stap++; }
    return (dag * stap) % aantal;
  }
  // Begrip van de dag: tot en met 1000 px (kaartje onder de artikelen) maximaal 2 regels, daarboven 3
  function begripRegels() { return window.matchMedia("(max-width: 1000px)").matches ? 2 : 3; }
  function esc(t) { return t.replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  // Zet de zijkolom zichtbaar of weg, afhankelijk van wat er gelukt is
  function kolomBijwerken() {
    const naamdagOk = !document.getElementById("vd-naamdag").hidden;
    const begripOk = !document.getElementById("vd-begrip").hidden;
    kolom.hidden = !(naamdagOk || begripOk);
    wrapper.classList.toggle("zonder-zijkolom", kolom.hidden);
    kolom.classList.toggle("zonder-naamdag", !naamdagOk);
    kolom.classList.toggle("zonder-begrip", !begripOk);
  }

  // ----- Datum -----
  const v = vandaagDatum();
  const datumTekst = v.toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" });
  document.getElementById("vandaag-datum").textContent = datumTekst.charAt(0).toUpperCase() + datumTekst.slice(1);

  // ----- Naamdag -----
  if (typeof naamdagen !== "undefined") {
    const sleutel = ("0" + (v.getMonth() + 1)).slice(-2) + "-" + ("0" + v.getDate()).slice(-2);
    let namen = naamdagen[sleutel];
    if (typeof namen === "string") { namen = [namen]; }
    if (namen) {
      document.getElementById("vd-naamdag-naam").textContent = namen.length ? namen.join(" & ") : "Geen naamdag";
      document.getElementById("vd-naamdag").hidden = false;
    }
  }
  kolomBijwerken();

  // ----- Begrip van de dag -----
  fetch("/begrippen.html").then(function (r) {
    if (!r.ok) { throw new Error("fout"); }
    return r.text();
  }).then(function (html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const lijst = Array.from(doc.querySelectorAll(".begrip")).filter(function (b) {
      return b.id && b.querySelector("dt") && b.querySelector("dd:not(.letterlijk)");
    });
    if (!lijst.length) { throw new Error("geen begrippen"); }
    const b = lijst[dagKeuze(lijst.length)];
    const term = b.querySelector("dt").textContent.trim();
    document.getElementById("vd-term").textContent = term.charAt(0).toUpperCase() + term.slice(1);
    document.getElementById("vd-link").href = "/begrippen#" + b.id;
    document.getElementById("vd-begrip").hidden = false;
    kolomBijwerken();
    registreerKap(document.getElementById("vd-tekst"), begripRegels, esc(b.querySelector("dd:not(.letterlijk)").textContent.trim()), "");
  }).catch(function () { /* geen begrip: de zijkolom toont alleen wat er wel is */ });
})();


/* ============================================================
   TEKST AFKAPPEN OP EEN HEEL WOORD
   - Inleidingen van de kaartjes bij "Nieuw op De Suecofiel": maximaal 3 regels
   - Beschrijving van de volgende feestdag: op mobiel maximaal 3 regels
   - Uitleg in het kaartje "Begrip van de dag" (zijkolom): maximaal 2 regels tot en met 1000 px, daarboven 3
   De tekst wordt na de laatste regel afgekapt met "…". Bij een andere schermbreedte
   (draaien van de telefoon, venster vergroten) wordt het opnieuw berekend.
   ============================================================ */
const kapLijst = [];

// Het aantal regels mag ook een functie zijn (wordt bij elke berekening opnieuw gevraagd)
function registreerKap(el, regels, origineel, staart, alleenMobiel) {
  if (!el) { return; }
  const item = {
    el: el,
    regels: regels,
    orig: origineel !== undefined ? origineel : el.innerHTML,
    staart: staart || "",
    alleenMobiel: !!alleenMobiel
  };
  kapLijst.push(item);
  pasKap(item);
}

function pasKap(item) {
  item.el.innerHTML = item.orig;
  if (item.alleenMobiel && !window.matchMedia("(max-width: 800px)").matches) { return; }
  kapAf(item.el, typeof item.regels === "function" ? item.regels() : item.regels, item.staart);
}

function kapAf(el, regels, staart) {
  const stijl = getComputedStyle(el);
  let regelhoogte = parseFloat(stijl.lineHeight);
  if (!regelhoogte) { regelhoogte = parseFloat(stijl.fontSize) * 1.3; }
  const max = regelhoogte * regels + 2;
  if (el.scrollHeight <= max) { return; }
  const inhoud = document.createElement("span");
  while (el.firstChild) { inhoud.appendChild(el.firstChild); }
  const einde = document.createElement("span");
  einde.innerHTML = "…" + (staart || "");
  el.append(inhoud, einde);
  while (el.scrollHeight > max && verwijderLaatsteWoord(inhoud)) { /* doorgaan tot het past */ }
}

function verwijderLaatsteWoord(wortel) {
  const lopen = document.createTreeWalker(wortel, NodeFilter.SHOW_TEXT);
  let laatste = null, n;
  while ((n = lopen.nextNode())) { if (n.nodeValue.trim()) { laatste = n; } }
  if (!laatste) { return false; }
  let tekst = laatste.nodeValue.replace(/\s+$/, "").replace(/\s*\S+$/, "");
  tekst = tekst.replace(/[\s,.;:–—-]+$/, "");
  if (tekst) {
    laatste.nodeValue = tekst;
  } else {
    const ouder = laatste.parentNode;
    ouder.removeChild(laatste);
    if (ouder !== wortel && !ouder.firstChild) { ouder.parentNode.removeChild(ouder); }
  }
  return true;
}

(function () {
  document.querySelectorAll(".home-nieuw .artikel > p:not(.kaart-rubriek-regel)").forEach(function (p) {
    registreerKap(p, 3);
  });
  registreerKap(document.querySelector(".home-feestdag-uitleg"), 3, undefined, "", true);

  let timer;
  window.addEventListener("resize", function () {
    clearTimeout(timer);
    timer = setTimeout(function () { kapLijst.forEach(pasKap); }, 150);
  });
  // Lettertypes laden soms later dan het script: dan opnieuw berekenen
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () { kapLijst.forEach(pasKap); });
  }
})();
