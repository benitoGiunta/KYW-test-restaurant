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
