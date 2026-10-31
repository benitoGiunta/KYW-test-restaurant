# L'Atelier de Bossimé : variante awwwards (DESIGN.md)

Agent « variante-awwwards », 31/10/2026. Entrée : `data/restaurants/atelier-de-bossime/` (dossier.md,
donnees.json, 25 photos et un logo). Sortie : ce paquet, puis `dist/atelier-de-bossime/awwwards/`.

## Brief (phase 0)

- **Sujet** : L'Atelier de Bossimé, ferme gastronomique de Ludovic Vanackere, rue Bossimé 2B à Loyers (Namur).
  Ouvert en 2011 (selon le site du client) par le chef à 20 ans, dans un coin de la ferme familiale ; salle
  dans un ancien fenil rénové en matériaux durables, cuisine ouverte, baies vitrées sur les jardins ; potager
  bio d'environ 45 variétés ; étoile verte du Guide MICHELIN. Devise : « Remettre la ferme au milieu du village ».
- **Public** : habitués namurois du lunch (lundi à vendredi), tables du soir et occasions (couples, familles),
  gastronomes de Bruxelles, Liège et Charleroi (30 à 40 minutes de route), groupes et entreprises (60 assis).
- **Métier du site** : faire réserver (lien externe Zenchef du client, téléphone, e-mail), faire comprendre la
  carte (des menus comptés en « Moments », pas de plats nommés : un livret est remis à table), dire où c'est.
- **Ressources** : 25 photos de qualité (plats vus de haut, salle en briques, fenil, équipe en tabliers
  « Bossimé », façade de nuit, ferme) ; un logo de 270 px (sérif aubergine, trois accents corail sur le e).
- **Langue** : français, vouvoiement. **Contraintes** : site statique, pas de backend, `base`
  `/atelier-de-bossime/awwwards/`, `noindex`, pied de page KYW.

### Faits manquants et hypothèses (reprises dans `src/data/site.ts` et RAPPORT.md)

1. Les trois piliers du logo : le site du client dit seulement « trois accents, un par pilier de la
   durabilité ». La lecture « la terre, les gens, la maison » (environnement, social, économie de la ferme)
   est notre interprétation : `piliersPlaceholder: true`, dite comme une lecture (« nous les lisons ainsi »).
2. Aucun plat nommé (livret à table) : la carte montre les formules et leurs prix réels ; les photos d'assiettes
   sont légendées par ce qu'elles montrent, comme « assiettes passées », jamais comme la carte du moment.
3. Heures de fermeture : seul Michelin les donne (16 h et 23 h 30). Le site affiche « dès 12 h » et « dès 19 h »
   comme le client ; le JSON-LD reprend les heures Michelin.
4. E-mail info@bossime.be : vient de `data/restaurants.json`, non vu sur le site du client (à confirmer).
5. Le portrait n° 18 n'est identifié qu'« à confirmer » : aucune photo n'est légendée « Ludovic Vanackere ».
6. Chiffres contradictoires (40 ou 70 producteurs ; 2010 ou 2011) : on ne cite pas le nombre de producteurs ;
   on garde 2011 (site du client). Gault&Millau sans année (2017 ou 2018 à confirmer).
7. La soirée NeZ ZeN du 22/10/2026 est passée à la date de la maquette : non affichée.

Aucune décision ne justifiait de question au superviseur : une seule lecture plausible (ferme gastronomique
qui veut faire réserver).

## Concept (phase 1)

Trois concepts, trois territoires.

