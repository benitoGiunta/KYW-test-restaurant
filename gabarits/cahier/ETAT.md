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
