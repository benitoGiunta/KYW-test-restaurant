# Révision 1 · Champs Élysées · awwwards

Aucun F0 dans la revue. F1-1 à F1-4 et F2-1 à F2-3 corrigés ; F3 non traités (hors périmètre). Build : `pnpm build:site` passé. Vérification : serveur dist port 4977 (arrêté), Playwright + axe-core (règles aria-prohibited-attr, scrollable-region-focusable, color-contrast) sur accueil, carte, histoire, 404 à 1440 et 390 px : 0 violation ; `scrollWidth` = fenêtre.

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | jeton `--c-btn` #f06a36 (tokens.css), #ff7d4a sur sections sombres ; `.btn--plein` l'utilise (site.css) | contraste #12302a / #f06a36 = 4,6:1 (calcul) ; fond mesuré rgb(240,106,54) |
| F1-2 | corrige | `body:has(.carte__rail) #horloge { display:none }` (site.css) | horloge `display:none` sur /carte/ à 1440 et 390 |
| F1-3 | corrige | `aria: 'none'` dans `SplitText.create` (engine/reveal.ts) | axe aria-prohibited-attr : 0 sur 4 pages × 2 largeurs |
| F1-4 | corrige | `role="region" aria-label tabindex="0"` sur les 2 `.strip` (index, histoire) | axe scrollable-region-focusable : 0 à 390 |
| F2-1 | corrige | « De 11 h à 22 h, la salle reste ouverte. » ; « 15 h, la salle est ouverte » ; pied « La salle est ouverte de 11 h à 22 h. » ; 404 « de 11 h à 22 h » (index, Pied, 404) | grep dist : plus de « pause », « ne ferme pas », « toujours ouvert » |
| F2-2 | corrige | cadran 2,5 rem en bas à droite sous 760 px ; suppression du garde `wide` dans motion/jour.ts (site.css, jour.ts) | horloge `display:grid` à 390 sur accueil, histoire, 404 |
| F2-3 | corrige | échelle 8, 14, 22 sous 480 px (classe `no-m`, index.astro, site.css) | non capturé : vérifié par le code et le build seulement |

Hypothèses : le dimanche 11-16 h reste dit dans le texte ; l'horloge est aussi masquée sur /carte/ en mobile (même règle). Concept inchangé, DESIGN.md non modifié.
