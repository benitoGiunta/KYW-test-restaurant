# Revue portfolio · INCORЯECT (Incorrect, Namur) · passe 3
Verdict : A_CORRIGER (0 F0, 0 F1, 1 F2, 4 F3)

Lecture en une ligne de l'idée du site : une affiche de concert punk collée au mur (aplats rouge, jaune acide, vert sapin, bords en dents de scie, titres XXL étirés), avec un plat dessiné couche par couche dont le prix « claque » en fin de défilement.

Preuves : `QA-revue3.md` n'existe pas (l'agent captures n'a rien déposé) ; mesures faites ici sur `dist/` (aucun fichier de `src/` plus récent que le build, `dist/` non rebuildé pour ne pas le modifier ; REVISION-2 annonce un build OK). Serveur de contrôle port 4630 (PID noté, arrêté). Script maison unique (axe-core complet de `node_modules`, console, requêtes, débordement des enfants de grilles, mots de titres coupés) sur 6 pages (dont `/404.html`) × 360, 390, 768, 1024, 1280, 1440, 1920 px = 42 cas ; script ciblé 9 largeurs (360 à 1920) sur étapes, prix, réservation, « Suppléments » ; captures `et-*`, `em-*`, `res1024` (scratchpad `inc-p3/`) ; LCP/CLS mobile 390 px sous CPU x4 + réseau lent (CDP).

## Vérification des corrections annoncées (REVISION-2.md)
| id | verdict | preuve |
|---|---|---|
| N-1 (F1) étapes home | confirmé | 9 largeurs (360 à 1920) : 0 `li` avec `scrollWidth > clientWidth`, 0 `strong` hors de sa carte ; captures `et-768/1024/1440` : « CHOISISSEZ », « PASSEZ LA PORTE » entiers, cartes pleines, une colonne par liste |
| N-2 (F1) « Ça s'empile » 768 | confirmé | `.empile__prix` mesuré à chaque position du pin : droite max 741 pour 768 (848/900, 947/1024, 1338/1440), `.empile__pile` 744/768 ; captures `em-768-mid/fin` : « 14,50 € », plat, légende et liste entiers |
| N-3 (F2) réservation 1024 | confirmé | `Range.getClientRects` : « Marcelle » sur 1 ligne à 768, 1024, 1440 (0 mot coupé, 0 étiquette hors cadre) ; capture `res1024` : « RUE HAUTE MARCELLE » tient dans le carré jaune |
| F3-6 « Suppléments » 360 | confirmé | droite à 336 pour 360 (366/390), 2 lignes |
| F3-1 à F3-5 | non traités, constat inchangé | voir ci-dessous |

Mesures sans écart : axe complet (toutes règles) 0 violation sur les 42 cas ; 0 erreur console, 0 requête en échec ; `scrollWidth` de page = largeur de fenêtre partout ; 0 enfant de grille hors fenêtre sauf `galerie__carte` en 360 et 390 (rail à défilement horizontal voulu, `scroll-snap`) ; liens internes, `404.html`, `sitemap-index.xml` en 200 ; liens externes conformes au dossier (Barestho, Instagram, Facebook, `www.incorrect.pizza`, `tel:+3281138561`) ; `lang="fr"`, un `h1`, `noindex` (nofollow, conforme au prompt § 3.3), mention « Maquette KYW, certaines données sont illustratives » et un seul `.kyw-footer__logo` sur les 6 pages ; LCP mobile 1008 ms (home) et 932 ms (carte), CLS 0 ; faux positif écarté : « DEBORD: Définition / Les plats » = `h2.sr-only` de 1 × 1 px.

## Scores /10
- Design 8,5 : les trois compositions cassées en tablette et à 1440 sont réparées, identité intacte (`et-*`, `em-*`).
- Usabilité 8 : prix signature visible à toutes les largeurs, menu et réservation OK, 0 débordement.
- Créativité 8,5 : plat en cinq couches, prix qui claque, pastille à l'heure de Namur.
- Contenu 7,5 : faits conformes ; restent deux descripteurs de couches sans source (F2-1) et des formats d'heures mélangés.
- Technique 8,5 : axe 0, console 0, CLS 0, LCP ~1 s ; JSON-LD sans horaires.

## Findings (par gravité)

### F2 (mineur, bloque PUBLIABLE : « 0 invention non marquée »)
**F2-1 · Descripteurs de couches du plat sans source (ex F3-2).** `src/data/site.ts:102-103` : « maison, grillé » (pain au levain) et « la base, bien rose » (crème de betterave) sont rendus sur la home (`grep` : 1 occurrence chacun) ; `donnees.json` et `dossier.md` ne contiennent ni « grillé » (hors une occurrence étrangère au plat), ni « bien rose ». Le reste de la couche (crème de betterave, siphon de chèvre fumé, avruga, poudre d'olive, fleurs de fenouil conservées) est sourcé.
Correction : mettre `detail` à `null`/vide pour les couches 01 et 02 (ou ne garder que « fleurs conservées », « envoyé au siphon », « et poudre d'olive », sourcés) ; vérifier que le composant ne rend rien si `detail` est absent. L'« huile d'aneth » de la couche 05 est à confirmer de la même façon (`grep -i aneth` sur le dossier) sinon la retirer.

### F3 (finition)
- F3-1 (inchangé) Trois formats d'heures : « 18h30 » (5 occurrences home et réservation), « 18 h 30 » (2 à 3), « 18:30 » (15 par page, pied). Choisir « 18 h 30 » partout.
- F3-3 (inchangé) Libellé accessible « Dwight Schrute, le Dwight Schrute dessiné en cinq couches » (répétition du nom).
- F3-4 (inchangé) `carte/` : « Rouge du moment au verre » avec « 6 / 6,50 / 7,50 » en description et « 6 € » en prix ; « (version végé 20,50) » sans « € » (Poti Poney).
- F3-5 (inchangé) JSON-LD `Restaurant` présent mais sans `openingHoursSpecification` (`grep openingHours` : 0 sur les 5 pages).

## Ce qui est bien (à ne pas casser)
1. Hygiène : axe 0 sur 42 cas, 0 console, CLS 0, liens en 200, noindex, mention maquette, un seul logo KYW.
2. Les composants en conteneur (`cqi`, `minmax(0, 1fr)`) : étapes, pile, plan et titres tiennent de 360 à 1920 px sans mot coupé.
3. L'identité (palette, dents de scie, plat en couches, prix qui claque) et un texte sans filler ni procédure inventée.
