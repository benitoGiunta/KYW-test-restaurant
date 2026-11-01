# La Brasserie du Quai · variante legacy · 01/11/2026

Phase 3 sur 3 (QA). Concept, thème et approche : voir `DESIGN.md` (Spore, colourway head-torch, hero Poster, multi-pages conservé).

## Approche conservée vs site d'origine
| | Site d'origine | Variante legacy |
| --- | --- | --- |
| Type | multi-pages WordPress + Elementor (Link-Eat) | multi-pages Astro, mêmes routes (accueil, carte, écailler, galerie, bon cadeau, réservation) + 404 |
| Hero | photo plein écran au logo | Poster plein écran au logo, titre bas gauche sur voile, un primaire « Réserver une table » |
| Ambiance | bleu nuit et or | noir café et ocre (Spore head-torch) |
| Réservation | Zenchef (rid 379458) | lien Zenchef conservé + module ouvert à la demande, repli direct |
| Bon cadeau | Brydge | lien Brydge conservé + module à la demande |
| Photos | 24 photos du client | 24/24 photos du client, aucune photo de bibliothèque |

## QA phase 3 : constats et corrections
Source : `QA-build.md` (agent « captures » : accueil, réservation, 404 ; audit 6 pages) + captures ciblées 390 px des 4 pages non couvertes (carte, écailler, galerie, bon cadeau) et mesure des 7 routes à 390 et 1280 px.

| # | Constat | Correction | Vérification |
| --- | --- | --- | --- |
| 1 | Cibles tactiles de 20 px (adresse, téléphone, courriel, Facebook, Instagram, « Itinéraire dans Google Maps », téléphone du bandeau) | `padding-block: 2px` sur la boîte inline (`.nav__banner a, .pied__bloc a, .venir__adresse p > a`), sans `inline-block` donc sans changer l'interligne (`src/styles/page.css`) | hauteurs mesurées à 390 px : 24 px pour les 10 liens (49 px pour l'adresse sur deux lignes) ; 0 cible < 24 px hors liens dans une phrase, 7 routes × 2 largeurs |
| 2 | Mobile, /reservation/ : « Les heures de service » collé au courriel (gap de grille 16 px) | `.infos { row-gap: var(--space-2xl) }` sous 60rem | écart mesuré 64 px |
| 3 | Mobile, /la-carte/ : la note allergènes touchait le titre « Les entrées » | `.carte { row-gap: var(--space-2xl) }` sous 60rem | écart mesuré 64 px |
| 4 | Mobile, accueil : « Jour de fermeture » touchait le titre « 9 rue du Quai, Namur » | `.venir__in { row-gap: var(--space-2xl) }` sous 60rem | écart mesuré 64 px, capture |
| 5 | Guillemets orphelins en fin de ligne (« Croquettes de crevettes grises « / maison »») | espaces insécables à l'intérieur des guillemets dans `src/data/carte.json` (8 plats) et `index.astro` (« Royal ») | capture 390 px de /la-carte/ |

Faux positifs écartés (leçons existantes) : la « 404 » des captures est la page de repli de `serve.mjs` (titre vide, pas de `lang`) ; la vraie `404.html` a `lang="fr"`, un titre, un `h1`, `noindex` et le pied KYW. « Lien d'évitement premier arrêt : non » : faux négatif (le libellé est « Aller au contenu »). `robots.txt` et sitemap à la racine : normaux sous `base`. Polices `.ttf` : l'audit récupère la CSS Google Fonts sans agent navigateur ; un navigateur reçoit du woff2.

Contrôles finaux (dist, 7 routes × 390/1280) : 0 débordement horizontal, 0 erreur console, un `h1` par page, `lang="fr"`, `noindex`, mention « Maquette KYW, certaines données sont illustratives », une `kyw-signature` par page. Voile du hero à 390 px : le chapô passe sur la partie sombre (chaises), lisible (capture). Pied KYW sur bande claire : logo lisible.

## Résultat sloplint
Non tourné dans ce chantier (voir ETAT.md, « Reste ») : `AUDIT.md` (`--before`), `comp.md`, `--render --kept`, hero review et finish review, stamp complet et les 72 cases de `DESIGN.md` restent à faire.
Build : `scripts/q.sh legacy-qa3-build3 pnpm build:site sites/brasserie-du-quai-legacy` OK → `dist/brasserie-du-quai/legacy/` ; `pnpm index` OK.

## Placeholders et faits manquants
| Élément | Où | Valeur illustrative | À remplacer par |
| --- | --- | --- | --- |
| Jour de fermeture | `Saisons.astro` (accueil, réservation) | slot `.fill` « à confirmer par la maison » | le jour de fermeture réel |
| Desserts, vins et boissons | `/la-carte/` | slot `.fill` « la carte n'est pas encore publiée » | la carte des desserts et boissons |

Slots texte `.fill` : 2. Aucun plat, avis, note ou chiffre inventé. Aucun avis repris du site d'origine.

## Demande de matériel
- Carte des desserts, vins et boissons (PDF ou texte).
- Jour de fermeture hebdomadaire.
- La photo qui changerait le plus la page : la terrasse au bord de la Meuse au coucher du soleil, en format paysage large (hero, 1920 × 1080 au moins).

## Leçons structurelles
- Grilles 12 colonnes repliées en une colonne sous 60rem : `gap: var(--gap-columns)` devient l'écart vertical entre blocs (16 px sous 40rem) et colle un titre au bloc précédent ; ajouter un `row-gap` de section dans la media query de repli (3 occurrences ici).
- Cible tactile d'un lien isolé à 20 px : `padding-block: 2px` sur la boîte inline (pas d'`inline-block`) porte `getBoundingClientRect` à 24 px sans changer l'interligne.
