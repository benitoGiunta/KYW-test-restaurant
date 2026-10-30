# ETAT gabarit journee
- [x] scaffold depuis _socle, pnpm install
- [x] DESIGN.md (polices téléchargées, reveal.ts chars corrigé)
- [x] site.ts (moments, platsDuJour, happyHour, horairesBar), tokens.css, base.css, pages (index, carte, brunch, histoire, reservation, 404), composants (Frise, Badge, Horaires, Icone), motion (setup.ts, journee.ts)
- [x] build `node scripts/build-site.mjs gabarits/journee` OK (dernier build 30/10 17:06)
- [x] QA passe 1 : 6 pages shootées (`.shots-journee/<page>/`, planches `planche-<page>.png`), audit 0 FAIL ; passe 2 accueil2 + brunch2 après corrections (détail dans RAPPORT.md)
- [x] apercu.png, FICHE.md, RAPPORT.md
- [ ] Revue (jury par un agent distinct) : contraste corail à confirmer par axe, idleMotion (décision écrite), arrivée automatique à valider
- [x] Revue 1 (REVUE-1.md, A_CORRIGER) traitée par le réviseur le 30/10 : J1 à J4 (F1) corrigés, F2/F3 corrigés (J5 en partie : 3 rangées gardées, en-tête opaque) ; détail et preuves dans REVISION-1.md ; captures `.shots-journee-rev/` (accueil, brunch, réservation, histoire, 404 ; accueil2 et brunch2 après la frise mobile et la photo brunch 960 px)
- [ ] Relecture 2 (agent distinct) : vérifier l'invitation « moment présent » à plusieurs heures, la page brunch « exemple », le LCP mobile du brunch
