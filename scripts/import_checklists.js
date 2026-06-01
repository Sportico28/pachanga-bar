// ============================================================
//  Bar28 — Checklists importeren in Firebase RTDB
// ============================================================
//
//  Gebruik (één keer):
//   1. Open https://sportico28.github.io/pachanga-bar/ in je browser
//   2. Log in als admin
//   3. Open Developer Tools → Console (Cmd+Option+J in Chrome/Arc/Edge)
//   4. Kopieer dit hele bestand en plak in de console, druk Enter
//   5. Wacht op de "Import klaar"-popup
//
//  Wat het doet:
//   - Verwijdert de oude korte 'a2' (opstart)
//   - Schrijft drie volledige checklists:
//       /content/artikels/checklist-opstart
//       /content/artikels/checklist-overname
//       /content/artikels/checklist-sluit
//   - Categorie: 'openen-sluiten' (bestaand)
//
//  Bron: Bar 28 shiften Google Sheet (mei 2026 export).
// ============================================================

(async () => {
  if (typeof db === 'undefined') {
    alert('Niet ingelogd of db niet beschikbaar. Refresh de pagina en log in.');
    return;
  }
  if (typeof currentUser === 'undefined' || !currentUser) {
    alert('Niet ingelogd.');
    return;
  }

  const date = new Date().toLocaleDateString('nl-BE');
  const author = currentUser.email;
  const cat = 'openen-sluiten';

  const opstart = {
    id: 'checklist-opstart',
    titel: 'Checklist opstart',
    categorie: cat,
    samenvatting: 'Doorloop deze lijst aan het begin van elke vroege of lange shift.',
    tags: ['opstart', 'openen', 'ochtend', 'vroege shift'],
    synoniemen: ['openen', 'opstart', 'ochtend', 'vroege shift', 'starten'],
    isChecklist: true,
    hero_image: null,
    body: null,
    laatst_gewijzigd: date,
    auteur: author,
    checklist: {
      basis: [
        'Alarm uit',
        'Inklokken AAPI',
        'Alle lichten aan (kleedkamers en trappenhal niet overdag)',
        'Verwarming aan indien koud (winter)',
        'Duvel licht, Vedett licht, LED strip/bak aan',
        'TV aan: Presentatie Pachanga (bron: onbekend)',
        'Muziek aan (Afspeellijst Pachanga overdag of weekend)',
        'Koffiemachine opstarten',
        'Aanzetten tassenverwarmer',
        'Bar PC opstarten (1: kassa, 2: clubplanner, 3: witte kassa)',
        'Startkassa maken',
        'Controleren op vuil (tafels, toog, vloer kuisen waar nodig)',
        'Toiletten checken: alles aangevuld + aanrecht proper + vuilbakken leeg',
        'Kleedkamers: alles proper + ramen sluiten + verwarming aan'
      ],
      zouOk: [
        'Binnenhal: overal eens rondgaan en rommel opruimen (papiertjes, flesjes, ballen, verloren voorwerpen) + alles proper',
        'Buitenvelden: overal eens rondgaan en rommel opruimen (papiertjes, flesjes, ballen, verloren voorwerpen) + alles proper',
        'Vettige vingers/plekken weg op ramen en deuren',
        'Terras netjes (alle tafels en stoelen op hun plaats + proper)',
        'Asbak aan de inkom proper (peuken weg + vuilbak leegmaken)',
        'Droogkast checken en aanzetten indien nodig'
      ]
    }
  };

  const overname = {
    id: 'checklist-overname',
    titel: 'Checklist overname (18u doordeweeks · 15u weekend)',
    categorie: cat,
    samenvatting: 'Doorloop deze lijst wanneer je een shift overneemt. Doordeweeks om 18u00, in het weekend om 15u00.',
    tags: ['overname', 'shift', 'wissel'],
    synoniemen: ['overname', '18u', '15u', 'wissel', 'late shift', 'shift overnemen'],
    isChecklist: true,
    hero_image: null,
    body: null,
    laatst_gewijzigd: date,
    auteur: author,
    checklist: {
      basis: [
        'Inklokken AAPI',
        'Lichten bar dimmen',
        'Lichten kleedkamers en trappenhal aan',
        'Controleren op vuil (tafels, toog, vloer kuisen waar nodig)',
        'Kaarsjes op de tafels (winter)',
        'Vettige vingers/plekken weg op ramen en deuren',
        'Terras netjes (alle tafels en stoelen op hun plaats + proper)',
        'Toiletten checken: alles aangevuld + aanrecht proper + vuilbakken leeg',
        'Binnenhal: overal eens rondgaan en rommel opruimen (papiertjes, flesjes, ballen, verloren voorwerpen) + alles proper',
        'Buitenvelden: overal eens rondgaan en rommel opruimen (papiertjes, flesjes, ballen, verloren voorwerpen) + alles proper',
        'Asbak aan de inkom proper (peuken weg + vuilbak leegmaken)',
        'Droogkast checken en aanzetten indien nodig',
        'Leeggoed sorteren',
        'Afwasbakken verversen indien nodig'
      ],
      zouOk: [
        'Alles van checklist opstart nog ok?'
      ]
    }
  };

  const sluit = {
    id: 'checklist-sluit',
    titel: 'Checklist sluit',
    categorie: cat,
    samenvatting: 'Doorloop deze lijst op het einde van de avond, voor je de deur achter je dichttrekt.',
    tags: ['sluit', 'sluiten', 'afsluit', 'einde shift'],
    synoniemen: ['sluiten', 'sluit', 'afsluit', 'einde shift', 'avond', 'late shift'],
    isChecklist: true,
    hero_image: null,
    body: null,
    laatst_gewijzigd: date,
    auteur: author,
    checklist: {
      basis: [
        'Alle lichten van alle velden uit (indien manueel aangezet)',
        'Croque machine uit + proper',
        'Frietketel uit + proper',
        'Oven uit + proper',
        'Controleren back-up ijszakken in vriezer en bijmaken indien nodig en mogelijk (zomer)',
        'Keuken proper',
        'Kleedkamers proper maken (water op de vloer wegkeren) en ramen met hartjes open zetten',
        'Maandag, donderdag en zondag: stoelen op de tafels, leeggoed bakken omhoog, vuilbakken omhoog (ook in de keuken) voor de kuisploeg',
        'Vuilbakken leegmaken en nieuwe zakken steken waar nodig + afkuisen',
        'Volledige toog en werkgerief helemaal proper',
        'Afwasbakken leeg en proper',
        'Bak met ijs leeg en proper',
        'Koffiemachine reinigen en melk in de ijskast (frigo naast koffiemachine aan laten staan)',
        'Uitzetten tassenverwarmer',
        'Koffie hoekje proper',
        'Vloer vegen waar nodig',
        'Eindkassa maken',
        'Bar PC afsluiten',
        'ALLE deuren vast (grote deur in de hal, leeggoed, schuifdeur, ...)',
        'Muziek uit',
        'Duvel licht, Vedett licht, LED strip/bak uit',
        'TV uit (knopje onderaan)',
        'Uitklokken AAPI',
        'Alarm aan',
        'Voordeur vast',
        'Sleutel terugleggen in sleutelbakje'
      ],
      zouOk: [
        'Sleutel van het ballenkot op z\'n plaats',
        'Van elk soort vat 1 in de koelcel (voorgekoeld)',
        'Deuren van frigo\'s, koelcel en vriezers dicht',
        'Frigo aanvullen waar nodig'
      ]
    }
  };

  try {
    console.log('Verwijderen oude opstart-stub (a2)...');
    await db.ref('content/artikels/a2').remove();
    console.log('Schrijven checklist-opstart...');
    await db.ref('content/artikels/checklist-opstart').set(opstart);
    console.log('Schrijven checklist-overname...');
    await db.ref('content/artikels/checklist-overname').set(overname);
    console.log('Schrijven checklist-sluit...');
    await db.ref('content/artikels/checklist-sluit').set(sluit);
    alert('Klaar. 3 checklists geïmporteerd. Refresh de app om ze te zien.');
  } catch (e) {
    console.error(e);
    alert('Import mislukt: ' + (e.message || e.code));
  }
})();
