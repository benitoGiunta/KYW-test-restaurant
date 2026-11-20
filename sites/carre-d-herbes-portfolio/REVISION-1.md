# Révision 1 · carré d'herbes · portfolio

| id | décision | changé (fichier) | preuve |
|---|---|---|---|
| F1-1 loader | corrige (desktop) | `engine/loader.ts` (MIN 1,1 à 0,7 s, lissage 0,12 à 0,22), `motion/setup.ts` (sortie 1,4 s à ~0,85 s) | `is-loaded` à 2072 et 2042 ms à 1440 px (avant 3104-3175). Mobile : loader masqué sous 768 px, mesure 5,4 s en CPU x4 + 4G lente, dominée par le réseau : correction partielle, gain mobile non démontré |
| F2-1 axe color-contrast | corrige | `HeroPage.astro` (plus de nœud texte, `data-chiffre`), `base.css` (`::before content: attr(data-chiffre)`) | axe color-contrast : 0 violation sur /carte/, /histoire/, /menu/ à 1440 px |
| F2-2 nom du h1 | corrige | `HeroPage.astro` (span sr-only retiré) | h1 lus « LES PRIX », « LA MAISON », « LES PLATS » ; 0 `sr-only` chiffré dans dist |
| F2-3 pages redondantes | corrige (renommage + doublon) | `Header.astro`, `Footer.astro`, `carte.astro`, `menu.astro` (« Formules » devient « Les prix », « Les menus » devient « Les plats »), `histoire.astro` (phrase des deux hôtes retirée du corps, gardée dans la carte d'équipe) | 0 « Formules » dans dist/index.html ; build 7 pages OK. Pas de fusion des pages (risque DESIGN) |
| F2-4 gabarit uniforme | corrige en partie | `reservation.astro`, `fetes.astro` (eyebrow retiré) | 0 `.petite-cap` dans le hero de /reservation/. Photo plein cadre sur /histoire/ non faite (refus : refonte de page, F2) |

Hypothèse : « Les plats » plutôt que « La carte », car le site dit ne pas avoir de carte à la carte. F3 non traités (hors liste).
