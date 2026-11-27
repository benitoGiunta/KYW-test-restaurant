# DESIGN.md : Bayti, variante awwwards (phase 1)

## Brief
- Sujet : Bayti (« foyer » en arabe classique), cuisine du Moyen-Orient (libanaise) revisitée d'une touche européenne, Namur. Baseline du client : « Deux mondes, une table. »
- Offre : restaurant du soir, Rue du Pont 15, menu unique 8 services à 45 € ; Bayti Le Comptoir, Rue du Pont 6, de jour, mezzés et plats à emporter (4 à 10 €, pièces 1 à 4,5 €), Menu Découverte 28 € ; traiteur événementiel « Bayti chez vous ». Mardi à samedi, comptoir 11 h à 19 h, restaurant 18 h à 21 h (dimanche et lundi fermés : déduit, à confirmer).
- Publics : midi pressé (comptoir), soir (réservation du menu), habitués, curieux et touristes, organisateurs d'événements. Métier du site : réserver (Barestho, tel, mail), venir (deux adresses), choisir (carte).
- Ressources : 34 photos du client (plats sur carrelage vert, plats sur feuilles et herbes, un fond noir, un buffet rouge), aucune photo de salle, de façade ni d'équipe ; pas de logo vectoriel.
- Contraintes : site statique, `base` /bayti/awwwards/, noindex, pied KYW, pas de backend.
- Hypothèses : aucun fondateur, chef, année ni avis inventés ; aucun plat fictif ; un seul extrait d'avis réel (Brenda C., avis Google repris par bayti.be) ; zéro `placeholder: true`.

## Trois concepts (trois territoires)
| # | Concept | Territoire | Orig. | Adéq. | Faisab. | Portab. (bas = mieux) |
|---|---|---|---|---|---|---|
| A | **Rue du Pont** : la rue est la structure, du n° 6 (jour) au n° 15 (soir) | lieu et rythme horaire | 5 | 5 | 4 | 1 |
| B | **Le carreau** : le zellige vert des photos devient la grille, chaque plat une case | matière visuelle | 3 | 4 | 4 | 3 |
| C | **Le seuil du foyer** : « bayti » = foyer, on entre pièce par pièce | nom, étymologie | 3 | 4 | 3 | 3 |

- A. Phrase : « Une rue, deux portes : le jour au 6, la nuit au 15. » Règle de mise en page : un fil horizontal (la rue) relie deux numéros, chaque section est un tronçon de rue, jour clair vers nuit noire. Verbe : **longer**. Voix typo : serif d'enseigne gras + italique de plaque d'émail. Palette : carrelage, nuit, grenade. Signature : en phase 2, le fil de la rue suit le défilement et le ton passe du jour au carreau puis à la nuit (recette motion.md : ScrollTrigger scrub sur variables de ton). Frame partageable : « Rue du Pont, Namur » sur plaque d'émail devant le mezzé. **Ancre** : deux adresses voisines réelles, Rue du Pont 6 (comptoir de jour) et 15 (restaurant du soir). Test de l'échange : avec un autre restaurant, la phrase ne tient pas.
- B. Règle : grille de carreaux 1:1. Ancre : fonds carrelés des photos. Écarté : un autre restaurant se carrèle aussi bien ; ne fournit que le détail du fond de la plaque du hero.
- C. Règle : plan de maison. Ancre : sens du mot. Écarté : métaphore décorative qui ne tient pas jusqu'à la carte ; ne fournit que le mot « foyer » en page Histoire.
- Choisi : **A**, seul concept qui tient du hero au pied, à la carte (du 15 au 6), à la réservation et à la 404.

