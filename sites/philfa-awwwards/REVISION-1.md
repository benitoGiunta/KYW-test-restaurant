# Révision 1 · PhilFa awwwards (ciblée F2, aucun F0/F1)

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F2-1 og.png | corrigé | `public/og.png` recomposé (Archivo + Newsreader, « PhilFa » centré, adresse dans la moitié sombre, marges ≥ 60 px) via script Playwright maison (`og.mjs` du skill capture le héros live) | image relue ; `dist/philfa/awwwards/og.png` identique à `public/og.png` (cmp) |
| F2-2 axe repères | corrigé | `src/components/Footer.astro` : `<footer class="pied">` devient `<section aria-label>` (kyw-footer seul contentinfo) ; `src/pages/index.astro` : `aria-label` de `.bande` = « Photos de la salle » | axe-core sur 4 pages (accueil, carte, histoire, réservation) × 1440/390 : 0 violation (donc ni `region`, ni `landmark-*`) ; 1 seul `<footer>` par page dans `dist` |
| F2-3 réservation par téléphone | corrigé | `src/pages/reservation.astro` : chapo « Réservez votre table en ligne. », libellé « Une question ? Téléphone. », meta description sans promesse de réservation par téléphone | grep dist : « Deux façons » absent |

Bonus F3-2 (« au bar, » retiré dans `histoire.astro`, grep dist : absent). Non traités (F3) : F3-1, F3-3, F3-4, F3-5. Page 404 non remesurée par axe (non touchée par ces changements hormis le Footer).
Hypothèse : le bouton Appeler est conservé (numéro vrai, appel d'information).
Verdict : publiable. DESIGN.md inchangé.
