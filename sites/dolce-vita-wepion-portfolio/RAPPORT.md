# RAPPORT : dolce-vita-wepion-portfolio (phase 3, QA)

## Résultat QA
- Build final OK (7 pages, `dist/dolce-vita-wepion/portfolio/`).
- Captures de l'agent « captures » (accueil, carte, 404) : 0 erreur console, 0 requête en échec, axe 0 serious (hors 404 brute de serve.mjs, faux positif connu), CLS 0.001, LCP 176 à 1332 ms, pas de débordement, FPS 58 à 60.
- Audit : 0 FAIL, 9 WARN. 6 « sentence repeated » (horaires répétés en pied et sections : voulu). Faux positifs : 404 sans h1, robots.txt et sitemap (présents dans `dist/…/portfolio/`, servis sous la base).
- Ciblé en phase 3 (pizze, histoire, à emporter, réservation, 1440 et 390) : 0 erreur console, scrollWidth = clientWidth, un h1, titres corrects, pied KYW et mention présents. Planches relues : RAS.

## Corrections
- Inventions retirées (leçon commune : procédure non prouvée par le dossier) : « La réservation se fait par téléphone / Appelez le restaurant » (réservation, à emporter, meta description) reformulé en « Pour réserver, contactez le restaurant » ; ligne « Carte de fidélité : sur demande » supprimée (absente du dossier). Vérifié par grep dans le build : 0 occurrence restante.

## Placeholders
- Aucune donnée `placeholder: true`. Manques assumés : portraits de l'équipe (cartes « Photo à fournir » : Armando, Antigone), GPS (plan par recherche OSM), abonnés, presse. Photos 09, 10, 11 non affichées.

## Points ouverts
- Marquee en reduced motion : piste statique rognée à droite.
- Reservation par outil : `outil: 'téléphone'` est un libellé interne ; aucun outil en ligne connu.

## Leçons structurelles
- Gabarit forno : suppose un nom en deux lignes (titre de la levée = 2e ligne) ; à reporter si réutilisé.
