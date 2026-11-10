# Révision 1 · grill-des-amis legacy (ciblée : F1, F2)

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| R1-01 | corrigé | `Horaires.astro` : « Fermé (à confirmer) » ; `RAPPORT.md` § 5 corrigé (déduit, plus « repris du site d'origine ») ; ligne Avis alignée | Playwright : 3 lignes « Fermé (à confirmer) » sur l'accueil |
| R1-02 | corrigé | polices auto-hébergées (`public/fonts/*.woff2`, latin, 14-20 Ko), `preload` + `@font-face` avec replis `size-adjust` (`Base.astro`, `tokens.css`) ; plus de requête Google Fonts | CLS sous CPU x4 + 4G lente : accueil 0,000 / 0,000 (deux passes) à 1440 et 390, carte 0,000 ; 0 requête externe |
| R1-03 | corrigé | `Footer.astro` : `<footer>` en `<section aria-label="Contact et horaires">` | 1 seul `footer` (kyw-footer) par page sur 7 pages testées |
| R1-04 | corrigé | `page.css` : photo des en-têtes en 3/2, colonne `1fr` (plus de portrait étroit) | mesure : 832 x 555 px à 1440, 64 px de marge à droite (= gouttière) ; capture `viandes/` |
| R1-05 | corrigé | `index.astro` : lien devenu `btn` ; `page.css` `.more` : marge réduite | bouton 48 px de haut, 120 px avant la fin de section (≈ 240 avant) |

Non traités (F3, hors périmètre) : R1-06 à R1-12. Sloplint non relancé (changements de typographie de repli et de mise en page minimes). Build final via `scripts/q.sh` : 8 pages, OK. Hypothèse : repli `size-adjust` approximatif, le CLS à 0 tient surtout au préchargement same-origin.
