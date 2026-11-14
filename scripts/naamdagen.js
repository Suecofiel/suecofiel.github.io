/* ============================================================
   ZWEEDSE NAAMDAGEN (pagina naamdagen.html in de Kennisbank
   en het naamdagkaartje op de homepage)

   Dit bestand heeft twee taken:
   1. Het leveren van de gegevens: scripts/homepage.js haalt hieruit de
      naam of namen van vandaag voor het naamdagkaartje.
   2. Het vullen van de lijst "Alle naamdagen" op de pagina naamdagen.html.

   BRON: de officiële namnlängd van Svenska Akademien (de almanak op
   svenskaakademien.se), stand 13 november 2026. Alleen de namen uit de
   officiële lijst, dus niet de uitgebreide lijst met verwante namen.
   Per dag staan de namen alfabetisch. Dagen zonder persoonsnaam (1 januari,
   2 februari, 29 februari, 25 maart, 24 juni, 1 november en 25 december)
   hebben een lege lijst: dan toont het kaartje op de homepage "Geen naamdag".

   NOOT: William (6 april), Sam (1 september), Saga (8 maart), Ronja
   (14 september), Jasmine (26 juli) en Emmy (23 juli) staan in de tabel van
   de Academie als "Nej" (niet in de namnlängd), maar de persberichten van de
   Academie (2011 en 2018) en de pagina "Namnsdagar i almanackan" van ISOF
   noemen ze wel als toevoeging aan de lijst. Ze zijn daarom opgenomen.
   De lijst bevat nu 626 namen; ISOF noemt er 627 (verschil nog niet verklaard).

   BIJWERKEN: vanaf 2027 komen er zes namen bij (volgens ISOF, 14 januari 2025):
      Eira       24 januari    (naast Erika)
      Mio        5 juni        (naast Bo)
      Vilgot     30 juli       (naast Algot)
      Cassandra  20 oktober    (naast Sibylla)
      Flora      29 oktober    (naast Viola)
      Zackarias  19 december   (naast Isak)
   Voeg ze toe op de juiste regel hieronder, op alfabetische plek, bijvoorbeeld
   "10-20": ["Cassandra", "Sibylla"], en pas de tekst op de pagina aan.
   De sleutel is "maand-dag" met twee cijfers.
   ============================================================ */
