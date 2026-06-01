# Wat Bram nog moet doen

Ik kan deze stappen niet voor jou uitvoeren (Firebase Console + GitHub UI). Loop deze lijst af, dan is alles operationeel.

> Update 01/06: foto's via Firebase Storage geschrapt (vereist Blaze-upgrade, doen we nu niet). Foto-upload is uit de admin verwijderd, alleen een foto-URL veld blijft. Stap 2b "Storage activeren" hieronder is dus niet meer nodig.
>
> Update 01/06 (later): hardgecodeerde "Bram"-vermeldingen weg. App is nu rol-gebaseerd: `info@sportico28.club` is de hoofd-admin (Office 365 mailbox van de bar), `bram.denyn@gmail.com` blijft admin als fallback zolang Bram het project doet. Er is één nieuwe stap **3b** bijgekomen: één keer inloggen met `info@sportico28.club` zodat dat adres ook in de whitelist komt.

## 1. Firebase: authorized domain toevoegen (verplicht)

Zonder dit weigert Firebase de magic link redirect en faalt elke login.

1. Ga naar https://console.firebase.google.com/project/pachanga-bar/authentication/settings
2. Sectie **Authorized domains**
3. Klik **Add domain**
4. Vul in: `sportico28.github.io`
5. Save

`localhost` en `pachanga-bar.firebaseapp.com` staan er al, voor lokaal testen.

## 2. Firebase: RTDB rules plakken (verplicht — opnieuw, want bijgewerkt)

De rules zijn op 1 juni 2026 bijgewerkt: `info@sportico28.club` heeft nu ook admin-rechten naast `bram.denyn@gmail.com`. Je moet ze dus **opnieuw plakken**.

1. Ga naar https://console.firebase.google.com/project/pachanga-bar/database/pachanga-bar-default-rtdb/rules
2. Vervang de hele inhoud van het rules-veld door de inhoud van `database.rules.json` (in deze repo)
3. Klik **Publish**

Wat de rules doen:
- Alleen ingelogde users kunnen lezen
- `info@sportico28.club` **of** `bram.denyn@gmail.com` kan de personeelslijst (`whitelist`) wijzigen en toegangsaanvragen goedkeuren of weigeren
- Iedereen die ingelogd is kan een aanvraag indienen voor zijn eigen e-mailadres
- `voorstellen` en `logboek` zijn open voor alle ingelogde users (voor later)

Als jij ooit weggaat: laat alleen `info@sportico28.club` staan in de rules. Die mailbox blijft bij Pachanga, dus je opvolger heeft automatisch admin-rechten.

## 3. Eerste login (al gebeurd op 1 juni)

Je bent al ingelogd als `bram.denyn@gmail.com` en je staat als admin in de whitelist. Voorbeeldcontent is geladen. Niets meer te doen hier.

## 3b. `info@sportico28.club` ook in de whitelist krijgen (nieuw, verplicht)

Dit is een rol-mailbox: blijft bij Pachanga als jij weggaat. Eén keer inloggen volstaat.

1. Open https://sportico28.github.io/pachanga-bar/ in een **incognito-venster** of **andere browser** (zodat je niet uitgelogd raakt in je gewone sessie)
2. Vul `info@sportico28.club` in, klik **Stuur magic link**
3. Open de Outlook van `info@sportico28.club`, klik de magic link
4. Je belandt terug op de app met scherm "Nog geen toegang"
5. Vul naam ("Bar28 admin" of "Beheerder") en reden ("rol-account") in, klik **Aanvraag versturen**
6. Ga terug naar je **gewone** sessie (waar je ingelogd bent als `bram.denyn@gmail.com`)
7. Klik op het tandwiel, je ziet een **1** bij de Aanvragen-tab → klik die open
8. Klik op **Als admin** bij de aanvraag van `info@sportico28.club`
9. Klaar. Vanaf nu kan iemand die op de Pachanga Outlook zit, inloggen op de app als admin.

## Admin-paneel gebruiken (tandwiel rechtsboven)

