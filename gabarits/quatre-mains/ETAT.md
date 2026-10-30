# ETAT « quatre-mains » (agent portfolio-gabarit, 30/10/2026)

## Fait (gabarit terminé)
- DESIGN.md, socle, polices, photos, favicon, og.jpg, robots.txt ; site.ts complet (placeholders marqués)
- tokens.css, base.css ; composants Header (coupé + écho, burger, mode « sur papier »), Footer (finale), Loader, NomCoupe
- Base.astro (#fond persistant, rideau 2 panneaux, préchargement des 3 polices) ; motion/setup.ts + motion/diptyque.ts
- 6 pages : index, carte, les-deux-chefs, histoire, reservation, 404 ; `node scripts/build-site.mjs gabarits/quatre-mains` passe
- QA : shoot 1 (home, carte) + shoot 2 (home, les-deux-chefs, histoire, reservation, 404, dossiers .shots/qm-*) + audit
  (.shots/audit-quatre-mains.txt : 0 FAIL, 11 WARN) + re-shoot histoire après corrections (0 erreur, 0 axe, 0 débordement)
- Corrections mécaniques faites : contraste muted sur moutarde, échos en background-clip (axe), citations en lignes,
  figure sans marge (débordement chefs), en-tête ink sur sections papier, LCP des heros intérieurs, cibles >= 24 px
- apercu.png, FICHE.md, RAPPORT.md

## Révision 1 (reviseur-site, 30/10/2026) : faite
- REVUE-1 traitée, voir REVISION-1.md : tous les F1 corrigés (placeholders plats/attribution/bios, en-tête mobile, débordement + LCP les-deux-chefs),
  F2-01, F2-02, F2-04, F2-06 corrigés ; F2-03, F2-05, F3-01 refusés avec raison. DESIGN.md mis à jour (registre = parcours, en-tête, loader).
- Captures après révision : .shots-qm-rev/{les-deux-chefs,accueil,carte,reservation} ; build OK.

## Reste (agents suivants)
- Facultatif : passe de revue 2 (fluidité mobile F2-03 dans le moteur) ; reporter les leçons de RAPPORT.md dans agents/lecons.md
- Pas commité (l'orchestrateur le fait)
