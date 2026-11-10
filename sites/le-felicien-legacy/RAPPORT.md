# Le Félicien · variante legacy · 10/11/2026

## 1. Approche conservée vs site d'origine

| | Origine | Legacy |
|---|---|---|
| Type | multi-pages (accueil, carte, suggestions, contact) | idem, 4 routes gardées |
| Hero | champ de logo | photo de l'assiette, titre à la base sur voile brun (Ledge) |
| Nav | logo + liens, carrousel de 2 logos | masthead centré, Popover sous 72 rem ; « Jobs » déplacé au pied (dropped, même destination) |
| Carte | liste et PDF | 68 lignes en onglets (liens ancre sans script) |
| Animations | carrousel | une signature (l'assiette se pose), un reveal (bande du midi) |
| Réservation | lien Tablebooker | lien conservé, pas d'iframe |

Dérogations : waive 8 (ordre du client gardé), 59 (écart de 59 px = pied KYW imposé), 77 (contact : tableau d'horaires pleine largeur).

## 2. Axes traités (AUDIT.md)
Coût faible (meta description, états, tailles de boutons, apostrophes) : fait. Moyen (photo en tête, hiérarchie, carte en lignes titre/prix) : fait. Non traité : photos de salle et d'équipe (absentes).

## 3. Résultat sloplint
Before : 35 FAIL, 16 REFLEX. After : 0 FAIL, 0 REFLEX, 6 WAIVED, 2 WARN (77 « 4 sections » sur la carte, contenu = menu ; kept non comparé car pages d'origine non rendues), 2 NOTE (58 : carte 100 mots, accueil 90). Render : 4 URL, 20 captures `.hallmark/shots/`. Build : 5 pages, noindex et `kyw-signature` présents sur les 5.

## 4. Reviews
Hero review `self` : ship. Finish review `self` : 2 findings, 2 résolus (bande du midi à 41 % de large passée en deux colonnes ; insécables avant « : »). QA captures : 0 erreur console, 0 requête en échec, LCP 508/884 ms, CLS ≤ 0,04, axe 0 (accueil, carte). Faux positifs notés : « focus invisible » sur 4 liens de nav (captures k-01 à k-04 : anneau visible), 404 sans titre (réponse brute du serveur). Ce que l'ancien site faisait mieux : un logo plus présent en ouverture.

## 5. Placeholders et faits manquants
| Élément | Où | Valeur | À remplacer par |
|---|---|---|---|
| Photo de salle | accueil, horaires (Unsplash, Dogancan Ozturan) | photo libre légendée | photo réelle de la salle |
| Photo de l'assiette | héros | photo client 2020, floue | photo récente |
| Illustration de carte | accueil | couverture de la carte d'automne | inchangé si validée |
Pas de slot `.fill`. Horaires de service précis (pas de statut ouvert/fermé) : « aujourd'hui » suit le jour civil de Bruxelles.

## 6. Demande de matériel
Hero 1920x1080 (assiette récente, lumière naturelle) ; salle 4:3 au moins 1600 px ; équipe. La photo qui améliorerait le plus la page : une photo de la salle ou du comptoir en service, en tête d'accueil.

## 7. Leçons structurelles
Waiver sloplint : trois champs séparés par « · » (guard evidence puis raison), sinon « malformed ». `.hallmark/log.json` : l'entrée écrite à la main en phase 1 n'a ni `project` ni `date`, utiliser `theme.mjs log`. Remplacement en masse des insécables : exclure le JS (ternaires).
