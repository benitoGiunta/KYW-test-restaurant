# ETAT : maison-des-desserts, variante awwwards (construction-2 faite)

## Fait (phase 1)
- Concept « la journée de la maison », système, pages statiques (accueil, carte, histoire, réservation, 404), données réelles, photos du client. Voir DESIGN.md.

## Fait (phase 2)
- Pilote `src/motion/journee.ts` (heure 8 h à 18 h lue sur les repères `data-heure`) : cadran fixe (aiguille, heure, couleurs de la tranche survolée), fond des tranches qui glisse d'un ton à l'autre (encre au meilleur contraste), rai de lumière sur la façade du hero ; repos `src/motion/idle.ts` ; compteur 142.
- Reveals déclaratifs (h1, chapeaux, titres h2, photos, lignes de la journée), rideau gris rayé qui avance de gauche à droite avec l'aiguille dorée.
- Menu plein écran du téléphone (`Header.astro`, `motion/menu.ts`) ; hovers en 3 traitements sous `(hover: hover)` + `:focus-visible` + `:active` ; `::selection`, anneau de focus accent ; `favicon-32.png`, `apple-touch-icon.png`.
- Pied du site passé de `<footer>` à `<section aria-label>` (un seul `<footer>`, celui du paquet KYW) ; prix de la carte autorisés à passer à la ligne au téléphone (débordement 362 px à 360 corrigé).
- Build : `scripts/q.sh mdd-aw2-build pnpm build:site sites/maison-des-desserts-awwwards` passe (5 pages).
- Tests maison (Playwright, serveur 4471) : 0 erreur console ni requête en échec (bureau, 390, 360, 320) ; aucun débordement à 390/360/320 sur 5 pages ; repos visible dans le hero ; menu : focus piégé, Échap, focus rendu, fermé à la navigation ; réduit : 0 bloc caché, pas de Lenis, cadran masqué. Captures ciblées : `.shots/p2/planche-*.png`.

## Reste (phase 3)
- Shoot complet (agent captures), lecture de `report.json` : `hover.noHoverChange`, `idleMotion`, `settledMs`, `reduced.*`, contraste (y compris pendant le glissement des fonds), cibles, skip link (faux négatif connu : « Aller au contenu »).
- LCP et `loaderMs` (sans loader), mesure de la transition `d-90..92`.
- RAPPORT.md (données douteuses listées ci-dessous), `pnpm index`, cases 35, 44, 45 de DESIGN.md.

## Décisions et pièges
- Pas de loader ni de GL. Le rai de lumière est volontairement discret (soft-light) ; s'il ne suffit pas à `idleMotion`, augmenter l'opacité du dégradé (`.hero__lumiere`) avant la vitesse.
- Le cadran est absent de l'histoire (repères en années) et de la 404 (un seul repère) : voulu.
- Carte : les chapitres « Après-midi », « Toute la journée », « À commander » n'ont pas de repère ; l'aiguille interpole de 11 h 30 au pied (18 h). Heure décorative (`aria-hidden`).
- À signaler en RAPPORT : prix « à confirmer » (chocolat chaud viennois, mignardises 3,50 €) ; « 20/12 et 31/12 fermeture à 17 h » incohérent, seul le 20/12 repris ; libellés « Après-midi », « Toute la journée » éditoriaux ; légendes = champ `sujet` ; « baguette » d'après la photo 15.
