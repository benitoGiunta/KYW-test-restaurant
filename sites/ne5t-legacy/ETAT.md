# ETAT ne5t-legacy, phase 1 (construction-1), 2026-11-27
Fait : AUDIT.md, DESIGN.md, comp.md, deal/draw/scaffold (Spore, seed e74411), 7 pages statiques (accueil, restaurant, spa, suites, histoire, infos, 404), build OK (`dist/ne5t/legacy/`), noindex, mention et KywFooter vérifiés par grep sur les 7 pages, 16 photos en WebP.
Reste : phase 2 (nav mobile testée, reveal unique, jour courant dans les horaires, QA navigateur, sloplint --render, LCP) ; phase 3 (revues, sweep).
Décisions : Poster gardé malgré le draw (posture d'origine) ; 13 routes fusionnées en 6 ; adresse du site (Avenue Vauban 46) retenue ; réservation restaurant par téléphone, aucun widget Zenchef ; photos 08, 09, 13, 19, 21, 22, 23, 24 non utilisées (basse résolution ou sans slot).
À vérifier (placeholders) : slot `.fill` « heures exactes à confirmer » sur accueil, restaurant et infos ; adresse (Allée de Menton 26 dans restaurants.json) ; restaurant actif (menu Éphémère passé) ; aucun avis ni note ; noms de suites sans description ni photo propre.
Pièges : comp c1 sans photo (calque z-index) ; le hook exige q.sh pour theme.mjs.