const naamdagen = {
  "01-01": [],
  "01-02": ["Svea"],
  "01-03": ["Alfred", "Alfrida"],
  "01-04": ["Rut"],
  "01-05": ["Hanna", "Hannele"],
  "01-06": ["Baltsar", "Kasper", "Melker"],
  "01-07": ["August", "Augusta"],
  "01-08": ["Erland"],
  "01-09": ["Gunder", "Gunnar"],
  "01-10": ["Sigbritt", "Sigurd"],
  "01-11": ["Jan", "Jannike"],
  "01-12": ["Frideborg", "Fridolf"],
  "01-13": ["Knut"],
  "01-14": ["Felicia", "Felix"],
  "01-15": ["Laura", "Lorentz"],
  "01-16": ["Helmer", "Hjalmar"],
  "01-17": ["Anton", "Tony"],
  "01-18": ["Hilda", "Hildur"],
  "01-19": ["Henrik", "Henry"],
  "01-20": ["Fabian", "Sebastian"],
  "01-21": ["Agnes", "Agneta"],
  "01-22": ["Viktor", "Vincent"],
  "01-23": ["Frej", "Freja"],
  "01-24": ["Erika"],
  "01-25": ["Paul", "Pål"],
  "01-26": ["Bodil", "Boel"],
  "01-27": ["Göta", "Göte"],
  "01-28": ["Karl", "Karla"],
  "01-29": ["Diana"],
  "01-30": ["Gunhild", "Gunilla"],
  "01-31": ["Ivar", "Joar"],
  "02-01": ["Max", "Maximilian"],
  "02-02": [],
  "02-03": ["Disa", "Hjördis"],
  "02-04": ["Anselm", "Ansgar"],
  "02-05": ["Agata", "Agda"],
  "02-06": ["Doris", "Dorotea"],
  "02-07": ["Dick", "Rikard"],
  "02-08": ["Bert", "Berta"],
  "02-09": ["Fanny", "Franciska"],
  "02-10": ["Iris"],
  "02-11": ["Inge", "Yngve"],
  "02-12": ["Evelina", "Evy"],
  "02-13": ["Agne", "Ove"],
  "02-14": ["Valentin"],
  "02-15": ["Sigfrid"],
  "02-16": ["Julia", "Julius"],
  "02-17": ["Alexandra", "Sandra"],
  "02-18": ["Frida", "Fritiof"],
  "02-19": ["Ella", "Gabriella"],
  "02-20": ["Vivianne"],
  "02-21": ["Hilding"],
  "02-22": ["Pia"],
  "02-23": ["Torsten", "Torun"],
  "02-24": ["Mats", "Mattias"],
  "02-25": ["Sigvard", "Sivert"],
  "02-26": ["Torgny", "Torkel"],
  "02-27": ["Lage"],
  "02-28": ["Maja", "Maria"],
  "02-29": [],
  "03-01": ["Albin", "Elvira"],
  "03-02": ["Erna", "Ernst"],
  "03-03": ["Gunborg", "Gunvor"],
  "03-04": ["Adrian", "Adriana"],
  "03-05": ["Tora", "Tove"],
  "03-06": ["Ebba", "Ebbe"],
  "03-07": ["Camilla"],
  "03-08": ["Saga", "Siv"],
  "03-09": ["Torbjörn", "Torleif"],
  "03-10": ["Ada", "Edla"],
  "03-11": ["Edvin", "Egon"],
  "03-12": ["Regina", "Viktoria"],
  "03-13": ["Greger"],
  "03-14": ["Matilda", "Maud"],
  "03-15": ["Christel", "Kristoffer"],
  "03-16": ["Gilbert", "Herbert"],
  "03-17": ["Gertrud"],
  "03-18": ["Edmund", "Edvard"],
  "03-19": ["Josef", "Josefina"],
  "03-20": ["Joakim", "Kim"],
  "03-21": ["Bengt"],
  "03-22": ["Kennet", "Kent"],
  "03-23": ["Gerd", "Gerda"],
  "03-24": ["Gabriel", "Rafael"],
  "03-25": [],
  "03-26": ["Emanuel"],
  "03-27": ["Ralf", "Rudolf"],
  "03-28": ["Malkolm", "Morgan"],
  "03-29": ["Jens", "Jonas"],
  "03-30": ["Holger", "Holmfrid"],
  "03-31": ["Ester", "Noa(h)"],
  "04-01": ["Harald", "Hervor"],
  "04-02": ["Gudmund", "Ingemund"],
  "04-03": ["Ferdinand", "Nanna"],
  "04-04": ["Marianne", "Marlene"],
  "04-05": ["Irene", "Irja"],
  "04-06": ["Vilhelm", "William"],
  "04-07": ["Irma", "Irmelin"],
  "04-08": ["Nadja", "Tanja"],
  "04-09": ["Ottilia", "Otto"],
  "04-10": ["Ingvar", "Ingvor"],
  "04-11": ["Ulf", "Ylva"],
  "04-12": ["Liv"],
  "04-13": ["Artur", "Douglas"],
  "04-14": ["Tiburtius"],
  "04-15": ["Oliver", "Olivia"],
  "04-16": ["Patricia", "Patrik"],
  "04-17": ["Elias", "Elis"],
  "04-18": ["Valdemar", "Volmar"],
  "04-19": ["Ola", "Olaus"],
  "04-20": ["Amalia", "Amelie"],
  "04-21": ["Anneli", "Annika"],
  "04-22": ["Allan", "Glenn"],
  "04-23": ["Georg", "Göran"],
  "04-24": ["Vega"],
  "04-25": ["Markus"],
  "04-26": ["Terese", "Teresia"],
  "04-27": ["Engelbrekt"],
  "04-28": ["Ture", "Tyra"],
  "04-29": ["Tyko"],
  "04-30": ["Mariana"],
  "05-01": ["Valborg"],
  "05-02": ["Filip", "Filippa"],
  "05-03": ["Jane", "John"],
  "05-04": ["Mona", "Monika"],
  "05-05": ["Erhard", "Gotthard"],
  "05-06": ["Marit", "Rita"],
  "05-07": ["Carina", "Carita"],
  "05-08": ["Åke"],
  "05-09": ["Reidar", "Reidun"],
  "05-10": ["Esbjörn", "Styrbjörn"],
  "05-11": ["Märit", "Märta"],
  "05-12": ["Charlotta", "Lotta"],
  "05-13": ["Linn", "Linnea"],
  "05-14": ["Halvar", "Halvard"],
  "05-15": ["Sofia", "Sonja"],
  "05-16": ["Ronald", "Ronny"],
  "05-17": ["Rebecka", "Ruben"],
  "05-18": ["Erik"],
  "05-19": ["Maj", "Majken"],
  "05-20": ["Carola", "Karolina"],
  "05-21": ["Conny", "Konstantin"],
  "05-22": ["Hemming", "Henning"],
  "05-23": ["Desideria", "Desirée"],
  "05-24": ["Ivan", "Vanja"],
  "05-25": ["Urban"],
  "05-26": ["Vilhelmina", "Vilma"],
  "05-27": ["Beda", "Blenda"],
  "05-28": ["Borghild", "Ingeborg"],
  "05-29": ["Jeanette", "Yvonne"],
  "05-30": ["Vera", "Veronika"],
  "05-31": ["Pernilla", "Petronella"],
  "06-01": ["Gun", "Gunnel"],
  "06-02": ["Roger", "Rutger"],
  "06-03": ["Gudmar", "Ingemar"],
  "06-04": ["Solbritt", "Solveig"],
  "06-05": ["Bo"],
  "06-06": ["Gustav", "Gösta"],
  "06-07": ["Robert", "Robin"],
  "06-08": ["Eivor", "Majvor"],
  "06-09": ["Birger", "Börje"],
  "06-10": ["Boris", "Svante"],
  "06-11": ["Berthold", "Bertil"],
  "06-12": ["Eskil"],
  "06-13": ["Aina", "Aino"],
  "06-14": ["Hakon", "Håkan"],
  "06-15": ["Margit", "Margot"],
  "06-16": ["Axel", "Axelina"],
  "06-17": ["Torborg", "Torvald"],
  "06-18": ["Bjarne", "Björn"],
  "06-19": ["Germund", "Görel"],
  "06-20": ["Linda"],
  "06-21": ["Alf", "Alvar"],
  "06-22": ["Paula", "Paulina"],
  "06-23": ["Adolf", "Alice"],
  "06-24": [],
  "06-25": ["David", "Salomon"],
  "06-26": ["Lea", "Rakel"],
  "06-27": ["Fingal", "Selma"],
  "06-28": ["Leo"],
  "06-29": ["Peter", "Petra"],
  "06-30": ["Elof", "Leif"],
  "07-01": ["Aron", "Mirjam"],
  "07-02": ["Rosa", "Rosita"],
  "07-03": ["Aurora"],
  "07-04": ["Ulla", "Ulrika"],
  "07-05": ["Laila", "Ritva"],
  "07-06": ["Esaias", "Jessika"],
  "07-07": ["Klas"],
  "07-08": ["Kjell"],
  "07-09": ["Jörgen", "Örjan"],
  "07-10": ["André", "Andrea"],
  "07-11": ["Eleonora", "Ellinor"],
  "07-12": ["Herman", "Hermine"],
  "07-13": ["Joel", "Judit"],
  "07-14": ["Folke"],
  "07-15": ["Ragnhild", "Ragnvald"],
  "07-16": ["Reine", "Reinhold"],
  "07-17": ["Bruno"],
  "07-18": ["Fredrik", "Fritz"],
  "07-19": ["Sara"],
  "07-20": ["Greta", "Margareta"],
  "07-21": ["Johanna"],
  "07-22": ["Madeleine", "Magdalena"],
  "07-23": ["Emma", "Emmy"],
  "07-24": ["Kerstin", "Kristina"],
  "07-25": ["Jakob"],
  "07-26": ["Jasmine", "Jesper"],
  "07-27": ["Marta"],
  "07-28": ["Botvid", "Seved"],
  "07-29": ["Olle", "Olof"],
  "07-30": ["Algot"],
  "07-31": ["Elin", "Helena"],
  "08-01": ["Per"],
  "08-02": ["Kajsa", "Karin"],
  "08-03": ["Tage"],
  "08-04": ["Arne", "Arnold"],
  "08-05": ["Alrik", "Ulrik"],
  "08-06": ["Alfons", "Inez"],
  "08-07": ["Denise", "Dennis"],
  "08-08": ["Silvia", "Sylvia"],
  "08-09": ["Roland"],
  "08-10": ["Lars"],
  "08-11": ["Susanna"],
  "08-12": ["Klara"],
  "08-13": ["Kaj"],
  "08-14": ["Uno"],
  "08-15": ["Estelle", "Stella"],
  "08-16": ["Brynolf"],
  "08-17": ["Valter", "Verner"],
  "08-18": ["Ellen", "Lena"],
  "08-19": ["Magnus", "Måns"],
  "08-20": ["Bernhard", "Bernt"],
  "08-21": ["Jon"],
  "08-22": ["Henrietta", "Henrika"],
  "08-23": ["Signe", "Signhild"],
  "08-24": ["Bartolomeus"],
  "08-25": ["Louise", "Lovisa"],
  "08-26": ["Östen"],
  "08-27": ["Raoul", "Rolf"],
  "08-28": ["Fatima", "Leila"],
  "08-29": ["Hampus", "Hans"],
  "08-30": ["Albert", "Albertina"],
  "08-31": ["Arvid", "Vidar"],
  "09-01": ["Sam", "Samuel"],
  "09-02": ["Justina", "Justus"],
  "09-03": ["Alfhild", "Alva"],
  "09-04": ["Gisela"],
  "09-05": ["Adela", "Heidi"],
  "09-06": ["Lilian", "Lilly"],
  "09-07": ["Kevin", "Roy"],
  "09-08": ["Alma", "Hulda"],
  "09-09": ["Anita", "Annette"],
  "09-10": ["Tord", "Turid"],
  "09-11": ["Dagny", "Helny"],
  "09-12": ["Åsa", "Åslög"],
  "09-13": ["Sture"],
  "09-14": ["Ida", "Ronja"],
  "09-15": ["Sigrid", "Siri"],
  "09-16": ["Dag", "Daga"],
  "09-17": ["Hildegard", "Magnhild"],
  "09-18": ["Orvar"],
  "09-19": ["Fredrika"],
  "09-20": ["Elise", "Lisa"],
  "09-21": ["Matteus"],
  "09-22": ["Maurits", "Moritz"],
  "09-23": ["Tea", "Tekla"],
  "09-24": ["Gerhard", "Gert"],
  "09-25": ["Tryggve"],
  "09-26": ["Einar", "Enar"],
  "09-27": ["Dagmar", "Rigmor"],
  "09-28": ["Lennart", "Leonard"],
  "09-29": ["Mikael", "Mikaela"],
  "09-30": ["Helge"],
  "10-01": ["Ragna", "Ragnar"],
  "10-02": ["Love", "Ludvig"],
  "10-03": ["Evald", "Osvald"],
  "10-04": ["Frank", "Frans"],
  "10-05": ["Bror"],
  "10-06": ["Jennifer", "Jenny"],
  "10-07": ["Birgitta", "Britta"],
  "10-08": ["Nils"],
  "10-09": ["Inger", "Ingrid"],
  "10-10": ["Harriet", "Harry"],
  "10-11": ["Erling", "Jarl"],
  "10-12": ["Manfred", "Valfrid"],
  "10-13": ["Berit", "Birgit"],
  "10-14": ["Stellan"],
  "10-15": ["Hedvig", "Hillevi"],
  "10-16": ["Finn"],
  "10-17": ["Antonia", "Toini"],
  "10-18": ["Lukas"],
  "10-19": ["Tor", "Tore"],
  "10-20": ["Sibylla"],
  "10-21": ["Ursula", "Yrsa"],
  "10-22": ["Marika", "Marita"],
  "10-23": ["Severin", "Sören"],
  "10-24": ["Eilert", "Evert"],
  "10-25": ["Inga", "Ingalill"],
  "10-26": ["Amanda", "Rasmus"],
  "10-27": ["Sabina"],
  "10-28": ["Simon", "Simone"],
  "10-29": ["Viola"],
  "10-30": ["Elsa", "Isabella"],
  "10-31": ["Edgar", "Edit"],
  "11-01": [],
  "11-02": ["Tim", "Tobias"],
  "11-03": ["Hubert", "Hugo"],
  "11-04": ["Sverker"],
  "11-05": ["Eugen", "Eugenia"],
  "11-06": ["Gustav Adolf"],
  "11-07": ["Ingegerd", "Ingela"],
  "11-08": ["Vendela"],
  "11-09": ["Teodor", "Teodora"],
  "11-10": ["Martin", "Martina"],
  "11-11": ["Mårten"],
  "11-12": ["Konrad", "Kurt"],
  "11-13": ["Krister", "Kristian"],
  "11-14": ["Emil", "Emilia"],
  "11-15": ["Leopold"],
  "11-16": ["Vibeke", "Viveka"],
  "11-17": ["Naemi", "Naima"],
  "11-18": ["Lillemor", "Moa"],
  "11-19": ["Elisabet", "Lisbet"],
  "11-20": ["Marina", "Pontus"],
  "11-21": ["Helga", "Olga"],
  "11-22": ["Cecilia", "Sissela"],
  "11-23": ["Klemens"],
  "11-24": ["Gudrun", "Rune"],
  "11-25": ["Katarina", "Katja"],
  "11-26": ["Linus"],
  "11-27": ["Asta", "Astrid"],
  "11-28": ["Malte"],
  "11-29": ["Sune"],
  "11-30": ["Anders", "Andreas"],
  "12-01": ["Oskar", "Ossian"],
  "12-02": ["Beata", "Beatrice"],
  "12-03": ["Cornelia", "Lydia"],
  "12-04": ["Barbara", "Barbro"],
  "12-05": ["Sven"],
  "12-06": ["Niklas", "Nikolaus"],
  "12-07": ["Angela", "Angelika"],
  "12-08": ["Virginia"],
  "12-09": ["Anna"],
  "12-10": ["Malena", "Malin"],
  "12-11": ["Daniel", "Daniela"],
  "12-12": ["Alexander", "Alexis"],
  "12-13": ["Lucia"],
  "12-14": ["Sixten", "Sten"],
  "12-15": ["Gottfrid"],
  "12-16": ["Assar"],
  "12-17": ["Stig"],
  "12-18": ["Abraham"],
  "12-19": ["Isak"],
  "12-20": ["Israel", "Moses"],
  "12-21": ["Tomas"],
  "12-22": ["Jonatan", "Natanael"],
  "12-23": ["Adam"],
  "12-24": ["Eva"],
  "12-25": [],
  "12-26": ["Staffan", "Stefan"],
  "12-27": ["Johan", "Johannes"],
  "12-28": ["Benjamin"],
  "12-29": ["Natalia", "Natalie"],
  "12-30": ["Abel", "Set"],
  "12-31": ["Sylvester"]
};

