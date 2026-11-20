# ETAT · revue 3
Fait : REVUE-3.md écrite (A_CORRIGER : 0 F0, 1 F1, 0 F2, 5 F3 reportés). F2-1, F2-2, F2-3 de la révision 2 confirmés ; F1-1 confirmé sur l'accueil seulement.
Reste : corriger F1-1 (débordement 6 à 11 px au chargement mobile sur carte, histoire, brunch, reservation : `figure[data-reveal=scale]` à scale 1.15 hors de la fenêtre ; poser `overflow-x: clip` sur `main`) puis F3-1 à F3-5.
Pièges : mesurer le débordement sans défiler (la largeur revient à 390 une fois l'image révélée) ; `scripts/q.sh` n'affiche que 20 lignes : lire le JSON pour le détail ; un serveur `serve.mjs` suffit pour les mesures.