| | A. Les trois accents (nom, identité) | B. Les Moments (système formel) | C. Le potager en rangs (matière du métier) |
|---|---|---|---|
| Idée | Le é de Bossimé porte trois accents, un par pilier ; le site s'écrit avec ces trois traits | Le site se compte comme la carte : en Moments, de 3 à 7 | Chaque page est une planche de potager : sections en rangs semés, la carte en planches |
| Règle de mise en page | trois lignes obliques fortes ; tout ce qui entre suit l'angle de l'accent | une page = un menu ; un compteur de Moments en coin | rangs horizontaux réguliers, étiquettes de semis |
| Verbe | se posent d'un trait, en biais | se servent l'un après l'autre | poussent du bas |
| Voix typo | grotesque massive en bas de casse, comme un mot écrit ; texte sobre | chiffres tabulaires géants | étiquettes manuscrites |
| Palette | aubergine et corail du logo, grès des assiettes | ardoise | terre, vert de fane |
| Signature | les trois accents du grand é s'allument un à un, chapitre par chapitre (narration collante, motion.md « Pinned chapters » en hero sticky de patterns.md § 2) | un sélecteur 3/4/5/7 qui redresse la page | les rangs se sèment au défilement |
| Capture | le mot « bossimé » géant, trois traits corail au-dessus du e | « Moment 3 sur 5 » en grand | une planche de légumes étiquetés |
| Ancre | le logo réel (trois accents sur le e, un par pilier de la durabilité) | les menus réels « 3, 4, 5, 7 Moments » | le potager d'environ 45 variétés (mais la liste des variétés est inconnue) |
| Test de l'échange | ne tient pour aucun autre restaurant (le é à trois accents est à eux) | tient pour tout restaurant à menus | tient pour toute ferme-table |
| O / F / Fe / P | 4 / 5 / 4 / 1 | 3 / 4 / 4 / 3 | 3 / 3 / 3 / 4 |

