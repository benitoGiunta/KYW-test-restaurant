# ETAT · Le D’Arville · variante legacy · fin de la phase 2 (construction-2)

## Fait (phases 1 et 2)
- Phase 1 : audit, deal Atelier, comps, DESIGN.md, 9 pages, 22 photos WebP, pied KYW, noindex et mention sur les 9 routes.
- Phase 2 : nav `edge-aligned bar` 72 px, menu `<nav popover>` sous 60rem (Menu, aria-expanded, Escape, clic sur un lien, retour bureau), « Réserver » dans la barre sous 40rem via la barre fixe du bas ; boutons en huit états (hover gardé par `(hover: hover)`, focus-visible, active, disabled, courant) ; un seul reveal calme sous `.js` (têtes de section, menus, bandeau, passe-partout), visible sans script, sous mouvement réduit et à l’impression ; signature : passe-partout en carton de coton (fibre, cadre fin, étiquette pressée) qui se pose au reveal ; jour courant des horaires (`aria-current="date"`, Europe/Brussels) ; flèche de l’index qui glisse ; hero en `svh`, plaque et légende alignées sur le conteneur à 1920 ; légende du hero sur scrim (contraste) ; `pointer: coarse` à 48 px ; tokens `--color-scrim-cap`, `--color-mat-edge` ajoutés.
- Hero review `self` (pas d’outil sous-agent) : sloplint `--render --stage hero` sans FAIL réel (reste le faux positif 34 et la NOTE 58). Comp : trois réponses dans `comp.md`, plus grand écart (hauteur de la plaque) assumé.
- Mesures navigateur : pas de débordement horizontal à 320, 375, 768, 1000, 1280 et sur les 8 routes à 375 ; 12 tabulations avec anneau 2 px ; sans JS et avec `reducedMotion` tout est visible ; aucune erreur console.
- Bugs corrigés : `<figure>` du hero avait la marge du navigateur (40 px) car la classe `ph` était remplacée (`figure { margin: 0 }`) ; `Fig` demandait `-1024.webp` pour les photos de 1024 px (les fichiers s’appellent `-1600`), 404 sur le portrait du chef.
- Build passe (`scripts/q.sh build pnpm build:site sites/le-d-arville-legacy`), 9 pages, noindex + mention + `kyw-signature` + aucun tiret cadratin vérifiés dans `dist/`.

## Reste (phase 3 et agent captures)
- Captures complètes 375 et 1440 (QA), sloplint de rendu final sur toutes les routes, contraste de la légende du hero sur photo claire (désormais scrim 62 %), poids des pages (hero 1600 px), Sweep dans DESIGN.md, RAPPORT.md, entrée finale de `.hallmark/log.json` (nav : `edge-aligned bar`), puis `pnpm index`.
- Vérifier au rendu que la feuille du menu (popover) ne chevauche pas la barre fixe du bas sur petits écrans en hauteur (testé à 375x812 seulement).
- Pas de formulaire de réservation : l’original renvoyait vers Zenchef, le lien « Réserver en ligne » est conservé (checklist 23 et 29 sans objet).

## Décisions et hypothèses
- Air WebGL d’Atelier coupé (papier fixe) ; un seul reveal ; pas de motion au hero.
- Le jour courant n’affiche pas « ouvert maintenant » : les heures sont des slots `.fill`.
- Rien de commité hors `sites/le-d-arville-legacy/` (sauf `src`, `DESIGN.md`, `comp.md`, `ETAT.md`), `dist/le-d-arville/legacy/` et la ligne de leçon proposée.

## Pièges
- Le hook de sobriété refuse TOUTE la commande Bash si elle contient un `curl` ou un `python3 scripts/…` hors `q.sh` : les éditions placées avant dans la même commande ne s’exécutent pas (le script Base.astro a manqué ainsi une fois). Séparer éditions et contrôles.
- `pnpm-lock.yaml` modifié par un autre agent : ne pas l’ajouter.
