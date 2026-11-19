# Pizzeria Doria : variante awwwards
**Concept** : « Casiers », le mur de coffres de l'ancienne banque devient la carte (tiroirs qui coulissent). **Stack** : Astro 5 + GSAP + Lenis (sans OGL : aucune scène GL justifiée). Base `/pizzeria-doria/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/pizzeria-doria-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs sites/pizzeria-doria-awwwards/.qa-root --port 4400`.

## Scores du critique jury
Non réalisés : l'outil Agent n'est pas disponible dans cette passe de test et aucun score n'est inventé. Self-score, non indépendant : aucun. Action : `/jury <URL>` avec un critique neuf.

## QA (passe 3, sur preuves de l'agent captures + vérification ciblée)
- Seul défaut apparent du QA-build : la 404 (contraste 4,36:1, cible 128x20 « la page d'accueil »). Cause : le serveur de captures n'avait pas `404.html` à sa racine, il a servi sa page 404 générique, pas celle du site. Re-mesure sur la vraie 404 via racine QA (`.qa-root`, port 4503) : 0 violation axe, `smallTargets` vide, 0 requête échouée, capture lue (titre, 404 en plaque, deux CTA corrects). Aucune correction de code nécessaire, build inchangé (exit 0, 5 pages).
- Accueil et fiche (QA-build) : 0 console, 0 échec, 0 axe, pas de débordement, clavier sans blocage, planche accueil relue (desktop, téléphone, transition) sans défaut visible.
- Audit : 0 FAIL, 12 WARN. 10 « sentence repeated » : les horaires apparaissent dans la section et dans le pied de page (information utile, répétition voulue). « no robots.txt » : absent de la racine de QA seulement, noindex posé dans chaque page (grep vide). « no sitemap » : `sitemap-index.xml` et `sitemap-0.xml` présents dans `dist/`, non servis à la racine QA.
- Poids : accueil ~662 Ko, JS 61 Ko gz, polices woff2 uniquement, images 524 Ko au total.

## Mesures
LCP mobile 1232 ms (accueil), CLS 0 (accueil), FPS desktop 60, axe sérieux 0, overflow non, loader aucun. Non revérifiés ici : `noHoverChange`, `colorOnly`, `idleMotion` (absents du résumé QA-build ; à lire dans report.json).

## Points non résolus
- [qa] Page `/reservation/` non capturée par shoot (audit seulement) ; fiche CLS mobile non mesuré.
- [jury] Pas de score critique (voir ci-dessus).
- [qa] `contrastNeedsReview` = 4 sur la 404 : vus à l'œil sur la capture, texte sombre sur fond clair, sans défaut.

## Placeholders et hypothèses (à remplacer par le client)
- Photo du hero : photo du lieu, pas de photo de pizza ; photo de pizza en « Photo libre illustrative ».
- Suggestions de novembre 2026 et midis d'école : données fournies, à confirmer.
- Équipe : prénoms seuls ; domaine `site` = celui de KYW_SITE.

## Décisions de théâtre
Pas de loader (une carte se lit), pas de GL, repos = tiroir qui s'entrouvre après 2,6 s. Accessoire retiré : non fait dans cette passe (pas de critique).

## Leçons structurelles
Voir data/usage/test-1/lecons-proposees/pizzeria-doria.md.
