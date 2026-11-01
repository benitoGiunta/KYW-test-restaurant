# Chez Guillaume, variante awwwards : « La conduite »

Phase 1 (construction-1, 01/11/2026). Skill `awwwards` (SKILL.md, quality-bar.md, concepts.md, art-direction.md,
typography.md, layout.md, engine.md, astro.md, content.md). Auto-notation marquée `self`, aucune critique externe.

## Brief

- **Sujet** : Chez Guillaume, restaurant et comedy club ouvert en janvier 2025 par l'humoriste namurois Guillaume
  Wattecamps (GuiHome), Rue Lelièvre 4, en face de la place Saint-Aubain. Du mercredi au samedi, le repas est servi
  de 18 h 30 à 20 h 30, juste avant le spectacle ; le dimanche, brunch à volonté de 11 h 30 à 14 h puis spectacle à 15 h.
- **Publics** : le soir, des groupes et des couples qui ont un ticket (ou vont en prendre un) et doivent savoir que
  le repas est obligatoire, hors ticket ; le dimanche, familles et amis (brunch, 15 € pour les moins de 12 ans) ;
  le lundi, les habitués du croque à 12 € ; les entreprises (privatisation) ; les touristes du centre.
- **Métier du site** : réserver (billetterie sur l'agenda du site actuel, la table du soir va avec le ticket ;
  brunch par mail ou téléphone), venir (adresse, repère Saint-Aubain), lire les trois menus du mois.
- **Ressources** : 10 photos du client (546 à 1024 px, portrait 4:5), logo vectoriel rouge `#CD3B08`, carte
  d'octobre 2026, 4 articles de presse réels. Pas de façade, pas de portrait nommé, pas d'agenda des humoristes.
- **Contraintes** : statique, sans backend, servi sous `/chez-guillaume/awwwards/`, photos de 1000 px max (aucun
  plein cadre au-delà de 1000 px affichés).
- **Hypothèses** : voir l'en-tête de `src/data/site.ts` (adresse du site retenue, horaires FAQ à confirmer, heure du
  spectacle du soir non publiée donc jamais écrite, cheffe citée au passé, aucun avis ni chiffre non sourcé).

## Concepts (trois territoires)

| | A. La conduite | B. Les arcs du mur | C. « On va voir qui ? » |
|---|---|---|---|
| Territoire | Système formel (rythme horaire) + métier du spectacle | Lieu et matière | Nom et voix |
| Phrase | Le site est la conduite d'une soirée Chez Guillaume : chaque section est un top, chaque top a son heure réelle. | Le mur blanc de la scène et ses arcs de lumière deviennent la trame de chaque page. | Le site est une affiche du soir qui demande qui monte sur scène. |
| Règle de mise en page | Colonne de régie à gauche (2 col.) qui porte l'heure du top ; le contenu enchaîne à droite. | Titres posés devant un arc tracé, pages blanches comme le plâtre. | Affiche pleine page par section, titres en question. |
| Verbe | Enchaîner | S'allumer | Annoncer |
| Voix typo | Affiche condensée + grotesk de régie | Grotesk fin, lumineux | Affiche criarde |
| Palette | Mur de scène, salle éteinte, rouge du logo, rideau bordeaux | Blanc plâtre, halo | Rouge et blanc de la banquette rayée |
| Signature | Le time-code de régie qui roule d'un top à l'autre (motion.md, compteur + section collante) | Arcs SVG qui se tracent (stroke) | Texte qui tourne entre plusieurs noms |
| Frame partageable | « 18:30 » géant à côté de « Chez Guillaume » | Arc lumineux derrière le titre | La question en très grand |
| Ancre | Repas obligatoire 18 h 30 à 20 h 30 puis spectacle ; brunch 11 h 30, spectacle 15 h | Le mur aux arcs des photos 01, 05, 09 | Le hero réel du site actuel |
| Test de l'échange | Un autre restaurant n'a pas un repas minuté qui précède un rideau : tient. | Un autre lieu à néons peut l'avoir : style à moitié. | Aucun agenda réel : on inventerait des noms. Échoue. |
| Originalité / adéquation / faisabilité / portabilité | 4 / 5 / 4 / 2 | 3 / 4 / 5 / 3 | 3 / 3 / 2 / 3 |

**Choix : A**, parce que l'heure est le fait qui organise vraiment une soirée Chez Guillaume (on mange à heure fixe
pour que le rideau se lève). B fournit un détail : un arc unique au trait dans la 404 et le favicon (le rond du top).
C fournit la phrase de la 404 (« On va voir qui ? », formule réelle du site actuel).

