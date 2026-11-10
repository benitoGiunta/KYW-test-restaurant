# ETAT · le-felicien · legacy · construction-3 (10/11/2026)

**Fait** : QA lue (QA-build.md) ; sloplint --render 0 FAIL, 0 REFLEX ; waivers 59 et 77 ; bande du midi en deux colonnes ; insécables avant « : ? » ; log `.hallmark/log.json` ; DESIGN.md phase 3 ; RAPPORT.md ; build et `pnpm index` passés, noindex et pied sur 5 routes.
**Reste** : rien de bloquant. Photos réelles (salle, assiette récente) à fournir.
**Pièges** : « focus invisible » et 404 sans titre du rapport captures sont des faux positifs ; waiver = 3 champs.

## Revue 1 (relecteur-site, 10/11/2026)
**Fait** : REVUE-1.md écrit, verdict A_CORRIGER (F0 0, F1 3, F2 4, F3 6). Pages mesurées : accueil, carte, contact, suggestions, 404.html à 1440, 768 et 390 px.
**Reste (révision)** : F1-1 `.well` de `contact.astro` (84 px de large) ; F1-2 `.sched` écrasé dans `.rows-block` (15 px à 390) ; F1-3 premier Tab de `/la-carte/` dans le pied (`scrollIntoView` au chargement) ; puis F2-1 à F2-4.
**Pièges** : « focus invisible » et 404 sans titre du rapport captures sont des faux positifs ; contraste « 0 d'opacité » du menu desktop = `display: contents` (faux positif).
