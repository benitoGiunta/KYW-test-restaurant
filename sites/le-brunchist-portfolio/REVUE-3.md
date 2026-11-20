# Revue portfolio · Le Brunchist · passe 3
Verdict : A_CORRIGER (0 F0, 1 F1, 0 F2, 5 F3 reportés)

Lecture en une ligne de l'idée du site : une journée de brunch en frise horaire (9h30 à 15h30) dont le ciel, la couleur et l'horloge suivent l'heure de Bruxelles, une page par moment de la journée.

Contexte : dist (02:49) postérieur à src (aucun fichier de src ou public plus récent) et à REVISION-2.md ; QA-revue3.md (02:56) postérieur au dist, réutilisé (accueil, carte, 404 brute : la « 404 » de sa planche est la réponse brute de serve.mjs, pas la vraie `404.html`). Serveur propre port 4861 (PID 12045, arrêté). Scripts maison dans le scratchpad (`rs3-*.mjs`) : axe-core de node_modules + console + requêtes + balises, 6 pages (dont `404.html` réelle) x 5 largeurs ; horloge simulée (`page.clock`) 5 instants x 3 fuseaux x 2 largeurs x 2 pages ; chargement sans défilement 6 pages x 7 largeurs.

## Vérification des corrections annoncées (REVISION-2.md)
| id | verdict | preuve |
|---|---|---|
| F1-1 débordement mobile (astre, `.hero { overflow-x: clip }`) | **OK pour l'accueil, mais le même défaut subsiste sur 4 autres pages (voir F1-1 ci-dessous)** | accueil : `scrollWidth` = largeur à 320 et 390 pour 09:30, 15:45, 22:30, lundi 12:00, dimanche 11:40, fuseaux Europe/Brussels, America/Los_Angeles, UTC (30 cas, 0 écart) |
| F2-1 heure de Bruxelles | OK | même instant 11:40:30 : horloge `11:40` et bouton « Il est 11h40 : aller au moment présent, le brunch » identiques dans les 3 fuseaux à 320 et 390 ; plus aucun `new Date()` direct hors `maintenantBxl` (`journee.ts:39` seul) |
| F2-2 plats répétés | OK | dist : « Œufs brouillés » 1 occurrence (accueil) et 1 (carte, liste à part) ; « Jus frais pressé » 1 par page (accueil, carte), 0 « Jus pressé » ; `audit.mjs` du QA : 0 FAIL |
| F2-3 flèches de jour | OK | `.horo__fleche` 44 x 44 à 390, 768, 1024 et 1440 sur `/` et `/reservation/` |
| F3-1 à F3-5 | non traités (annoncé) | voir F3 |

Mesures de la passe : build OK (QA, 6 pages), 0 erreur console, 0 requête en échec, 0 violation axe sur 30 cas (6 pages x 5 largeurs, `404.html` réelle comprise), 0 cible < 24 px, h1 unique, `lang="fr"`, `noindex` sur chaque page, 1 `<footer>`, 1 logo KYW (`img[src*=kyw-signature]`) et mention « Maquette KYW, certaines données sont illustratives » partout, titres uniques (« Le Brunchist | Café-brunch à Namur », etc.), JSON-LD présent sur les 6 pages ; QA : LCP mobile 1,16 à 1,29 s, CLS mobile ≤ 0,015, 0 texte caché en reduced-motion, 573 Ko l'accueil. Restent « à vérifier » d'axe : `color-contrast` (30, fonds animés) et 1 `aria-prohibited-attr` sur l'accueil (5 largeurs).

## Scores /10
- Design 7,5 : concept et planches inchangés et propres (accueil, carte) ; écarts vides entre sections persistants.
- Usabilité 7 : navigation, frise et flèches (44 px) bons ; mais 6 à 11 px de défilement horizontal au chargement sur 4 pages mobiles (F1-1).
- Créativité 8 : horloge, ciel, médaillons, rideau de transition.
- Contenu 7 : faits exacts (adresse, +32 474 06 92 27, horaires, fondateurs et 2022 présents au dossier, marqués « à confirmer ») ; légendes de médaillons et procédure d'appel encore déduites (F3).
- Technique 7,5 : build OK, axe propre, perf bonne ; retranché : débordement mobile sur les pages intérieures.

## Findings (par gravité)

