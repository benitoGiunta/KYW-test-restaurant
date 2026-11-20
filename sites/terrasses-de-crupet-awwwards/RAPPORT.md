# Les Terrasses de Crupet : variante awwwards
**Concept** : « Les miroirs ronds », chaque photo s'ouvre en hublot rond (verbe ouvrir). **Stack** : Astro 5 + GSAP + Lenis, sans OGL (pas de WebGL, justifié dans la Concept Card). Base `/terrasses-de-crupet/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/terrasses-de-crupet-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non produits : l'outil Agent n'était pas disponible à cette passe et aucun critique indépendant n'a été lancé. Pas d'auto-notation inventée, pas d'estimation jury. À faire : `/jury <url>` avec un critique neuf.

## Mesures (passe finale, accueil sauf mention)
LCP mobile 1972 ms (img), CLS 0, loaderMs null (pas de loader), settledMs 2602, FPS 60/60 (plancher GPU logiciel), axe 0 (accueil, réservation, 404), overflow non, hiddenText 0, moving false, idleMotion true, smallTargets vide (accueil, réservation, 404), 0 erreur console. Audit : 0 FAIL, 1 WARN. noHoverChange vide sur l'accueil (passe captures) ; 404 h-01/h-02 non revérifiés (hover 0 en passe ciblée).

## Corrigé en phase 3
- axe `label-content-name-mismatch` : `aria-label` retiré du lien `.brand`.
- Cibles tactiles 21 px : `a.text` et liens du pied en inline-block avec padding vertical.
- Méta descriptions accueil et réservation sous 160 caractères.
- Phrase répétée (adresse) : pied de page en « Rue Basse 13, 5330 Crupet ».
- OG composée depuis le hero réel (nom, salle aux miroirs, lisible).
- Contraste 404 (#6b787d, 4,36) : valeur transitoire (fondu), axe à 0 après rebuild.

## Points non résolus
- [Jury] aucun score indépendant, voir ci-dessus.
- [Audit] « no sitemap » : sitemap présent dans `dist/.../awwwards/sitemap-index.xml`, pas à la racine de la racine de QA ; justifié. `robots.txt` géré par le dépôt, meta noindex présent.
- [Clavier] `skipLinkFirst` faux : faux négatif connu, le premier arrêt est bien « Aller au contenu ».
- [404] hover h-01/h-02 non revérifiés après correction.
- Retrait d'accessoire non fait faute de critique.

## Placeholders et hypothèses (à remplacer par le client)
Aucun `placeholder: true`, 0 lorem/example.com/TODO. Hypothèses : adresse de Crupet, e-mail du site client, parking et accès renvoyés au téléphone (le dossier dit « inconnu »), pas d'histoire ni d'équipe ni d'avis. Photos du client, crédit en pied.

## Décisions de théâtre
Pas de loader, pas de GL. Repos : éclat de lampe sur le grand miroir.

## Leçons structurelles
Proposées dans `data/usage/test-1/lecons-proposees/terrasses-de-crupet.md` (mode figé).
