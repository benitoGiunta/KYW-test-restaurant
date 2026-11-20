# Le D’Arville, variante awwwards : « La balade »

Phase 1 (construction-1, 20/11/2026). Skill `awwwards` ; auto-notation marquée `self`, aucune critique externe.

## Brief

- **Sujet** : Le D’Arville, restaurant gastronomique de saison dans une ferme du 19e siècle à Wierde (Namur), Rue d’Arville 94. Chef et propriétaire Olivier Bourguignon, avec Estelle. Villa d’hôtes Barabas à 200 m, prairie de plus de 5 ha entre les deux.
- **Publics** : couples et familles du dimanche midi, tables de fêtes (jeudi soir à samedi), amateurs de chasse et de poisson (lièvre, homard du vivier), clients de la villa Barabas, touristes de Namur.
- **Métier du site** : réserver (en ligne chez le client, téléphone, e-mail), lire les deux menus et la carte, venir (adresse, parking).
- **Ressources** : 22 photos du client (style HDR 2018, 2000 px), 19 retenues ; pas de logo vectoriel (favicon dessiné pour la maquette) ; pas d'avis citables.
- **Contraintes** : statique, servi sous `/le-d-arville/awwwards/`, photos saturées donc cadrées en petits formats et sous voile sombre.
- **Hypothèses** : voir l'en-tête de `src/data/site.ts` (heures non publiées donc jamais écrites, aucune distinction ni note affichée, prix des desserts absents, Bon Plan sans contenu, seule distance sourcée : 200 m).

## Concepts (trois territoires)

| | A. La balade | B. Le vivier | C. La saison de chasse |
|---|---|---|---|
| Territoire | Lieu et nom du menu : le domaine entre ferme et villa | Matière du métier : le homard en direct du vivier | Calendrier : lièvre, biche, cèpes, la carte qui tourne |
| Phrase | Le repas est une balade de 200 m de la ferme à la villa Barabas : chaque service est une halte sur le sentier. | Le site est un bassin : le contenu remonte comme du vivier, plat après plat. | Le site change de page selon la saison de la carte. |
| Règle de mise en page | Un sentier vertical qui traverse chaque page ; les haltes sont les services du menu. | Vagues d'eau comme séparateurs. | Calendrier en grille. |
| Verbe | Cheminer | Remonter | Tourner |
| Voix typo | Condensée lourde de panneau de balisage + serif de texte | Serif fluide | Mono de calendrier |
| Palette | Haie la nuit, voile rouge, pierre claire, brique | Bleu étang | Brun feuille |
| Signature | Un marqueur de distance (0 m à 200 m) suit le scroll sur le sentier (driver unique, scroll) ; motion.md : scrub | Distorsion d'eau GL | Bascule de saison |
| Frame partageable | « Entre la table et le lit, 200 mètres de prairie. » | Plat sur l'eau | Calendrier |
| Ancre | Menu « Balade » (90 €) et la prairie de 200 m entre restaurant et villa (dossier.md) | Vivier de homard (carte) | Lièvre en deux préparations (carte) |
| Originalité / adéquation / faisabilité / portabilité | 4 / 5 / 5 / 1 | 3 / 3 / 2 / 3 | 3 / 3 / 4 / 3 |

**Test de l'échange** : A ne tient avec aucun autre restaurant (le menu s'appelle Balade, la villa est à 200 m). B et C tiennent avec n'importe quel restaurant de fruits de mer ou de gibier. **Choix : A**, raison : seule ancre double (nom de menu réel + distance réelle). B fournit un détail : la bande « vivier » n'est pas reprise ; C : les menus d'actualité restent un simple libellé.

### Concept Card

```
Idée : le repas est une balade de 200 mètres de la ferme à la villa Barabas, et le site se lit comme ce sentier.
Métaphore : le balisage de randonnée (bornes, haltes, flèches) appliqué au service : chaque plat est une halte.
Signature (et recette) : un marqueur de distance « 0 m → 200 m » avance sur un sentier qui longe la page, piloté par la progression du scroll (driver unique, ScrollTrigger scrub, motion.md recettes de scrub) ; phase 2.
Émotion (3 premières secondes) : arriver devant la ferme, nom en lettres de panneau, une table ouverte, une action claire (Réserver).
Verbe : cheminer.
Capture : « Entre la table et le lit, 200 mètres de prairie. » en lettres de panneau sur l'étang.
Ancre : menu « Balade » à 90 € et les 200 m entre le restaurant et la villa Barabas (dossier.md).
Théâtre : loader non (le nom en grand sur le premier cadre suffit, la page pèse peu) ; GL non (photos saturées lisibles telles quelles, la signature est un tracé DOM).
```

