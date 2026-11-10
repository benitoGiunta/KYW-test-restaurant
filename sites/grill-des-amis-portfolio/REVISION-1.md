# Révision 1 · Le Grill des amiS · portfolio

Corrigés : 15 (F1-1, F1-2, F2-1 à F2-8, F3-1 à F3-4) · refusés : 0 · impossibles : 0. Publiable : oui (à reconfirmer par la revue 2).

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige (option « ouvrir sur l'entrecôte ») | couche `fond` supprimée (`src/data/site.ts`, `public/couches/fond.webp`), la pièce ouvre la séquence (`src/motion/braise.ts`, `base.css`), 3 étapes, plus de « 520 °C » sur l'assiette, alt dynamique | capture 1440 px à 5 % et 50 % : plus de dalle vide, entrecôte puis garniture. Hypothèse : le détourage de `piece.webp` garde un bord d'assiette, pas de nouvelle image générée |
| F1-2 | corrige | `.plat__num` supprimé (HTML + CSS, aussi F2-8) ; `.cuisson__item .num` hérite de la couleur du texte, `.det` sans opacité (`base.css`) | axe `color-contrast` à 0, 5 positions de défilement, accueil et carte, 1440 px |
| F2-1 | corrige | `aria: 'none'` sur le SplitText du manifeste (`braise.ts`), mots d'attente passés à `color-mix(fg 55 %, bg)` (`base.css`) pour rester lisibles | axe `aria-prohibited-attr` 0 |
| F2-2 | corrige | `reservation.astro` : « Réservation en ligne ou au {tél}. » ; `site.ts` : « livrées chez vous. » | grep |
| F2-3 | corrige | rôle « à préciser » retiré (`histoire.astro`, `site.ts`), légende « Le restaurant, Namur » | grep |
| F2-4 | corrige | alt « … devant le mur d'ardoise de la salle » (`site.ts`) | grep |
| F2-5 | corrige | pied du site en `<section aria-label>` (plus de 2e contentinfo), `.thermo` et `.barre` en `role="complementary"` + `aria-label` | axe `landmark-no-duplicate-contentinfo` 0 ; `region` 0 sur accueil et carte |
| F2-6 | corrige | eyebrow raccourci « Viandes maturées, feu de bois, Namur » (`index.astro`) | une ligne ; pas de nouvelle capture mobile |
| F2-7 | corrige | hero accueil varié (« Deux chambres de maturation… »), intro Dressage « Carte du 14 octobre 2026. Une sélection : … » | grep |
| F2-8 | corrige | eyebrows Dressage et Table retirés (accueil, La maison), numéros de plats supprimés | grep ; grille `.plat` à 2 colonnes |
| F3-1 | corrige | apostrophes U+2019 (`carte`, `404`, `histoire`) | grep |
| F3-2 | corrige | `.header__brand` inline-flex, `min-height: 24px` | hauteur mesurée 24 px à 390 px |
| F3-3 | corrige | « Voir la cuisson » | grep |
| F3-4 | corrige | pied de l'accueil : « Ouvert jeudi à samedi et lundi » (prop `horairesResume`), table complète conservée ailleurs | grep |

Mesures : `scrollWidth - innerWidth` = 0 à 1440 et 390. Build OK via `scripts/q.sh`. DESIGN.md inchangé (concept, palette et motion identiques).
