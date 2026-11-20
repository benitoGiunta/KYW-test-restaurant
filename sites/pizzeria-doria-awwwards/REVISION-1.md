# REVISION-1 (reviseur-site, passe 1, ciblée)

Traité : F0 (aucun), F1-1, F2-1 à F2-4. F3 non traités (hors liste).

- F1-1 corrigé : réservation « par téléphone » seulement ; formulaire `mailto` et phrase « réponse du restaurant » retirés ; e-mail gardé comme simple contact ; `acceptsReservations` retiré du JSON-LD ; meta description réécrite.
- F2-1 corrigé : « des vins au verre et en pichet, dont une sélection choisie par Luigi » (accueil).
- F2-2 corrigé : crédit « Photos : Pizzeria Doria et photos libres illustratives (Unsplash) » (`site.credit`, pied de page).
- F2-3 corrigé : formulaire supprimé (voir F1-1).
- F2-4 corrigé : prop `piedSans` du pied de page ; accueil sans colonne « Ouvert » (section Heures conservée), réservation sans « Venir » ni « Ouvert » ; paragraphe des midis d'école retiré de la réservation (gardé sur l'accueil, lien à emporter conservé).

Vérifications : rebuild via `scripts/q.sh` OK (5 pages) ; grep dist : 0 « ou par e-mail », 0 « <form », 0 « acceptsReservations », 0 « cinq vins » ; crédit nouveau présent ; colonnes du pied : accueil Venir+Contact, réservation Contact ; un seul `kyw-signature`, noindex présent ; capture ciblée de la réservation (`.shots-pizzeria-doria-awwwards-rev1/resa/d-01.png`) lue : OK. Serveur arrêté (kill du PID).
Hypothèse : `dist/` non commité ici (consigne : pas de commit demandé).
