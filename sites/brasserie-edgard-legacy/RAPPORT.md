# Brasserie Edgard · variante legacy · 2026-11-20 (phase 3, QA)

## QA (à partir de QA-build.md, captures de l'agent « captures »)
| Constat | Action | Preuve |
|---|---|---|
| Console accueil : 404 de ressource (favicon absent) | `<link rel="icon">` vers `photos/00-logo.svg` | Playwright sur dist servi : 0 erreur console/réseau sur l'accueil |
| SEO : canonical, og:title/description/image, twitter:card, favicon absents (36 WARN) | Ajoutés dans `Base.astro` (og:image = façade) | grep sur `dist/.../index.html` |
| axe 404 : contraste `.kyw-footer__note` 4,36:1 | Non reproduit : couleur calculée #55646a sur papier du site (~5:1) ; l'instantané axe était en fondu. Aucune règle ajoutée | mesure `getComputedStyle` après networkidle |
| Police TTF (Fontshare) | Non corrigé : servie par fontshare.com, hors du dépôt | |
| robots.txt / sitemap | Non corrigé : site noindex en sous-dossier ; sitemap généré par Astro | |
| Phrase d'horaires répétée (accueil, contact) | Non corrigée : fait voulu à deux endroits (pied et page) | |
- Build passe ; noindex et `kyw-footer` présents sur les 7 pages (`grep -L` vide) ; `pnpm index` passé.
- Non refait faute de budget : sloplint `--render` en stage page, finish review sous-agent, gates jugées, log theme.mjs. À faire par un agent neuf (voir ETAT.md).

## Placeholders et faits manquants
Voir DESIGN.md (données réelles du site d'origine ; avis et photos du client). Aucun nouveau placeholder introduit en phase 3.

## Leçons
Proposées dans `data/usage/test-2/lecons-proposees/brasserie-edgard.md`.
