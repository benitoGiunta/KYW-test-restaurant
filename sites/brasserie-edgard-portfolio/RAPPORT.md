# RAPPORT QA : brasserie-edgard / portfolio (phase 3)

## Résultat
- Build final : ok (7 pages, `dist/brasserie-edgard/portfolio/`). Audit de l'agent captures : 0 FAIL, 15 WARN ; console 0 erreur ; aucun débordement horizontal ; LCP desktop < 100 ms, CLS < 0,01.
- Planche d'accueil (desktop, transitions, mobile) lue : aucun défaut visuel bloquant.

## Corrections
- Meta description par défaut ramenée de 182 à 133 caractères (cible 50-160).
- /groupes/ : saut h1 vers h3 corrigé par un `h2.sr-only` « Les menus ».
- CSS mort des avis (`.avis__*`, `.carte-avis*`) supprimé de base.css.
- Vérifié sur build servi (1440) : hiérarchie des titres, longueur des descriptions (133 à 149), scrollWidth = 1440, 0 erreur console, capture de /groupes/ correcte.

## Non corrigé (faux positifs ou hors périmètre)
- 404 : axe contraste et cible 128x20 viennent de la 404 brute de serve.mjs ; `404.html` du site a h1, title et lang.
- WARN robots.txt, sitemap, `skipLinkFirst`, phrases répétées (horaires) : faux positifs connus ou contenu volontairement répété.
- LCP mobile accueil 3,3 s sous throttling : à surveiller (hero chargé par loader), non traité.
- Objets SVG à 768 px légèrement coupés à droite (overflow clip, pas de scroll) : non revu.

## Placeholders
- `site.ts` : 2 entrées `placeholder: true` (données fictives plausibles, voir DESIGN.md) ; `carte.json` et `suggestions.json` : 0. Aucun avis, récompense ni chiffre inventé (section avis retirée).
