# RAPPORT QA : Don Dino, variante awwwards

Self-score, non indépendant : pas d'outil Agent en session, aucun critique neuf lancé (une seule passe de QA ciblée, pas de score jury).

## Corrections (vérifiées par capture ciblée, accueil et 404.html)
- `color-contrast` `.tete__sept` (blanc sur #e2452f, 4,09:1) : fond passé à `--c-papier-accent` (#b02a18). Axe accueil : 0 violation.
- `label-content-name-mismatch` du lien logo : `aria-label` retiré (nom accessible = « Don Dino », pastille 7/7 en aria-hidden). Axe accueil : 0 violation.
- 404 : `kyw-footer__note` (4,36:1) mesuré sur la réponse brute de `serve.mjs` ; sur `404.html` réelle, axe = 0 violation (le paquet kyw-footer n'est pas modifié).

## Mesures finales
- Build OK ; `audit.mjs` : 0 FAIL, 2 WARN (robots.txt et sitemap absents de la racine de QA, justifiés : meta noindex partout, grep `name="robots"` vide, `sitemap-index.xml` présent).
- Accueil et 404 : 0 erreur console, 0 requête échouée, `contrastNeedsReview` 4 et 3 (non relus un par un).
- LCP mobile accueil 1260 ms, CLS 0, page la plus lourde ~688 Ko, aucune ttf/otf.
- `idleMotion` = false : l'immobilité au repos est assumée (trotteuse seule, petite). Écart connu.

## Non fait / écarts
- Pas de critique jury indépendant ni de seconde passe (limites de session) : scores non établis.
- Cible tactile (404, 1 petite cible) non corrigée : à revoir.
- Vérifications plein écran (planches) non relues une à une.

## Placeholders et données douteuses
- Aucun placeholder fictif (`placeholder: true` absent) ; desserts, boissons et vins non affichés (absents de la carte PDF).
- Douteux : « 20 pizzas dès 9,30 € » (site) contre 26 pizzas de 10,50 à 17,80 € (carte PDF, retenue) ; note Google non affichée ; photo 09 jamais nommée Dino.
- Hypothèse : la ligne d'état suppose des horaires réguliers (jours fériés et fermetures exceptionnelles inconnus).