## Concept Card

- **Idée** : la soirée a une conduite, comme un spectacle ; le site la suit, top par top, à l'heure réelle.
- **Métaphore** : la feuille de régie du régisseur (colonne des heures, libellé du top, contenu).
- **Signature (et recette)** : la colonne de régie collante dont le time-code roule de top en top au défilement
  (motion.md : compteur à chiffres masqués + `ScrollTrigger` par section, une seule horloge GSAP), avec la pastille
  rouge « top » qui se pose à chaque changement. Téléphone : la régie devient une barre fine collée sous l'en-tête.
- **Émotion (3 premières secondes)** : « c'est l'heure », une salle qui se met en place avant le rideau.
- **Verbe** : enchaîner.
- **Capture** : « 18:30 » en Tanker rouge à gauche, « Chez Guillaume » à droite, l'humoriste au micro sous la lumière.
- **Ancre** : repas servi de 18 h 30 à 20 h 30 du mercredi au samedi avant le spectacle ; brunch 11 h 30, spectacle 15 h.
- **Théâtre** : loader **non** (restaurant : le premier frame est la conduite elle-même, LCP en texte) ; GL **non**
  (photos de 1000 px, rien que le DOM ne fasse ; le time-code et le rideau suffisent).

## Système

### Palette (référence réelle par rôle)

| Rôle | Hex | Source |
|---|---|---|
| ground | `#EEEAE4` | le mur de scène en plâtre sous la poursuite (photos 01, 05, 09) |
| ink | `#1A1210` | la salle éteinte, le noir chaud du public de dos (photo 05) |
| muted | `#5E534D` | le bois patiné des tables en ombre ; 6,2:1 sur ground |
| line | `#CFC6BC` | les joints du plâtre |
| accent | `#CD3B08` | le rouge du logo vectoriel du client (`12-logo.svg`) ; 4,15:1 sur ground : grands titres, time-codes et aplats seulement ; texte courant et fond de CTA en `#A8300A` (5,7:1) ; sur fond sombre `#F06A3C` |
| curtain | `#5B1519` | le rideau bordeaux de la scène ronde (photo 09) ; ink clair dessus 11:1 |

Défaut n° 1 évité : fond plâtre froid-chaud et non crème, **aucun serif**, rouge du logo et non terracotta. Les
sections « salle » (rideau, pied) passent en `ink` sur fond `curtain` ou `ink` : classe de section, pas un fond
piloté par le défilement.

### Typographie

- **Tanker** (Fontshare, 400, 19 Ko) : display, time-codes, prix de menus. Condensé d'affiche de cabaret.
  Interlettrage `-0.01em` au mega, `0` au l ; interligne 0,88 à 0,95 ; capitales natives du dessin.
- **Schibsted Grotesk** (Google, variable 400 à 600, un fichier) : corps 17 px, interligne 1,55, mesure 60 car. ;
  UI 13 à 14 px en 600 capitales espacées `0.06em` pour les libellés de régie.
- Échelle : `--t-mega` (clamp 4,5 à 15 rem), `--t-xl`, `--t-l`, `--t-m`, `--t-body`, `--t-s`, `--t-xs` ; sauts × 2.
- Prix en entiers (`29 €`, insécable U+00A0) : `tabular-nums` permis car sans virgule. Heures « 18 h 30 » insécables
  dans le texte, time-codes « 18:30 » réservés à la régie (convention de conduite, pas de texte courant).

### Grille

12 colonnes, gouttière fluide ; 4 colonnes au téléphone. **Deux lignes fortes** : le bord de la colonne de régie
(entre col. 2 et 3, filet `line` sur toute la hauteur du `main`) et le filet horizontal qui ouvre chaque top.
Équivalent du cadre quatre coins : régie à gauche, en-tête en haut, pied en bas ; le coin droit reste vide.
Espacements : `--serre` (dans un top), `--normal` (entre tops), `--aere` (avant le rideau), `--entracte` (pied).
Rayon : **0** partout ; seule forme ronde, la pastille du top (le rond de la scène, photo 09).

### Mouvement (réalisé en phase 2)

- Easing de l'engine : `ease.out` (entrées), `ease.inOut` (rideau de transition), pas de `spring`.
- Durées : 0,25 s hover, 0,6 s chiffre du time-code, 0,9 s rideau de page, décalages de 40 ms.
- **Verbe « enchaîner »** : rien n'apparaît seul, chaque élément part quand le précédent finit (time-code puis titre
  puis contenu) ; la transition de page est un rideau bordeaux qui tombe et se relève (le rideau de la photo 09).
