# Révision 1 · Le Félicien · awwwards (ciblée F0/F1/F2)

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 accents coupés | corrige | `src/styles/engine.css` : `.split-line` gagne `padding-top:.2em; margin-top:-.2em` (global, couvre les 8 h2) | capture ciblée 1440 et 390 px : « TROIS REPÈRES », « QUAND ET OÙ », « ENTRÉES » complets |
| F2-1 réservation par e-mail | corrige | `src/pages/reservation.astro` : meta description et chapeau « en ligne ou téléphone » ; bouton « Écrire à info@ » retiré (le bloc Contact ne porte que l'e-mail événements) | grep `dist/` : 0 « par e-mail » |
| F2-2 stationnement | corrige | phrase supprimée (`reservation.astro`) | grep `dist/` : 0 « stationnement » |
| F2-3 majuscule curseur | corrige | `src/data/site.ts` : « toute la carte » | `dist/carte` : « Avec 40 €, toute la carte, 68 lignes, est… » |
| F2-4 collision 404 | corrige | `src/styles/site.css` : `.horsechelle .titre-mega { line-height: 1.08 }` (0,95 collait encore) | capture 404 1440 px : plus de collision |

F3 non traités (hors consigne). Build OK via q.sh. Hypothèse : info@ reste dans le pied de page (non inventé). Décision de design inchangée.
