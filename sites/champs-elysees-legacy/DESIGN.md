**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full · 4 pages (/, /la-carte/, /fetes-patronales/, /contact/)
- **Before** · sloplint `--before` (HTML seul, rendu impossible : le HTML sauvegardé charge des ressources distantes et bloque) : 146 FAIL (dont 62 `.et_animated` caché au repos, CSS Divi), 66 REFLEX, 9 WARN ; le motif d’éventails, les photos et l’ordre des sections restent
- **Keeps** · réservation Zenchef, `tel:`, `mailto:`, lien Maps, lien Facebook, flipbook des fêtes, quatre routes, copie de l’à propos, horaires, carte complète (94 lignes)
- **Files** · create : tout `sites/champs-elysees-legacy/` · edit : aucun · delete : aucun
- **Shape** · Photographic (kept), empreinte `Sentient 300 | Hanken Grotesk | Hairline rules | Hairline outline button | Full-bleed photograph and matted print | No reveal` ; draw ffbbdc : Letter écarté (aucun texte à la première personne prouvé), Counter écarté (aucune disponibilité réelle à afficher, Zenchef reste externe)
- **Theme** · Atelier, dealt 1/3, seed `restaurant-namur-brasserie-bistro-0e55·e343fe38·2026-11-20·r0` ; écartés : Vellum (blackletter contraire à l’esprit art déco bistro), Bloom (grille d’outil générative, interdit la couche terracotta que le client emploie en touche) ; signal vert forêt du logo lu sur les captures (`#2a4934`, `#2a532e`), jamais de mémoire
- **Chrome** · nav : bandeau d’infos au-dessus d’une barre (rétractation en phase 2) · footer : mast
- **Hero** · Poster (kept) : photo de salle pleine largeur, plaque de carte coton en bas à gauche, une phrase, deux actions
- **Signature** · la salle dressée sous la plaque de carte, un seul signal vert
- **Sections** · Hero · À propos (Split) · La carte (Rows) · Galerie (Bento) · Fêtes patronales (Band) · Heures d’ouverture (Schedule) · Réservations et adresse (Facts) · Footer (mast)
- **Material** · real : adresse, horaires du site, carte, fêtes, 1984 · pictures : 12 photos et logo client · absent : avis, note, équipe en cuisine
- **Comp** · c1 retenu (voir `comp.md`)
- **Sweep** · phase 3

## Approche

Macrostructure **08 Photographic** (le site d’origine ouvre sur un grand visuel), one-page gardée plus trois routes. Posture : Poster, calme, aucun pattern de scroll (phase 2 : nav rétractable et un reveal au plus). Dérogations : carrousel Swiper non repris (18) ; `vh` remplacé par `dvh` (6a) ; formulaire sans envoi (`data-endpoint=""`, 70) ; galerie avant les fêtes pour finir sur heures, adresse et réservation (`waive 8` sur la séquence) ; hero resserré de 8 mots à 6 (58). Test miroir : un voisin avec « bistro, photos de salle » aurait un hero texte sur photo ; la différence ici tient à la plaque de carte coton à lisérés et à la carte en rubriques au lieu d’un PDF.

## Thème

Atelier : matière portée par les photos de salle en lumière chaude, papier chaux, encre brune, Sentient 300, filets. Seule modification de la matière : le signal vert forêt (`oklch(38% 0.075 152)`) remplace l’ardoise, tiré du logo du client.

## Tokens

Voir `src/styles/tokens.css` (palette Atelier, `--color-accent` vert forêt, échelle partagée) et `base.css`.

## Composants

- **Carte** : Rows (nom col. 1 à 5 en Sentient 400, variantes de portion en lignes, prix tabulaires à droite, filets, pas de bordure ni d’ombre) ; rubriques dans l’ordre du PDF, « À manger » puis « À boire ». Switcher midi / soir non applicable (la carte n’a pas deux services). Réf. `layout.md` § 5.5.
- **Horaires** : Schedule, tableau sous filet d’encre, jour fermé sans objet (7 j sur 7), `<time>`, dits une fois ; jour courant en phase 2.
- **Pied** : mast (logo, adresse, liens, crédits), `data-credits`, puis KywFooter.
- **Photo** : `<figure data-slot data-alt>`, `width`/`height`, `sizes`, hero `fetchpriority="high"`, les autres `lazy`.
- **Plaque** : carte coton à liséré intérieur, `--shadow-card`.

## Sur-utilisation

- [x] 1. Hallmark audit lu, SKILL.md et redesign.md lus · preuve : AUDIT.md
- [x] 2. deal / draw / scaffold exécutés avec `--log` · preuve : `.logs/legacy-deal.log`, `legacy-draw.log`, `legacy-scaffold.log`
- [x] 3. Stamp et critique en tête de CSS · preuve : `src/styles/page.css:1-7`
- [x] 4. Deux comps construits et choisis · preuve : `comp.md`, `.hallmark/comps/c1.png`, `c2.png`
- [x] 5. Aucun tiret cadratin, noindex, KywFooter sur les 4 routes · preuve : grep du build (4/4)
- [ ] 6. sloplint `--render` sur le build : phase 2 (aucun FAIL à confirmer)
