# Revue portfolio · Le Servais · passe 2
Verdict : PUBLIABLE
Lecture en une ligne de l'idée du site (sans avoir lu DESIGN.md) : une journée de bar-brasserie en cadran, de 9h à 23h : ciel, frise latérale et soleil en orbite autour de la photo du comptoir suivent les six moments calés sur l'heure du visiteur (inchangé depuis la passe 1).

Méthode : `dist/` (08:41) postérieur à `src/` et `public/` (`find -newer` vide), captures de `QA-revue2.md` (08:48) postérieures au dist : réutilisées (QA limité à 3 pages sur 7 et 404 brute, `skipLinkFirst: false` et WARN robots/sitemap = faux positifs connus). Pas de shoot relancé. Scripts maison (scratchpad `rv2-*`, port 4742, serveur arrêté par `kill`) : 7 pages x 390, 768, 1440 px (axe-core complet, console, requêtes, débordement, images, cibles < 24 px, noindex, mention, logo, h1, lang) ; axe `color-contrast` et `aria-prohibited-attr` à chaque vue après 2,2 s de repos (carte 1440 et 768, home 1440 et 390) ; loader et LCP/CLS CDP (CPU x4, 1,6 Mbit/s, 150 ms, DPR 2) en 2 passes ; hero à 768, 1100, 1440, 390 ; `groupes` en pleine page 1440 et 390 (planches `.shots-le-servais-portfolio-revue2/c/pl-*.png`) ; `grep` de `dist/` ; liens internes confrontés aux fichiers de dist.

## Vérification de REVISION-1 (chaque correction annoncée)
| id | verdict | preuve |
|---|---|---|
| F1-1 phrase d'adresse | confirmé | `maison.astro` n'a plus la phrase ; `grep dist/` : 0 « Le bar est au », 0 « à l'entrée » |
| F1-2 articles doublés | confirmé | méta et `og:description` des 7 pages : 0 « Le Le », « du Le Servais », « au Le Servais », « via réservation » (voir F3-2 pour « de Le Servais » sur la 404) |
| F2-1 `aria-prohibited-attr` | confirmé pour les 6 `.moment__heure` | axe complet : 0 violation `aria-prohibited-attr` à 390, 768, 1440 ; reste 1 nœud « à vérifier » (F3-1) |
| F2-2 loader | confirmé | `is-loaded` sans bridage, 2 passes : home 1440 2 215 / 2 222 ms, carte 1440 2 176 / 2 171, home 390 1 894 / 1 895 (avant 2 860, 2 790, 2 539) ; sous 2,6 s |
| F2-3 LCP `groupes` | confirmé | LCP 390 : 2 196 / 2 156 ms (avant 3 536 / 3 572), élément LCP `veranda-600.webp` ; CLS 0,009 ; home 1 332 / 1 316 ms, CLS 0,006 ; plus aucune image > 300 Ko (`terrasse.webp` 299 Ko, `bar-comptoir.webp` 189 Ko, `veranda.webp` 181 Ko) |
| F2-4 phrases non prouvées | confirmé | `grep dist/` : 0 « remplit avant », 0 « en terrasse », 0 « par téléphone » ; légende « Duvel à la pression » en place (`index.astro:17`) |
| F2-5 slop pages intérieures | confirmé | plus de quatre tuiles : liste à prix alignés `.formules` (`pl-groupes-1440.png` et `pl-groupes-390.png`, lisible, sans débordement) ; carte cadeau = `bar-comptoir` ; `veranda-carre` absent de `dist/` ; chapeaux restants informatifs sauf un (F3-3) |
| F2-6 astre 768 à 1199 px | confirmé | `pl-hero.png` : disque + orbite + soleil à 768 et 1100 px, sans recouvrement du nom ni de l'accroche ; `scrollWidth` = largeur de fenêtre (768, 1100, 1440, 390) |

Aucune régression : build OK (QA-revue2 exit 0), 21 cas (7 pages x 3 largeurs) : 0 erreur console, 0 requête en échec, 0 image cassée, 0 débordement de page, 0 lien mort (liens internes de 7 pages confrontés à `dist/`), `lang="fr"`, un `h1` et un `main`, mention « Maquette KYW… », un seul logo KYW et `noindex` sur les 7 pages (21 cas), titres uniques, favicon, OG et canonical présents, JSON-LD `Restaurant` avec adresse et horaires. `color-contrast` serious vu 2 fois à 768 et 1440 (carte) au premier passage : disparaît après 2,2 s de repos, fondu de ciel, non noté.

