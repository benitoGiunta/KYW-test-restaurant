# Monepi Boulangerie : variante awwwards
**Concept** : « Extraction », le taux d'extraction de la farine (65 à 80 %) comme jauge, grains de farine et rideau suie. **Stack** : Astro 5 + GSAP + Lenis, sans OGL (aucun GL : concept typographique et photo). Base `/mon-epi/awwwards/`.
**Lancer** : `scripts/q.sh build pnpm build:site sites/mon-epi-awwwards` puis `node .claude/skills/awwwards/scripts/serve.mjs <racine QA> --port 4400`.

## Scores du critique jury
Non obtenus : pas d'outil Agent ni de critique neuf dans cette session. Self-score, non indépendant : aucune note chiffrée donnée, seules les mesures ci-dessous font foi. Une passe de corrections, pas de seconde passe de critique (critère 61 non rempli).

## Mesures (passe finale, build du 27/11)
- Accueil / histoire / réservation : LCP mobile 936 / 892 / 884 ms (img, img, p), CLS 0 / 0,011 / 0,011, loaderMs null (pas de loader), settledMs 2398 / 2353 / 2317, FPS 60 desktop et mobile, axe sérieux 0, overflowX false, 0 erreur console, 0 requête échouée, réduit : hiddenText 0, moving false, noHoverChange vide, smallTargets null, idleMotion true (accueil seul : grains).
- Carte et 404 : mesures de l'agent captures (passe build), 0 erreur, LCP mobile 876 / 240 ms ; noHoverChange traité (voir corrections).
- Audit : 0 FAIL, 1 WARN (« no sitemap » : faux positif, `sitemap-index.xml` présent sous la base). Poids : page la plus lourde 775 Ko, JS 61 Ko gz, image max < 500 Ko (og.png 645 Ko recompressé à 143 Ko), aucune ttf/otf.

## Corrections de la passe
- Échelle du pied mobile : « 65 / % » coupé sur deux lignes, corrigé (`white-space: nowrap`, `clamp(1.8rem, 8.4vw, 4rem)`), vérifié par capture `m-06`.
- Titre de l'accueil 71 caractères : raccourci (WARN supprimé).
- Marque (lien d'accueil) et boutons de la 404 : traitement au survol ajouté (noHoverChange).
- og.png recompressé (645 à 143 Ko).

## Points non résolus
- [a11y] 404, `.kyw-footer__note` contraste 4,36:1 (#6b787d sur #fbfaf8) : composant du paquet `kyw-footer`, hors périmètre.
- [hover] carte, lien « Carte » du menu sur la page carte : état courant déjà souligné, pas de changement au survol (voulu).
- [qa] Carte et 404 non recapturées après correction (changements CSS globaux vérifiés sur l'accueil et le build) ; 404 rendue par `serve.mjs` pour la sonde, pas la vraie 404.html.
- [jury] Critique indépendant à lancer : `/jury` sur le site.

## Placeholders et hypothèses (à remplacer par le client)
Aucun contenu fictif. Hypothèse : boulangerie, « Commander » (tel:) remplace « Réserver » ; seul horaire publié : vendredi 9 h à 18 h. Titre d'accueil : « Pain au levain cuit au feu de bois, Loyers » (formulation d'agence).

## Décisions de théâtre
Pas de loader (premier frame = le chiffre), pas de GL, pas de curseur suiveur ; repos = grains de farine. Accessoire retiré : aperçu photo au survol des lignes de carte (remplacé par le filet de farine, phase 2).

## Leçons structurelles
`data/usage/test-3/lecons-proposees/mon-epi.md` (nowrap des « % » en grille mobile ; QA-build ne couvre pas toutes les pages).
