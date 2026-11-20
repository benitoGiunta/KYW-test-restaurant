# RAPPORT — el-greco / portfolio (QA, phase 3)

## QA
- QA-build.md absent : audit + shoot par page (accueil, carte, histoire, réservation) refaits ici (`.shots/greco3-*`).
- audit.mjs : 0 FAIL, 10 WARN (phrases répétées : marquee et horaires dupliqués par conception ; robots/sitemap : faux positifs sous base). Axe : aucune violation. Console : aucune erreur, aucune requête échouée sur les 4 pages.
- Planches lues : accueil desktop (8), réservation/carte/histoire desktop, mobile accueil/carte. Aucun débordement, texte caché ni image déformée ; pied KYW et mention Maquette visibles ; liens d'en-tête vérifiés en phase 2.
- Aucune correction nécessaire : build inchangé, passe (5 pages).

## Placeholders et données à confirmer
- Photos de stock Cyclades (hero rail, « La table », manifeste) : `placeholder: true`, légendes « Photo de stock ».
- Slogan « à partager, comme à la maison » : marqué « exemple ».
- Horaires lundi à mercredi inconnus (« à confirmer ») ; jeudi à dimanche d'après annuaire (à confirmer).
- Procédure de réservation (téléphone / e-mail) : « procédure à confirmer ».
- Terrasse : « à confirmer (citée par des avis) ».
- Avis : 4 positifs issus de Trustindex, auteurs anonymes ; avis négatifs non cités.

## Points ouverts
- `gabarits/UTILISATION.md` (guinguette | el-greco) à mettre à jour hors phase de test.
- Marquee affiche « Ouvert, arrivée jusqu'à… » calculé sur des horaires non confirmés.

## Leçons structurelles
- Proposée dans data/usage/test-2/lecons-proposees/el-greco.md.
