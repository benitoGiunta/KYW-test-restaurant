# ETAT — le-54 portfolio (phase 2/3, motion et finitions)
## Fait (phase 1)
- Gabarit Velours adapté, 7 pages, données `data/restaurants/le-54/`, palette bleu nuit / or, photos WebP, noindex, mention Maquette KYW et logo KYW (voir DESIGN.md).
## Fait (phase 2)
- Hero : photo éclaircie (brightness 1,45 desktop, 1,3 mobile) et voile allégé, voile latéral pour l'accroche ; intro desktop : zoom 1,12 → 1 de la photo, adresse / accroche / boutons en fondu décalé (mobile et reduced motion : peint au premier rendu).
- Chapitres : photo qui retombe (1,1 → 1) avec le pan de rideau.
- Signature : filet or sous l'en-tête qui se tend au défilement (`--progres`, `signature()` dans `src/motion/setup.ts`), monogramme « 54 » rempli en or après le hero.
- Onglets « La maison » : voile latéral réel (le `::before` passait sous les photos : photos en z-index -2) ; texte lisible sur la photo de salle.
- Galerie : bande focusable au clavier (`tabindex=0`, `role=group`), snap mandatory en mobile.
- États : `:active` liens et onglets, `.btn[aria-disabled]`. Mobile : nom du hero 19 vw, boutons pleine largeur, horaires de clôture en colonne.
- Pied de page : horaires en colonne (plus de césure, plus de « Mardi Et Mercredi »).
- Contrôles (Playwright, scratchpad `p2-ctrl.mjs`) : aucun scrollWidth > viewport à 320/390/768/1024/1440 sur 7 pages ; 0 erreur console ; clics réels de l'en-tête OK (5 liens) ; bas de page en fenêtre : mention KYW et logo visibles ; menu mobile s'ouvre / Échap ferme ; aucune cible < 24 px ; reduced motion : pas de classe `motion`, aucun élément caché, aucun rideau, aucun loader.
- Build vert (`pnpm build:site sites/le-54-portfolio`), `dist/le-54/portfolio/` régénéré.
## Reste (phase 3)
- Shoot complet + audit par l'agent « captures » ; relire QA-<étape>.md.
- Vérifier : chiffres « 48 » et « 3 » à cheval sur les photos, portraits `histoire`, rotation des onglets (non mesurée), clavier complet, pages menu / carte / salle / réservation en mobile (non revues visuellement en phase 2, seulement mesurées).
- RAPPORT.md, `pnpm index`, commit final.
## Décisions / hypothèses (inchangées)
- Horaires, menus 2 et 4 services, lundi, couverts : « à confirmer » (`.illu`). Aucun `placeholder: true`.
- `gabarits/UTILISATION.md` non modifié (consigne) : y ajouter `velours | le-54`.
## Pièges
- `.onglets::before` (voile) est peint sous `.onglets__photos` si les deux ont z-index -1 : défaut du gabarit Velours, corrigé ici seulement (gabarits/ intouché).
- Le contrôle de débordement par `getBoundingClientRect` signale les photos de chapitre (pleine largeur voulue, clippées par `overflow-x: clip`) : faux positif, `scrollWidth` = viewport.