// ----- De lijst op de pagina naamdagen.html -----
// Opbouw: 4 kwartalen (details), elk met 3 maanden (details). Wat inklapbaar is, hangt af van de breedte:
//  - breed scherm: de kwartalen klappen in/uit (het huidige kwartaal staat open), de maanden staan altijd open
//  - smal scherm: de maanden klappen in/uit (de huidige maand staat open), de kwartalen zijn niet te zien
(function () {
  const lijst = document.getElementById("naamdagen-lijst");
  if (!lijst) { return; }

  const maanden = ["Januari", "Februari", "Maart", "April", "Mei", "Juni",
                   "Juli", "Augustus", "September", "Oktober", "November", "December"];
  const kort = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];
  const sleutels = Object.keys(naamdagen).sort();

  const kwartalen = [];
  const blokken = [];
  for (let k = 0; k < 4; k++) {
    const kwartaal = document.createElement("details");
    kwartaal.className = "naamdagen-kwartaal";
    const kwartaalKop = document.createElement("summary");
    kwartaalKop.textContent = maanden[k * 3] + " \u2013 " + maanden[k * 3 + 2].toLowerCase();
    kwartaal.appendChild(kwartaalKop);
    // De maanden staan in een raster: 3, 2 of 1 naast elkaar, afhankelijk van de breedte (zie style.css)
    const raster = document.createElement("div");
    raster.className = "naamdagen-maanden";
    kwartaal.appendChild(raster);
    lijst.appendChild(kwartaal);
    kwartalen.push(kwartaal);

    for (let m = k * 3; m < k * 3 + 3; m++) {
      const blok = document.createElement("details");
      blok.className = "naamdagen-maand";

      const samenvatting = document.createElement("summary");
      const kop = document.createElement("h2");
      kop.className = "agenda-maand";
      kop.id = maanden[m].toLowerCase();
      kop.textContent = maanden[m];
      samenvatting.appendChild(kop);
      blok.appendChild(samenvatting);

      const dl = document.createElement("dl");
      dl.className = "klanken";
      sleutels.forEach(function (sleutel) {
        if (parseInt(sleutel.slice(0, 2), 10) !== m + 1) { return; }
        const namen = naamdagen[sleutel];
        const rij = document.createElement("div");
        rij.className = "klank";
        const dt = document.createElement("dt");
        dt.textContent = parseInt(sleutel.slice(3), 10) + " " + kort[m];
        const dd = document.createElement("dd");
        if (namen.length) {
          dd.lang = "sv";
          dd.textContent = namen.join(", ");
        } else {
          dd.className = "geen";
          dd.textContent = "geen naamdag";
        }
        rij.appendChild(dt);
        rij.appendChild(dd);
        dl.appendChild(rij);
      });
      blok.appendChild(dl);
      raster.appendChild(blok);
      blokken.push(blok);
    }
  }

  // Breed scherm = 801 px of meer, zoals in style.css
  const breed = window.matchMedia("(min-width: 801px)");
  const huidigeMaand = (typeof vandaagDatum === "function" ? vandaagDatum() : new Date()).getMonth();
  function zetOpen() {
    kwartalen.forEach(function (kwartaal, k) {
      kwartaal.open = !breed.matches || k === Math.floor(huidigeMaand / 3);
    });
    blokken.forEach(function (blok, m) {
      blok.open = breed.matches || m === huidigeMaand;
    });
  }
  zetOpen();
  if (breed.addEventListener) { breed.addEventListener("change", zetOpen); }
  else if (breed.addListener) { breed.addListener(zetOpen); }

  // Wat op dit moment niet inklapbaar is, blijft open
  kwartalen.forEach(function (kwartaal) {
    kwartaal.querySelector("summary").addEventListener("click", function (e) {
      if (!breed.matches) { e.preventDefault(); }
    });
  });
  blokken.forEach(function (blok) {
    blok.querySelector("summary").addEventListener("click", function (e) {
      if (breed.matches) { e.preventDefault(); }
    });
  });

  // Een link naar een maand (bijvoorbeeld /naamdagen#maart) klapt die maand en dat kwartaal open
  function openMaandUitAdres() {
    const el = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const blok = el && el.closest(".naamdagen-maand");
    if (!blok) { return; }
    blok.open = true;
    blok.closest(".naamdagen-kwartaal").open = true;
    el.scrollIntoView();
  }
  window.addEventListener("hashchange", openMaandUitAdres);
  openMaandUitAdres();
})();
