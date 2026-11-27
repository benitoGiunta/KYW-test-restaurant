# DESIGN.md : Bienvenue chez vous (variante awwwards)

## Brief
- **Sujet** : Bienvenue chez vous, table de chef-patron (Cédric Delsaut) au premier étage d'une maison de maître, rue Pépin 33, Namur. Repas en « escales » sur réservation, boutique d'artisans, traiteur. Depuis 2002. Source : `data/restaurants/bienvenue-chez-vous/`.
- **Publics** : habitués et couples du soir (réservent par téléphone), déjeuners d'affaires du midi (formule 49 €), curieux et touristes qui ne trouvent aujourd'hui ni téléphone, ni adresse, ni horaires sur le site Wix.
- **Métier du site** : réserver (tel), venir (adresse, étage), lire la carte du mois et les formules.
- **Ressources** : 24 photos de plats de qualité (fonds blancs, sauces vertes, fleurs), façade, enseigne rouge, carte de visite. Pas de photo du chef ni de la salle. Ton personnel du chef.
- **Contraintes** : statique, `base=/bienvenue-chez-vous/awwwards/`, noindex, pied KYW.
- **Hypothèses** : téléphone et horaires de sources tierces (G&M, Restaurant Guru) donc à confirmer ; prix des plats non publiés (aucun inventé) ; tarif du mercredi ambigu (non affiché en euros). Voir RAPPORT.md en phase 3.

## Trois concepts
| | A. Escales | B. Au premier étage | C. L'assiette blanche |
|---|---|---|---|
| Territoire | Le menu du restaurant (grignotages, escales, douceurs, Voyage Signature) | Le lieu : maison de maître, façade, escalier, étage | La matière : dressage, assiette ronde, couleur sur blanc |
| Phrase | Le site se lit comme le repas : une route, des escales | On monte, étage par étage, chez le chef | Chaque photo est une assiette, tout le reste est la nappe |
| Règle de mise en page | Une ligne verticale (la route) traverse chaque page, chaque section est une escale posée sur elle | Sections empilées comme des étages numérotés | Cadres ronds, grands vides blancs |
| Verbe | Voyager (servir) | Monter | Dresser |
| Signature | Le point « escale » se remplit au passage, l'assiette s'ouvre en cercle | La façade glisse vers le haut | L'assiette se pose |
| Ancre | « Le Repas, 4 escales, 69 € » : le mot est celui de la carte | 33 rue Pépin, premier étage, depuis 2020 | Le dessert smiley aux fraises |
| Originalité / adéquation / faisabilité / portabilité (bas = mieux) | 4 / 5 / 4 / 2 | 4 / 4 / 3 / 3 | 3 / 4 / 4 / 5 |

**Test de l'échange** : A ne tient pas avec un autre restaurant (le vocabulaire « escales », « Grignotages », « Voyage Signature » est celui de la maison). C est un style transférable à toute table dressée : il ne fournit que le détail du rond (photo de plat). B fournit la 404 (« Mauvais palier ») et le texte de l'histoire (« Au premier étage »). **Choix : A**, raison : seul concept dont le système formel vient de la carte du client et qui tient de l'accueil à la 404.

