# DESIGN.md : Intuition (NE5T Hôtel & Spa), variante awwwards

## Brief

- **Sujet** : Intuition, la table gastronomique du NE5T Hôtel & Spa (Maison Gersdorff), Avenue Vauban 46, Namur. Ancienne ferme en carré au-dessus de la Meuse, à deux pas de la citadelle. « Une gastronomie décomplexée », menu du mois renouvelé, lunch carte blanche à 50 €. Source : `data/restaurants/ne5t/` (donnees.json, dossier.md, photos/).
- **Publics** : couples du soir (anniversaire, escapade), midi du jeudi au samedi (lunch), clients de l'hôtel et du spa, touristes de la citadelle, entreprises (privatisation 45 couverts, séminaire).
- **Métier** : réserver (par téléphone seulement), lire le menu du mois et ses formules, savoir venir.
- **Ressources** : 24 photos du client (façade, plats, service, spa, suites), quelques plats à 800 px (usage en petit), aucun avis ni presse détaillée.
- **Contraintes** : site statique, `base` `/ne5t/awwwards/`, pas de backend (tel:, mailto:, liens externes), noindex, pied KYW.
- **Hypothèses** : voir l'en-tête de `src/data/site.ts` (adresse Vauban 46 retenue, heures de service inconnues donc non publiées, aucun prix de plat).

## Trois concepts

| | A. Première impression | B. Pierre numérotée | C. Le carré et son miroir |
|---|---|---|---|
| Territoire | Le menu lui-même : ses services s'appellent « Première impression », « Deuxième impression » | Le chantier : dix ans de rénovation, pierres numérotées reposées à l'identique | Le lieu : cour en carré, bassin qui reflète la façade |
| Phrase | Le site se lit comme le menu : une impression d'abord, le détail ensuite | Chaque chose du site a un numéro de pierre et sa place | La page est une cour, le contenu se reflète dans un bassin |
| Règle de mise en page | Chaque section : une phrase énorme, puis une deuxième lecture petite derrière un filet vertical | Appareil de pierre : blocs de tailles inégales ajustés | Symétrie verticale, bande de reflet sous chaque image |
| Verbe | Pressentir | Remettre | Refléter |
| Voix typo | Serif de contraste (Boska) pour l'impression, grotesque calme (Switzer) pour le détail | Slab mono pour les numéros | Serif en miroir |
| Palette | Bleu nuit, pierre claire, ambre de la façade photographiée | Pierre, brique, joint | Eau, ciel, pierre |
| Signature | Impression typographique : le mot paraît d'abord en pressentiment (pâle, flou), puis se fixe (SplitText, `motion.md`) | Les blocs se posent un à un | Reflet déformé (GL ondulation) |
| Frame partageable | Le titre « Intuition » et la phrase « Une seule invitation : suivre notre intuition. » | Un mur chiffré | Façade et reflet |
| Ancre | Les services du menu portent ces noms (ne5t.com/restaurant-intuition) | « Certaines pierres numérotées pour être reposées » (notre-histoire) | Bassin extérieur, photo 01 |
| Originalité / adéquation / faisabilité / portabilité (bas = mieux) | 4 / 5 / 5 / 1 | 4 / 3 / 4 / 2 | 3 / 3 / 2 / 3 |

**Test de l'échange** : A ne tient avec aucun autre restaurant (les mots sont ceux de la carte d'Intuition). B et C tiendraient avec n'importe quelle maison rénovée au bord de l'eau.
**Choix : A**, parce qu'elle vient de la carte et traverse tout : titres, carte, pied, 404. **Détails repris** : B fournit la 404 (« Pierre numéro 404 ») et la phrase d'histoire ; C est écarté (WebGL non justifié).

### Concept Card

