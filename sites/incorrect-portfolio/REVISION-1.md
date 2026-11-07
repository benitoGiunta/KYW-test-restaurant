# Révision 1 · incorrect · portfolio

Révision ciblée (F1, F2). Rebuild OK via `scripts/q.sh`. Mesures Playwright (serveur `serve.mjs dist --port 4733`, PID tué), 390 / 768 / 1024 / 1440 / 1920 px.

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrigé | `.formules` en `repeat(auto-fit, minmax(min(100%, 17rem), 1fr))`, `.formule` `min-width: 0` + `container-type`, chiffre `min(var(--t-prix), 15cqi)` + `overflow-wrap: anywhere` (`base.css`) | 4 cartes dans l'écran à 390, 768, 1024, 1440, 1920 (ex. 1440 : 14-364 / 368-718 / 722-1072 / 1076-1426) ; aucun chiffre ne déborde |
| F2-1 | corrigé | classe `display--mot` (`min(var(--t-mega), 9.2vw)`) sur « Commander » (`a-emporter.astro`, `base.css`) | 1440 : 1 seule ligne, `scrollWidth` 1397 = `clientWidth` |
| F2-2 | corrigé | `.bento__carte` `min-width: 0`, conteneur, `h3` en `min(var(--t-l), 7.4cqi)`, `overflow-wrap: break-word` sur h3 et p (`base.css`) | 0 titre ou description débordant de sa carte, 5 largeurs |
| F2-3 | corrigé | `.etapes ol[data-cercles]` en 3 colonnes `minmax(0, 1fr)` puis 1 colonne sous 1024 px (style inline retiré) ; `.visite` en `minmax(0, 1fr)` et 1 colonne sous 1024 px ; adresse `overflow-wrap` (`base.css`, `a-emporter.astro`) | 768 : étapes 24-744 ; plus de débordement hors transformations de reveal (scale 1,15 en cours) |
| F2-4 | corrigé | couches inactives `opacity: .62` ; flèche d'horaires en encre ; `aria: 'none'` dans les deux `SplitText.create` ; pied du site en `<div role="region" aria-label="Coordonnées">` (`base.css`, `reveal.ts`, `drivers.ts`, `Footer.astro`) | axe (wcag2a/aa + best-practice), 5 pages à 390 et 1440 : 0 `color-contrast`, 0 `aria-prohibited-attr`, 0 `landmark-no-duplicate-contentinfo` |
| F2-5 | corrigé | cause : la découpe SplitText du h1 ajoute 0,08 em (dernière ligne masquée) et fait grandir la grille hero de 12 px ; hauteur réservée avant découpe par `padding-bottom: .08em` retiré par la classe `is-split` (`engine.css`, `reveal.ts`) | `layout-shift` : 0,067 -> 0,001 (CPU x4 et x1, 1440) ; 390 : 0 ; reste la pastille d'ouverture (0,001) |
| F2-6 | corrigé | « ou par téléphone » retiré du chapeau et de la meta de `reservation/` et de l'étape « Réservez » (`reservation.astro`, `site.ts`) | `grep` « téléphone » dans `dist/.../reservation` et `dist/.../index.html` : 0 |
| F2-7 | corrigé | sans photo, plus de polaroïd vide : cartes texte pleine largeur (`equipe--texte`), grille `auto-fit` (`histoire.astro`, `base.css`) | capture 1440 : deux cartes nom + rôle occupent toute la largeur |

Refusés : 0. Impossibles : 0. F3 non traités (hors liste ciblée). Hypothèses : le rendu des débordements résiduels (± 5 px) vient des rotations volontaires `data-claque` et des polaroïds inclinés. Site publiable : oui.