## Concept Card
- Idée : le site est la Rue du Pont, à Namur ; on la longe du n° 6 (comptoir de jour) au n° 15 (table du soir).
- Métaphore : une rue avec deux numéros : le jour clair, le soir noir ; Bayti, « foyer », est la maison dont on a les deux portes.
- Signature (et recette) : le fil de la rue qui avance avec le défilement, ton jour vers carreau vers nuit (phase 2, ScrollTrigger scrub sur les variables `--c-*` de `[data-tone]`, motion.md « scroll-linked theme »).
- Émotion (3 premières secondes) : l'appétit et l'adresse : « Bayti » en géant sur vert profond, la plaque « Rue du Pont, Namur », un mezzé fleuri, deux numéros à franchir.
- Verbe : longer (traduction mouvement : translation lente et continue, ease.out, jamais de rebond).
- Capture : la plaque d'émail « Rue du Pont, Namur » et le fil n° 6 à n° 15 au-dessus de la photo de mezzés.
- Ancre : deux adresses réelles sur la même rue, 6 (11 h à 19 h) et 15 (18 h à 21 h).
- Théâtre : loader non (restaurant de quartier, l'appétit passe avant le spectacle, la première image est le hero) ; GL non (les photos sont le sujet, un shader les ternirait).

## Système
- **Palette** (références réelles : zellige vert des photos du client, nuit de la photo « rakakat fond noir », mélasse de grenade, safran) : jour `#e3e9e1` / `#0f2b2a` / muted `#4b6461` / accent grenade `#a3213a` ; carreau `#164240` / `#f0e8d6` / `#a9bdb5` / safran `#f0a24b` ; nuit `#0b0f0e` / `#f0e8d6` / `#9eada5` / grenade clair `#ee6a80` ; curtain `#0b0f0e`. Pas de crème + terracotta : le défaut n° 1 est évité (fond vert et noir, accent grenade).
- **Typo** : Zodiak 700 (display, enseigne) et Zodiak 400 italique (plaque, accents), Switzer 400/600 (corps, UI) ; 4 fichiers, 2 préchargés. Échelle fluide `--t-mega` (5 à 19 rem), `--t-xl`, `--t-l`, `--t-m`, `--t-body` (16 à 18 px), `--t-s`, `--t-xs` (12 px). Display : interlettrage -0,025 à -0,045 em, interligne 0,82 à 1,02, `text-wrap: balance`, `padding-bottom` pour les descendantes. Prix `tabular-nums`, insécables (« 45 € », « 18 h à 21 h », « n° 6 »), guillemets « » et apostrophes ’.
- **Grille** : 12 colonnes (4 au téléphone), gutter fluide, `.wrap` en `padding-inline` seulement. Lignes fortes : colonne 1 (texte) et colonne 9 (photo collante). Trois humeurs d'espacement : `.sec` (très ample), `.sec--serre`, `.cs` (carte). Rayon : 0 partout (plaque d'émail et cartes rectangulaires).
- **Mouvement (planifié, phase 2)** : easings `ease.out` (révélations) et `ease.inOut` (transition de page), durées 0,6 à 1,1 s ; verbe longer = translations lentes. Rôles de hover : CTA plein (fond vers ink), nav (soulignement accent), photos de plats (zoom 1,03, `ease.soft`), liens texte (couleur accent), 2 traitements au total. Repos : la rue respire (le fil n° 6 à n° 15 avance d'un pas au repos, et un point glisse) ; sous `prefers-reduced-motion` immobile.
- **Plan de composition** (famille, une fois par page) :
  - Accueil : poster (hero : titre géant, plaque, photo panoramique, la rue) / paire asymétrique (n° 6 et n° 15) / index (8 services, photo collante) / filmstrip (comptoir, `scroll-snap`) / mur (Bayti chez vous) / statement (avis) / pied final (« Rue du Pont, Namur. »).
  - Carte : statement (titre) / index + photo collante (soir) puis une liste index par catégorie, photo alternée gauche/droite / données (menu Découverte).
  - Histoire : statement, paire texte et photo, média (kebbeh en mains).
  - Réservation : statement, double colonne (CTA et contacts / adresses et horaires).
  - 404 : plaque « Numéro inconnu » + la rue.
  - Wireframe hero : `[Bayti ........ plaque / baseline / CTA]` puis `[photo 21:9]` puis `n° 6 ----- Rue du Pont ----- n° 15`.
  - **Mobile 390** : titre `--t-mega` à 90 px, colonne unique, CTA empilés, photo 4:3, la rue verticale (fil vertical), pellicule du comptoir en `overflow-x` + `scroll-snap`.
- **Test de généricité** : « un modèle générique atterrirait-il ici ? » Oui sur (1) hero titre + photo : changé en plaque + fil des deux numéros ; (2) carte en liste prix : liste index aux numéros réels des services plus photo collante ; (3) pied d'adresse : pied « Rue du Pont, Namur. » composé avec les deux portes.

## Sur-utilisation de la skill (phase 1)
1. [x] Trois concepts, trois territoires (lieu/rythme, matière, étymologie), notés, ancre, test de l'échange : tableau et lignes ci-dessus.
2. [x] Aucun exemple travaillé de concepts.md (ni braise, ni pavage, ni gril, ni cadre, ni solde, ni phrase unique) : relu, A est une rue à deux numéros.
3. [x] Concept Card exacte (Idée, Métaphore, Signature, Émotion, Verbe, Capture, Ancre, Théâtre) ci-dessus, verbe « longer » traduit en mouvement.
4. [x] Concept au pied (`Footer.astro` « Rue du Pont, Namur. »), à la carte (`carte.astro` « du n° 15 au n° 6 »), à la réservation (`reservation.astro` « Réserver au n° 15 »), à la 404 (`404.astro` « Numéro inconnu », composant `Rue`).
5. [x] Un moment signature : le fil de la rue et le glissement de ton jour vers nuit (recette scroll-linked theme, planifié phase 2) ; composant `Rue.astro` déjà posé au hero et à la 404.
6. [x] Palette 4 à 6 rôles par ton, références réelles nommées : `src/styles/tokens.css:1-20`.
7. [x] Défauts évités : fond crème + serif + terracotta absent ; pas d'acide sur noir ; pas de dégradé violet, ni verre dépoli ; pas d'eyebrow systématique (`.xs` seulement sur 5 titres de la page d'accueil, utiles : numéro de porte et moment) ; 01/02/03 non décoratifs (numéros réels des services) ; ni Inter, ni Fraunces, ni Instrument Serif, ni Playfair.
8. [x] Test de généricité : trois « oui » changés, ci-dessus.
9. [~] « Détails 7 vers 8 » : favicon de l'identité (`public/favicon.svg`, B sur noir), OG composée (`public/og.png` rendue depuis le hero), 404 dans le concept faits ; sélection (`::selection` accent) et focus dans l'accent (`:focus-visible`) faits dans `site.css` ; pied comme composition finale fait ; à revérifier en phase 3.
10. [x] Polices : Zodiak 700 et italique 400, Switzer 400 et 600, 4 fichiers dans `public/fonts/`, 2 préchargés (`Base.astro`).
11. [x] Échelle fluide unique, `--t-mega` 5 à 19 rem pour `--t-body` 1 à 1,125 rem (`tokens.css`).
12. [x] Display réglé : `.display`, `.display--mega`, `.display--xl` dans `site.css` (interlettrage négatif, interligne 0,82 à 1,02, balance, `padding-bottom`).
13. [x] Corps 16 à 18 px, interligne 1,55, mesure `.prose` 62ch, UI 12 à 14 px, couleurs `muted` en AA sur leur fond (à mesurer avec axe en phase 3).
14. [x] Typographie française : insécables dans `site.ts` (`NB`), guillemets « », apostrophes ’ (script de normalisation de `carte.json`), « bœuf ».
15. [~] Grille 12 colonnes et lignes fortes (colonne 1 et 9) faits ; cadre quatre coins : remplacé par la plaque d'émail (double filet) et le fil de la rue, justifié par le concept ; à revoir en phase 3.
16. [x] Une famille de section au plus une fois par page : plan ci-dessus ; la carte répète la liste index par catégorie (même patron voulu, variantes alternées).
17. [x] Hero en 3 secondes : nom, cuisine, ville (plaque), CTA « Réserver une table » et « Appeler », mesuré à 1440×900 (CTA y 471).
18. [x] Mobile 390 recomposé : type re-réglé (`--t-mega` 90 px, h1 362 px de large pour 358 px utiles), lignes `auto`, strip `overflow-x` + `scroll-snap`, rue verticale ; scrollWidth 390 mesuré.

Mesures (Playwright, build local, `scripts/q.sh bayti-mesure`) : h1 au `left` 21 px à 1440 avant retrait de la marge négative (gutter 33), désormais au gutter, CTA 166×44 px, photo du hero dessous.