**Choix : A.** Seul concept qui ne peut pas déménager (portabilité 1), et il porte le discours réel du client
(durabilité, étoile verte) dans un objet graphique qu'il possède déjà. **Volé à B** pour la carte : les Moments
se comptent en accents (un menu 5 Moments s'écrit avec cinq traits). Aucun des trois ne reprend les exemples de
concepts.md (pas de braise qui refroidit, pas de pavage, pas de mise en place, pas de cadre, pas de solde, pas
de phrase unique). Le concept survit hors du hero : en-tête (les accents marquent la lecture de la page),
carte (Moments en traits), réservation (trois façons de réserver, trois accents), histoire (trois chapitres),
404 (le mot a perdu ses accents, tombés au pied de la page), pied de page (le mot entier, accents posés).

### Concept Card

```
Idée :         Bossimé s'écrit avec trois accents, un par pilier ; le site entier s'écrit avec ces trois traits.
Métaphore :    l'écriture : un accent se pose d'un trait et change la façon dont un mot se prononce.
Signature :    « Trois accents » : le grand é reste à l'écran pendant trois chapitres (la terre, les gens,
               la maison) et chaque chapitre pose son accent, d'un trait corail (hero sticky de
               patterns.md § 2 + chapitres de motion.md « Pinned chapters », piloté par src/motion/accents.ts).
Émotion :      calme et précis : un mot écrit à la main d'un geste sûr, une ferme qui sait ce qu'elle fait.
Verbe :        « se posent d'un trait, en biais » : tout entre selon l'angle de l'accent (62°) et s'arrête net.
Capture :      le mot « bossimé » en bas de casse géante, trois traits corail au-dessus du e, l'assiette verte à côté.
Ancre :        le logo réel du client : trois accents sur le E, un par pilier de la durabilité.
Théâtre :      loader : non (restaurant, le premier frame est le mot lui-même, peint dès le premier rendu).
               GL : non (les photos du client suffisent ; un shader n'ajouterait rien au geste d'écrire).
```

## Système d'art direction (phase 2)

### Palette (5 rôles, sources réelles)

| Rôle | Hex | Source | Contraste |
|---|---|---|---|
| `ground` grès | `#E3E5DE` | l'émail gris vert des assiettes de grès (photos 08, 20) | fond |
| `ink` aubergine | `#2A1622` | le mot du logo, assombri | 13,4:1 sur grès |
| `muted` lie | `#5C4A55` | aubergine délavée | 6,4:1 sur grès |
| `line` | `rgb(42 22 34 / 0.16)` | trait d'encre léger | traits seulement |
| `accent` corail | `#D2441C` | les trois accents du logo, assombris pour tenir 3:1 | 3,6:1 sur grès, 3,7:1 sur aubergine : traits et anneau de focus, jamais du texte courant |
| `curtain` | `#2A1622` | l'aubergine pleine | rideau et sections de nuit (texte grès 13,4:1, texte doux `#D9CFD3` 11,2:1) |

**Défaut n° 1 (crème + sérif contrasté + terracotta)** : écarté. Le fond est un gris vert froid (grès), pas une
crème ; aucune sérif ; le corail n'est pas une couleur d'ambiance mais l'encre des seuls accents, prise au logo.
Pas d'acide sur noir, pas de dégradé, pas de verre, pas d'eyebrow en capitales espacées au-dessus des titres,
pas de 01/02/03 décoratifs (les chiffres des chapitres sont des années ou des comptes réels).

### Typographie

- **Display** : Cabinet Grotesk 800 (Fontshare `cabinet-grotesk`), en bas de casse : le mot « bossimé »
  s'écrit comme on l'écrit à la main, sans majuscule de logo. Interlettrage : `-0.055em` en méga, `-0.035em` en
  xl, `-0.02em` en l. Interligne 0,86 à 1. Cabinet Grotesk 500 pour les sous-titres.
- **Texte et UI** : General Sans 400 / 500 (Fontshare `general-sans`), 17 px, interligne 1,55, mesure 62ch.
  UI à 13 / 14 px en 500, chiffres tabulaires pour prix et heures.
- 4 fichiers woff2 auto-hébergés (`font.mjs`), 2 préchargés (Cabinet 800 et General 400). U+202F absent des
  deux familles : espaces insécables U+00A0 seulement.
- Échelle (tokens.css) : `--t-mega` clamp(5rem, 0.6rem + 22vw, 21rem) ; `--t-xl` clamp(2.6rem, 1.3rem + 5.6vw,
  6.5rem) ; `--t-l` clamp(1.7rem, 1.2rem + 2.1vw, 3.1rem) ; `--t-m` ; `--t-body` ; `--t-s` 0,875 rem ; `--t-xs` 0,8125 rem.

### Grille et rythme

- 12 colonnes desktop, 6 au téléphone, gouttière fluide. Trois lignes fortes : colonne 1 (titres, mot géant),
  colonne 5 (textes courants), colonne 9 (prix, horaires, actions). Tout texte courant commence sur l'une des trois.
- Humeurs d'espacement : `--serre` (8u), `--normal` (14u), `--aere` (24u), plein écran (hero, chapitres).
- **Forme** : angles vifs partout (`--radius: 0`) ; seuls les traits d'accent ont des bouts arrondis.

### Langage de mouvement

- Easing de l'engine : `ease.out` (révélations), `ease.inOut` (rideau), `ease.soft` (hovers). Durées du tableau
  Timing : hover 0,3 à 0,45 s, lignes 1,1 s avec 0,07 s de décalage, images 1,3 s, rideau 0,8 / 0,9 s.
- **Traduction du verbe** : les photos se révèlent par un `clip-path` dont le bord est oblique à l'angle de
  l'accent (`data-biais`, src/motion/biais.ts) ; les accents se tracent par `stroke-dashoffset` ; le rideau de
  page est une grande bande aubergine inclinée qui passe en biais, avec trois traits corail qui s'y posent.

### Rôles de hover (trois traitements)

1. **CTA** (« Réserver », « Appeler », « Écrire ») : un aplat aubergine incliné entre en biais depuis la gauche
   et couvre le bouton ; le texte passe en grès. Touch : `:active`. Mouvement réduit : aplat immédiat.
2. **Navigation et liens de rubrique** : un petit accent corail se trace au-dessus du mot (comme sur le é) ;
   la page courante garde son accent.
3. **Lignes de carte et images** : les traits de Moments se redressent et la photo d'aperçu suit le pointeur
   (desktop) ; vignettes en ligne au toucher. Liens dans le texte : soulignés au repos, le trait s'épaissit.
   Liens utilitaires (réseaux, légal) : couleur et soulignement.

### État de repos

Les accents bougent : chaque trait oscille de 1 à 2 degrés autour de son pied, comme une pousse au vent
(les trois traits du logo ressemblent à trois pousses), et le pointeur donne la direction du vent (±4°). Un
`setProperty("--vent")` par frame sur les seuls groupes d'accents visibles, depuis le ticker GSAP (src/motion/accents.ts), à zéro en
mouvement réduit, coupé quand l'onglet est caché (le ticker GSAP s'arrête).

### Plan de composition

