# RAPPORT — escale-en-vue · portfolio (QA, phase 3/3)

## Résultat QA (captures de l'agent « captures », QA-build.md)
- Console 0 erreur, 0 requête en échec, 0 débordement horizontal, 0 texte caché, clavier OK (12 arrêts), FPS 60, axe 0 violation sur accueil et carte.
- LCP desktop/mobile : accueil 68 / 1128 ms, carte 96 / 1084 ms. CLS accueil 0,063 desktop (< 0,1, accepté). Page la plus lourde ~737 Ko.
- Audit : 0 FAIL, 7 WARN, tous classés ci-dessous.

## Corrections
Aucune correction nécessaire : les trois constats du QA sont des faux positifs.
- 404 (axe color-contrast 4,36:1 ; cible tactile 128x20) : réponse brute de `serve.mjs`, pas la page du site (`#6b787d` absent du CSS/HTML construit). Vérifié par capture ciblée de `/escale-en-vue/portfolio/404.html` : axe 0, console 0.
- WARN « Horaires du jour… » répété : le marquee est dupliqué par construction (boucle continue), texte `aria-hidden` côté copie.
- WARN robots.txt / sitemap sous `base` : faux positifs connus ; `robots.txt` et `sitemap-index.xml` existent dans `dist/escale-en-vue/portfolio/`.
- Rebuild : `build-site.mjs` OK, 6 pages. noindex présent.

## Placeholders
- Carte d'exemple : 12 plats et tous les prix fictifs (marqués `*` / `placeholder: true`).
- Parking gratuit « à confirmer » ; coordonnées GPS (centre de carte du site actuel, à confirmer).
- Adresse « Dave (Namur) » ; e-mail `info@escale-en-vue.be` (site actuel). Saison 2026 présentée comme terminée, aucune date 2027.
- Plats du jour (parmigiana, tagliatelles, poulet) issus de posts Facebook, sans prix. Notes tierces non vérifiées, source affichée.

## Points ouverts
- Marquee en mode « ouvert » non testé (pas de date de saison). Table à 1024x768 / 1280x720 non revue visuellement. OG sans texte.
- Pages carte/histoire/terrasse/réservation : pas de relecture visuelle fine.
- Gabarit guinguette non modifié (défauts `data-split="lines,words"`, `.table__rail`) : voir data/usage/test-1/lecons-proposees/escale-en-vue.md.

## Leçons structurelles
Voir lecons-proposees/escale-en-vue.md (404 brute de serve.mjs).
