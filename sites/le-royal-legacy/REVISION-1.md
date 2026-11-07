# Révision 1 · le-royal legacy (F0, F1, F2 de REVUE-1.md)

| id | décision | changement | preuve |
|---|---|---|---|
| F1-1 CLS mobile 0,128 | corrigé | `Base.astro` : Google Fonts remplacé par 3 woff2 latin auto-hébergés (`public/fonts/`), `@font-face` en `font-display: optional`, 3 `<link rel="preload" as="font">` ; hauteur du héros mobile déjà fixée par `aspect-ratio` 4/3 | Playwright CPU x4 + 4G lente, 2 passes à 390 px : CLS 0 et 0 (avant 0,128), 3 polices chargées |
| F2-1 façade étirée | corrigé | `page.css` : héros sans `min-height` plein écran, `.slot` en `aspect-ratio: 1200/896` (plus de recadrage vertical), contenu centré | 1440 px : image 806 x 602 pour 806 px de source, x1 sans étirement ; capture lue. Variantes facade déjà à 800 et 1200 px réels (le « 806 » de la revue était la largeur CSS) ; la source ne dépasse pas 1200 px, le x2 Retina reste inévitable |
| F2-2 polices | corrigé | idem F1-1 : woff2 latin, Archivo variable (400 et 500 dans un fichier), 64 Ko au total contre 376 Ko | `dist/` : 3 preload, 0 `fonts.googleapis` |
| F2-3 images lourdes | corrigé | `terrasse-*` régénérées depuis le JPG source (qualité 66) ; 960 remplacée par 800 (`site.ts`) pour qu'un téléphone x2 ne charge pas 960 | 640 : 98 Ko, 800 : 146 Ko, 1200 : 295 Ko (avant 122 / 245 / 359) |

Refusés : 0. Impossibles : 0. F3 non traités (hors consigne).
Hypothèse : `optional` peut garder la police de repli à la toute première visite sous réseau très lent ; choisi pour garantir CLS 0 (leçon revision.md). `DESIGN.md` : héros 50/50 inchangé, la façade ne prend plus toute la hauteur du premier écran. sloplint src : 0 FAIL, 0 WARN. Serveur (PID noté) arrêté.
