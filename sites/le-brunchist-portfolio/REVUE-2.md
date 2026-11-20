# Revue portfolio · Le Brunchist · passe 2
Verdict : A_CORRIGER (0 F0, 1 F1, 3 F2, 5 F3)

Lecture en une ligne de l'idée du site : une journée de brunch en frise horaire (9h30 à 15h30) dont le ciel, la couleur et l'horloge suivent l'heure du visiteur, une page par moment de la journée.

Contexte : dist (01:27) postérieur à src (01:24), QA-revue2.md (01:35) postérieur au dist : réutilisé (accueil, carte, 404 brute). Pages non capturées par le QA (histoire, brunch, reservation, 404.html réelle) : captures et mesures faites ici. Serveur propre port 4837 (PID 380, arrêté). Scripts maison dans le scratchpad : axe-core de node_modules + console + requêtes + `Range` contre fenêtre + cibles + balises, 6 pages x 5 largeurs (320, 390, 768, 1024, 1440, molette, fuseau America/Los_Angeles) ; horloge simulée (`page.clock`, Europe/Brussels) sur 5 instants x 3 largeurs ; captures de 4 pages x 2 largeurs (planches `rs2-pl-*.png`).

## Vérification des corrections annoncées (REVISION-1.md)
| id | verdict | preuve |
|---|---|---|
| F1-1 galerie | OK à 1440 et 390 | `offsetWidth` des 3 figures : 408 x 272 (1440), 357 x 238 (390) ; planche histoire. 768 et 1024 non remesurés (la révision donne 206 et 283) |
| F1-2 titre | OK | `<title>` : « Le Brunchist \| Café-brunch à Namur » ; 0 « bistronom » dans le dist |
| F2-1 horaires inventés | OK | puces « repère illustratif » visibles (planche accueil), « La maison ferme à 15h30 », 0 « cuisine ferme » |
| F2-2 « deux chefs » | OK | 0 « chefs » dans le dist |
| F2-3 fuseau | **PARTIEL, voir F2-1 ci-dessous** | badge et jour en heure de Bruxelles, mais horloge affichée, ciel et loader restent en heure locale |
| F2-4 libellé | OK | `<dt>Service</dt>`, 0 « Ouvert< » |
| F2-5 carte répétée | **PARTIEL, voir F2-2** | listes de bas de page retirées ; 2 plats restent dits deux fois (WARN audit) |
| F2-6 chapeaux | OK (7 sur 14 retirés, 4 restent : histoire 1, reservation 1, brunch 2) | grep `class="chapeau` par page ; accueil, carte, 404 : 0 |
| F2-7 axe aria-prohibited | OK | axe : 0 violation sur les 30 cas (6 pages x 5 largeurs) |
| F2-8 footers | OK | 1 `<footer>` par page, 0 `landmark-no-duplicate-contentinfo` |
| F2-9 « de Le » | OK | 0 « de Le » dans le dist |
| F3-2 Wendy | OK | 0 « Sajid » |
| F3-1, F3-3, F3-4 | non traités (annoncé) | voir F3 |

Mesures de la passe : 0 erreur console, 0 requête en échec, 0 image cassée, 0 violation axe (30 cas), h1 unique, `lang="fr"`, `noindex` (index et 404.html), mention KYW et 1 logo (`img[src*=kyw-signature]`) sur chaque page, JSON-LD `Restaurant` avec `openingHoursSpecification`, liens internes (curl) tous 200, `tel:` et réseaux conformes à donnees.json ; LCP mobile 1,16 à 1,34 s, CLS ≤ 0,014 (QA) ; 573 Ko l'accueil.

## Scores /10
- Design 7,5 : galerie d'histoire réparée, concept intact (planches histoire, brunch) ; écarts vides entre sections et deux médaillons mal nommés.
- Usabilité 7 : navigation et frise stables ; mais 3 px de défilement horizontal mobile hors service (F1-1) et flèches de jour de 15 px de large à 768.
- Créativité 8 : horloge, ciel, médaillons circulaires inchangés.
- Contenu 7 : faits exacts (adresse, +32 474 06 92 27, horaires, réseaux), repères marqués illustratifs ; légendes de médaillons et procédure d'appel déduites restent.
- Technique 7 : build OK, 0 erreur, axe propre ; retranché : débordement horizontal mobile selon l'heure et heure locale non corrigée.

## Findings (par gravité)

### F1 majeur
- **F1-1 · Débordement horizontal de 3 à 4 px sur mobile dès que l'heure de Bruxelles est hors plage de la journée** (`src/motion/journee.ts:99-103`, astre `[data-astre]` / `[data-astre-orbite]`, orbite à angle limité par `PLAGE.fin`). Mesure : Europe/Brussels, horloge simulée, mercredi 09:30 et 12:00 : `scrollWidth` = 390 (320 à 320) ; mercredi 15:45, 17:00 et 22:30 : 393 à 390 px et 324 à 320 px (stable, apparaît après le premier pas de molette, `main.scrollWidth` = 393) ; 1440 : 1440 dans tous les cas. Reproduit aussi avec un navigateur en America/Los_Angeles (horloge locale 18:40). Les captures et mesures de la revue 1 et du QA (sandbox UTC, 01:14 à 02:40, astre au début de plage) ne pouvaient pas le voir. Le site est donc décalé de 3 px pour un visiteur mobile le soir, le lundi, le mardi et avant 9h30 (l'essentiel des heures). Correction : `overflow-x: clip` sur `[data-astre]` ou sur `main`, ou borner l'orbite dans la boîte ; re-mesurer `scrollWidth` à 320 et 390 avec l'horloge à 15:45, 17:00 et 22:30.

