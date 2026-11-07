# Revue portfolio · INCORЯECT (Incorrect, Namur) · passe 2
Verdict : A_CORRIGER (0 F0, 2 F1, 1 F2, 6 F3)

Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une affiche de concert punk collée au mur (aplats rouge, jaune acide, vert sapin, bords en dents de scie, titres XXL étirés) où la carte est un mur de cartes-tickets et le Dwight Schrute est dessiné couche par couche.

Preuves : `dist/` à jour par rapport à `src/` (aucun fichier source plus récent que le build de 02:31) ; `QA-revue2.md` et ses planches (home, carte) relues ; serveur de contrôle port 4620 (PID noté, arrêté) ; script maison unique (axe-core complet de `node_modules`, console, requêtes, débordement des enfants de grilles, mots de titres coupés par `Range.getClientRects`) sur 6 pages (dont `/404.html`) × 390, 768, 1024, 1440, 1920 px = 30 cas ; captures pleine page 390 et 1440 des 6 pages ; captures ciblées `emp-*`, `e768-12`, `res1024`, `olp-1440` (dossier scratchpad `inc-p2/`).

## Vérification des corrections annoncées (REVISION-1.md)
| id | verdict | preuve |
|---|---|---|
| F1-1 `.formules` carte | confirmé | `carte/` : 0 enfant de grille hors fenêtre aux 5 largeurs, 0 titre débordant ; planche `incorrect-item` : cartes dans l'écran |
| F2-1 « Commander » | confirmé | `a-emporter/` 1440 : une ligne, pas de mot coupé (capture pleine page) |
| F2-2 cartes plats | confirmé | « 4 FROMASTIQUES » et « SIROP » entiers dans leur carte à 1440 |
| F2-3 étapes / plan | partiel | `a-emporter/` OK à 768, 1024, 1440 ; `reservation/` OK à 768 ; mais même composant mal traité sur la home (N-1) et sur `reservation/` à 1024 (N-3) |
| F2-4 axe | confirmé | axe complet (toutes règles, pas seulement serious) : 0 violation sur les 30 cas, y compris `color-contrast`, `aria-prohibited-attr`, `landmark-no-duplicate-contentinfo` |
| F2-5 CLS | confirmé | QA : CLS desktop 0,001 (home), 0,043 (carte, < 0,05), mobile 0 |
| F2-6 « par téléphone » | confirmé | `grep` : plus aucune occurrence dans home et `reservation/` ; reste « Par téléphone, pour convenir de l'heure de retrait » sur `a-emporter/`, dans une page dont l'encart porte « Illustratif : … modalités à confirmer » (acceptable) |
| F2-7 histoire | confirmé | 1440 : deux cartes nom + rôle pleine largeur, plus de polaroïd vide |

Mesures sans écart : 0 erreur console, 0 requête en échec (30 cas) ; liens internes tous en 200 (5 pages, `sitemap-index.xml`, favicon, police, CSS) ; 0 lien hors `base` ; `lang="fr"`, un `h1`, `noindex` (nofollow, conforme au prompt § 3.3), mention « Maquette KYW, certaines données sont illustratives » et un seul `.kyw-footer__logo` sur les 6 pages ; `scrollWidth` de page = largeur de fenêtre partout ; LCP mobile 944-988 ms (QA).

## Scores /10
- Design 8 : identité tenue, mais deux compositions cassées en tablette et à 1440 sur la home (N-1, N-2).
- Usabilité 7 : navigation, menu, réservation, pastille « ouvert » fonctionnent ; le prix signature est hors écran à 768.
- Créativité 8,5 : plat dessiné en cinq couches, prix qui claque, pastille à l'heure de Namur.
- Contenu 7,5 : faits conformes, plus d'invention de procédure ; restent trois détails de couches non sourcés (F3-2) et trois formats d'heures (F3-1).
- Technique 7 : axe 0, console 0, CLS bon, mais les débordements de grilles masqués par `overflow-x: clip` subsistent sur la home et `reservation/`.

## Findings (par gravité)

