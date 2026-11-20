# El Greco : variante awwwards
**Concept** : « allonger » (formes tassées sur leur base qui s'étirent). **Stack** : Astro 5 + GSAP + Lenis, sans OGL (pas de GL, pas de loader). Base `/el-greco/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/el-greco-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non réalisés : pas d'outil Agent ni de critique neuf dans cette passe (QA par mesures et captures ciblées seulement). Score jury non estimé.

## Mesures (passe finale, serveur de production sur racine QA)
- Audit : 0 FAIL, 1 WARN (« no sitemap » : racine de QA, sitemap-index.xml présent dans dist, meta noindex).
- Accueil : LCP mobile 960 ms (img), CLS 0, 0 erreur console, 0 requête échouée, overflow nul, axe sérieux 0, reduced : 0 texte caché, 0 mouvement, `noHoverChange` vide, scrollFps 60 desktop et mobile, `smallTargets` vide.
- Pages intérieures : CLS mobile 0 (était 0,098 carte et 0,122 histoire), `smallTargets` vide (reservation), poids page ~378 Ko, JS 61 Ko gz.
- Meta robots présent partout, 0 tiret cadratin, `kyw-signature` unique.

## Corrections de cette passe
1. CLS : h1 des pages intérieures sur 2 lignes (police de repli) puis 1 ligne : `white-space: nowrap` sur `.entete__titre`.
2. Cibles tactiles : liens isolés (`p > .lien`, `li > .lien`) à 44 px ; lien téléphone de la carte en bloc en ligne à zone 44 px.
3. Repos du hero adouci (amplitude 3,6 à 1,8, période 9 à 14 s).
4. `font-display: block` (la police est préchargée ; LCP inchangé).
5. OG recomposée (nom, clocher, phrase, téléphone) au lieu d'un recadrage de l'écran.

## Points non résolus
- [Anim] `desktop.settledMs` reste null sur l'accueil : le repos continu du hero (voulu, `idleMotion` true) le tient ; les autres pages se posent en ~2,3 s. Le résoudre : couper le repos après 1,5 s.
- [Score] Pas de critique jury indépendant ; à lancer : `/jury` sur le site.
- [Poids] `02-stock-santorin-terrasses.jpg` (520 Ko) est émis dans `_astro/` par l'import mais n'est référencé par aucune page (seuls avif/webp le sont).
- [A11y] `contrastNeedsReview` (11 accueil, 63 carte) non relus un à un ; axe sérieux 0.
- [Captures] Pas de QA-build.md ni de planches complètes des 4 pages après correction : shoot complet seulement de l'accueil et de la réservation ; carte et histoire vérifiées par mesure de CLS ; hover `colorOnly` (liens téléphone, marque) non relus à l'œil.

## Placeholders et hypothèses (à remplacer par le client)
- 3 photos de stock Pexels (clocher des Cyclades, terrasses de Santorin, église à coupole bleue), `placeholder: true`, légendées « pas le restaurant ».
- Horaires lundi à mercredi inconnus (« à confirmer par téléphone ») ; jeudi à dimanche issus de Trouve Ton Resto, à confirmer ; « Depuis 1986 » non recoupé ; budget ~30 € ancien ; terrasse à confirmer.
- OG : composée avec la photo de stock.

## Décisions de théâtre
Pas de loader, pas de GL, repos du hero (respiration des cadres, pause hors écran). Accessoire retiré : non fait (pas de passe jury).

## Leçons structurelles
Voir data/usage/test-2/lecons-proposees/el-greco.md.
