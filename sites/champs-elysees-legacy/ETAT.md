# ETAT · champs-elysees legacy · construction-1 (phase 1 sur 3) · 20/11/2026

## Fait
- Audit (`AUDIT.md`), `sloplint --before` sans rendu (146 FAIL / 66 REFLEX / 9 WARN, CSS Divi), approche conservée (Photographic, Poster, one-page + 3 routes).
- deal (Vellum, Atelier, Bloom) → Atelier retenu, draw ffbbdc (Letter et Counter écartés, raisons dans DESIGN.md), scaffold, stamp, signal vert forêt lu sur les captures du logo.
- Comps c1 / c2 construits et capturés, c1 retenu (`comp.md`).
- Contenu : `src/data/site.ts` + `carte.json` (15 rubriques, 94 plats réels, prix reformatés), 12 photos et logo / mascotte en WebP dans `public/photos/`.
- Pages statiques : `/` (hero Poster, à propos, carte, galerie, fêtes, horaires, réservations), `/la-carte/`, `/fetes-patronales/`, `/contact/` ; composants Nav, Footer, Photo, Rows, Horaires ; KywFooter et noindex vérifiés sur 4/4 pages ; aucun tiret cadratin.
- Build : `scripts/q.sh build pnpm build:site sites/champs-elysees-legacy` OK → `dist/champs-elysees/legacy/`.

## Reste (phases 2 et 3)
- Phase 2 : rétractation du bandeau de nav, menu mobile (liens sur deux lignes en 375 px pour l’instant), jour courant dans les horaires, états des contrôles (hover, active, disabled), un reveal au plus, formulaire (validation, `data-endpoint=""`), `sloplint --render` (aucun passage fait), QA 1440 et 375, vérifier part de photos (gate 83) et hero à 1440 x 800, lire les captures.
- Phase 3 : Sweep, RAPPORT.md, jury, `pnpm index`, publication par la session de correction.
- Non fait : `pnpm index` (régénère dist/index.html), à faire en phase 3 ou par la session mère.

## Décisions et hypothèses
- Code postal : « 5100 Jambes (Namur) » (restaurants.json) ; le site cite 5000 : à confirmer.
- Horaires du site d’origine (lun-sam 11 h 00 à 22 h 00, dim 11 h 00 à 16 h 00), pas ceux de Rankeat.
- « Réservations & bons cadeaux » devient « Réservations » (aucun contenu de bon cadeau ; `dropped` noté dans le stamp).
- Titre du hero resserré à « Plaisir et partage, à chaque repas » (gate 58) ; la phrase d’origine « Une brasserie moderne et contemporaine à Namur » devient le sous-titre.
- Consentement du formulaire : « Les Terrasses du Prince » (erreur du site) remplacé par « le restaurant » ; texte à faire valider. Envoi non branché (`data-endpoint=""`, mention `data-placeholder`).
- Ajouts issus du dossier (non du site) : légende « Ouverte le 13 juillet 1984 » (La DH) sur la façade ; sélection de 5 plats cités par la presse sur l’accueil. Aucun avis, note, citation de Teresa ni métrique.
- Moules : absentes de la carte PDF, non ajoutées.
- Logo vectoriel absent : logo PNG du client utilisé tel quel ; mascotte orange (client) en bande des fêtes.
- Air WebGL d’Atelier non reproduit (fond papier statique) ; vert forêt remplace l’ardoise (do-not « warm accent » respecté : teinte 152).
- Pièges : sloplint `--render` sur le HTML sauvegardé bloque (processus tué) ; build-site ne vérifie que index.html.
