# ETAT : maison-des-desserts, variante awwwards (construction-3 faite)

## Fait (phase 1)
- Concept « la journée de la maison », système, pages statiques (accueil, carte, histoire, réservation, 404), données réelles, photos du client. Voir DESIGN.md.

## Fait (phase 2)
- Pilote `src/motion/journee.ts` (heure 8 h à 18 h lue sur les repères `data-heure`) : cadran fixe (aiguille, heure, couleurs de la tranche survolée), fond des tranches qui glisse d'un ton à l'autre (encre au meilleur contraste), rai de lumière sur la façade du hero ; repos `src/motion/idle.ts` ; compteur 142.
- Reveals déclaratifs (h1, chapeaux, titres h2, photos, lignes de la journée), rideau gris rayé qui avance de gauche à droite avec l'aiguille dorée.
- Menu plein écran du téléphone (`Header.astro`, `motion/menu.ts`) ; hovers en 3 traitements sous `(hover: hover)` + `:focus-visible` + `:active` ; `::selection`, anneau de focus accent ; `favicon-32.png`, `apple-touch-icon.png`.
- Pied du site passé de `<footer>` à `<section aria-label>` (un seul `<footer>`, celui du paquet KYW) ; prix de la carte autorisés à passer à la ligne au téléphone (débordement 362 px à 360 corrigé).
- Build : `scripts/q.sh mdd-aw2-build pnpm build:site sites/maison-des-desserts-awwwards` passe (5 pages).
- Tests maison (Playwright, serveur 4471) : 0 erreur console ni requête en échec (bureau, 390, 360, 320) ; aucun débordement à 390/360/320 sur 5 pages ; repos visible dans le hero ; menu : focus piégé, Échap, focus rendu, fermé à la navigation ; réduit : 0 bloc caché, pas de Lenis, cadran masqué. Captures ciblées : `.shots/p2/planche-*.png`.

## Fait (phase 3)
- Corrections : titre, horaires regroupés, doublons de la réservation, cibles tactiles, repos du hero (idleMotion true), survol du logo. Build passe (5 pages), audit 0 FAIL, 1 WARN faux positif.
- RAPPORT.md écrit. Pas de score jury (pas d'outil Agent).

## Reste
- Critique jury neuf (`/jury`), CLS mobile accueil 0,062 (piste dans RAPPORT.md), lecture à l'œil des `colorOnly`.
