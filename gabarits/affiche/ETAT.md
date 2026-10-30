# ETAT gabarit affiche (30/10/2026)

## Fait
- DESIGN.md complet ; police Archivo variable dans public/fonts ; photos WebP dans public/photos ; site.ts et tokens.css rédigés.
- package.json renommé.

## En cours (agent 2)
- Pages, composants, styles, motion : à écrire (les pages sont encore celles du socle).

## Reste
- Build, shoot/audit, corrections mécaniques, apercu.png, FICHE.md, RAPPORT.md.

## Mise à jour (agent 2, étape 1)
- Écrits : base.css, Affiche/Plat/Header/Footer/Loader/Disque/Bento/Horaires.astro, motion/setup.ts + drivers.ts, Base.astro (police, fin), 6 pages (index, carte, histoire, reservation, a-emporter, 404).
- Prochain : build, puis shoot/audit sur le port 4403.
- Étape 2 : build OK ; shoot 1 (dans .shots partagé, contaminé par les agents frères) : 3 violations axe corrigées (contraste empile/bento/badges, dl, nom du disque). Re-shoot dans `.shots-affiche/` (option --out).
- Étape 3 : shoot 2 (6 pages, rapports dans .shots-affiche.log) : 0 erreur console, 0 FAIL audit, reduced OK, idle OK. Corrigé : débordement desktop (t-mega réduit, overflow-x clip sur .affiche), contraste dt horaires et prix menu du jour, hover de la marque et des .link, description < 160. Reste : re-shoot accueil + histoire (vérif. débordement), planche-contact, apercu.png, RAPPORT.md.
- Étape 4 (fin agent 2, budget atteint) : FICHE.md, RAPPORT.md écrits ; apercu.png = capture d-01-hero de la passe 3 (accueil, après corrections ; à remplacer par capture-site.mjs desktop-haut.png si besoin). Passe 3 (accueil + histoire) encore en cours dans .shots-affiche/home et .shots-affiche/histoire (journaux home.log, histoire.log, marqueur FIN2) : vérifier overflowX = false et 0 violation axe, puis planche-contact (`python3 scripts/planche.py`) et regard visuel des frames. Serveur 4403 encore lancé : le tuer (`pkill -f "serve.mjs dist --port 4403"`).
- CORRECTIF : la passe 3 a échoué (ERR_CONNECTION_REFUSED : le serveur 4403, lancé dans une commande de fond terminée, a été tué avec elle). `.shots-affiche/home/` n'a que les captures desktop/hover/clavier (pas de report.json, pas de mobile) ; `.shots-affiche/histoire/` est vide. À refaire par l'agent suivant : relancer `node .claude/skills/awwwards/scripts/serve.mjs dist --port 4403 &` DANS la même commande que le shoot, puis `shoot.mjs <base>/ --out .shots-affiche/home` et `<base>/histoire --out .shots-affiche/histoire`, vérifier overflowX = false et 0 violation axe (corrections de l'étape 3 non encore vérifiées par capture), planche-contact, puis `capture-site.mjs … gabarits/affiche/apercu --frames 3` pour un apercu.png définitif.

## Révision 1 (réviseur, 30/10/2026)
- REVUE-1 traitée : 12 corrigés, 3 refusés (faux positifs), 0 impossible ; détail et preuves dans `REVISION-1.md`.
- Build OK ; re-captures en série dans `.shots-affiche-rev/` (accueil, reservation, a-emporter, histoire, 404) : 0 axe, 0 focus invisible, 0 petite cible, overflowX false, LCP mobile ~1,1 à 1,4 s.
- DESIGN.md mis à jour (loader raccourci, accroche non révélée, titres géants plafonnés à 9,5vw en mobile, puce « exemple », pied sans colophon, Sara sans photo).
- Non commité. Reste : `apercu.png` à régénérer (l'actuel date d'avant la révision), commit + `pnpm index`.
