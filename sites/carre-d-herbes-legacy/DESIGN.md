# Design : Carré d’herbes (variante legacy)

**Hallmark · v2.0.0 · variante legacy KYW**

- **Redesign** · full : contenu et wiring restent, système et composition changent.
- **Before** · `.hallmark/before.txt` : 804 FAIL, 216 REFLEX, 82 WARN sur 14 pages (les FAIL 2a « dégradé violet » viennent des presets WordPress sur `:root`, pas du design).
- **Keeps** · 9 routes de contenu (accueil, le restaurant, menus, fêtes 2026, actualités, contact, comment réserver, bon cadeau, 404), `tel:` 081 34 48 19, lien Facebook, adresse, horaires, texte des menus et des prix, avis de Stéphane Materne, citation de Théodore Zeldin.
- **Files** · `src/data/site.ts`, `src/styles/{tokens,base,page}.css`, `src/layouts/Base.astro`, `src/components/{Nav,Footer,Photo,Horaires,Etapes}.astro`, `src/pages/*.astro`.
- **Shape** · Photographic (macrostructure 08, empreinte `Heading|Body|Divider|Button|Image|Reveal`), multipage. Le draw (f665ca) donnait Narrative Workflow, hero Ledge, nav pilule flottante, pied colophon : pied gardé, hero Poster et nav barre bord à bord conservés de l’original (swap nommé), séquence « réservation, menu, horaires » respectée.
- **Theme** · Solstice, dealt 1/3, seed `restaurant-namur-refined-seasonal-57d8·72123ad0·2026-11-20·r0`, lumière long-light. Écartés : Squeeze (joueur, étal de fruits, trop cheerful pour une table de gastronomie), Vellum (gothique, marque l’ancien et le sacré, pas une maison moderne).
- **Chrome** · nav : barre bord à bord, marque en Yeseva, téléphone et pilule « Comment réserver » ; pied : bloc colophon encre.
- **Hero** · Poster : la tuile de dentelle plein cadre (photo du client, 13), titre sur le côté ombré à gauche, téléphone et menus en actions.
- **Signature** · l’assiette à la tuile de dentelle, plein cadre, avec le numéro de téléphone comme action unique de réservation.
- **Sections** · Hero · Menus (Rows) · Chef (5/7) · Citation (bande encre) · Nom du lieu (5/7 + parc) · Actualités (Rows) · Réserver + horaires (Schedule).
- **Material** · real : photos du client (13 retenues sur 25), carte, horaires, avis ; absent : GPS (pas de carte), e-mail, note Google, nombre d’avis. Aucune donnée fictive dans cette phase.
- **Comp** · deux comps du premier écran (c1 texte en bas à gauche, c2 texte en haut à gauche), c1 retenu.
- **Sweep** · phase 3.

## Approche

Macrostructure **08 Photographic**, posture **Poster** : le plat plein cadre ouvre, la carte vient aussitôt après, le calme prime (aucune chorégraphie de scroll prévue ; un seul reveal éventuel en phase 2). Dérogations : bandeau cookies supprimé (aucun cookie posé) ; pages de menus séparées (lunch, 3, 4, 5, Noël, emporter) fusionnées en un Switcher sur `/nos-menus/` et un bloc dans `/fetes-2026/` (liste plate de routes, toutes les infos gardées) ; sous-menu « Qu’est-ce qu’on mange ? » aplati ; carrousel absent. Test miroir : un voisin avec « cuisine raffinée, Wépion » obtiendrait aussi le plat plein cadre, mais pas cette combinaison de crème, Yeseva, bande encre portant la citation de Zeldin et Schedule en pied ; décision changée pour s’éloigner : le téléphone remplace le bouton de réservation en ligne (il n’y en a pas).

## Thème

Solstice : papier crème, encre brune, Yeseva One / Archivo / Archivo Narrow, filets or, un seul vermillon sur les actions.

## Tokens

`src/styles/tokens.css` fait foi (scaffold Solstice, aucune modification). Rôles : `--color-paper` crème, `--color-paper-2` bande claire, `--color-ink` brun, `--color-accent` vermillon (boutons, focus), `--color-gold` filets et soulignement actif, `--font-display` Yeseva One, `--font-body` Archivo, `--font-outlier` Archivo Narrow (boutons, petites mentions). `--container` 1440 px, `--section-gap-s` 120 px (80 px sous 860 px).

## Composants

- **Carte** (menus) : Rows (titre col. 1 à 5, description 6 à 10, prix à droite en `tabular-nums`) sur l’accueil ; page `/nos-menus/` : Switcher `role="tablist"` Lunch / 3 / 4 / 5 assiettes (3 par défaut, tous les panneaux visibles sans script), étapes en lignes à filets, prix du menu et accord mets-vins en tête. Pas de tuiles, pas d’icônes, filets et non bordures + ombre.
- **Horaires** : Schedule `<dl>` avec `<time>`, jours fermés en `--color-muted` (jamais barrés), dernière prise de commande en petite mention, pas d’icône d’horloge ; dits sur l’accueil et le contact, pas dans le pied.
- **Pied** : colophon encre (adresse, téléphone, liens du site, Facebook, crédits photo `data-credits`), puis `KywFooter`. Pas de « Tous droits réservés », pas de newsletter.
- **Photo** : `<figure>` avec `width`/`height`, `loading="lazy"` sauf le hero (`fetchpriority="high"`), légende = un fait.
- Nav, boutons : états complets, mobile (summary), reveal : phase 2.

## Sur-utilisation

- [x] 1. Hallmark lu avant de construire (SKILL.md, design-md.md, thème Solstice et sa photo, genre editorial) · preuve : stamp `src/styles/page.css:1-3`
- [x] 2. Deal/draw/scaffold, thème choisi sur l’image, deux écartés nommés · preuve : section Picks ci-dessus, `.hallmark/log.json`
- [x] 3. Audit `sloplint --before` sur l’original · preuve : `.hallmark/before.txt`, `AUDIT.md`
- [x] 4. Stamp et critique en tête de `page.css` · preuve : `src/styles/page.css:1-7`
- [x] 5. Deux comps du premier écran, un choisi · preuve : `.hallmark/comps/c1.html`, `c2.html`, `comp.md`
- [x] 6. Pas de tiret cadratin, apostrophes typographiques, insécables avant € et signes doubles · preuve : grep `—|–` vide sur `src/`
- [ ] 7. `sloplint --render` propre · raison : build statique seulement en phase 1, rendu à lancer en phase 2 ; `sloplint src` : 0 FAIL réel (FAIL 34 de `Base.astro` = faux positif, `overflow-x: clip` est dans `base.css:2`)
- [ ] 8. Contraste et fold mesurés · raison : phase 2
