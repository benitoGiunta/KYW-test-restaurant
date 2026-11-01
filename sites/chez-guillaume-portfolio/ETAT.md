# ETAT · chez-guillaume-portfolio (construction 3/3 terminée, QA faite, 01/11/2026)

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

## Fait en phase 2 (motion, signature, interactions, états, mobile, reduced motion, finitions)
- [x] Signature vérifiée par script (Playwright, 1440) : la case du logo prend Table / Scène / Brunch / Privatiser sur
      l'accueil. **Corrigé** : sur les pages d'activité (carte, agenda, privatisation) le `page-hero` est trop court pour
      croiser la ligne 45 % du ScrollTrigger, la case restait vide ; `logoSection()` la pose désormais d'office quand la
      section `[data-activite]` est un `.page-hero` (`src/motion/setup.ts`).
- [x] Reveal : `data-reveal` retiré du damier Table de l'accueil (il contient des liens) et posé en `scale` sur la photo ;
      contrôle : 0 bloc `data-reveal`/`data-split` contenant un lien, sur les 7 pages.
- [x] Privatisation : le formulaire de démo devient un vrai e-mail prérempli (`mailto:` vers hello@chezguillaume.be,
      sujet + corps depuis les champs) ; états : `:user-invalid` (tirets + ombre rouille), focus (ombre ink), message
      `role="status"` avec lien direct. Testé : soumission vide bloquée (2 champs invalides), remplie → état « envoyé ».
- [x] Finitions : espace insécable avant `€` et `%` (19 occurrences, site.ts + réservation) ; colonne Horaires de « Pour
      venir » élargie (1,7fr, plus de retours à la ligne) ; agenda : soulignement pointillé de `<abbr>` retiré, jour en
      toutes lettres en petite étiquette bordée (il chevauchait les lignes du cahier) ; réservation : cadre doublé
      supprimé (`.damier__formules`) ; `h2.sur` en police mono (étaient en Caslon minuscule illisible) ; FAQ ouverte
      + focus : contour écru.
- [x] Contrôles (script `cg-p2-check.mjs`, scratchpad) : 0 erreur console / 0 ressource 4xx sur 7 pages ; 7/7 liens
      d'en-tête cliquables à scrollY 0 sur chaque page ; bas de page : bandeau KYW visible au-dessus de tout et mention
      présente sur 7 pages ; aucun texte caché après défilement ; scrollWidth = largeur et aucun débordement à
      320 / 360 / 390 ; aucune cible tactile < 24 px hors texte courant ; reduced motion : pas de classe `motion`,
      0 texte caché, pas de loader, tasse masquée.
- [x] Build OK (`scripts/q.sh cg-p2-build node scripts/build-site.mjs sites/chez-guillaume-portfolio`).

## Fait en phase 3 (QA)
- [x] Audit complet (0 FAIL, 14 WARN expliqués dans RAPPORT.md), captures ciblées des 6 pages hors accueil (1440, 390).
- [x] Corrigé : bloc Horaires de la réservation masqué sous la FAQ (`.damier__photo--infos`, base.css) ; fiche
      « Notre cheffe » → « En cuisine ». Vérifié par mesure et capture.
- [x] Build final OK (`scripts/q.sh cgp3-build …`), `pnpm index`, commit.

## Reste
- `gabarits/UTILISATION.md` : ajouter `| collage | chez-guillaume |` (gabarits/ protégé, à faire par l'orchestrateur).
- Gabarit collage (protégé) : case d'activité vide sur pages dédiées, `abbr` pointillé de l'agenda, `h2.sur` en
  Caslon, nom en trois mots supposé, `.damier__photo img { height: 100% }` qui masque tout contenu ajouté sous l'image.
- Limite connue : photos sources de 1000 px de large, le hero est étiré à 1440 (pas de source plus grande).
- À confirmer client : nom de la cheffe actuelle, photo de GuiHome (fiche « photo à venir »).

## Décisions
- Aucun avis client inventé : la section avis devient « La presse en parle » (3 titres réels L'Avenir, ELLE.be, La DH).
- Agenda = rythme réel de la semaine (jours + heures du dossier), sans artistes ni dates ; renvoi à la billetterie
  `https://chezguillaume.be/#agenda`.
- Réservation : pas de formulaire de démo (le soir passe par le ticket, le brunch par e-mail / téléphone).
- Équipe réduite à « La maison » : GuiHome (L'Avenir) et « Notre cheffe » (sans nom, le site actuel dit « notre
  cheffe ») ; Tamara Truyts citée seulement dans le récit, datée de janvier 2025.
- Phase 1 : pas de serveur. Phase 2 : serveur `serve.mjs --port 4471`, phase 3 : port 4473, arrêtés par leur PID.

## Revue 1 (relecteur-site, 01/11/2026)
- Fait : `REVUE-1.md` écrit (verdict A_CORRIGER : 0 F0, 2 F1, 6 F2, 6 F3). Contrôles ciblés : texte vs donnees.json, liens (0 mort), axe 7 pages × 2 largeurs, contraste, menu mobile, 404.html, histoire.
- Reste : la révision traite F1-1 (SplitText `aria: 'none'`), F1-2 (aria-label du logo), puis F2 ; relancer axe par page.
- Pièges : le QA n'a capturé que 3 pages sur 7 ; le contraste « On va voir qui ? » est transitoire (reveal).
