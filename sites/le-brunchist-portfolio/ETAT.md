# ETAT : le-brunchist portfolio, passe construction-2 (phase 2/3)

## Fait (phase 1 + 2)
- Phase 1 : gabarit journee adapté, site.ts, 6 pages, 9 photos libres (placeholder), frise 9h-16h, build OK.
- Phase 2 :
  - Signature : « astre » du hero (latte en disque + orbite, petit soleil placé à l'heure réelle sur PLAGE 9h-16h, 270° ; monte en 1,6 s au premier rendu, se replace chaque minute, zoom de la photo au défilement). Version compacte en mobile (disque 4,2 rem à droite de l'horloge). Code : `astre()` dans `src/motion/journee.ts`, styles `.hero__astre…` dans base.css.
  - Hero : badge « ouvert » en double avec l'en-tête retiré ; `--t-mega` mobile plafonné par la largeur (« Brunchist » débordait à 320 et 360) ; invitation « aller au moment présent » masquée un jour de fermeture (lundi, mardi).
  - Bug corrigé : disque de la frise mobile calé sur l'ancienne plage 7h-23h (`(heure - 7) / 16`), il n'était jamais sur le bon cran ; formule `(heure - 9) / 7`.
  - Pied KYW : le bandeau clair du paquet est rendu (le repeint sombre rendait note et logo illisibles) ; `position: relative; z-index: var(--z-content)`.
  - Finitions : focus-visible en `var(--encre)` (lisible sur chaque ciel), anneau des médaillons qui tourne et photo qui zoome au survol, variantes `-800.webp` de toutes les photos + `srcset`/`sizes` (helper `srcsetDe` dans `src/lib/url.ts`), photo de l'astre en 800.
  - Reduced motion : règle globale d'engine.css + `astre()` sans tween ni zoom ; 0 élément caché (reveal, split, médaillons) en `reducedMotion: reduce`.
- Contrôles faits (Playwright, serveur 4417 arrêté) : clics réels de l'en-tête (5 liens, URL change, elementFromPoint = `<a>`), bas de page 1440 et 390 sur 6 pages (mention KYW et logo visibles, bande claire), `scrollWidth` = fenêtre à 320/360/390/1440 sur les 6 pages, 0 erreur console, badge et astre testés par `page.clock` (ven 10h ouvert, ven 16h10 fermé demain, lun 10h fermé mercredi, dim 15h29 ouvert, dim 9h00 ouvre à 9:30), build `scripts/q.sh bru2-build pnpm build:site sites/le-brunchist-portfolio` OK.

## Reste (phase 3 + captures)
- Shoot/audit complets par l'agent captures (axe, contraste du tag sur ciel corail, LCP avec la photo de l'astre en 800 px, clavier).
- Hero à 1440 : l'invitation « Il est … » est sous la ligne de flottaison à 900 px de haut (acceptable), à regarder.
- Mobile : pas de test réel du geste sur les médaillons et la bande terrasse.
- Mettre à jour gabarits/UTILISATION.md (journee : le-brunchist) : laissé à l'orchestrateur (gabarits/ protégé).
- Pas de logo ni palette client ; photos toutes libres (`placeholder: true`) ; horaires contradictoires selon les sources.

## Pièges
- La capture de page intérieure < 3 s après `is-loaded` posé à la main montre les titres `data-split` à mi-révélation (masque `overflow: clip`) : attendre 4 s ou le vrai loader (5,5 s).
- Un `.mjs` de mesure du scratchpad importe `sharp` depuis `/home/user/KYW-test-restaurant/node_modules/sharp/lib/index.js` (pas depuis le site).
- Aucun `[publier]` : à poser sur le commit final du restaurant seulement.
