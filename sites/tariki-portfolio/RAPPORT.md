# RAPPORT tariki-portfolio (QA, phase 3)

## Corrections
- Logo d'en-tête « Tariki » : 33x18 px au tactile, maintenant 44x44 (inline-flex, min-height/min-width 44 px sous 768 px ou pointer coarse). Vérifié en navigateur à 390 : 44x44 ; bureau inchangé (45x24).
- Axe 404 « footer 4,36:1 » : faux positif (réponse brute de serve.mjs). `/404.html` du site : note KYW #55646a sur #F3F2EF, soit environ 5,4:1. Aucune correction.

## Vérifications (capture ciblée, 1440 et 390)
- histoire, reservation, 404.html : 0 erreur console, 0 débordement horizontal, bande KYW + « Maquette KYW, certaines données sont illustratives » visibles en bas.
- Build `scripts/q.sh` : OK (5 pages).
- Chiffres de QA-build.md conservés : 0 FAIL audit, 0 erreur console, CLS ~0, LCP mobile ~1,2 s.

## Non corrigé (faux positifs ou choix)
- WARN audit : horaires répétés (volontaire, rappel dans l'en-tête de pages) ; robots.txt/sitemap sous base (faux positif, sitemap-index.xml généré).
- Shoot complet histoire/reservation non refait (règle de sobriété).

## Placeholders
- Photos feu de camp et arcades `placeholder: true` (droits à confirmer, banque d'images ou rendu généré).
- Dessin du plat (lawook) illustratif ; étapes et températures de cuisson illustratives.
- Aucune photo de plat ni de salle.

## Leçons structurelles
- Proposée dans data/usage/test-1/lecons-proposees/tariki.md.
