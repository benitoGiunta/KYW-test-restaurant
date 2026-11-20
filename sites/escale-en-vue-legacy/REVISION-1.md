# REVISION-1 · escale-en-vue-legacy (F2 seulement, aucun F0/F1)

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F2-1 saison terminée | corrige | `Hero.astro` : phrase « Saison 2026 terminée. Les horaires ci-dessous sont ceux de 2026. » rendue si `saison.statut === 'terminée'` ; pas de date de réouverture inventée. Hypothèse : boutons « Réserver » et JSON-LD inchangés (plat maison sur réservation, horaires 2026 factuels) | grep dist/index.html : phrase présente |
| F2-2 fréquence/légende | corrige | `site.ts` : `quand: null` pour bières et softs ; `Carte.astro` : `quand` rendu seulement si non nul, légende « Huit bières trappistes. » | grep dist : 0 « Toute la saison », 2 `.row__quand` restants (planchette, plat maison), légende présente |
| F2-3 double contentinfo | corrige | `Pied.astro` : `<footer class="pied">` devient `<div class="pied">` | DOM à 320/390/1440, accueil et 404 : 1 seul contentinfo |
| F2-4 espaces sécables | corrige | U+00A0 devant « : » et « ! » dans `Pied.astro` (2), `index.astro` (title, description), `Base.astro` (og:site_name), `404.astro` (title) | grep Python sur dist : 0 occurrence « lettre + espace + : ou ! » en dehors de script/style |

Build `pnpm build:site` OK ; scrollWidth = largeur de fenêtre à 320, 390, 1440 (accueil et 404). sloplint non relancé (changements de texte et de balise seulement). DESIGN.md inchangé. F3 non traités (hors périmètre). Publiable : oui, sous réserve du contrôle de la session de reporting.