### F1 majeur
- **F1-1 · Défilement horizontal de 6 à 11 px au chargement sur `/carte/`, `/histoire/`, `/brunch/` et `/reservation/` en mobile (320 à 412 px)** (`<figure … data-reveal="scale">` : `carte.astro:43`, `histoire.astro:52`, `brunch.astro:64`, `reservation.astro:37`). À l'état initial, avant révélation, le cadre est à `transform: scale(1.15)` (matrix 1.15) avec `clip-path: inset(12%)` : sa boîte déborde à droite (reservation 390 px : `getBoundingClientRect` left -20, right 410 pour 390 ; `.c8-12` dans `.wrap`) et `.photo { overflow: clip }` (`base.css:169`) ne coupe que l'intérieur, pas la boîte transformée. Mesures, 4,5 s après chargement sans défilement : `scrollWidth` 326 (320), 369 (360), 400 (390), 423 (412) ; `scrollTo(300, 0)` donne `scrollX` 6, 9, 10, 11. Série `scrollWidth` à 390 : 390, 390, 400, 400… (se déclenche à ~2 s, reste jusqu'à ce que l'image soit révélée en défilant). 16 cas sur 24 en échec ; accueil, 404.html et toutes les pages à 768, 1024, 1440 : 0. Invisible dans les mesures de la révision 2 et du QA (prises après défilement, où l'image est révélée et la largeur revient à 390). La correction de la révision 2 (`overflow-x: clip` sur `.hero` seulement) ne couvre que l'accueil : même classe de défaut que l'ancien F1-1. Correction : `overflow-x: clip` sur `main` (ou `html, body`) dans `base.css`, ou `overflow: clip` sur le conteneur de chaque figure `data-reveal="scale"` ; re-mesurer `scrollX` après `scrollTo(300, 0)` sur ces 4 pages à 320, 360, 390 et 412 px sans défiler.

### F2 mineurs
Aucun.

### F3 finition (reportés de REVUE-2, non traités, ids conservés)
- **F3-1** deux avis Google en anglais sans `lang="en"` (`histoire/index.html` : 0 `lang="en"`). Ajouter l'attribut sur les deux citations.
- **F3-2** `/brunch/` : titre « Rondes, vues du dessus » et médaillons « Fruits frais », « Café au lait », « Miel » (`brunch.astro:9-11,38` ; `index.astro:15-16`) nomment des plats que le dossier ne cite pas ; seul « Granola maison » est cité. Neutraliser les trois légendes.
- **F3-3** mobile : rangée de puces horaires du hero qui défile sous le bord (puce « 12h30 Le sal… » coupée, planche accueil `m-01-hero`), sans fondu de bord.
- **F3-4** chapeaux restants : « Avant de venir » (reservation), « Ambiance » (histoire), 2 sur `/brunch/` ; ils répètent le titre.
- **F3-5** `reservation` : « Une table ? Le plus simple est d'appeler » ; `histoire` : « Derrière le comptoir, un couple namurois… » : procédure et scène déduites (le dossier dit « réservation recommandée / non prise, à confirmer » ; fondateurs « à confirmer »). Supprimer « Le plus simple est d'appeler » et « Derrière le comptoir ».

## Ce qui est bien (à ne pas casser)
1. Faits exacts et incertitudes marquées (« à confirmer », « prix illustratif », « repère illustratif ») ; titres et méta justes ; JSON-LD sur chaque page.
2. Dispositif de journée : frise, ciel, thème, horloge et bouton « Il est HHhMM » désormais cohérents dans tous les fuseaux ; composition mobile (navigation et frise en en-tête, signature conservée).
3. Technique : 0 erreur console, axe à 0 sur 30 cas, LCP mobile ~1,3 s, flèches de jour à 44 px, reduced-motion sans texte caché, un seul logo KYW et pied unique.

## Preuves
Mesures : `scratchpad/rs3-mesure.json` (axe, débordement, horloges, flèches), `.logs/rs3-resa.log`, `rs3-resb.log` (série et transform de la figure), `rs3-resc.log` (chargement 6 pages x 7 largeurs) ; planches du QA : `.shots-le-brunchist-portfolio-revue3/{home,le-brunchist-item}/planche.png`.
Hypothèses : fuseau du sandbox UTC ; instants simulés exprimés en heure de Bruxelles (UTC+1) ; build non relancé (dist postérieur à src et à REVISION-2).
