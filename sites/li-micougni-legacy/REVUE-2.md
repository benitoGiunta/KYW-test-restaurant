# Revue legacy · Li Micougni · passe 2
Verdict : A_CORRIGER
Lecture en une ligne de l'idée du site (sans avoir relu DESIGN.md) : une enseigne wallonne en bordeaux, lettrage gothique et plaque de titre sur la photo de salle ; la carte se lit comme une ardoise à filets, la vitrine est une mosaïque de plats.
Scores /10 :
- design 8 : la mosaïque de la vitrine est réparée (864 × 1072 + vignettes 416 × 520, sans recouvrement, `lm2-planche-1.png`) ; la photo de l'accueil À propos sort de la fenêtre entre 990 et 1440 px (F2-1).
- usabilité 8 : 0 débordement de page sur 24 cas, h1 unique, menu et rail intacts ; deux liens de contact à 21 px sur Événement privé (F2-2).
- créativité 7 : identité propre (plaque, gothique, or sur bordeaux), pages Événement et À propos toujours très sobres ; aucun motif d'AI slop.
- contenu 8 : 0 fait faux, 0 invention ; alt des plats = champ `sujet` de `photos/index.json` ; un chapeau garde « Les nouvelles de Li Micougni » (F3-1).
- technique 8 : build du 10/11 10:16, postérieur à `src/` (`find -newer` vide) ; 0 erreur console, 0 requête en échec, 0 violation axe (24 cas : 8 pages × 1440, 390, 360 px), 244 liens internes dont 0 mort, LCP mobile de la vitrine 956 ms.

Preuves : QA-revue2.md (captures postérieures au dist, 10:18 et 10:20) réutilisé pour accueil, vitrine, 404 ; mesures maison sur serveur propre (port 4781, PID 21089, arrêté) : axe-core complet de `node_modules`, console, requêtes, débordement, cibles, balises sur 8 pages × 3 largeurs ; mosaïque à 6 largeurs ; LCP/CLS sous CPU ×4 + 4G lente en deux passes ; contraste canvas nœud par nœud ; balayage « élément hors fenêtre » sur 8 pages × 12 largeurs (1920 à 360 px). Planches : `.shots-li-micougni-legacy-revue2/lm2-planche-1.png`, `lm2-v-ap.png`.

## Vérification des corrections annoncées (REVISION-1.md)
| id | verdict | mesure |
|---|---|---|
| F1-1 mosaïque desktop | confirmé corrigé | 1920, 1440, 1024, 768 : 6 cellules, 0 chevauchement, `scrollWidth` = fenêtre ; à 1440 : saumon 864 × 1072 (x 64), viande 864 × 1072 (x 512), vignettes 416 × 520 ; chaque `img` = son cadre (écart 0) |
| F2-1 LCP vitrine | confirmé corrigé | 956 ms puis 956 ms (deux passes, ×4 + 4G lente), élément `saumon-720.webp` ; CLS 0,0017. Le QA-revue2 donne 4144 ms en une passe avec sa propre méthode : écart non reproduit (F3-2) |
| F2-2 textes vitrine | corrigé, reste un résidu | title « les plats en photos », méta et H2 neutres ; grep du dist : 0 « nouveauté », 0 « coulisses », 0 « salle en photos » ; chapeau « Les nouvelles de Li Micougni, en photos » (F3-1) |
| F2-3 cibles < 24 px | corrigé en partie | 0 cible < 24 px sur accueil, menu, vitrine, terrasse, À propos, contact (390, 360, 1440) ; reste Événement privé (F2-2) : la mesure annoncée ne couvrait que trois pages |
| F2-4 trous mobile | confirmé corrigé | 390 : 358 × 269, 171 × 214 ×2, 358 × 269 ×3, plus de cellule seule ; 360 idem |

