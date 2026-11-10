# ETAT : huile-sur-le-feu, awwwards, revue 2 terminée

- REVUE-2.md écrit : A_CORRIGER (0 F0, 1 F1, 0 F2, 3 F3). Serveur de test (port 4871, PID 23682) arrêté.
- Corrections de REVISION-1 vérifiées : F2-1 (sommaire), F2-2 (og.png), F2-3 (répétitions) OK ; F1-1 OK jusqu'à 768 px mais « Marchovelette » (réservation, h2) reste coupé à 1024 et 1100 px (colonne 464/500 px pour 484/510 px de texte).
- Reste pour la révision 2 : F1-1 (élargir la colonne ou plafonner le h2 de 821 à 1279 px), F3-1 (phrase Oliviers & Co en double accueil/histoire), F3-2 (horaires en double sur la réservation), F3-3 (en-tête translucide).
- Piège : mesurer `.split-line-mask` à 1024-1180 px, pas seulement mobile.
