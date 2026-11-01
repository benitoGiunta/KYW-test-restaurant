**Hallmark · v2.0.0 · variante legacy KYW** · Partage (Namur) · 01/11/2026 · phase 1 sur 3

- **Redesign** · full · 4 pages (/, /carte/, /bon-cadeau/, /politique-de-confidentialite/), mêmes routes que restaurantpartage.be
- **Before** · sloplint `--before` pas encore lancé (phase 2) ; lecture sur les captures du client : one-page WordPress/Divi blanc, nav capitales trackées, trois boutons noirs remplis côte à côte, portrait rond, module Zenchef (rid=371394), mur de 16 photos, footer noir 3 colonnes, carte en 5 GIF illisibles au téléphone, aucun horaire ; ce qui reste : les photos de janvier 2026, le texte de présentation mot pour mot, la séquence de la page
- **Keeps** · liens : accueil, #partage, /carte/, /bon-cadeau/, #reservation, Facebook, Instagram, Google Maps, Zenchef `bookings.zenchef.com/results?rid=371394&pid=1001` (lien direct, au lieu de l'iframe), tel:+3281810098, /politique-de-confidentialite ; dropped : les 16 liens directs vers les JPG de la galerie (la galerie devient un accrochage de 5), le lien La-Carte.be (crédit du prestataire sortant) ; à consigner au sweep
- **Files** · create: sites/partage-legacy/** · delete: none
- **Shape** · une page de bistro, Photographic (kept) · genre editorial · job: book, l'action dans la nav, sous la présentation et à la clôture
- **Theme** · Atelier, dealt 2/3 (chaux, Sentient light, encre terre d'ombre, filets, carton coton, un signal ardoise) · écarte Spore (noir de café : la salle du client est en brique chaulée et bois clair, lumière du jour) et Squeeze (vert forêt saturé, voix de juice bar, contraire au ton « sobre » du site)
- **Chrome** · nav: floating pill (draw) · footer: letter close (draw)
- **Hero** · Poster (kept) : la photo du chef en cuisine plein cadre, titre bas gauche sous scrim
- **Signature** · le portrait du chef monté en tirage sur passe-partout, sous la phrase « Ici, l'expérience se vit dans le partage »
- **Sections** · Hero (Poster) · Présentation (Statement + tirage) · À poser au milieu de la table (Rows + carte coton du lunch) · Réservation (la réservation comme une carte + façade) · En images (accrochage irrégulier de 5) · Horaires et venir (Timetable + liste réglée) · Footer (letter close)
- **Material** · real : texte de présentation, carte du 28/09/2026 et lunch du 21/10/2026 (transcrits des GIF), adresse, téléphone, jours de fermeture, parkings, privatisation, équipe (presse) · pictures : client 11, bibliothèque 0 · absent : avis (aucun extrait réel), chiffres, logos, heures exactes de service
- **Comp** · pending (phase 2 : c1/c2 HTML + capture.mjs)
- **Sweep** · pending (phase 3)

## Approche

- **Macrostructure conservée** : « une page de bistro », empreinte Photographic. Empreinte six axes
  `Heading|Body|Divider|Button|Image|Reveal` = `Light serif statement|Grotesk 16px, 1.6|Hairline rows under an ink rule|Hairline pill outline|Full-bleed hero, matted print, uneven hang|One fade after fonts`.
  Le dernier log legacy (les-potes-au-feu : split studio, masthead, index columns ; atelier-de-bossime : Photographic, edge-aligned, colophon block) : nav et footer diffèrent des deux.
- **Posture conservée** : one-page sur `/` (même ordre : hero, présentation, [boutons Menus / Bon cadeau / Réserver → section « à poser au milieu de la table »], réservation, en images, adresse et fermetures, footer) ; pages `/carte/`, `/bon-cadeau/`, `/politique-de-confidentialite/` gardées. Site d'origine calme (aucune animation au scroll) : un seul fondu du texte du hero.
- **Draw cdb6cc** (Catalogue · Stage · floating pill · letter close · horaires et adresse en section propre · carte en Switcher midi/soir · clôture horaires + adresse + réservation) : pris = floating pill, letter close, horaires en section propre, Switcher sur /carte/ (Lunch du midi / La carte / Vins et boissons / Fin de repas), clôture sur le job. Refusé = Catalogue et Stage (la forme et le hero du site d'origine priment, KYW legacy) ; « the next free times as buttons » refusé (aucun outil de disponibilité réel : on n'en mime pas, gate 84).
- **Dérogations** : trois boutons noirs remplis côte à côte → un seul primaire rempli par page (F4) ; iframe Zenchef → lien direct vers la même URL Zenchef (câblage conservé ; l'iframe donne un FAIL 26a non levable, agents/lecons.md 31/10) + téléphone ; aucun formulaire mimé (84) ; mur de 16 photos → accrochage de 5 (83) ; carte en GIF → carte en texte (Rows, chiffres tabulaires) ; portrait rond → tirage sur passe-partout (thème) ; footer noir 3 colonnes → letter close sur papier.
- **Test miroir** : un voisin avec le même site aurait Poster + Rows ; ce qui ne se transpose pas ici : la phrase-titre du client en statement, le lunch « par table entière » posé en carte coton à côté des plats à partager, les horaires dits comme « les jours où la porte est ouverte ».

## Thème

Atelier, `dealt 2/3, seed restaurant-namur-sharing-plates-e651·ed7c7216·2026-11-01·r0`, prompt du deal : « restaurant in Namur, sharing plates, bistro, seasonal food, local, fresh, wine bar, craft, hospitality, warm, modern, city ». Scaffold `--redesign full` dans `src/styles/` (tokens.css, base.css). Pas de couleur de marque imposée (le site d'origine est noir/blanc + un ocre de nav) : le thème porte la palette.
L'« air » WebGL du thème n'est pas construit (variante legacy : CSS d'abord ; à décider en phase 2 : un still frame CSS ou rien). Les filtres de grain/fibre (`--grain`, `--fibre`) sont à ajouter en phase 2 (texture.md).

## Système (depuis tokens.css)

- Couleur (OKLCH) : papier `--color-paper` 94,5 % / `--color-paper-2` (puits) / carton `--color-card` ; encre `--color-ink` 19 %, corps `--color-ink-2`, `--color-muted`, `--color-pencil`, filets `--color-rule` ; signal ardoise `--color-accent` (soulignements, lettrine, focus `--color-focus`). Posture restrained.
- Type : Sentient 300 (titres, statement), Sentient 400 (h3, noms de plats, jours), Hanken Grotesk 400 (corps 16 px, 1,6). Trois graisses.
- Espace : échelle `--space-*` du scaffold ; `--section-gap` 120/96/72 ; `--container` 1440, `--gutter` 64/24/16.
- Surfaces : papier, puits `--color-paper-2`, carton coton `.stock` (dégradé lit/shade, filet intérieur à 14 px, `--shadow-card`), filets. Rayon 3 px contrôles, 2 px cartes.
- Motion : un fondu du texte du hero (`--dur-long`, `--ease-out`), sous `prefers-reduced-motion: no-preference`, visible sans script.

## Composants

| Composant | Décision | Référence |
| --- | --- | --- |
| Bouton | contour filet encre 3 px (hover : encre pleine) ; un seul `.btn--plein` par page (Zenchef sur l'accueil, commande du bon sur /bon-cadeau/) ; `.btn--clair` sur photo ; 48 px ; `white-space: nowrap` | thème § Controls, F4, 39b, 49a |
| Nav | pilule flottante sticky (hauteur 0, se pose sur le hero), nom en Sentient + signature « Charles Jeandrain », 2 liens + « Réserver une table » ; sous 60rem, menu Popover | draw, anatomy § book, microinteractions § Menu |
| Carte | Rows sous filet encre, nom Sentient 400, description muted, prix tabulaire à droite ; Switcher 4 onglets, les 4 panneaux lisibles sans script | patterns § rail and switcher, F6 |
| Horaires | table réglée, jour fermé muted (jamais barré), aujourd'hui sur carton, heures du soir `data-placeholder` (à confirmer) | thème § Timetable, layout § 5.16 |
| Réservation | carte coton : titre, une phrase, le fait « groupes 20 à 30 », le primaire rempli « Choisir un jour et une heure » vers Zenchef (lien conservé), téléphone en clair ; à côté, la façade | redesign § What a redesign keeps, 84 |
| Footer | letter close : une phrase signée par l'équipe, la réservation, adresse, téléphone, fermeture, réseaux ; Attablez-vous ; n° d'entreprise ; KYW en dernier | draw, 85 |
| Photo | `figure > [data-slot][data-alt] > img` avec `width/height`, `srcset`, hero `fetchpriority="high"` ; légende = un fait | patterns § photograph in a slot |

## Liste de sur-utilisation (§ 6 du prompt)

À cocher en phase 3, après `sloplint --render --kept`. État phase 1 : tier statique `0 FAIL, 4 WARN, 1 NOTE` (WARN 41 hero sur fond sombre, F15 trois gaps de colonnes, 49 libellés longs, F24 corrigé).