Accueil :
```
[hero : poster + paire]      bossimé (méga, col 1-12, accents corail sur le e)
                             phrase 18 mots (col 1-5) | assiette verte (col 7-12) | Réserver / La carte
[statement]                  « Remettre la ferme au milieu du village. » t-xl col 1-10, texte col 5-9
[narration collante]         grand é sticky (col 1-5) | trois chapitres photo + texte (col 7-12)
[données réelles]            2011 / 20 ans / 8 tables / 45 variétés / 60 places, chiffres géants tabulaires
[mur]                        six assiettes de tailles différentes, cellules vides voulues, légendes
[média pleine largeur]       façade de nuit, horaires courts et Réserver
[pied de page final]         bossimé géant, adresse, horaires, actions, colophon, puis bandeau KYW
```
Carte : hero statement (« La carte se lit en Moments ») + liste index (lunch, menus, boissons) avec traits
de Moments, aperçu au curseur et vignettes en ligne au toucher ; encadré pratique (allergies, carte blanche).
Histoire : hero paire asymétrique (cuisine ouverte) + trois chapitres en paires décalées + statement + équipe.
Réservation : poster « Trois façons de réserver » + trois colonnes (en ligne, téléphone, e-mail) + horaires
en liste + accès et groupes en données.
404 : poster « bossime » sans accent, les trois accents tombés au pied, chemin de retour.

### Mobile 390 px

Le mot géant passe à 26vw et tient sur une ligne ; la photo du hero passe sous les actions ; le grand é des
chapitres devient une bande collante en haut de section (accents de 64 px) au-dessus des chapitres en colonne ;
la liste de carte montre ses vignettes en ligne ; menu plein écran par bouton « Menu ».

### Test de généricité

« Un modèle générique, avec ce brief, atterrirait-il ici ? » Ce qui l'était et a changé :
- Fond crème + sérif + accent brique (piège du restaurant de ferme) → grès gris vert, grotesque massive, corail
  du logo réservé aux accents.
- Hero photo plein écran avec titre centré → le mot est l'image, la photo est une moitié.
- Trois cartes de valeurs (« circuit court, bio, zéro déchet ») → un seul é dont les accents portent ces trois
  piliers, en narration collante.
- Fondu montant sur chaque section → révélation oblique propre au verbe, réservée aux photos.
- Carte en colonnes de plats inventés → formules réelles, comptées en accents ; aucun plat inventé.

## Sur-utilisation de la skill

Preuves de la passe finale (passe 3) : `.shots/` et `.shots/audit.txt` ; passes 1 et 2 dans `.shots-passe1/`,
`.shots-passe2/` et `.jury/127.0.0.1-4467/scorecard-{1,2}.md`. Captures non commitées (ignorées par `.gitignore`).

**Concept et direction artistique (concepts.md, art-direction.md)**
- [x] 1. Trois concepts de trois territoires différents, scorés O/F/Fe/P, avec ancre et test de l'échange : § Concept, tableau.
- [x] 2. Aucun concept ne ressemble aux exemples travaillés : § Concept, paragraphe « Choix ».
- [x] 3. Concept Card au format exact, verbe compris : § Concept Card.
- [x] 4. Le concept survit : pied `home/d-07-scroll` (mot et accents), carte `carte/d-02-scroll` (traits = Moments), réservation `reservation/d-01-hero` (trois façons, un accent chacune), 404 `404/d-01-hero` (mot sans accents, accents tombés).
- [x] 5. Un seul moment signature : « Trois accents », `src/motion/accents.ts` § 3 (hero sticky patterns.md § 2 + motion.md « Pinned chapters »), captures `home/d-03-scroll`, `home/d-04-scroll`.
- [x] 6. Palette de 5 rôles nommés, références réelles : § Palette.
- [x] 7. Défauts d'IA écartés, n° 1 justifié : § Palette, paragraphe « Défaut n° 1 ».
- [x] 8. Test de généricité fait, changements listés : § Test de généricité.
- [x] 9. Détails 7→8 : sélection aubergine (`site.css` l. 6), anneau de focus corail (`engine.css` `:focus-visible` sur `--c-accent`, `home/k-02-focus`), favicon des trois accents (`public/favicon.svg`), OG composée (`public/og.png` : mot, accents, assiette), pied de page final, 404 dans le concept.

**Typographie (typography.md)**
- [x] 10. Cabinet Grotesk (display) + General Sans (texte), Fontshare via `font.mjs`, 4 woff2 auto-hébergés, 2 préchargés (`Base.astro`).
- [x] 11. Échelle fluide unique dans `tokens.css` (`--t-mega` à `--t-xs`), saut display/texte de 1 à 20.
- [x] 12. Display : `-0.055em` méga, `-0.035em` xl, interligne 0,86 à 1, marge optique `-0.045em`, `text-wrap: balance` (engine.css), mot en `nowrap` calé par `cqi` (ratio mesuré 3,304 em).
- [x] 13. Corps 16 à 17 px, interligne 1,5 à 1,55, mesures 34 à 62ch ; UI 13 à 14 px en 500, 0 violation axe.
- [x] 14. `tabular-nums` sur prix et horaires (`.num`, `.ligne__prix`), U+00A0 dans « 42 € » et « 12 h » (`site.ts`), guillemets « », apostrophes ’.

