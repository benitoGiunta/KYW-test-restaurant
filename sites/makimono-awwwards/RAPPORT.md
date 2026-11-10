# Makimono : variante awwwards
**Concept** : « Le déroulé », un site qui se déroule comme un makimono (rouleau de nori, titres qui se chassent de 62 à 125 %, transition rideau). **Stack** : Astro 5 + GSAP + Lenis, sans OGL (aucune scène GL nécessaire, pas de photo par roll). Base `/makimono/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/makimono-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs sites/makimono-awwwards/.qa-root --port 4400`.

## Scores du critique jury (passe finale, auto-notation)
Self-score, non indépendant : aucun outil Agent en session d'agent, donc pas de critique neuf (une seule passe, estimée sur les captures et l'audit).
| Critère | Score | Preuve |
|---|---|---|
| Design (40 %) | 8 | planche accueil : hero MAKIMONO 125 %, bandes nori/riz, photos réelles du restaurant |
| Usability (30 %) | 8 | 0 cible petite, focus visible, lien d'évitement en premier arrêt (`keyboard.stops[0]`), appel et carte au premier écran |
| Creativity (20 %) | 8 | chasse typographique, rideau de nori à bord cylindrique, reflet au repos |
| Content (10 %) | 8 | données réelles, aucune invention ; pages courtes (a-propos sans histoire inventée) |
| Sem/SEO | 8 | un h1, JSON-LD Restaurant, canonical, sitemap lié |
| Anim | 8 | `idleMotion` true, 60 fps, réduit sans texte caché |
| A11y | 9 | axe 0, 0 focus invisible, contrastes vus |
| WPO | 9 | JS 60 Ko gz, page 971 Ko, LCP mobile 1,0 à 1,5 s |
| Responsive | 8 | 0 débordement 1440 et 390 |
| Markup | 8 | audit 0 FAIL |
Pondéré auto-noté 8,1. Estimation jury « environ 9,2 » (critique + 1,1), à confirmer par un critique indépendant. Lecture de l'idée : non vérifiable sans critique neuf. Une passe seulement (écart au prompt : 2 passes minimum, faute d'outil Agent).

## Mesures (passe finale)
LCP mobile 1548 ms (accueil, img), 1044 (réservation), 1052 (a-propos) ; CLS 0,003 / 0 / 0,012 ; loaderMs null (pas de loader) ; settledMs 3,8 à 4,2 s ; FPS 60 desktop et mobile ; axe sérieux 0 (la 404 brute de `serve.mjs` signale title/lang : faux positif, voir 404.html) ; overflow aucun ; noHoverChange vide ; colorOnly : liens `tel:` et mailto, voir ci-dessous ; idleMotion true ; audit 0 FAIL, 4 WARN.

## Points non résolus
- [WARN audit] `/carte/` : 3 « sentence repeated » (« dès 8,20 € Choisir la protéine Saumon 8,50 € » etc.) : deux rolls distincts partagent le même prix et les mêmes protéines. Justifié, données réelles.
- [WARN audit] « no sitemap » et « no robots.txt » : artefact de la racine de QA sous `base` ; `sitemap-index.xml` présent dans `dist/makimono/awwwards/`, robots couvert par le meta noindex.
- [colorOnly] liens `tel:` géants et mailto : le traitement est réel (largeur de chasse 100 vers 125 %, soulignement, couleur ; capture `reservation/h-02-*`), le détecteur ne le mesure pas en pixels. Lu à l'œil, accepté.
- [Score] pas de critique indépendant : `/jury http://127.0.0.1:4400/makimono/awwwards/` à lancer par le superviseur.

## Placeholders et hypothèses (à remplacer par le client)
- Aucun placeholder fictif (`placeholder: true` : 0). Pas d'histoire, d'équipe ni d'avis : absents faute de données.
- Hypothèse : horaires du dossier (lundi au samedi midi et soir, dimanche soir) affichés tels quels ; footer condensé pour éviter la répétition.
- Photos : celles du restaurant (crédit « Photos : Makimono »).

## Décisions de théâtre
Pas de loader (le contenu prime, LCP < 2 s), pas de GL, pas de curseur suiveur. Repos : reflet des rouleaux après 2,5 s (`settledMs` reste non nul). Accessoire retiré : le curseur suiveur (jamais livré) ; effet le plus faible conservé et à surveiller : le reflet de repos.

## Leçons structurelles
Voir `agents/lecons/construction.md` (horaires dupliqués footer et section pratique).
