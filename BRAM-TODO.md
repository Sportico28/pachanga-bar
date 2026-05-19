# Wat Bram nog moet doen

Ik kan deze stappen niet voor jou uitvoeren (Firebase Console + GitHub UI). Loop deze lijst af, dan is alles operationeel.

## 1. Firebase: authorized domain toevoegen (verplicht)

Zonder dit weigert Firebase de magic link redirect en faalt elke login.

1. Ga naar https://console.firebase.google.com/project/pachanga-bar/authentication/settings
2. Sectie **Authorized domains**
3. Klik **Add domain**
4. Vul in: `sportico28.github.io`
5. Save

`localhost` en `pachanga-bar.firebaseapp.com` staan er al, voor lokaal testen.

## 2. Firebase: RTDB rules plakken (verplicht)

Zonder strikte rules krijg je waarschuwingsmails van Google en is je data publiek.

1. Ga naar https://console.firebase.google.com/project/pachanga-bar/database/pachanga-bar-default-rtdb/rules
2. Vervang de hele inhoud van het rules-veld door de inhoud van `database.rules.json` (in deze repo)
3. Klik **Publish**

Wat de rules doen:
- Alleen ingelogde users kunnen lezen
- Alleen `bram.denyn@gmail.com` kan de personeelslijst (`whitelist`) wijzigen en toegangsaanvragen (`access-requests`) goedkeuren of weigeren
- Iedereen die ingelogd is kan een aanvraag indienen voor zijn eigen e-mailadres
- `voorstellen` en `logboek` zijn open voor alle ingelogde users (voor later)

Extra admins toevoegen aan rules: kan later, vereist iets ingewikkelder rules met UID-mapping. Voorlopig ben jij hard-coded de enige admin.

## 3. Eerste login als bootstrap-admin (verplicht)

1. Open https://sportico28.github.io/pachanga-bar/
2. Vul `bram.denyn@gmail.com` in (geen ander adres, want dat is hardcoded als bootstrap)
3. Check je inbox, klik de magic link
4. Je belandt automatisch terug op de site en wordt ingelogd
5. De client detecteert dat de whitelist leeg is en je `bram.denyn@gmail.com` bent, dus je krijgt automatisch een whitelist entry met rol `admin`
6. Je ziet het tandwiel-icoon rechtsboven (admin paneel)

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