Vijf tabs:
- **Artikels**: toevoegen, bewerken, verwijderen. Checklist-optie voor opstart/sluit lijsten. Foto-URL plakken (bv. een publieke link uit Google Drive of een hosted afbeelding).
- **Categorieën**: toevoegen, bewerken, volgorde bepalen.
- **Keywords**: woorden die in artikels oplichten en klikbaar worden (bv. Jigger, Groot glas, FIFO). Met uitleg en foto-URL. Onderaan staan voorstellen van personeel.
- **Aanvragen**: toegangsaanvragen goedkeuren of weigeren.
- **Personeel**: wie heeft toegang, rol, toegang intrekken.

Alles wat je opslaat is **meteen live** voor alle personeel. Geen deploy nodig.

## Keyword-highlighting

In artikels worden bekende woorden rood onderstreept. Personeel klikt erop en krijgt een popup met uitleg + foto. Onderaan elk artikel staat een knop "Een woord verduidelijken?" waarmee personeel kan voorstellen om een woord toe te voegen. Die voorstellen verschijnen in jouw Keywords-tab.

## 4. Personeel uitnodigen

Twee manieren:

**A. Wacht tot ze zelf aanvragen.**
1. Personeelslid bezoekt de URL, vult zijn email in, klikt magic link
2. Logt in, ziet "Nog geen toegang" scherm met aanvraagformulier
3. Vult naam + reden in, verstuurt
4. Jij krijgt notificatie (rode badge op tandwiel)
5. Klikt op tandwiel, ziet aanvraag, klikt "Goedkeuren als personeel" of "Als admin"
6. Betrokkene refresht de site → toegang

**B. Pre-emptive toevoegen (later via admin UI).**
Voor nu nog niet ingebouwd. Voor MVP: laat ze zelf aanvragen.

## 5. GitHub: secret scanning alert dismissen

De Firebase API key is correct publiek (zie eerdere uitleg), maar GitHub stuurt automatisch waarschuwingen. Om die te stoppen:

1. Ga naar https://github.com/Sportico28/pachanga-bar/security/secret-scanning
2. Klik op de "Google API Key" alert
3. **Close as** → kies **Used in tests** of **False positive** (technisch is "Used in tests" niet helemaal correct, maar het sluit de alert. "False positive" is preciezer)
4. Klik **Close alert**

Voor de toekomst: als je een nieuwe Firebase project sleutel toevoegt, krijg je opnieuw een alert. Telkens dismissen.

## 6. MGPC RTDB rules nakijken (optioneel maar aangeraden)

Firebase stuurde een mail dat `mgpc-2026-default-rtdb` open lees-rechten heeft. Niet acuut want MGPC bevat geen privégegevens, maar wel proper zetten.

1. Ga naar https://console.firebase.google.com/project/mgpc-2026/database/mgpc-2026-default-rtdb/rules
2. Bekijk de huidige rules
3. Als ze zoiets zijn als `".read": true` of `.read": "now < ..."`, vervang door:

```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

Dit vereist dat users ingelogd zijn (Summer Open en MGPC apps loggen anonymous in via `firebase.auth().signInAnonymously()`, dus dat blijft werken).

Daarna: **Publish**. De waarschuwingsmail stopt na de volgende audit.

## 7. Test de hele flow

Na stap 1-3:
- [ ] Login werkt (geen errors in console)
- [ ] Je blijft ingelogd na browser sluiten + heropenen
- [ ] Logo en kleuren kloppen
- [ ] Tandwiel-icoon verschijnt rechtsboven
- [ ] Klik tandwiel → admin paneel laadt
- [ ] Test access-request: log in op een ander toestel met een ander emailadres → "Nog geen toegang" scherm → vul aanvraag in → check op je admin scherm
- [ ] Goedkeuren werkt: persoon krijgt toegang na refresh

## Klaar?

Stuur ping wanneer alles werkt. Dan plannen we volgende stappen:
- Meer content (Overname + Sluit checklist, recepten, tapas, schoonmaak)
- Takenlogboek module (verveling-taken met "laatst gedaan op")
- Voorstellen-module (knop op elk artikel om aanvulling te sturen)
- Eventueel: pre-uitnodigen van personeel via emailadres