## Système

- **Palette** (rôles) : `ground` #141C16 (haie et prairie la nuit), `ink` #EEEADC (pierre claire des sculptures du jardin), `muted` #A3AE9F (sauge), `line` ink à 18 %, `accent` #FF4A1F (le voile rouge de la terrasse, photos 05 et 08), `curtain` #6E2A1A (brique de la ferme). Section « pierre » : fond #DEDACB, encre #17201A, accent #B32A0B (AA). Références : balisage de sentiers, pierre de Meuse. Ce n'est pas le défaut crème + terracotta : le fond est sombre, l'accent est un rouge de signalisation.
- **Typo** : `Borne` (Big Shoulders Display 800, Google) pour titres, prix et libellés de panneau ; `Table` (Newsreader variable 300 à 700, romain et italique, Google) pour le texte. 3 fichiers woff2, 2 préchargés. Échelle fluide `--t-mega` 4,4 à 16,5 rem … `--t-xs` 0,81 rem ; display en majuscules, interligne 0,84 à 0,98, interlettrage -0,02 à -0,005 em selon la taille, `text-wrap: balance`. Corps 17 à 19 px, interligne 1,55, mesure 62 ch ; UI 13 à 15 px ; prix `tabular-nums` ; insécables « 90 € », « 200 mètres », apostrophes ’.
- **Grille** : 12 colonnes (gutter fluide 16 à 40 px), lignes fortes : le sentier (bordure gauche accent des routes) et l'arête colonne 7/9 ; section pierre en alternance de la nuit ; rayon 0.
- **Rythme** : humeurs d'espacement 3 (hero serré, sections 8 à 9 vw, bandeaux 4 à 5 vw).
- **Mouvement (à planifier, phase 2)** : easing `ease.out`/`inOut` de l'engine ; rideau = panneau de brique qui traverse de gauche à droite (écrit dans `motion/setup.ts`) ; verbe cheminer = glissements horizontaux courts (20 à 40 px), pas de fondu sec. Hover : CTA = remplissage inversé (déjà en CSS), nav = soulignement accent, plats = décalage + aperçu photo au curseur (phase 2), liens texte = épaississement du soulignement. **Repos** : le marqueur de distance oscille de 1 à 2 % sur le sentier (horloge GSAP, éteint en reduced motion).

### Plan de composition

Accueil (familles uniques) : 1 poster (nom géant + photo large) ; 2 paire asymétrique (portrait du chef + texte) ; 3 index/route (menu Balade, pierre) ; 4 média plein cadre (étang, légende-signature) ; 5 mur (4 assiettes) ; 6 filmstrip (villa Barabas, vraie séquence de pièces, `scroll-snap`) ; 7 appel final (voile rouge) ; pied « Arrivée. À table. ». Carte : statement, deux routes côte à côte, index des plats + photo collante, desserts en paires décalées, annexes. Histoire : texte + portrait, plein cadre, équipe en index, paire. Réservation : trois actions, jours, photo, pratique. 404 : « Sentier perdu » avec retours.
Mobile 390 : titre à deux lignes, photo avant le texte dans le hero, colonnes empilées, bande défilante, entête sans libellé de marque.

### Test de généricité

Un modèle générique ferait : hero centré sur photo plein écran, trois cartes menu, crème + serif doré. Changé : fond sombre vert, panneau de balisage, menus en route. Chaque section suit un tracé unique ; l'idée vit dans le menu, le pied, la 404.

## Mouvement (phase 2, 20/11/2026)