## Scores /10
- Design 8 : identité tenue de la home à `groupes` ; la liste de formules à prix alignés remplace les quatre cartes égales (`pl-groupes-1440.png`) et l'astre rend les 768-1199 px dignes du hero (`pl-hero.png`).
- Usabilité 8 : horaires, réservation, téléphone et badge accessibles partout, nav à 5 entrées tenant à 390 px, 0 débordement sur 21 cas ; flèches d'horaires encore étroites à 768 px (F3-4).
- Créativité 8 : cadran horaire, soleil à l'heure réelle, médaillons, 404 « Cette page a fermé » ; signature maintenant visible dès 768 px.
- Contenu 8,5 : fautes de français de la passe 1 supprimées, phrases inventées retirées, 94 paires nom/prix déjà confrontées sans écart de prix (données non modifiées par la révision) ; reste un « de Le Servais » (F3-2).
- Technique 8,5 : build OK, 0 erreur, CLS ≤ 0,009 mesuré, LCP mobile 1,3 à 2,2 s, loader 1,9 à 2,2 s, aucune image > 300 Ko, axe : 0 violation serious/critical, 1 moderate (pied dupliqué).

## Findings

### F0 bloquant
Aucun.

### F1 majeur
Aucun.

### F2 mineur
Aucun.

### F3 finition
- **F3-1 `aria-label` résiduel sur `<p class="horloge" aria-label="Heure locale">`** (`src/pages/index.astro:30`) : axe le range en « à vérifier » (`aria-prohibited-attr`, incomplete) sur la home à toutes les largeurs ; ce n'est plus une violation. Correction : `role="text"` ou retirer l'`aria-label` et laisser le texte de l'heure.
- **F3-2 « sur le site de Le Servais »** dans la description et `og:description` de la 404 (`404.astro`, `dist/le-servais/portfolio/404.html`) : « de Le » est incorrect. Correction : « sur le site du Servais » ou « chez Le Servais ».
- **F3-3 Chapeau redondant sur `groupes`** : « Groupes et privatisation » (`groupes.astro:12`) au-dessus du h1 qui dit la même chose (« La Verrière, ou tout le bar »), seul vestige du motif eyebrow + titre. Correction : le retirer ou le remplacer par une information (capacités).
- **F3-4 (reprise de F3-3 de la passe 1, non traité, hors liste) flèches des horaires** : 15 x 44 px à 768 px sur home et réservation (`.horo__fleche`, `base.css:234`, `width: 44px` écrasé en flex). Correction : `flex-shrink: 0` (et `min-width: 44px`).
- **F3-5 (reprise de F3-1 passe 1) `landmark-no-duplicate-contentinfo` (moderate) sur les 21 cas** : pied du site + `kyw-footer`. Correction : pied du site en `<section aria-label="Coordonnées">` ou `<div>`, composant KYW conservé.
- **F3-6 (reprise de F3-4/F3-5/F3-6 passe 1) non traités** : répétition « tous les jours de 18h à 20h » dans la section 18h, libellé « à confirmer » du téléphone et numéro `+3281736552` du JSON-LD sans réserve, liste du petit-déjeuner de la home sans mention « week-end ». À traiter à la livraison.

## Ce qui est bien (à ne pas casser)
1. La liste de formules à prix alignés de `groupes` (lisible à 390 px, trois lignes pour « Petit-déjeuner, groupes » sans débordement) et la cohérence du reste de la page (héros Verrière, carte cadeau, pied sombre).
2. L'astre repliable en disque dès 768 px : orbite et soleil visibles à 768 et 1100 px, nom et accroche non recouverts.
3. Les fondamentaux mesurés : loader 1,9 à 2,2 s, LCP 390 px de `groupes` à 2,2 s grâce au `srcset` 600 w, CLS ≤ 0,009, 0 lien mort, mention + logo + noindex sur chaque page.
