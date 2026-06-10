// ============================================================
//  Bar28 — Categorie "Gedrag & service" + detail-artikels importeren
// ============================================================
//
//  Gebruik (één keer):
//   In de browser console van https://sportico28.github.io/pachanga-bar/
//   (admin ingelogd), plak:
//     fetch('https://raw.githubusercontent.com/Sportico28/pachanga-bar/main/scripts/import_huisregels.js')
//       .then(r=>r.text()).then(eval)
//
//  Wat het doet:
//   - Maakt categorie 'gedrag' aan (Gedrag & service) als ze nog niet bestaat
//   - Schrijft 4 detail-artikels onder die categorie:
//       /content/artikels/gedrag-klantvriendelijkheid
//       /content/artikels/gedrag-tafels-netheid
//       /content/artikels/gedrag-klachten
//       /content/artikels/gedrag-algemene-houding
//
//  De korte "Gouden regels" staan apart bovenaan de app (admin-tab Huisregels).
//  Deze artikels zijn de uitgebreide uitleg achter die regels.
// ============================================================

(async () => {
  if (typeof db === 'undefined' || typeof currentUser === 'undefined' || !currentUser) {
    alert('Niet ingelogd of db niet beschikbaar.');
    return;
  }
  if (typeof currentRol !== 'undefined' && currentRol !== 'admin') {
    alert('Alleen een admin kan dit importeren.');
    return;
  }

  const date = new Date().toLocaleDateString('nl-BE');
  const author = currentUser.email;
  const catSlug = 'gedrag';

  // 1. Categorie aanmaken indien ze nog niet bestaat
  const catsSnap = await db.ref('content/categorieen').once('value');
  const cats = catsSnap.val() || {};
  const bestaat = Object.values(cats).some(c => c.slug === catSlug);
  if (!bestaat) {
    const maxVol = Object.values(cats).reduce((m, c) => Math.max(m, c.volgorde || 0), 0);
    const cid = 'cat-gedrag';
    await db.ref('content/categorieen/' + cid).set({
      id: cid, slug: catSlug, naam_nl: 'Gedrag & service', naam_en: 'Conduct & service', volgorde: maxVol + 1
    });
    console.log('Categorie "Gedrag & service" aangemaakt.');
  } else {
    console.log('Categorie bestaat al, overslaan.');
  }

  const base = { categorie: catSlug, isChecklist: false, hero_image: null, checklist: null, laatst_gewijzigd: date, auteur: author };

  const articles = {

    'gedrag-klantvriendelijkheid': {
      ...base,
      id: 'gedrag-klantvriendelijkheid',
      titel: 'Klantvriendelijkheid',
      samenvatting: 'Hoe je gasten ontvangt, bedient en laat vertrekken met een goed gevoel.',
      tags: ['klant', 'service', 'gedrag', 'onthaal'],
      synoniemen: ['klantvriendelijk', 'gasten', 'onthaal', 'bediening', 'service'],
      body: `
<h2>Onthaal</h2>
<ul>
<li>Groet elke gast binnen 30 seconden, ook als je achter de bar bezig bent.</li>
<li>Oogcontact en een glimlach. Een kort "Hallo, ik kom zo bij je" is genoeg als het druk is.</li>
<li>Ken je de gast? Gebruik zijn naam.</li>
</ul>

<h2>Tijdens de bediening</h2>
<ul>
<li>Herhaal de bestelling kort om fouten te vermijden.</li>
<li>Weet je iets niet (prijs, kaart, allergenen)? Zoek het op in deze app of vraag een collega. Niet gokken.</li>
<li>Breng drank en eten zo snel mogelijk. Duurt het langer? Verwittig de gast.</li>
</ul>

<h2>Afscheid</h2>
<ul>
<li>Bedank de gast bij het afrekenen of vertrek.</li>
<li>Laat de gast vertrekken met het gevoel dat hij welkom was.</li>
</ul>
`.trim()
    },

    'gedrag-tafels-netheid': {
      ...base,
      id: 'gedrag-tafels-netheid',
      titel: 'Tafels en netheid',
      samenvatting: 'Tafels afruimen, bar droog houden, zaal proper. Een propere zaak verkoopt meer.',
      tags: ['tafels', 'netheid', 'proper', 'afruimen', 'schoonmaak'],
      synoniemen: ['tafel', 'afruimen', 'proper', 'netjes', 'opruimen', 'kuisen'],
      body: `
<h2>Tafels</h2>
<ul>
<li>Ruim een tafel af zodra de gasten weg zijn. Een lege vuile tafel is een gemiste verkoop.</li>
<li>Veeg de tafel af en zet de stoelen recht.</li>
<li>Controleer of er nog glazen of borden blijven staan bij bezette tafels en neem leeg materiaal mee.</li>
</ul>

<h2>Bar</h2>
<ul>
<li>Hou de bar droog. Veeg gemorste drank meteen weg.</li>
<li>Spoel glazen direct af, laat geen stapels staan.</li>
<li>Hou je werkvlak vrij: alleen wat je nu nodig hebt.</li>
</ul>

<h2>Zaal en terras</h2>
<ul>
<li>Loop regelmatig een rondje: rommel oprapen, lege glazen meenemen, asbakken legen.</li>
<li>Controleer de toiletten meermaals per shift.</li>
<li>Zie je iets vuil? Maak het proper, ook al is het niet "jouw" taak.</li>
</ul>
`.trim()
    },

    'gedrag-klachten': {
      ...base,
      id: 'gedrag-klachten',
      titel: 'Klachten afhandelen',
      samenvatting: 'Luister, los op wat je kan, en escaleer naar de shiftverantwoordelijke als het nodig is.',
      tags: ['klacht', 'probleem', 'gedrag', 'service'],
      synoniemen: ['klacht', 'klagen', 'probleem', 'ontevreden', 'boze klant'],
      body: `
<h2>Stap voor stap</h2>
<ol>
<li><strong>Luister</strong> rustig en laat de gast uitspreken. Onderbreek niet.</li>
<li><strong>Toon begrip.</strong> "Ik snap dat dit vervelend is" werkt beter dan je verdedigen.</li>
<li><strong>Los op wat je zelf kan:</strong> een drankje opnieuw maken, een bord vervangen.</li>
<li><strong>Kan je het niet oplossen</strong> of vraagt de gast geld terug? Betrek de shiftverantwoordelijke. Beloof zelf geen terugbetalingen.</li>
<li><strong>Bedank</strong> de gast dat hij het gemeld heeft.</li>
</ol>

<h2>Niet doen</h2>
<ul>
<li>In discussie gaan of de schuld bij de gast leggen.</li>
<li>De klacht negeren of doorschuiven zonder iemand te verwittigen.</li>
</ul>
`.trim()
    },

    'gedrag-algemene-houding': {
      ...base,
      id: 'gedrag-algemene-houding',
      titel: 'Algemene houding',
      samenvatting: 'Verzorgd, op tijd, telefoon weg, geen alcohol tijdens je shift. Jij bent het gezicht van Pachanga.',
      tags: ['houding', 'gedrag', 'gsm', 'kledij', 'shift'],
      synoniemen: ['houding', 'gsm', 'telefoon', 'kledij', 'voorkomen', 'gedrag'],
      body: `
<h2>Voorkomen</h2>
<ul>
<li>Verzorgd en proper. Jij bent het gezicht van Pachanga.</li>
<li>Op tijd voor je shift, zodat je rustig kan starten met de opstart-checklist.</li>
</ul>

<h2>Tijdens je shift</h2>
<ul>
<li>Telefoon weg achter de bar. Korte check op rustige momenten, niet bij gasten.</li>
<li>Geen alcohol tijdens je shift.</li>
<li>Praat met collega's over het werk, niet over privé waar gasten bij staan.</li>
</ul>

<h2>Samenwerken</h2>
<ul>
<li>Help een collega die het druk heeft, ook als het niet jouw taak is.</li>
<li>Geef info door bij een shiftwissel: wat is er gebeurd, wat moet nog gebeuren.</li>
</ul>
`.trim()
    }

  };

  await db.ref('content/artikels').update(articles);
  console.log('Klaar: ' + Object.keys(articles).length + ' artikels geschreven onder categorie "Gedrag & service".');
  alert('Geïmporteerd: categorie "Gedrag & service" + 4 artikels. Ververs de app.');
})();
