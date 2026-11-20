# REVISION-1 · brasserie-edgard · legacy

Revue : REVUE-1.md (aucun F0). Révision ciblée : F1 et F2 traités, F3 non traités (hors périmètre). Rebuild OK via q.sh.

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | `src/data/site.ts` : `prix()` affiche le texte libre tel quel (« Prix du jour », sans €) | `grep -c NaN dist/.../*/index.html` = 0 sur 6 pages + accueil ; ligne « Prix du jour » mesurée à 1440/390/360 |
| F1-2 | corrige | `site.ts` : `prix()` et `prixPortions()` rendent « 1 pièce 18,60 € » / « 2 pièces 23,90 € » (espaces insécables) ; `la-carte.astro`, `index.astro` : une portion par ligne ; `page.css` : `.portion` | capture 390 px lue (scampi x2, petits gris : 15 € / 25,60 €), scrollWidth = 390 et 360, titre jamais écrasé (195 px à 390) |
| F2-1 | corrige | `layouts/Base.astro` : JSON-LD `Restaurant` (adresse, tel, e-mail, 10:00-22:30 7j, sans aggregateRating) | `grep -c ld+json` = 1 sur 7 pages dont 404 |
| F2-2 | corrige | `components/Footer.astro` : `<footer class="close">` devenu `<div role="group" aria-label>` ; paquet kyw-footer intact | `grep -c "<footer"` = 1 (kyw-footer seul) ; axe non relancé |
| F2-3 | corrige (a, b, c) | accueil : « Plus de dix personnes, … seize au maximum » ; participants 11 à 16 ; option « À la carte réduite » retirée (`site.ts`, `index.astro`) | grep dist : 6 options 11-16, 0 « à la carte réduite » ; plafond de 12 : déjà dit sur la page menu groupe, non ajouté à l'accueil (hypothèse : titre court) |
| F2-4 | corrige | `lunch-et-suggestions.astro` : crumble sorti du bloc moules, section « Au dessert » avec prix 11,50 € | grep dist « Au dessert » présent |
| F2-5 | refuse | aucun | la source `site-actuel/page.html` porte `Brasserie_Edgard` sur les liens visibles (8 occurrences, identique au site) ; `Brasserie_Mr_Edgard` n'existe que dans le JSON-LD Yoast de la source |

Non fait : sloplint et axe non relancés (budget), contrôle visuel limité à la page carte. DESIGN.md inchangé.
Estimation : site publiable.
