# Révision 1 · Don Dino awwwards

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F0 | rien à faire | - | revue : aucun |
| F1-1 accents coupés | corrigé | `src/styles/engine.css` : `.split-line-mask { padding-top:.2em; margin-top:-.2em }` ; `site.css` : `.display--mega` interligne 0,86 à 0,92 (couvre aussi F3-1) | captures d'élément 1440 et 390 px après 4 s : RÉSERVER, PLUS À LA CARTE, PÂTES ET GRATINÉS, VENIR À NANINNE, LES PIZZAS… À LA TABLE : accents visibles, sans contact avec la ligne du dessus ; scrollWidth = fenêtre, 0 erreur console |
| F2-1 OG | corrigé | `public/og.png` recomposée (Big Shoulders, 3 lignes entières, photo sur le tiers droit) | image ouverte : titre complet, sous-titre dans la zone verte |
| F2-2 note de production | corrigé | `histoire.astro` : phrase retirée | grep dist : 0 |
| F2-3 phrase | corrigé | `index.astro` : « Spaghetti, lasagne et cannelloni côtoient… » | grep dist : présente |
| F2-4 photo du patron | corrigé | `index.astro` : photo de la salle (clé `salle`) à la place de l'homme non identifié | rendu : titre « Le patron est en salle. » sans portrait |
| F3-2, F3-3, F3-5 | corrigés (bonus) | `carte.ts` « par couvert, minimum 2 » ; espace insécable avant « : » ; `reservation.astro` « Réservez par téléphone ou par demande en ligne… » | grep dist : 0 « cvts », 0 « un appel suffit » |
| F3-4, F3-6 | non traités | hors liste ciblée | - |

Hypothèse : la photo 09 reste dans les sources, non affichée. DESIGN.md inchangé.