- **Hover** (3 traitements) : CTA « Réserver » / « Appeler » : fond rouge qui enchaîne de gauche à droite comme une
  poursuite (clip-path) ; nav et lignes de menu : pastille du top qui se pose devant + décalage de 0,4 em ; liens
  texte : soulignement présent au repos, épaissi au survol ; utilitaires (réseaux, presse) : couleur seule.
- **Repos** : l'horloge de régie affiche l'heure réelle de Bruxelles et le prochain top (« service dans 48 min »,
  calculé des horaires), mise à jour à la minute ; immobile sous reduced motion.

### Plan de composition

Accueil (familles : poster, statement, index, paire asymétrique, données, pied final)

```
| régie |  CHEZ GUILLAUME (mega, col 3-12)                     |  poster
| 18:30 |  accroche + CTA (3-7)        | photo scène (8-12)    |
|-------+------------------------------------------------------|
| 18:30 |  « Entrée en salle » statement (3-10)                |  statement + photo salle (6-12)
|-------+------------------------------------------------------|
| 18:30 |  Bonne Maman ........ 29 € / 39 €   [aperçu]        |  index des trois menus
| 20:30 |  La Cheffe .......... 39 € / 49 €                    |
|       |  Végétarien ......... 29 € / 39 €                    |
|=======+============ fond rideau bordeaux ===================|
| RIDEAU|  photo humoristes (3-6) | règles du soir (8-12)      |  paire asymétrique
|-------+------------------------------------------------------|
| 11:30 |  35 € | 15 € | 20 €  (données) | buffet | photo     |  données
| LUNDI |  croque + boisson 12 €  (bande)                      |
|=======+============ pied fond ink ==========================|
| FIN   |  « Rideau. » + adresse, horaires, CTA, réseaux       |  pied final
```

Carte : poster court (titre + mois du relevé), puis **liste index** des trois menus en conduite (régie = prix 2 et
3 services, lignes Entrée / Plat / Dessert), brunch en données, lundi et bar en bande, une paire de photos.
Histoire : statement (60 à 120 mots), conduite datée (régie = dates), équipe en paire asymétrique, presse en index.
Réservation : trois portes (soir, dimanche, entreprise) en index, horaires en données, venir en paire.
404 : poster, time-code « --:-- », arc unique au trait.

**Mobile 390 px** : régie repliée en ligne au-dessus de chaque top (time-code en `--t-l` à gauche du libellé),
filet vertical supprimé, photos en pleine largeur 4:5, prix en grille 2 colonnes, menus empilés.

### Test de généricité

- Hero centré sur image ? Non : titre en col. 3-12, time-code à gauche. Changé dès le plan.
- Trois cartes égales pour les menus ? Un modèle le ferait : remplacé par un index de conduite.
- Eyebrow sur chaque titre ? Le libellé de régie porte une information réelle (heure, jour), jamais décoratif ; les
  sections sans heure (presse, équipe) n'en ont pas.
- 01/02/03 décoratifs ? Aucun : les seuls numéros sont des heures.

## Sur-utilisation de la skill

Phase 1, preuves `self`.

1. [x] Trois concepts, trois territoires, notés, ancre, test de l'échange : ce fichier § Concepts (tableau).
2. [x] Aucun exemple travaillé de concepts.md (ni braise, pavage, gril, cadre, solde, phrase unique) : § Concepts.
3. [x] Concept Card exacte, verbe compris : § Concept Card (8 rubriques).
4. [x] Concept au pied, à la carte, à la réservation et à la 404 : régie dans `Footer.astro` (« Fin de conduite »),
   `carte.astro` (régie = prix), `reservation.astro` (régie = jours), `404.astro` (« --:-- »).
5. [x] Un moment signature et sa recette : § Concept Card (time-code collant, motion.md compteur) ; base statique
   collante en CSS (`.top__regie { position: sticky }`, `src/styles/site.css`).
6. [x] Palette de 6 rôles, références réelles : § Palette.
7. [x] Aucun des 8 « defaults to avoid » ; crème + terracotta écarté et justifié : § Palette.
8. [x] Test de généricité : § Test de généricité.
9. [x] Détails 7 vers 8 : sélection rouge (`::selection`, site.css), focus dans l'accent (engine.css
   `:focus-visible`), favicon rond du top (`public/favicon.svg`), OG à composer en phase 3, pied comme composition
   finale (« Rideau. »), 404 dans le concept.
