# ETAT : Don Dino, variante awwwards, phase 3 (QA) terminée

## Fait (phase 1)
- Concept « Quatorze services », DESIGN.md (checklist 1 à 18), scaffold, données réelles (115 plats), 5 pages statiques, rideau, menu mobile.

## Fait (phase 2)
- Module pilote `src/motion/services.ts` (heure de Bruxelles vers les 14 services) + `src/motion/idle.ts` (`startIdle`), branchés par `setup.ts`. Ligne d'état (accueil, réservation), case courante ou suivante, filet d'avancement, jour courant des horaires, filet rouge qui suit le jour survolé (bureau), trotteuse en temps réel (repos).
- Signature : cascade des 14 cases (clip-path du haut, jour après jour), ScrollTrigger `once`.
- Intros `data-split="lines" data-intro` sur les 5 h1 ; `data-split="lines"` sur les h2 de l'accueil ; photo du hero non cachée (échelle douce).
- Hovers : 3 traitements (`site.css` § Phase 2), tous sous `(hover: hover)` + `:focus-visible` + `:active` ; lien du pied KYW souligné.
- Point 16 : pâtes en bande de trois photos (`.trio`), 2 colonnes au téléphone.
- Build OK ; contrôles Playwright (`.logs/dd-aw2-check*.mjs`) : états du pilote justes à 3 instants (ven 19 h 15, sam 15 h, dim 10 h, sam 22 h 45 sur la réservation), cascade finie, 0 texte caché après défilement, `scrollWidth` = fenêtre à 1440 et 390, menu (Échap, focus), navigation vers la carte sans erreur, réduit sans texte caché.

## Reste (phase 3)
- Shoot complet (agent captures), `report.json` : points 35, 36 (`idleMotion` probablement false : trotteuse petite, immobilité écrite), 44, 45, 47 ; OG composée (point 9) ; RAPPORT.md avec les écarts de données (voir phase 1 ci-dessous).
- Vérifier à l'œil le contraste de « SOIR PROCHAIN » sur case rouge et de la case courante (encre) ; vérifier la hauteur de la cascade au téléphone (cases en lignes).

## Décisions et pièges
- La ligne d'état suppose les horaires réguliers (jours fériés et fermetures exceptionnelles inconnus) : à signaler dans RAPPORT.md comme hypothèse.
- Les captures d'élément Playwright (`locator.screenshot` plus haut que la fenêtre) montrent le lien d'évitement fixe : artefact de capture, pas un défaut (absent de la capture de fenêtre).
- Données (phase 1) : « 20 pizzas dès 9,30 € » (site) contre 26 pizzas de 10,50 à 17,80 € (carte PDF, retenue) ; note Google non affichée ; orthographes du PDF conservées ; photo 09 jamais nommée Dino.

## Phase 3 (QA)
- Corrigé : contraste `.tete__sept`, aria-label du logo ; axe accueil et 404.html à 0 violation ; build et audit 0 FAIL. Voir RAPPORT.md.
- Reste : cible tactile 404, jury indépendant non fait, `idleMotion` false assumé.
