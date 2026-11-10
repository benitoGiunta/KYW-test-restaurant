# Révision 1 · Le Ponti 2 · awwwards
Ciblée sur les 4 F2 de REVUE-1.md (aucun F0/F1). F3 non traités (hors périmètre de la passe). Build OK via scripts/q.sh.

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F2-1 | corrige | `src/data/site.ts` : « La carte propose des cocktails signature, dont le Spritz Ponti. » Titres « Au comptoir » (carte) gardés : jeu de langage du concept, relevé tolérable par la revue. | grep dist/a-propos : ancienne phrase 0, nouvelle 1 |
| F2-2 | corrige | `src/pages/a-propos.astro` : phrase de justification supprimée, crédit photo conservé | grep « tel que son site » = 0 |
| F2-3 | corrige | `src/components/Footer.astro` : `<footer class="pied">` devient `<section class="pied" aria-label="Coordonnées">` (un `<div>` nu a fait apparaître `region` moderate, donc section nommée) | axe : 0 violation sur 4 pages x 1440 et 390 ; 1 seul `<footer>` par page (5 pages) ; 1 logo, noindex, mention présents |
| F2-4 | corrige | `Footer.astro` : sur `reservation`, la grille Adresse/Service/Contact est retirée du pied (seul le mot et le colophon restent) ; horaires, adresse, plan et contact restent dans le corps de la page | grep « Adresse</h2> » reservation = 0 ; capture 1440 du pied OK ; débordement 0 à 1440 et 390 |

Décompte : 4 corrigés, 0 refusé, 0 impossible. Pas de changement de design (DESIGN.md inchangé). Hypothèse : le CTA du pied n'est pas affiché sur Réserver (comme avant).
