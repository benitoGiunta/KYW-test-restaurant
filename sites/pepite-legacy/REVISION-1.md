# Révision 1 · Pépite legacy
| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 | corrige | `Venir.astro` : « La boutique ouvre dès 16 h (dès 10 h 30 le samedi), la cave à manger dès 19 h. », phrase inventée supprimée | grep dist : 0 occurrence de « À toute heure » |
| F1-2 | corrige | `Vins.astro` : intitulé visible « Les sélections de Pépite » (h3) au-dessus des trois libellés ; police des libellés réduite (« Chouchou » se coupait) ; liste reliée au bouton existant | capture ciblée desktop `#vins` |
| F2-1 | corrige | `site.ts` : `tel:+32476620182` | grep dist |
| F2-2 | corrige | `Lieu.astro` : « Catherine Mathieu, fondatrice » ; `Pied.astro` : « Photographies : site d’origine. » | grep dist : 0 ancienne mention |
| F2-3 | corrige | `Carte.astro` h2 « À partager en ce moment » ; `Hero.astro` « Voir le menu » | grep dist : 0 « cette semaine » |
| F2-4 | corrige en partie | photo `couvert.webp` (alt = sujet) ajoutée au bandeau vins (grille 8/4) ; `.lieu__grid` alignée en haut, photo plus étroite ; `vitrine.webp` supprimée | vins 927 → 842 px, lieu 1113 → 945 px ; scrollWidth 1440/390 sans débordement. Vide sous le texte du portrait réduit, pas supprimé |
F3 non traités (hors liste). Hypothèse : la photo couvert est floue (1024 px source), acceptée comme ambiance. DESIGN.md inchangé.
