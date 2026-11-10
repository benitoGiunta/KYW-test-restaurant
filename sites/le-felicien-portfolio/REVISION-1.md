# Révision 1 · Le Félicien · portfolio

Revue : REVUE-1.md (aucun F0 ; F1-1 et F2-1 à F2-4 traités, F3 non traités, hors périmètre de la passe ciblée).

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | `src/motion/setup.ts` : `overwrite: 'auto'` aux deux `gsap.to` (montrer / cacher), les `quickTo` x, y, rotate ne sont plus tués | relecture du code ; plus aucune ligne n'a de `data-preview` (voir F2-1), donc le survol ne peut plus se tromper de photo |
| F2-1 | corrige | `src/data/site.ts` : photo `apercu` retirée des 3 pâtes et du café gourmand ; `Lignes.astro` : `aria-label` retiré | grep `data-preview` dans `dist/…/carte` et `index` : 0 ; vignettes mobiles absentes. Photo des pâtes conservée en salle |
| F2-2 | corrige | `reservation.astro` (lead, meta description, bouton « Contact : 081 39 53 23 »), `formules.astro` (même bouton), `site.ts` (note « Réservation en ligne. ») | grep « par téléphone » dans `dist/…/reservation` : 0 |
| F2-3 | corrige | accueil : section « La maison » réduite à une phrase de renvoi ; `histoire.astro` : chapeau différent de l'accroche ; prix des banquets retiré de la description de formule et du bandeau de l'accueil ; prix 25/18 € retirés de la note de l'onglet Midi ; date en dur remplacée par « semaine d'automne 2026 » (F3-4 au passage) | grep `dist/` : « dès 27 € » reste sur `formules/` en prix de formule et pastille (2, plus la meta) |
| F2-4 | corrige | `Header.astro` : `role="region"` sur le bandeau d'état ; `Lignes.astro` : plus de `aria-label` sans rôle ; `base.css` : le h2 de panneau (`panneau__titre-js`) est visually-hidden au lieu de `display:none`, ce qui rétablit h1, h2, h3 | axe (region, aria-prohibited-attr, heading-order) sur 5 pages x 1440 et 390 px : 0 violation |

Hypothèse : les vignettes de plats sont retirées plutôt que légendées (aucune photo du plat réel). Pas de capture visuelle : changements de texte et de structure, mesurés par grep et axe. Build final par `scripts/q.sh revision-build pnpm build:site` : exit 0.
Décision de design : l'aperçu flottant au survol de la carte devient inactif tant qu'aucune photo de plat prouvée n'existe (DESIGN.md inchangé, code conservé).
