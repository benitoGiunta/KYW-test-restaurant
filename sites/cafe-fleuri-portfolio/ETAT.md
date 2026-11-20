# ETAT : cafe-fleuri-portfolio, phase 3 (QA) terminée
## Fait (phase 1 + 2)
Phase 1 : gabarit journee adapté, 6 pages, données, 10 photos, favicon, OG.
Phase 2 :
- Signature : « astre » du hero (photo tasse-rouge en disque, orbite avec soleil à l'heure réelle, 9h à gauche, 16h à droite, bornes tenues la nuit, montée en 1,6 s au premier rendu, photo qui dérive au défilement, légende « Photo libre, illustrative »). Mobile : disque centré sous les chips ; desktop : à droite, baseline plafonnée (min(36rem, 46vw)) pour ne pas passer dessous. Code : index.astro, base.css (bloc « Astre du hero »), journee.ts (`astre()`).
- États : :active (btn, chip, flèches horaires), outline de focus en `--encre` (ivoire dans le footer), reduced motion sans translation/zoom au survol.
- Colophon : crédits des 10 photos (auteurs liés Unsplash) dans le footer (`src/data/credits.json`, copie de public/photos/credits.json), sans mapping photo par photo (inconnu).
- Correctifs : `html { overflow-x: clip }` (scrollWidth 323-400 pour 320-390 : plus de défilement horizontal) ; `.kyw-footer` en relative + z-index (bande rose sous le footer) et retour au bandeau clair du paquet (logo KYW de nouveau lisible).
- Mesures (scripts maison, serveur tué) : 5 pages × 320/390/768/1440 + reduced motion 390/1440 : 0 erreur console, 0 texte caché en reduced motion, scrollWidth = largeur. Clic réel sur chaque lien d'en-tête (1440, 5 pages) : elementFromPoint = <a>, URL change. Bas de page 1440 : bande KYW, mention et logo visibles.
- build : OK (`scripts/q.sh`), dist/cafe-fleuri/portfolio/ à jour. Non commité avec [publier].
## Reste (phase 3 / captures)
- Shoot complet + audit par l'agent captures ; lire QA-<étape>.md.
- Loader : compte de 00:00 à l'heure réelle (hors 9-16h il affiche p. ex. 00:58 ou 21:00) : laissé tel quel (horloge réelle), à juger à la revue. Désactivé en mobile (CSS du gabarit).
- Badge dupliqué (en-tête compact + hero) : héritage du gabarit, non touché.
- Reveal `scale` : figures à r = largeur + 10 px tant qu'il joue (faux positif de débordement).
- sloplint, RAPPORT.md, `pnpm index`, commit final [publier], gabarits/UTILISATION.md (`journee | cafe-fleuri`, gabarits/ protégé).
## Pièges
- Leçon proposée dans data/usage/test-1/lecons-proposees/cafe-fleuri.md (agents/ figé).
- Ne pas rebuilder pendant un shoot de fond ; serveur propre sur son port.
## Phase 3 (QA)
Fait : contrôles script 6 pages × 3 largeurs OK, correction « œufs », rebuild OK, RAPPORT.md écrit. QA-build.md n'existait pas. Reste : pnpm index, commit final [publier] par l'orchestrateur.
