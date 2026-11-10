# Le 54 : variante awwwards
**Concept** : « Trente-quatre couverts », le plan de salle dressé place par place, qui suit le nombre de couverts de la réservation. **Stack** : Astro 5 + GSAP + Lenis, sans OGL (pas de GL : la table joue la retenue). Base `/le-54/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/le-54-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Self-score, non indépendant : aucun critique neuf (outil Agent absent) ; une seule passe de QA sur preuves, pas de score chiffré. Le superviseur doit ajouter `Agent` aux outils pour la passe critique.

## Mesures (QA-build de l'agent captures + audit final)
- LCP mobile 1032 ms (h1 texte), CLS 0, loaderMs null (pas de loader), settledMs 2445 ms, FPS desktop 60 (rendu logiciel), 0 erreur console, 0 requête échouée, pas de débordement horizontal, 0 violation axe, `reduced` : 0 texte masqué, rien ne bouge, idleMotion true.
- Audit final : 0 FAIL, 1 WARN (« no sitemap » : sitemap-index.xml présent dans le build et lié par `<link rel="sitemap">`, la racine de QA n'a pas de /sitemap.xml). Poids page la plus lourde ~548 Ko, JS 61 Ko gz, images 398 Ko, aucune police ttf/otf.
- Réservation (shoot ciblé après correction) : LCP 988 ms, 0 axe, pas de débordement.

## Corrigé en phase 3
- Réservation : l'horaire était répété 5 fois (WARN « sentence repeated ») ; créneaux dits une fois, lignes « Midi et soir ».
- OG recomposé (nom, accroche, plan dressé, sans interface) depuis la page servie.

## Points non résolus
- [Jury] pas de critique indépendant ni de score : à faire par le superviseur.
- [Captures] la « 404 » du crawl est la page de repli de serve.mjs (`<pre>`, sans titre/lang/h1), pas `404.html` du site (lang fr, titre, h1 présents) : faux positif de l'outil.
- [Clavier] `skipLinkFirst` false : faux négatif connu (regex anglais), le premier arrêt est bien « Aller au contenu ».
- [Contraste] `contrastNeedsReview` (7 à 9) non relus un par un.
- [Réservation] pas de dossier de captures complet (shoot ciblé seulement, hovers sautés).
- Survol de la carte : 1 cible en couleur seule signalée par l'agent captures, non relue.

## Placeholders et hypothèses (à remplacer par le client)
- Plan de salle illustratif (disposition inventée, 34 couverts, dix tables). Horaires d'après le site du restaurant, certaines lignes « à confirmer ». Photos : crédit restaurant. Mention « Maquette KYW » rendue par le pied de page.

## Décisions de théâtre
Pas de loader, pas de GL, pas de curseur suiveur. Repos : place cherchée + halo. Accessoire retiré : non fait (pas de passe jury).

## Leçons structurelles
Voir agents/lecons/construction.md.
