# Dumont Bouge : variante awwwards
**Concept** : « Sept à dix-huit », la journée de 7 h à 18 h tirée du défilement (règle fixe, pinceau du hero, heures). **Stack** : Astro 5 + GSAP + Lenis, sans OGL (aucun besoin de GL). Base `/dumont-bouge/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/dumont-bouge-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.
## Scores du critique jury
Non réalisés : aucun outil Agent/Skill disponible dans cette passe. Self-score, non indépendant : pas de note chiffrée annoncée ; un critique neuf reste à lancer.
## Mesures (captures de l'agent captures, QA-build.md)
LCP mobile 1836 ms (accueil, img) et 2472 (carte, limite) ; CLS 0 ; pas de loader ; FPS 60 bureau, 59 à 61 mobile ; axe 0 sur accueil et carte ; 0 débordement ; hover 7/7 changent ; idleMotion true ; réduit : 0 texte caché, 0 mouvement ; audit final 0 FAIL, 5 WARN ; JS 61 Ko gz, page 1123 Ko.
## Corrigé en phase 3
- Carte : saut h2 vers h4 supprimé (h3 pour les rubriques sans groupe).
- Citation de l'accueil : première lettre rognée à 390 (« Jumont ») par un text-indent négatif, retiré (capture ciblée vérifiée).
## Points non résolus
- [a11y] `skipLinkFirst` false : faux négatif connu de shoot.mjs (regex /skip|#main/ sur le texte « Aller au contenu ») ; le lien est bien le premier arrêt (Base.astro:71).
- [a11y] 404 : violation de contraste et cible de 128x20 viennent de la 404 du serveur statique de QA (pas de « la page d'accueil » dans notre 404.html), pas du site.
- [contenu] 4 « phrase répétée » sur la carte : plats réellement présents dans deux rubriques des données du client, conservés.
- [audit] « no sitemap / robots.txt » : racine de QA ; sitemap-index.xml présent dans dist, robots.txt du dépôt et meta noindex partout.
- [perf] LCP mobile carte 2472 ms : sous 2500 mais sans marge.
- [critique] pas de passe jury indépendante.
## Placeholders et hypothèses
Compléments marqués `placeholder: true` dans src/data/site.ts (voir grep) ; prix des gâteaux non publiés, renvoi au téléphone ; photos du client.
## Décisions de théâtre
Pas de loader, pas de GL, repos par le pinceau (idle). Accessoire retiré : aucun (passe jury non faite).
## Leçons structurelles
Voir data/usage/test-3/lecons-proposees/dumont-bouge.md.
