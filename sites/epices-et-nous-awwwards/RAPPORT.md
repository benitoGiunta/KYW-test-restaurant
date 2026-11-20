# Épices & Nous : variante awwwards
**Concept** : le nom arrive en deux moitiés (cuisine, salle) et le « & » est le passe qui les relie. **Stack** : Astro 5 + GSAP + Lenis, sans OGL (pas de GL). Base `/epices-et-nous/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/epices-et-nous-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non réalisés : cette passe n'avait ni outil `Agent` ni passe jury (phase de test, 40 réponses). Aucun score inventé. Deux passes avec critique neuf restent à faire (`/jury`).

## Mesures (passe finale, captures ciblées accueil et réservation)
- Audit : 0 FAIL, 1 WARN (sitemap absent de la racine de QA : justifié, `sitemap-index.xml` présent dans `dist/`, robots.txt de QA posé par la racine temporaire).
- LCP mobile : accueil 932 ms, réservation 2296 ms (carte 2124 ms avant corrections). CLS 0. Console 0 erreur, 0 requête échouée, pas de débordement horizontal, réduit : 0 texte caché.
- axe : 0 violation sur accueil et réservation. FPS desktop 60, `idleMotion` true, `settledMs` 2266 à 2296.
- Poids : page la plus lourde ~1019 Ko, JS 61 Ko gz.

## Corrections de cette passe
- `smallTargets` : 7 (accueil), 6 (carte), 1 (404) puis 0 : `.lien` et `.lien-util` en `inline-flex` avec `min-height` 1,75 rem (`site.css`).
- Réservation : phrase « Ouvrir le plan » et horaires répétés (page + pied) : le pied n'affiche plus plan ni horaires sur cette page (`Footer.astro` reçoit `page`).

## Points non résolus
- [clavier] `skipLinkFirst` reste false : le lien est bien le premier arrêt (« Aller au contenu »), mais le contrôle cherche `skip|#main|#content` dans le libellé français. Faux positif, non corrigé.
- [axe 404] contraste `.kyw-footer__note` (#6b787d, 4,36:1) vu une fois sur la page 404 du crawl d'avant ; absent des captures finales, composant `packages/kyw-footer` non modifié (hors périmètre). À revérifier.
- [captures] la 404 photographiée via une URL absente de la racine de QA donne 5 requêtes en échec (chemins hors base) : artefact du serveur, pas du site.
- [jury] pas de critique ni de score ; carte non réalisée.
- [non fait] image OG et favicon : présents depuis la phase 1, non rejugés ; `pnpm index` fait, pas de `[publier]`.

## Placeholders et hypothèses (à remplacer par le client)
- Aucune photo n'est rattachée à un plat précis : pas d'aperçu de plat sur la carte.
- Réservation en ligne : renvoie au site actuel du restaurant (epicesetnous.com). Données de la maquette illustratives.

## Décisions de théâtre
Loader non, GL non, curseur natif. Repos : pastille qui descend l'axe et « & » qui oscille. Accessoire retiré : non fait (pas de passe finale).

## Leçons structurelles
Voir `data/usage/test-1/lecons-proposees/epices-et-nous.md`.