- **Pilote** `src/motion/balade.ts` : une variable (progression du scroll, lue en mètres de 0 à 200) distribuée à la borne du sentier fixe (position `y`, tracé parcouru `scaleY`, libellé), à la balise « 0 m » du hero (`[data-borne-m]`) et à l'état `is-arrivee` (libellé « 200 m, arrivée » en accent au pied « Arrivée. À table. »). Pointeur : la borne penche (±4 px en x, ±1 % en y). Repos (`src/motion/idle.ts`, `gsap.ticker`) : la borne respire de ±1,2 % sur le sentier ; libellé calculé sur la vraie valeur seulement. 404 : état épinglé `data-borne="hors"` (« Hors sentier »).
- **Sentier** : fixe dans la gouttière droite (desktop : point + étiquette de distance ; 390 px : point seul, la balise du hero compte les mètres). Masqué en mouvement réduit et menu ouvert.
- **Reveals** : titres `data-split="lines"`, h1 d'accueil `chars` + `data-intro`, photo du hero `clip` en intro (0,15 s), texte du hero `fade` (0,45 s) ; photos `clip` ; image du domaine `data-parallax="0.08"` (cadre élargi de 10 %). Haltes des routes et lignes de la carte : glissement horizontal de 32 px, stagger 60 ms (verbe « cheminer »).
- **Transition** : rideau de brique gauche → droite (0,7 s + 0,8 s), une borne « Halte suivante » traverse avec lui. Pas de loader, pas de GL (Concept Card).
- **Hovers (trois traitements)** : CTA = remplissage qui chemine de gauche à droite + flèche qui avance de 5 px ; nav = trait de sentier tracé sous le lien (page courante tracée) ; liens texte = soulignés au repos, trait épaissi. Utilitaires du pied : couleur + soulignement. Pas d'aperçu photo au curseur sur la carte : aucune photo n'est attribuable à un plat précis (`photos/index.json`), décision écrite.
- **Menu mobile** (`src/motion/menu.ts`) : bouton « Menu »/« Fermer », panneau plein écran qui entre en clip de gauche à droite.

### Sur-utilisation, phase 2 (preuves)