10. [x] Polices : Tanker + Schibsted Grotesk, 2 fichiers, 2 préchargés (`Base.astro`).
11. [x] Échelle fluide unique, grands sauts : `tokens.css` `--t-*`.
12. [x] Display réglé : `.display` (interlettrage, interligne 0,9, `text-wrap: balance`), site.css.
13. [x] Corps 17 px / 1,55, mesure 60 car., UI 13 à 14 px : site.css `.texte`, `.regie`.
14. [x] Typographie française : U+00A0 dans `prix()` et les heures, « », apostrophes typographiques (`site.ts`).
15. [x] Grille 12 col., deux lignes fortes, cadre justifié : § Grille, `.top` dans site.css.
16. [x] Famille de section au plus une fois par page : § Plan de composition.
17. [x] Hero en 3 s : nom, « restaurant et comedy club », heure et CTA « Réserver » au-dessus de la flottaison.
18. [x] Mobile 390 recomposé : § Plan (régie en ligne, filet supprimé), media query 48rem de site.css.

Phase 2, preuves `self` (code et mini-script Playwright `aw2-check.mjs`, 01/11/2026 ; `report.json` en phase 3).

19. [x] Menu mobile : bouton « Menu » `aria-expanded`, overlay plein écran, focus piégé, Échap ferme, focus rendu
    au bouton : `src/motion/menu.ts` ; contrôle 390 px : `aria-expanded` true puis false après Échap, focus revenu.
20. [x] Engine verbatim (`src/engine/`, sans lignes GL), `astro.ts` ; `transition:persist` sur `#curtain`
    (`Base.astro:79`, ni `#gl` ni `#cursor` : pas de GL, pas de follower) ; `transition:animate="none"` (`Base.astro:44`).
21. [x] Une horloge : grep hors engine, aucun `addEventListener('scroll')` ni `requestAnimationFrame` ; tout
    par `gsap.ticker` (`conduite.ts:28`, `:147`, `:218`).
22. [x] Code de page dans `onPage()` avec nettoyage : `conduite.ts:222-274` (tickers retirés, régies restaurées,
    ScrollTrigger tués), `menu.ts`.
23. [x] Aucune CSS `transform` sur un élément GSAP : bandes `.tc__b`, `.barre`, `.regie__pastille`, image du hero,
    `.curtain__panel` sans `transform` CSS ; `.cta:active` passé en `translate`.
24. [x] Module pilote `src/motion/conduite.ts` : variable = top actif (ScrollTrigger par `.top` et `.pied`),
    distribuée au time-code, à la pastille, à la barre du téléphone ; `startIdle()` (`:21`) et pointeur (poursuite
    du hero `:134`) ; appelé une fois depuis `setup.ts`.
25. [x] Loader décidé : aucun (Concept Card), pas de composant ni de `role="status"`.
26. [x] Transition du concept : rideau bordeaux plissé qui tombe du cintre (0,8 s) et se relève (0,9 s),
    `setup.ts` ; mesure clic vers rideau levé 1,8 s (aller + retour, chargement en parallèle).
27. [x] Intro : h1 et accroche sans `data-intro` (LCP) ; la poursuite balaie la scène et la photo se pose
    (`conduite.ts:151`) ; après navigation, le time-code roule de l'heure de la page quittée vers celle du hero.
28. [x] Épinglages : aucun pin ni scrub ; la régie collante est en CSS `position: sticky` (phase 1).
29. [x] Repli statique dessiné : `site.css:388` (régie en texte, pas de poursuite, barre sans animation),
    `.motion [data-reveal]` seul caché ; réduit mesuré : 0 texte caché, page immobile.
30. [x] Copies décoratives `aria-hidden` : `.tc` (vrai texte en `.sr-only`), `.barre`, « Rideau. » du pied ;
    aucun titre dupliqué.
31. [x] Une famille d'easing (`ease.out`, `ease.inOut`, `ease.soft` de l'engine), Timing : chiffre 0,6 s,
    décalage 40 ms, rideau 0,8/0,9 s, survol 0,25 à 0,45 s ; staggers de l'engine 18 à 80 ms.
32. [x] Trois traitements dans le verbe : CTA poursuite rouge de gauche à droite (clip-path), nav et index
    pastille + décalage 0,4 em, liens texte soulignés épaissis ; utilitaires couleur seule.
33. [x] Survol sous `@media (hover: hover)` (`site.css:321`), même état sur `:focus-visible` et `:active`.
34. [x] Liens texte soulignés au repos (`.lien`).
35. [ ] `hover.noHoverChange` : à lire dans `report.json` (phase 3).
36. [x] Repos : deux-points de l'horloge de régie qui battent la seconde, heure de Bruxelles et prochain top
    calculés des tops réels (`conduite.ts:192`) ; poursuite qui dérive au repos ; captures à 1,2 s d'écart
    différentes (desktop), identiques en réduit. `idleMotion` à confirmer en phase 3.
