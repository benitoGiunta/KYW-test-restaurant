# Brasserie Edgard : variante awwwards
**Concept** : « Le cadran », l'heure de Namur lit la journée de la brasserie (salle, cuisine, pause). **Stack** : Astro 5 + GSAP + Lenis, sans OGL (aucun besoin de WebGL pour un cadran en SVG). Base `/brasserie-edgard/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/brasserie-edgard-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non réalisés : aucun outil Agent en session d'agent et budget de réponses limité (phase de test). Ni score ni estimation jury ; la passe jury reste à faire par une session dotée de l'outil Agent. Aucune auto-notation n'est présentée comme score.

## Mesures (passe finale, captures ciblées après corrections, 5 pages)
- Audit : 0 FAIL, 1 WARN (« no sitemap » : faux positif sous `base`, `sitemap-index.xml` présent). Descriptions ramenées sous 160 caractères.
- Console 0 erreur, 0 requête échouée, `overflowX` faux partout, axe 0 violation (accueil, carte, maison, réservation, 404.html), `reduced.hiddenText` 0, `moving` faux.
- Mobile LCP : accueil 1224 ms, carte 1988, maison 1296, réservation 1336, 404 1144 (< 2500). CLS 0. Pas de loader. `settledMs` 2427 à 2845.
- Clavier : lien d'évitement en premier (`stops[0]` = « Aller au contenu » ; `skipLinkFirst` est un faux positif connu), 0 focus invisible.
- `smallTargets` vide partout (liens `.lien` en inline-block, 24 px minimum). `noHoverChange` vide partout.
- `idleMotion` vrai sur accueil, réservation, 404 ; faux sur carte et maison (pages de lecture sans cadran plein : immobilité voulue, la trotteuse n'existe que sur les cadrans pleins).
- Poids : page la plus lourde ~1014 Ko (JS 62 Ko gz, images 888 Ko, polices 50 Ko).

## Corrections de la passe
- Cibles tactiles de 23 à 24 px (Toute la carte, Ouvrir le plan, Facebook, Site actuel) : `.lien` en inline-block avec marge verticale.
- Survol sans changement : logo (zoom et rotation légère), téléphone du pied (translation et couleur), « La carte » et « Réserver » de la page courante (soulignement épaissi, plaque qui se vide).
- Meta descriptions de l'accueil (171) et de la carte (180) raccourcies.
- 404 : l'alerte de contraste de la capture brute de `serve.mjs` (4,36:1 sur la note du pied KYW) n'existe pas sur `404.html` réel (0 violation).

## Points non résolus
- [Creativity/Score] Passe jury indépendante non faite.
- [Hover] `colorOnly` signale « Réserver » (plaque conique qui se remplit : traitement), « Réserver en ligne », « Appeler », « Suggestions du moment », « La carte » (carte) : non relus un par un à l'œil.
- [Contraste] `contrastNeedsReview` 13 à 25 par page, non relus un par un.
- [Statut] Le statut du hero n'a pas été testé à plusieurs instants (`page.clock`).
- [Ship] og.png de la phase 1 conservé, non recomposé ni revérifié ; favicon 32 px et apple-touch-icon présents.

## Placeholders et hypothèses (à remplacer par le client)
- Aucun plat ni donnée fictive (`placeholder` absent). Prix relevés sur le site du client le 20/11/2026, à confirmer.
- Hypothèse : cuisine ouverte jusqu'à 22 h 30 (pas d'heure de dernière commande connue) ; pause cuisine 15 h à 18 h en semaine ; fériés belges traités comme le week-end.
- Histoire, année d'ouverture, fondateurs, avis, presse, parking : inconnus, rien d'inventé.

## Décisions de théâtre
Pas de loader (le contenu est le cadran), pas de GL, pas de curseur suiveur. Repos : trotteuse en temps réel, nulle en mouvement réduit. Accessoire retiré : aucun nouveau retrait cette passe.

## Leçons structurelles
Voir data/usage/test-2/lecons-proposees/brasserie-edgard.md.