### F1 (majeur)
**N-1 · `/` « Passez à la porte » (étapes Choisissez / Appelez / Passez la porte) : les trois cartes sont trop étroites et le texte sort des cartes à 1024 et 1440 px.**
Preuve : `ol` large de 684 px à 1440 (476 à 1024) en 3 colonnes de 212 px (143 à 1024) ; `li.scrollWidth` 417 / 337 / 305 pour `clientWidth` 208 ; le titre « CHOISISSEZ » dépasse de la carte, « Passez la porte » finit à 1511 px pour une fenêtre de 1440 (`strong` 1306-1511, carte 1204-1416) ; capture `olp-1440.png` : « CHOIS… » et « APPE… » coupés au bord de la carte, « Rue Haute Ma… » tronqué. Invisible pour `shoot.mjs` et l'audit (`overflow-x: clip`). La révision n'a traité que le composant de `a-emporter/` (`.etapes ol[data-cercles]`).
Correction : sur la home, passer l'`ol` en une colonne sous ~1280 px (ou `repeat(auto-fit, minmax(min(100%, 16rem), 1fr))`), `li` en `grid-template-columns: 3.25rem minmax(0, 1fr)`, `strong` en `min(var(--t-l), 8cqi)` + `overflow-wrap: break-word` ; re-mesurer `li.scrollWidth <= clientWidth` à 768, 1024, 1280, 1440, 1920.

**N-2 · `/` « Ça s'empile » à 768 px : le plat dessiné et le prix « 14,50 € » sont coupés par le bord droit.**
Preuve : `.empile__prix` 561-896 pour une fenêtre de 768 (mesuré à chaque position de défilement du pin, 14 relevés identiques) ; capture `e768-12.png` : « 14,5 » coupé, plat à moitié visible, légende tronquée (« le classic de la ma… »). Le geste de signature du site est donc inutilisable sur tablette portrait. Le 390 et le 1440 sont corrects.
Correction : sous 1024 px, colonne unique (liste, puis plat et prix centrés) ou colonne de droite en `minmax(0, 1fr)` avec prix `min(var(--t-prix), 12cqi)`, puis mesurer `getBoundingClientRect().right <= innerWidth` à 600, 768, 900, 1024.

### F2 (mineur)
**N-3 · `reservation/` à 1024 px : « RUE HAUTE MARCELLE 35 » se coupe en « MARCELL / E » et l'étiquette du plan sort de son cadre.**
Preuve : `Range.getClientRects().length > 1` sur le mot « Marcelle » (h2 `display--xl`, droite à 1052 pour 1024) ; capture `res1024.png` : « MARCELL / E », et « RUE HAUTE MARCELLE » du plan dépasse du carré jaune. 768 et 1440 corrects.
Correction : `.display--xl` de ce titre en `min(var(--t-xl), 8.4vw)` (ou `overflow-wrap: normal` + réduction entre 900 et 1100 px) ; étiquette du plan en `font-size: min(…, 5cqi)` avec `cqi` du cadre.

### F3 (finition)
- F3-1 (inchangé) Trois formats d'heures : « 18h30 » (cartes horaires home et réservation), « 18 h 30 à 21 h 30 », « 18:30 » (pied, 15 occurrences par page). Choisir « 18 h 30 » partout.
- F3-2 (inchangé) Détails de couches sans source : « maison, grillé », « la base, bien rose » (présents dans le HTML de la home).
- F3-3 (inchangé) Libellé accessible « Dwight Schrute, le Dwight Schrute dessiné en cinq couches » (répétition).
- F3-4 (inchangé) `carte/` : « Rouge du moment au verre » avec « 6 / 6,50 / 7,50 » en description et « 6 € » en prix ; « (version végé 20,50) » sans « € » (Poti Poney).
- F3-5 (inchangé) JSON-LD `Restaurant` sans `openingHoursSpecification` (`grep` : 0 sur les 5 pages).
- F3-6 (nouveau, mineur) `carte/` à 360 px : le titre « Suppléments » dépasse de 10 px (23-370 pour 360). À 390 il tient, sans marge. Réduire la taille de ce titre sous 400 px.

## Ce qui est bien (à ne pas casser)
1. Hygiène : axe à 0 violation sur 30 cas, 0 erreur console, liens en 200, noindex, mention maquette, un seul logo KYW.
2. `carte/` après F1-1 : cartes de formules et mur de tickets propres de 390 à 1920 px ; `a-emporter/` et `histoire/` recomposés proprement (pleine largeur, « Commander » sur une ligne).
3. L'identité (palette, dents de scie, plat en couches, prix qui claque) et le texte sans filler ni invention de procédure.
