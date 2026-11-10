# Révision 1 · Le Ponti 2 · legacy (révision ciblée)

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 | corrige | Les six cases chiffrées sont supprimées : les rubriques sans photo deviennent des lignes typographiques (filet, nom en serif, sous-titre, plage de prix) ; les deux photos restent (`index.astro`, `page.css` `.cat--txt`) | `grep cat__n dist` = 0 ; capture 1440 : 2 photos + 6 lignes texte, hauteur de `.cats` 721 px à 1440 |
| F2-1 | corrige | `padding-block: .25rem` en inline-block sur liens du pied, des crédits, de l'adresse et du contact, tous pointeurs (`page.css`) | mesure : liens 33-36 px (avant 17-22) ; crédits corrigés après mesure à 17 px |
| F2-2 | corrige | Pied renommé « Coordonnées du restaurant » (`Footer.astro`) | régions de /contact/ : « Coordonnées », « Horaires », « Coordonnées du restaurant » (uniques) |
| F2-3 | corrige | héros `pos` 50 % 45 % ; façade portrait de /contact/ `pos` 50 % 14 % (enseigne) (`index.astro`, `contact.astro`) | recadrage lu sur l'image source (enseigne à 15-40 % de hauteur) ; capture mobile de contact non refaite |
| F3-1 | corrige | `<nav aria-label="Principale">` (display: contents) autour des liens d'en-tête (`Nav.astro`) | `navs: ["Principale"]` sur accueil et contact |
| F3-3 | corrige en partie | « pour un lunch ou un dîner » remplacé par « le midi comme le soir » ; tailles 13/14 px laissées | grep |
| F3-4 | corrige | bordure haute des cartes passe à la couleur d'accent au survol | lecture du CSS |
| F3-2 | refuse | favicon vide et og:image : acceptables pour une maquette (F3) | |

Rebuild via q.sh : 4 pages, 0 débordement horizontal à 1440 et 390 px (scrollWidth). Sloplint non relancé (révision ciblée). Hypothèse : le cadrage mobile de la façade n'a pas été recapturé.
