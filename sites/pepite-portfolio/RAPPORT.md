# RAPPORT pepite-portfolio (QA phase 3)

Build final : OK (`scripts/q.sh`, 7 pages, `dist/pepite/portfolio/`).

## QA
- Captures et audit (agent captures, `QA-build.md`) : 0 erreur console, 0 requête en échec, 0 violation axe, 0 FAIL audit, 8 WARN.
- WARN « phrase répétée » (horaires boutique/cave dans l'en-tête, le pied de page et la réservation) : répétition volontaire, conservée.
- WARN sitemap/robots/404 sans h1 : faux positifs (leçons communes) ; `sitemap-index.xml` et `robots.txt` présents dans `dist/pepite/portfolio/`, `404.html` a `lang="fr"`, `<title>` et noindex.
- Contraste : fg 16,2, muted 7,9, accent 8,5, erreur 7,1 sur fond (tous AA). `--c-rouge` (#8c2436, 2,28) ne sert qu'à la barre décorative des familles de vins : éclairci en #b8445a (3,8). Capture ciblée de /vins/ : lisible, 0 régression.
- Phase 2 : liens d'en-tête (clics réels), mention KYW et logo en bas de chaque page, reduced-motion, formulaire : vérifiés.

## Placeholders
- Carte des vins : 6 lignes `placeholder: true` (seule la fourchette 5,50 à 12,50 € est réelle).
- Heure de fermeture 23:00 : illustrative, jamais affichée.
- URL Tablebooker générique.
- Photos faibles en source (cave 598 px en volet plein, atelier, salle-bokeh) : acceptables en capture, à remplacer par des originaux.

## Points ouverts
- Non vérifié en capture : halo sur la mosaïque, rideau de transition, loader.
- Le bouton gauche du hero /vins/ affiche « Instagram » avec une flèche gauche (lien externe) : à relire.

## Leçons structurelles
- Un `--c-rouge` sombre sur fond quasi noir échoue en 3:1 même décoratif : partir d'un rouge à ≥ 3,5:1.
