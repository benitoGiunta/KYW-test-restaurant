# REVISION-2 · escale-en-vue · portfolio

| id | décision | changement (fichier) | preuve |
|---|---|---|---|
| F1-1 contraste « On y parle de » | corrige | `.carte-avis__theme` en `--c-ink` (11,4:1 sur paille), `src/styles/base.css` | couleur calculée rgb(31,26,23) à 320/390/1024/1440 |
| F2-1 parasol sur le titre | corrige | classe `obj--ornement` (index.astro), sous 600 px : remonté (top -2,5rem), opacité 0,25, z-index 0 ; base.css | capture 320 px : le titre est net, le parasol dépasse au-dessus |
| F2-2 Parking gratuit | corrige | ligne retirée, `src/data/site.ts` | grep `Parking` dans dist html/js : 0 |
| F2-3 contact titré « Réserver » | corrige | title, description, h1 « Nous contacter », phrase « Pendant la saison… », `reservation.astro` | grep dist : title et h1 mis à jour |
| F2-4 « prochaine ouverture à confirmer » | corrige | « …, terminée : rendez-vous à la prochaine saison », `src/motion/setup.ts` et même texte rendu côté serveur dans `Marquee.astro` | grep `à confirmer` dist html/js : 0 |
| F2-5 redite accueil | corrige | texte du bloc corail ramené à une phrase (jardin, parmigiana), `site.ts` manifeste.texte | « paysans-artisans » : 1 occurrence sur l'accueil, 1 sur histoire |
| F2-6 CLS desktop | corrige | cause : le texte du bandeau réécrit par JS changeait sa hauteur (décalage de 6 px du hero) ; texte final rendu dès le HTML ; preload de satoshi-700 (`Base.astro`) | CLS 1024 : 0,076 puis 0,004 ; 1440 : 0,051 puis 0,003 ; mobile < 0,002 |

Bilan : 7 corrigés, 0 refusé, 0 impossible. scrollWidth = largeur de fenêtre à 320/390/1024/1440. Build OK. Hypothèse : axe color-contrast non relancé (contraste calculé). F3 non traités. Publiable : oui.
