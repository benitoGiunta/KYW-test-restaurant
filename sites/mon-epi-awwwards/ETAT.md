# ETAT, mon-epi awwwards, construction-3 (phase 3 sur 3, terminée)

## Fait (phase 1)
- Concept « Extraction », système, pages `/`, `/carte/`, `/histoire/`, `/reservation/`, `404.html`, données réelles, photos du client, favicon, og.png : voir `DESIGN.md` (points 1 à 18).

## Fait (phase 2, 27/11/2026)
- Pilote `src/motion/tamis.ts` (appelé par `setup.ts`) : jauge de l'en-tête 65 à 80 % liée au défilement (chiffre + filet braise sous l'en-tête, resté visible quand l'en-tête se retire), barreaux de l'échelle et filet du pied remplis au défilement (scrub de `--b`), grains de farine au repos sur `gsap.ticker` (pause hors écran, écartés par le pointeur), menu mobile.
- Transition « chute » (rideau suie à filet braise), intros `data-split="lines" data-intro` sur les 5 h1, reveals sur titres de section, mur, médias secondaires, frise.
- Hovers sous `(hover: hover)` + `:focus-visible` + `:active` ; lignes de carte : filet à la longueur du taux de leur farine ; liens du pied soulignés en remplissage ; `.kyw-footer__link` souligné au survol.
- Pied du site passé de `<footer>` à `<section aria-label>` (le paquet KYW porte le `<footer>`). Marque sans `aria-label` (texte sr-only ajouté).
- `.split-line` à marge haute pour les capitales accentuées.
- Vérifié (script Playwright, serveur propre port 4467) : 0 erreur console ou requête échouée ; `scrollWidth` = fenêtre à 320, 390 et 1440 sur 5 pages ; jauge 65 en haut, 80 en bas ; barreaux `--b` à 1 ; 0 bloc caché après défilement ; navigation interne : rideau caché, h1 visible ; menu 390 conforme (voir DESIGN.md point 19) ; réduit : 0 élément caché, pas de Lenis.
- Build passe : `dist/mon-epi/awwwards/` à jour.

## Reste (phase 3)
- Shoot complet (agent captures), lire `report.json` : `idleMotion`/`idleAt` (grains), `settledMs`, `hover.noHoverChange`, `smallTargets`, contraste, `skipLinkFirst` (faux négatif connu sur « Aller au contenu »).
- og.png 645 Ko à recompresser ; RAPPORT.md final ; `pnpm index`.
- Points DESIGN.md 35, 36, 44, 45, 47 à prouver.

## Décisions et hypothèses
- Boulangerie : « Commander » remplace « Réserver », CTA `tel:` seul. Seul horaire publié : vendredi.
- Aucun contenu fictif. Pas de loader, pas de GL, pas de curseur suiveur (décisions phase 1 confirmées).
- Aperçu photo au survol des lignes de carte abandonné : aucun pain n'a sa propre photo ; remplacé par le filet de farine (concept).
- Menu mobile sous 40 rem seulement (3 liens tiennent au-delà).

## Phase 3 (27/11/2026)
- Fait : captures ciblées histoire, réservation, accueil ; corrections (échelle du pied mobile, titre accueil, hovers marque et 404, og.png 143 Ko) ; rebuild OK ; audit 0 FAIL ; RAPPORT.md, DESIGN.md points 35 à 47 prouvés ; serveur arrêté.
- Reste : critique jury indépendant (auto-notation seulement), recapture carte/404 si besoin, contraste du pied KYW sur la 404 (paquet).
