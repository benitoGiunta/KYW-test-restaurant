# Chez Guillaume : variante awwwards
**Concept** : « La conduite », la soirée lue comme une feuille de régie de spectacle, chaque section est un top horaire qui s'enchaîne. **Stack** : Astro 5 + GSAP + Lenis, sans OGL (photos de salle, pas de besoin GL). Base `/chez-guillaume/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/chez-guillaume-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non noté dans cette passe : aucun critique indépendant lancé (pas d'outil Agent dans la session d'agent). Aucun score n'est avancé. `/jury http://127.0.0.1:4400/chez-guillaume/awwwards/` re-note le site avec un critique neuf.

## Mesures (passe finale, accueil, `.shots/home`, `.shots/home3`, `.shots/audit.txt`)
LCP mobile 1168 ms (img), CLS mobile 0,01, loaderMs null (pas de loader), settledMs desktop 2437, FPS 60 desktop et mobile, axe 0 sérieux, aucun débordement, `noHoverChange` vide, `colorOnly` 2 (soulignement épaissi, retenu), `idleMotion` false (faux négatif, voir DESIGN.md point 36), audit 0 FAIL / 3 WARN (deux phrases répétées issues des données réelles, sitemap non trouvé à la racine de QA alors que `sitemap-index.xml` est présent sous la base).

## Corrections de la passe QA
- Barre de régie mobile : time-code et mot collés (« 18:30RIDEAU », « 18:3029 € ») ; doublon avec la régie en ligne. Corrigé et vérifié.
- Survols absents : logo de l'en-tête et téléphone du pied. Corrigé, `noHoverChange` vide.

## Points non résolus
- [Jury] Aucun score indépendant : lancer `/jury` avec un critique neuf.
- [Repos] `idleMotion` false à la mesure `shoot.mjs` malgré la dérive de la poursuite (0,6 à 1,3 % des pixels en 1,5 s) ; `mobile.settledMs` null.
- [Ship] `public/og.png` reste la capture provisoire du hero (phase 1), `og.mjs` non relancé.
- [Carte] Au téléphone, deux menus aux mêmes prix montrent deux régies identiques l'une sous l'autre (données réelles).

## Placeholders et hypothèses (à remplacer par le client)
- Aucun élément fictif (`placeholder: true` : 0).
- Données douteuses non corrigées : horaires de la FAQ du site actuel incohérents avec les spectacles ; adresse BCE à Jambes contre Rue Lelièvre 4 à Namur ; cheffe 2026 non confirmée ; heure du spectacle du soir non publiée (le site écrit « après le repas ») ; boissons sans prix.

## Décisions de théâtre
Pas de loader ni de WebGL. Repos : horloge de régie de l'en-tête et poursuite du hero. Rideau plissé en transition de page. Accessoire retiré : aucun dans cette passe (à faire après la note jury).

## Leçons structurelles
Un `[hidden]` posé par JS sur un élément dont la classe fixe `display` ne cache rien : ajouter `.x > [hidden] { display: none }` (recopiée dans agents/lecons/construction.md).
