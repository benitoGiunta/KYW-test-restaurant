# ETAT : incorrect awwwards, fin de la phase 3 (construction-3)

## Fait
- Phases 1 et 2 (voir DESIGN.md). Phase 3 : QA refaite page par page (l'agent captures avait échoué, pas de QA-build.md), 4 corrections (dl accueil, hovers nav courante et téléphone, horaires de la réservation, accent du mot du pied), chacune vérifiée par shoot ciblé.
- Audit : 0 FAIL, 1 WARN justifié (no sitemap : racine QA). 0 erreur console, 0 requête échouée, axe 0 grave, noHoverChange vide, LCP < 1 s, CLS 0, 60 fps.
- RAPPORT.md écrit (notation en auto-notation, non indépendante). Build final passe.

## Reste
- Passe jury indépendante avec critique neuf (outil Agent absent), recomposition éventuelle de og.png, relecture à l'œil des `contrastNeedsReview`.
- Photos et horaires confirmés par le client.

## Pièges
- Le shoot d'une page dure ~2 min : `run_in_background`. `.qa-root` (copie de dist) et `.shots/` non commités.
