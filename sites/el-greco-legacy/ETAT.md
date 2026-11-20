# ETAT · El Greco · variante legacy · fin de la phase 3 (QA)

## Fait (phase 1)
- Audit, approche, deal/draw (Specimen, seed c9eb51), `comp.md`, `DESIGN.md`, contenu (`site.ts`, `carte.json`), 5 routes + 404, noindex, KywFooter, mention.

## Fait (phase 2)
- Nav : barre alignée à gauche, sticky (`--z-sticky-nav`), menu mobile en `<nav popover>` (bouton Menu/Fermer, Échap, 56 px par lien), Réserver toujours visible, repli sans popover.
- Formulaire de demande de réservation sur `/contact/` : ne poste nulle part (`data-endpoint=""`), validation blur puis input, message « Rien n'a été envoyé… », avertissement visible, placeholder. Testé (vide : 5 invalides + focus ; valide : message ; heure invalide).
- Boutons : huit états (hover, focus-visible, active, disabled), un seul primaire rempli par page (« Appeler » passé en contour sur contact).
- Motion : Specimen est « still » : aucun reveal, aucune boucle ; seulement états (soulignement, fonds, bordures, ouverture du menu). Reduced motion mesuré (1e-05 s).
- Hero : repères de la signature en `::before/::after` 1 px calés ; titre 11,5vw ; hero `svh` centré ; sloplint rendu hero : 0 REFLEX, 0 WARN, 1 FAIL 34 (faux positif : `overflow-x: clip` est dans `base.css`, `sloplint src` ne suit pas `@import`). Hero review `self` (pas d'outil Agent), comp reproduit (DESIGN.md § Revue du hero).
- Lignes « À table » : conteneur cliquable (lien étiré), un signal de survol ; focus visible sur la ligne.
- Photo : légende sortie du slot (elle était masquée), sous la photo.
- Responsive : `scrollWidth` 375 sur les 5 routes ; liens `(pointer: coarse)` à 44 px ; `scroll-padding-top` = hauteur de la nav.
- Build : `pnpm build:site sites/el-greco-legacy` passe (6 pages), noindex, `kyw-signature` et mention présents sur les 5 routes.

## Reste (phase 3)
- Agent captures : shoot complet (desktop, 375, reduced motion) et QA ; vérifier le rendu des polices (Bodoni, Geist, Geist Mono) hors proxy.
- Reviews, sweep, RAPPORT.md, `pnpm index`, commit final, copie des fichiers `.hallmark` utiles (`git add -f` comps, preflight).
- Pas de safe-area ajoutée (aucun élément fixé au bord) ; menu mobile et `round()` CSS demandent Chromium récent (repli prévu pour le menu ; sans `round()` les repères retombent sur des pourcentages).

## Décisions et hypothèses
- Formulaire = ajout (le site d'origine réservait par téléphone ou e-mail) : marqué `data-placeholder`, à confirmer avec le client ; couverts 1 à 10 sans règle inventée.
- Aucun reveal malgré le prompt (Specimen : « nothing on arrival ») ; waive 8 réécrit avec des mots de la page.
- Hero review en auto-notation (`self`).
- Reste de la phase 1 : avis Trustindex à vérifier, horaires lundi à mercredi `.fill`, phrase « servis avec frites… » à vérifier.

## Pièges
- `base.css` masque toute enfant non image d'un `[data-slot]` : une légende doit être hors du slot.
- Un `pattern` d'input est compilé en mode `v` : parenthèses à échapper dans une classe, sinon motif ignoré.
- Les lignes bleues des repères paraissent grises sur la lecture réduite des captures ; pixels vérifiés identiques (153,175,219).

## Phase 3 (QA)
- Build final passe, `pnpm index` fait. Aucune casse trouvée ; violation axe 404 = 404 générique du serveur de test, pas le site. RAPPORT.md écrit.
- Non fait : sweep sloplint, gates jugées, finish review, log theme.mjs.

Révision 1 terminée (F1-1, F1-2, F2-1 à F2-3 corrigés) : voir REVISION-1.md.
