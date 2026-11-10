# ETAT : Makimono awwwards, après la phase 3 (QA)

## Fait
- QA sur QA-build.md + captures ciblées (reservation, a-propos, accueil) : 0 erreur console, 0 requête échouée, 0 débordement, axe 0, réduit sans texte caché, LCP mobile < 1,6 s, 60 fps.
- Correction : horaires du pied de page condensés (« lundi au samedi », « dimanche (soir) ») pour supprimer 14 WARN de phrases répétées ; soulignement au survol des liens téléphone.
- Audit final : 0 FAIL, 4 WARN justifiés (RAPPORT.md). Build OK, dist commité, `pnpm index` fait.
- RAPPORT.md écrit (auto-notation, pas d'outil Agent).

## Reste
- Critique jury indépendant (`/jury` sur le site servi), seconde passe.
- Remplacer les éléments absents (équipe, histoire) quand le client les fournit.

## Pièges
- `serve.mjs` sous `base` : WARN sitemap/robots et 404 sans h1 sont des faux positifs.
- Un shoot complet d'une page dépasse 120 s : le lancer en arrière-plan.