19. [x] Menu mobile : `Header.astro` (`aria-expanded`, `aria-controls`), `menu.ts` (piège Tab, Échap, focus rendu). Mesure Playwright 390 : ouvert `aria-expanded=true`, focus « Accueil », 8 Tab restent dans l'en-tête, Échap ferme et rend le focus au bouton.
20. [x] Engine verbatim (`src/engine/`), `astro.ts`, `transition:persist` sur `#curtain` et `.sentier` (`Base.astro:74-75`), `transition:animate="none"` (`Base.astro:37`) ; pas de `#gl` ni `#cursor` (sans objet).
21. [x] Une horloge : `grep requestAnimationFrame|addEventListener('scroll')` vide dans `src/motion`, pages, composants ; repos et borne sur `gsap.ticker`.
22. [x] Code de page dans `onPage()` avec nettoyage : `balade.ts:57`, `menu.ts:10`.
23. [x] Aucune CSS `transform` sur élément GSAP : `grep transform` dans `site.css`/`motion.css` ne trouve que `transform-origin` et `text-transform`.
24. [x] Pilote avec `startIdle` (`balade.ts:53`) et pointeur (`idle.ts:15`). Mesure : la matrice de la borne change en 0,9 s sans interaction.
25. [x] Loader : non (Concept Card), aucun `#loader` dans le HTML.
26. [x] Transition du concept ≤ 1 s par sens : `setup.ts` (0,7 s couvrir, 0,85 s découvrir).
27. [x] Intro `data-intro` (h1, photo, texte du hero) ; capture `.shots/p2/d-hero.png` à 2,6 s : titre, photo, CTA posés.
28. [x] Épinglages : aucun pin (le sentier est en `position: fixed`, sans scrub épinglé).
29. [x] Repli statique : `html:not(.motion) .sentier { display: none }`, `.domaine__img` remis à `inset: 0`, contenu visible (mesure réduite : 0 élément caché sur accueil et carte).
30. [x] Copies décoratives : borne et rideau `aria-hidden="true"`, balise du hero `aria-hidden` (l'étiquette « Départ » reste lue) ; aucun titre dupliqué.
31. [x] Easing `ease.*` de l'engine seulement (`balade.ts`, `menu.ts`, `setup.ts`), CSS en `cubic-bezier(0.16, 1, 0.3, 1)` (expo out) ; stagger 60 ms et 50 ms.
32. [x] Trois traitements, verbe « cheminer » (gauche → droite) : `motion.css` § Micro-interactions.
33. [x] Hover sous `@media (hover: hover)`, mêmes états sur `:focus-visible`, remplissage et trait conservés sans transition en mouvement réduit (`motion.css`).
34. [x] `.lien` souligné au repos (`site.css:18`).
35. [ ] `hover.noHoverChange` : à lire dans `report.json` (phase 3). Mesure : `::before` du CTA à `scale 1` au survol, texte inversé.
36. [ ] `desktop.idleMotion` : code prêt (borne qui respire), à confirmer en phase 3.
37. [x] Curseur natif, pas de follower ; rien ne dépend du survol (menu au tap, bande en `scroll-snap`).
38. [x] Ni blur animé ni `box-shadow` au scroll ; aucun `will-change` posé.
39. [x] Réduit : Lenis non initialisé (engine), sentier masqué, reveals sautés ; mesure : classe `motion` absente, 0 texte caché. `report.json` en phase 3.
40. [x] GL : sans objet, décision écrite (Concept Card) ; aucune ligne GL dans l'engine.
41. Sans objet (pas de GL).
44. [x] Skip link premier élément du `<body>` (`Base.astro`), anneau accent (`engine.css:33`), noir sur la section voile.
45. [ ] Contraste AA : étiquette du sentier sur fond `#141c16` propre (ink 14:1), à mesurer en phase 3 sur photo et fin de page.
46. [x] Texte réel partout, aucun canvas.
47. [x] Cibles : `.btn` `min-height: 44px`, « Réserver » de l'en-tête 44 px, bouton « Menu » 82×44 (mesure 390).

## Sur-utilisation de la skill

1. Trois concepts de trois territoires, notés, ancre, test de l'échange : tableau ci-dessus (DESIGN.md § Concepts).
2. Aucun exemple travaillé de concepts.md (braise, pavage, gril, cadre, solde, phrase unique) : non repris ; A est un balisage de sentier, voir § Concept Card.
3. Concept Card au format exact, verbe « cheminer » : § Concept Card.
4. Concept au pied (`Pied.astro` : « Arrivée. À table. »), carte (`carte.astro` : routes des deux menus), réservation (« À table, du jeudi au dimanche. »), 404 (`404.astro` : « Sentier perdu ») : fichiers cités.
5. Moment signature et recette : marqueur 0 m → 200 m piloté par le scroll, construit en phase 2 (`src/motion/balade.ts`, § Mouvement).
6. Palette 6 rôles, références nommées (voile rouge photos 05 et 08, brique, pierre) : § Système.
7. Défauts évités : fond non crème, pas d'Inter/Fraunces/Playfair, pas de dégradé violet ni verre dépoli, pas d'eyebrow sur chaque titre (`grep -c etiquette` limité aux têtes de section clés), pas de 01/02/03 décoratif (les haltes portent des libellés, pas des chiffres). `site.css:1-30`.
8. Test de généricité : § Test de généricité.
9. Détails 7 vers 8 : sélection (`::selection` du moteur, à recolorer en phase 3), focus accent (`engine.css` :focus-visible), favicon de l'identité (`public/favicon.svg`, D et point), OG composée (`public/og.png`, composition provisoire à refaire en phase 3), pied composition finale (`Pied.astro`), 404 dans le concept.
10. Polices : `public/fonts/` 3 fichiers, 2 préchargés dans `Base.astro:57-58`.
11. Échelle fluide unique `tokens.css` (`--t-mega` à `--t-xs`), sauts 16,5 / 8 / 3,6 / 1,8 rem.
12. Display réglé : `site.css` `.display` (0,84 à 0,98, interlettrage négatif par taille, balance).
13. Corps 17 à 19 px, interligne 1,55, mesure 62 ch ; UI 13 à 15 px.
14. Typographie française : insécables via `eur()` dans `site.ts`, apostrophes ’, « » ; aucun tiret cadratin (`grep` vide).
15. Grille 12 colonnes, sentier comme ligne forte ; cadre quatre coins non retenu (le sentier le remplace, l'entête et le pied encadrent la page).
16. Une famille de section au plus une fois par page : accueil (poster, paire, route, plein cadre, mur, filmstrip, appel) ; pas de doublon.
17. Hero en 3 secondes : nom, baseline, « Réserver » et « Appeler » dans les 900 px (mesure : CTA bas à 896 px sur 1440×900, 740 px sur 390×844).
18. Mobile 390 recomposé : `site.css` bloc `@media (max-width: 52rem)` (h1 deux lignes, photo avant texte, bande `overflow-x` + `scroll-snap`).
