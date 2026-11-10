# Le Grill des amiS : variante awwwards
**Concept** : « Du brut au feu », la lame tranche la photo, la braise prend sur le S de « amiS ». **Stack** : Astro 5 + GSAP + Lenis, sans OGL (aucun besoin de GL, contraire au verbe « trancher »). Base `/grill-des-amis/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/grill-des-amis-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non produits : pas d'outil Agent en session, et le QA-build.md de l'agent « captures » n'existait pas (shoot complet échoué : navigateur fermé, voir `.logs/grill-des-amis-awwwards-build-shoot.log`). Aucun score chiffré inventé. Passe unique de QA par mesures (self, non indépendante) : shoot ciblé des 4 pages (accueil, carte, histoire, réservation) + audit global. Le critique indépendant reste à lancer par le superviseur.

## Mesures (passe finale, serveur de production)
- LCP mobile 1196 / 1064 / 1036 / 1028 ms (accueil, carte, histoire, réservation) ; CLS ≤ 0,005 ; loaderMs null (pas de loader).
- settledMs : accueil 2581, autres 2332 à 2587 ; idleMotion accueil true (lame braise) ; scrollFps 60 desktop et mobile.
- axe sérieux 0 ; erreurs console 0 ; requêtes échouées 0 ; reduced : hiddenText 0, moving false ; noVisibleFocus et invisibleFocus vides, pas de `stuck`.
- noHoverChange vide sur les 4 pages ; colorOnly restants : « Ouvrir le plan » (lien secondaire de contact), « 081 61 72 60 » (réservation), « La carte » (nav : couleur + soulignement épaissi).
- Poids page la plus lourde : 922 Ko (JS 61 Ko gz, polices 138 Ko, images 711 Ko). Audit : 0 FAIL, 2 WARN.

## Corrections faites en phase 3
1. Accueil `settledMs` null : la respiration de la photo du hero (scale sinusoïdal) changeait plus de 1 % des pixels par 400 ms. Supprimée (`tranche.ts`), la lame braise reste le repos. Vérifié : settledMs 2581, idleMotion true.
2. Survol sans effet sur le lien de la rubrique courante (« Les entrées », « La carte ») : le soulignement était déjà plein. Survol : soulignement 4 px + accent (`site.css`, `.nl` et `.carte-nav a`). Vérifié : noHoverChange vide.

## Points non résolus
- [Usability] `keyboard.skipLinkFirst` = false : faux négatif du contrôle (regex `skip|#main|#content` sur le libellé français « Aller au contenu »). Le lien est bien le premier arrêt clavier (`stops[0]`).
- [Content] WARN « sentence repeated 2x : Les grillades au feu de bois » : nom de rubrique, présent dans la bande de navigation et le titre h2. Justifié.
- [SEO] WARN « no sitemap » et « no robots.txt » : racine de QA temporaire ; `sitemap-index.xml` présent dans `dist/` et lié ; noindex porté par le meta.
- [Jury] Aucun critique neuf, scores non chiffrés, à faire.
- `og.png` non recomposée (existant conservé).

## Placeholders et hypothèses (à remplacer par le client)
- Carte : 68 plats tirés du PDF du client, `placeholder: false` partout. Horaires, photo des patrons : voir ETAT.md phase 1 et DESIGN.md. Identité à confirmer par le client (site.ts, commentaire 3).
- Mention « Maquette KYW, certaines données sont illustratives » et pied KYW présents.

## Décisions de théâtre
Pas de loader, pas de GL, pas de curseur suiveur. Repos : lame braise seule. Accessoire retiré : la respiration de la photo du hero.

## Leçons structurelles
Voir `agents/lecons/construction.md` (2026-11-10).
