# Révision 1 · l-essentiel · legacy
Révision ciblée des F2 (aucun F0/F1). F3 non traités (hors périmètre de la consigne). Rebuild par `scripts/q.sh` : 7 pages OK.

| id | décision | changement | preuve |
|---|---|---|---|
| F2-1 favicon | corrigé | `public/favicon.svg` (E crème sur cobalt) + `<link rel="icon">` dans `layouts/Base.astro` | `grep rel="icon"` dist = 1 ; `dist/l-essentiel/legacy/favicon.svg` présent ; Playwright : 0 erreur console / 0 réponse >= 400 sur 6 pages x 2 largeurs |
| F2-2 deux contentinfo | corrigé | `components/Footer.astro` : `<footer class="foot">` devient `<section aria-label="Informations pratiques">` ; `kyw-footer` seul contentinfo | axe `landmark-no-duplicate-contentinfo` : 0 violation sur 12 cas ; `grep -c '<footer'` dist accueil = 1 |
| F2-3 nom accessible du logo | corrigé | `Nav.astro` : aria-label « L’Essentiel Temploux, accueil » + espace entre « L’Essentiel » et « Temploux » (sans l'espace, le texte visible était « L’EssentielTemploux » et axe signalait encore l'écart) | axe `label-content-name-mismatch` : 0 sur 12 cas |
| F2-4 répétitions accueil | corrigé | `Footer.astro` prop `court` (page `accueil`) : colonne « Horaires » omise ; `page.css` 3 colonnes au-dessus de 60 rem. Le bloc complet reste dans la section ; fermetures annuelles conservées en pied | hauteur home 390 px : 8 931 → 8 623 px ; horaires 2 fois au lieu de 3 (`f-horaires` absent de l'accueil, présent sur contact) ; 0 débordement |

Limites : sloplint non relancé (changements de balisage et d'un bloc CSS de 1 ligne, pas de nouveau composant visuel) ; pas de capture visuelle, mesures DOM/axe seulement. Le DESIGN.md est inchangé.