### F2 mineurs
- **F2-1 · F2-3 annoncé corrigé mais l'horloge, le ciel et le loader restent en heure du navigateur** (`motion/journee.ts:99-100` astre, `:126-129` horloge `hh:mm` et secondes, `:218-224` bouton « Il est HHhMM : aller au moment présent », `motion/setup.ts:10-11` loader). Preuve : même instant, trois navigateurs, horloge affichée `Europe/Brussels` 03:40, `UTC` 02:40, `America/Los_Angeles` 18:40, alors que le badge dit l'état de Bruxelles. La révision annonçait « horloge cohérente avec Bruxelles » : faux pour l'horloge visible. Correction : remplacer les 4 `new Date()` restants par `maintenantBxl()` (ajouter les secondes) et re-mesurer avec trois fuseaux.
- **F2-2 · F2-5 partiellement corrigé** : sur l'accueil et sur la carte, « Œufs brouillés 10 € » (moments 11h et 12h30, `data/site.ts:161,167`) et « Jus frais pressé 5 € » (9h30 et 14h30, `site.ts:155,173`) figurent deux fois ; `audit.mjs` : 4 WARN « phrase répétée 2 fois » (QA-revue2.md). Garder chaque plat à un seul moment ou varier (ex. jus à 9h30 seulement).
- **F2-3 · Flèches « Jour précédent / Jour suivant » de 15 x 44 px à 768 px** (accueil et réservation, mesure `getBoundingClientRect` : 15 de largeur pour 24 minimum, absent de la revue 1 qui ne mesurait que 1440 et 390 ; visibles au centre de la planche réservation 1440 à gauche et à droite de « Mercredi (Aujourd'hui) »). Élargir à 24 px au moins (padding) entre 600 et 1100 px.

### F3 finition
- **F3-1** (reste) deux avis Google en anglais sans `lang="en"` : 0 `lang="en"` dans `histoire/index.html`. Ajouter l'attribut sur les deux citations.
- **F3-2** (reste, ex F3-3) `/brunch/` : titre « Rondes, vues du dessus » et médaillons « Fruits frais », « Café au lait », « Miel » (`pages/brunch.astro:9-12`, `pages/index.astro:15-16`) nomment des plats que le dossier ne cite pas ; « Granola maison » est bien cité. Neutraliser les trois légendes (« Ambiance de la table, photo illustrative »).
- **F3-3** (reste, ex F3-4) mobile : la rangée de puces horaires du hero défile horizontalement sous le bord (puce « 12h30 Le sal… » coupée, `.chip` à `right` 416 et 579 pour 390) sans indice : ajouter un fondu de bord.
- **F3-4** chapeaux restants (histoire, reservation, brunch x2) : « Avant de venir » au-dessus de « Terrasse en extérieur », « Ambiance » au-dessus de « Décontracté, convivial » répètent le titre ; en retirer encore deux.
- **F3-5** `reservation` : « Le plus simple est d'appeler » et « Derrière le comptoir, un couple namurois » (`histoire`) déduisent une procédure et une scène que le dossier ne donne pas (réservation « à confirmer », fondateurs « à confirmer ») ; garder le marquage « à confirmer » mais supprimer « Le plus simple est d'appeler » et « Derrière le comptoir ».

## Ce qui est bien (à ne pas casser)
1. Les faits restent exacts et sourcés (adresse, téléphone, horaires, réseaux, avis ; incertitudes marquées « à confirmer » et « prix illustratif ») ; titre d'accueil et méta désormais justes ; JSON-LD complet.
2. Le dispositif de journée (frise, ciel, thème, badge d'ouverture en heure de Bruxelles) et la composition mobile (navigation et frise en en-tête, signature conservée) ; 404.html designée avec title, h1 et lang, un seul logo KYW partout.
3. Technique : 0 erreur console, 0 lien mort, axe à 0 sur 30 cas, LCP mobile ~1,3 s, reduced-motion sans texte caché (QA).

## Preuves
Planches : `/tmp/claude-0/-home-user-KYW-test-restaurant/4a6f67a1-5f33-5823-96d3-1413d7443722/scratchpad/rs2-pl-{histoire,brunch,reservation,404html}.png` ; mesures `rs2-mesure.json`, `.logs/rs2-mesure.log`, `rs2-clock.log`, `rs2-sw3.log`.
Hypothèses : fuseau du sandbox UTC (horloge visible 02:40 pendant les mesures), donc ciel nocturne non défectueux ; l'instant simulé (mercredi 18/11/2026) suffit à représenter un jour d'ouverture ; build non relancé (dist postérieur à src).