**Mise en page (layout.md)**
- [x] 15. Grille 12 colonnes, lignes fortes colonnes 1, 5 (ou 7) et 9 ; en-tête deux coins + action, sans cadre fixe aux quatre coins (restaurant : l'en-tête suffit et s'écarte au défilement).
- [x] 16. Familles de section uniques par page (accueil : poster, statement, narration collante, données, mur, média pleine largeur, pied) ; humeurs `--serre`, `--normal`, `--aere`, plein écran.
- [x] 17. Hero : nom, « ferme gastronomique », Réserver et La carte en un écran (`home/d-01-hero`, `home/m-01-hero`).
- [x] 18. Mobile recomposé : mot à 30cqi sur une ligne, grille 6 colonnes en lignes `auto`, bande collante du é, vignettes en ligne sur la carte (`home/m-*`, `carte/m-*`).
- [x] 19. Menu mobile : `aria-expanded`, plein écran, focus piégé, Échap ferme, focus rendu (vérifié par script : `verif.mjs`, sortie dans RAPPORT.md).

**Engine et continuité (engine.md, astro.md, patterns.md)**
- [x] 20. Engine copié verbatim (diff nul hors lignes GL retirées et `lines,words,chars` de lecons.md), `astro.ts`, `#curtain` en `transition:persist`, `<html transition:animate="none">`.
- [x] 21. Une horloge : `grep -rn "addEventListener('scroll'\|requestAnimationFrame" src/` ne renvoie que l'engine (aucun dans `src/motion`).
- [x] 22. Tout code de page dans `onPage()` avec nettoyage (`accents.ts`, `biais.ts`, `carte.ts`, `menu.ts`).
- [x] 23. Pas de CSS `transform` sur un élément animé par GSAP : rideau sans transform CSS, aplat des boutons en `transform` statique non animé par GSAP (transition CSS sur `translate`), aperçu de carte en `translate`.
- [x] 24. Module pilote `src/motion/accents.ts` : une règle `clamp(v × 3 − i)` pour tous les porteurs, repos `--vent` (`startIdle`, pointeur ±4°).
- [x] 25. Loader : non, décision écrite (Concept Card « Théâtre ») ; `loaderMs` null.
- [x] 26. Transition « un trait en biais » via `setTransition` (0,75 + 0,85 s), captures `home/d-90-transition-*`.
- [x] 27. Intro du hero : les accents se posent (timeline `intro`), mot et photo peints au premier rendu (LCP).
- [x] 28. Signature en hero sticky (patterns.md § 2), ScrollTrigger `scrub` avec `invalidateOnRefresh`.
- [x] 29. Repli statique : sans `.motion`, les accents valent 1 (posés), aucune révélation masquée (`home/r-01-hero`, `home/r-02-mid`).
- [x] 30. Copies décoratives (`Mot.astro`) en `aria-hidden`, hors des titres lisibles (texte réel en `sr-only`) ; audit sans titre dupliqué.

**Mouvement et hover (motion.md, art-direction.md)**
- [x] 31. `ease.out`, `ease.inOut`, `ease.soft` de l'engine ; durées du tableau Timing ; décalage 60 à 80 ms (`repere` 0,06 s, `facon` 0,08 s).
- [x] 32. Trois traitements : aplat incliné (CTA), accent tracé (nav et liens de rubrique), traits redressés + aperçu (lignes de carte) ; liens de texte soulignés.
- [x] 33. `:hover` sous `@media (hover: hover)`, mêmes états sur `:focus-visible`, aplat immédiat en mouvement réduit.
- [x] 34. Liens dans le texte soulignés au repos (`.lien`).
- [x] 35. `hover.noHoverChange` vide sur les 6 rapports ; paires lues (scorecard-1 et 2) ; `covered` de la marque vérifié à la main (en-tête escamoté pendant le test, clic réel OK après remontée).
- [x] 36. Repos : `--vent` (pousses au vent), `desktop.idleMotion` dans `.shots/*/report.json`.
- [x] 37. Curseur natif conservé, aucun follower ; rien ne dépend du survol au toucher (vignettes de carte en ligne).
- [x] 38. Aucun `filter: blur()` animé, pas de `box-shadow` au défilement, pas de `will-change` global.
- [x] 39. Mouvement réduit : Lenis coupé (engine), pas de scrub ni de vent, contenu visible (`reduced.hiddenText` 0, `moving` false).

