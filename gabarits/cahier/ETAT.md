# ETAT cahier (agent portfolio-gabarit, 30/10/2026)

## Fait
- Scaffold depuis _socle, package renommé (+ dépendance fontkitten), pnpm install.
- Polices (Sometype Mono 400/700, Bespoke Slab 700, Caveat 500) dans public/fonts/, @font-face dans Base.astro.
- DESIGN.md, FICHE.md, RAPPORT.md, tokens.css, base.css, composants (Manuscrit + lib/manuscrit.ts, Timbre, Polaroid,
  Tampon, Sommaire, Plan, MenuDuJour, Header en cellules, Footer dos du cahier, Loader étiquette), motion
  (setup.ts + cahier.ts), 7 pages ; build OK dans dist/gabarits/cahier/.
- QA passe 1 : shoot des 7 pages (.shots-cahier/<page>/) + audit (.shots-cahier/audit-cahier.txt) : 0 erreur, 0
  débordement, 1 contraste axe (corrigé), 2 sauts de titres (corrigés) ; corrections mécaniques + rebuild.
- Passe 2 : audit-cahier-2.txt (0 FAIL), carte-2/ (0 erreur, 0 axe, CLS 0), apercu.png copié (dossier apercu/ supprimé).
- agents/lecons.md complété (fontkitten, fontshare slug, planche.py, report.json).

## Reste (agent de revue / corrections)
- Jury + revue visuelle de toutes les captures ; « retire un accessoire » ; confirmer à l'œil les hovers `colorOnly`.
- Supprimer scripts/cahier-qa.sh et scripts/cahier-fin.sh si plus utiles (laissés pour
  relancer la QA : port 4404).

## Révision 1 (agent reviseur-site, 30/10/2026)
- REVUE-1 traitée : 2 F0 et 5 F1 corrigés, F2-1 à F2-4 corrigés, F2-5 refusé (dos du cahier), F2-6 impossible
  (routage Vercel), F3 corrigés sauf « héros intérieurs vides » (refusé, esthétique). Détail : `REVISION-1.md`.
- Build OK ; captures `.shots-cahier-rev/<page>/` (accueil, histoire, producteurs, carte, commander, reservation,
  accueil-2 après les derniers correctifs) ; visibilité contrôlée par script après défilement complet.
- Reste : passe 2 de revue (relecteur) ; vérifier la 404 sous `base` au déploiement ; liste réelle des producteurs,
  rôles de Sara et Jordan et composition du midi à obtenir du client.