## Concept Card
- **Idée** : le site est un repas en escales ; on avance sur une seule route, d'une escale à l'autre, jusqu'à la table.
- **Métaphore** : le menu de dégustation comme itinéraire (grignotages, escales, douceurs).
- **Signature (et recette)** : l'escale qui s'allume et l'assiette qui s'ouvre. Phase 2, `motion.md` : au passage du défilement, le point de la route se remplit (`scale` + couleur, ScrollTrigger `toggleActions`) et la photo ronde se révèle par `clip-path: circle(0 → 50%)` en `ease.out`, 0,9 s ; au repos, la bague de l'assiette du hero tourne lentement de quelques degrés sur l'horloge GSAP.
- **Émotion (3 premières secondes)** : on entre dans une salle sombre où une assiette blanche brille ; on sait : cuisine française créative, Namur, réserver.
- **Verbe** : servir (les éléments arrivent comme des assiettes posées, posément, puis ne bougent plus).
- **Capture** : le hero (grand « Bienvenue chez vous » en Gambetta, assiette de Saint-Jacques cerclée de rouge sur fond nuit, la route à gauche).
- **Ancre** : les formules réelles du site client (49, 69, 79, 94 €) et le vocabulaire des escales ; 33 rue Pépin ; seul chef en cuisine, salle et cave.
- **Théâtre** : loader non (la page doit répondre en 3 s à quelqu'un qui cherche un numéro de téléphone ; pas de contenu lourd à masquer). GL non (les photos de plats sont la matière, un shader les dégraderait ; coût mobile injustifié).

## Système
- **Palette** (rôles, références réelles) : ground `#16110f` (la salle aux bougies le soir, brun nuit) ; ink `#f3eee7` (nappe blanche) ; muted `#b3a99f` (fumée de bougie, 7,6:1) ; line `rgb(243 238 231 / .18)` (fil de nappe) ; accent `#ff5a4e` (rouge de l'enseigne de la rue et de la carte de visite, 6,5:1) ; curtain = accent. Défaut n° 1 (crème + serif + terracotta) évité : fond sombre, rouge d'enseigne vif, pas de crème en fond.
- **Typo** : Gambetta 500 + italique (display : serif classique raffiné, l'italique porte la voix du chef et le mot en rouge), Switzer 400/600 (corps et UI). Ni Inter, ni Fraunces, ni Playfair. Échelle fluide `--t-mega` à `--t-xs` (tokens.css). Display : interlettrage -0,04 à -0,02 em, interligne 0,9 à 1,02, `text-wrap: balance`. Corps 16 à 18 px, interligne 1,55, mesure 60ch ; UI 13 px 600. Prix `tabular-nums`, insécables via `lib/typo.ts` (« 49 € », « 12 h 30 »), vraies apostrophes et guillemets.
- **Grille** : 12 colonnes (flex/scroll-snap au téléphone), ligne forte n° 1 = la route (rail vertical à gauche, tout au long de la page), ligne forte n° 2 = bord gauche du bloc de texte à la colonne 7 (paire asymétrique). Humeurs d'espacement : hero compact, `pause` (très aéré), `serre`, défaut. Règle de rayon : angle droit partout, photo de plat ronde (`--radius-plate`), boutons en pilule.
- **Mouvement (planifié)** : famille `ease.out` pour les arrivées, `ease.inOut` pour les transitions de page (rideau rouge) ; verbe servir = arriver de 24 px plus bas avec un léger flou d'opacité, durée 0,7 à 0,9 s, stagger 60 ms. Hovers : CTA (remplissage inversé, déjà en CSS), nav (soulignement rouge), plats/photos (aperçu rond au curseur sur la carte, phase 2), liens texte (épaisseur du soulignement). Repos : la bague rouge de l'assiette du hero tourne de quelques degrés (une horloge, pause hors écran, coupé en reduced motion).
- **Plan de composition** (familles distinctes par page) :
  - Accueil : poster (hero texte + assiette) / statement / index (formules) / mur (six assiettes décalées) / paire asymétrique (façade + chef) / pied final (téléphone en grand).
  - Carte : poster-titre / index à vignettes (carte du mois) / données (formules + accords) / paire (mercredis) / index (traiteur) / statement court.
  - Histoire : poster / média plein cadre (façade) / paire (chef + carte de visite) / données (repères 2002, 2016, 2020) / duo (maison + enseigne) / statement.
  - Réservation : poster avec téléphone en grand / données (formulaire mailto + horaires) / accès et infos.
  - 404 : poster « Mauvais palier ».
  - Patron de la carte : liste index avec vignette ronde ; au phase 2, aperçu au curseur (desktop) et vignette visible au toucher.
  - Mobile 390 : h1 recomposé (`clamp`), assiette décalée à droite sous le texte, mur en bande `overflow-x` + `scroll-snap`, formules empilées (nom + prix sur une ligne), index de la carte nom + vignette, en-tête réduit à la marque ronde + 3 liens.
- **Test de généricité** : « un modèle générique atterrirait-il ici ? » Hero centré sur dégradé : non (asymétrique, route). Trois cartes égales : non (lignes d'index). Eyebrow sur chaque titre : non (aucun). Numéros décoratifs : non (les années et les escales sont des faits). Remplacé : le pied générique par un mot « Bienvenue chez vous… » géant en italique rouge (la signature manuscrite de l'enseigne traduite en serif italique).

## Sur-utilisation de la skill (phase 1)
1. **Trois concepts, trois territoires, notés, ancre, test de l'échange** : tableau ci-dessus (menu, lieu, matière). Coché.
2. **Aucun exemple travaillé** : ni braise qui refroidit, ni pavage, ni mise en place sur gril, ni cadre, ni solde, ni phrase unique. Coché.
3. **Concept Card exacte, verbe compris** : § Concept Card (Idée / Métaphore / Signature / Émotion / Verbe / Capture / Ancre / Théâtre). Coché.
4. **Concept au pied, carte, réservation, 404** : pied `Footer.astro` (mot géant + route), carte (`pages/carte.astro`, escales ordonnées), réservation (horaires et accès), 404 « Mauvais palier » (`pages/404.astro`). Coché.
5. **Un moment signature et sa recette** : § Concept Card, recette phase 2. Coché (planifié).
6. **Palette 4 à 6 rôles, références réelles** : `src/styles/tokens.css:6-12`. Coché.
7. **Aucun des 8 « defaults to avoid »** : pas de hero centré sur blob, pas de trois cartes égales, pas de dégradé violet, pas de crème + terracotta (fond nuit, rouge d'enseigne), pas d'acide sur noir (rouge chaud, pas de vert acide), pas de verre dépoli, pas d'eyebrow sur titre (`grep eyebrow src` vide), pas de 01/02/03. Coché.
8. **Test de généricité** : § Test de généricité. Coché.
9. **Details that separate 7 from 8** : sélection en rouge (`site.css:2`), focus dans l'accent (`site.css:3`), favicon de l'identité (`public/favicon.svg`, bague de l'assiette), OG composée provisoire (`public/og.png`, à recomposer en phase 3), pied comme composition finale (`Footer.astro`), 404 dans le concept. Partiel : OG à finir en phase 3.
10. **Polices** : Gambetta (2 fichiers) + Switzer (2 fichiers) = 4 fichiers, 2 préchargés (Gambetta 500, Switzer 400), `public/fonts/`. Coché.
11. **Échelle fluide unique, grands sauts** : `tokens.css` (`--t-mega` 54 à 168 px, `--t-xs` 13 px). Coché.
12. **Display réglé** : `site.css` `.display`, `.hero h1` (interlettrage, interligne, balance). Coché.
13. **Corps et UI** : `--t-body` 16 à 18 px, interligne 1,55, UI 13 px 600. Coché.
14. **Typographie française** : `lib/typo.ts`, apostrophes, « », vouvoiement. Coché.
15. **Grille, lignes fortes, cadre** : route (rail) + bord de colonne 7 ; pas de cadre quatre coins (justifié : la route remplace le cadre, une seule ligne structurante). Coché.
16. **Famille de section au plus une fois par page** : voir plan de composition (la carte utilise deux listes index : carte du mois et traiteur, à différencier en phase 2 par des vignettes et un traitement distincts ; point à surveiller). Partiel.
17. **Hero en 3 s** : nom, cuisine, lieu, deux actions (Réserver, Appeler), horaires dans le premier écran (mesuré à 1440×900 : h1 [105,152,851,419], CTA haut 600, assiette [900,187,1392,679]). Coché.
18. **Mobile 390 recomposé** : mesuré, `scrollWidth = 390`, h1 à gauche 44 px, mur en strip scroll-snap. Coché (revérifier en capture en phase 3).
