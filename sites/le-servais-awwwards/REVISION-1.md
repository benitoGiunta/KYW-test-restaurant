# Révision 1 · Le Servais · awwwards (F2 seulement)

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| T-faux-1 | corrige | `src/pages/carte.astro` : « 76 lignes : la carte Cuisine et des extraits de la carte du bar » | grep `dist/le-servais/awwwards/carte/index.html` |
| T-flou-1 | corrige | même chapeau : « Prix en euros ; le prix du Margarita reste à confirmer. » | grep dist : « boissons et suppléments » absent |
| T-invente-1 | corrige | `reservation.astro` : chapeau « Réservez en ligne ; le bar est joignable au 081 73 65 52 et à hello@leservais.be. » ; meta description ; « Contact pour les groupes : hello@… » | grep dist : « Trois façons » absent, nouvelles phrases présentes |
| T-invente-2 | corrige | `site.ts` : « 3 + 1 sur les cocktails : Spritz, … » (règle du 4e offert retirée) | grep dist home : « quatrième » absent |
| T-repet-1 | corrige | `histoire.astro` : table remplacée par un seul produit (Boninne, Marie-Cécile Crevits, 6,50 €), titre « Un voisin de la carte » ; `index.astro` : « Cinq lignes de la carte citent leur origine. » ; `site.ts` camembert `lieu: null` (rendu vide) | grep dist : 0 « Carte du client », « portent le nom » absent, `produit__nom` absent de histoire |

Build : `pnpm build:site` OK (5 pages). F3 non traités (hors périmètre). Pas de capture : changements purement textuels, aucun impact de mise en page sur histoire sauf un paragraphe à la place d'une liste.
Hypothèse : le téléphone affiché reste celui déjà documenté dans `site.ts`.