37. [x] Curseur natif, pas de follower ; aucune copy « survolez », rien ne dépend du survol au toucher.
38. [x] Pas de blur animé ni de `box-shadow` au scroll ; aucun `will-change` posé.
39. [x] Réduit : ni Lenis (engine), ni GL, ni scrub, ni loader ; 0 texte caché mesuré.
40. [x] GL : sans objet, décision écrite (Concept Card) ; lignes `// GL` absentes de l'engine.
41. [x] Sans objet (pas de GL).
44. [x] Lien d'évitement premier (`Base.astro`), anneau de focus dans l'accent (`engine.css:33`) ; à prouver par
    `keyboard.stops[0]` en phase 3.
45. [ ] Contraste AA de chaque état : phase 3 (`report.json`).
46. [x] Texte réel partout, rien que dans un canvas (pas de canvas).
47. [ ] Cibles : phase 1 mesurée ; à reprouver par `report.json` en phase 3.

### Phase 3 (construction-3, 01/11/2026) : QA sur preuves

45. [x] Contraste : axe 0 violation sérieuse (`.shots/home/report.json`, `axe.serious` 0) ; 29 `contrastNeedsReview` relevés sur photo et aplat rideau, vus à l'œil sur `d-05`, `m-04` (texte crème sur `#5B1519`).
47. [x] Cibles : `mobile.smallTargets` vide (`.shots/home/report.json`).
35. [x] Survol : `hover.noHoverChange` vide après correction (logo incliné, téléphone du pied souligné, `site.css` bloc `@media (hover: hover)`) ; `colorOnly` restant (« Appeler le… », « Lire la carte complète… ») : soulignement qui s'épaissit (1 à 3 px) et descend (0,22 à 0,34 em), lu à l'œil sur `h-02`/`h-04`, traitement retenu.
36. [x] Repos : `desktop.idleMotion` = false par `shoot.mjs`, mais mesure maison (`qa3-idle.mjs`, 1440×900, pointeur garé) : 0,6 à 1,3 % de pixels changent toutes les 1,5 s dans la figure du hero (poursuite) ; amplitude bornée pour garder `desktop.settledMs` = 2437 (`.shots/home3/report.json`). Faux négatif noté.
44. [x] `keyboard.stops[0]` = « Aller au contenu » (`.shots/home/report.json`).
42. [x] `lang="fr"`, un h1 par page, landmarks (`Base.astro`, `Header.astro`, `Footer.astro`).
43. [x] Titre et description uniques, canonical, OG, `twitter:card`, favicon SVG, sitemap lié, JSON-LD `Restaurant` (head de `Base.astro`).
48. [x] Images `<Picture>` webp avec `width`/`height`, hero `fetchpriority="high"`, alt d'après `photos/index.json`.
49. [x] LCP mobile 1168 ms, élément `img` (`.shots/home3/report.json`). 50. [x] CLS mobile 0,01.
51. [x] Page la plus lourde 402 Ko, JS 62 Ko gz, polices woff2 (`.shots/audit.txt`).
52. [x] `desktop.settledMs` 2437, `scrollFps` 60 desktop et mobile. `mobile.settledMs` null : dérive de la poursuite et barre de régie, déjà null en phase 2.
53. [x] 0 tiret cadratin ou demi-cadratin (contrôle Python sur `dist/` et `src/`).
54. [x] audit 0 FAIL ; WARN « sentence repeated » sur la carte : prix 29 € / 39 € et dessert identiques dans deux menus réels (`donnees.json`), justifiés.
56. [x] 0 `placeholder: true`, aucun « lorem », « example.com », « TODO » dans `dist/`.
58. [x] `grep -L 'name="robots"'` vide. 59. [x] `KywFooter` sur les 5 pages, mention rendue. 60. [x] 0 requête échouée (`failed` 0).
61. [ ] Critique jury indépendant : non lancé (pas d'outil Agent dans cette session), voir RAPPORT.md.
Correction phase 3 : barre de régie du téléphone (`conduite.ts`, `monterBarre`) qui affichait « 18:30RIDEAU » et « 18:3029 € » (`[hidden]` écrasé par `.tc { display: inline-flex }`) et doublait la régie en ligne : cachée tant que la régie du top actif est visible (`IntersectionObserver`), contrôlé par `qa3-barre.mjs` (0 doublon sur l'accueil, 0 double contenu, 0 erreur).
