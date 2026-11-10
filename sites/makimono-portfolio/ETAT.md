# ETAT : makimono-portfolio (fin de la phase 3 sur 3, QA faite)

## Fait en phase 1
- Gabarit affiche, contenu complet (carte.json, site.ts), 16 photos, pages `/`, `/carte/`, `/composer/`, `/commander/`, `/venir/`, `404`, KywFooter, noindex, mention maquette.

## Fait en phase 2 (build OK : `scripts/build-site.mjs sites/makimono-portfolio`, 6 pages)
- Hero : le grid `1.1fr 0.9fr` (min-content gonflé à 3758 px par le titre scindé) repoussait le plat hors écran ; colonnes en `minmax(0, …)` (desktop et mobile), plat visible. Titre mobile `19.5vw` (MONO tenait sur deux lignes à 22vw), mesuré en une ligne de 320 à 767 px.
- Signature « Ça s'empile » : prix `10,10 €` ne passe plus à la ligne (nowrap, `clamp(3.4rem, 6.4vw, 7.6rem)`, mobile `12.5vw`) ; pile, liste allumée et prix vérifiés au défilement (desktop 1440 et mobile 390).
- Plan de l'adresse : étiquette de rue inclinée sur la route, repère « ICI » déplacé hors de la route.
- Pastille « ouvert » : point vert clair visible sur fond encre (était nori invisible), pulsation 2,2 s, désactivée en reduced-motion ; état « bientôt » saumon.
- Mobile : bouton Menu poussé à droite (`margin-left: auto`, cible 48 px, « Fermer » ne colle plus au bord) ; menu plein écran testé (ouverture au toucher, Échap, navigation) ; lien courant souligné (le rose sur saumon était illisible).
- Bento : `ul.bento` avait le retrait par défaut de 40 px (cartes décalées de la gouttière) : `padding: 0; list-style: none`. Formules en 2 colonnes (2 boxes), prix en `clamp(2.6rem, 4.4vw, 5rem)` nowrap (mobile `8.6vw`).
- Titres mobiles : `.display--xl` plafonné à `8.6vw` (ÉVÉNEMENTS, CHALUMEAU), `.display--long` (`5.6vw`) pour Create.Your.Roll / Bowl, `.liste h3` à `5.4vw` ; adieu du pied de page coupé « Itadaki / masu ! » (12.5vw max) au lieu d'une coupe en plein mot.
- Contrastes : rose sur crème (1,78:1) retiré des textes (prix des formules, numéros de galerie, numéros de définition en encre, survol de la marque en ombre rose). Définition : doublon « 1. 1. » corrigé (`ol.definition`).
- Reduced-motion testé sur 5 pages (aucun élément masqué, aucune animation infinie, scrollWidth = 1440, liste « empile » allumée) ; 0 erreur console ; aucun débordement horizontal à 1440, 390, 320 sur 6 pages ; aucune image cassée.

## Reste (phase 3)
- Agent captures : shoot complet, planches, `audit.mjs` (faux positifs connus : skip-link, sitemap, 404 brute), sloplint, jury (auto-notation `self`).
- Test de clic réel de chaque lien de l'en-tête en 1440 et capture fenêtre du bas de page (consigne « Leçons intégrées ») : non refait en phase 2.
- Contraste non mesuré à l'axe : flèches « → » des horaires (saumon sur rose, décoratives), `--c-focus` = encre (anneau invisible sur fond nori : vérifier au clavier sur sections vertes).
- Retirer le CSS mort (`.equipe`, `.nav__cta`) si le sloplint le demande ; `pnpm index`, commit des `dist/` après QA.
- Logo mascotte et script du logo non intégrés (choix assumé, voir DESIGN.md).

## Pièges
- Gabarit `affiche` : `.bento` sans reset de `ul` et hero en grid `fr` sans `minmax(0, …)` (défauts du gabarit, non corrigés ici car `gabarits/` est interdit ; à reporter).
- `scripts/q.sh` + serveur `serve.mjs --port 4471` : un `build-site.mjs` pendant que le serveur tourne a parfois tué la connexion (relancer le serveur, PID dans `/tmp/mk-p2-serve.pid`, arrêté en fin de phase).
- Mesure d'un titre : `Range.getClientRects()` sur le contenu, pas la boîte du bloc.

## Décisions et hypothèses (inchangées)
- Téléphone +32 483 03 88 47 (site actuel) ; `restaurants.json` donne +32 495 90 82 74, à confirmer. Korean Futo « 10,50 à 11,00 € » (menu contradictoire). Placeholders : définition du nom, exemple de roll à 10,10 €. Avis : trois extraits Google via Restaurant Guru, note 4,6 sur 532 à confirmer. Pas de réservation en ligne.

## Phase 3
- Contraste des cartes d'horaires corrigé (encre sur rose), 0 axe sur l'accueil ; clics d'en-tête et bas de page vérifiés ; voir RAPPORT.md. Reste : revue, `pnpm index`, push.

## Revue passe 1 (relecteur-site, 10/11/2026)
- Fait : `REVUE-1.md` écrit (A_CORRIGER : 0 F0, 3 F1, 8 F2, 4 F3). QA-revue1.md et .shots absents : mesures par scripts maison (axe, contraste, grilles, pile, perf) sur 6 pages x 2 largeurs.
- Reste (réviseur) : F1-1 horaires `repeat(4, 1fr)` (Jeudi coupé 1024-1440), F1-2 `ol data-cercles` 3 colonnes inline sur mobile (index.astro:104, commander.astro:24), F1-3 pile « Ça s'empile » tronquée à 1440x900 ; puis F2 (avis en citations, « par téléphone », note Korean Futo, « dès » sans explication, majuscules du PDF, titres coupés COMP/OSEZ, contraste des étapes éteintes).
- Pièges : `overflow: clip` sur `.affiche` et `body` masque les débordements de grille (scrollWidth = fenêtre) ; remesurer `getBoundingClientRect().right` des enfants de grille et les éléments de la pile pendant l'épinglage.
