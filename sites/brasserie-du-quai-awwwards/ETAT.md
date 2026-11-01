# ETAT : brasserie-du-quai, variante awwwards (revue 2 terminée, 01/11/2026)

## Fait
- Construction (3 phases), revue 1 (A_CORRIGER : F1 0 sur 1, F2 5, F3 6), révision 1 (F1-01 et F2-01 à F2-05 corrigés).
- Revue 2 : `REVUE-2.md`, verdict PUBLIABLE (F0 0 · F1 0 · F2 0 · F3 8). Les 6 corrections de REVISION-1 vérifiées sur dist
  (grep), en navigateur (1440 et 390 sur 4 pages) et par `shoot.mjs` ciblé sur /histoire/ et /reservation/.
- Serveur de revue (port 4531, PID 17091) arrêté. Le serveur 4502 du QA n'est pas à moi, laissé en l'état.

## Reste (facultatif, F3 seulement)
- F3-01 desserts d'exemple ; F3-02 photo `24-chef-ecailler` en double (accueil + carte) ; F3-03 vide de ~300 px avant
  « Les classiques » ; F3-04 titre répété en début de paragraphe (histoire) ; F3-05 prix à 13 px ; F3-06 horaires
  dupliqués sur /reservation/ (page + pied) ; F3-07 ligne « Pierre-Alexandre / Avec son équipe. » vide ; F3-08 lien
  téléphone en phrase de la 404 à 21 px (exception WCAG 2.5.8 inline).
- Ensuite : `pnpm index` si une correction modifie dist, commit, push.

## Pièges
- `QA-revue2.md` ne capture pas /histoire/ ni /reservation/ ; ses 2 violations axe « 404 » sont celles de la réponse brute
  de `serve.mjs`, pas de `404.html`.
- `shoot.mjs` signale `skipLinkFirst: false` alors que `keyboard.stops[0]` est le lien d'évitement (faux négatif).
