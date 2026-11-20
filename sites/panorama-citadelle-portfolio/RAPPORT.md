# RAPPORT QA, panorama-citadelle · portfolio (phase 3)

## Entrées
- `QA-build.md` absent ; le shoot de l'agent captures a échoué (« browser closed », 3 pages sans capture). Audit : 0 FAIL, 11 WARN (phrases répétées de la carte, pas de robots.txt ni sitemap, 2 images > 500 Ko). Contrôles refaits ciblés par un script Playwright (5 pages en 1440 et 390 ; clics réels de l'en-tête ; bas de page en fenêtre).

## Corrigé
1. **Pied de page KYW invisible** (bas de page, 1440) : bande crème sans texte, fond fixe devant le pied statique, et texte gris (#55646a) sur la nuit. `.kyw-footer` en `position: relative; z-index: var(--z-content)`, note en ivoire, lien « Réalisé par » sur pastille claire. Vérifié par capture de fenêtre en bas de /carte/ : mention « Maquette KYW, certaines données sont illustratives. » et logo KYW visibles.
2. **Frise du jour fixe superposée au pied de page nuit** (points et heures illisibles) : masquée (`.is-masquee`, script inline dans `Base.astro`) quand le pied entre dans la fenêtre, desktop seulement. Vérifié sur capture.

## Vérifié sans défaut
- 5 pages x 2 largeurs : scrollWidth = innerWidth (1440 et 390), 0 image cassée, 0 erreur console, 0 requête échouée, noindex et mention présents.
- Clics réels des 6 liens de pages et 6 ancres de l'en-tête en 1440 : l'URL change / l'ancre se déplace, `elementFromPoint` renvoie bien un lien.
- Build final passe (`scripts/q.sh`).

## Points ouverts (non corrigés)
- Images facade.webp et terrasse-platanes.webp > 500 Ko (page d'accueil ~1,9 Mo d'images).
- Pas de robots.txt/sitemap : voulu pour une maquette noindex.
- Phrases répétées de la carte : l'accueil reprend les plats de la carte (voulu).
- Badge « ouvert » présent deux fois en 1440 (en-tête + hero) : comportement du gabarit.
- Pas de capture de la planche complète (shoot en échec) ; aucune capture mobile relue au-delà du scrollWidth.

## Placeholders
- 2 lignes « dernier verre » (marquées exemple) ; favicon du gabarit (aucun logo client) ; avis/abonnés non affichés.

## Leçons structurelles
- Le shoot de fond peut échouer en « browser closed » sans QA-build.md : le contrôle du bas de page en fenêtre reste indispensable (le pied KYW était masqué par un fond fixe).
