# Escale en Vue ! : variante awwwards
**Concept** : l'heure est le défilement, un soleil posé sur chaque trait d'horizon descend et vire à l'orange du jeudi au dimanche. **Stack** : Astro 5 + GSAP + Lenis, sans OGL (pas de scène GL nécessaire). Base `/escale-en-vue/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/escale-en-vue-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non produits : phase de test, pas d'outil Agent ni de critique neuf dans cette passe (budget de réponses). QA faite sur preuves (rapports de l'agent captures + captures ciblées). Aucun score auto-attribué.

## Mesures (passe finale, captures ciblées accueil + 404)
- Mobile bridé accueil : LCP 2364 ms (img), CLS 0,018 (avant : 0,241), loaderMs null. Desktop FPS 60, mobile 60, settledMs 2452.
- Axe : 0 violation accueil et 404 ; débordement horizontal : non ; réduit : hiddenText 0, moving false ; 0 erreur console, 0 requête échouée ; cibles trop petites : aucune.
- Audit : 0 FAIL, 1 WARN (« no sitemap » : `sitemap-index.xml` présent sous `/escale-en-vue/awwwards/`, la racine de QA ne le sert pas à la racine, justifié). Poids : page ~748 Ko, JS 60 Ko gz.

## Corrections faites
1. CLS mobile 0,241 : titre du héros réservé à 2,8 em (`min-height`) car SplitText re-découpe après chargement de police et grandissait de 19 px.
2. Pied de page : numéro de téléphone 170x23 agrandi (padding) pour atteindre 44 px.
3. Crédit photo répété (accueil, à-propos) : retiré des légendes, conservé dans le colophon.
4. Meta description accueil 177 à 159 caractères.
5. 404 : violation axe contraste non reproduite (capture prise pendant le fondu), 0 violation au contrôle.

## Points non résolus
- [a11y] `keyboard.skipLinkFirst` false : faux négatif de l'outil, le premier arrêt est bien « Aller au contenu » (`#main`), l'outil teste « skip|#main|#content » sur le libellé.
- [anim] `idleMotion` false dans le rapport : le soleil bouge réellement au repos (924 à 968 px en 2 s, mesuré), mais la différence de pixels est sous le seuil de l'outil pour un disque de 78 px.
- [hover] `colorOnly` « Toute la carte » : le lien change aussi d'épaisseur et de décalage de soulignement (traitement léger) ; à renforcer si un critique le juge faible.
- [poids] `mur-pierre.COz2wzIf.jpg` (> 500 Ko) copié dans `_astro/` mais non référencé par les pages (les `<img>` servent AVIF/WebP) ; à vérifier au prochain build.
- Score critique, accessoire retiré et contrastes de l'accueil (10 « à revoir ») non revus à l'oeil faute de réponses.

## Placeholders et hypothèses (à remplacer par le client)
Aucun complément marqué `placeholder: true`. Hypothèses : liste des trappistes d'après la photo de la maison (à confirmer), horaires de la saison 2026 d'après l'affiche, dates de la prochaine saison inconnues.

## Décisions de théâtre
Pas de loader, pas de GL (concept : horizon et soleil en DOM) ; repos : soleil qui glisse à 22 px/s ; accessoire retiré : non fait.

## Leçons structurelles
Voir data/usage/test-1/lecons-proposees/escale-en-vue.md.