## Findings
### F2 mineur
- **F2-1 · À propos, photo du hero qui sort de la fenêtre** · `src/styles/page.css:152` (`.split--stage .photo { min-height: 440px; max-height: 640px; aspect-ratio: 6 / 5 !important; }`) avec `:147` (`.split--7-5 > :last-child { grid-column: 9 / 13 }`). Preuve : `aspect-ratio` forcé + `min-height` donnent 528 px de large pour une colonne de ~440 px (même mécanisme que l'ancien F1-1). `getBoundingClientRect` : droite de la photo à 1488 px pour 1440 (48 px coupés), 1439 pour 1366, 1381 pour 1280, 1261 pour 1100, 1211 pour 1024 (187 px coupés), 1188 pour 990 ; à 1920 elle dépasse le conteneur de 48 px (1728 contre 1680). `scrollWidth` reste égal à la fenêtre (rognage), ce qui cache le défaut à axe et au QA. Visible sur `lm2-ap-win-1024.png` et `lm2-ap-win-1280.png` : la photo touche le bord droit et déborde l'alignement de l'en-tête. Les autres pages à `.split--stage` ne sont pas touchées (balayage 8 pages × 12 largeurs). Correction : retirer `min-height: 440px` ou `aspect-ratio: 6 / 5 !important` sur `.split--stage .photo` (laisser la colonne fixer la largeur, `height` par `aspect-ratio` seul, `max-height` conservé), puis remesurer que la droite de la photo ≤ droite du conteneur de 990 à 1920 px.
- **F2-2 · Événement privé, deux liens de contact à 21 px** · `src/pages/evenement-privee.astro:34` (`<p><a class="num" …>` téléphone 124 × 21 et e-mail 158 × 21, 1440, 390 et 360 px). Ce sont deux lignes de liens isolées (`<br />`), pas des liens dans une phrase : la règle de cible de 24 px s'applique. Correction : classer ces deux liens comme `.lieu a` (inline-flex, `min-height: 24px`, 44 px sous `pointer: coarse`) ou les poser en `display: inline-flex; min-height: 24px`.

### F3 finition
- **F3-1** Vitrine, chapeau « Les nouvelles de Li Micougni, en photos : quelques plats de la maison. » : « nouvelles » reprend le mot de la page d'origine (« nouvelles saveurs ») mais annonce de l'actualité que la page ne contient pas ; écrire « Quelques plats de la maison, en photos. ».
- **F3-2** LCP mobile vitrine : le QA-revue2 mesure 4144 ms, mes deux passes 956 ms (même élément probable, méthode de throttling différente). Non reproduit ; refaire une mesure de QA après correction si le chiffre est un critère.
- **F3-3** (reporté de la revue 1, non traité) 404 : description identique à celle de l'accueil (`404.html`, `meta description`) ; donner une phrase propre à la page.
- **F3-4** (reporté, non traité) Hero mobile de l'accueil : la photo montre surtout le mur blanc, la salle en bas (`lm2-home-390.png`) ; `object-position` plus bas.
- **F3-5** (reporté, non traité) Événement privé très mince (3 lignes de texte, 2 photos) ; grands vides verticaux sur mobile.
- **F3-6** Rail d'ancres du menu : défile horizontalement de 1280 px à 360 px (éléments à droite de la fenêtre, scroller focusable, axe 0) ; acceptable, à signaler pour la lisibilité des dernières rubriques.

## Contrôles conformes (pas de finding)
Faits : nom, adresse (Rue des Brasseurs 110, 5000 Namur), téléphone +32 470 59 75 96, e-mail, Instagram, Facebook conformes à `donnees.json` sur les 8 pages ; horaires non affichés en dur sauf mentions « à confirmer » ; JSON-LD Restaurant avec adresse, sans horaires (honnête) ; alt des 6 plats de la vitrine identiques au `sujet` de `photos/index.json`. Mention « Maquette KYW, certaines données sont illustratives. », `noindex`, un `.kyw-footer__logo` et un seul `<footer>` sur 8 pages × 3 largeurs ; `lang="fr"`, h1 unique, titles et descriptions uniques sauf la 404 (F3-3) ; aucun tiret cadratin. Contraste : axe « à vérifier » (3 sur l'accueil, 2 sur À propos, 1 sur menu mobile) tranché par script canvas nœud par nœud : 0 texte sous le seuil sur accueil (1440 et 390), À propos (1440), menu (390). 244 liens `href`/`src` internes, 0 mort, 0 lien hors `/li-micougni/legacy/` ; 7 routes, 404, PDF et sitemap en 200.

## Ce qui est bien (à ne pas casser)
1. La mosaïque de la vitrine corrigée : cellules à leur largeur de colonne à 6 largeurs, mobile sans trou.
2. Plaque du hero et palette bordeaux / or / gothique, rail d'ancres de la carte (0 écart de prix déjà prouvé en passe 1).
3. Honnêteté du contenu : formulaire qui n'envoie pas, horaires « à confirmer », alt fidèles aux sujets des photos.
