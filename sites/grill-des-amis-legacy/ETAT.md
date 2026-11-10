# ETAT · grill-des-amis · variante legacy · fin de la phase 2 (construction-2)

## Fait
- Phase 1 : audit, design, 8 pages, données réelles, 12 photos du client (voir DESIGN.md, comp.md).
- Phase 2 : nav mobile en `popover` (bouton + `<nav popover>`, Échap, retour du focus, `aria-expanded`), « Réserver » de la barre en contour (un seul primaire plein par écran), « Voir la carte » en contour, libellés « Appeler le 081/61 72 60 » (verbe), états du bouton (hover, focus-visible, active, disabled), mouvement still (réglage lent de la photo du hero, aucun reveal, défilement doux hors mouvement réduit), jour courant des horaires (surface + filet + mot « aujourd’hui »), index de la carte avec entrée courante, `::selection` thémée, légende du hero en `--color-ink-2`.
- Hero review `self` (pas d'outil sous-agent) : `ship`, 1 finding résolu. Reproduction de la comp écrite dans `comp.md` (stamp `reproduced (checked at 1280x800)`).
- Mesures (`.logs/gda-l2-check.log`) : aucun débordement horizontal à 320/375/768/1024/1440 sur 8 pages, contrôles ≥ 44 px, aucun bouton replié, hero 320x568 = 504 px, menu ouvert/fermé/Échap OK, `animation: none` en mouvement réduit.
- sloplint (rendu `--url`) : accueil et 6 pages intérieures, 0 FAIL, 0 REFLEX, 0 WARN ; `waive 77` et `waive 71` écrits dans `page.css:9-10` (sections minces = ancre d'index, dernière phrase avant le pied, pages utilitaires ; rangées de a-propos en deux colonnes).
- Build passe (`scripts/q.sh build pnpm build:site sites/grill-des-amis-legacy`), noindex, mention et `kyw-signature` vérifiés sur les 8 pages. Serveur arrêté.

## Reste (phase 3)
- Captures complètes (agent « captures »), QA navigateur, contraste mesuré (stamp « to measure »), mesure du pli, `RAPPORT.md`, `pnpm index` et publication (non fait : phase 3).
- Clic réel sur le logo de la barre (2,5 rem) : lisibilité sur fond slab à confirmer sur capture.
- Le menu mobile ne se ferme pas seul au clic sur un lien d'ancre de la même page (les liens du menu pointent vers d'autres pages : sans effet ici).

## Décisions et hypothèses
- Réservation = lien Wix d'origine et `tel:`, donc aucun formulaire ni fausse confirmation (items 23, 29 n/a).
- Darkroom : caractère still, aucun reveal ; seul mouvement, la photo du hero.
- Horaires, jours fermés, photos écartées, retraits (lignes `dropped`) : inchangés depuis la phase 1.
- La waiver 77 est unique et couvre carte (« Le midi »), a-propos, traiteur, réserver, contact.
