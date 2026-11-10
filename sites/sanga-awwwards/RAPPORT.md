# Sanga : variante awwwards
**Concept** : 山河 (montagnes et rivières), un fleuve vermillon qui descend la page et remplit le sceau de chaque strate. **Stack** : Astro 5 + GSAP + Lenis, sans OGL (aucun GL : le fleuve est du clip-path). Base `/sanga/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/sanga-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non réalisés : l'outil Agent n'est pas disponible dans ce rôle, donc aucun critique neuf, aucune carte de score. Pas de note inventée. Une passe `/jury` indépendante reste à faire (critères de sortie 61 à 63 non prouvés).

## Mesures (passe finale, après corrections)
- Accueil et carte, `report.json` : 0 erreur console, 0 requête échouée, CLS 0, pas de débordement horizontal.
- Carte après correctif : axe sérieux 0, `smallTargets` vide, `noHoverChange` vide, `invisibleFocus`/`noVisibleFocus` vides, pas `stuck`, `reduced.hiddenText` 0 et `moving` false, `idleMotion` true, FPS défilement 60 (GPU logiciel, plancher), LCP carte 1128 ms (h1, texte).
- Avant correctif, accueil : LCP mobile 1392 ms (img), CLS 0.
- Audit : 0 FAIL, 1 WARN (`no sitemap` : la racine de QA n'a pas de sitemap à sa racine ; `sitemap-index.xml` est dans `dist/sanga/awwwards/`). Le WARN « no robots.txt » est résolu par la racine de QA.
- Poids : page la plus lourde 364 Ko, JS 61 Ko gz, CSS 6 Ko gz, aucune image > 500 Ko, aucune police ttf/otf.
- Meta robots : présent sur toutes les pages (grep vide) ; mention « Maquette KYW » rendue.

## Corrections de la passe
1. Axe `label-content-name-mismatch` sur `.tete__marque` : `aria-label` retiré (le nom vient du texte « Sanga », le kanji est `aria-hidden`).
2. Cibles tactiles de 18 à 21 px (liens `.lien`, `.lien-util` du pied et des strates) : zone portée à plus de 24 px par `padding-block` compensé par une marge négative.
3. Survols sans effet (marque, numéro du pied, lien de page courante) : traitements ajoutés.

## Points non résolus
- [a11y] `contrastNeedsReview` (83 accueil, 131 carte) : à relire à l'œil ; vermillon `#e8512f` sur indigo (4,6:1) et sceau de l'en-tête non revérifiés.
- [outil] `skipLinkFirst` reste false : le détecteur cherche « skip » ou `#main` dans le libellé, or le lien est « Aller au contenu » (premier arrêt, vérifié dans le parcours clavier). Faux négatif.
- [audit] La page 404 du serveur de QA n'a pas de h1 (page de repli du serveur, pas celle du site, qui a son h1).
- [jury] Pas de critique neuf (voir plus haut).
- Mobile non recapturé après correctifs (modifs CSS non structurantes).

## Placeholders et hypothèses (à remplacer par le client)
Aucun placeholder détecté (« lorem », « example.com », « TODO »). Photos et horaires à confirmer par le restaurant (mention « données illustratives » en pied). Liens plan et commande de `src/data/site.ts` à confirmer.

## Décisions de théâtre
Pas de loader, pas de GL, pas de curseur suiveur. Repos : courant de tirets du fleuve. Accessoire retiré : non fait (pas de passe critique).

## Leçons structurelles
`planche.py` ignore `--colonnes`/`--largeur` ; `skipLinkFirst` ne reconnaît pas un libellé français.
