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
    kopje.textContent = "Volgende feestdag";

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
    link.textContent = "Alle Zweedse feestdagen →";
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

      // Lopend evenement (bijvoorbeeld een tentoonstelling): "t/m einddatum"
      const datumTekst = loopt(e) && e.einddatum
        ? "t/m " + leesbareDatum(e.einddatum)
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

      // Alleen de stad (het deel van "plaats" voor de eerste komma)
      const plaats = document.createElement("p");
      plaats.className = "home-evenement-plaats";
      plaats.textContent = (e.plaats || "").split(",")[0].trim();

      item.append(datum, titel);
      if (plaats.textContent) { item.appendChild(plaats); }
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
