// ============================================================
//  Bar28 — Tapas-werkwijzes importeren in Firebase RTDB
// ============================================================
//
//  Gebruik (één keer):
//   In de browser console van https://sportico28.github.io/pachanga-bar/
//   (admin ingelogd), plak:
//     fetch('https://raw.githubusercontent.com/Sportico28/pachanga-bar/main/scripts/import_tapas.js')
//       .then(r=>r.text()).then(eval)
//
//  Wat het doet:
//   - Schrijft 5 werkwijze-artikels onder de categorie 'Recepten':
//       /content/artikels/tapas-koud
//       /content/artikels/tapas-frituur
//       /content/artikels/tapas-spaghetti
//       /content/artikels/tapas-pizza
//       /content/artikels/tapas-croque
//
//  Bron: 'Werkwijze tapas.docx' (versie juni 2026)
// ============================================================

(async () => {
  if (typeof db === 'undefined' || typeof currentUser === 'undefined' || !currentUser) {
    alert('Niet ingelogd of db niet beschikbaar.');
    return;
  }

  const date = new Date().toLocaleDateString('nl-BE');
  const author = currentUser.email;
  const cat = 'recepten';
  const baseArticle = {
    categorie: cat,
    isChecklist: false,
    hero_image: null,
    checklist: null,
    laatst_gewijzigd: date,
    auteur: author
  };

  const articles = {

    'tapas-koud': {
      ...baseArticle,
      id: 'tapas-koud',
      titel: 'Koude tapas (kaas, salami, gemengd)',
      samenvatting: 'Drie kant-en-klare porties: kaas, salami of gemengd. Altijd met augurken, ajuintjes en mosterd.',
      tags: ['tapas', 'koud', 'kaas', 'salami', 'augurken', 'mosterd'],
      synoniemen: ['kaasbordje', 'salamibordje', 'tapas koud', 'apero'],
      body: `
<h2>Algemeen</h2>
<p>Drie portie-varianten. Altijd op één bord, altijd met <strong>augurken, ajuintjes en mosterd</strong> erbij.</p>

<h2>Portie kaas</h2>
<ul>
<li>Kaasblokjes op een bord</li>
<li>Augurken, ajuintjes, mosterd ernaast</li>
<li>Variant: kaas kan ook <strong>los op een bord</strong> (zonder garnituur)</li>
</ul>

<h2>Portie salami</h2>
<ul>
<li>Salami op een bord</li>
<li>Augurken, ajuintjes, mosterd ernaast</li>
<li>Variant: salami kan ook <strong>los op een bord</strong> (zonder garnituur)</li>
</ul>

<h2>Portie gemengd (kaas + salami)</h2>
<ul>
<li>Kaas én salami samen op een bord</li>
<li>Hoeveelheid van elk = ongeveer <strong>de grootte van een potje</strong></li>
<li>Augurken, ajuintjes, mosterd ernaast</li>
</ul>
`.trim()
    },

    'tapas-frituur': {
      ...baseArticle,
      id: 'tapas-frituur',
      titel: 'Frituursnacks (bitterballen, kaasballetjes, kipkrokantjes, mini-loempia\'s)',
      samenvatting: 'Frituur op 180° gedurende 4 à 5 minuten. Per portie 9 stuks. Telkens ovaal bord met sauspotje.',
      tags: ['tapas', 'warm', 'frituur', 'bitterballen', 'kaasballetjes', 'kipkrokantjes', 'loempia'],
      synoniemen: ['frituur', 'bitterbal', 'kaasbal', 'kipkrok', 'loempias', 'snacks', 'warme tapas'],
      body: `
<h2>Frituur instelling</h2>
<p><strong>180°C · 4 à 5 minuten</strong>. Geldt voor alle frituursnacks hieronder.</p>

<h2>Algemene presentatie</h2>
<ul>
<li><strong>Ovaal bord</strong></li>
<li>Servetten onder</li>
<li>Sauspotje op een servet</li>
<li>Frituursnacks naast het sauspotje</li>
</ul>

<h2>Bitterballen</h2>
<ul>
<li>9 stuks per portie</li>
<li>Saus: <strong>mosterd</strong></li>
</ul>

<h2>Kaasballetjes</h2>
<ul>
<li>9 stuks per portie</li>
<li>Saus: <strong>currysaus</strong> (of variant)</li>
</ul>

<h2>Kipkrokantjes</h2>
<ul>
<li>9 stuks per portie</li>
<li>Saus: <strong>currysaus of mayonaise</strong></li>
</ul>

<h2>Mini-loempia's</h2>
<ul>
<li>9 stuks per portie</li>
<li>Saus: <strong>zoetzure saus</strong></li>
</ul>

<h2>Portie gemengd (warm)</h2>
<ul>
<li>6 kaasballetjes</li>
<li>6 bitterballen</li>
<li>4 kipkrokantjes</li>
<li>4 mini-loempia's</li>
<li>Erbij: <strong>3 sauzen</strong> (zoetzure, mayonaise, curry, …)</li>
</ul>
`.trim()
    },

    'tapas-spaghetti': {
      ...baseArticle,
      id: 'tapas-spaghetti',
      titel: 'Spaghetti',
      samenvatting: 'Rond bord met pasta, saus uit zak opwarmen op halve kracht, kaas en tabasco erbij.',
      tags: ['eten', 'pasta', 'spaghetti', 'warm'],
      synoniemen: ['spaghetti', 'pasta', 'bolognese'],
      body: `
<h2>Klaarmaken</h2>
<ul>
<li><strong>Rond bord</strong> vullen met pasta</li>
<li>Pasta <strong>even warm maken</strong></li>
<li>Saus uit zak opwarmen — <strong>niet op volle kracht!</strong> Anders wordt ze bol</li>
<li>Saus op de pasta doen en samen warm maken</li>
</ul>

<h2>Serveren</h2>
<ul>
<li>Apart <strong>potje vullen met kaas</strong></li>
<li><strong>Bestek + tabasco</strong> erbij</li>
</ul>
`.trim()
    },

    'tapas-pizza': {
      ...baseArticle,
      id: 'tapas-pizza',
      titel: 'Pizza',
      samenvatting: 'Oven voorverwarmen op 220°, 8 à 10 minuten bakken, op houten plank in 8 stukken snijden.',
      tags: ['eten', 'pizza', 'warm', 'oven'],
      synoniemen: ['pizza', 'oven'],
      body: `
<h2>Klaarmaken</h2>
<ul>
<li>Oven <strong>voorverwarmen op 220°C</strong></li>
<li><strong>8 à 10 minuten</strong> bakken</li>
</ul>

<h2>Serveren</h2>
<ul>
<li>Op een <strong>houten plank</strong></li>
<li>In <strong>8 stukken</strong> snijden</li>
<li>Met <strong>pikante olie</strong> erbij</li>
</ul>
`.trim()
    },

    'tapas-croque': {
      ...baseArticle,
      id: 'tapas-croque',
      titel: 'Croque',
      samenvatting: 'Twee croques uit de rooster, in driehoekjes snijden, mayonaise en ketchup in één potje.',
      tags: ['eten', 'croque', 'warm', 'lunch'],
      synoniemen: ['croque', 'croque monsieur', 'tosti'],
      body: `
<h2>Klaarmaken</h2>
<ul>
<li><strong>2 croques</strong> in de rooster (per portie)</li>
</ul>

<h2>Serveren</h2>
<ul>
<li>Elke croque in <strong>2 snijden (driehoekjes)</strong></li>
<li><strong>Mayonaise en ketchup</strong> samen in <strong>1 potje</strong></li>
</ul>
`.trim()
    }

  };

  try {
    for (const [id, art] of Object.entries(articles)) {
      console.log('Schrijven', id, '→', art.titel);
      await db.ref('content/artikels/' + id).set(art);
    }
    alert('Klaar. 5 tapas-artikels geïmporteerd onder categorie Recepten.');
  } catch (e) {
    console.error(e);
    alert('Fout: ' + (e.message || e.code));
  }
})();
