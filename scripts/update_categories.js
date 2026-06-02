// ============================================================
//  Bar28 — Categorieën hernoemen, herordenen en uitbreiden
// ============================================================
//
//  Gebruik (één keer, in browser console van de live app, ingelogd als admin):
//   fetch('https://raw.githubusercontent.com/Sportico28/pachanga-bar/main/scripts/update_categories.js')
//     .then(r=>r.text()).then(eval)
//
//  Wat het doet:
//   - Hernoemt bestaande categorieën (slugs blijven, dus artikels blijven gekoppeld):
//       openen-sluiten   → naam "Checklists"
//       aanvulling       → naam "Stock & aanvullen"
//   - Recepten, Schoonmaak, Klantsituaties behouden hun naam
//   - Voegt nieuwe categorie 'werkwijzes' toe (Werkwijzes)
//   - Zet nieuwe volgorde voor alle categorieën:
//       1. Checklists  2. Recepten  3. Stock & aanvullen
//       4. Schoonmaak  5. Werkwijzes  6. Klantsituaties
//   - "Alle" zit niet in de DB (is een UI-chip), staat na deze update achteraan
// ============================================================

(async () => {
  if (typeof db === 'undefined' || typeof currentUser === 'undefined' || !currentUser) {
    alert('Niet ingelogd of db niet beschikbaar.');
    return;
  }

  const cats = {
    c1: { id: 'c1', slug: 'recepten',        naam_nl: 'Recepten',           naam_en: 'Recipes',     volgorde: 2 },
    c2: { id: 'c2', slug: 'openen-sluiten',  naam_nl: 'Checklists',         naam_en: 'Checklists',  volgorde: 1 },
    c3: { id: 'c3', slug: 'aanvulling',      naam_nl: 'Stock & aanvullen',  naam_en: 'Stock',       volgorde: 3 },
    c4: { id: 'c4', slug: 'schoonmaak',      naam_nl: 'Schoonmaak',         naam_en: 'Cleaning',    volgorde: 4 },
    c5: { id: 'c5', slug: 'klantsituaties',  naam_nl: 'Klantsituaties',     naam_en: 'Customer',    volgorde: 6 },
    c6: { id: 'c6', slug: 'werkwijzes',      naam_nl: 'Werkwijzes',         naam_en: 'How to',      volgorde: 5 }
  };

  try {
    for (const [id, data] of Object.entries(cats)) {
      console.log('Schrijven', id, '→', data.naam_nl, '(volgorde', data.volgorde + ')');
      await db.ref('content/categorieen/' + id).set(data);
    }
    alert('Klaar. 6 categorieën bijgewerkt. Refresh de app.');
  } catch (e) {
    console.error(e);
    alert('Fout: ' + (e.message || e.code));
  }
})();
