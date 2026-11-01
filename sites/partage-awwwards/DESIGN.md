# Partage : variante awwwards (DESIGN.md)

Phase 1 sur 3 (construction-1) : brief, concept, système, contenu, pages statiques, build.
Les animations avancées (moment signature scrubbé, transition de page, état de repos) et la QA en
navigateur relèvent des phases 2 et 3. Les décisions ci-dessous sont celles que ces phases implémentent.

## Brief

- **Sujet** : Partage, bistro de Charles Jeandrain (chef étoilé d'Attablez-vous), rue des Fossés
  Fleuris 18, dans le piétonnier de Namur (place Maurice Servais). Ouvert le 12 novembre 2024, une
  trentaine de couverts. Plats à partager, produits locaux, influences belges, méditerranéennes et
  asiatiques. Lunch à 38 € les midis, par table entière.
- **Public** : Namurois du midi (lunch rapide, table entière), couples et bandes d'amis le soir,
  groupes de 20 à 30 personnes (privatisation), visiteurs qui connaissent le nom Jeandrain.
- **Métier du site** : réserver (lien externe du site actuel, téléphone), lire la carte en texte
  (aujourd'hui cinq GIF illisibles sur téléphone), savoir quand c'est ouvert et où se garer.
- **Ressources** : 19 photos du client (8 de salle en 600 × 800, 9 de janvier 2026 en 800 px, portrait
  du chef, chef en cuisine 1200 × 800), deux logos ; carte complète du 28/09/2026 transcrite dans
  `donnees.json` ; lunch du 21/10/2026 ; presse (DH, La Libre, Le Fooding, Le Vif).
- **Langue** : français, vouvoiement. **Contraintes** : site statique Astro 5, aucun backend, `base`
  `/partage/awwwards/`, pied de page KYW, `noindex, nofollow`.

### Faits manquants et hypothèses (décisions, pas de questions)

1. **Téléphone** : deux numéros circulent ; on retient celui du site officiel, 081 81 00 98.
2. **E-mail** : inconnu. Aucun `mailto:` inventé ; le téléphone et le lien de réservation suffisent.
3. **Heures de service** : jours de fermeture officiels (dimanche, lundi, mardi midi) ; heures
   12 h à 14 h et 18 h 30 à 22 h retenues (source « Que faire à Namur »), marquées `placeholder` dans
   `site.ts` et signalées « à confirmer par téléphone » sur la page réservation.
4. **Réservation** : l'outil tiers n'est pas identifié ; le CTA externe pointe vers
   `https://restaurantpartage.be/#reservation` (lien du client), le CTA principal reste `tel:`.
5. **Menus 4 services (49 €) et homard (67 €)** : cités par la presse, absents du site actuel : non
   publiés.
6. **Avis** : aucun extrait réel ; aucune note ni citation de client n'est publiée.
7. **Personnes sur les photos** : seul le portrait n° 09 est légendé « Charles Jeandrain » (dossier :
   « portrait du chef ») ; les cuisiniers des photos 11 et 16 ne sont pas nommés. La photo 10
   (façade, quatre personnes) est légendée « l'équipe devant la façade » sans noms.
8. **Adresse** : celle du dossier (Fossés Fleuris 18), pas celle de `restaurants.json` (Tienne
   Maquet 16, adresse d'Attablez-vous).

## Concept

Trois territoires, trois concepts. Notes : O originalité, A adéquation, Fe faisabilité (1 à 5, plus
haut = mieux), P portabilité (plus bas = mieux).

**A. « Au milieu de la table » (territoire : nom et étymologie).** Partager, c'est poser au milieu.
Le site est une table pour deux vue d'en haut : deux bords qui se font face et, entre eux, une bande
de chêne (le chemin de table) qui descend toutes les pages ; tout ce qui se partage (plats, prix,
photos d'assiettes, le bouton Réserver) arrive sur cette bande. Règle de mise en page : grille de
12 colonnes symétrique, colonnes 6 et 7 = chemin de table. Verbe : glisser vers le milieu. Voix :
capitales larges du logo (Panchang). Palette : la salle (ardoise du mur, chêne des chaises et des
tables, ocre de l'enseigne). Signature : le mot PARTAGE se coupe en PAR / TAGE et une assiette monte
dans l'écart. Capture : le mot coupé, l'assiette de jambon ibérique posée sur le chêne. Ancre : la
formule réelle de Partage (plats au centre, lunch « par table entière », « le partage, c'est aussi
un moment », Charles Jeandrain). Test de l'échange : chez un autre restaurant, un chemin de table
central et un nom qui se coupe ne veulent rien dire. **O 4 · A 5 · Fe 4 · P 2.**

**B. « Le mur aux quatre ardoises » (territoire : matière du lieu).** La salle porte une enseigne
murale de quatre lames noires empilées, découpées en arcs, et des claustras à triangles. Chaque page
est une pile de quatre lames ; on défile en faisant glisser les lames. Ancre réelle mais lue par peu
de visiteurs ; l'idée parle du décor, pas de la cuisine. **O 3 · A 3 · Fe 4 · P 3.**

**C. « Midi, table entière » (territoire : rythme horaire).** Le site change de visage entre le
lunch (38 €, par table entière) et le soir à la carte ; l'heure du visiteur choisit la version. Bonne
ancre, mais un site qui dépend de l'horloge masque la moitié de l'offre et les horaires exacts sont
à confirmer. **O 3 · A 3 · Fe 3 · P 3.**

**Choix : A**, parce que c'est la seule idée qui raconte à la fois le nom, la façon de manger et la
salle, et qui structure chaque page (carte comprise) au lieu de décorer un hero. Emprunt à B : la
404 et le favicon reprennent la forme des lames noires du mur (une lame coupée en deux). Vérifié :
aucun des exemples travaillés de `concepts.md` (braise, pavage, mise en place, cadre, solde courant,
phrase unique).

### Concept Card

```
Idée :         Chez Partage, on commande pour le milieu de la table ; sur le site aussi, tout ce qui se partage glisse vers le milieu.
Métaphore :    une table pour deux vue d'en haut : deux bords face à face, et entre eux le chemin de table en chêne où arrivent les plats.
Signature :    « Le mot qui se partage » : PARTAGE, plein écran, se coupe en PAR et TAGE au défilement ; une assiette monte dans l'écart, sur le chêne (hero sticky de patterns.md § 2 + timeline scrubbée de motion.md).
Émotion :      une table dressée qui attend la bande d'amis : appétit, chaleur, aucune cérémonie.
Verbe :        « glissent vers le milieu, comme un plat qu'on se passe ».
Capture :      le mot coupé en deux, l'assiette de jambon ibérique posée dans la fente de chêne.
Ancre :        les plats de Partage arrivent au centre pour être partagés ; lunch par table entière ; « Le partage, c'est aussi un moment » (Charles Jeandrain, DH 2024).
Théâtre :      loader non (un bistro où l'on vient réserver vite ; le premier frame est le mot lui-même) ; GL non (la coupure est une affaire de mise en page, le DOM suffit ; lignes // GL absentes du socle).
```

Survie du concept : pied de page (l'adresse est coupée par le chemin de table, « Réserver » posé
dessus), carte (les prix sont posés sur le chemin de table, nom d'un côté, description de l'autre),
réservation (le téléphone sur le chemin, horaires d'un côté, accès de l'autre), 404 (le mot coupé,
rien au milieu : « Il n'y a rien au milieu de la table »).

## Système

### Palette (la salle de Partage)

| Rôle | Hex | Référence réelle |
| --- | --- | --- |
| `ground` | `#161513` | l'ardoise noire des lames de l'enseigne murale |
| `ink` | `#EEEAE3` | la chaux des briques peintes de la salle |
| `muted` | `#A9A397` | le joint gris des briques (7,6:1 sur ground) |
| `line` | `#34322E` | l'arête des lames, filets et règles |
| `accent` | `#D99A1E` | l'ocre de la navigation du site actuel (identité du client) : focus, sélection, traits ; jamais de texte courant sur clair |
| `table` | `#CDB48E` | le chêne des tables et des chaises : le chemin de table ; texte `ground` dessus (9,6:1) |

Défaut n° 1 (crème + serif + terracotta) évité : fond sombre d'ardoise, aucune serif, le clair n'est
qu'une bande de chêne. Pas d'acide sur noir (ocre chaud, pas néon), pas de dégradé, pas de verre
dépoli, pas d'eyebrow au-dessus de chaque titre, pas de numérotation décorative.

### Typographie

- **Display** : Panchang 500 et 800 (Fontshare `panchang`), capitales ultra-larges : la famille la plus
  proche des capitales espacées du logo PARTAGE. Interlettrage de -0,04 em (mega) à -0,01 em (m),
  interligne 0,9, `text-wrap: balance`.
- **Texte** : General Sans 400 et 500 (Fontshare `general-sans`), corps 17 px, interligne 1,55, mesure
  60 caractères. Prix et horaires en `tabular-nums`.
- 4 fichiers woff2 auto-hébergés, 2 préchargés (Panchang 800, General Sans 400).
- Échelle fluide dans `tokens.css` : `--t-mega` à `--t-xs`.

### Grille et rythme

- 12 colonnes desktop, gouttière fluide ; **le chemin de table occupe les colonnes 6 et 7** et
  descend chaque page (bande `table` derrière les éléments partagés). Trois lignes fortes : bord
  gauche, chemin de table, bord droit.
- Téléphone (390 px) : 6 colonnes ; le chemin de table devient une bande horizontale entre deux
  blocs (le « milieu » d'une pile), et les prix de la carte passent dans une colonne de chêne étroite
  à droite.
- Quatre humeurs d'espacement : `--serre` (listes), `--normal` (sections courantes), `--aere`
  (statement, lunch), `--table` (hero).

### Forme et mouvement

- Rayon : **0** partout, sauf l'assiette (cercle, `border-radius: 50%`) : une seule règle, « les
  assiettes sont rondes, le reste est taillé droit ».
- Easing : `ease.out` (entrées), `ease.inOut` (coupure et transition), durées du tableau Timing de
  motion.md (petits 0,4 à 0,6 s, grands 0,9 à 1,2 s), stagger 40 ms.
- Traduction du verbe : les éléments latéraux entrent depuis leur bord vers le centre (gauche vers
  la droite, droite vers la gauche) ; ce qui est sur le chemin de table monte (on le pose).

### Rôles de hover (trois traitements)

1. **CTA** (« Réserver », « Appeler ») : un aplat de chêne glisse depuis les deux bords vers le
   milieu et se rejoint (deux demi-aplats), le texte passe en `ground`.
2. **Navigation et liens de plats** : le libellé se décale de 0,4 em vers le centre et une barre ocre
   se pose sous le mot.
3. **Liens dans le texte et utilitaires** : soulignés au repos, le soulignement s'épaissit en ocre.

### État de repos

Décision pour la phase 2 : le jour de lumière sur le chemin de table (un reflet très lent qui
glisse sur le chêne, piloté par `gsap.ticker`, écrit sur le seul élément visible, à zéro en
mouvement réduit). Si le rendu est décoratif sans sens, page immobile assumée.

### Plan de composition

```
ACCUEIL
[poster]       PAR | assiette sur chêne | TAGE          h1 Partage · cuisine à partager · Réserver / Voir la carte
[statement]    « Le partage, c'est aussi un moment. »   citation du chef, très aérée
[paire asym.]  photo salle (gauche 5 col) | chêne | texte « comment on mange ici » (droite)
[index]        spécialités : nom à gauche | photo ronde sur chêne | origine à droite
[données]      38 € (sur chêne) · lunch, midis, table entière · menu du moment
[mur]          trois photos de salle, la centrale sur chêne
[pied]         adresse coupée | Réserver sur chêne | horaires

CARTE
[poster court] LA CARTE + date de la carte, ancres de catégories
[index]        par catégorie : nom | prix sur chêne | description
[données]      lunch 38 € encadré dans le chêne
[liste]        boissons en deux colonnes face à face (vins au verre avec prix bouteille)

HISTOIRE
[poster]       portrait du chef | chêne | « J'avais toujours dit que j'ouvrirais un bistro… »
[narration]    80 à 120 mots + dates réelles
[équipe]       quatre noms réels, rôles ; photo façade sur chêne
[presse]       liste des articles réels (liens externes)

RÉSERVATION
[poster]       RÉSERVER · téléphone sur chêne
[paire]        horaires (gauche) | lien de réservation (milieu) | accès et parkings (droite)
[données]      privatisation 20 à 30 personnes, bon cadeau

404
[poster]       PAR … TAGE, rien au milieu · « Il n'y a rien au milieu de la table » · retour
```

### Test de généricité

Un modèle générique donnerait : fond crème ou noir, serif à fort contraste, photo du chef plein
écran, « Bienvenue chez Partage », carte en deux colonnes à points de conduite. Changé :
- le hero n'est pas la photo du chef mais le mot du logo, coupé par le chemin de table ;
- pas de serif : les capitales larges viennent du logo réel ;
- la carte n'a pas de points de conduite : le prix est posé sur la bande de chêne centrale ;
- les couleurs viennent de la salle photographiée (lames noires, chêne), pas d'un nuancier « bistro ».

## Sur-utilisation de la skill

Phase 1 : seuls les points vérifiables sans navigateur sont cochés, avec leur preuve. Les autres
seront cochés en phases 2 et 3 (captures, report.json, audit.txt).

**Concept et direction artistique (concepts.md, art-direction.md)**
- [x] 1. Trois concepts de trois territoires différents, scorés O/F/Fe/P, avec ancre et test de l'échange (DESIGN.md § Concept).
  Preuve : DESIGN.md § Concept, concepts A, B, C notés O/A/Fe/P, ancre et test de l'échange.
- [x] 2. Aucun concept ne ressemble aux exemples travaillés (braise, pavage, mise en place, cadre, solde, phrase unique).
  Preuve : DESIGN.md § Concept, dernière phrase du choix : vérifié contre la liste.
- [x] 3. La Concept Card est au format exact de SKILL.md, verbe de mouvement compris.
  Preuve : DESIGN.md § Concept Card, huit lignes, verbe « glissent vers le milieu ».
- [ ] 4. Le concept survit jusqu'au pied de page, à la carte, à la réservation et à la 404 (une capture de chacun).
- [x] 5. Un seul moment signature, nommé, avec la recette de motion.md ou webgl.md qui l'implémente.
  Preuve : src/motion/partage.ts : « Le mot qui se partage », coupure pilotée par `--ecart` (intro 0 → 1 puis défilement scrubbé jusqu'à 1,6, recette hero + timeline scrubbée de motion.md).
- [x] 6. Palette de 4 à 6 rôles nommés, dérivée du monde du concept, références réelles nommées.
  Preuve : DESIGN.md § Palette, six rôles ; src/styles/tokens.css lignes 35 à 44.
- [x] 7. Aucun des 8 « defaults to avoid » d'art-direction.md, ou justification écrite (le n° 1 crème + serif + terracotta en particulier).
  Preuve : DESIGN.md § Palette, paragraphe « Défaut n° 1 évité ».
- [x] 8. Test de généricité fait ; ce qui a changé est listé.
  Preuve : DESIGN.md § Test de généricité, quatre changements listés.
- [ ] 9. Les « details that separate 7 from 8 » traités : couleur de sélection, anneau de focus dans l'accent, favicon de l'identité, OG composée, pied de page comme composition finale, 404 dans le concept.

**Typographie (typography.md)**
- [x] 10. 1 à 2 familles aux rôles définis, sources réelles, téléchargées par `font.mjs`, woff2 auto-hébergées, ≤ 4 fichiers, ≤ 2 préchargés.
  Preuve : public/fonts/ : 4 woff2 téléchargés par font.mjs (fontshare panchang, general-sans) ; 2 preload dans src/layouts/Base.astro.
- [x] 11. Échelle fluide définie une fois dans tokens.css, grands sauts entre display et texte.
  Preuve : src/styles/tokens.css, échelle --t-mega à --t-xs.
- [ ] 12. Display : interlettrage négatif réglé par taille, interligne 0,85 à 1,05, alignement optique (marge négative), `text-wrap: balance`, descendantes non coupées dans les masques.
- [ ] 13. Corps 16 à 18 px, interligne 1,45 à 1,6, mesure 45 à 70 caractères ; UI 12 à 14 px en AA.
- [ ] 14. Prix et horaires en chiffres tabulaires, espaces insécables avant « € » et dans « 12 h 30 », guillemets français, vraies apostrophes.

**Mise en page (layout.md)**
- [ ] 15. Grille 12 colonnes, 2 ou 3 lignes verticales fortes, cadre quatre coins ou équivalent justifié.
- [ ] 16. Chaque famille de section au plus une fois par page ; rythme vertical varié (3 ou 4 humeurs).
- [ ] 17. Hero qui dit nom, cuisine et action en 3 secondes (capture `d-01-hero`).
- [ ] 18. Mobile 390 px recomposé : type re-réglé, lignes `auto` (pas de trou de hero), strips en `overflow-x` + `scroll-snap`, signature adaptée (captures `m-*`).
- [ ] 19. Menu mobile : bouton « Menu » avec `aria-expanded`, overlay plein écran, focus piégé, Échap ferme, focus rendu au bouton.

**Engine et continuité (engine.md, astro.md, patterns.md)**
- [ ] 20. Fichiers de l'engine copiés verbatim, adaptateur `astro.ts`, `transition:persist` sur `#gl`, `#curtain`, `#cursor`, `transition:animate="none"` sur `<html>`.
- [x] 21. Une seule horloge : tout passe par `gsap.ticker` ; aucun `addEventListener('scroll')` ni `requestAnimationFrame` maison (grep du code).
  Preuve : grep de src/motion : aucun `addEventListener('scroll')` ni `requestAnimationFrame` ; reflet sur `gsap.ticker`, en-tête sur `onScroll` de l'engine.
- [x] 22. Tout code de page dans `onPage()` avec nettoyage rendu ; aucun code DOM au niveau module.
  Preuve : partage.ts : tout le code DOM dans `onPage()`, IntersectionObserver déconnecté au nettoyage.
- [x] 23. Aucune CSS `transform` sur un élément animé par GSAP (utiliser `translate`/`rotate`/`scale` ou `gsap.set`).
  Preuve : GSAP n'anime que des objets JS (`--ecart`), les demi-nappes (`xPercent`, sans CSS transform) et les lignes `glisse` ; la CSS n'utilise que `translate`/`scale`/`rotate`.
- [x] 24. Un module pilote : une variable → tous les visuels porteurs du concept, avec entrée de repos (`startIdle`) et influence du pointeur.
  Preuve : partage.ts : une variable `--ecart` → hero, en-tête des pages intérieures, 404, pied de page ; repos = reflet `--reflet` décalé par le pointeur.
- [x] 25. Loader : décision écrite ; s'il existe, `setLoaderFormat` en unité du concept, `setLoaderExit` vers le hero, `loaderMs` ≤ 2600 desktop et mobile.
  Preuve : Décision écrite : pas de loader (Concept Card, ligne Théâtre) ; composant absent.
- [x] 26. Transition de page dérivée du concept via `setTransition`, ≤ 1 s par sens (captures `d-90..92`).
  Preuve : setup.ts : deux demi-nappes de chêne qui se rejoignent et lisent PARTAGE, 0,7 s aller, 0,8 s retour ; capture de mi-transition vérifiée (phase 2, scratchpad).
- [ ] 27. Intro de hero via `data-intro` ; premier frame après loader = meilleur frame du site.
- [x] 28. Sections épinglées ou scrubbées : `start: 'top top'`, `pin: true`, `invalidateOnRefresh: true`, ou hero sticky de patterns.md § 2.
  Preuve : ScrollTrigger `start: 'top top'`, `end: 'bottom top'`, `scrub`, `invalidateOnRefresh: true` sur le hero et les en-têtes ; pas de pin (pas de saut).
- [ ] 29. Repli statique par section (`html:not(.gl-on)`, `html:not(.motion)`) : la capture `r-*` a l'air dessinée, pas cassée.
- [ ] 30. Copies décoratives de texte hors des titres et des liens, `aria-hidden="true"` (audit : pas de titre dupliqué).

**Mouvement et hover (motion.md, art-direction.md)**
- [ ] 31. Une famille d'easing (`ease.*` de l'engine), durées du tableau Timing, grands objets plus lents que les petits, stagger 20 à 80 ms.
- [ ] 32. Un traitement par rôle, deux ou trois pour tout le site ; les CTA, la nav, les liens de plats répondent dans le verbe, pas par simple changement de couleur.
- [ ] 33. `:hover` sous `@media (hover: hover)` ; chaque état hover aussi sur `:focus-visible` ; état visible en mouvement réduit.
- [ ] 34. Liens dans le texte soulignés au repos.
- [ ] 35. `hover.noHoverChange` vide ; chaque `colorOnly`, `pixels`, `masked` lu à l'œil ; `covered` traité (champ `report.hover`).
- [x] 36. État de repos : `desktop.idleMotion: true` avec `idleAt`, ou décision d'immobilité écrite ; jamais une forme flottante sans sens.
  Preuve : Reflet de jour sur les bandes de chêne visibles (ticker, un passage toutes les 12 s) ; nul en mouvement réduit. idleMotion à confirmer par le shoot.
- [ ] 37. Curseur natif toujours visible ; follower facultatif qui s'ajoute ; rien ne dépend du hover au toucher.
- [ ] 38. Aucun `filter: blur()` animé sur grande surface, pas de `box-shadow` au scroll, `will-change` seulement pendant l'animation.
- [x] 39. Mouvement réduit : pas de Lenis, pas de GL, pas de scrub, pas de théâtre de loader, tout le contenu visible (`reduced.hiddenText` = 0, `reduced.moving` = false).
  Preuve : Mesuré (phase 2, reducedMotion reduce, 5 pages) : `.motion` absent, `--ecart` = 1, 0 élément `[data-split|data-reveal]` caché.

**WebGL (webgl.md), seulement si le concept l'exige**
- [x] 40. Justification écrite dans la Concept Card ; sinon les lignes `// GL` sont supprimées et ce point est marqué « sans objet, décision écrite ».
  Preuve : Sans objet, décision écrite (Concept Card, ligne Théâtre) ; le socle n'a pas de lignes // GL.
- [ ] 41. Si GL : un seul canvas, DPR ≤ 2, `<img>` conservé sous le plane, scrim DOM sous le texte, `glHidden` vide, FPS ≥ 55, repli statique au mouvement réduit.

**Sémantique, SEO, accessibilité (quality.md, quality-bar.md)**
- [ ] 42. `lang="fr"`, un `<h1>` par page, titres ordonnés, landmarks `header`/`nav`/`main`/`footer`, listes en listes, boutons pour les actions, liens pour la navigation.
- [ ] 43. Titre et description uniques par page, canonical, OG complet, `twitter:card`, favicon, sitemap lié, JSON-LD `Restaurant`.
- [ ] 44. Skip link en premier (`keyboard.skipLinkFirst`), focus visible partout dans le style du système (`k-*`), `noVisibleFocus` et `invisibleFocus` vides.
- [ ] 45. Contraste AA partout, y compris sur photo et sur fond animé, à chaque état et en fin de page (`a11y`, `contrastNeedsReview` vérifié).
- [ ] 46. Texte toujours du vrai texte (SplitText) ; rien n'existe uniquement dans un canvas.
- [ ] 47. Cibles tactiles ≥ 24 px (44 px pour « Réserver » et « Appeler ») : `smallTargets` vide.
- [ ] 48. Images : `width`/`height`, formats modernes, hero en `fetchpriority="high"`, reste en `loading="lazy"`, alt descriptif, `alt=""` si décoratif.

**Performance (quality.md)**
- [ ] 49. `mobile.vitals.lcpMs` < 2500 et l'élément LCP est du texte ou une `<img>`, jamais le canvas.
- [ ] 50. `mobile.vitals.cls` < 0,05 ; `font-display: swap` ; pas de saut au chargement des polices.
- [ ] 51. JS < 300 Ko gzippé, page < 3 Mo, aucune image > 500 Ko, aucune police ttf/otf (ligne « heaviest page » de l'audit).
- [ ] 52. `settledMs` non null ; `scrollFps` ≥ 55 desktop.

**Copy et contenu (content.md, règles Copy de SKILL.md)**
- [x] 53. Aucun tiret cadratin ni demi-cadratin dans le texte visible (audit : 0 « em/en dash »).
  Preuve : grep des 5 HTML de dist/partage/awwwards : 0 tiret cadratin ou demi-cadratin (phase 1).
- [ ] 54. Aucun mot banni ni cliché (audit : 0 « filler », 0 « cliche »), pas de « survolez » sur mobile, phrase jamais répétée (0 « sentence repeated »).
- [ ] 55. Copy en français, phrase d'accroche < 20 mots, noms concrets, chiffres seulement s'ils sont vrais, un nom pour une action sur tout le site (« Réserver » partout).
- [ ] 56. Données réelles du dossier ; chaque complément marqué `placeholder: true` et listé dans RAPPORT.md ; 0 placeholder détecté par l'audit (« lorem », « example.com », « TODO »).
- [ ] 57. Crédit « photos : <restaurant> » et colophon (polices, « construit avec Astro, GSAP, Lenis ») dans le pied de page du site.

**Contraintes KYW**
- [x] 58. `<meta name="robots" content="noindex, nofollow">` sur toutes les pages du build (grep vide).
  Preuve : grep -L sur les 5 HTML du build : vide (phase 1).
- [ ] 59. `KywFooter` importé de `@kyw/footer` sur toutes les pages, un seul logo `kyw-signature`, mention « Maquette KYW, certaines données sont illustratives » rendue ; son lien n'apparaît pas dans `noHoverChange` (sinon, un style local de soulignement sans toucher au paquet).
- [ ] 60. Tous les liens internes, polices, favicon, OG et sitemap passent par `BASE_URL` ; le build sert sous `/<slug>/awwwards/` sans requête échouée.

**QA et jury (quality.md, jury)**
- [ ] 61. Deux passes complètes minimum, chaque passe avec un critique neuf qui n'a reçu que le brief et les preuves.
- [ ] 62. La phrase du critique sur l'idée concorde avec la Concept Card (sinon correction du site, pas de la lecture).
- [ ] 63. Chaque score ≥ 8 ou écart justifié dans RAPPORT.md ; passe « retirer un accessoire » faite et nommée.