- **Idée** : le site se lit comme le menu d'Intuition, en impressions : d'abord l'intuition (une phrase immense), puis le détail (une deuxième lecture, petite, derrière un filet).
- **Métaphore** : première impression, deuxième impression, dernière impression : la visite est un repas en services.
- **Signature (et recette)** : l'impression typographique. Chaque grand titre se pose en deux temps : pressentiment pâle et flou, puis encre nette (SplitText par lignes, masque, `motion.md` « line reveal », phase 2).
- **Émotion (3 premières secondes)** : un soir sur la cour illuminée, un mot posé, calme, sans protocole : « Intuition ».
- **Verbe** : pressentir (le texte se devine puis se fixe ; durée longue, easing `ease.soft`).
- **Capture** : le hero : « Intuition » en Boska géant au-dessus de la façade de nuit, l'invitation sous le titre.
- **Ancre** : les services du menu s'appellent « Première impression » et « Deuxième impression » ; la baseline du restaurant est « Une seule invitation : suivre notre intuition ».
- **Théâtre** : loader non (la réservation est l'enjeu, le premier frame est déjà le mot) ; GL non (la photographie est la matière, aucun effet GL ne la servirait mieux).

## Système

### Palette (rôles)

| Rôle | Hex | Origine |
|---|---|---|
| `ground` (--c-bg) | #0B1220 | Ciel bleu nuit de la photo 01, proche de Farrow & Ball Hague Blue en plus profond |
| `ink` (--c-fg) | #EFE8DA | Pierre calcaire de la façade (15,6:1 sur ground) |
| `muted` | #A9B0BD | Brume de Meuse (8,6:1) |
| `line` | rgb(239 232 218 / .2) | Joint de pierre |
| `accent` | #E2A04E | Ambre des fenêtres allumées (9,3:1) |
| `curtain` | #070C16 | Nuit sous la nuit |
| `pierre` (aplat) | #16203A | Nuit plus haute (pied, vignettes) |
| `paper` / `paper-ink` / `paper-accent` | #E9E1D0 / #0B1220 / #8F5A1A | Nappe des sections « imprimées » (menu, équipe) ; ambre vieilli 4,9:1 |

Défauts évités : pas de crème + terracotta (la crème n'est qu'un aplat « nappe » sous un bleu nuit), pas d'acide sur noir, pas de dégradé violet ni de verre dépoli.

### Typographie

- **Boska** (Fontshare, 400/500/700, normal) : display, titres, prix. Serif de contraste à drame : choisie pour la gastronomie, jamais dans la liste des réflexes (Playfair, Fraunces, Instrument Serif).
- **Switzer** (Fontshare, 400/500) : corps et interface, neutre, lisible petit.
- Échelle fluide (tokens.css) : `--t-mega` 4 à 16 rem, `--t-xl` 2,7 à 7, `--t-l` 1,75 à 3,4, `--t-m`, `--t-body` 16 à 18 px, `--t-s` 14 px, `--t-xs` 13 px.
- Display : interligne 0,88 à 1, interlettrage -0,025 à -0,04 em, `text-wrap: balance`, marge basse pour les descendantes. Prix en `tabular-nums`, « 60 € » avec insécable, apostrophes ’ et « » avec insécables.

### Grille

12 colonnes (gutter fluide 16 à 40 px), 4 colonnes de lecture sur téléphone (empilé). Lignes verticales fortes : le filet de la « deuxième lecture » (colonne 8 à 9) et le filet gauche des faits. Humeurs d'espacement : `--serre`, `--normal`, `--aere` (jamais un padding constant). Rayon : 0, angles vifs.

### Mouvement (planifié, phase 2)

- Easing : `ease.soft` pour les révélations de texte (verbe pressentir), `ease.out` pour les images, `ease.inOut` pour le rideau.
- Rideau de transition : bande bleu nuit qui monte (déjà branchée, `src/motion/setup.ts`).
- Rôles de hover (3 traitements) : boutons = aplat ambre qui monte ; nav et liens texte = filet ambre qui s'étire ; images et lignes d'index = léger zoom 1,025 et décalage de 1 unité.
- **État de repos** (révisé en phase 2) : la lueur ambrée des fenêtres sur la façade de nuit du hero respire et dérive lentement (écoulement à vitesse constante + pointeur retardé, `src/motion/impressions.ts`), en pause hors écran, nulle en mouvement réduit. C'est l'objet du concept (la cour illuminée du premier soir), pas une forme décorative ; rien d'autre ne bouge au repos.
- **Module pilote** `src/motion/impressions.ts` : une variable, l'impression en cours (première au premier écran, deuxième dans la page, dernière quand le pied paraît), distribuée au repère vertical de la marge droite (bureau, ≥ 1100 px) et à `--imp` (progression, filet du repère) ; entrée de repos `startIdle()` (`src/motion/idle.ts`).
- **Transition** : le rideau de nuit monte (0,85 s), « Intuition » s'y pressent (opacité 0,35) puis se fixe avant que la nuit ne reparte (0,85 s) : le passage d'un service à l'autre.
- **Curseur** : natif seul, aucun suiveur (pas de `#cursor`) : une table calme ne suit pas la souris.

### Plan de composition

Accueil, sept familles, chacune une fois : (1) hero affiche + paire asymétrique ; (2) énoncé (phrase + deuxième lecture) ; (3) index sur nappe (menu du mois + formules) ; (4) mur d'images asymétrique ; (5) paire asymétrique « la maison » ; (6) données, quatre faits entre filets ; (7) pied « Dernière impression » (téléphone géant, adresse, jours, liens).
Carte : paires décalées (titre collant à gauche, plats au centre, photo à droite, une ligne sur deux décalée) puis formules en données sur nappe. Histoire : énoncé, média plein cadre, paire inversée (spa), index d'équipe sur nappe, paire. Réservation : téléphone géant, jours en liste, trois colonnes d'infos, écrire à la maison (mailto). 404 : titre seul et chemin de retour.
Mobile 390 : tout empilé, image du hero avant le texte, mur d'images à deux colonnes décalées, faits en 2 x 2, type re-réglée par les tokens fluides.

### Test de généricité

« Un modèle générique atterrirait-il ici ? » Oui sur : liste d'index lisse (corrigé : titres de services du restaurant, filets, nappe), pied à trois colonnes (corrigé : téléphone géant pour la « dernière impression »), hero photo + titre (corrigé : titre en Boska dépassant, paire asymétrique et non plein cadre). Non sur : la voix, les noms de services, la 404.

## Sur-utilisation de la skill

1. Trois concepts, trois territoires (menu, chantier, lieu), notés, ancre, test de l'échange : tableau ci-dessus. Coché.
2. Aucun exemple travaillé de concepts.md (pas de braise, pavage, mise en place sur gril, cadre, solde, phrase unique) : le pavage de B est écarté. Coché.
3. Concept Card au format exact, verbe « pressentir » défini. Coché.
4. Concept présent au pied (`Footer.astro` : « Dernière impression »), à la carte (`carte.astro` : services en impressions), à la réservation (`reservation.astro` : « Une seule invitation »), à la 404 (`404.astro` : « Celle-ci n’a laissé aucune impression »). Coché.
5. Moment signature : impression typographique codée (`src/motion/impression.ts:28-33`) : chaque `.display` de `<main>` monte dans son masque pâle (opacité 0,2, décalé de 0,05 em, le pressentiment) puis l'encre se cale (0,55 s plus tard) ; « Intuition » lettre à lettre, les phrases mot à mot ; titres d'ouverture avec l'intro, les autres à l'entrée. Vérifié : 0 mot pâle après défilement sur 4 pages à 1440 et 390 (`.logs/ne5t-aw2-faint.log`). Coché.
6. Palette de 6 rôles + nappe, références nommées (Farrow & Ball Hague Blue, calcaire, ambre de la photo 01) : `src/styles/tokens.css:33-45`. Coché.
7. « Defaults to avoid » : crème + serif + terracotta écarté (bleu nuit dominant), pas d'acide sur noir, pas de dégradé violet, pas de verre dépoli, eyebrow une seule fois (hero), pas de 01/02/03 décoratifs, aucune police réflexe. Coché.
8. Test de généricité : section ci-dessus. Coché.
9. Détails 7 à 8 : sélection en inversion (`engine.css` ::selection), focus ambre (`engine.css:33`), favicon d'identité (point ambre sur barre pierre, `public/favicon.svg`), OG provisoire (façade assombrie ; composition à finir en phase 3), pied en composition finale, 404 dans le concept. Partiel : OG à finir.
10. Polices : Boska 400/500 + Switzer 400/500, 4 fichiers (Boska 700 retirée en phase 2 : `tokens.css`, `public/fonts/`), 2 préchargées dans `Base.astro`. Coché.
11. Échelle fluide unique, grands sauts (mega 16 rem pour 1 rem de corps) : `tokens.css:47-53`. Coché.
12. Display réglé : `.display` et `.hero__t` dans `site.css` (interligne 0,88, interlettrage -0,04 em, balance). Coché.
13. Corps 16 à 18 px, interligne 1,5, UI 13 à 14 px en AA : `tokens.css`, `engine.css:16`. Coché.
14. Typographie française : insécables dans `site.ts` (` `) et pages (`&nbsp;`), apostrophes ’, guillemets « ». Coché.
15. Grille 12 colonnes, deux filets verticaux forts (`.seconde`, `.fait + .fait`) ; pas de cadre quatre coins : remplacé par les filets horizontaux pleine largeur des index, justifié par le concept (le menu, pas un cadre). Coché avec justification.
16. Famille de section au plus une fois par page : plan de composition ci-dessus. Coché.
17. Hero en 3 s : mesuré à 1440 x 900, h1 en haut, bouton « Réserver au 081 58 88 88 » à y 676 à 729, image jusqu'à 868 (script `ne5t-mesure`, journal `.logs/ne5t-mesure.log`). Coché.
18. Mobile 390 recomposé : `@media (max-width: 900px)` de `site.css` ; mesure 390 : aucun débordement horizontal, `left` des `.display` = 16 px (gutter). Coché, capture à relire en phase 2.

### Phase 2 (mouvement et interactions)

19. Menu mobile accessible : bouton « Menu » `aria-expanded` + `aria-controls="menu"` (`Header.astro`), overlay plein écran (`.menu-plein`, 844 px de haut à 390), focus sur le premier lien, Tab piégé, Échap ferme et rend le focus au bouton, fermé au clic sur un lien (`src/motion/menu.ts:20-49`). Mesure : `.logs/ne5t-aw2-test.log` (« menu open … trapped=true close … foc: tete__menu »). Coché.
20. Engine verbatim (`src/engine/`, inchangé), `astro.ts`, `transition:persist="curtain"` sur `#curtain` et `transition:animate="none"` sur `<html>` (`Base.astro:35,72`) ; pas de `#gl` ni de `#cursor` (décisions écrites). Coché.
21. Une horloge : aucun `addEventListener('scroll')` ni `requestAnimationFrame` hors `src/engine/` (grep vide) ; idle et lueur sur `gsap.ticker` (`idle.ts:16`, `impressions.ts:55`). Coché.
22. Code de page dans `onPage()` avec nettoyage : `impression.ts:13`, `impressions.ts:41-58` (ticker retiré, ScrollTrigger tué), `menu.ts:7-51` (menu fermé, écouteur clavier retiré). Coché.
23. Aucune CSS `transform` sur un élément animé par GSAP : les seuls `transform` CSS restants sont `.btn::before`, `.nl::after` et `.cadre img` (survol, jamais tweenés) ; GSAP anime mots, figures `[data-reveal]`, `.curtain__panel`, `.curtain__mot`, `.repere__n`, `.menu-plein`. Coché.
24. Module pilote `src/motion/impressions.ts` avec `startIdle()` (`idle.ts`) et influence du pointeur (`--lx`/`--ly` suivent `idle.x`/`idle.y`). Mesure : `--lx` 63,82 % puis 43,33 % après un déplacement du pointeur (`.logs/ne5t-aw2-test.log`). Coché.
25. Loader : non (Concept Card, « Théâtre ») ; aucun composant `#loader` ni `role="status"` dans le HTML. Coché.
26. Transition du concept ≤ 1 s par sens : 0,85 s montée, 0,1 + 0,85 s descente (`setup.ts:11-18`). Coché.
27. Intro `data-intro` : sur-titre (fade), titre (impression lettre à lettre), figure du hero (clip, 0,35 s), texte et boutons (up, 0,6 s) (`index.astro:9-20`) ; premier frame = façade de nuit et « Intuition » posé. Coché, à confirmer par `settledMs` en phase 3.
28. Épinglages : aucun épinglage ni scrub (le seul `sticky` CSS est `.imp__tete` de la carte, sans GSAP). Sans objet.
29. Repli statique dessiné : sans `.motion`, `.display` et `[data-reveal]` restent visibles (CSS `.motion …` seulement), pas de Lenis, lueur figée à sa position de repos (`--lx` 50 %, `--ly` 46 %). Mesure en mouvement réduit : `motion=false`, 0 texte caché, pas de classe `lenis` sur 5 pages (`.logs/ne5t-aw2-test.log`). Coché.
30. Copies décoratives `aria-hidden` : repère vertical (`<p class="repere" aria-hidden="true">`) et mot du rideau (dans `#curtain aria-hidden`) ; aucun titre dupliqué. Coché.
31. Une famille d'easing (`ease.out` reveals, `ease.soft` encre et repère, `ease.inOut` rideau et menu), durées du tableau Timing (texte 1,1 s, images 1,3 s, rideau 0,85 s), stagger 45 à 60 ms (`impression.ts:28`, `menu.ts:26`). Coché.
32. Trois traitements, dans le verbe : boutons = aplat qui monte ; nav, liens texte et numéros de téléphone = filet ambre qui s'étire (`.nl::after`, `.resa__tel`/`.pied__tel` en `background-size`) ; images et lignes d'index = zoom 1,025 et décalage d'une unité (`translate`). Le téléphone n'est plus un simple changement de couleur. Coché.
33. `:hover` sous `@media (hover: hover)` partout (`site.css` : `.lien`, `.btn`, `.nl`, `.cadre`, `.index li`, téléphones), même état sur `:focus-visible`, `:active` présent (`.btn` 0,97, `.nl`, `.lien`, téléphones, liens du menu). Coché.
34. Liens texte soulignés au repos (`.lien`, `.menu-plein__tel`), lien du pied KYW souligné au survol et au focus. Coché.
35. `hover.noHoverChange` : à lire en phase 3 (`report.json`).
36. `desktop.idleMotion` : lueur des fenêtres (voir État de repos) ; à confirmer en phase 3 (`idleAt`).
37. Curseur natif visible, aucun suiveur ; rien ne dépend du survol au toucher (menu au clic, pas de copy « survolez »). Coché.
38. Pas de `filter: blur()` animé, pas de `box-shadow` au scroll (le seul est le focus d'un champ), aucun `will-change`. Coché.
39. Réduit : ni Lenis, ni scrub, ni loader, ni lueur animée, impression sautée (`impression.ts:14`) ; `reduced.hiddenText` mesuré à 0 en local, `reduced.moving` à lire en phase 3.
40. GL : sans objet, décision écrite (Concept Card) ; aucune ligne `// GL` dans l'engine. Coché.
41. Sans objet (pas de GL).
44. Skip link en premier (`Base.astro:71`), anneau ambre (`engine.css:33`) ; à confirmer par `keyboard.stops[0]` en phase 3.
45. Contraste AA : repère en `mix-blend-mode: difference` (clair sur nuit, sombre sur nappe, vérifié sur capture), mot du rideau décoratif ; à mesurer en phase 3.
46. Texte réel partout (SplitText garde le texte dans le DOM, aucun canvas). Coché.
47. Cibles : « Menu », « Fermer », « Réserver » de l'en-tête mobile et « Appeler » du menu à 44 px minimum (`site.css`, bloc PHASE 2) ; à mesurer en phase 3.
