# Revue awwwards · Bienvenue chez vous · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site : un repas en « escales » sur fond nuit, une route verticale rouge qui relie les sections, des assiettes rondes cerclées et le téléphone en grand pour réserver (inchangée depuis la passe 1, REVISION-1 n'a pas touché au parti pris).

Scores /10 :
- Design 8 : palette nuit / rouge d'enseigne intacte, carte de visite recadrée sans icône jaune (histoire 390, hist-0), vignettes retirées sans trous de composition (carte 390, carte-0/1).
- Usabilité 8 : mur d'assiettes atteignable au clavier (`role="region"`, `tabindex=0`, nom accessible), téléphone et adresse au premier écran, canal e-mail signalé « à confirmer ».
- Créativité 7 : route, rideau rouge, 404 « Mauvais palier » ; rythme encore assez uniforme d'une page à l'autre (inchangé).
- Contenu 8 : toutes les phrases inventées de la passe 1 ont disparu, tous les faits recoupés avec `donnees.json` et `dossier.md`.
- Technique 8 : 0 erreur console, 0 requête en échec, 0 débordement, 0 violation axe sérieuse ou critique sur 10 cas, LCP mobile 1140 ms (accueil) et 2244 ms (carte), CLS ≤ 0,01 (QA-revue2).

## Vérification de REVISION-1 (une ligne par correction annoncée)
| id | annoncé | constaté | preuve |
|---|---|---|---|
| F1-1 | 4 phrases retirées | confirmé : 0 occurrence de « entre deux services », « début de chaque service », « Sonnez », « change la carte chaque mois », « octobre 2026 », « ouvre lui-même », « par e-mail » | grep des 5 pages de `dist/` |
| F1-2 | `.mur` focalisable | confirmé : `role="region"`, `aria-label="Assiettes du chef"`, `tabindex=0`, défilable à 390 px (scrollable: true) ; plus de `scrollable-region-focusable` | axe-core complet, accueil 390 |
| F1-3 | e-mail et téléphone « à confirmer » | confirmé : « Numéro et adresse e-mail à confirmer » et « (adresse à confirmer) » sur la réservation | extraction du texte visible |
| F2-1 | « Accords : B +30 €, C +40 € » en U+00A0 | confirmé : `Accords : B +30 €` sur les 4 formules, pas de coupure en 390 | od -c, carte m-03 |
| F2-2 | vignettes fausses retirées | confirmé : œuf parfait, filet de veau et dessert du moment sans vignette ; Box Bienvenue garde un plat à emporter, cohérent avec la légende | planche carte 390, `photos/index.json` |
| F2-3 | « Les saveurs du moment » | confirmé | texte carte |
| F2-4 | « Tarif à confirmer » | confirmé (mercredis) | texte carte |
| F2-5 | carte de visite recadrée | confirmé : plus d'icône jaune | capture histoire 390 hist-0 |
| F3-5 | « cuisine, salle et cave » | confirmé (la phrase répète deux fois « cuisine, salle et cave », voir F3-2 ci-dessous) | texte histoire |
| F2-6, F3-1 | renvoyés à la session mère | F2-6 : non reproduit (`.kyw-footer__note` calculé #55646a sur #f3f2ef, soit environ 5,6:1 ; axe ne signale plus `color-contrast` sur la 404). F3-1 : `landmark-no-duplicate-contentinfo` (moderate) toujours sur 5 pages, composant partagé | axe complet 10 cas |

## Findings

### F0 (bloquant) : aucun
### F1 (majeur) : aucun
### F2 (mineur) : aucun
### F3 (finition)
- **F3-1** `landmark-no-duplicate-contentinfo` (moderate, 1 nœud par page) : deux `<footer>` de premier niveau (pied du site et `kyw-footer`). Composant partagé, à signaler à la session mère ; pas de correction dans le site.
- **F3-2** `histoire.astro` : « Chef et propriétaire : cuisine, salle et cave. Le chef accueille ses convives, dresse chaque assiette et assure la cuisine, la salle et la cave. » répète deux fois la même triade. Garder une seule des deux phrases.
- **F3-3** `carte` : « Le menu change chaque semaine » (repas gourmand) : le dossier dit « repas gourmand hebdomadaire » avec un exemple daté du 05/11 au 12/11 ; la formule est défendable, à marquer illustrative si on veut une règle stricte. « Une table se prend en le réservant » (fin de carte) est une tournure bancale : « Réservez votre table. »
- **F3-4** Champ date de la réservation : placeholder du navigateur « mm/dd/yyyy » (locale du Chromium de test) ; sans gravité, le contrôle suit la langue de l'utilisateur.
- **F3-5** Report passe 1 maintenu : phrase d'horaires répétée 5 fois sur la réservation (WARN audit), crédit photo à ne pas nommer sans preuve (photographe cité au dossier, non affiché).

## Contrôles passés (preuves)
- Build : `QA-revue2.md` exit 0, 5 pages ; `dist/` (08:40) postérieur à REVISION-1 (08:40:15 pour le rapport, aucune source plus récente que `dist/`), captures du QA (08:47) postérieures au build, donc valides ; les captures ciblées de cette passe sont faites sur le `dist/` actuel.
- Axe complet (`axe.run()` sans filtre), 5 pages réelles dont `404.html`, 1440 et 390 px, défilement par pas de 300 px avant mesure : seule règle remontée `landmark-no-duplicate-contentinfo` (moderate). Aucune violation sérieuse ou critique.
- Console et requêtes : 0 erreur, 0 requête en échec sur les 10 cas. `scrollWidth` = fenêtre partout ; aucun élément hors fenêtre une fois l'accueil stabilisé (2 éléments hors fenêtre pendant l'animation d'entrée, 0 après 2,5 s, mesure dédiée). Cibles tactiles < 24 px : 0. Texte à l'opacité 0 après défilement : 0.
- Méta : 1 `h1`, `lang="fr"`, `noindex, nofollow` (conforme au prompt § 3.3), 1 JSON-LD, titres uniques, un seul logo `.kyw-footer__logo`, mention « Maquette KYW, certaines données sont illustratives » sur les 5 pages.
- Liens : 30 URL internes distinctes testées sur le serveur, toutes en 200, préfixe `/bienvenue-chez-vous/awwwards/` respecté ; réseaux, plan (OpenStreetMap), `tel:` et `mailto:` conformes à la passe 1.
- Faits recoupés : téléphone, adresse, horaires, prix 49/69/79/94 €, accords, Box 199/174/109 €, 2002/2016/2020, Salzinnes/avenue Cardinal Mercier, Port-en-Bessin, bougies, terrasse, parking, chèques cadeaux, commande 24 h : tous présents dans `dossier.md` ou `donnees.json`. Légendes des assiettes conformes au champ `sujet` de `photos/index.json`.
- Clavier, mouvement réduit et hover : repris du QA-revue2 (12 arrêts, aucun focus invisible, 0 texte masqué, skip link premier : faux positif connu).

## Ce qui est bien (à ne pas casser)
1. Hero à 1440 et 390 : assiette cerclée, route verticale, téléphone et horaires dans le premier écran.
2. Exactitude : plus aucune procédure ni fréquence inventée, incertitudes dites à l'écran (« à confirmer »).
3. Rideau rouge, 404 « Mauvais palier » et mobile réellement recomposé.

## Suite
Publiable en l'état. F3-1 et la leçon sur le pied de page partagé à la session mère ; F3-2 et F3-3 à reprendre si une passe de finition a lieu.
