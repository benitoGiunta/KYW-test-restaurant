# Révision 1 · Le Servais portfolio (réponse à REVUE-1.md, liste F0, F1, F2)

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F0 | rien à faire | (aucun bloquant) | |
| F1-1 | corrigé | `maison.astro` : phrase de l'adresse supprimée (la baseline dit déjà « au départ du téléphérique ») | grep `dist/` : 0 « à l’entrée » |
| F1-2 | corrigé | descriptions de `maison`, `carte`, `groupes`, `petit-dejeuner`, `reservation`, `404` sans article doublé | grep `dist/` : 0 « Le Le », « du Le Servais », « au Le Servais », « via réservation » |
| F2-1 | corrigé | `engine/reveal.ts` : `aria: 'none'` dans `SplitText.create` | axe `aria-prohibited-attr` + `color-contrast` : 0 nœud sur la home à 390, 768, 1440 |
| F2-2 | corrigé | `engine/loader.ts` : MIN 1,1 → 0,6 s, lissage 0,12 → 0,18, sortie 0,55 s + 0,8 s | `is-loaded` sans bridage, 2 passes : home 1440 2 229 / 2 206 ms, carte 2 145 / 2 141, home 390 1 900 / 1 906 (avant 2 860, 2 790, 2 539) |
| F2-3 | corrigé | `veranda.webp` 900 x 1350 (181 Ko) + `veranda-600.webp` (91 Ko) en `srcset` sur le héros de `groupes` (`sizes` 60vw en mobile) ; `bar-comptoir.webp` 1500 px, 189 Ko ; dimensions mises à jour dans `site.ts` | LCP `groupes` 390 px, CPU x4 + 4G lente, DPR 2 (comme shoot.mjs) : 2 252 / 2 276 ms (avant 3 536 / 3 572) ; 2 passes. Compromis : en mobile l'image servie fait 600 px de large |
| F2-4 | corrigé | `site.ts` : « Le bar se remplit avant la salle » supprimé ; `index.astro` : légende « À la pression » ; méta de `reservation.astro` sans « par téléphone » (bouton conservé, déjà « à confirmer ») | grep `dist/` : 0 « remplit avant », 0 « en terrasse », 0 « par téléphone » |
| F2-5 | corrigé | eyebrows retirés sur `carte`, `groupes` (formules, carte cadeau), `maison` (presse), `petit-dejeuner` (carte du matin), `reservation` (votre demande) ; les eyebrows qui informent (heures, date d'ouverture) restent ; quatre tuiles de `groupes` remplacées par une liste à prix alignés (`.formules`, `base.css`) ; photo de la carte cadeau = `bar-comptoir` ; `veranda-carre.webp` supprimée | build OK, grep `dist/` ; pas de capture de `groupes` (non demandée) |
| F2-6 | corrigé | `base.css` : l'astre s'affiche dès 768 px (disque 13 rem max, `baseline` limitée à 26 rem entre 768 et 1199 px), taille d'origine dès 1200 px | capture 768 px (disque + orbite + soleil visibles, sans recouvrement) ; rects : astre 476-660, nom et baseline finissent à 450 et 423 ; 1100 px : astre 762-970, nom 602 ; scrollWidth = largeur de fenêtre (768, 1100, 1440) |

Refusés : 0 · impossibles : 0. F3 non traités (hors liste demandée). DESIGN.md inchangé (l'astre n'est plus « masqué sous 1200 px » : désormais sous 768 px).
Rebuild final : `scripts/q.sh revision-build pnpm build:site sites/le-servais-portfolio` OK.
