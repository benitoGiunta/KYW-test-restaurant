# Révision 1 · panorama-citadelle portfolio

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | `src/data/site.ts` : moments 12h, 17h, 19h en `placeholder: true` ; `src/pages/index.astro` : tag « illustratif » sur les titres 12h et 19h, « dès 17h » retiré | grep dist : « dès 17h » 0 ; 6 tags « illustratif » présents |
| F1-2 | corrige | `src/engine/reveal.ts` : `aria: 'none'` dans `SplitText.create` | axe 1440 et 390 px sur 5 pages : plus de `aria-prohibited-attr` ; `aria-label="8h"` 0 dans dist |
| F2-1 | corrige | `site.ts` : tartare de bœuf Angus (59 €) ajouté, chateaubriand à 94 € | grep dist `carte/` : tartare 1, « 94 € » 1 |
| F2-2 | corrige | descriptions de `carte`, `histoire`, `petit-dejeuner`, `reservation`, `404` : « du Panorama », « au Panorama » | grep dist « du Le Panorama », « de Le Panorama », « chez Le Panorama » : 0 |
| F2-3 | corrige | `reservation.astro` : « ou appelez-nous » retiré | grep dist : 0 |
| F2-4 | corrige | `Footer.astro` : `<footer>` en `<section aria-label="Contact et horaires">` | un seul `<footer>` par page (kyw-footer) ; axe : plus de `landmark-no-duplicate-contentinfo` |
| F2-5 | corrige | `histoire.astro` : tuiles à initiales retirées ; `base.css` : `.membre` en liste compacte à filet | `membre__initiales` 0 dans dist ; axe histoire 0 violation |
| F3-7 | corrige (bonus) | « apéro au coucher du soleil » devient « apéro » ; « Desserts et vins : à confirmer. » | grep dist : 0 |

Non traités (F3, hors liste) : F3-1 à F3-6, F3-8.
Vérification : axe 1440/390 sur accueil, carte, histoire, réservation, petit-déjeuner : 0 violation, `scrollWidth` = fenêtre. Seul écart vu : contraste transitoire du chip 17h à 3 s sur l'accueil, absent à 7 s (animation en cours).
Hypothèse : les créneaux 12h/17h/19h sont gardés comme repères éditoriaux marqués illustratifs. DESIGN.md inchangé.
