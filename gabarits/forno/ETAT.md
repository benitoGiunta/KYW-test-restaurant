# ETAT — gabarit forno
- [x] Socle copié, package.json renommé `gabarit-forno`, pnpm install
- [x] Polices (Big Shoulders Display 800 ; Erode 400/500 + italiques), photos 960/carrées
- [x] DESIGN.md, tokens.css, site.ts, base.css, composants (Loader, Header + Compte, Footer, Fiche), Base.astro
- [x] pages : index, carte, pates, histoire, a-emporter, reservation, 404
- [x] motion/setup.ts : loader tracé, rideau, hero, levée (--p), marquee, compte à rebours, zones de thème, carrousel, fiches
- [x] build `node scripts/build-site.mjs gabarits/forno` passe (dernier build 21:58, dist/gabarits/forno/)
- [x] QA : pré-contrôle Playwright, 2 séries shoot (port 4410, `.shots-forno/<page>`), audit 0 FAIL, corrections mécaniques faites (voir RAPPORT.md)
- [x] FICHE.md, RAPPORT.md, apercu.png, leçons dans agents/lecons.md
- [ ] Reste : revue `jury` par un agent distinct, puis corrections ; commit par l'orchestrateur (rien n'est commité)
