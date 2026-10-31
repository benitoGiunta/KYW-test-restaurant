**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 5 pages (/, /notre-cuisine, /notre-carte, /reserver-une-table, /contactez-nous) + 404
- **Before** · Floor 93 FAIL · Reflex 88 · un site E-net multipage crème, aubergine et orange, photo plein cadre et carte crème en hero, vignettes répétées, copie SEO, cookies et barre de partage envahissants ; les photos, la carte et ses prix, les horaires, Zenchef et le logo restent
- **Keeps** · 5/5 routes capturées (slugs raccourcis, préfixes `/page/` et `.html` retirés) · Zenchef rid 367643 · tel:+32478137125 · 7/7 champs du formulaire de contact (objet, civilite, nom, prenom, email, telephone, message) · les 6 ancres `#onglet_*` de la carte · Facebook · chèques-cadeaux, salle de réunion, agenda, news, jobs, event-bossime.be liés au site actuel · la séquence de l’accueil
- **Files** · create: sites/atelier-de-bossime-legacy/** · delete: none
- **Shape** · Photographic (kept, from the original site) · genre editorial · job: book, l’action dans la nav, dans le hero, à côté de la carte, à la clôture et dans la barre mobile
- **Theme** · Vellum, dealt 1/3 (parchemin, encre terre d’ombre, Grenze Gotisch sur Hanken Grotesk, filets doubles, un outremer) · écarte Squeeze (sans géométrique et vert saturé : une box de fruits, registre playful) et Spore (nuit, café grainé : renverserait un site clair aux baies vitrées sur jardin)
- **Chrome** · nav: edge-aligned (kept : logo à gauche, liens et Réserver à droite, sticky, double filet) · footer: colophon block
- **Hero** · Poster (kept) : la ferme en plein cadre, la carte de papier en bas à gauche ; Banner sur /notre-cuisine et /contactez-nous, Index sur /notre-carte, Counter sur /reserver-une-table
- **Signature** · la ferme de Bossimé en plein cadre, la carte de papier posée en bas à gauche comme sur le site d’origine
- **Sections** · Hero (Poster) · Bossimé, restaurant (Rows as an index : quatre portes) · Un menu à votre choix (Switcher midi/soir sur le champ outremer) · La salle (photo pleine largeur, sans titre) · Notre engagement (Table as a day book) · Horaires et adresse (Schedule à côté de la façade, bande fibre) · Footer (colophon)
- **Material** · real : nom, adresse, téléphone, e-mail, horaires d’ouverture, 6 formules et leurs prix et accords, boissons, groupes 60/120/10, histoire 2011, piliers, valeurs, distinctions, accès, PMR, chiens, TVA · pictures : client 13, library 0 · absent : avis, note Google, noms de plats, heure de fermeture, chiffres inventés, logos tiers
- **Comp** · 2 built, no key · c1 chosen · reproduced (checked at 1280x800)
- **Sweep** · Floor 0 FAIL · Reflex 0 ouvert (waived : 8) · dismissed : kept, 58 · kept : comparé à la main (voir RAPPORT.md) · hero-review: self · 3 findings · 3 resolved · finish-review: self · 5 findings · 3 resolved 2 unresolved

*Le draw (6ac797) proposait shape Marquee Hero, hero Index, nav floating pill, footer colophon block, une barre de réservation sticky, la carte en Switcher midi/soir, horaires et adresse en section propre, la salle en photo pleine largeur sans titre, la clôture « réservation à côté d’une dernière photo », sans Split ni Statement, le hero menant par le lieu. Gardés : colophon block, barre de réservation (mobile, comme le bandeau orange d’origine), Switcher midi/soir, horaires + adresse, salle sans titre, clôture à côté de la façade, aucun Statement, le lieu en tête (la ferme). Échangés : Marquee Hero → Photographic (forme d’origine, contrainte KYW) ; hero Index → Poster sur l’accueil (posture d’origine), Index gardé sur /notre-carte ; floating pill → edge-aligned (Vellum interdit les pilules, le site d’origine était edge-aligned). Un Split reste sur /notre-cuisine (l’histoire, portrait) : la page d’origine alternait texte et photo. Test miroir : un voisin gastronomique sur Vellum obtiendrait une photo de salle ; ici la façade de la ferme et la table « livre de jour » des valeurs ne vont qu’à Bossimé.*

*System portable ? Le système est verrouillé ci-dessous ; les cinq pages le partagent.*

# Design : L’Atelier de Bossimé, variante legacy

## System
- Genre : editorial
- Shape : Photographic (gardée du site d’origine)
- Theme : Vellum, colourway `parchment`
- Axes : light/blackletter/cool · posture : committed

## Tokens
`src/styles/tokens.css` fait foi (écrit par `theme.mjs scaffold vellum --redesign full`, plus trois `@font-face` auto-hébergées). Les rôles :
```css
:root {
  --color-paper: oklch(94% 0.024 82); --color-paper-2: oklch(90% 0.032 80); --color-paper-3: oklch(86% 0.036 78);
  --color-ink: oklch(23% 0.025 55); --color-ink-2: oklch(31% 0.024 58); --color-muted: oklch(46% 0.024 64);
  --color-rule: oklch(75% 0.035 72);
  --color-accent: oklch(43% 0.17 268); --color-accent-deep: oklch(35% 0.15 268); --color-accent-soft: oklch(89% 0.035 268); --color-accent-ink: oklch(95% 0.02 82);
  --color-focus: oklch(50% 0.18 268); --color-field: var(--color-accent);
  --font-display: "Grenze Gotisch"; --font-body: "Hanken Grotesk"; --font-outlier: "Grenze";
  --radius-card: 2px; --radius-pill: 2px; --rule-hair: 1px; --rule-double: 4px; --shadow-card: none; --fibre: 0.5;
}
```
Échelles d’espace, de type, easings, durées et z : celles du scaffold. Ajouts de page : `--nav-h` (72 px, 64 px sous 60rem), `--bar-h` (64 px sous 40rem).

## Controls
- Primaire : outremer rempli, Hanken 500, 48 px (44 px dans la nav), 2 px de rayon, s’assombrit en `--color-accent-deep` ; une seule recette.
- Secondaire : `.link` typographique (600, souligné 1 px, 44 px de cible, passe au pigment) ou `.btn--ghost` (filet d’encre 1 px).
- Champs : 48 px, filet d’encre constant, anneau en `outline` inset sans transition, ligne d’aide `min-height: 1lh`.
- Onglets du Switcher : cellules carrées jointes, l’onglet choisi est cerclé et souligné (pas rempli : F4).

## Motion
Still (Vellum) : aucun reveal, aucune parallaxe ; survols en `--dur-micro`, reduced motion coupe tout (`base.css` + page.css:357).

## Exports
`tokens.css` dans ce projet ; aucun export Tailwind/DTCG.

## Approche
- **Macrostructure conservée** : Photographic (08). Empreinte `Heading|Body|Divider|Button|Image|Reveal` : `Overlapping (carte sur la photo) | Rows et tables ledger | Double rule | Solid (pigment) | Full-bleed puis cadré | None`.
- **Posture conservée** : multi-pages ; les routes capturées gardent leur rôle sous des slugs courts (`/page/restaurant-cuisine-…html` → `/notre-cuisine/`, `/page/restaurant-bistronomique-…-lunch-menu-namur.html` → `/notre-carte/` avec ses ancres `#onglet_*`, `/page/reservation-table-…html` et `/page/reservez-en-ligne.html` → `/reserver-une-table/`, `/page/contactez-nous.html` → `/contactez-nous/`) ; les pages non capturées (salle de réunion, agenda, news, jobs, chèques-cadeaux) restent sur le site actuel, liées depuis le colophon ; hero Poster gardé ; calme (le slider et la parallaxe d’origine ne reviennent pas).
- **Dérogations justifiées** :
  - Slider auto du hero → une photo fixe (18, et le slider n’avait pas de pause).
  - Parallaxe et contenu caché au chargement → aucune animation (62, Vellum still).
  - Trois vignettes « Lire la suite » répétées deux fois → un index de quatre rangs (3, 8, 63).
  - Quatre valeurs en icônes → les lignes du livre de jour de l’engagement (3, F5), sans numéros : les valeurs n’ont pas d’ordre (revue 1, R1-16).
  - Avis E-net 4,84/5 → retiré (46a : module de l’agence, non vérifiable).
  - Club privé (newsletter) → retiré (85).
  - Carte Leaflet → lien OpenStreetMap aux mêmes coordonnées.
  - Formulaire E-net → même champs, `data-endpoint=""`, message honnête (70).
  - Carte en six onglets → table ledger complète, ancres conservées (les six formules se comparent d’un regard).
- **Test miroir** : voir la note du draw ci-dessus.

## Thème
Vellum, `dealt 1/3, seed restaurant-namur-farm-table-2f10·53eb64c8·2026-10-31·r0` (journal partagé `$ROOT/.hallmark/log.json`). Pourquoi lui : son image montre exactement la posture d’origine (photo plein cadre, carte de papier) et sa matière (parchemin, encre brune, gothique) porte une ferme ancienne rénovée. Pourquoi pas Squeeze : vert saturé et sans géométrique d’une box de fruits, registre playful. Pourquoi pas Spore : nuit, grain de café, lumière de bougie ; il renverserait un site de jour ouvert sur les jardins. Aucune couleur de marque imposée par le dossier hors du logo (PNG gardé tel quel) : le thème porte la palette ; l’orange corail E-net n’est pas une marque (bouton de gabarit). Texture : la fibre du thème, sur deux bandes papier seulement, opacité `--fibre` (texture.md).

## Composants
| Composant | Décision | Fondement |
| --- | --- | --- |
| Bouton | Primaire outremer unique, 48 px, huit états (hover, active, focus-visible, disabled, aria-busy), `transition` listée ; libellé verbe « Réserver une table », `nowrap` | patterns.md § Controls, F4, 19, 39b, 49a |
| Nav | Edge-aligned, 72 px, sticky `--z-sticky-nav`, double filet, liens 600 en casse de phrase, « Réserver » à droite ; sous 60rem un menu Popover ; skip link | layout.md § 7, anatomy book, 42, 56, microinteractions § Menu |
| La carte | Accueil : Switcher midi/soir (premier panneau visible sans script, flèches). /notre-carte : table ledger (formule, contenu, prix, accord, sans alcool), prix tabulaires, restackée au téléphone avec libellés | patterns.md § switcher, Vellum Range day book, F6, F25 |
| Horaires | Table midi/soir par jour, « dès 12 h / dès 19 h » (heure de fin inconnue ; `<time datetime="12:00">` gardé), en-têtes Midi et Soir alignés à droite comme leurs valeurs, fermé en `--color-muted`, jour courant soulevé en `--color-paper-3` ; une fois par page | layout.md § 5.16, 69, anatomy book |
| Réservation | Le Zenchef d’origine (rid 367643, `primaryColor=2942ab` = `--color-accent`) chargé à la demande derrière un bouton, lien direct sans script ; cadre vide à la hauteur de son texte et de ses boutons, 560 px seulement une fois l’iframe chargée ; téléphone | redesign.md wiring, lecons.md (26a iframe) |
| Formulaire | Contact : 7 champs d’origine, labels visibles, `autocomplete`, `aria-describedby`, validation au blur puis à l’input, « Rien n’a été envoyé » | patterns.md § A form that posts nowhere yet, 70, 39a, F14 |
| Pied de page | Colophon : nom en Gotisch, un paragraphe adresse, contacts, TVA, crédits photo, liens réels, liens vers le site actuel ; puis `<KywFooter />` | layout.md § 7, 76, 85 |
| Photo | `Photo.astro` : `figure[data-slot][data-alt]`, `srcset` WebP 640 à 2000, `width`/`height`, hero `fetchpriority="high"`, autres lazy, traitement warm de base.css | patterns.md § photo, imagery.md |
| Reveal | Aucun (Vellum still) | craft.md § 5, 27, 62 |
| Barre mobile | Sous 40rem, barre fixe « Réserver une table » + « Appeler » à `--z-sticky`, `body` réserve sa hauteur | site d’origine (bandeau orange + appel), 56 |

## Liste de sur-utilisation
Format : `- [x] n. règle · preuve`. Sources : `src/styles/page.css` (PC), sorties `sloplint` (sweep final : 0 FAIL, 0 REFLEX).

**Floor**
- [x] 1. Couleurs et polices par tokens · `grep -c "#[0-9a-f]\{3,6\}\|rgb(" page.css` = 0 ; seule exception l’URI SVG de la fibre du thème (valeurs de matrice, pas de couleur CSS)
- [x] 2. Pas de `transition: all`, pas d’animation de taille · PC:47 (propriétés listées) ; sloplint 10a muet
- [x] 3. Aucun italique dans un titre · aucun `<em>`/`italic` dans src
- [x] 4. `overflow-x: clip` html et body · PC:31, base.css ; aucun `100vw`
- [x] 5. Pistes `minmax(0, 1fr)`, titres `overflow-wrap` · PC:90 et suivantes ; base.css h1-h3
- [x] 6. `:focus-visible` partout, instantané · PC:50, 56-63, 268 (FAIL 15 corrigé : plus de transition d’outline)
- [x] 7. Reduced motion, contenu sans script · PC:357 ; Switcher : deux panneaux lisibles sans script
- [x] 8. Aucune métrique ni témoignage inventé · avis E-net retiré ; 60/120/10 viennent de la page carte d’origine
- [x] 9. Aucun eyebrow ni capitale trackée · « Notre » orange retiré ; labels en Hanken, casse de phrase
- [x] 10. Pas de « A · B · C », pas de flèche collée · « Lire la suite → » remplacé par des rangs entiers cliquables
- [x] 11. Aucun dégradé, carte dans carte, emoji · sloplint muet
- [x] 12. Titre, phrase, action visibles à 1280x800 · capture `*-hero-1280x800.png`, sloplint 44b muet
- [x] 13. ~80 mots par écran, hero = titre + phrase + actions · NOTE 58 seulement sur la table de la carte et les tables ledger (dismissed 58)
- [x] 14. Conteneur plafonné 1440 / gutter 64 · `.container` de base.css ; 44d muet à 1920
- [x] 15. Stamp en première ligne, critique, waivers · PC:1-27
- [x] 16. `sloplint --render` : 0 FAIL, 0 REFLEX, render tier tourné · sweep 3 (25 captures)
- [x] 17. Hero en `dvh`/`svh` · PC:111, PC:329+ (`100svh`)
- [x] 18. Aucun blanc ou noir pur · tokens OKLCH teintés 55-82°
- [x] 19. Sticky nav au-dessus de la barre · `--z-sticky-nav` (nav) > `--z-sticky` (barre), haut et bas distincts
- [x] 20. Aucun radio-onglet CSS absolu · radios de civilité en flux à 1 px (patterns.md)
- [x] 21. Vidéo de fond · sans objet (aucune vidéo) ; LCP jamais lazy (hero `eager` + `fetchpriority`)
- [x] 22. Rien de caché qui dépend du script · bouton Zenchef `hidden` révélé par le script, lien direct toujours visible
- [x] 23. États d’input sûrs · PC:262-268 (filet constant, ring outline, 48 px = bouton, disabled par opacité, fond et curseur)
- [x] 24. Tooltip / rotation · sans objet (aucun tooltip, aucune rotation)
- [x] 25. Contraste · sloplint 40 muet ; accent-ink sur accent ; muted 46 % L sur papier 94 %
- [x] 26. Aucune image cassée · 76 muet après copie du logo KYW dans `public/kyw/` ; photos du client, aucune de bibliothèque
- [x] 27. Aucun libellé qui replie · `.link` en `nowrap` (49b corrigé), libellé long raccourci
- [x] 28. Copie sans mots de la liste 19, sans tiret cadratin, sans « Tous droits réservés » · grep « — » « – » = 0 dans src/pages ; « Découvrez », « unique », « exceptionnel » retirés
- [x] 29. Aucun faux envoi · formulaire `data-endpoint=""`, message « Rien n’a été envoyé »
- [x] 30. SVG décoratifs étiquetés · aucun SVG inline (favicon seul)

**Reflex**
- [x] 31. Police display du thème · Grenze Gotisch
- [x] 32. Mesure 45-75ch, trois familles, trois graisses · base.css `p` 65ch, `.trio p` 46ch (WARN 25 corrigé) ; Gotisch, Grenze, Hanken ; 400/500/600
- [x] 33. Aucune carte-tell · valeurs en table, portes en rangs
- [x] 34. Hero : posture stampée, une rupture d’alignement · Poster, carte à gauche
- [x] 35. Pas le gabarit IA ni la forme des trois derniers logs · `waive 8` (séquence gardée) ; empreinte différente de les-potes-au-feu sur 4 axes (Body, Divider, Image… voir log)
- [x] 36. Coutures variées · double filet, bande fibre, champ outremer, photo pleine largeur ; écarts s / m / l
- [x] 37. Espacement par tokens · `--space-*` partout ; nudges : 0
- [x] 38. Accent sous 5 % ou posture déclarée · posture `committed` (Vellum) stampée ; un champ outremer
- [x] 39. Aucun glow ; pas le look crème + serif + terracotta · pigment outremer, display gothique
- [x] 40. Aucun mot accentué dans un titre · titres d’une couleur
- [x] 41. Aucun mono costume, rien sous 12 px · `--text-sm` 14 px minimum
- [x] 42. Titres ≥ 40 px, pas de section mince · 78/77/79 muets
- [x] 43. Têtes ni serrées ni à l’étroit, 16 px au téléphone · 71/72 muets, `--gutter` 16 px
- [x] 44. Aucune illustration, image vide, compteur, mur de photos · 80-83 muets
- [x] 45. Aucun faux produit · le vrai Zenchef, chargé à la demande
- [x] 46. Clôture = horaires, adresse, réservation · clôture de l’accueil et de /reserver-une-table ; bande « Réservez » ailleurs
- [x] 47. Chrome nommé · stamp : edge-aligned, colophon block
- [x] 48. Hover sur le conteneur, aucun rebond, aucun toast · rangs et lignes de table
- [x] 49. `:active`, `:disabled`, 44-52 px · PC:49, 51 ; boutons 48 px
- [x] 50. Icônes · aucune bibliothèque d’icônes
- [x] 51. Aucun texte de décoration · barre de partage, scroll cue retirés
- [x] 52. Aucun écho · horaires une fois par page (colophon sans horaires), slots vides : 0
- [x] 53. Aucun cadre d’appareil ni matériau d’imitation · sans objet
- [x] 54. Aucun gradient text ni swatch Tailwind · sans Tailwind

**Finish**
- [x] 55. Guillemets « », apostrophes typographiques, balance/pretty · base.css ; « Remettre la ferme au milieu du village »
- [x] 56. Un seul primaire rempli · F4 corrigé (onglet choisi cerclé, pas rempli)
- [x] 57. Chiffres tabulaires · `answered F6`
- [x] 58. Un seul conteneur, rayon 2 px partout ; pas de chorégraphie scroll · tokens
- [x] 59. Aucun avatar, aucune Lottie · sans objet
- [x] 60. Soulignements 1-2 px · `.link` 1 px, nav 2 px
- [x] 61. Outlier un rôle (Grenze : prix et numéros) ; aide `min-height: 1lh` · PC:268
- [x] 62. Invariants de page · une recette de primaire, un conteneur, un gap
- [x] 63. Surfaces navigateur · `answered F16`
- [x] 64. Aucun sliver ; `hallmarkSlots` présent · Base.astro
- [x] 65. Pas d’orphelin, aucun niveau sauté · h1 > h2 > h3 sur chaque page
- [x] 66. `lang="fr"`, `<title>`, description · Base.astro
- [x] 67. Rien que le téléphone ne reçoit pas · tables restackées avec libellés (/notre-carte)

**Craft, imagery, responsive, brand, patterns**
- [x] 68. Type : deux familles + un outlier, Gotisch 0,92 d’interligne et -0,01em (thème), corps 16 px à 1,55, `font-display: swap`, `font-synthesis: none` · tokens.css:1-3, base.css
- [x] 69. Couleur OKLCH, quatre couches, posture `committed` · tokens.css
- [x] 70. Surfaces : axe gauche, aucune ombre, z tokens, rayon 2 px ; fibre seule texture, sur deux bandes · PC:103
- [x] 71. Photos du client d’abord (13, bibliothèque 0), hero LCP `fetchpriority="high"`, traitement warm, texte sur papier (pas sur la photo), légendes = faits · Photo.astro
- [x] 72. Breakpoints 60rem et 40rem, `(hover: hover)`, tables restackées, `dvh`/`svh`, safe-area sur la barre · PC:304, 329 ; brand-truth : aucune couleur de marque de mémoire ; patterns pris pour leur forme

## Révision 1 (revue 1, 31/10/2026)
Ce qui a changé dans le design et pourquoi (détail dans `REVISION-1.md`) :
- **Zenchef** : le module prend l’outremer du site (`primaryColor=2942ab`, rid inchangé) ; le cadre vide ne réserve plus 560 px (REFLEX 79 : 200 px de vide au premier écran) ; `.counter` et la section des étapes se resserrent à `--space-2xl` pour que « Comment se passe la réservation » entre dans le premier écran à 1440×900 (h2 à 585 px).
- **Drapeau illustratif** : `.illu` (texte `--color-muted`, graisse 400, marge 0,35 em) ajoute « (illustratif) » ou « (légende illustrative) » à chaque donnée non confirmée visible : portrait, eau, légendes d’assiettes. Le portrait passe dans `figure.split__media` (grille 7 / -1) avec sa légende.
- **Engagement** : la colonne de numéros 1 à 5 est retirée (`.ledger--book .idx` supprimé) ; la séquence 1 à 4 de la réservation reste.
- **Heures** : « 12 h » et « 19 h » en texte, espace insécable.
- **Carte** : cellule Accord en `nowrap` (le prix ne se sépare plus de son libellé à 1440).
- **Gardé tel quel** : palette Vellum outremer et Grenze Gotisch (R1-15, à trancher avec le client).
