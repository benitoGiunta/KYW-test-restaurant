# ETAT : El Greco awwwards, fin de la phase 3 (QA)
## Fait
- Audit 0 FAIL ; CLS mobile 0 partout ; cibles tactiles 44 px ; OG recomposée ; repos hero adouci ; build final OK. Détail dans RAPPORT.md.
## Reste
- Critique jury indépendant (`/jury`), relecture des `contrastNeedsReview`, `settledMs` null sur l'accueil (repos continu), jpg 520 Ko non référencé dans `_astro/`, shoot complet carte et histoire.
## Pièges
- Édits faits pendant un shoot de fond perdus une fois : relire par grep avant rebuild. QA par racine `.qa-root` (non commitée).

## Relecteur-site passe 1 (REVUE-1.md)
Fait : revue complète des 5 pages (texte, carte 62 lignes, liens, axe, 3 largeurs). Verdict A_CORRIGER : 0 F0, 2 F1 (réservation par e-mail déduite ; rail des crèmes non focusable au clavier à 390 px), 5 F2, 6 F3.
Reste : à la révision, recapturer les crèmes après 3 s (F2-5), mesurer les polices < 14 px (F3-6), relire contrastNeedsReview.
Pièges : la 404 du QA est la réponse brute du serveur ; le jpg Santorin de 520 Ko est émis sans référence.

## Relecteur-site passe 2 (REVUE-2.md)
Fait : vérification des 7 corrections de REVISION-1 (5 confirmées, F2-1 partielle, F2-4 refusé accepté) ; 15 cas axe/console/débordement (0 violation). Verdict A_CORRIGER : 0 F0, 0 F1, 2 F2, 4 F3.
Reste : retirer la section « Un nom qui s'étire » (histoire.astro) et dédoublonner les repères ; `nw` sur le numéro de la page Réserver ; hauteur des cartes crèmes.
Pièges : QA-revue2.md absent, captures d'accueil seules ; serveur port 4887 arrêté.
