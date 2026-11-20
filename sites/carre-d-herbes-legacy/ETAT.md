# ETAT · carre-d-herbes · legacy · construction phase 2/3 (20/11/2026)

## Fait (phases 1 et 2)
- Phase 1 : audit, design, 9 pages, données réelles, 13 photos (voir `DESIGN.md`, `AUDIT.md`).
- Phase 2 : boutons à huit états (un primaire rempli par page, nav en contour), nav avec menu `popover` sous 67,5 rem, skip link, formulaire `/reservations/` avec validation blur/input et message « Rien n'a été envoyé », switcher avec Début/Fin, signature d'ouverture CSS (assiette qui se pose, titre/texte/actions décalés), un reveal de scroll (`.js [data-reveal]`, posé par script dans `Base.astro`), mouvement réduit, responsive 60/40 rem, `(hover: hover)`, `(pointer: coarse)`, safe-area, surfaces thémées. Corrections sloplint (24a, 34 skip, 40 pied, 49b).
- Mesuré (Playwright maison) : aucun débordement horizontal à 375/768/1000/1100/1440 sur 8 pages ; menu ouvre/ferme (Échap) ; formulaire : erreurs, focus sur le premier champ invalide, message non relié ; JS coupé : panneaux et sections visibles ; reduced motion : rien caché.
- Build OK : `dist/carre-d-herbes/legacy/` (9 pages, KywFooter et noindex présents).

## Reste (phase 3)
- Captures complètes et audit (agent captures), contraste mesuré sur toutes les pages, RAPPORT.md, entrée finale du Sweep dans le journal, `og.jpg` et JSON-LD (pas de GPS : ne pas en inventer).
- Revue de hero par sous-agent non faite (pas d'outil Agent) : auto-revue notée `self`.
- Commit des fichiers du site et de `dist/carre-d-herbes/legacy/` ; `pnpm index` ensuite.

## Pièges
- `sloplint src` : FAIL 34 sur `Base.astro` = faux positif (`overflow-x: clip` dans `base.css`).
- Lien du pied KYW (24 px) : paquet partagé, non modifiable.
- Dev server tué (PID 8596). Le reveal met `data-reveal` sur les `.section > .container` sous le premier écran ; une capture pleine page sans défilement les verrait cachées jusqu'au premier scroll/resize (le défilement par à-coups fonctionne).
- Hypothèse : le formulaire est le formulaire de contact de l'original (réservation par téléphone) ; couverts en `select` 1 à 12 et « Plus de 12 ».
