# Révision 1 · Bienvenue chez vous · legacy
Hypothèses : photo de boutique = `boites` (sujet du dossier, alt conservé) ; « Parking aisé » reste, avec « à confirmer » ; la ligne de crédits du pied (« d'après le site d'origine ») n'était pas dans la revue, laissée.

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `presentation.astro` : URL DH complète (donnees.json) | grep dist : `…5ec2879a9978e24cfcbf444d` |
| F1-2 | corrigé | `index.astro` légende, `data/site.ts` alt : « Dessert smiley rose aux fraises » | grep « bloody » dist : 0 |
| F2-1 | corrigé | `boutique.astro`, `traiteur.astro`, `resto.astro` : jargon retiré (« Tarifs à confirmer. », « Le menu suit la saison… », « Les plats changent chaque semaine. », « Parking aisé, à confirmer. ») | grep dist « à fournir », « Emplacement réservé », « Repris du », « Tarifs lus » : 0 |
| F2-2 | corrigé | `boutique.astro` : `<Photo name="boites">` à la place du cadre vide | capture 1440 px de /boutique/ : photo pleine, pas de vide |
| F2-3 | corrigé | `Reservation.astro` prop `texte` ; boutique (« passer, ou appeler avant de venir »), traiteur (« Commande minimum 24 h à l'avance… ») | grep dist traiteur |
| F2-4 | corrigé | `Reservation.astro` : « Numéro et e-mail relevés chez des tiers, à confirmer. » | build |
| F2-5 | corrigé | `Carte.astro` h4 en h3 ; `Footer.astro` `<footer>` en `<section aria-label>` | axe : 0 violation sur accueil, resto, boutique, traiteur à 1440 et 390 px ; 0 débordement ; 1 seul `<footer>` |

F3 non traités (hors liste). Rebuild via q.sh : 7 pages. Serveur arrêté (kill du PID).
