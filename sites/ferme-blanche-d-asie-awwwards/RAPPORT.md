# La Ferme Blanche d'Asie : variante awwwards
**Concept** : une table ronde, les plats se posent au centre et on les fait tourner d'un cran pour se servir. **Stack** : Astro 5 + GSAP + Lenis (OGL non : aucun besoin de GL, le plateau est du SVG et du CSS). Base `/ferme-blanche-d-asie/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/ferme-blanche-d-asie-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Self-score, non indépendant : pas d'outil Agent en session d'agent, aucun critique neuf n'a été lancé, aucune note chiffrée n'est donnée. Une seule passe de QA sur preuves (captures et audit) ; la passe jury indépendante reste à faire (`/jury` sur l'URL de production).

## Mesures (passe finale, serveur de QA 4431, arrêté)
| Mesure | Accueil | Réservation |
|---|---|---|
| LCP mobile | 1120 ms (texte) | 1052 ms |
| CLS | 0 | 0 |
| loaderMs | null (pas de loader) | null |
| settledMs | 2526 | 2303 |
| scrollFps bureau | 60 | 60 |
| Console / requêtes en échec | 0 / 0 | 0 / 0 |
| overflowX bureau et mobile | non | non |
| Texte caché, mouvement en réduit | 0, false | 0, false |
| idleMotion | true | false (page de lecture) |
| noHoverChange | vide (corrigé) | « Réserver » courant |
| colorOnly | vide | « Appeler » : remplissage conique qui inonde le bouton, un traitement |
Audit : 0 FAIL, 5 WARN. Poids : page la plus lourde 1100 Ko, JS 60 Ko gz, polices 55 Ko, images 974 Ko au total.
Carte (capture de l'agent captures, build identique hors CSS de la marque) : 0 erreur, 0 requête en échec, LCP 1088 ms, axe sérieux 0.

## Corrections de la passe
- `noHoverChange` du lien de marque : le sceau tourne d'un quart et se remplit d'or au survol et au focus (`src/styles/site.css`). Vérifié : accueil sans `noHoverChange`.

## Points non résolus
- [audit] WARN « phrase répétée » : carte (« Mise en bouche : salade de bœuf et avocat. » figure dans deux menus à prix fixe réels) et horaires de la réservation (tableau et bloc de contact) : données réelles répétées, justifiées.
- [audit] WARN « no sitemap » : `sitemap-index.xml` est généré au build (`dist/.../sitemap-index.xml`), absent de la racine de QA ; « no robots.txt » justifié par le meta noindex.
- [jury] Pas de critique indépendant, pas de score ; ce qui le résoudrait : `/jury` avec un critique neuf.
- [phase 1] `enonce__photo` hors flottaison ; CTA du hero sous la flottaison à 1024x768.
- [carte, réservation] idleMotion false : repos du plateau seulement sur l'accueil.

## Placeholders et hypothèses (à remplacer par le client)
Aucun placeholder : aucune donnée inventée. Données douteuses à faire confirmer : plat n° 2, fourchettes de prix, histoire, chef et année absents (inconnus).

## Décisions de théâtre
Pas de loader (aucun besoin de masquer un chargement), pas de GL ni de curseur suiveur (le concept tient en SVG et CSS), repos : anneau à 3 degrés par seconde sur l'accueil. Accessoire le plus faible : l'anneau d'or de la transition (non retiré).

## Leçons structurelles
Voir agents/lecons/construction.md (2026-11-09 awwwards phase 3).
