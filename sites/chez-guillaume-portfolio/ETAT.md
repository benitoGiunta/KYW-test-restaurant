# ETAT · chez-guillaume-portfolio (construction phase 1 sur 3, 01/11/2026)

## Fait
- [x] Choix du gabarit argumenté (matrice dans DESIGN.md) : **collage** (28/30), copié sans dist/node_modules/rapports.
- [x] `package.json` renommé `site-chez-guillaume-portfolio`, `pnpm install` (lockfile mis à jour).
- [x] Photos : 10 WebP + variantes 640/800, 3 recadrages paysage 16:10, logo.svg, favicon CG, og.jpg 1200×630
      (script : scratchpad `cg-portfolio-photos.cjs`, sharp).
- [x] `src/data/site.ts` entièrement réécrit avec les données du dossier (0 placeholder) ; champs ajoutés `formules`,
      `bonCadeau`, `programmation`, `faq`, `Avis.url`, `geo` nullable.
- [x] Pages : accueil, carte, agenda, privatisation, histoire, réservation (billets, brunch, bon cadeau, FAQ), 404.
- [x] Tokens : scène en rouge rideau `#ee7752`, `--c-rouille` `#cd3b08` ; CSS ajouté (`.faq`, `.formules--colonne`,
      `.hero__case--petit`).
- [x] Build OK (`scripts/q.sh cg-portfolio-build node scripts/build-site.mjs sites/chez-guillaume-portfolio`),
      assets vérifiés, obligations KYW présentes sur 7 pages.
- [x] DESIGN.md, RAPPORT.md.

## Reste (phases 2 et 3)
- Motion : vérifier que la case de section du logo reçoit bien Table / Scène / Brunch / Privatiser ; loader (3e case
  « comedy club ») ; tasse du brunch (couleurs passées en variables CSS) ; `data-split` des titres.
- QA navigateur : `hero__case--petit` (taille, retour à la ligne à 390 px), hero paysage 1000 px étiré en 1440 (qualité),
  `.lignes` des menus (descriptions longues), FAQ `<details>` (focus, contraste ink/écru sur fond bleu), formulaire,
  mini-script de clics d'en-tête et bas de page (leçon du prompt), scrollWidth 320/360/390.
- Shoot + audit complets, puis `pnpm index`, commit dist, push.
- `gabarits/UTILISATION.md` : ajouter `| collage | chez-guillaume |` (gabarits/ protégé dans cette passe).
- Reporter les deux leçons de RAPPORT.md dans `agents/lecons/construction.md` si confirmées.

## Décisions
- Aucun avis client inventé : la section avis devient « La presse en parle » (3 titres réels L'Avenir, ELLE.be, La DH).
- Agenda = rythme réel de la semaine (jours + heures du dossier), sans artistes ni dates ; renvoi à la billetterie
  `https://chezguillaume.be/#agenda`.
- Réservation : pas de formulaire de démo (le soir passe par le ticket, le brunch par e-mail / téléphone).
- Équipe réduite à « La maison » : GuiHome (L'Avenir) et « Notre cheffe » (sans nom, le site actuel dit « notre
  cheffe ») ; Tamara Truyts citée seulement dans le récit, datée de janvier 2025.
- Pas de serveur lancé dans cette phase.
