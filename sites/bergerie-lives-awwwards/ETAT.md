# ETAT : bergerie-lives awwwards, fin de la phase 1 (construction-1)

## Fait
- Brief, 3 concepts notés, Concept Card « Le Clos » (enclore, barrière à deux battants), système, plan de composition, checklist 1 à 18 : `DESIGN.md`.
- Scaffold Astro, engine verbatim (sans GL), tokens, polices Young Serif + Hanken (préchargées), `site.ts`, 23 photos du client via `<Picture>`.
- Pages : `/`, `/le-domaine/` (remplace `/carte/`), `/histoire/`, `/reservation/`, 404 ; JSON-LD `LodgingBusiness`, OG, favicon, sitemap, noindex, pied KYW.
- Build : `pnpm build:site sites/bergerie-lives-awwwards` passe (5 pages). Mesure Playwright (reduced motion) : aucun débordement horizontal, h1 à gauche ≥ gouttière ; CTA du hero visibles à 1440x900 et 1280x720, légèrement sous la flottaison à 1024x768 (798 px) et 390x844 (850 px).

## Reste (phases 2 et 3)
- Signature : barrière à deux battants (rideau `#curtain` en deux moitiés, hero), hovers d'index (vignette suivant le curseur), `src/motion/*` (rien encore hors `setup.ts`), reveals à contrôler (`data-split`, `data-reveal` posés).
- QA navigateur complète (captures, axe, clavier, LCP), RAPPORT.md, points 19 à 63 de la checklist, vérifier que `[data-split]` sur les `h1` ne masque rien sans JS.
- Faire descendre le CTA du hero dans la flottaison à 1024x768 et 390x844.
- Le fichier `og.png` est une capture du hero de la première build : à refaire en fin de phase 2.

## Décisions et pièges
- Pas un restaurant : requalifié en domaine ; `/carte/` devient `/le-domaine/`, aucun plat, horaire, tarif, avis ni réseau. Données douteuses à signaler dans RAPPORT.md : capacité 150 / 250, bâtiment XIXe (non affiché), propriétaires (Lisa et Christophe vs Lisa et Martin : seul le titre de presse est cité), restaurant « renoncé » à confirmer (« Le domaine n'a pas de restaurant aujourd'hui », fait du site actuel).
- Aucun contenu fictif : zéro `placeholder`.
- Chemins `@font-face` en `/bergerie-lives/awwwards/fonts/…` (en dur, conforme à la règle `base`).
