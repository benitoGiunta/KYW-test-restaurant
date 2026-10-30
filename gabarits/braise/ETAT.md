# ETAT braise (mis à jour par l'agent portfolio-gabarit)

## Fait
- DESIGN.md complet ; scaffold copié du socle ; package.json renommé.
- public/ : fonts (Melodrama, Literata), photos WebP, couches/ (fond, piece, garniture, sauce via scripts/couches.mjs), og.jpg, favicon, robots.
- src/data/site.ts partiellement enrichi ; tokens.css commencé.

## Reste
- Design : tokens.css, base.css, motion/setup.ts + motion/braise.ts (driver --temp), composants, pages, QA, apercu, FICHE, RAPPORT.

## 30/10 (suite) : écrits base.css, motion/braise.ts (driver), setup.ts, Header, Loader, Thermo, Barre, Footer, Base.astro (fonts, halo, grain, vignette). Reste : pages, build, QA.
- Build passe (6 pages). QA en cours port 4401.
- shoot en cours : sortie dans .shots/braise (le dossier .shots est partagé avec les agents frères : toujours --out .shots/<id>).
- Bug corrigé : tempAt avant buildKeys (Lenis émet scroll avant onPage) bloquait le loader. Console 0 erreur sur 6 pages. Shoot accueil relancé (.shots/braise).
- Corrections : liste cuisson (bouton dans la colonne 2.5rem), marquee nowrap, aria-label des boutons, thermo mobile visible, chiffres en Literata (zéro barré de Melodrama). Reste : shoot des pages internes, audit 2, apercu, RAPPORT.