**WebGL (webgl.md)**
- [x] 40. Sans objet, décision écrite (Concept Card « Théâtre ») ; lignes `// GL` retirées d'`index.ts`.
- [x] 41. Sans objet (pas de GL).

**Sémantique, SEO, accessibilité**
- [x] 42. `lang="fr"`, un `<h1>` par page, titres ordonnés, landmarks, listes en listes (horaires, carte, repères), boutons pour le menu.
- [x] 43. Titres et descriptions uniques, canonical, OG, `twitter:card`, favicon, sitemap lié, JSON-LD `Restaurant` (`Base.astro`).
- [x] 44. Lien d'évitement premier arrêt (`keyboard.stops[0]` = « Aller au contenu » ; `skipLinkFirst: false` est le faux négatif connu de lecons.md), `noVisibleFocus` et `invisibleFocus` vides.
- [x] 45. Contraste : 0 violation axe, `contrastNeedsReview` lus sur les captures (texte grès sur aubergine 13,4:1, scrim de la façade).
- [x] 46. Texte réel partout (SplitText), aucun canvas.
- [x] 47. Cibles : `smallTargets` vide sur toutes les pages (passes 2 et 3), CTA à 44 / 48 px.
- [x] 48. `<Picture>` AVIF/WebP avec dimensions, hero `fetchpriority="high"`, reste `lazy`, alt descriptifs, vignettes de carte `alt=""`.

**Performance**
- [x] 49. LCP mobile 1,08 à 1,25 s (texte du mot ou `<img>`).
- [x] 50. CLS 0 partout ; `font-display: swap` + préchargement.
- [x] 51. JS 61 Ko gz, page la plus lourde ≈ 688 Ko, images < 500 Ko, woff2 seulement (ligne « heaviest page » de l'audit).
- [x] 52. `settledMs` non null (≈ 2,4 à 2,6 s desktop) ; `scrollFps` 60 desktop et mobile.

**Copy et contenu**
- [x] 53. 0 « em/en dash » dans l'audit.
- [x] 54. 0 « filler », 0 « cliche », 0 « sentence repeated » (passe 2 et 3) ; aucun « survolez ».
- [x] 55. Français, accroche de 17 mots, « Réserver » pour l'action sur tout le site.
- [x] 56. Données réelles ; compléments et lectures marqués dans `site.ts` (`piliersPlaceholder`, `emailPlaceholder`, `horairesFermeturePlaceholder`) et listés dans RAPPORT.md ; 0 placeholder détecté.
- [x] 57. Crédit « photos : L'Atelier de Bossimé » et colophon (polices, Astro, GSAP, Lenis) dans le pied.

**Contraintes KYW**
- [x] 58. `grep -L 'name="robots"'` sur le build : vide.
- [x] 59. `KywFooter` sur toutes les pages (un logo, mention rendue), non listé dans `noHoverChange`.
- [x] 60. Liens, polices, favicon, OG et sitemap sous `BASE_URL` ; `failed` vide sur toutes les pages (hors document 404 attendu).

**QA et jury**
- [x] 61. Trois passes complètes (crawl + pages + audit). Critique : **auto-notation**, faute d'outil de sous-agent ; noté sur chaque carte et dans RAPPORT.md.
- [x] 62. La lecture de l'idée sur les captures concorde avec la Concept Card (scorecard-2, scorecard final).
- [x] 63. Scores ≥ 8 sauf écarts justifiés dans RAPPORT.md ; accessoire retiré : le zoom d'entrée de la photo du hero.

### Décisions écrites
- En-tête : pas de cadre fixe aux quatre coins ; un en-tête collant qui s'écarte au défilement vers le bas et revient en remontant.
- WARN audit « no sitemap » : l'audit sonde la racine de l'origine ; le sitemap est `/atelier-de-bossime/awwwards/sitemap-index.xml`, lié depuis `<head>`. Le `robots.txt` partagé et le `meta robots noindex` couvrent l'indexation.
