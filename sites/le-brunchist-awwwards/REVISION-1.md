# Révision 1 · Le Brunchist · awwwards

| id | décision | changé (fichier) |
|---|---|---|
| F1-1 | corrigé | `reservation.astro` : description sans « réserver une table », lede « Pour savoir si une table peut être réservée, appelez. », titre « Venir » ; `Pied.astro` : CTA « Nous trouver » |
| F2-1 | corrigé | `Pied.astro` : « Le dernier café se commande avant. » retiré |
| F2-2 | corrigé | `engine/reveal.ts` : SplitText `aria: 'none'` ; axe accueil 1440 et 390 : 0 violation (mesuré après défilement) |
| F2-3 | corrigé | `index.astro` : titre en 2 blocs ; l'heure « 9 h 30 à 15 h 30 » tient sur une ligne (mesuré 1440 et 390). `wordDelimiter` testé : sans effet sur les insécables |
| F2-4 | corrigé | `Pied.astro` : « Horaires à confirmer : les sources divergent. » sous le tableau |
| F2-5 | non traité | arbitrage de variante typographique (pas d'image) ; hors correction ciblée |
| F3-1 | corrigé | `index.astro` : « (à confirmer) » |
| F3-2 à F3-6 | non traités | finitions, hors liste F0/F1/F2 |

Vérifs : build OK via scripts/q.sh ; 0 débordement à 1440 et 390 ; grep : plus de « Réserver ou venir » ni « dernier café » dans src.
Piège : mon serveur de mesure sans type MIME a faussé une première mesure (JS non chargé, axe vide à tort).
